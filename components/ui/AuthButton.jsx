import React from "react";

const AuthButton = ({ name, classname, onclick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${classname}  w-full bg-[#5b801a] uppercase text-white h-11 hover:bg-[#5b801acc] `}
      onClick={onclick}
    >
      {name}
    </button>
  );
};

export default AuthButton;
