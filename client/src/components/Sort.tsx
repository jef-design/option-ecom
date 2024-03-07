import { useState } from 'react';
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface Props {
    options: string[],
    onSelect: any
}
const Sort = ({ options, onSelect } : Props) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    onSelect(option)
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md flex items-center gap-3 cursor-pointer border border-gray-300 bg-white hover:border-gray-400 px-4 py-2"
        >
          {selectedOption || 'Featured'} <ChevronDownIcon className="h-6 w-6 text-gray-500" />
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul className="py-1 ">
            {options.map((option: any, index: any) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="block px-4  py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
