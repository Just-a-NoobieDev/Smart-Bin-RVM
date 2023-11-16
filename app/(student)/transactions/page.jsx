"use client";

import { Columns } from "./data-table-properties/columns";
import { DataTable } from "@/components/ui/data-table";
import supabase from "@/lib/supabase-browser";
import Hamburger from "@/components/ui/Hamburger";
import { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import { useAuthStore } from "@/store/Auth";

async function get(student_number) {
  let { data: tbl_transactions } = await supabase
    .from("tbl_transactions")
    .select("*, tbl_student_users(*)")
    .eq("student_number", student_number);

  return tbl_transactions;
}

function Transactions() {
  const [data, setData] = useState({});
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const getStudentNumber = async () => {
      if (user != null) {
        let { data: studNo, error } = await supabase
          .from("tbl_student_users")
          .select("student_number")
          .eq("id", user.id)
          .single();

        if (!error) {
          return studNo.student_number;
        }
      }

      return null;
    };

    const retrieveData = async () => {
      const student_number = await getStudentNumber();
      const data = await get(student_number);
      setData(data);
    };
    retrieveData();
  }, [user]);

  return (
    <div>
      <Hamburger />
      <div className="grid grid-cols-1 md:grid-cols-3 items-center px-4 py-2">
        <div className="col-span-1 md:col-span-2 pb-4 md:pb-0">
          <h2 className="text-[#5B801A] font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
            Transaction History
          </h2>
        </div>
      </div>
      <div className="mx-5">
        <DataTable columns={Columns} data={data} />
      </div>
    </div>
  );

  // state for data

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       let { data: studNo } = await supabase
  //         .from("tbl_student_users")
  //         .select("student_number")
  //         .eq("id", user.id)
  //         .single();

  //       if (studNo) {
  //         let { data: transactions, error } = await supabase
  //           .from("tbl_transactions")
  //           .select("*")
  //           .eq("student_number", studNo.student_number);

  //         if (transactions) {
  //           setTransacData(transactions);
  //         } else {
  //           CustomToast(
  //             "Error",
  //             "Something went wrong please try again later",
  //             true
  //           );
  //         }
  //       }
  //     } catch (error) {
  //       CustomToast(
  //         "Error",
  //         "Something went wrong please try again later",
  //         true
  //       );
  //     }
  //   };

  //   getData();
  // }, [user]);

  // if (user) {
  //   return (
  //     <div>
  //       <div
  //         className={`bg-white min-h-screen ${
  //           isToggled || isClicked ? "filter blur-sm" : ""
  //         }`}
  //       >
  //         <Hamburger />

  //         <div className="grid grid-cols-1 md:grid-cols-3 items-center px-4 py-4">
  //           <div className="col-span-1 md:col-span-2 pb-4 md:pb-0">
  //             <h2 className="text-[#5B801A] font-bold text-[22px] md:text-[24px] lg:text-[22px] xl:text-[26px]">
  //               Transaction History
  //             </h2>
  //           </div>
  //           <div className="col-span-1 flex justify-center md:justify-end">
  //             <div className="flex items-center w-full md:w-auto ">
  //               <button
  //                 className={`${
  //                   isSort || isToggled
  //                     ? "pointer-events-none"
  //                     : "pointer-events-auto"
  //                 } bg-white border p-2 w-full h-[32px] md:h-[36px] text-[10px] md:text-[12px] lg:text-md text-[#5B801A] hover:bg-gray-100 active:bg-gray-200 font-semibold shadow-cards whitespace-nowrap px-4`}
  //                 onClick={() => setIsClicked((prev) => !prev)}
  //               >
  //                 <div className="flex justify-center items-center md:mx-4 lg:mx-0">
  //                   <VscSettings className="mr-2 2xl:mr-2 text-sm md:text-lg" />
  //                   Filters
  //                 </div>
  //               </button>
  //             </div>

  //             <div className="flex items-center w-full md:w-auto">
  //               <button
  //                 className={`${
  //                   isClicked || isToggled
  //                     ? "pointer-events-none"
  //                     : "pointer-events-auto"
  //                 } bg-white border p-2 w-full h-[32px] md:h-[36px] text-[10px] md:text-[12px] lg:text-md text-[#5B801A] hover:bg-gray-100 active:bg-gray-200 font-semibold shadow-cards whitespace-nowrap px-4`}
  //                 onClick={() => setIsSort((prev) => !prev)}
  //               >
  //                 <div className="flex justify-center items-center md:mx-4 lg:mx-0">
  //                   <BiSortDown className="mr-2 2xl:mr-2 text-sm md:text-lg" />
  //                   Sort by
  //                 </div>
  //               </button>
  //             </div>

  //             <div className="flex items-center w-full md:w-auto">
  //               <button className="bg-[#5B801A] border h-[32px] w-full md:h-[36px] p-2 text-[10px] md:text-[12px] lg:text-md text-white hover:bg-lime-800 active:bg-lime-900 font-semibold shadow-cards whitespace-nowrap px-3">
  //                 <div className="flex justify-center items-center mr-2">
  //                   <BiSolidReport className="mr-2 md:mr-2 lg:mr-2 xl:mr-2 2xl:mr-2 text-sm md:text-lg" />
  //                   Generate Report
  //                 </div>
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="px-4">
  //           <div
  //             className={`${
  //               isClicked || isToggled
  //                 ? "pointer-events-none"
  //                 : "pointer-events-auto"
  //             } max-w-9xl m-auto py-4 border rounded-lg bg-white overflow-scroll relative h-[60vh] md:h-[65vh] lg:h-[75vh] shadow-inner`}
  //           >
  //             {transacData.map(
  //               (
  //                 transactionData,
  //                 index //all the transaction is inside overflow-scroll
  //               ) => (
  //                 <TransactionItem
  //                   key={transactionData.transaction_id}
  //                   transactionData={transactionData}
  //                   isOpen={isOpen}
  //                   index={transactionData.transaction_id}
  //                   selectedTransaction={selectedTransaction}
  //                   toggleTransaction={toggleTransaction}
  //                   setIsToggled={setIsToggled}
  //                   isStudentTransaction={true}
  //                 />
  //               )
  //             )}
  //           </div>
  //         </div>
  //       </div>

  //       <FilterModal
  //         isClicked={isClicked}
  //         setIsClicked={setIsClicked}
  //         isUp={isUp}
  //         setIsUp={setIsUp}
  //       />

  //       {isSort && ( //dropdown from sort by button
  //         <SortBy />
  //       )}

  //       {isToggled && (
  //         <TransactionDetails
  //           onClose={handleCloseTransactionDetails}
  //           selectedTransaction={selectedTransaction}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  // return <Auth />;
}

export default withAuth(Transactions, [Roles.student]);
