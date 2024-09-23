import React, { useState } from 'react';
import { useStore } from '../store/store';
import { Link } from 'react-router-dom';

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

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const theme = useStore((state: { theme: string }) => state.theme);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl w-full px-4 mx-auto">
      <h2 className={`text-xl md:text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        Часто задаваемые вопросы
      </h2>
      {faqData.map((item, index) => (
        <div key={index} className={`mb-4 border rounded-lg shadow-sm ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
          <div
            onClick={() => toggleExpanded(index)}
            className={`cursor-pointer p-4 transition-colors duration-300 rounded-t-lg font-bold ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            {item.question}
          </div>
          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
              expandedIndex === index ? 'max-h-40' : 'max-h-0'
            } ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} rounded-b-lg`}
          >
            <div className="p-4">{item.answer}</div>
          </div>
        </div>
      ))}
          <Link to="/main" className="flex w-full items-center text-center justify-center px-4 py-4 mt-4 bg-blue-500 text-white  rounded hover:bg-blue-600 duration-300">
            Go to Main Page
          </Link>
    </div>
  );
};

export default FAQ;