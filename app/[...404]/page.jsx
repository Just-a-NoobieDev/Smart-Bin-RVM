import Image from "next/image";
import Image404 from "@/public/images/logo.png";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1000px] flex flex-col justify-center items-center">
      <Image src={Image404} alt="404 Image" className=" max-w-[500px] w-full" />
      <h1 className=" text-[25px] font-bold mb-5 text-main sm:text-[30px] 2xl:text-[40px]">
        404 - Page Not Found
      </h1>

      <p className="text-center text-xs mx-10 sm:text-[16px] 2xl:text-[26px] 2xl:mb-5 2xl:leading-8 ">
        While {"you're"} here, why not learn about reducing, reusing, and
        recycling? {"It's"} what we do best
      </p>

      <footer className="text-[13px] flex justify-center items-center absolute bottom-0 text-center shadow-shadow w-full h-20 font-bold sm:h-10 px-2">
        Reduce, Reuse, Recycle – in both the digital and physical worlds.
      </footer>
    </div>
  );
}
