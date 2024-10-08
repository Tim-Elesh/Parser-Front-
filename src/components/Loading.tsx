import React from "react";
import { Box, Typography } from "@mui/joy";
import { useColorScheme } from '@mui/joy/styles';

const Loading: React.FC = () => {
    const palette = useColorScheme();
    const isDarkMode = palette?.mode === 'dark';

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh', // Соответствует `min-h-screen` в Tailwind
                width: '100%', // `w-full`
                backgroundColor: isDarkMode ? 'black' : 'grey.100', // `bg-black` или `bg-gray-100`
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '64px', // `w-16` в Tailwind равен 64px
                        height: '64px', // `h-16`
                        borderWidth: '4px', // `border-4`
                        borderStyle: 'solid',
                        borderColor: 'blue.500', // оба условия указанного стиля идентичны
                        borderTopColor: 'transparent', // `border-t-4`
                        borderRadius: '50%', // `rounded-full`
                        animation: 'spin 1s linear infinite', // `animate-spin` (нужно будет добавить CSS для @keyframes spin)
                    }}
                />
                <Typography
                    sx={{
                        marginTop: '16px', // `mt-4`
                        color: isDarkMode ? 'text-white' : 'grey.600', // `text-white` или `text-gray-600`
                        fontSize: '1.125rem', // `text-lg`
                    }}
                >
                    Loading...
                </Typography>
            </Box>
        </Box>
    );
};

export default Loading;