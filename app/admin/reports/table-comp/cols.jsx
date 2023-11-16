"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Buttons";
import RowAct from "./row-act";

export const Cols = [
  {
    accessorKey: "file_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[200px] md:ml-8 sm:-ml-40"
        >
          <span className="text-[12px] md:text-[14px] lg:text-[16px] text-center font-bold">
            Transaction Report
          </span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[80px] sm:w-[300px]">
        <div className="text-[10px] md:text-[14px] text-black text-center w-[150px] sm:w-[300px] font-bold">
          {row.getValue("file_name")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[200px] lg:w-[100px] flex justify-center text-center"
        >
          <span className="text-[12px] md:text-[14px] lg:text-[16px] text-center font-bold">
            Date
          </span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      const date = new Date(data.created_at).toLocaleDateString();

      return (
        <div className="text-[10px] md:text-[14px] text-[#707070] text-center w-[150px] sm:w-[300px]">
          {date}
        </div>
      );
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    header: ({ column }) => {
      return (
        <Button variant="ghost2">
          <span className=" whitespace-nowrap text-[12px] md:text-[14px] lg:text-[16px] -ml-3 font-bold">
            Actions
          </span>
        </Button>
      );
    },
    cell: ({ row }) => {
      return <RowAct row={row} className="flex-auto w-[100px]" />;
    },
  },
];
