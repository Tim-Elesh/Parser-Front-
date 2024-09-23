import { Link } from 'react-router-dom';
import FAQComponent from '../components/FAQ'; // Make sure to update the path as needed

const HomePage = () => {
    return (
        <div className={`flex w-full flex-col items-center justify-center h-screen dark:bg-black dark:text-white light:bg-gray-100 light:text-black`}>
            <h1 className="text-5xl font-bold mb-4">Welcome to UIGraph</h1>
            <div className="mt-8 w-full px-4">
                <FAQComponent />
            </div>
            <Link to="/main" className="px-4 py-4 w-1/3 bg-blue-500 text-white text-center rounded hover:bg-blue-600 duration-300">
                Go to Main Page
            </Link>
        </div>
    );
};

export default HomePage;