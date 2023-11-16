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
            <li>ABOUS US</li>
          </ul>
          <p className="text-justify font-normal m-5 text-white md:text-xl md:mx-[8vh] lg:text-xl xl:text-3xl lg:mx-7 2xl:text-3xl">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum The Extremes of
            Good and Evil by Cicero, written in 45 BC. This book is a treatise
            on the theory of ethics
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
