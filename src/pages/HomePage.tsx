import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to My Project</h1>
            <Link to="/main" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to Main Page
            </Link>
        </div>
    );
};

export default HomePage;