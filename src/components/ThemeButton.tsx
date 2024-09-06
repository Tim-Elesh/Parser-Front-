import { useStore } from "../store/store";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

const ThemeToggleButton = () => {
  const theme = useStore((state: { theme: any; }) => state.theme); // Получаем текущую тему из глобального состояния
  const setTheme = useStore((state: { setTheme: any; }) => state.setTheme); // Получаем функцию для изменения темы

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark'); // Переключаем тему
  };

  return (
    <button
      onClick={toggleTheme}
      className={` p-2.5 rounded ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} cursor-pointer`}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggleButton;
