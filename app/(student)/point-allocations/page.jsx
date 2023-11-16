"use client";

import { Columns } from "./data-table-properties/columns";
import { DataTable } from "./components/data-table";
import supabase from "@/lib/supabase-browser";
import Hamburger from "@/components/ui/Hamburger";
import { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import { useAuthStore } from "@/store/Auth";

async function get(student_number) {
  let { data, error } = await supabase
    .from("tbl_points_allocation")
    .select("*, tbl_subjects (*), tbl_student_users(*)")
    .eq("student_number", student_number);

  return data;
}

function PointsAllocation() {
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

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_points_allocation" },
        (payload) => {
          retrieveData();
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
            Points Allocation History
          </h2>
        </div>
      </div>
      <div className="mx-5">
        <DataTable columns={Columns} data={data} />
      </div>
    </div>
  );
}
export default withAuth(PointsAllocation, [Roles.student]);
