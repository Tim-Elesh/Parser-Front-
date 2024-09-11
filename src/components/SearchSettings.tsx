import { IoSettingsSharp } from "react-icons/io5";
import { useStore } from "../store/store";
import { useState } from "react";

const SearchSettings = () =>{
    const theme = useStore((state: { theme: any; }) => state.theme);
    const [isSpinning,setIsSpinning] = useState(false);

    return(
        <div className="w-[2%]">
            <button 
                className={`p-3 rounded ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} cursor-pointer transition-transform duration-300 transform ${isSpinning ? 'rotate-180' : ''}`} 
                onClick={() => setIsSpinning(!isSpinning)} // Toggle spinning on click
            >
                <IoSettingsSharp />
            </button>
        </div>
    )
}

export default SearchSettings;