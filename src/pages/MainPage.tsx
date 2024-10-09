/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useState, useEffect } from 'react';
import Table from "../components/Table/Table";
import Loading from '../components/Loading';
import GraphHeader from '../components/GraphHeader';
import Search from '../components/SearchableTable/Search';
import { transformData } from '../utils/transformData';
import ColumnVisibilityToggle from '../components/ColumnVisibilityToggle';
import Box from '@mui/joy/Box'
import { useColorScheme } from '@mui/joy/styles';

const Graph = React.lazy(() => import('../components/Graph'))

const MainPage = () => {
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [tableData, setTableData] = useState<ReturnType<typeof transformData>>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Добавляем состояние для поискового запроса
  const palette = useColorScheme();
  const isDarkMode = palette?.mode === 'dark';

  const columns = [
    { id: 'model', label: 'Model' },
    { id: 'provider', label: 'Provider' },
    { id: 'input', label: 'Input' },
    { id: 'output', label: 'Output' },
  ]

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
    <Box
      sx={{
        minHeight: '100vh', // `min-h-screen`
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode ? 'black' : 'white',
        color: isDarkMode ? 'white' : 'black',
      }}
    >
      <Suspense fallback={<Loading />}>
        <Box
          sx={{
            marginX: {
              xs: '0',     // `mx-0`
              sm: '40px',  // `sm:mx-10`
              md: '40px',  // `md:mx-10`
              lg: '48px',  // `lg:mx-12`
              xl: '56px',  // `xl:mx-14` и `2xl:mx-14`
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <GraphHeader />
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column', // Без изменения
                lg: 'row',   // `lg:flex-row`
                xl: 'row',   // `xl:flex-row`
                '2xl': 'row' // `2xl:flex-row`
              },
              justifyContent: 'space-between',
              height: '50%', // `h-1/2`
              width: '100%',
            }}
          >
            <Graph />
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3, // `gap-3` (12px)
                  marginBottom: 3, // `mb-3`
                }}
              >
                <Search onSearch={setSearchQuery} />
                <ColumnVisibilityToggle
                  columns={columns}
                  hiddenColumns={hiddenColumns}
                  setHiddenColumns={setHiddenColumns}
                />
              </Box>
              <Table
                data={tableData}
                searchQuery={searchQuery}
                hiddenColumns={hiddenColumns}
              />
            </Box>
          </Box>
        </Box>
      </Suspense>
    </Box>
  );
}

export default MainPage;