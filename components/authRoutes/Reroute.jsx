"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MdError } from "react-icons/md";
import { IoTriangleSharp } from "react-icons/io5";

const Reroute = ({ reroute }) => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.push(reroute);
    }, 3000);

    return () => clearInterval(interval);
  }, [router, reroute]);

  return (
    <div className="p-8">
      <div className="flex items-center  flex-col shadow-cards mx-auto w-full h-[350px] relative md:h-[470px] 2xl:h-[662px]">
        <MdError className="w-[112px] h-[112px] text-error mt-6 md:w-[134px] md:h-[134px] md:mt-10 2xl:w-[215px] 2xl:h-[215px] 2xl:mt-14" />
        <h1 className="text-[40px] text-black font-bold mt-1 md:text-[48px] 2xl:text-[55px]">
          Error!
        </h1>
        <p className="text-[18px] text-black mt-[-5px] z-20 md:text-[24px] 2xl:text-[36px]">
          You are not allowed to access this page!
        </p>
        <div className="h-[105px] w-full bg-error flex justify-center items-center absolute bottom-0 md:h-[150px] 2xl:h-[185px]">
          <IoTriangleSharp className="absolute top-[-38px] rotate-180 w-[56px] h-[56px] text-white " />
          <p className="font-bold text-center text-[16px] text-white md:text-[20px] 2xl:text-[26px]">
            Redirecting you now to {reroute} path. Please Wait
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reroute;
