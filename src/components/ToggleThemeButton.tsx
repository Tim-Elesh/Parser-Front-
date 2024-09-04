import { useTheme } from '../hooks/useTheme';
import { FaSun, FaMoon } from "react-icons/fa";

export default function ButtonTheme() {
    const { isDark, toggleTheme } = useTheme(); // Получаем состояние темы и функцию для переключения

    return (
        <div className='w-12'>
            <button className='w-10 h-10 mx-2 my-4 rounded-lg bg-gray-700 flex items-center justify-center text-white' onClick={toggleTheme}>
                {isDark ? <FaSun /> : <FaMoon />} {/* Меняем иконку в зависимости от состояния темы */}
            </button> {/* Обработчик события */}
        </div>
    );
}