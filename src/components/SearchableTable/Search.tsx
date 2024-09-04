import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useTheme } from '../../hooks/useTheme';

type SearchProps = {
    onSearch: (query: string) => void;
};

export default function Search({ onSearch }: SearchProps) {
    const { isDark } = useTheme(); // Получаем состояние темы
    const [query, setQuery] = useState('');

    useEffect(() => {
        onSearch(query);
    }, [query, onSearch]);

    return (
        <div className={`flex items-center my-5 w-full ${isDark ? 'text-gray-400' : 'text-gray-500'} ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <label htmlFor="search" className={`relative w-full flex items-center`}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={`w-full px-4 py-2 pl-10 pr-4 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${isDark ? 'border-gray-600 bg-gray-800 text-white focus:ring-indigo-500' : 'border-gray-300 bg-white text-black focus:ring-indigo-200'}`}
                />
                <FaSearch className={`absolute left-3 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </label>
        </div>
    );
}
