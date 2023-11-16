"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/Buttons";
import { FaPaperPlane } from "react-icons/fa";
import Image from "next/image";

const Section4 = () => {
  return (
    <div className="bg-[#5B801A] mt-5 mb-5" id="contact">
      <div className="p-5 flex flex-col items-center lg:flex-row lg:h-[100vh] lg:p-0">
        <div className="hidden lg:flex lg:w-[60%] lg:h-[100vh] lg:items-center lg:justify-center lg:bg-white">
          <Image
            src="/images/logo.png"
            height={350}
            width={350}
            alt="logo"
            className="xl:h-[500px] xl:w-[500px] 2xl:h-[600px] 2xl:w-[600px]"
          />
        </div>
        <div className="flex flex-col items-center w-screen lg:h-[100vh]">
          <div className="text-center font-extrabold text-white m-5 mb-12 lg:m-15 lg:my-[8vh]">
            <ul>
              <li className="text-xl  md:text-3xl lg:text-3xl xl:text-4xl">
                Interested in out little project?
              </li>
              <li className="text-5xl  md:text-8xl lg:text-8xl xl:text-9xl">
                Contact Us
              </li>
            </ul>
          </div>
          <form action="" className="w-[65%] text-white">
            <Label>Full name</Label>
            <Input className="rounded-xl h-[5vh] bg-transparent mb-2 md:rounded-md md:mb-4" />
            <Label>Email</Label>
            <Input className="rounded-xl h-[5vh] bg-transparent mb-2 md:rounded-md md:mb-3" />
            <Label>Message</Label>
            <Textarea className="rounded-xl h-[5vh] mb-10  bg-transparent lg:h-[20vh] md:rounded-md md:mb-8 xl:mb-12" />
            <div className="flex justify-center">
              <Button
                variant="secondary"
                className={
                  "rounded-xl h-[5vh] flex gap-2  self-center w-[20vh] md:m-7 lg:m-[8vh] xl:m-5 lg:rounded-md  lg:w-[30vh] xl:w-[30vh] xl:text-lg 2xl:h-[6vh]  2xl:text-2xl 2xl:mt-[5vh]"
                }
              >
                Send <FaPaperPlane size={12} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Section4;
