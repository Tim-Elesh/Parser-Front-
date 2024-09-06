import React, { useState, useEffect } from "react";
import ThemeButton from "../components/ThemeButton";
import { useStore } from '../store/store';


const Period: React.FC<{ onPeriodChange: (startDate: string, endDate: string) => void }> = ({ onPeriodChange }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dates, setDates] = useState<string[]>([]);
    const theme = useStore((state: { theme: any; }) => state.theme);

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const response = await fetch(`http://145.249.249.29:3006/date`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDates(data);
            } catch (error) {
                console.error('Error fetching dates:', error);
            }
        };

        fetchDates();
    }, []);

    const handleSubmit = () => {
        onPeriodChange(startDate, endDate);
    };

    return (
        <div className={`flex flex-col md:flex-row items-center gap-4 max-w-full my-6 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <label className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <select 
              className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${theme === 'dark' ? "border-gray-700 bg-black text-white focus:ring-blue-700" :"border-gray-300 bg-white text-black focus:ring-blue-500"}`}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            >
              <option value="">Начало периода</option>
              {dates.map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
            <select 
              className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${theme === 'dark' ? "border-gray-700 bg-black text-white focus:ring-blue-700" :"border-gray-300 bg-white text-black focus:ring-blue-500"}`}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            >
              <option value="">Конец периода</option>
              {dates.map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </label>
          <button 
            className={`w-full sm:w-full md:w-1/4 lg:w-1/6 ${theme === 'dark' ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-200 hover:bg-blue-300 text-black"} font-semibold py-2 px-4 rounded transition duration-300`}
            onClick={handleSubmit}
          >
            Выбрать период
          </button>
        </div>
      );
      
}

export default Period;