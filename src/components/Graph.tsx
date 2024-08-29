import React, { PureComponent } from 'react';
import data from '../data/data'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Graph() {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="input" stroke="red" strokeWidth={3}/>
                <Line type="monotone" dataKey="output" stroke="#82ca9d" strokeWidth={3}/>
            </LineChart>
        </ResponsiveContainer>
    )
}