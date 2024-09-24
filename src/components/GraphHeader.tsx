/* import CalendarButton from "./CalendarButton"; */
import ThemeToggleButton from "./ThemeButton";

const GraphHeader = () => {
    return (
        <div className="flex w-full justify-between items-center my-3">
            <h2 className='text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl  font-bold px-2'>Token Inference Valuation Index</h2>
            <div className="flex items-center gap-3">
                {/*<CalendarButton />*/}
                <ThemeToggleButton />
            </div>
        </div>
    )
}

export default GraphHeader;