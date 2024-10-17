import { useState, useEffect } from 'react';
import TableData from '../types/TableData'; 

function useDataFetcher(): TableData[] {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    
  }, []);

  return data;
}

export default useDataFetcher;