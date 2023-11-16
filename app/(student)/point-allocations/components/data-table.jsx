"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/Buttons";
import { Input } from "@/components/ui/input";
import { BsSliders } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  RowHeader,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import UsePointsModal from "../../dashboard/components/UsePointsModal";
import { MdAddCircle } from "react-icons/md";
import { ExportExcel } from "@/utils/exportExcel";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isAddPoints, setIsAddPoints] = useState(false);

  const nData = JSON.parse(JSON.stringify(data), (key, value) => {
    if (key === "date") {
      return new Date(value).toLocaleDateString();
    }
    return value;
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center pb-4 md:pb-6 md:pt-4 lg:pt-6 gap-2 md:gap-4 justify-between">
        <Input
          placeholder="Filter ID..."
          value={
            /* @type {string} */ table.getColumn("id")?.getFilterValue() ?? ""
          }
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="w-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] placeholder:font-bold placeholder:text-[#707070] h-[45px] rounded-sm md:block hidden"
        />
        <div className="grid grid-cols-1 md:flex items-center gap-3 md:gap-0 w-full md:w-auto">
          <div className="grid-span-1 flex justify-between gap-1 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="gap-2 md:gap-3 px-1 md:px-7 text-[12px] md:text-[14px] md:h-[45px] w-full"
                >
                  <BsSliders className="text-[15px] md:text-[18px]" /> View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize font-bold"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* for mobile */}
            <div className="sm:hidden w-full">
              <Button
                variant="outline2"
                className="gap-1 md:gap-2 px-2 items-center text-[12px] md:text-[14px] text-main hover:text-white hover:bg-main w-full"
                onClick={() => setIsAddPoints((prev) => !prev)}
              >
                <MdAddCircle className="text-[20px] md:text-[24px] hover:text-white" />
                Add Points
              </Button>
            </div>

            <div className="md:block hidden">
              <Button
                variant="outline2"
                className="flex justify-between px-5 gap-2 items-center w-full h-[45px] text-[12px] md:text-[14px] text-main hover:text-white hover:bg-main"
                onClick={() => setIsAddPoints((prev) => !prev)}
              >
                <MdAddCircle className="text-[20px] md:text-[22px] hover:text-white " />
                Add Points
              </Button>
            </div>
            <div className="flex items-center w-full">
              <Button
                variant="outline"
                className="md:h-[45px] px-2 md:px-4 w-full grow"
                onClick={() =>
                  ExportExcel(
                    nData,
                    `My Points Allocation Transactions - ${new Date().toLocaleDateString()}`,
                  )
                }
              >
                <div className="flex justify-center items-center gap-1 md:gap-2 text-[12px] md:text-[14px] ">
                  <BiSolidReport className="text-[16px] md:text-[18px]" />
                  Download Data
                </div>
              </Button>
            </div>
          </div>

          {/* for mobile */}
          <div className="grid grid-span-1">
            <Input
              placeholder="Filter ID..."
              value={
                /* @type {string} */ table.getColumn("id")?.getFilterValue() ??
                ""
              }
              onChange={(event) =>
                table.getColumn("id")?.setFilterValue(event.target.value)
              }
              className="w-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] placeholder:font-bold placeholder:text-[#707070] rounded-sm sm:hidden"
            />
          </div>
        </div>
      </div>
      <div className="border px-3 py-5 md:p-7 shadow-inner">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <RowHeader key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </RowHeader>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center align-middle flex justify-center items-center w-full"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-5">
        <DataTablePagination table={table} />
      </div>
      {isAddPoints && <UsePointsModal />}
    </div>
  );
}
