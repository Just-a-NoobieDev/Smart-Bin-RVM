"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
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
import { ExportExcel } from "@/utils/exportExcel";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

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

  const nData = JSON.parse(JSON.stringify(data), (key, value) => {
    if (key === "date") {
      return new Date(value).toLocaleDateString();
    }
    return value;
  });

  return (
    <div>
      <div className="flex items-center pb-6 md:pt-4 lg:pt-6 gap-2 md:gap-4 justify-between">
        <Input
          placeholder="Filter ID..."
          value={
            /* @type {string} */ table.getColumn("id")?.getFilterValue() ?? ""
          }
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="w-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] placeholder:font-bold placeholder:text-[#707070] h-[45px] rounded-sm"
        />
        <div className=" flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="ml-auto flex justify-between gap-3 md:px-7 text-[12px] md:text-[14px] h-[45px]"
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
          <div className="col-span-1 flex justify-end">
            <div className="flex items-center md:w-auto">
              <Button
                variant="outline"
                className="h-[45px]"
                onClick={() =>
                  ExportExcel(
                    nData,
                    `My Transactions - ${new Date().toLocaleDateString()}`,
                  )
                }
              >
                <div className="flex justify-center items-center mr-2 text-[12px] md:text-[14px] ">
                  <BiSolidReport className=" mr-1 md:mr-2 text-[16px] md:text-[18px]" />
                  Download Data
                </div>
              </Button>
            </div>
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
    </div>
  );
}
