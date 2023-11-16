import React from "react";
import { AiFillEye } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TransactionDetails = ({ Trigger }) => {
  return (
    <Dialog>
      {Trigger && (
        <DialogTrigger asChild>
          <div className="flex justify-between gap-4 font-bold text-[12px] md:text-[14px] items-center ">
            <AiFillEye className="text-[16px] md:text-[20px]" />
            View Details
          </div>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] w-[320px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <div className=" text-[#5B801A]">
          <div>
            <p className="mb-1 text-[14px] md:text-[16px]">Transaction Id</p>
            <Input
              value={123}
              disabled
              className="border-black text-[#1B1B1B]"
            />
          </div>
          <div>
            <p className="my-1 text-[14px] md:text-[16px]">Student Number</p>
            <Input
              value={123}
              disabled
              className="border-black text-[#1B1B1B]"
            />
          </div>
          <div>
            <p className="my-1 text-[14px] md:text-[16px]">Number of Bottles</p>
            <Input
              value={123}
              disabled
              className="border-black text-[#1B1B1B]"
            />
          </div>
          <div>
            <p className="my-1 text-[14px] md:text-[16px]">Transaction Date</p>
            <Input
              value={123}
              disabled
              className="border-black text-[#1B1B1B]"
            />
          </div>
          <div>
            <p className="my-1 text-[14px] md:text-[16px]">Converted Points</p>
            <Input
              value={123}
              disabled
              className="border-black text-[#1B1B1B]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetails;
