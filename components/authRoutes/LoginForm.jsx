"use client";

import InputField from "../ui/InputField";
import AuthButton from "../ui/AuthButton";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase-browser";
import CustomToast from "@/utils/CustomToast";
import { useState } from "react";
import { useAuthStore } from "@/store/Auth";

const LoginForm = () => {
  const methods = useForm();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [clicked, setClicked] = useState(false);

  const onSubmit = methods.handleSubmit(async (data) => {
    const { email, password } = data; //destructure email and password from data

    try {
      setClicked(true);
      const { error, data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setClicked(false);
        CustomToast(
          "error",
          error.message == "Email not confirmed"
            ? "Email is not verified, Please check your email"
            : "Invalid Credentials, Either your email or password is incorrect",
          true,
        );
      } else {
        login(data.session.user);
        router.push("/loading");
        // router.push("/dashboard", { replace: true });
        CustomToast("Success", "You are logged in successfully", false);
      }
    } catch (error) {
      setClicked(false);
      CustomToast("error", error.message, true);
    }
  });

  const emailValidation = {
    label: "email",
    type: "email",
    id: "email",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: "enter a valid email address",
      },
    },
  };

  const passwordValidation = {
    label: "password",
    type: "password",
    id: "password",
    validation: {
      required: {
        value: true,
        message: "required",
      },
    },
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-full px-2"
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        <InputField {...emailValidation} />
        <InputField {...passwordValidation} />
        {/* Remember me */}
        {/* <div className="w-full flex gap-2 ">
          <input
            type="checkbox"
            className="peer relative appearance-none shrink-0 w-4 h-4 border-2 border-[#5b801a] rounded-sm mt-1 bg-white focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100 checked:bg-[#5b801a] checked:border-0 disabled:border-steel-400 disabled:bg-steel-400"
          />
          <svg
            className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <label htmlFor="checkbox" className="text-[#5b801a] font-semibold">
            Remember Me
          </label>
        </div> */}
        <AuthButton
          name={`${clicked ? "authenticating" : "login"}`}
          disabled={clicked}
          classname={`${clicked ? "opacity-50" : "opacity-100"} lg:mt-20 mt-5`}
          onclick={onSubmit}
        />
      </form>
    </FormProvider>
  );
};

export default LoginForm;
