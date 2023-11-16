"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Buttons";
import RowActions from "./row-actions";

export const Columns = [
  {
    accessorKey: "subject_code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[150px] sm:w-[300px]"
        >
          <span className=" text-[12px] md:text-[14px] lg:text-[16px] font-bold">
            Subject Code
          </span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[150px] sm:w-[300px] text-center">
        <div className=" text-[10px] md:text-[14px] font-bold">
          {row.getValue("subject_code")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "subject_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[150px] sm:w-[300px]"
        >
          <span className=" text-[12px] md:text-[14px] lg:text-[16px]2 font-bold">
            Subject Name
          </span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[150px] sm:w-[300px] text-center">
        <div className=" text-[10px] md:text-[14px] font-medium">
          {row.getValue("subject_name")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "subject_instructor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[150px] sm:w-[300px]"
        >
          <span className=" text-[12px] md:text-[14px] lg:text-[16px] font-bold">
            Teacher
          </span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[150px] sm:w-[300px] text-center">
        <div className=" text-[10px] md:text-[14px] font-medium">
          {row.getValue("subject_instructor")}
        </div>
      </div>
    ),
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
