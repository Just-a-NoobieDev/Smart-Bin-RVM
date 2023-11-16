"use client";

import { Columns } from "./data-table-properties/columns";
import { DataTable } from "./components/data-table";
import supabase from "@/lib/supabase-browser";
import Hamburger from "@/components/ui/Hamburger";
import { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import { useAuthStore } from "@/store/Auth";

function PointsAllocation() {
  const [data, setData] = useState({});
  // const [isAddPoints, setIsAddPoints] = useState(false);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const retrieveData = async () => {
      let { data, error } = await supabase
        .from("tbl_points_allocation")
        .select("*, tbl_subjects (*), tbl_student_users(*)");

      if (!error) {
        setData(data);
      }
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
        <div className="col-span-1 md:col-span-2 pb-4 md:pb-0 whitespace-nowrap">
          <h2 className="text-[#5B801A] font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
            Points Allocation History
          </h2>
        </div>
      </div>
      <div className="mx-5">
        <DataTable columns={Columns} data={data} />
      </div>
      {/* {isAddPoints && <UsePointsModal isAdmin={true} />} */}
    </div>
  );
}

export default withAuth(PointsAllocation, [Roles.admin, Roles.superAdmin]);
