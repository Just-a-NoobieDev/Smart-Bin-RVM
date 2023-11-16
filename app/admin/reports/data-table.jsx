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

import { Input } from "@/components/ui/input";
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
import { TransactReport } from "./components2/Transact-reports";
import { AllocationReport } from "./components2/Allocation-reports";

export function DataTable({ columns, data, tData, pData }) {
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

  return (
    <div>
      <div className="md:grid md:grid-cols-1 lg:py-6 lg:grid-cols-4 lg:gap-5">
        <div className="hidden lg:block col-span-1">
          <Input
            placeholder="Filter Report.."
            value={
              /* @type {string} */ table

                .getColumn("file_name")

                ?.getFilterValue() ?? ""
            }
            onChange={(event) =>
              table.getColumn("file_name")?.setFilterValue(event.target.value)
            }
            className="w-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] placeholder:font-bold placeholder:text-[#707070] h-[45px] rounded-sm"
          />
        </div>
        <div className="grid grid-cols-2 w-full col-span-3 gap-1 items-center">
          <div className="flex items-center">
            <TransactReport data={tData} />
          </div>
          <div className="flex items-center">
            <AllocationReport data={pData} />
          </div>
        </div>
        <div className="py-1 lg:hidden">
          <Input
            placeholder="Filter Report.."
            value={
              /* @type {string} */ table

                .getColumn("file_name")

                ?.getFilterValue() ?? ""
            }
            onChange={(event) =>
              table.getColumn("file_name")?.setFilterValue(event.target.value)
            }
            className="w-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] placeholder:font-bold placeholder:text-[#707070] h-[45px] rounded-sm my-5"
          />
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
                          header.getContext()
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
                        cell.getContext()
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
