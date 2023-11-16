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
import StudentDetails from "../components/AdminDetails";
import UpdateDetails from "../components/UpdateDetails";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { MdUpdate, MdDelete } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import CustomToast from "@/utils/CustomToast";
import { createClient } from "@supabase/supabase-js";

const RowActions = ({ row }) => {
  const data = row.original;
  const [isToggled, setIsToggled] = useState(false);
  const [update, setUpdate] = useState(false);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY,
  );

  const deleteData = async () => {
    const { error } = await supabase.auth.admin.deleteUser(data.admin_id);
    const {} = await supabase
      .from("tbl_admin_user")
      .delete()
      .eq("id", data.admin_id);
    const {} = await supabase
      .from("users_role")
      .delete()
      .eq("id", data.admin_id);

    CustomToast("success", "The account has been deleted successfully", false);

    if (error) {
      CustomToast("Failed", error, true);
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
            onClick={() => navigator.clipboard.writeText(data.admin_id)}
            className="flex justify-between gap-3 font-bold text-[12px] md:text-[14px]"
          >
            <IoMdCopy className="text-[20px]" /> Copy Admin ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="relative flex gap-3 font-bold cursor-default select-none rounded-sm items-center px-2 py-1.5 text-[12px] md:text-[14px] outline-none transition-colors text-opacity-90 hover:bg-[#91B552] hover:text-white w-full data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            onClick={() => setIsToggled((prev) => !prev)}
          >
            <AiFillEye size={20} />
            View Details
          </DropdownMenuItem>

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
              icon={<MdDelete />}
              iconColor="error"
              cancelButton={true}
              header="Delete account?"
              desc="If you delete this, the data will be gone forever. Are you sure you want to proceed?"
              onCancel="Cancel"
              onConfirm="Confirm"
              accent="error"
              onClick={deleteData}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {isToggled && <StudentDetails id={data.admin_id} />}
      {update && <UpdateDetails id={data.admin_id} />}
    </div>
  );
};

export default RowActions;
