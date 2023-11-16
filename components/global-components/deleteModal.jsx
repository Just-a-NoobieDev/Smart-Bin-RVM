import React from "react";
import { BsXLg } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const DeleteModal = ({ onClose }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-white absolute top-44 w-[280px] pl-3 pr-1 py-2 md:w-[430px] h-auto md:pl-4 md:pr-2 md:py-3 shadow-md">
        <div className=" flex justify-between items-center">
          <div className="flex justify-between gap-3 items-center">
            <MdDelete className=" text-[#B20000] text-[25px] md:text-[40px] bg-[#FFE2E2] rounded-3xl p-1" />
            <p className="font-bold text-[11px] md:text-[16px]">
              Delete Transaction?
            </p>
          </div>
          <div>
            <BsXLg className="text-[#9B9B9B]" onClick={onClose} />
          </div>
        </div>
        <div className="text-[#707070] mt-3 text-[9px] md:text-[13px]">
          <p>
            If you delete this, the data will be gone forever. Are you sure you
            want to proceed?
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-3 items-center">
          <div className="border-thin py-1 px-4 md:px-9 text-[8px] md:text-[12px] text-[#707070] hover:bg-gray-100 active:bg-gray-200">
            <button>Cancel</button>
          </div>
          <div className="bg-[#B20000] text-white text-[8px] md:text-[12px] px-4 md:px-9 py-1 border-thin hover:bg-red-700 active:bg-red-800">
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
