export type RawData = {
  [model: string]: Array<{
    date: string;
    [provider: string]: string; // Значение - строка в формате "input/output"
  }>;
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
    data[model].forEach((entry) => {
      for (const provider in entry) {
        if (provider !== "date") {
          const [input, output] = entry[provider].split("/");
          result.push({
            model,
            provider,
            input,
            output,
          });
        }
      }
    });
  }

  return result;
};

  