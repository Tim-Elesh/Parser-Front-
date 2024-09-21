import React, { Suspense, useState, useEffect } from 'react';
import Table from "../components/Table/Table";
import Loading from '../components/Loading';
import GraphHeader from '../components/GraphHeader';
import Search from '../components/SearchableTable/Search';
import { transformData, RawData } from '../utils/transformData';
import { useStore } from '../store/store';
import Period from '../components/Period';
import ErrorBoundary from '../components/ErrorBoundary';

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
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Suspense fallback={<Loading />}>
        <div className="mx-14 flex flex-col justify-start w-full">
          <GraphHeader />
          <Search onSearch={setSearchQuery} />
          <div className='flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-around h-1/2 w-full'>
            <ErrorBoundary>
              <Graph />
            </ErrorBoundary>
            <ErrorBoundary>
              <Table data={tableData} searchQuery={searchQuery} />
            </ErrorBoundary>
          </div>
          <Period />
        </div>
      </Suspense>
    </div>
  );
} 

export default MainPage;