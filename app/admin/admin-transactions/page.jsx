"use client";
import React, { useEffect, useState } from "react";
import Hamburger from "@/components/ui/Hamburger";
import { DataTable } from "./components/data-table";
import { Columns } from "./data-table-properties/columns";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import supabase from "@/lib/supabase-browser";

async function get() {
  let { data: tbl_transactions } = await supabase
    .from("tbl_transactions")
    .select("*, tbl_student_users(*)");

  return tbl_transactions;
}

function AdminTransactions() {
  const [data, setData] = useState({});

  useEffect(() => {
    const retrieveData = async () => {
      const data = await get();
      setData(data);
    };
    retrieveData();

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_transactions" },
        (payload) => {
          retrieveData();
        },
      )
      .subscribe();
  }, []);
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
}

export default withAuth(AdminTransactions, [Roles.admin, Roles.superAdmin]);
