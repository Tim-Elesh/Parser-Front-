import { useState, useEffect, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useStore } from '../store/store';

// Define the type for data items
interface DataItem {
  date: string;
  av_input_price: number;
  av_output_price: number;
}

// Function to format date strings
const formatDate = (dateString: string): string => {
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

const Graph = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const theme = useStore((state: { theme: string }) => state.theme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://145.249.249.29:3006/avg');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: DataItem[] = await response.json();
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
      data: data.map((item) => ({
        x: new Date(item.date).getTime(),
        y: item.av_input_price
      })),
    },
    {
      name: 'Average Output Price',
      data: data.map((item) => ({
        x: new Date(item.date).getTime(),
        y: item.av_output_price
      })),
    },
  ], [data]);

  const options: ApexOptions = {
    chart: {
      id: 'main-chart',
      type: 'line' as const,
      background: theme === 'dark' ? '#000' : '#fff',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function(value: string, timestamp?: number): string {
          if (timestamp) {
            return formatDate(new Date(timestamp).toISOString());
          }
          return value; // fallback to the original value if timestamp is not provided
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
      theme: theme === 'dark' ? 'dark' : 'light',
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
        {series[0].data.length > 0 ? (
          <ReactApexChart options={options} series={series} type="line" height={400} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg font-semibold">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph;