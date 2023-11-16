import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { MdDelete } from "react-icons/md";

const DeleteDetails = ({ Trigger }) => {
  return (
    <Dialog>
      {Trigger && (
        <DialogTrigger asChild>
          <div className="flex justify-between gap-4 font-bold text-[12px] md:text-[14px] items-center ">
            <MdDelete className="text-[16px] md:text-[20px]" />
            Delete
          </div>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] w-[350px] md:w-[500px] p-2 pl-4 md:p-4 md:pl-6">
        <DialogHeader>
          <DialogTitle className="font-bold flex items-center gap-3 text-black text-[16px] md:text-[18px] lg:text-[18px]">
            <MdDelete className=" text-[#B20000] text-[30px] md:text-[40px] bg-[#FFE2E2] rounded-3xl p-1" />
            Delete Transaction?
          </DialogTitle>
        </DialogHeader>
        <div className="text-[#707070] text-[10px] md:text-[12px]">
          <p>
            If you delete this, the data will be gone forever. Are you sure you
            want to proceed?
          </p>
        </div>

        <div className="flex justify-end gap-3 items-center">
          <button className="border border-input py-1 px-6 md:px-8 text-[8px] md:text-[12px] text-[#707070] hover:bg-gray-100 active:bg-gray-200">
            Cancel
          </button>
          <button className="bg-[#B20000] text-white text-[8px] md:text-[12px] px-6 md:px-8 py-1 border-thin hover:bg-red-700 active:bg-red-800">
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDetails;
