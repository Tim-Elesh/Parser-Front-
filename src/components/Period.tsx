import React from "react";

const Period: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 max-w-full">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                Выбрать период
            </button>
            <label className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Начало периода</option>
                </select>
                <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Конец периода</option>
                </select>
            </label>
        </div>
    );
}

export default Period;