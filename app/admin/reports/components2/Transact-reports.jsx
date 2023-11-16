import { Button } from "@/components/ui/Buttons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { StudentReport } from "./StudentReport";
import { CustomDate } from "./CustomDate";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { BsPersonDown } from "react-icons/bs";
import { PiCalendar } from "react-icons/pi";
import moment from "moment";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CustomToast from "@/utils/CustomToast";
import supabase from "@/lib/supabase-browser";

export function TransactReport({ data }) {
  const [isStudent, setStudent] = useState(false);
  const [isCustomDate, setCustomDate] = useState(false);

  const baseStorageUrl =
    "https://yzppmncmjybezxhcekir.supabase.co/storage/v1/object/public/report_files/";

  const handleAll = async () => {
    if (data) {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const Edata = new Blob([excelBuffer], { type: fileType });

      const file_name = `All-Transaction-Report-${moment().format(
        "YYYY-MM-DD",
      )}`;

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
    }
  };

  const handleToday = async () => {
    if (data) {
      const todayData = Object.values(data).filter(function (a) {
        const dateStart = `${moment().format("YYYY-MM-DD")}T00:00:00`;
        const dateEnd = `${moment().format("YYYY-MM-DD")}T23:59:59`;
        return a.date > dateStart && a.date < dateEnd;
      });

      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const ws = XLSX.utils.json_to_sheet(todayData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const Edata = new Blob([excelBuffer], { type: fileType });

      const file_name = `Transaction-Report-${moment().format("YYYY-MM-DD")}`;

      const { error: UploadError } = await supabase.storage
        .from("report_files")
        .upload(file_name + fileExtension, Edata, {
          cacheControl: "3600",
          upsert: false,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          contentEncoding: "gzip",
          contentDisposition: `'inline; filename="${file_name}.xlsx"`,
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
    }
  };

  const handleWeek = async () => {
    if (data) {
      const weekData = Object.values(data).filter(function (a) {
        const dateStart = `${moment()
          .startOf("week")
          .format("YYYY-MM-DD")} 00:00:00`;
        const dateEnd = `${moment()
          .endOf("week")
          .format("YYYY-MM-DD")} 23:59:59`;
        return a.date > dateStart && a.date < dateEnd;
      });

      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const ws = XLSX.utils.json_to_sheet(weekData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const Edata = new Blob([excelBuffer], { type: fileType });

      const file_name = `Transaction-Report-${moment()
        .startOf("week")
        .format("YYYY-MM-DD")} - ${moment()
        .endOf("week")
        .format("YYYY-MM-DD")}`;

      const { error: UploadError } = await supabase.storage
        .from("report_files")
        .upload(file_name + fileExtension, Edata, {
          cacheControl: "3600",
          upsert: false,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          contentEncoding: "gzip",
          contentDisposition: `'inline; filename="${file_name}.xlsx"`,
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
    }
  };

  const handleMonth = async () => {
    if (data) {
      const monthData = Object.values(data).filter(function (a) {
        const dateStart = `${moment()
          .startOf("month")
          .format("YYYY-MM-DD")} 00:00:00`;
        const dateEnd = `${moment()
          .endOf("month")
          .format("YYYY-MM-DD")} 23:59:59`;
        return a.date > dateStart && a.date < dateEnd;
      });

      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const ws = XLSX.utils.json_to_sheet(monthData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const Edata = new Blob([excelBuffer], { type: fileType });
      const file_name = `Transaction-Report-${moment()
        .startOf("month")
        .format("YYYY-MM-DD")} - ${moment()
        .endOf("month")
        .format("YYYY-MM-DD")}`;

      const { error: UploadError } = await supabase.storage
        .from("report_files")
        .upload(file_name + fileExtension, Edata, {
          cacheControl: "3600",
          upsert: false,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          contentEncoding: "gzip",
          contentDisposition: `'inline; filename="${file_name}.xlsx"`,
        });

      if (UploadError) {
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
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" relative h-[50px] bg-[#5B801A] rounded-sm md:h-[45px] px-2 md:px-4 w-full grow outline-none focus:outline-none">
          <div className="flex justify-center items-center gap-1 md:gap-2 text-[12px] md:text-[17px] lg:text-[15px]">
            Generate Transaction Report
            <IoMdArrowDropdown className="text-[20px] md:text-[25px]" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-45">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleAll}>
            <div className="flex gap-3 mx-3 items-center">
              <TbReportAnalytics size={15} />
              All Transactions
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToday}>
            <div className="flex gap-3 mx-3 items-center">
              <TbReportAnalytics size={15} />
              Today
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleWeek}>
            <div className="flex gap-3 mx-3 items-center">
              <TbReportAnalytics size={15} />
              This Week
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleMonth}>
            <div className="flex gap-3 mx-3 items-center">
              <TbReportAnalytics size={15} />
              This Month
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              className="flex gap-3 mx-3 items-center"
              onClick={() => {
                setStudent(!isStudent);
              }}
            >
              <BsPersonDown size={15} />
              Student
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              className="flex gap-3 mx-3 items-center"
              onClick={() => {
                setCustomDate(!isCustomDate);
              }}
            >
              <PiCalendar size={15} />
              Custom Date
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {isStudent && (
        <StudentReport
          data={data}
          trigger={() => {
            setStudent(!isStudent);
          }}
        />
      )}
      {isCustomDate && (
        <CustomDate
          data={data}
          trigger={() => {
            setCustomDate(!isCustomDate);
          }}
        />
      )}
    </DropdownMenu>
  );
}
