import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";

const FilterModal = ({ isClicked, setIsClicked }) => {
  const [selectedDate, setSelectedDate] = useState(null); // State to track the selected date

  const handleCloseButtonClick = () => {
    setIsClicked(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Update the selected date when a date is selected from the dropdown
  };

  if (!isClicked) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white absolute lg:top-32 top-52 h-auto w-auto p-4 md:p-6 text-[#5B801A] shadow-modal">
        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-[19px] md:text-[24px] lg:text-[26px] pr-4">
            Filters
          </p>
          <button className="text-black" onClick={handleCloseButtonClick}>
            <BsXLg className="text-lg" />
          </button>
        </div>
        <div className="flex-2 pb-2 text-xs md:text-sm font-semibold ">
          Transaction Id
        </div>
        <input className="w-[200px] md:w-[280px] col-span-2 text-xs md:text-sm lg:text-md bg-white p-1 border-thin border-[#1b1b1b]" />

        <div className="relative flex flex-col mt-3 md:mt-4 font-semibold ">
          <select
            id="dateSelect"
            className="bg-white border p-[4px] md:p-2 flex text-[10px] md:text-sm lg:text-md text-[#5B801A]
            items-center justify-between mt-2 lg:mt-3 w-20 md:w-32 lg:w-32 xl:w-36"
            value={selectedDate || ""}
            onChange={handleDateChange}
          >
            <option value="">Date</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="col-span-2 bg-white flex justify-end mt-4 md:mt-6">
          <button className="bg-[#5B801A] w-auto p-2 px-8 text-white font-bold text-[10px] md:text-sm lg:text-md hover:bg-lime-800 active:bg-lime-900">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
