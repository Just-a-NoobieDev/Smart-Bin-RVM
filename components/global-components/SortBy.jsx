import React from "react";
import { BiSolidDownArrowAlt, BiSolidUpArrowAlt } from "react-icons/bi";

const SortBy = () => {
  return (
    <div className="bg-white absolute right-32 md:right-32 lg:right-36 top-40 md:top-32 lg:top-20 flex flex-col shadow-cards text-[#5B801A] font-semibold text-[10px] md:text-sm lg:text-[16px]">
      <ul className="p-4 space-y-2">
        <li>
          <div className="flex items-center justify-between">
            <button className="border-none bg-transparent cursor-pointer hover:bg-gray-50 active:bg-gray-100">
              <div className="flex items-center justify-between">
                Ascending
                <BiSolidUpArrowAlt className="text-sm md:text-lg ml-6 md:ml-8 lg:ml-10" />
              </div>
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center justify-between">
            <button className="border-none bg-transparent cursor-pointer hover:bg-gray-50 active:bg-gray-100">
              <div className="flex items-center justify-between">
                Descending
                <BiSolidDownArrowAlt className="text-sm md:text-lg ml-4 md:ml-6 lg:ml-8" />
              </div>
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SortBy;
