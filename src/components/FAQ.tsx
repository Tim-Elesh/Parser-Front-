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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2>Часто задаваемые вопросы</h2>
      {faqData.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <div
            onClick={() => toggleExpanded(index)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: '#f9f9f9',
              fontWeight: 'bold',
            }}
          >
            {item.question}
          </div>
          <div
            style={{
              maxHeight: expandedIndex === index ? '200px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-in-out',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ padding: '10px' }}>
              {expandedIndex === index ? item.answer : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;