import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/store';

const App: React.FC = () => {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme); // Set color-scheme on load
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

