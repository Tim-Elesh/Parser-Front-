import { useState, useEffect, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Box from '@mui/joy/Box';
import { useColorScheme } from '@mui/joy/styles';

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
  const  palette  = useColorScheme();
  const isDarkMode = palette?.mode === 'dark';

  useEffect(() => {
    let isMounted = true; // флаг для отслеживания состояния монтирования

    const fetchData = async () => {
      try {
        const response = await fetch('https://tivi.aitomaton.online/avg/');
        if (!response.ok) {
          throw new Error(`HTTP error! div
          div
          div
          div
          div
          divstatus: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) { // проверка на монтирование компонента
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // обновляем флаг при размонтировании
    };
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
      background: isDarkMode ? '#000' : '#fff',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value: string, timestamp?: number): string {
          if (timestamp) {
            return formatDate(new Date(timestamp).toISOString());
          }
          return value; // fallback to the original value if timestamp is not provided
        },
        style: {
          colors: isDarkMode ? '#fff' : '#000',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? '#fff' : '#000',
        },
      },
    },
    colors: ['#FF0000', '#82ca9d'],
    stroke: {
      width: 3,
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
    },
    legend: {
      labels: {
        colors: isDarkMode ? '#fff' : '#000',
      },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // for `w-full`
        '@media (min-width: 1280px)': {
          width: '50%',
        },
        '@media (min-width: 1536px)': {
          width: '50%',
        },
      }}
      className="flex flex-col w-full xl:w-1/2 2xl:w-1/2">
      <Box
        sx={{

        }}
      //className="w-full lg:w-full lg:max-w-xl xl:w-full xl:max-w-2xl 2xl:w-full 2xl:max-w-3xl mb-4"
      >
        {series[0].data.length > 0 ? (
          <ReactApexChart options={options} series={series} type="line" height={500} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'grey.500',
              fontSize: '1.125rem',
              lineHeight: '1.75rem',
              fontWeight: '600'
            }}
          >
            No data available
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Graph;
