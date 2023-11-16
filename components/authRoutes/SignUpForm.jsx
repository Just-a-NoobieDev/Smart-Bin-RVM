"use client";

import AuthButton from "../ui/AuthButton";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../ui/InputField";
import supabase from "@/lib/supabase-browser";
import { toast } from "react-hot-toast";
import CustomToast from "@/utils/CustomToast";
import { url } from "@/constant";

const SignUpForm = () => {
  const methods = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onSubmit = methods.handleSubmit(async (data) => {
    const { studentNumber, name, email, password } = data; //destructure necessary fields from data
    try {
      setLoading(true);
      setClicked(true);
      const { data, error: E } = await supabase
        .from("tbl_student_users")
        .select("*")
        .eq("student_number", studentNumber);

      if (data.length > 0) {
        setLoading(false);
        setClicked(false);
        CustomToast(
          "error",
          "Student number is already taken, Please try again.",
          true,
        );
        return;
      }

      const { error, data: response } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: url.verify,
        },
      });

      if (error) {
        setLoading(false);
        setClicked(false);
        CustomToast(
          "error",
          "There's something wrong on creating your account, Please try again later.",
          true,
        );
      } else {
        setLoading(false);
        const { error } = await supabase
          .from("tbl_student_users")
          .insert([
            {
              id: response.user.id,
              student_number: studentNumber,
              name: name,
              role: 1,
              pass_length: password.length,
            },
          ])
          .select();

        if (error) {
          setLoading(false);
          setClicked(false);
          CustomToast(
            "error",
            "There's something wrong on creating your account, Please try again later.",
            true,
          );
        } else {
          const { error: Er } = await supabase
            .from("users_role")
            .insert([
              {
                user_id: response.user.id,
                role: 1,
              },
            ])
            .select();

          if (!Er) {
            setLoading(false);
            router.push("login", { replace: true });
            CustomToast("success", "Your account has been created", false);
          } else {
            setLoading(false);
            setClicked(false);
            console.error(Er);
            CustomToast(
              "error",
              "There's something wrong on creating your account, Please try again later.",
              true,
            );
          }
        }
      }
    } catch (error) {
      setClicked(false);
      CustomToast("error", error.message, true);
    } finally {
      setLoading(false);
    }
  });

  const studNoValidation = {
    label: "studentNumber",
    type: "text",
    id: "student number",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "Please enter a number",
      },
      maxLength: {
        value: 10,
        message: "Student number must have 10 characters",
      },
    },
  };

  const nameValidation = {
    label: "name",
    type: "text",
    id: "name",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      pattern: {
        value: /^[a-zA-Z\s.]*$/,
        message: "You can only use letters and dot (.)",
      },
    },
  };

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
        value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,4}$/g,
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
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  const confirmPasswordValidation = {
    label: "confirmPass",
    type: "password",
    id: "password",
  };

  loading
    ? toast.loading("Please wait...", { id: "load" })
    : toast.dismiss("load");
  return (
    <FormProvider {...methods}>
      {}
      <form
        className="w-full px-2"
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        <InputField {...studNoValidation} />
        <InputField {...nameValidation} />
        <InputField {...emailValidation} />
        <InputField {...passwordValidation} />
        <InputField {...confirmPasswordValidation} />

        <AuthButton
          name={`${clicked ? "creating" : "register"}`}
          disabled={clicked}
          classname={`${clicked ? "opacity-50" : "opacity-100"} mt-5`}
          onclick={onSubmit}
        />
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
