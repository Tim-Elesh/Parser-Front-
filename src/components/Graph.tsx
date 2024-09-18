import React, { useState, useEffect, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useStore } from '../store/store';
import BrushChart from './BrushChart';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-GB', options).replace(',', '');
};

const Graph = () => {
  const [data, setData] = useState([]);
  const theme = useStore((state) => state.theme);

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

  const series = useMemo(() => [
    {
      name: 'Average Input Price',
      data: data.map((item) => ({ x: new Date(item.date).getTime(), y: item.av_input_price })),
    },
    {
      name: 'Average Output Price',
      data: data.map((item) => ({ x: new Date(item.date).getTime(), y: item.av_output_price })),
    },
  ], [data]);

  const options = {
    chart: {
      type: 'line',
      background: theme === 'dark' ? '#000' : '#fff',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val) {
          return formatDate(new Date(val));
        },
        style: {
          colors: theme === 'dark' ? '#fff' : '#000',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === 'dark' ? '#fff' : '#000',
        },
      },
    },
    colors: ['#FF0000', '#82ca9d'],
    stroke: {
      width: 3,
    },
    tooltip: {
      theme: theme,
    },
    legend: {
      labels: {
        colors: theme === 'dark' ? '#fff' : '#000',
      },
    },
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-4xl mb-4">
        {series.length > 0 ? (
          <ReactApexChart options={options} series={series} type="line" height={400} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg font-semibold">
            No data available
          </div>
        )}
      </div>
      {series.length > 0 && <BrushChart series={series} theme={theme} />}
    </div>
  );
};

export default Graph;