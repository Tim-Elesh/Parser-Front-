import { useState } from "react";

interface AccordionProps {
  title: string; // Заголовок для отображения на кнопке
  children: React.ReactNode; // Дочерние элементы, которые будут отображаться внутри Accordion
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Заголовок Accordion с кнопкой для раскрытия/сворачивания */}
      <tr className="cursor-pointer" onClick={handleToggle}>
        <td colSpan={4} className="px-5 py-4 text-sm">
          <strong className="focus:outline-none">{title}</strong>
        </td>
      </tr>

      {/* Контент Accordion, который раскрывается/сворачивается */}
      {isOpen && (
        <>
          {children} {/* Дочерние элементы теперь будут отображаться как строки таблицы */}
        </>
      )}
    </>
  );
};

export default Accordion;
