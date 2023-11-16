"use client";

import { usePathname } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import Sidebar from "./ui/Sidebar";
import { useAuthStore } from "@/store/Auth";

const DashboardLayout = ({ children }) => {
  const path = usePathname();
  const pathName = path.split("/").slice(-1)[0];
  const { open } = useContext(SidebarContext);
  const role = useAuthStore((state) => state.role);
  const [small, setsmall] = useState(false);

  const guiPath = ["gui", "manual", "counter", "exit", "qr", "login"];

  useEffect(() => {
    const sizeScreen = () => {
      let size = window.innerHeight;
      if (size < 600) {
        setsmall(true);
      }
    };
    sizeScreen();
  }, []);

  return pathName == "" ||
    guiPath.includes(pathName) ||
    pathName == "login" ||
    pathName == "signup" ||
    pathName == "reset" ||
    pathName == "update-password" ||
    pathName == "verify" ? (
    children
  ) : (
    <div
      className={`flex relative h-screen  ${
        role == 4 && small ? "" : "overflow-hidden"
      }`}
    >
      <Sidebar classname={`lg:block hidden px-10`} />
      <Sidebar
        classname={`lg:hidden  absolute top-0 ${
          role == 4 && small ? "" : "h-screen"
        } overflow-scroll ${
          open ? "left-0" : "-left-[120%]"
        } transition-all duration-500 ease-in-out z-50`}
      />
      <div
        className={`${
          open ? "block" : "hidden"
        } h-screen w-screen bg-black z-10 absolute top-0 left-0 lg:hidden backdrop-filter backdrop-blur-sm bg-opacity-5 firefox:bg-opacity-5 transition-all duration-500 ease-in-out`}
      ></div>
      <main className=" h-full w-full py-5 overflow-y-scroll ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
