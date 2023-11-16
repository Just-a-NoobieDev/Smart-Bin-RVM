"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import heroImage from "@/public/images/logo.png";
import CountdownTimer from "../component/CountdownTimer";
import { useRouter } from "next/navigation";

const Exit = () => {
  const router = useRouter();
  const student_number = localStorage.getItem("student_number");

  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
        localStorage.removeItem("student_number");
        router.push("/gui"); // Replace with the path of your target page
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [router, seconds]);

  return (
    <div className="max-w-[1024px] mx-auto h-[468px] pointer-events-none select-none">
      <header className="h-[167px] bg-main flex justify-center items-center flex-col">
        <h1 className={`font-semibold text-[65px] text-white mt-[-10px]`}>
          Thank you!
        </h1>
        <p
          className={`font-light text-center text-[12px] w-[682px] mt-[-5px] text-white`}
        >
          <b className={`font-semibold`}>Smart Plastic Bottle Bin</b> which is
          low cost and endogenously developed that will aim to encourage
          recycling habits by giving rewards to depositors for every recycled
          item in terms of reward tokens - a creative idea that has been used to
          aid in the collection of recyclable items and, as a result, to
          increase recycling activities.
        </p>
      </header>
      <main className="flex justify-center items-center h-[57.5vh] gap-[50px]">
        <Image
          src={heroImage}
          width={94}
          height={95}
          alt="heroImage"
          className="animate-svg"
        />
        <h1 className={`font-semibold text-[71px] text-main`}>Recycle Now!</h1>
      </main>
      <CountdownTimer />
    </div>
  );
};

export default Exit;
