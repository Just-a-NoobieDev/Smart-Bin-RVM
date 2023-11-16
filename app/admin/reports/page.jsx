"use client";
import React from "react";
import Hamburger from "@/components/ui/Hamburger";
import { useState, useEffect } from "react";
import { Cols } from "./table-comp/cols";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import { DataTable } from "./data-table";
import supabase from "@/lib/supabase-browser";

const AdminReports = () => {
  const [data, setData] = useState({});
  const [tData, setTData] = useState({});
  const [pData, setPData] = useState({});

  useEffect(() => {
    const retrieveData = async () => {
      const { data, error } = await supabase.from("tbl_reports").select("*");

      if (!error) {
        setData(data);
      }
    };
    const retrieveTrData = async () => {
      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("*");

      const nData = JSON.parse(JSON.stringify(data), (key, value) => {
        if (key === "date") {
          return new Date(value).toLocaleString();
        }
        return value;
      });

      if (!error) {
        setTData(nData);
      }
    };

    const retrievePData = async () => {
      const { data, error } = await supabase
        .from("tbl_points_allocation")
        .select("*, tbl_subjects(*)");

      const fData = data.map((d) => {
        return {
          ...d,
          date: new Date(d.date).toLocaleString(),
          subject_name: d.tbl_subjects.subject_name,
          subject_code: d.tbl_subjects.subject_code,
          subject_instructor: d.tbl_subjects.subject_instructor,
          tbl_subjects: "---->",
        };
      });

      if (!error) {
        setPData(fData);
      }
    };

    retrieveData();
    retrieveTrData();
    retrievePData();

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_reports" },
        () => {
          retrieveData();
          retrieveTrData();
          retrievePData();
        },
      )
      .subscribe();
  }, []);

  return (
    <div>
      <Hamburger />
      <div className="grid grid-cols-1 md:grid-cols-3 items-center px-4 py-2">
        <div className="col-span-1 md:col-span-2 pb-4 md:pb-0 md:my-3 lg:my-0">
          <h2 className="text-[#5B801A] font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
            Reports
          </h2>
        </div>
      </div>
      <div className="mx-5">
        <DataTable columns={Cols} data={data} tData={tData} pData={pData} />
      </div>
    </div>
  );
};

export default withAuth(AdminReports, [Roles.admin, Roles.superAdmin]);
