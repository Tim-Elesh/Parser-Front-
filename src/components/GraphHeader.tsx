import CalendarButton from "./CalendarButton";
import ThemeToggleButton from "./ThemeButton";

const GraphHeader = () => {
    return (
        <div className="flex w-full justify-between items-center my-3">
            <h2 className='text-3xl font-bold px-2'>Hello Alex</h2>
            <div className="flex items-center gap-3">
                <CalendarButton />
                <ThemeToggleButton />
            </div>
        </div>
    )
}

export default GraphHeader;