"use client";
import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateDetails from "../components/UpdateDetails";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { MdUpdate, MdDelete } from "react-icons/md";
import supabase from "@/lib/supabase-browser";
import CustomToast from "@/utils/CustomToast";

const RowActions = ({ row }) => {
  const data = row.original;
  const [isToggled, setIsToggled] = useState(false);
  const [update, setUpdate] = useState(false);

  const deleteData = async () => {
    const { error } = await supabase
      .from("tbl_subjects")
      .delete()
      .eq("id", data.id);

    CustomToast("success", "The subject has been deleted successfully", false);

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
            className="relative flex gap-3 font-bold cursor-default select-none rounded-sm items-center px-2 py-1.5 text-[12px] md:text-[14px] outline-none transition-colors text-opacity-90 hover:bg-[#91B552] hover:text-white w-full data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            onClick={() => setUpdate((prev) => !prev)}
          >
            <MdUpdate size={20} />
            Update Details
          </DropdownMenuItem>
          <div className="relative flex gap-3 font-bold cursor-default select-none rounded-sm items-center px-2 py-1.5 text-[12px] md:text-[14px] outline-none transition-colors text-opacity-90 hover:bg-[#91B552] hover:text-white w-full data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <MdDelete size={20} />
            <ConfirmationModal
              buttonName="Delete"
              icon={<MdDelete size={25} />}
              iconColor="error"
              cancelButton={true}
              header="Are you sure?"
              desc="If you delete this, the data will be gone forever. Are you sure you want to proceed?"
              onCancel="Cancel"
              onConfirm="Confirm"
              accent="error"
              onClick={deleteData}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {update && <UpdateDetails id={data.id} />}
    </div>
  );
};

export default RowActions;
