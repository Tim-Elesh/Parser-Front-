import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useStore } from '../store/store';

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

  const series = [
    {
      name: 'Average Input Price',
      data: data.map((item) => ({ x: new Date(item.date).getTime(), y: item.av_input_price })),
    },
    {
      name: 'Average Output Price',
      data: data.map((item) => ({ x: new Date(item.date).getTime(), y: item.av_output_price })),
    },
  ];

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
    <div className='-ml-12'>
      <ReactApexChart options={options} series={series} type="line" height={400} width={450}/>
    </div>
  );
};

export default Graph;