import TableData from "../types/TableData";

interface ModelPerformance {
  LLMarena: string | null;
  MMLU: string | null;
  [key: string]: string | null;
}
interface ProviderValues {
  input?: number;
  output?: number;
}
class ModelDataHandler {
  private data: Record<string, ModelPerformance[]>;


  constructor(data: Record<string, ModelPerformance[]>) {
    this.data = data;
  }

  getModelNames(): string[] {
    return Object.keys(this.data);
  }

  getPerformanceData(modelName: string): ModelPerformance[] | null {
    return this.data[modelName] || null;
  }

  updateModelData(modelName: string, newData: ModelPerformance[]): void {
    this.data[modelName] = newData;
  }

  getNonNullProviders(): string[] {
      const excluded = ['LLMArena', 'MMLU', 'date'];
      const providersSet = new Set<string>();
      for (const [modelName, modelPerformances] of Object.entries(this.data)) {
        for (const performance of modelPerformances) {
          for (const [key, value] of Object.entries(performance)) {
            console.log(`Model: ${modelName}`, key, value, value !== null);
            if (value !== null && !excluded.includes(key)) {
              providersSet.add(key);
            }
          }
        }
      }
      return Array.from(providersSet);
    }
   

  generateNonNullProviderValues(modelName: string): Record<string, ProviderValues> | null {
    const modelData = this.data[modelName];
    if (!modelData) return null;

    const excluded = ['LLMArena', 'MMLU', 'date'];
    const providerValues: Record<string, ProviderValues> = {};

    for (const performance of modelData) {
      for (const [key, value] of Object.entries(performance)) {
        if (value !== null && !excluded.includes(key)) {
          if (!providerValues[key]) {
            providerValues[key] = {input: 0, output: 0};
          }
          providerValues[key].input = Number(value.split('/')[0]);
          providerValues[key].output = Number(value.split('/')[1]);
        }
      }
    }

    return providerValues;
  }

  getLatestPerformance(modelName: string): ModelPerformance | null {
    const modelData = this.data[modelName];
    if (!modelData) return null;
    return modelData.reduce((latest, current) =>
      new Date(current.LLMarena || "1970-01-01") > new Date(latest.LLMarena || "1970-01-01")
        ? current
        : latest
    );
  }
}


async function fetchModelData(date: string): Promise<Record<string, ModelPerformance[]>> {
  const response = await fetch(`https://tivi.aitomaton.online/date/${date}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return await response.json();
}

// Example function to use fetched data
export async function handleModelData(): Promise<TableData[]> {
  try {
    const date = '2024-10-15';
    const modelData = await fetchModelData(date);
    const modelHandler = new ModelDataHandler(modelData);
    
    const tableData: TableData[] = [];
    
    for (const modelName of modelHandler.getModelNames()) {
      const providerValues = modelHandler.generateNonNullProviderValues(modelName);
      if (providerValues) {
        for (const provider of Object.keys(providerValues)) {
          const values = providerValues[provider];
          const latestPerformance = modelHandler.getLatestPerformance(modelName);
          tableData.push({
            model: modelName,
            provider: provider,
            input: values.input ?? 0,
            output: values.output ?? 0,
            bench: 'DefaultBench', // Assuming some default bench value
            value: parseFloat(latestPerformance?.MMLU || '0') // Assuming MMLU as the bench value to associate
          });
        }
      }
    }
    
    return tableData;

  } catch (error) {
    console.error('Error handling model data:', error);
    return []; // Return an empty array on error
  }
}

// Run the function to fetch and handle data
handleModelData();