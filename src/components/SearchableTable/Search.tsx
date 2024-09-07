import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useStore } from '../../store/store';

type SearchProps = {
    onSearch: (query: string) => void;
};

export default function Search({ onSearch }: SearchProps) {
    const [query, setQuery] = useState('');
    const theme = useStore((state: { theme: any; }) => state.theme);

    useEffect(() => {
        onSearch(query);
    }, [query, onSearch]);

    return (
        <div className={`flex items-center my-5 w-full z-10 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <label htmlFor="search" className="relative w-full flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full px-4 py-2 pl-10 pr-4 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${theme === 'dark' ? "border-gray-800 bg-black text-white focus:ring-slate-800" : "border-gray-300 bg-white text-black focus:ring-indigo-200"}`}
            />
            <FaSearch className="absolute left-3 text-gray-400" />
          </label>
        </div>
      );
      
}
