"use client";
import React from "react";
import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

const Manual = () => {
  const router = useRouter();
  // const student_number = localStorage.getItem("student_number");
  // if (student_number) return router.push("/gui/counter");
  return (
    <div className="max-w-[1024px] max-h-[468px] mx-auto relative">
      <div className="m-6 mt-[30px] after:absolute after:contents-[''] after:w-[16px] after:h-[468px] after:bg-main after:top-[-30px] after:right-0">
        <h1 className="text-[28px] text-white font-extrabold bg-gradient-to-r from-main to-white w-[262px] pl-3 h-[44px] flex items-center select-none">
          How to use:
        </h1>
        <div className="ml-[50px] mt-[30px]">
          <h1 className="text-[20px] text-white font-extrabold bg-gradient-to-r from-main to-white w-[202px] pl-3 h-[30px] flex items-center select-none">
            Login
          </h1>
          <div className="ml-[55px] mt-[15px] text-[15px] relative">
            <h2 className="font-extrabold ml-[-20px] pointer-events-none select-none">
              If you <span className="text-main">have</span> an account:
            </h2>
            <ol className="list-decimal font-bold pointer-events-none select-none">
              <li>Enter your Student Number and click LOGIN.</li>
              <li>Insert bottle into the machine.</li>
              <li>Once you are finished, click FINISH and Confirm.</li>
              <li>Check your Dashboard/Account to see your points.</li>
            </ol>
            <h2 className="font-extrabold ml-[-20px] mt-4 pointer-events-none select-none">
              If you <span className="text-error">{"DON'T"}</span> have an
              account:
            </h2>
            <ol className="list-decimal font-bold pointer-events-none select-none">
              <li>
                Go to <u>https://www.smartbottlebin.online/</u> and create an
                account.
              </li>
              <li>
                Once you have an account, go back to the machine and LOGIN using
                your Student Number.
              </li>
              <li>Insert bottle to the machine.</li>
              <li>Once you are finish, click FINISH and Confirm.</li>
              <li>Check your Dashboard/Account to see your points.</li>
            </ol>
            <button
              className="absolute right-[70px] w-[100px] h-[52px] bg-main bottom-[-20px]"
              onClick={() => router.push("./login")}
            >
              <Link
                href="./login"
                className="flex justify-center items-center gap-2 text-white text-[15px] font-semibold"
              >
                Next
                <BsFillArrowRightCircleFill className="w-[16px] h-[16px]" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manual;
