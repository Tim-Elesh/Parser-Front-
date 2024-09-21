import { useStore } from '../store/store';


const Period: React.FC = () => {
    
  const theme = useStore((state: { theme: any; }) => state.theme);
   

    return (
        <div className={`flex flex-col md:flex-row items-center gap-4 max-w-full my-6 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>

        </div>
      );
      
}

export default Period;