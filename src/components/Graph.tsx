import React, { useState, useEffect, useMemo } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://145.249.249.29:3006/avg');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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

  const mainChartOptions = {
    chart: {
      id: 'main-chart',
      type: 'line',
      background: theme === 'dark' ? '#000' : '#fff',
      toolbar: {
        show: true,
      },
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
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: '50vh',
          },
          xaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '10px',
              },
            },
          },
        },
      },
    ],
  };

  const brushChartOptions = {
    chart: {
      id: 'brush-chart',
      type: 'area',
      height: 130,
      brush: {
        target: 'main-chart',
      },
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
    colors: ['#FF0000'],
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 100,
          },
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-4xl mb-4">
        <ReactApexChart options={mainChartOptions} series={series} type="line" height="400px" width="100%" />
      </div>
      <div className="w-full max-w-4xl">
        <ReactApexChart options={brushChartOptions} series={series} type="area" height="130px" width="100%" />
      </div>
    </div>
  );
};

export default Graph;