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
        <div className='flex items-center gap-2 my-4 w-full'>
            <label htmlFor="search" className='text-gray-500 w-full flex items-center gap-2 justify-center bg-gray-100 p-4 rounded-md'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className='w-full md:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                />
                <FaSearch className='text-gray-500' />
            </label>
        </div>
    );
}
