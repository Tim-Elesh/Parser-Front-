import { useState } from "react"

const Accordion = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <tr className="cursor-pointer" onClick={handleToggle}>
                <button>AI model</button>
            </tr>
            {isOpen && (
                <>
                    <tr className="bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">Item 1</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap">Item 2</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">Item 3</td>
                    </tr>
                </>
            )}
        </>
    )
}

export default Accordion;