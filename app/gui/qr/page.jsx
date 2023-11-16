"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaQrcode } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { QrReader } from "react-qr-reader";
import CustomToast from "@/utils/CustomToast";

const QR = (hasassa) => {
  const [data, setData] = useState("No result");
  const studentNo = data.match(/\d+/);
  const studentNumber = studentNo ? studentNo[0] : "No result";

  const router = useRouter();
  const student_number = localStorage.getItem("student_number");
  // localStorage.setItem("student_number", studentNumber);
  // if (student_number == studentNumber) {
  //   CustomToast("Success", "It's good to have you back!", false);
  //   router.push("/gui/counter");
  // }

  return (
    <div className="max-w-[1024px] max-h-[468px] mx-auto relative">
      <div className="w-full">
        <header className={`font-semibold absolute left-[40px] top-[20px]`}>
          <p className="text-main">
            <Link
              href="./login"
              className="flex justify-center items-center gap-[10px]"
            >
              <TbArrowBackUp className="w-[20px] h-[20px]" />
              Back
            </Link>
          </p>
        </header>
        <main className="flex justify-center flex-col items-center">
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
                console.log("nice");
              }

              if (!!error) {
                console.log("Tae");
              }
            }}
            // constraints={{ facingMode: "environment" }}
            className="w-[390px] h-[390px] mx-auto"
          />

          <p className={`font-semibold text-main mt-[-10px] text-[18px]`}>
            Show the QR code in front of the scanner and wait for a couple of
            seconds...
          </p>
          <div type="submit" className="w-[289px] h-[55px] mt-[10px]">
            <p className="text-center">{studentNumber}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QR;
