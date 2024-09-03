import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";

type SearchProps = {
    onSearch: (query: string) => void;
};

export default function Search({ onSearch }: SearchProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        onSearch(query);
    }, [query, onSearch]);

    return (
        <div className='flex items-center my-5 w-full'>
            <label htmlFor="search" className='relative text-gray-500 w-full flex items-center'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className='w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white'
                />
                <FaSearch className='absolute left-3 text-gray-400' />
            </label>
        </div>
    );
}
