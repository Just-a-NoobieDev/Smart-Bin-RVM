"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Buttons";
import RowActions from "./row-actions";

export const Columns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className=" whitespace-nowrap text-[12px] md:text-[14px] lg:text-[16px] md:ml-5 -ml-2 font-bold">
            Point Allocation ID
          </span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-full">
        <div className="uppercase md:ml-8 truncate w-[110px] md:w-[150px] ml-0 text-[10px] md:text-[14px] font-bold">
          {row.getValue("id")}
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
        >
          <span className="text-[12px] md:text-[14px] lg:text-[16px] md:-ml-2 -ml-2 font-bold">
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
        <div className="text-[10px] md:text-[14px] text-[#707070] ">{date}</div>
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
