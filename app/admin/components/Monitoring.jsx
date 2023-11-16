import React from "react";

const Monitoring = ({ header, number }) => {
  return (
    <div className="w-[600px] h-[301px] bg-white shadow-outer rounded-[20px] p-7 sm:w-[570px] md:w-[678px] md:p-9 xl:w-[506px] 2xl:w-[556px] text-center text-main hover:scale-105 transition duration-300">
      <h2 className="text-[24px] font-extrabold stroke-black">{header}</h2>
      <h1 className="text-[128px] font-extrabold mb-[-35px]">{number}</h1>
      <p className="text-[16px] text-[#707070] font-semibold">Bottles</p>
    </div>
  );
};

export default Monitoring;
