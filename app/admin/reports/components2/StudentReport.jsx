import * as React from "react";

import { Button } from "@/components/ui/Buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CustomToast from "@/utils/CustomToast";
import supabase from "@/lib/supabase-browser";

export function StudentReport({ trigger, data, isPointAlloc = false }) {
  const [student, setStudent] = React.useState("");

  const baseStorageUrl =
    "https://yzppmncmjybezxhcekir.supabase.co/storage/v1/object/public/report_files/";

  const handleCLick = async () => {
    const { data: studentData } = await supabase
      .from("tbl_student_users")
      .select("*")
      .eq("student_number", student)
      .single();
    if (studentData && data) {
      const reportData = Object.values(data).filter(function (a) {
        return a.student_number === student;
      });

      if (reportData) {
        const fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(reportData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, {
          bookType: "xlsx",
          type: "array",
        });
        const Edata = new Blob([excelBuffer], { type: fileType });

        const file_name = isPointAlloc
          ? `PointAllocation-Report-${studentData.student_number}`
          : `Transaction-Report-${studentData.student_number}`;

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
            CustomToast("error", "Error Generating Report", true);
          }
        } else {
          CustomToast("error", "Error Generating Report", true);
        }
      }
    } else {
      CustomToast("error", "No student record found", true);
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
        <div className="z-[50] p-3 mx-auto max-w-md">
          <Card className=" md:w-[400px]">
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
                  Student Report
                </CardTitle>
              </div>
              <CardDescription>Enter student number</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-3">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="studNo"
                    className="text-[15px] font-semibold text-main"
                  >
                    Student Number
                  </Label>
                  <Input
                    onChange={(e) => setStudent(e.target.value)}
                    placeholder="2020600716"
                    className="text-[15px] font-medium text-black"
                  />
                </div>
                <div className="flex justify-center md:justify-end">
                  <Button
                    variant="outline"
                    className="w-[20vh] self-center"
                    onClick={handleCLick}
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
