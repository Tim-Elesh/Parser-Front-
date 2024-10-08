/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from "react";


const SearchSettings = () =>{
    const [isSpinning,setIsSpinning] = useState(false);

    return(
        <div className="w-[2%]">
            <button 
                className={`p-3 rounded  bg-white text-black cursor-pointer transition-transform duration-300 transform ${isSpinning ? 'rotate-180' : ''}`} 
                onClick={() => setIsSpinning(!isSpinning)} // Toggle spinning on click
            >
                <IoSettingsSharp />
            </button>
        </div>
    )
}

export default SearchSettings;