import axios from 'axios';
import TableData from '../types/TableData'; // Убедитесь, что путь корректен

// Интерфейс для исходных данных
interface RawDataItem {
  LLMArena: string | null;
  MMLU: string | null;
  date: string | null;
  provider: string;
  [key: string]: string | number | null;
}

// Интерфейс для ответа сервера
interface DataResponse {
  [key: string]: RawDataItem[] | undefined; // Добавлено `undefined` для обработки отсутствующих данных
}

// Функция для получения данных
async function fetchData(): Promise<TableData[]> {
  try {
    // Форматирование текущей даты
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`; // Подготовка текущей даты

    // Параллельные запросы на сервер
    const [dateResponse, benchResponse] = await Promise.all([
      axios.get<DataResponse>(`https://tivi.aitomaton.online/date/${formattedDate}`),
      axios.get<DataResponse>(`https://tivi.aitomaton.online/bench/${formattedDate}`),
    ]);

    const dateData = dateResponse.data;
    const benchData = benchResponse.data;

    console.log("data from date");
    console.log(dateData);
    console.log("data from bench");
    console.log(benchData);

    // Преобразование данных
    return transformData(dateData, benchData);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}

// Функция для разделения строки input/output на числа
function splitInputOutput(inputOutput: string): [number, number] {
  const [input, output] = inputOutput.split('/').map(value => parseFloat(value) || 0); // Преобразуем в числа, используем 0 по умолчанию
  return [input, output];
}

// Функция для определения провайдера
function determineProvider(entry: RawDataItem): string {
  const excludes = ['LLMArena', 'MMLU', 'date']; // Исключаем ключи
  const keys = Object.keys(entry);
  
  for (const key of keys) {
    const value = entry[key];
    if (value && !excludes.includes(key)) {
      console.log(key);
      console.log(entry[key]);
      return key;// Возвращает имя провайдера
    }
  }

  return ''; // Возвращаем пустую строку, если провайдер не найден
}

// Преобразование данных в нужный формат
function transformData(dateData: DataResponse, benchData: DataResponse): TableData[] {
  const result: TableData[] = [];

  // Объединение ключей из обоих наборов данных
  const keys = new Set([...Object.keys(dateData), ...Object.keys(benchData)]);

  // Обработка данных
  keys.forEach((key) => {
    const dateEntries = dateData[key] || [];
    const benchEntries = benchData[key] || [];

    // Функция для обработки каждого элемента
    const processEntries = (entries: RawDataItem[]) => {
      entries.forEach((entry) => {
        const provider = determineProvider(entry);
        const inputOutput= entry[key]; // Используем 0 по умолчанию
        const [input, output] = splitInputOutput(inputOutput); // Разделение input/output

        result.push({
          model: key,
          provider: provider,
          input: input,
          output: output,
          bench: [entry.LLMArena, entry.MMLU].filter(Boolean).join(', '), // Объединение бенчмарков
          value: parseNumber(entry.openAI), // Замените openAI на нужное поле, если требуется
        });
      });
    };

    processEntries(dateEntries); // Обработка данных с даты
    processEntries(benchEntries); // Обработка данных с бенча
  });

  return result; // Возвращаем преобразованный результат
}

// Функция для преобразования строки в число
function parseNumber(value: string | number | null): number | null {
  if (value === null || value === '') {
    return null; // Возвращаем null для пустых значений
  }
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? null : num; // Возвращаем null для некорректных чисел
}

export default fetchData;