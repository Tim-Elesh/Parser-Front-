import { useState, useEffect } from "react";
import Graph from "../components/Graph";
import Table from "../components/Table/Table";
import { transformData, RawData } from '../utils/transformData';
import Period from "../components/Period";
import ThemeButton from "../components/ThemeButton";
import { useStore } from '../store/store';

const MainPage = () => {
  const [tableData, setTableData] = useState<ReturnType<typeof transformData>>([]);
  const theme = useStore((state: { theme: any; }) => state.theme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...'); // Лог для проверки выполнения запроса

        // Получаем текущую дату
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // Формируем URL с текущей датой
        const response = await fetch(`http://145.249.249.29:3006/date/${formattedDate}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData: RawData = await response.json();
        console.log('Raw data:', rawData); // Лог для проверки сырых данных
        const transformedData = transformData(rawData);
        console.log('Transformed data:', transformedData); // Лог для проверки трансформированных данных
        setTableData(transformedData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`min-h-max ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div>
        <ThemeButton />
      </div>
      <div className="mx-14 flex flex-col justify-start">
        <Graph />
        <Period onPeriodChange={() => { }} />
        <Table data={tableData} />
      </div>
    </div>
  );
}

export default MainPage;