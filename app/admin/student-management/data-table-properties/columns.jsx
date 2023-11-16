"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Buttons";
import RowActions from "./row-actions";

export const Columns = [
  {
    accessorKey: "student_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[80px] sm:w-[300px]"
        >
          <span className=" whitespace-nowrap text-[12px] md:text-[14px] lg:text-[16px] text-center font-bold">
            Student Number
          </span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-full">
        <div className="uppercase text-center truncate w-[80px] sm:w-[300px] text-[10px] md:text-[14px] font-bold">
          {row.getValue("student_number")}
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
          className="w-[80px] sm:w-[300px]"
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
      const date = new Date(data.date).toLocaleDateString();

      return (
        <div className="text-center text-[10px] md:text-[14px] w-[80px] sm:w-[300px] text-[#707070] ">
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
        <span className=" whitespace-nowrap text-[12px] md:text-[14px] lg:text-[16px] -ml-3 font-bold">
          Actions
        </span>
      );
    },
    cell: ({ row }) => {
      return <RowActions row={row} className="flex-auto" />;
    },
  },
];
