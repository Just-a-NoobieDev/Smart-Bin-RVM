"use client";
import Button from "../Landing-page/button";
import Textbox from "../Landing-page/Textbox";
import Textarea from "../Landing-page/Textarea";
import { FaPaperPlane } from "react-icons/fa";
import Image from "next/image";

export const Contact = () => {
  return (
    <div
      className="bg-[#5B801A] flex w-screen p-5 flex-col justify-center items-center laps:w-[60%] laps:h-[100vh] tabs:h-[80vh] tabs:p-8"
      id="contact"
    >
      <div className="flex flex-col items-center gap-8 tabs:mt-5">
        <ul className="flex flex-col text-center font-extrabold mb-5 text-white">
          <li className="text-pc tabs:text-2xl pc:text-3xl">
            Interested in our little project?
          </li>
          <li className="text-5xl -mt-2 md:text-7xl laps:text-7xl pc:text-8xl">
            Contact Us
          </li>
        </ul>
        <form
          action=""
          className="flex flex-col justify-center text-white font-normal text-sm"
        >
          <label htmlFor="">Full name</label>
          <Textbox />
          <label htmlFor="">Email</label>
          <Textbox />
          <label htmlFor="">Message</label>
          <Textarea />
          <Button
            text={"Send"}
            icon={<FaPaperPlane />}
            ClassName={`text-xs flex justify-center gap-2 text-[#5B801A] items-center bg-white mt-10 w-[100px] h-[25px] rounded-md self-center font-bold tabs:mb-7 laps:w-[120px] laps:h-[30px] pc:w-[160px] pc:h-[40px] pc:text-laps`}
          />
        </form>
      </div>
    </div>
  );
};

export const ContactLogo = () => {
  return (
    <div className="hidden laps:flex w-auto h-auto">
      <Image
        src="/logo (2).png"
        width={350}
        height={350}
        alt="logo"
        className="flex justify-center self-center laps:ml-[20%] pc:ml-[30%] wide:ml-[40%]"
      />
    </div>
  );
};

export default Contact;
