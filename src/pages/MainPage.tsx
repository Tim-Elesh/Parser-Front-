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
    { id: 'bench', label: 'Bench' },
    { id: 'value', label: 'Value' }
  ]

  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
  
        const response1 = await fetch(`https://tivi.aitomaton.online/date/${formattedDate}`);
        const response2 = await fetch(`https://tivi.aitomaton.online/bench/${formattedDate}`);
        
        if (!response1.ok || !response2.ok) {
          throw new Error(`HTTP error! status: ${response1.status} or ${response2.status}`);
        }
  
        const rawData = await response1.json();
        const benchData = await response2.json();

        console.log(Object.values(rawData));
        

        const transformData = (rawData: Object, benchData: Object) => {
          return Object.values(rawData).map((item) => {
            const benchItem = Object.values(benchData).find(bench => bench.id === item.id);
            return {
              ...item,
              bench: benchItem ? benchItem.bench : null,
              value: benchItem ? benchItem.value : null,
            };
          });
        };
  
        const transformedData = transformData(rawData, benchData);
  
        if (isMounted) {
          setTableData(transformedData);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
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