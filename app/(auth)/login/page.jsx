"use client";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import LoginForm from "@/components/authRoutes/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import supabase from "@/lib/supabase-browser";

const Login = () => {
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
      <div className="h-screen relative items-center justify-center flex-1  bg-white hidden lg:block">
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
            className="lg:hidden block mb-16 md:w-50 sm:w-40 cursor-pointer"
            onClick={() => router.push("/")}
          />
          <h1 className="text-[#5b801a] font-semibold lg:text-3xl md:text-2xl text-xl lg:mb-10 mb-5">
            Login your Account
          </h1>
          <LoginForm />
          <p className="text-[#5b801a] mt-2 mx-2">
            Don’t have an account?{" "}
            <Link href="/signup" className="underline hover:opacity-50">
              {" "}
              Register Here{" "}
            </Link>
          </p>
          <p className="text-[#5b801a]">
            <Link
              href={"/reset"}
              className="underline hover:opacity-50 text-sm"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
