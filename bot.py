import os
import logging
import asyncio
from dotenv import load_dotenv
from telegram import Update
from telegram.constants import ParseMode
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

from bybit_parser import BybitP2PParser

# Загрузка переменных окружения из .env файла
load_dotenv()

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('bybit_p2p_bot')

# Получение токена бота из переменных окружения
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
if not TELEGRAM_BOT_TOKEN:
    logger.error("Не задан токен Telegram бота. Пожалуйста, создайте файл .env и добавьте TELEGRAM_BOT_TOKEN")
    exit(1)

# Создание экземпляра парсера Bybit
bybit_parser = BybitP2PParser()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    user = update.effective_user
    logger.info(f"Пользователь {user.id} запустил бота")
    
    welcome_message = (
        f"👋 Привет, {user.first_name}!\n\n"
        "Я бот для поиска лучших P2P предложений на бирже Bybit.\n\n"
        "Доступные команды:\n"
        "/best <крипто> <фиат> - найти лучшие предложения для покупки и продажи\n"
        "/buy <крипто> <фиат> - найти лучшее предложение для покупки\n"
        "/sell <крипто> <фиат> - найти лучшее предложение для продажи\n\n"
        "Например: /best USDT RUB\n\n"
        "Поддерживаемые криптовалюты: USDT, BTC, ETH, USDC и другие\n"
        "Поддерживаемые фиатные валюты: RUB, USD, EUR, UAH и другие"
    )
    
    await update.message.reply_text(welcome_message)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    help_message = (
        "🔍 *Как пользоваться ботом:*\n\n"
        "*Команды:*\n"
        "/best <крипто> <фиат> - показать лучшие предложения покупки и продажи\n"
        "/buy <крипто> <фиат> - найти лучшее предложение для покупки\n"
        "/sell <крипто> <фиат> - найти лучшее предложение для продажи\n\n"
        "*Примеры:*\n"
        "/best USDT RUB - лучшие предложения USDT/RUB\n"
        "/buy BTC USD - лучшее предложение для покупки BTC за USD\n"
        "/sell ETH EUR - лучшее предложение для продажи ETH за EUR\n\n"
        "*Примечание:* валюты указываются без дополнительных символов, просто их коды"
    )
    
    await update.message.reply_text(help_message, parse_mode=ParseMode.MARKDOWN)

def format_offer_message(offer, trade_type_text):
    """Форматирует сообщение с информацией о предложении"""
    if not offer:
        return f"⚠️ Нет доступных {trade_type_text.lower()} предложений для заданной пары валют."
    
    # Форматирование способов оплаты
    payment_methods = ", ".join(offer['payment_methods']) if offer['payment_methods'] else "Не указаны"
    
    message = (
        f"*{trade_type_text} {offer['crypto_currency']} за {offer['fiat_currency']}*\n\n"
        f"💰 *Курс:* {offer['price']} {offer['fiat_currency']}\n"
        f"👨‍💼 *Трейдер:* {offer['trader_name']}\n"
        f"📊 *Лимиты:* {offer['min_amount']} - {offer['max_amount']} {offer['fiat_currency']}\n"
        f"🔄 *Доступно:* {offer['available_amount']} {offer['crypto_currency']}\n"
        f"💳 *Способы оплаты:* {payment_methods}\n\n"
        f"🔗 [Открыть P2P Bybit](https://www.bybit.com/fiat/trade/otc/)"
    )
    
    return message

async def handle_buy_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /buy"""
    args = context.args
    
    if len(args) != 2:
        await update.message.reply_text(
            "⚠️ Пожалуйста, укажите криптовалюту и фиатную валюту.\n"
            "Например: /buy USDT RUB"
        )
        return
    
    crypto_currency = args[0].upper()
    fiat_currency = args[1].upper()
    
    # Отправка уведомления о начале поиска
    processing_message = await update.message.reply_text(
        f"🔍 Ищу лучшее предложение для покупки {crypto_currency} за {fiat_currency}..."
    )
    
    # Получение лучшего предложения
    offer = bybit_parser.get_best_offer(crypto_currency, fiat_currency, "buy")
    
    # Форматирование и отправка сообщения с результатом
    result_message = format_offer_message(offer, "Покупка")
    await update.message.reply_text(result_message, parse_mode=ParseMode.MARKDOWN, disable_web_page_preview=True)
    
    # Удаление сообщения о поиске
    await processing_message.delete()

async def handle_sell_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /sell"""
    args = context.args
    
    if len(args) != 2:
        await update.message.reply_text(
            "⚠️ Пожалуйста, укажите криптовалюту и фиатную валюту.\n"
            "Например: /sell USDT RUB"
        )
        return
    
    crypto_currency = args[0].upper()
    fiat_currency = args[1].upper()
    
    # Отправка уведомления о начале поиска
    processing_message = await update.message.reply_text(
        f"🔍 Ищу лучшее предложение для продажи {crypto_currency} за {fiat_currency}..."
    )
    
    # Получение лучшего предложения
    offer = bybit_parser.get_best_offer(crypto_currency, fiat_currency, "sell")
    
    # Форматирование и отправка сообщения с результатом
    result_message = format_offer_message(offer, "Продажа")
    await update.message.reply_text(result_message, parse_mode=ParseMode.MARKDOWN, disable_web_page_preview=True)
    
    # Удаление сообщения о поиске
    await processing_message.delete()

async def handle_best_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /best"""
    args = context.args
    
    if len(args) != 2:
        await update.message.reply_text(
            "⚠️ Пожалуйста, укажите криптовалюту и фиатную валюту.\n"
            "Например: /best USDT RUB"
        )
        return
    
    crypto_currency = args[0].upper()
    fiat_currency = args[1].upper()
    
    # Отправка уведомления о начале поиска
    processing_message = await update.message.reply_text(
        f"🔍 Ищу лучшие предложения для {crypto_currency}/{fiat_currency}..."
    )
    
    # Получение лучших предложений для покупки и продажи
    buy_offer = bybit_parser.get_best_offer(crypto_currency, fiat_currency, "buy")
    sell_offer = bybit_parser.get_best_offer(crypto_currency, fiat_currency, "sell")
    
    # Форматирование сообщений для каждого типа предложений
    buy_message = format_offer_message(buy_offer, "Покупка")
    sell_message = format_offer_message(sell_offer, "Продажа")
    
    # Расчет спреда, если есть оба предложения
    spread_message = ""
    if buy_offer and sell_offer:
        buy_price = float(buy_offer['price'])
        sell_price = float(sell_offer['price'])
        spread_percent = ((sell_price - buy_price) / buy_price) * 100
        spread_message = (
            f"\n\n📊 *Спред:* {spread_percent:.2f}%\n"
            f"💹 *Разница:* {sell_price - buy_price:.2f} {fiat_currency}"
        )
    
    # Форматирование и отправка итогового сообщения
    result_message = (
        f"*Лучшие предложения {crypto_currency}/{fiat_currency}*\n\n"
        f"➡️ *ПОКУПКА (buy):*\n{buy_message}\n\n"
        f"⬅️ *ПРОДАЖА (sell):*\n{sell_message}"
        f"{spread_message}"
        f"\n\n🔗 [Открыть P2P Bybit](https://www.bybit.com/fiat/trade/otc/)"
    )
    
    await update.message.reply_text(result_message, parse_mode=ParseMode.MARKDOWN, disable_web_page_preview=True)
    
    # Удаление сообщения о поиске
    await processing_message.delete()

async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик ошибок бота"""
    logger.error(f"Произошла ошибка: {context.error}")
    
    # Отправка сообщения пользователю об ошибке
    if update and update.effective_message:
        await update.effective_message.reply_text(
            "⚠️ Произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже."
        )

async def main() -> None:
    """Основная асинхронная функция запуска бота"""
    # Создание приложения
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
    
    # Регистрация обработчиков команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("buy", handle_buy_command))
    application.add_handler(CommandHandler("sell", handle_sell_command))
    application.add_handler(CommandHandler("best", handle_best_command))
    
    # Регистрация обработчика ошибок
    application.add_error_handler(error_handler)
    
    # Запуск бота
    logger.info("Бот запущен")
    await application.initialize()
    await application.start()
    await application.updater.start_polling()
    
    # Ждем сигнала остановки
    stop_signal = asyncio.Future()
    await stop_signal


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Бот остановлен") 