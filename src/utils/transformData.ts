// transformData.ts

export type RawData = {
    [model: string]: {
      [provider: string]: {
        input_price: string;
        output_price: string;
      };
    };
  };
  
  export type TableData = {
    model: string;
    provider: string;
    input: string;
    output: string;
  };
  
  export const transformData = (data: RawData): TableData[] => {
    const result: TableData[] = [];
    
    for (const model in data) {
      for (const provider in data[model]) {
        result.push({
          model,
          provider,
          input: data[model][provider].input_price,
          output: data[model][provider].output_price,
        });
      }
    }
    
    return result;
  };
  
  // Пример использования:
  const rawData: RawData = {/* твои данные JSON */};
  const tableData = transformData(rawData);
  