Простая блог-платформа с возможностью просмотра, создания и поиска постов и комментариев.

Основные функции:
Главная страница - отображение всех постов в виде сетки
Страница поста - детальный просмотр поста с комментариями
Страница поиска - фильтрация постов по названию
Создание постов - модальное окно для добавления новых постов
Адаптивный дизайн - поддержка различных разрешений экрана

Технические особенности:
Состояние и данные обрабатываются через Redux Toolkit / RTK Query.
Все запросы выполняются к DummyJSON API.
Маршрутизация с помощью React Router (несколько страниц/вью).
Использование UI-библиотеки Material UI.
Сборка проекта через Vite (с настройкой основных конфигураций).

зависимости:
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^7.3.7",
    "@mui/material": "^7.3.7",
    "@reduxjs/toolkit": "^2.11.2",
    "axios": "^1.13.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.12.0",
    "react-use": "^17.6.0",
    "redux": "^5.0.1",
    "yup": "^1.7.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/material-ui": "^0.21.18",
    "@types/node": "^25.0.10",
    "@types/react": "^19.2.9",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react-swc": "^4.2.2",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "^5.9.3",
    "vite": "^7.2.4"
  }



Инструкция по запуску:
  1.git clone <repository-url>
  cd <project-folder>
  2. установка зависимостей 
  npm install
  3.Создать файл .env в корне проекта и добавить:
  VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
  4.npm run dev
  5.Приложение будет доступно по адресу: http://localhost:5173
