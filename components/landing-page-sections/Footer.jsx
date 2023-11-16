"use client";
import { BsFacebook } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="shadow-outer shadow-black w-full">
      <div className="flex flex-col items-center">
        <div>
          <Image
            src="/images/logo.png"
            height={40}
            width={40}
            alt="footer_logo"
            className="lg:h-[15vh] lg:w-[15vh]"
          />
        </div>
        <ul className="text-center text-xs font-bold lg:text-xl">
          <li>
            We strive to help the world to make machines clean, but also help
          </li>
        </ul>
        <div className="flex gap-5">
          <BsFacebook size={25} className="text-[#5B801A]" />
          <BsGithub size={25} className="text-[#5B801A]" />
          <AiFillInstagram size={25} className="text-[#5B801A]" />
        </div>
        <div className="text-xs lg:text-xl">
          <ul>
            <li>Iba,Carillo Hagonoy Bulacan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
