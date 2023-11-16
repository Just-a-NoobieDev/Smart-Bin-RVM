"use client";
import React, { useEffect, useState } from "react";
import { Columns } from "./data-table-properties/columns";
import { DataTable } from "./components/data-table";
import Hamburger from "@/components/ui/Hamburger";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import { useAuthStore } from "@/store/Auth";
import supabase from "@/lib/supabase-browser";

function AdmintManagement() {
  const [adminID, setadminID] = useState([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const getadminID = async () => {
      if (user != null) {
        const { data: adminID, error } = await supabase
          .from("tbl_admin_user")
          .select("*")
          .eq("role_id", 2);

        if (!error) {
          setadminID(adminID);
        }
      }
    };

    getadminID();

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_admin_user" },
        (payload) => {
          getadminID();
        },
      )
      .subscribe();
  }, [user]);

  return (
    <div>
      <Hamburger />
      <div className="grid grid-cols-1 md:grid-cols-3 items-center px-4 py-2">
        <div className="col-span-1 md:col-span-2 pb-4 md:pb-0">
          <h2 className="text-[#5B801A] font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
            Admin Management
          </h2>
        </div>
      </div>
      <div className="mx-5">
        <DataTable columns={Columns} data={adminID} />
      </div>
    </div>
  );
}

export default withAuth(AdmintManagement, [Roles.superAdmin]);
