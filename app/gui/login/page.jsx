"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import CustomToast from "@/utils/CustomToast";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineError } from "react-icons/md";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import moment from "moment";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const router = useRouter();
  const [student_number, setStudentNumber] = useState("");

  useEffect(() => {
    const savedStudentNumber = localStorage.getItem("student_number");
    if (savedStudentNumber) {
      setStudentNumber(savedStudentNumber);
      setValue("studentNo", savedStudentNumber);
    }
  }, [setValue]);

  const handleSignIn = async () => {
    const studentNo = getValues("studentNo"); // Get the current input value
    try {
      const dateStart = `${moment()
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data: limit, error: limitError } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .eq("student_number", studentNo)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let numberBottles = limit
        .map((item) => item.number_bottles)
        .reduce((a, b) => a + b, 0);

      if (!limitError && numberBottles < 60) {
        const { data, error } = await supabase
          .from("tbl_student_users")
          .select("*")
          .eq("student_number", studentNo)
          .single();

        if (error) {
          CustomToast(
            "error",
            "There's no Account associated with this student number.",
            true
          );
          return;
        }

        if (data) {
          const { error } = await supabase
            .from("is_loggedin")
            .update({ status: 1 })
            .eq("id", 1)
            .select();

          if (!error) {
            CustomToast(
              "Success",
              `It's good to have you back ${data.name}`,
              false
            );
            localStorage.setItem("student_number", studentNo);

            router.push("/gui/counter");
          }
        }
      } else {
        CustomToast(
          "error",
          "You have reached the limit of 60 bottles or 3 points per month.",
          true
        );
      }
    } catch (error) {
      console.error("Error in handleSignIn:", error);
    }
  };

  if (student_number) return router.push("/gui/counter");

  return (
    <div className="box-border max-w-[1024px] h-[468px] mx-auto relative">
      <header
        className={`font-semibold h-[103px] bg-main text-[48px] text-center flex items-center justify-center`}
      >
        <h1 className="text-white">Login on your account</h1>
      </header>
      <main className="flex items-center justify-center flex-col h-[365px]">
        <div className="m-[25px]">
          <p className={`font-semibold text-[23px] text-center text-main`}>
            Please Login by entering your student number:
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-row justify-center items-center gap-[40px] mt-[20px]"
        >
          <div className="relative w-[337.174px]">
            <input
              type="text"
              {...register("studentNo", {
                required: "Student number is required",
                pattern: {
                  value: /^[0-9]{10}$/, // Only allow numbers
                  message: "Please enter a number",
                },
                minLength: {
                  value: 10, // Only allow 10-digit numbers
                  message: "Student number must have 10 characters",
                },
                maxLength: {
                  value: 10, // Only allow 10-digit numbers
                  message: "Student number must have 10 characters",
                },
              })}
              className={`font-semibold border-[2px] border-main w-full pl-[15px] pr-[30px] h-[50px] outline-none text-main`}
            />
            <AnimatePresence>
              {errors.studentNo && (
                <motion.p
                  className="absolute top-0 right-0 mt-[-20px] px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md "
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  key={errors.studentNo.message}
                >
                  <div className="flex items-center gap-1">
                    {" "}
                    <MdOutlineError />
                    {errors.studentNo.message}
                  </div>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <button
            type="submit"
            className={`w-[189.957px] text-white bg-main text-[15px] p-[5px] h-[50px] font-bold uppercase`}
          >
            Login
          </button>
        </form>
        <button className="absolute right-[70px] w-[100px] h-[52px]  bottom-[-20px] outline outline-1 outline-[#5B801A]">
          <Link
            href="./manual"
            className="flex justify-center items-center gap-2 text-main text-[15px] font-semibold"
          >
            Back
            <BsFillArrowRightCircleFill className="w-[16px] h-[16px] text-main" />
          </Link>
        </button>
      </main>
    </div>
  );
};

export default Login;
