"use client";

import { useRef } from "react";
import PageWrapper from "./PageWrapper";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";

const Section2 = () => {
  return (
    <div id="about">
      <div className="h-fit bg-[#5B801A] lg:flex lg:flex-row lg:h-[100vh]">
        <div className="flex flex-col items-center md:p-7 lg:p-5 lg:w-[60%]">
          <ul className="my-9 text-6xl font-extrabold text-white mb-5  md:text-8xl lg:text-8xl lg:m-11 2xl:text-9xl">
            <li>ABOUT US</li>
          </ul>
          <p className="text-justify font-normal m-5 text-white md:text-xl md:mx-[8vh] lg:text-xl xl:text-3xl lg:mx-7 2xl:text-3xl">
            Our Smart Plastic Bottle Bin Reverse Vending Machine incorporates
            cutting-edge technology to make recycling a seamless and rewarding
            experience. Through advanced sensors and automation, it identifies,
            collects, and processes plastic bottles efficiently, promoting the
            circular economy.
          </p>
        </div>
        <div className=" flex items-center bg-white justify-center lg:flex lg:bg-white lg:h-[100vh] lg:w-[40%] lg:justify-center lg:items-center">
          <Image
            src="/images/logo.png"
            height={350}
            width={350}
            alt="logo"
            className="xl:h-[500px] xl:w-[500px] 2xl:h-[600px] 2xl:w-[600px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Section2;
