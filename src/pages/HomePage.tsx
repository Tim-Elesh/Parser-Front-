import { Link } from 'react-router-dom';
import FAQComponent from '../components/FAQ'; // Make sure to update the path as needed

const HomePage = () => {
    return (
        <div className={`flex flex-col items-center justify-center h-screen dark:bg-black light:bg-gray-100`}>
            <h1 className="text-4xl font-bold mb-4">Welcome to UIGraph</h1>
            <Link to="/main" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to Main Page
            </Link>
            <div className="mt-8 w-full px-4">
                <FAQComponent />
            </div>
        </div>
    );
};

export default HomePage;