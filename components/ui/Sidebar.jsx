"use client";

import React, { useContext, useState, useEffect } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { MdClose, MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import {
  adminSidebarLinks,
  studentSidebarLinks,
  superAdminSidebarLinks,
} from "@/constant";
import Link from "next/link";
import logo from "../../public/images/logo-shadow.png";
import Image from "next/image";
import { useAuthStore } from "@/store/Auth";
import supabase from "@/lib/supabase-browser";

const Sidebar = ({ classname }) => {
  const router = useRouter();
  const { toggle } = useContext(SidebarContext);
  const path = usePathname();
  const pathName = path.split("/").slice(-1)[0];
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const [small, setsmall] = useState(false);
  const [small2, setsmall2] = useState(false);

  const handleSignOut = () => {
    toggle();
    logout();
    supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    const sizeScreen = () => {
      let size = window.innerHeight;
      if (size < 590) {
        setsmall(true);
      } else if (size < 610) {
        setsmall2(true);
      }
    };
    sizeScreen();
  }, []);

  const allUrl = [
    "dashboard",
    "transactions",
    "point-allocations",
    "profile",
    "admin",
    "admin-transactions",
    "admin-point-allocations",
    "admin-profile",
    "subjects",
    "reports",
    "student-management",
    "admin-management",
  ];
  const student = ["dashboard", "transactions", "point-allocations", "profile"];
  const links = student.includes(pathName)
    ? studentSidebarLinks.map((link) => {
        const { name, icon, url } = link;
        const active = pathName === url.split("/").slice(-1)[0];
        return (
          <Link href={url} key={name} className="w-full" onClick={toggle}>
            <div
              className={`flex items-center justify-start w-full  cursor-pointer hover:bg-[#91B552] ${
                small ? "p-3" : "p-5"
              } ${active ? "bg-[#91B552]" : ""}`}
            >
              <div className="mr-5 ml-2">{icon}</div>
              <h1 className={`text-white ${active ? "font-bold" : ""} text-lg`}>
                {name}
              </h1>
            </div>
          </Link>
        );
      })
    : role == 2
    ? adminSidebarLinks.map((link) => {
        const { name, icon, url } = link;
        const active = pathName === url.split("/").slice(-1)[0];
        return (
          <Link href={url} key={name} className="w-full" onClick={toggle}>
            <div
              className={`flex items-center justify-start w-full p-3 cursor-pointer hover:bg-[#91B552] ${
                active ? "bg-[#91B552]" : ""
              }`}
            >
              <div className="mr-5 ml-3">{icon}</div>
              <h1 className={`text-white ${active ? "font-bold" : ""} text-md`}>
                {name}
              </h1>
            </div>
          </Link>
        );
      })
    : superAdminSidebarLinks.map((link) => {
        const { name, icon, url } = link;
        const active = pathName === url.split("/").slice(-1)[0];
        return (
          <Link href={url} key={name} className="w-full" onClick={toggle}>
            <div
              className={`flex items-center justify-start w-full p-3 cursor-pointer hover:bg-[#91B552]  ${
                active ? "bg-[#91B552]" : ""
              }`}
            >
              <div className="mr-5 ml-3">{icon}</div>
              <h1 className={`text-white ${active ? "font-bold" : ""} text-md`}>
                {name}
              </h1>
            </div>
          </Link>
        );
      });

  if (allUrl.includes(pathName) && !isLoading && user && role) {
    return (
      <div className={`${classname}`}>
        <div
          className={`bg-[#5B801A] ${
            role == 1 && !small
              ? "h-[95%] py-8"
              : (role != 1 && small) || (role == 4 && small2)
              ? "h-full py-4"
              : "h-[95%] py-4"
          } ${
            role == 4 && small
              ? "overflow-scroll no-scrollbar"
              : "rounded-b-full"
          }  w-[300px]  flex flex-col items-center `}
        >
          <div
            className={`flex items-start justify-start w-full px-5 ${
              role == 1 ? "mb-8" : "mb-2"
            }`}
          >
            <MdClose
              size={40}
              color="#fff"
              onClick={toggle}
              className="lg:hidden"
            />
          </div>
          <div
            className={`flex flex-1 flex-col items-center justify-center ${
              role == 1 ? "mb-5" : "mb-2"
            }`}
          >
            <Image src={logo} alt="Logo" className="w-[100px]" />
            <h2 className={`text-white ${role == 4 ? "mt-2" : "mt-4"}`}>
              Smart Plastic Bottle Bin
            </h2>

            <h1 className="text-white text-xl font-bold">
              Reverse Vending Machine
            </h1>
          </div>

          <div className="w-full flex-[3] flex flex-col items-center justify-center">
            {links}
          </div>

          <div
            className={`flex w-full flex-1 items-center justify-center ${
              role == 4 && small ? "mt-4" : ""
            }`}
          >
            <button
              type="button"
              onClick={handleSignOut}
              className="text-white text-xl font-bold w-full flex items-center justify-center gap-4 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <MdLogout size={30} /> Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;
