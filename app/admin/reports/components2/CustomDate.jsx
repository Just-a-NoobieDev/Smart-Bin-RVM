"use client";
import * as React from "react";

import { Button } from "@/components/ui/Buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { DatePickerWithRange } from "./DatePickerWithRange";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CustomToast from "@/utils/CustomToast";
import supabase from "@/lib/supabase-browser";
import moment from "moment";

export function CustomDate({ trigger, data, isPointAlloc = false }) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: new Date(),
  });

  const baseStorageUrl =
    "https://yzppmncmjybezxhcekir.supabase.co/storage/v1/object/public/report_files/";

  const handleClick = async () => {
    if (data) {
      const customDateReport = Object.values(data).filter(function (a) {
        const dataDate = new Date(a.date).toISOString();
        return (
          dataDate > date.from.toISOString() && dataDate < date.to.toISOString()
        );
      });

      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const ws = XLSX.utils.json_to_sheet(customDateReport);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const Edata = new Blob([excelBuffer], { type: fileType });

      const file_name = isPointAlloc
        ? `PointAllocation-Report-${moment(date.from).format(
            "YYYY-MM-DD",
          )}-${moment(date.to).format("YYYY-MM-DD")}`
        : `Transaction-Report-${moment(date.from).format(
            "YYYY-MM-DD",
          )}-${moment(date.to).format("YYYY-MM-DD")}`;

      const { error: UploadError } = await supabase.storage
        .from("report_files")
        .upload(file_name + fileExtension, Edata, {
          cacheControl: "3600",
          upsert: false,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          contentEncoding: "gzip",
          contentDisposition: `'inline; filename=${file_name}.xlsx"`,
        });

      if (!UploadError) {
        const url = `${baseStorageUrl}${file_name}.xlsx`;

        const { error } = await supabase
          .from("tbl_reports")
          .insert([
            {
              file_name: `${file_name}.xlsx`,
              file_url: url,
            },
          ])
          .select();

        if (!error) {
          CustomToast("success", "Report Generated Successfully", false);
          FileSaver.saveAs(Edata, file_name + fileExtension);
          trigger();
        } else {
          CustomToast("error", "Error Generating Report", false);
        }
      } else {
        CustomToast(
          "error",
          `You have already generate this report, Please search "${file_name}.xlsx" in the report list`,
          true,
        );
      }
    } else {
      CustomToast("error", "Error Generating report.", true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[50] mx-1"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
      >
        <div className="fixed z-[45] inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="z-[50] p-4 mx-auto max-w-md">
          <Card className=" md:w-[350px]">
            <div className="flex justify-end mr-3 mt-3 mb-[-10px] ">
              <MdClose
                size={20}
                className="hover:scale-125 transition duration-300"
                onClick={trigger}
              />
            </div>
            <CardHeader>
              <div className="flex justify-between  items-center">
                <CardTitle className="text-[23px] font-semibold text-main">
                  Custom Date
                </CardTitle>
              </div>
              <CardDescription>Select date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>
              <div className="flex justify-center md:justify-end">
                <Button
                  variant="outline"
                  className="m-3 w-[20vh]"
                  onClick={handleClick}
                >
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
