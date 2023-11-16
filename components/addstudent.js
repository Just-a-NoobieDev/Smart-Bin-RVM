import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import { MdOutlineUpdate } from "react-icons/md";

const AddStudent = ({ onClose }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setConfirmPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col bg-white absolute top-44 md:w-auto h-auto p-6 pb-3 md:p-8 md:pb-5 text-[#5B801A] shadow-modal">
        <div className="flex justify-between gap-5 md:gap-12 pb-2 md:pb-6 w-[200px] md:w-[320px]">
          <h2 className="font-bold text-[16px] md:text-[24px] lg:text-[26px]">
            Add Student
          </h2>
          <button
            className="text-black flex justify-end pt-1"
            onClick={onClose}
          >
            <BsXLg className="text-[16px] md:text-[24px]" />
          </button>
        </div>

        <div className="text-[10px] md:text-sm lg:text-md font-semibold">
          <h3>User Id </h3>
        </div>
        <input className="w-[200px] md:w-[320px] text-[10px] md:text-sm lg:text-md bg-white p-1 border-thin border-[#1b1b1b]" />

        <div className="pt-2 text-[10px] md:text-sm lg:text-md font-semibold">
          <h3>Student Number </h3>
        </div>
        <input className="w-[200px] md:w-[320px] text-[10px] md:text-sm lg:text-md bg-white p-1 border-thin border-[#1b1b1b]" />

        <div className="pt-2 text-[10px] md:text-sm lg:text-md font-semibold">
          <h3>Email </h3>
        </div>
        <input className="w-[200px] md:w-[320px] text-[10px] md:text-sm lg:text-md bg-white p-1 border-thin border-[#1b1b1b]" />

        <div className="pt-2 text-[10px] md:text-sm lg:text-md font-semibold">
          <h3>Password </h3>
        </div>
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            className="w-[200px] md:w-[320px] text-[10px] md:text-sm lg:text-md bg-white p-1 border-thin border-[#1b1b1b]"
          />
          <span
            onClick={togglePasswordVisiblity}
            className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-2"
          >
            {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <div className="pt-2 text-[10px] md:text-sm lg:text-md font-semibold">
          <h3>Confirm Password </h3>
        </div>
        <div className="relative">
          <input
            type={confirmPassword ? "text" : "password"}
            className="w-[200px] md:w-[320px] text-[10px] md:text-sm lg:text-md bg-white p-1 border-thin border-[#1b1b1b]"
          />
          <span
            onClick={toggleConfirmPassword}
            className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-2"
          >
            {confirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <div className="text-white bg-[#5B801A] hover:bg-lime-800 active:bg-lime-900 text-[10px] md:text-sm lg:text-md mt-4 md:mt-7 w-[100px] md:w-[140px] font-semibold ml-auto">
          <button>
            <div className="flex justify-center items-center p-1  md:px-3 md:py-2">
              <MdOutlineUpdate className="mr-2 text-[12px] md:text-lg" />
              Add Student
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
