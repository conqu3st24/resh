import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, Star } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-[#212121]" />,
      title: 'Гарантия качества',
      description: 'Мы гарантируем качество наших товаров и услуг.'
    },
    {
      icon: <Truck className="w-6 h-6 text-[#212121]" />,
      title: 'Доставка по',
      link: 'всей России',
      linkUrl: '/delivery',
      description: 'Мы доставляем товары по всей России в кратчайшие сроки.'
    },
    {
      icon: <Star className="w-6 h-6 text-[#212121]" />,
      title: 'Больше',
      highlightText: '1000+',
      secondPart: 'отзывов',
      description: 'Наши клиенты оставили более 1000 положительных отзывов о нашей компании.'
    }
  ];

  return (
    <section className="py-4 md:py-6 bg-[#E3E7F0]">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              data-component-name="Features"
              className="bg-white p-4 md:p-6 rounded-[10px] flex items-start transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
            >
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center mb-2 w-full">
                  <div className="mr-3 bg-gray-100 p-2 md:p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-base md:text-[18px] font-bold flex flex-wrap items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {feature.title}{' '}
                    
                    {feature.link && (
                      <Link to={feature.linkUrl} className="text-[#0A6DFF] ml-1 hover:underline">
                        {feature.link}
                      </Link>
                    )}
                    
                    {feature.highlightText && (
                      <>
                        <span className="text-[#0A6DFF] ml-1">{feature.highlightText}</span>
                        {feature.secondPart && (
                          <span className="ml-1">{feature.secondPart}</span>
                        )}
                      </>
                    )}
                  </h3>
                </div>
                
                <p className="text-[#666666] text-xs md:text-[14px] pl-0 md:pl-[60px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;