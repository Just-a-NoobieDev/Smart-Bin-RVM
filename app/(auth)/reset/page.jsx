"use client";
import supabase from "@/lib/supabase-browser";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Buttons";
import CustomToast from "@/utils/CustomToast";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { BsSend } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email == "" ||
      !email.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,4}$/g)
    )
      return CustomToast("Error", "Please enter a valid email.", true);
    const { data, error } = supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/update-password`,
    });
    if (error) {
      //error;
      console.log(error);
    } else {
      setIsSend(true);
      CustomToast(
        "Success",
        "Reset password link sent. Please Check your email",
        false
      );
    }
  };
  return (
    <div>
      <div className="flex mx-1">
        <div className="h-screen relative items-center justify-center flex-1 bg-white hidden lg:block">
          <Image
            src={logo}
            alt="Logo"
            className="absolute bottom-4 w-[85%] h-auto cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="flex flex-[5] items-center justify-center min-h-screen lg:py-5 bg-[#5b801a70]">
          <div className="p-[10%] lg:px-15 py-20 flex flex-col items-center justify-center lg:max-w-[60%] lg:h-auto 2xl:py-20 h-full w-full bg-white rounded-md">
            <Image
              src={logo}
              alt="Logo"
              className={`lg:hidden block mb-16 md:w-50 sm:w-40 cursor-pointer ${
                isSend ? "hidden" : "block"
              }`}
              onClick={() => router.push("/")}
            />
            {isSend && (
              <div className="flex flex-col items-center lg:p-3">
                <div>
                  <BsSend
                    size={80}
                    className="text-[#5b801a] lg:h-[150px] lg:w-[150px] lg:mb-7"
                  />
                </div>
                <div>
                  <p className="text-xl text-center font-bold text-[#5b801a] mb-5 lg:text-2xl">
                    Password reset e-mail has been sent
                  </p>
                  <p className="text-xs text-center">
                    a password reset email has been sent to your e-mail address
                  </p>
                </div>
              </div>
            )}
            <div className={`${isSend ? "hidden" : "block"}`}>
              <div className="flex justify-center">
                <h1 className="text-[#5b801a] font-semibold lg:text-3xl md:text-2xl md:m-5 text-2xl lg:mb-10 mb-5">
                  Forgot Password
                </h1>
              </div>
              <form
                className="flex flex-col gap-2 text-[#5b801a] m-5"
                onSubmit={handleSubmit}
              >
                <Label>Email</Label>
                {/* <input
                  type="text"
                  placeholder="Enter Email..."
                  className="border-solid border-2 border-[#5b801a] p-1 w-[50vh] md:w-[60vh]"
                /> */}
                <input
                  className="border-[#5B801A] border-2 px-2 h-11 outline-none"
                  autoComplete="off"
                  autoFocus
                  type="email"
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <Button
                  variant="outline"
                  type="submit"
                  className="rounded-none lg:my-7"
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
