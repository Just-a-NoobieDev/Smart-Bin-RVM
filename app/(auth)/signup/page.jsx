"use client";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import SignUpForm from "@/components/authRoutes/SignUpForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import supabase from "@/lib/supabase-browser";

const SignUp = () => {
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.push("/loading");
      }
    };

    getSession();
  }, [router]);

  return (
    <div className="flex mx-1">
      <div className="h-auto relative items-center justify-center flex-1  bg-white hidden lg:block">
        <Image
          src={logo}
          alt="Logo"
          className="absolute bottom-4 w-[85%] h-auto"
        />
      </div>
      <div className="flex flex-[5] items-center justify-center min-h-screen lg:py-5 bg-[#5b801a70]">
        <div className="px-[10%] lg:px-15 py-20 flex flex-col items-center justify-center lg:max-w-[60%] lg:h-auto h-full w-full bg-white rounded-md">
          <Image
            src={logo}
            alt="Logo"
            className="lg:hidden block mb-2 md:w-50 sm:w-40"
          />
          <h1 className="text-[#5b801a] font-semibold lg:text-3xl md:text-2xl text-xl mb-5">
            Create an Account
          </h1>
          <SignUpForm />
          <p className="text-[#5b801a] mt-2 mx-2">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:opacity-50">
              {" "}
              Login Here{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
