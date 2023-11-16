"use client";
import Image from "next/image";
export const About = () => {
  return (
    <div
      className="flex flex-col h-fit p-12 gap-10 bg-[#5B801A] laps:w-[60%] laps:h-[100vh] laps:-z-10 laps:mt-[40px] wide:mt-[30px]"
      id="about"
    >
      <div className="flex flex-col justify-center items-center ">
        <h1
          className={`font-extrabold text-5xl mb-2 text-white laps:text-8xl laps:mb-16 pc:text-9xl wide:text-10xl`}
        >
          ABOUT US
        </h1>
        <p
          className={`font-normal text-white text-justify laps:text-2xl pc:text-3xl wide:text-2xl `}
        >
          It has roots in a piece of classical Latin literature from 45 BC,
          making it over 2000 years old. Richard McClintock, a Latin professor
          at Hampden-Sydney College in Virginia, looked up one of the more
          obscure Latin words, consectetur, from a Lorem Ipsum passage, and
          going through the cites of the word in classical literature,
          discovered the undoubtable source. Lorem Ipsum comes from sections
          1.10.32 and 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot; (The
          Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a
          treatise on the theory of ethics, very popular
        </p>
      </div>
    </div>
  );
};

export const AboutLogo = () => {
  return (
    <div className="w-[40vh] h-[40vh] laps:flex laps:flex-row laps:justify-center laps:items-center laps:w-[40%] laps:h-[105vh] wide:max-w-[1024px]">
      <Image src="/logo (2).png" width={400} height={400} alt="logo" />
    </div>
  );
};
