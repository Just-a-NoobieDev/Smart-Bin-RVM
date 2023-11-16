"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { findInputError } from "@/utils/findInputError";
import { MdOutlineError } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const InputField = ({ label, type, id, placeholder, validation }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const inputError = findInputError(errors, label);

  const [toggle, setToggle] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);

  return (
    <div className="flex flex-col gap-2 mb-4 w-full ">
      <div className="flex justify-between">
        <label className="capitalize text-[#5B801A] font-semibold" htmlFor={id}>
          {label == "confirmPass"
            ? "confirm password"
            : label == "studentNumber"
            ? "student number"
            : label}
        </label>
        <AnimatePresence mode="wait" initial={true}>
          {inputError && (
            <InputError message={inputError.message} key={inputError.message} />
          )}
        </AnimatePresence>
      </div>
      {label == "password" ? (
        <div className="relative w-full border-[#5B801A] border-2">
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <input
              className="hidden js-password-toggle"
              id="toggle"
              type="checkbox"
              onChange={() => setToggle(!toggle)}
            />
            <label
              className="text-main cursor-pointer js-password-label"
              htmlFor="toggle"
            >
              {toggle ? (
                <BiSolidHide className="w-[25px] h-[25px]" />
              ) : (
                <BiSolidShow className="w-[25px] h-[25px]" />
              )}
            </label>
          </div>
          <input
            className="px-2 h-11 outline-none"
            autoComplete="off"
            type={toggle ? "text" : type}
            id={id}
            placeholder={placeholder}
            {...register(label, validation)}
          />
        </div>
      ) : label == "confirmPass" ? (
        <div className="relative w-full border-[#5B801A] border-2">
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <input
              className="hidden js-password-toggle"
              id="toggle2"
              type="checkbox"
              onChange={() => setToggleConfirm(!toggleConfirm)}
            />
            <label
              className="text-main cursor-pointer js-password-label"
              htmlFor="toggle2"
            >
              {toggleConfirm ? (
                <BiSolidHide className="w-[25px] h-[25px]" />
              ) : (
                <BiSolidShow className="w-[25px] h-[25px]" />
              )}
            </label>
          </div>
          <input
            className=" px-2 h-11 outline-none"
            autoComplete="off"
            type={toggleConfirm ? "text" : type}
            id={id}
            placeholder={placeholder}
            {...register(label, {
              required: {
                value: true,
                message: "required",
              },
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Passwords should match!";
              },
            })}
          />
        </div>
      ) : (
        <input
          className="border-[#5B801A] border-2 px-2 h-11 outline-none"
          autoComplete="off"
          autoFocus
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(label, validation)}
        />
      )}
    </div>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdOutlineError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

export default InputField;
