"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Buttons";
import RowActions from "./row-actions";

export const Columns = [
  {
    accessorKey: "admin_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-[150px] sm:w-[300px]"
        >
          <span className=" whitespace-nowrap text-[12px] md:text-[14px] lg:text-[16px] font-bold">
            Admin ID
          </span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-full">
        <div className="uppercase text-center truncate md:ml-2 w-[150px] sm:w-[300px] text-[10px] md:text-[14px] font-bold">
          {row.getValue("admin_id")}
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
          className="w-[150px] sm:w-[300px]"
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
        <div className="text-[10px] md:text-[14px] text-[#707070] text-center w-[150px] sm:w-[300px] ">
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
