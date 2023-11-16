import supabase from "@/lib/supabase-browser";
import CustomToast from "@/utils/CustomToast";
import React, { useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";

const TransactionDetails = ({ onClose, selectedTransaction }) => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const getTransactionDetails = async () => {
      let { data: transaction, error } = await supabase
        .from("tbl_transactions")
        .select("*")
        .eq("transaction_id", selectedTransaction)
        .single();

      if (transaction) {
        setTransaction(transaction);
      } else {
        CustomToast(
          "Error",
          "Something went wrong, Please try again later",
          true,
        );
      }
    };

    getTransactionDetails();
  }, [selectedTransaction]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col bg-white absolute top-44 w-[250px] md:w-auto h-auto px-6 py-4 md:p-8 md:pb-5 shadow-modal">
        <div className="flex justify-between gap-5 md:gap-12 pb-2 md:pb-6">
          <h2 className="font-bold text-[16px] md:text-[24px] lg:text-[26px] text-[#5B801A]">
            Transaction Details
          </h2>
          <button
            className="text-black flex justify-end pt-1"
            onClick={onClose}
          >
            <BsXLg className="text-[16px] md:text-[24px]" />
          </button>
        </div>

        <div>
          <div className="text-[10px] md:text-sm lg:text-md font-semibold text-[#5B801A]">
            <h3>Transaction Id </h3>
          </div>
          <div className="bg-white p-1 border-thin text-[10px] md:text-[13px] border-[#1b1b1b] text-[#707070]">
            {transaction.transaction_id}
          </div>

          <div className="pt-2 text-[10px] md:text-sm lg:text-md font-semibold text-[#5B801A]">
            <h3>Student Number </h3>
          </div>
          <div className="bg-white p-1 border-thin text-[10px] md:text-[13px] border-[#1b1b1b] text-[#707070]">
            {transaction.student_number}
          </div>

          <div className="pt-2 text-[10px] md:text-sm lg:text-md font-semibold text-[#5B801A]">
            <h3>Number of Bottles </h3>
          </div>
          <div className="bg-white p-1 border-thin text-[10px] md:text-[13px] border-[#1b1b1b] text-[#707070]">
            {transaction.number_bottles}
          </div>

          <div className="pt-2 text-[10px] md:text-sm lg:text-md font-semibold text-[#5B801A]">
            <h3>Transaction Date </h3>
          </div>
          <div className="bg-white p-1 border-thin text-[10px] md:text-[13px] border-[#1b1b1b] text-[#707070]">
            {new Date(transaction.transaction_date).toDateString()}
          </div>

          <div className="pt-2 text-[10px] md:text-sm lg:text-md font-semibold text-[#5B801A]">
            <h3>Converted Points </h3>
          </div>
          <div className="bg-white p-1 border-thin text-[10px] md:text-[13px] border-[#1b1b1b] text-[#707070]">
            {transaction.converted_points}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
