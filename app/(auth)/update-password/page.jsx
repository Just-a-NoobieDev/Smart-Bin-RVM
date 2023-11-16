"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Buttons";
import CustomToast from "@/utils/CustomToast";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { PiSealCheckFill } from "react-icons/pi";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const UpdatePassword = () => {
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfimPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password == "" || confirmPassword == "") {
      return CustomToast("Empty Field!", "Fill up all the fields", true);
    }
    if (password != confirmPassword) {
      return CustomToast("Error", "Password not Matched!", true);
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        //incase error occurs
        CustomToast(
          "error",
          "Something went wrong. Please try again later",
          true,
        );
      } else {
        setSuccess(true);
        setTimeout(() => {
          // router.push("/login");
        }, 2000);
        CustomToast("Success", "Password Updated!", false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      router.push("/login");
    }
  });

  return (
    <div>
      <div className="flex mx-1">
        <div className="h-screen relative items-center justify-center flex-1 bg-white hidden lg:block">
          <Image
            src={logo}
            alt="Logo"
            className="absolute bottom-4 w-[85%] h-auto"
          />
        </div>
        <div className="flex flex-[5] items-center justify-center min-h-screen lg:py-5 bg-[#5b801a70]">
          <div className="p-[10%] lg:px-15 py-20 flex flex-col items-center justify-center lg:max-w-[60%] lg:h-auto 2xl:py-20 h-full w-full bg-white rounded-md">
            <Image
              src={logo}
              alt="Logo"
              className={`lg:hidden block mb-16 md:w-50 sm:w-40 ${
                success ? "hidden" : "block"
              }`}
            />
            {success && (
              <div className="flex flex-col items-center lg:p-3">
                <div>
                  <PiSealCheckFill
                    size={80}
                    className="text-[#5b801a] lg:h-[150px] lg:w-[150px] lg:mb-7"
                  />
                </div>
                <div>
                  <p className="text-xl text-center font-bold text-[#5b801a] mb-5 lg:text-2xl">
                    New password confirmed successfully
                  </p>
                  <p className="text-xs text-center">
                    you have successfully confirmed your new password.Please,
                    use your password when logging in.
                  </p>
                </div>
              </div>
            )}
            <div className={`${success ? "hidden" : "block"}`}>
              <div className="flex justify-center">
                <h1 className="text-[#5b801a] font-semibold lg:text-3xl md:text-2xl md:m-5 text-2xl lg:mb-10 mb-5">
                  Enter your new password
                </h1>
              </div>
              <form
                className="flex flex-col gap-2 text-[#5b801a] m-5"
                onSubmit={handleUpdatePassword}
              >
                <Label>New Password</Label>

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
                    className=" px-2 h-11 outline-none"
                    autoComplete="off"
                    type={toggle ? "text" : "password"}
                    placeholder="Enter new password..."
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                {/* <input
                  type="password"
                  placeholder="Enter Email..."
                  className="border-solid border-2 border-[#5b801a] p-1 w-[50vh] md:w-[60vh]"
                  required
                /> */}
                <Label>Confirm Password</Label>
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
                    type={toggleConfirm ? "text" : "password"}
                    placeholder="Confirm password..."
                    value={confirmPassword}
                    onChange={(e) => setConfimPassword(e.target.value)}
                  />
                </div>
                {/* <input
                  type="password"
                  placeholder="Enter new Password..."
                  className="border-solid border-2 border-[#5b801a] p-1 w-[50vh] md:w-[60vh]"
                  required
                /> */}
                <Button
                  variant="outline"
                  type="submit"
                  className="rounded-none lg:my-7"
                >
                  Reset Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
