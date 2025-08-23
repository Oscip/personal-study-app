import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function DropDown({ options = [], defaultOption }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultOption || options[0]);

    const toggleOpen = () => setIsOpen(!isOpen);
    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-48">
            <button
                onClick={toggleOpen}
                className={`flex w-full items-center justify-between px-3 py-2 rounded-md transition-colors
          ${isOpen ? "border border-black bg-white/70" : "border border-transparent bg-transparent"}`}
            >
                <span className="capitalize">{selected}</span>
                <ChevronDown className="h-4 w-4" />
            </button>

            {isOpen && (
                <ul className="absolute top-full left-0 mt-1 w-full rounded-md border border-black bg-white/70 shadow-md z-50 backdrop-blur-sm">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100/70"
                        >
                            <span className="capitalize">{option}</span>
                            {selected === option && <Check className="h-4 w-4" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
