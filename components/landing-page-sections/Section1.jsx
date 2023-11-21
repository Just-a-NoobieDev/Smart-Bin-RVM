"use client";
import { Button } from "../ui/Buttons";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import machine from "@/public/images/machine.png";

const Section1 = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center gap-5 lg:flex-row-reverse lg:items-center lg:justify-between">
        <div className="h-[50vh] bg-[#5B801A] flex items-center mt-[17vh] w-[70%] lg:w-[40%] justify-center lg:h-[100vh] lg:mt-0 ">
          <div className="w-full h-full">
            <Image
              src={machine}
              alt="machine"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="m-5 text-[#5B801A] lg:text-start">
          <ul className="font-extrabold gap-5 text-3xl md:text-5xl lg:text-5xl max-w-6xl lg:gap-4 xl:text-6xl 2xl:text-7xl">
            <li className="mb-1 lg:mb-2">Smart Platic Bottle Bin:</li>
            <li className="text-[#323232] mb-1 lg:mb-2">A Reverse Vending</li>
            <li className="text-[#323232]">Machine</li>
          </ul>
          <Link href={"#about"}>
            <Button
              variant="primary"
              className={
                "w-[200px] h-[33.378px] gap-2 bg-[#5B801A] text-white text-xs mt-[40px] md:my-10 lg:m-0  md:h-[40px]  lg:mt-[50px] 2xl:h-[50px]  2xl:text-lg 2xl:gap-4"
              }
            >
              ABOUT US <FaArrowRight size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section1;
