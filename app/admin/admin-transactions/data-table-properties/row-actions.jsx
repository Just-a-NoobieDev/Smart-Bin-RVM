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
import StudentDetails from "../components/StudentDetails";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { MdDelete } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import supabase from "@/lib/supabase-browser";
import CustomToast from "@/utils/CustomToast";
import { useAuthStore } from "@/store/Auth";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoDownloadOutline } from "react-icons/io5";
import TransactionReceipt from "@/components/TransactionReceipt";

const RowActions = ({ row }) => {
  const data = row.original;
  const [isToggled, setIsToggled] = useState(false);
  const role = useAuthStore((state) => state.role);

  const deleteData = async () => {
    const { error } = await supabase
      .from("tbl_transactions")
      .delete()
      .eq("id", data.id);

    CustomToast("Success", "Transaction has been deleted successfully", false);

    if (error) {
      console.log(error);
    }
  };

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
            <IoMdCopy className="text-[20px]" /> Copy Transaction ID
          </DropdownMenuItem>
          <PDFDownloadLink
            document={<TransactionReceipt data={data} />}
            fileName={`Transaction Receipt - ${data.id}`}
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

          {role == 4 && (
            <div className="relative flex gap-3 font-bold cursor-default select-none rounded-sm items-center px-2 py-1.5 text-[12px] md:text-[14px] outline-none transition-colors text-opacity-90 hover:bg-[#91B552] hover:text-white w-full data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              <MdDelete size={20} />
              <ConfirmationModal
                buttonName="Delete"
                icon={<MdDelete />}
                iconColor="error"
                cancelButton={true}
                desc="If you delete this, the data will be gone forever. Are you sure you want to proceed?"
                header="Are you sure?"
                onCancel="Cancel"
                onConfirm="Confirm"
                accent="error"
                onClick={deleteData}
              />
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {isToggled && <StudentDetails id={data.id} />}
    </div>
  );
};

export default RowActions;
