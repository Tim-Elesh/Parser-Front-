import { Link } from 'react-router-dom';
import useTheme from '../store/themeStore';

const HomePage = () => {
    const { isDark } = useTheme();
    return (
        <div className={`flex flex-col items-center justify-center h-screen ${ isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h1 className="text-4xl font-bold mb-4">Welcome to UIGraph</h1>
            <Link to="/main" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to Main Page
            </Link>
        </div>
    );
};

export default HomePage;