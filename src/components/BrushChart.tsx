import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface BrushChartProps {
  series: {
    name: string;
    data: { x: number; y: number }[];
  }[];
  theme: 'dark' | 'light';
}

const BrushChart: React.FC<BrushChartProps> = ({ series, theme }) => {
  const brushChartOptions: ApexOptions = {
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
        formatter: function (value: string) {
          const val = Number(value); // Convert string to number
          const date = new Date(val);
          const options = {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          };
          return date.toLocaleDateString('en-GB', options as Intl.DateTimeFormatOptions).replace(',', '');
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

  return (
    <div className="w-full max-w-4xl">
      <ReactApexChart options={brushChartOptions} series={series} type="area" height="130px" width="100%" />
    </div>
  );
};

export default BrushChart;