import React, { useContext } from "react";
import { MdMenu } from "react-icons/md";
import { SidebarContext } from "@/context/SidebarContext";

const Hamburger = () => {
  const { toggle } = useContext(SidebarContext);

  return (
    <div className="w-full px-4">
      <MdMenu
        size={40}
        color="#5B801A"
        onClick={toggle}
        className="cursor-pointer lg:hidden"
      />
    </div>
  );
};

export default Hamburger;
