import { useTheme } from '../hooks/useTheme';
import { FaSun, FaMoon } from "react-icons/fa";

export default function ButtonTheme() {
    const { isDark, toggleTheme } = useTheme();

    const handleClick = () => {
        toggleTheme();
        console.log(`Theme toggled to: ${isDark ? 'Light' : 'Dark'}`); // Проверка работоспособности
    };

    return (
        <div className='w-12'>
            <button className='w-10 h-10 my-2 rounded-lg bg-gray-700 flex items-center justify-center text-white hover:bg-gray-800 duration-300' onClick={handleClick}>
                {isDark ? <FaSun /> : <FaMoon />}
            </button>
        </div>
    );
}