"use client";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const Slider = ({ slides }) => {
  const [curr, setSlide] = useState(0);

  const prev = () => {
    setSlide((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const next = () => {
    setSlide((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };
  return (
    <>
      <div
        className={`flex justify-center font-black text-[#5B801A] laps:mt-8`}
        id="process"
      >
        <h3
          className={`text-5xl mb-[17px] tabs:text-7xl tabs:mb-[34px] pc:text-8xl wide:text-8xl`}
        >
          PROCESS
        </h3>
      </div>
      <div className="overflow-hidden object-fit-cover h-[50vh] w-auto tabs:h-[386px] laps:h-[80vh] lg:object-fit-cover">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
        </div>
        <div className="absolute inset-0 flex p-5 justify-between mt-[20%] tabs:p-8 tabs:mt-[22vh] laps:p-16">
          <button onClick={prev}>
            <FiChevronLeft size={20} className="text-white" />
          </button>
          <button onClick={next}>
            <FiChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Slider;
