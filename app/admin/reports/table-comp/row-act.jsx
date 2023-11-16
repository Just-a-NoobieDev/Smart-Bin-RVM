"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { AiFillEye } from "react-icons/ai";
import CustomToast from "@/utils/CustomToast";
import supabase from "@/lib/supabase-browser";

const RowAct = ({ row }) => {
  const data = row.original;

  const handleDelete = async () => {
    const { error } = await supabase.storage
      .from("report_files")
      .remove([data.file_name]);

    if (!error) {
      const { error } = await supabase
        .from("tbl_reports")
        .delete()
        .eq("id", data.id);

      CustomToast("success", "The report has been deleted successfully", false);

      if (error) {
        CustomToast("error", "Something went wrong", true);
      }
    } else {
      CustomToast("error", "Something went wrong", true);
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
          <DropdownMenuItem className="relative flex gap-4 font-bold cursor-default select-none rounded-sm items-center px-2 py-1.5 text-[12px] md:text-[14px] outline-none transition-colors text-opacity-90 hover:bg-[#91B552] hover:text-white w-full data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <a
              href={data.file_url}
              download={data.file_name}
              className="flex gap-2"
            >
              <AiFillEye size={20} />
              Download Report
            </a>
          </DropdownMenuItem>

          <button className="relative font-bold gap-4 flex cursor-default select-none rounded-sm items-center px-2 py-1.5 text-sm outline-none transition-colors text-opacity-90 hover:bg-[#91B552] hover:text-white w-full data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <MdDelete size={20} />
            <ConfirmationModal
              buttonName="Delete"
              icon={<MdDelete />}
              iconColor="error"
              cancelButton={true}
              header="Delete Report?"
              desc="If you delete this, the data will be gone forever. Are you sure you want to proceed?"
              onCancel="Cancel"
              onConfirm="Confirm"
              accent="error"
              onClick={handleDelete}
            />
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RowAct;
