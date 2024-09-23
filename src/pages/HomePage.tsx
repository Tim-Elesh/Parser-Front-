import FAQComponent from '../components/FAQ'; 
import { useStore } from '../store/store';

const HomePage = () => {
    const theme = useStore((state: { theme: any; }) => state.theme);

    return (
        <div className={`flex w-full flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to UIGraph</h1>
            <div className="max-w-2xl w-full mx-auto mt-8 px-4">
                <FAQComponent />
            </div>
        </div>
    );
};

export default HomePage;