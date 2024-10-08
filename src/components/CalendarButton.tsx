/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCalendar } from "react-icons/fa";
import { Button, Box } from '@mui/joy';

const CalendarButton = () => {
    return (
        <Box>
            <Button className={` p-3 rounded bg-white text-black cursor-pointer`}>
                <FaCalendar />
            </Button>
        </Box>
    )
}

export default CalendarButton;