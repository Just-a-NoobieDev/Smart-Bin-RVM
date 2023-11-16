"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { Poppins } from "next/font/google";
import { IoTriangleSharp } from "react-icons/io5";
import CustomToast from "@/utils/CustomToast";

const p700 = Poppins({ weight: "700", subsets: ["latin"] });
const p400 = Poppins({ weight: "400", subsets: ["latin"] });

const Verify = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log("Code found:", code);
    } else {
      CustomToast("Reminder", "Your email is already verified", false);
      const timeoutId = setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    <div className="px-8 pt-8">
      <div className="flex items-center  flex-col shadow-cards mx-auto w-full h-[350px] relative md:h-[470px] 2xl:h-[662px]">
        <MdVerified className="w-[112px] h-[112px] text-main mt-6 md:w-[134px] md:h-[134px] md:mt-10 2xl:w-[215px] 2xl:h-[215px] 2xl:mt-14" />
        <h1
          className={`${p700.className} text-[40px] text-main font-bold mt-1 md:text-[48px] 2xl:text-[64px]`}
        >
          Success!
        </h1>
        <p
          className={`${p400.className} text-[18px] text-main mt-[-5px] z-20 md:text-[24px] 2xl:text-[36px]`}
        >
          Your email has been verified!
        </p>
        <div className="h-[105px] w-full bg-main flex justify-center items-center absolute bottom-0 md:h-[150px] 2xl:h-[185px]">
          <IoTriangleSharp className="absolute top-[-38px] rotate-180 w-[56px] h-[56px] text-white " />
          <button
            type="submit"
            className="w-[90px] h-[35px] bg-white md:w-[180px] md:h-[50px] 2xl:w-[260px] 2xl:h-[60px]"
          >
            <Link
              href="/login"
              className={`${p700.className} font-bold text-[16px] uppercase text-main md:text-[20px] 2xl:text-[26px]`}
            >
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
