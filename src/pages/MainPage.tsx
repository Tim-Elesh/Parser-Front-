import React, { Suspense, useState, useEffect } from 'react';
import Table from "../components/Table/Table";
import Loading from '../components/Loading';
import GraphHeader from '../components/GraphHeader';
import Search from '../components/SearchableTable/Search';
import { transformData } from '../utils/transformData';
import { useStore } from '../store/store';
import Period from '../components/Period';
import ErrorBoundary from '../components/ErrorBoundary';

//zabil build sobrat'

const Graph = React.lazy(() => import('../components/Graph'))

const MainPage = () => {
  const [tableData, setTableData] = useState<ReturnType<typeof transformData>>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Добавляем состояние для поискового запроса
  const theme = useStore((state: { theme: any; }) => state.theme);

  useEffect(() => {
    let isMounted = true; // флаг для отслеживания состояния монтирования

    const fetchData = async () => {
      try {
        console.log('Fetching data...');

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const response = await fetch(`https://tivi.aitomaton.online/date/${formattedDate}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        console.log('Raw data:', rawData);

        const transformedData = transformData(rawData);
        console.log('Transformed data:', transformedData);

        if (isMounted) { // проверка на монтирование компонента
          setTableData(transformedData);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // обновляем флаг при размонтировании
    };
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Suspense fallback={<Loading />}>
        <div className="mx-0 sm:mx-10 md:mx-10 lg:mx-12 xl:mx-14 2xl:mx-14 flex flex-col justify-start w-full">
          <GraphHeader />
          <div className='flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-around h-1/2 w-full'>
              <Graph />
              <div>
                <Search onSearch={setSearchQuery} />
                <Table data={tableData} searchQuery={searchQuery} />
              </div>
          </div>
          <Period />
        </div>
      </Suspense>
    </div>
  );
} 

export default MainPage;