import { useState, useEffect } from 'react';
import fetchData from './fetchData'; // Путь до вашей функции fetchData
import TableData from '../types/TableData'; // Путь до вашего интерфейса TableData

function useDataFetcher(): TableData[] {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  return data;
}

export default useDataFetcher;