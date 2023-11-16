// SuccessModal.js

import { Separator } from "@radix-ui/react-select";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoDownloadOutline } from "react-icons/io5";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Receipt from "@/components/ReceiptPDF";

const ConfirmAllocation = ({ onClose, data }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 mx-1"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm"></div>
          <div className="relative w-auto max-w-md p-6 mx-auto my-6 bg-white rounded-lg shadow-outer flex flex-col justify-center">
            <div className="text-center flex flex-col ">
              <h2 className="text-3xl font-bold text-main  flex flex-col justify-center items-center gap-5">
                <BsFillCheckCircleFill
                  size={80}
                  className="mt-[-70px] bg-white"
                />
                Success!
              </h2>
              <p className="text-[#606060]">Your points have been allocated!</p>
            </div>
            <div className="mt-10 flex justify-center flex-col gap-3">
              <PDFDownloadLink
                document={<Receipt data={data} />}
                fileName={`Receipt - ${data.id}`}
              >
                <button
                  className="bg-main w-full text-white justify-center hover:bg-white hover:text-main transition duration-300 hover:shadow-outer px-4 py-2 rounded-md mx-2 flex gap-3 items-center"
                  onClick={onClose}
                >
                  Download Report
                  <IoDownloadOutline size={20} />
                </button>
              </PDFDownloadLink>

              <p
                className="text-center cursor-pointer hover:text-main transition duration-300 underline rounded-md"
                onClick={onClose}
              >
                Close
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmAllocation;
