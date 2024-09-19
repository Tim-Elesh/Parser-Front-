import React, { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'Что такое UIGraph?',
    answer: 'UIGraph — это платформа, которая позволяет пользователям улучшать свои UI навыки.',
  },
  {
    question: 'Как перемещаться по сайту?',
    answer: 'Используйте меню в верхней части страницы для доступа к различным разделам сайта.',
  },
  {
    question: 'Как я могу связаться с поддержкой?',
    answer: 'Вы можете обратиться в нашу службу поддержки через страницу контактов.',
  },
];

const Faq: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Часто задаваемые вопросы</h2>
      {faqData.map((item, index) => (
        <div key={index} className="mb-4 border border-gray-300 rounded-lg shadow-sm">
          <div
            onClick={() => toggleExpanded(index)}
            className="cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-t-lg font-bold text-gray-700"
          >
            {item.question}
          </div>
          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
              expandedIndex === index ? 'max-h-40' : 'max-h-0'
            } bg-white text-gray-800 rounded-b-lg`}
          >
            <div className="p-4">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;