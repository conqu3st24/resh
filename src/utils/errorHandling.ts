/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

/**
 * Handle API errors centrally with consistent error messages
 * @param error - The error caught from API calls
 * @returns An object with a user-friendly error message
 */
export const handleApiError = (error: unknown): { message: string } => {
  if (error instanceof ApiError) {
    // Handle specific API error codes
    switch (error.statusCode) {
      case 401:
        return { message: 'Необходима авторизация. Пожалуйста, войдите в систему.' };
      case 403:
        return { message: 'У вас нет доступа к этому ресурсу.' };
      case 404:
        return { message: 'Запрашиваемый ресурс не найден.' };
      case 500:
        return { message: 'Произошла ошибка на сервере. Пожалуйста, попробуйте позже.' };
      default:
        return { message: error.message || 'Произошла ошибка. Пожалуйста, попробуйте снова.' };
    }
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'Неизвестная ошибка. Пожалуйста, попробуйте снова.' };
}; 