/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Input} from '@mui/joy'

type SearchProps = {
    onSearch: (query: string) => void;
    initialQuery?: string; // Добавим возможность задать начальный поиск
};

export default function Search({ onSearch, initialQuery = '' }: SearchProps) {
    const [query, setQuery] = useState(initialQuery);

    useEffect(() => {
        onSearch(query);
    }, [query, onSearch]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '90%',
                backgroundColor: 'white',
                color: 'black',
            }}
        >
            <Box
                component="label"
                htmlFor="search"
                sx={{
                    position: 'relative',
                    width: '100%',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Input
                    id="search" // Добавим id, чтобы соответствовать `htmlFor`
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{
                        width: '100%',
                        paddingX: '16px', // `px-4`
                        paddingY: '8px', // `py-2`
                        paddingLeft: '40px', // `pl-10` (40px)
                        paddingRight: '16px', // `pr-4`
                        border: `1px solid #d1d5db`, // `border-gray-800` или `border-gray-300`
                        borderRadius: '4px', // `rounded-md`
                        boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)', // `shadow-sm`, может быть адаптировано из темы
                        backgroundColor:  'white',
                        color: 'black',
                        '&:focus': {
                            outline: 'none',
                            boxShadow: `0 0 0 4px #c3cde6`, // `focus:ring-slate-800` или `focus:ring-indigo-200`
                        },
                    }}
                />
                <SearchIcon sx={{ position: 'absolute', left: '12px', color: 'gray.400' }} />
            </Box>
        </Box>
    );
} 