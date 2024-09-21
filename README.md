## React + TypeScript + Vite

Этот шаблон предоставляет минимальную настройку для работы с React в Vite с поддержкой горячей перезагрузки модулей (HMR) и некоторыми правилами ESLint.

## Для того чтобы запустить проект нужно ввести команды
   #### git clone https://github.com/Tim-Elesh/Parser-Front-.git
   #### npm i
   #### npm run dev





В настоящее время доступны два официальных плагина:

    @vitejs/plugin-react использует Babel для Fast Refresh.
    @vitejs/plugin-react-swc использует SWC для Fast Refresh.

Расширение конфигурации ESLint

Если вы разрабатываете приложение для продакшена, мы рекомендуем обновить конфигурацию, чтобы включить правила линтинга, учитывающие типы:

    Настройте свойство parserOptions на верхнем уровне следующим образом:

js

export default tseslint.config({
  languageOptions: {
    // другие параметры...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})

    Замените tseslint.configs.recommended на tseslint.configs.recommendedTypeChecked или tseslint.configs.strictTypeChecked.
    При желании добавьте ...tseslint.configs.stylisticTypeChecked.
    Установите eslint-plugin-react и обновите конфигурацию:

js

// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Укажите версию React
  settings: { react: { version: '18.3' } },
  plugins: {
    // Добавьте плагин react
    react,
  },
  rules: {
    // другие правила...
    // Включите рекомендуемые правила
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});

## Структура проекта и компоненты:
###  Graph.tsx - График который отображает цены на output & input , в нём же содержится логика обработки данных для графика 
###  Table.tsx - Таблица с моделям, провайдерами моделей , цены на input, цены на output, в этой же таблице содержится логика для обработки данных и их отображения
###  MainPage.tsx - Содержит в себе  Graph.tsx Table.tsx 
###  HomePage.tsx - Стартовая страница которая встречает пользователя
