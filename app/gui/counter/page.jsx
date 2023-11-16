"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabase-browser";
import CustomToast from "@/utils/CustomToast";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";

const Counter = () => {
  const router = useRouter();
  const [bottles, setBottles] = useState(0);
  const [points, setPoints] = useState(0);

  const studentNumber = localStorage.getItem("student_number");

  const count = async () => {
    let { count } = await supabase
      .from("accepted")
      .select("*", { count: "exact", head: true });

    setBottles(count);
  };

  const handleFinish = async () => {
    const student_number = localStorage.getItem("student_number");

    if (bottles === 0)
      return CustomToast("Oops", "You haven't inserted any bottles yet!", true);

    const { data, error } = await supabase
      .from("tbl_transactions")
      .insert([
        {
          student_number: student_number,
          number_bottles: bottles,
          converted_points: points,
        },
      ])
      .select();

    if (data) {
      const { data: availPoints, error } = await supabase
        .from("tbl_student_users")
        .select("available_points")
        .eq("student_number", student_number)
        .single();

      if (!error) {
        const { data: pointsA, error: er } = await supabase
          .from("tbl_student_users")
          .update({ available_points: availPoints.available_points + points })
          .eq("student_number", student_number)
          .select();

        if (!er) {
          handleExit2();
          const { error: err } = await supabase
            .from("rejected")
            .delete()
            .neq("id", "00000000-0000-0000-0000-000000000000");
          const { error: ac } = await supabase
            .from("accepted")
            .delete()
            .neq("id", "00000000-0000-0000-0000-000000000000");

          router.replace("/gui/exit");
        }
      }
    }
  };

  const handleExit = async () => {
    const { error } = await supabase
      .from("is_loggedin")
      .update({ status: 0 })
      .eq("id", 1)
      .select();

    if (!error) {
      localStorage.removeItem("student_number");
      CustomToast("Thank you", "We're sad to see you go", false);
      router.push("/gui");
    }
  };
  const handleExit2 = async () => {
    const { error } = await supabase
      .from("is_loggedin")
      .update({ status: 0 })
      .eq("id", 1)
      .select();

    if (!error) {
      localStorage.removeItem("student_number");
      router.push("/gui");
    }
  };

  useEffect(() => {
    count();

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "accepted" },
        (payload) => {
          CustomToast("success", "You have inserted a bottle!", false);
          count();
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rejected" },
        (payload) => {
          CustomToast("sorry", "We cannot accept what you inserted!", true);
        }
      )
      .subscribe();

    const convert = async () => {
      const convertion = bottles * 0.05;
      setPoints(convertion);
    };

    convert();
  }, [bottles]);

  if (studentNumber) {
    return (
      <div className="box-border max-w-[1024px] max-h-[468px] mx-auto">
        <header className="h-[167px] bg-main flex justify-center items-center">
          <h1
            className={`font-semibold text-[65px] text-white pointer-events-none select-none`}
          >
            Insert a plastic bottle
          </h1>
        </header>
        <main
          className={`font-semibold flex flex-row justify-between mt-[20px] max-w-[768px] ml-auto `}
        >
          <div className="text-center ml-[110px] lg:ml-0 pointer-events-none select-none">
            <p className="text-[20px]">Number of inserted bottles</p>
            <h1 className="text-[182px] mt-[-40px] text-main pointer-events-none select-none">
              {bottles}
            </h1>
          </div>
          <div className="flex flex-col">
            <div className="w-[275px] h-[188px] bg-main flex flex-col justify-center pl-[30px] text-white pointer-events-none select-none">
              <p className="text-[24px] mt-[30px]">Total Points:</p>
              <h1 className="text-[96px]">{points.toFixed(2)}</h1>
            </div>
            <div className="flex gap-4 pr-[50px]">
              <div
                type="submit"
                className={`font-semibold mt-[25px] h-[45px] w-[120px] bg-white mx-auto text-[14px] uppercase text-main border-2 border-main border-opacity-70 flex items-center justify-center`}
              >
                <ConfirmationModal
                  buttonName="Exit"
                  icon={<ImExit className="text-error w-[30px] h-[30px]" />}
                  accent="error"
                  header="Are you sure you want to exit?"
                  desc="Once you confirm this, your account will be logged out and you will be redirected to start."
                  cancelButton={true}
                  onCancel="Cancel"
                  onConfirm={"Exit"}
                  onClick={handleExit}
                />
              </div>
              <div
                type="submit"
                className={`font-semibold mt-[25px] h-[45px] w-[135px] bg-main mx-auto text-[14px] uppercase text-white flex items-center justify-center`}
              >
                <ConfirmationModal
                  buttonName="Finish"
                  icon={
                    <BsFillCheckCircleFill className="text-main w-[30px] h-[30px]" />
                  }
                  accent="main"
                  header="Are you finished?"
                  desc="If you confirm this, all of the points will be added to your
              account."
                  onCancel="Cancel"
                  cancelButton={true}
                  onConfirm={"Confirm"}
                  onClick={handleFinish}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    router.push("/gui");
  }
};

export default Counter;
