import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStore } from '../store/store'; // Импортируйте ваш провайдер темы

// Функция для форматирования даты
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
};

const Graph: React.FC = () => {
    const [data, setData] = useState([]);
    const  theme  = useStore((state: { theme: any; }) => state.theme); // Получите текущую тему

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://145.249.249.29:3006/avg');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='-ml-12'>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid/>
                    <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate} 
                    tick={{ fontSize: 8 }} // Removed angle
                    textAnchor="end"
                    transform="rotate(-90)" // Added transform for rotation
                    />
                    <YAxis />
                    <Tooltip contentStyle={{ 
                        backgroundColor: theme === 'dark' ? 'black' : 'white', 
                        color: theme === 'dark' ? 'white' : 'black' 
                    }} /> // Изменен стиль подсказки в зависимости от темы
                    <Legend />
                    <Line type="monotone" dataKey="av_input_price" stroke="red" strokeWidth={3} />
                    <Line type="monotone" dataKey="av_output_price" stroke="#82ca9d" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;