import { FaCalendar } from "react-icons/fa";
import { useStore } from "../store/store";

const CalendarButton = () => {
    const theme = useStore((state: { theme: any; }) => state.theme);

    return (
        <div>
            <button className={` p-3 rounded ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-black'} cursor-pointer`}>
                <FaCalendar />
            </button>
        </div>
    )
}

export default CalendarButton;