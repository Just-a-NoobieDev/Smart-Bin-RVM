"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import heroImage from "@/public/images/logo.png";
import { FaTrash } from "react-icons/fa";
import supabase from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

const Gui = () => {
  const router = useRouter();
  const [capacity, setCapacity] = useState(0);
  const [studentNumber, setStudentNumber] = useState("");

  useEffect(() => {
    const student_number = localStorage.getItem("student_number");
    setStudentNumber(student_number);
    const fetchCapacity = async () => {
      const { data, error } = await supabase
        .from("capacity")
        .select("value")
        .eq("id", 1)
        .single();

      if (error) console.log(error);
      if (data) {
        const capacity = data.value;
        setCapacity(capacity);
      }
    };

    fetchCapacity();

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "capacity" },
        (payload) => {
          fetchCapacity();
        },
      )
      .subscribe();
  }, [capacity]);

  if (studentNumber) return router.push("/gui/counter");

  return capacity <= 99 ? (
    <div className="box-border max-w-[1024px] max-h-[468px] mx-auto">
      <header>
        <div className="header bg-main px-12 pb-8 text-white mb-[50px]">
          <h1
            className={`font-semibold text-center text-[59px] pointer-events-none select-none`}
          >
            Welcome!
          </h1>
          <p
            className={`font-extralight text-center text-[12px] max-w-[768px] mx-auto pointer-events-none select-none`}
          >
            <b className="font-bold pointer-events-none select-none">
              Smart Plastic Bottle Bin
            </b>{" "}
            which is low cost and endogenously developed that will aim to
            encourage recycling habits by giving rewards to depositors for every
            recycled item in terms of reward tokens - a creative idea that has
            been used to aid in the collection of recyclable items and, as a
            result, to increase recycling activities.
          </p>
        </div>
      </header>
      <main className="flex flex-col">
        <section className="flex flex-row justify-center items-center gap-[20px] mb-[40px]">
          <Image
            src={heroImage}
            alt="heroImage"
            width={95}
            height={95}
            className="animate-svg pointer-events-none select-none"
          />
          <h1
            className={`font-semibold text-[53px] text-main pointer-events-none select-none`}
          >
            Recycle Now!
          </h1>
        </section>
        <section className="justify-center text-center">
          <button
            type="submit"
            className={`font-black bg-main text text-[23px] w-[169px] h-[69.469px] text-white uppercase `}
            onClick={() => {
              router.replace("/gui/manual");
            }}
          >
            Start
          </button>
        </section>
      </main>
    </div>
  ) : (
    <div className="relative">
      <header className="h-[167px] bg-error flex justify-center items-center"></header>
      <main>
        <div
          className={`font-semibold w-[567px] h-[389px] bg-white absolute z-[100] top-[6vh] left-[13.5vw] shadow-modal rounded-[10px]`}
        >
          <h1 className="text-[35px] text-center mt-[25px] text-error pointer-events-none select-none">
            Sorry, bin is at full capacity!
          </h1>
          <FaTrash className="w-[139px] h-[139px] mx-auto mt-[40px] text-error animate-bounce" />
          <div
            className={`font-semibold text-[15px] text-white bg-error uppercase h-[45px] mt-[55px] pointer-events-none select-none`}
          >
            Please wait for the utility to empty the bin
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gui;
