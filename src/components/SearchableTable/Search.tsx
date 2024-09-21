import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useStore } from '../../store/store';

type SearchProps = {
    onSearch: (query: string) => void;
    initialQuery?: string; // Добавим возможность задать начальный поиск
};

export default function Search({ onSearch, initialQuery = '' }: SearchProps) {
    const [query, setQuery] = useState(initialQuery);
    const theme = useStore((state: { theme: any; }) => state.theme);

    useEffect(() => {
        onSearch(query);
    }, [query, onSearch]);

    return (
        <div className={`flex items-center my-5 w-full ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <label htmlFor="search" className="relative w-full z-10 flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={`w-full px-4 py-2 pl-10 pr-4 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${theme === 'dark' ? "border-gray-800 bg-black text-white focus:ring-slate-800 outline-none" : "border-gray-300 bg-white text-black focus:ring-indigo-200 outline-none"}`}
                />
                <FaSearch className="absolute left-3 text-gray-400" />
            </label>
        </div>
    );
}
