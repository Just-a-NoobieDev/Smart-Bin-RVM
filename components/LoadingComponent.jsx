import React from "react";
import Image from "next/image";
import Load from "public/vLogo.svg";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[94vh]">
      <div className="flex items-center space-x-1">
        <Image
          src={Load}
          alt="Loading..."
          className="animate-[spin_1s_ease-in-out_infinite] rounded-full h-20 w-20"
        />
        {Array.from("Loading...").map((char, index) => (
          <span
            key={index}
            className="animate-bounce text-main font-semibold"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
