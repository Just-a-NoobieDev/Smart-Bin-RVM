"use client";
import { SheetDemo } from "./burger";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  return (
    <div className="absolute z-10 w-full" id="home">
      <div className="flex justify-between p-7 items-center lg:p-5">
        <div>
          <Image
            src="/images/logo.png"
            height={40}
            width={40}
            alt="logo"
            className="2xl:h-[5vh] 2xl:w-[5vh]"
          />
        </div>
        <ul className="hidden lg:flex lg:gap-2 lg:text-sm">
          <li>
            <Link href="#home">HOME</Link>
          </li>
          <li>
            <Link href="#about">ABOUT</Link>
          </li>
          <li>
            <Link href="#process">PROCESS</Link>
          </li>
          <li>
            <Link href="#contact">CONTACT</Link>
          </li>
        </ul>
        <div className="lg:hidden">
          <SheetDemo />
        </div>
        <ul className="hidden lg:flex gap-2 lg:text-sm lg:text-white">
          <li>
            <Link href="/login">LOGIN</Link>
          </li>
          <li>|</li>
          <li>
            <Link href="/signup">SIGN UP</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
