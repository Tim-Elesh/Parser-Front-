interface TableData {
  model: string;
  provider: string;
  input: number; 
  output: number;
  bench: string | null;
  value: number | null;
}

export default TableData;