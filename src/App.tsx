import React, { useState, useEffect } from "react";
import Graph from "./components/Graph";
import Table from "./components/Table/Table";
import { transformData, RawData } from './utils/transformData';
import Period from "./components/Period";

const App: React.FC = () => {
  const [tableData, setTableData] = useState<ReturnType<typeof transformData>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://145.249.249.29:3006/date/<YYYY-MM-DD>');
        const rawData: RawData = await response.json();
        const transformedData = transformData(rawData);
        setTableData(transformedData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Graph />
      <Period />
      <Table data={tableData} />
    </div>
  );
};

export default App;

