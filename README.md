## React + TypeScript + Vite

Этот шаблон предоставляет минимальную настройку для работы с React в Vite с поддержкой горячей перезагрузки модулей (HMR) и некоторыми правилами ESLint.

## Для того чтобы запустить проект нужно ввести команды
   #### git clone --branch production https://github.com/Tim-Elesh/Parser-Front-.git - клонирование репозитория на локальный компьютер.
   #### cd <название_проекта> - переход в директорию проекта.
   #### npm i - установка всех зависимостей, указанных в проекте (если они нужны для запуска сервера).
   #### npm install -g http-server - глобальная установка статического сервера http-server для раздачи файлов.
   #### http-server dist - запуск сервера serve для раздачи файлов из директории dist

## Структура проекта и компоненты:
###  Graph.tsx - График который отображает цены на output & input , в нём же содержится логика обработки данных для графика 
```
30-45 line
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://145.249.249.29:3006/avg');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: DataItem[] = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
```
###  Table.tsx - Таблица с моделям, провайдерами моделей , цены на input, цены на output
###  MainPage.tsx - Содержит в себе  Graph.tsx Table.tsx , тут содержится логика обработки данных для таблицы
```
  18-41 line
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const response = await fetch(`http://145.249.249.29:3006/date/${formattedDate}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData: RawData = await response.json();
        console.log('Raw data:', rawData);
        const transformedData = transformData(rawData);
        console.log('Transformed data:', transformedData);
        setTableData(transformedData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
```
###  HomePage.tsx - Стартовая страница которая встречает пользователя
