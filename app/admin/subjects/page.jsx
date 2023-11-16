"use client";
import React, { useEffect, useState } from "react";
import { Columns } from "./data-table-properties/columns";
import { DataTable } from "./components/data-table";
import Hamburger from "@/components/ui/Hamburger";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import { useAuthStore } from "@/store/Auth";
import supabase from "@/lib/supabase-browser";

function Subjects() {
  const [subjects, setsubjects] = useState([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const getsubjects = async () => {
      if (user != null) {
        const { data: subjects, error } = await supabase
          .from("tbl_subjects")
          .select("*");

        if (!error) {
          setsubjects(subjects);
        }
      }
    };

    getsubjects();

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_subjects" },
        (payload) => {
          getsubjects();
        },
      )
      .subscribe();
  }, [user, subjects]);

  return (
    <div>
      <Hamburger />
      <div className="grid grid-cols-1 md:grid-cols-3 items-center px-4 py-2">
        <div className="col-span-1 md:col-span-2 pb-4 md:pb-0">
          <h2 className="text-[#5B801A] font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
            Subjects Management
          </h2>
        </div>
      </div>
      <div className="mx-5">
        <DataTable columns={Columns} data={subjects} />
      </div>
    </div>
  );
}

export default withAuth(Subjects, [Roles.admin, Roles.superAdmin]);
