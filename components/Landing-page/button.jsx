"use client";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

const Button = ({ text, OnClick, ClassName, icon }) => {
  return (
    <button onClick={OnClick} className={ClassName}>
      {text}
      {icon}
    </button>
  );
};

export default Button;
