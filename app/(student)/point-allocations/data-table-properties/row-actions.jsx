"use client";
import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdCopy } from "react-icons/io";
import { IoDownloadOutline } from "react-icons/io5";
import { AiFillEye } from "react-icons/ai";
import PointsAllocationDetails from "../components/PointsAllocDetails";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Receipt from "@/components/ReceiptPDF";

const RowActions = ({ row }) => {
  const [isToggled, setIsToggled] = useState(false);

  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${row.original.id}`;

  const data = { ...row.original, qr: qrCode };

  const handleDownload = () => {};

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-0 md:p-2">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="text-[#707070] w-5 ml-3 md:ml-0 md:w-10 " />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(data.id)}
            className="flex justify-between gap-3 font-bold text-[12px] md:text-[14px]"
          >
            <IoMdCopy className="text-[20px]" /> Copy Point Allocation ID
          </DropdownMenuItem>
          <PDFDownloadLink
            document={<Receipt data={data} />}
            fileName={`Receipt - ${data.id}`}
          >
            <DropdownMenuItem className="flex  gap-3 font-bold text-[12px] md:text-[14px] ">
              <IoDownloadOutline className="text-[20px]" /> Download Receipt
            </DropdownMenuItem>
          </PDFDownloadLink>

          <DropdownMenuItem
            className="relative flex gap-3 font-bold cursor-default select-none rounded-sm items-center px-2 py-1.5 text-[12px] md:text-[14px] outline-none transition-colors text-opacity-90 hover:bg-[#91B552] hover:text-white w-full data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            onClick={() => setIsToggled((prev) => !prev)}
          >
            <AiFillEye size={20} />
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isToggled && <PointsAllocationDetails id={data.id} />}
    </div>
  );
};

export default RowActions;
