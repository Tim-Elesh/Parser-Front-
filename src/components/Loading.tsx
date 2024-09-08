import React from "react";
import { useStore } from "../store/store";

const Loading: React.FC = () => {
    const theme = useStore((state) => state.theme); // Get the current theme from the store

    return (
        <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
            <div className="flex flex-col items-center">
                <div className={`w-16 h-16 border-4 border-t-4 ${theme === 'dark' ? 'border-blue-500' : 'border-blue-500'} border-solid rounded-full animate-spin`}></div>
                <p className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-600'} text-lg`}>Loading...</p>
            </div>
        </div>
    );
};

export default Loading;