import React, { Suspense, useState, useEffect } from 'react';
import Table from "../components/Table/Table";
import Loading from '../components/Loading';
import GraphHeader from '../components/GraphHeader';
import Search from '../components/SearchableTable/Search';
import { transformData, RawData } from '../utils/transformData';
import ThemeButton from "../components/ThemeButton";
import { useStore } from '../store/store';

const Graph = React.lazy(() => import('../components/Graph'))

const MainPage = () => {
  const [tableData, setTableData] = useState<ReturnType<typeof transformData>>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Добавляем состояние для поискового запроса
  const theme = useStore((state: { theme: any; }) => state.theme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const response = await fetch(`http://145.249.249.29:3006/date/${formattedDate}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData: RawData = await response.json();
        console.log('Raw data:', rawData);
        const transformedData = transformData(rawData);
        console.log('Transformed data:', transformedData);
        setTableData(transformedData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`min-h-max ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Suspense fallback={<Loading />}>
        <div className="mx-14 flex flex-col justify-start">
          <GraphHeader />
          <Search onSearch={setSearchQuery} /> {/* Добавляем компонент Search в MainPage */}
          <div className='flex justify-around h-1/2 w-full'>
            <Graph />
            <Table data={tableData} searchQuery={searchQuery} /> {/* Передаем searchQuery в Table */}
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default MainPage;