"use client";

import { createContext, useState, useEffect } from "react";

export const SidebarContext = createContext();

const SidebarContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sizeScreen = () => {
      let size = window.innerWidth;
      if (size < 1080) {
        setOpen(false);
      }
    };
    sizeScreen();
  }, []);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
