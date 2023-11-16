"use client";
import Image from "next/image";

const Bin = () => {
  return (
    <div className="h-[30vh] w-[50vh] flex justify-center items-center w-65 laps:bg-[#5B801A] laps:h-[110vh] xl:h-[50hv] laps:w-[40%] laps:absolute laps:top-0 laps:-z-10 xl:w-[40%] xl:max-w-[1440px]">
      <Image src="/sasa.png" width={843} height={788} alt="Bin" />
    </div>
  );
};

export default Bin;
