import { useEffect, useState } from 'react';
import axios from 'axios';
import TableData from "../types/TableData";

interface ModelData {
    model: string;
    provider: string;
    input: number;
    output: number;
}

interface BenchItem {
    LLMarena: number | null;
    MMLU: number | null;
}

type RawDataType = Record<string, ModelData>;
type BenchDataType = Record<string, BenchItem[]>;

const useDataFetcher = () => {
    const [tableData, setTableData] = useState<TableData[]>([]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;

                const [rawDataResponse, benchDataResponse] = await Promise.all([
                    axios.get(`https://tivi.aitomaton.online/date/${formattedDate}`),
                    axios.get(`https://tivi.aitomaton.online/bench/${formattedDate}`)
                ]);

                const rawData = rawDataResponse.data;
                const benchData = benchDataResponse.data;

                console.log('rawData:', rawData);
                console.log('benchData:', benchData);

                if (typeof benchData !== 'object' || benchData === null) {
                    console.error('Invalid benchData format');
                    return;
                }

                const transformData = (rawData: RawDataType, benchData: BenchDataType): TableData[] => {
                    return Object.entries(rawData).map(([modelName, modelData]) => {
                      let benchKey: string | null = null;
                      let benchValue: number | null = null;
                  
                      if (Object.prototype.hasOwnProperty.call(benchData, modelName) &&
                          Array.isArray(benchData[modelName]) &&
                          benchData[modelName].length > 0) {
                        const benchItem = benchData[modelName][0];
                  
                        if (benchItem.LLMarena !== null) {
                          benchKey = 'LLMarena';
                          benchValue = Number(benchItem.LLMarena);
                        } else if (benchItem.MMLU !== null) {
                          benchKey = 'MMLU';
                          benchValue = Number(benchItem.MMLU);
                        }
                      }
                  
                      return {
                        model: modelName,
                        provider: modelData.provider || '',
                        input: modelData.input || 0,
                        output: modelData.output || 0,
                        bench: benchKey,
                        value: benchValue,
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

    return tableData;
};

export default useDataFetcher;