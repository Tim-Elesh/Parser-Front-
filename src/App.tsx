import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

