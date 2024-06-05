"use client";

import React, { useState, useEffect } from "react";
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
import { ImQrcode } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";

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
import { Html5QrcodeScanner } from "html5-qrcode";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [showQRmodal, setShowQRmodal] = useState(false);

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

  const qrcodeRegionId = "html5qr-code-full-region";

  // Creates the configuration object for Html5QrcodeScanner.
  const createConfig = (props) => {
    let config = {};
    if (props.fps) {
      config.fps = props.fps;
    }
    if (props.qrbox) {
      config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
      config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
      config.disableFlip = props.disableFlip;
    }
    return config;
  };

  const Html5QrcodePlugin = (props) => {
    useEffect(() => {
      // when component mounts
      const config = createConfig(props);
      const verbose = props.verbose === true;
      // Suceess callback is required.

      const html5QrcodeScanner = new Html5QrcodeScanner(
        qrcodeRegionId,
        config,
        verbose
      );

      const handleSuccess = (decodedText) => {
        table.getColumn("id")?.setFilterValue(decodedText);
        setShowQRmodal(false);
      };

      html5QrcodeScanner.render(handleSuccess, props.qrCodeErrorCallback);

      // cleanup function when component will unmount
      return () => {
        html5QrcodeScanner.clear().catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      };
    }, []);

    const handleCloseQrReader = () => {
      setShowQRmodal(false);
    };

    return (
      <div className="bg-white p-5 rounded-md relative">
        <button
          onClick={handleCloseQrReader}
          className="absolute top-5 right-5 mb-10"
        >
          <RxCross2 className="text-main text-[38px]" />
        </button>
        <div className="mt-10">
          <div id={qrcodeRegionId} />
        </div>

        <p className="font-semibold text-main mt-10 text-[18px]">
          Show the QR code in front of the scanner and wait for a couple of
          seconds...
        </p>
      </div>
    );
  };

  const handleShowQrReader = () => {
    setShowQRmodal(true);
  };

  const QRModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Html5QrcodePlugin fps={10} qrbox={250} disableFlip={false} />
      </div>
    );
  };

  return (
    <>
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
          <Button
            className="px-5 bg-main flex justify-between gap-2"
            onClick={handleShowQrReader}
          >
            <span className="text-[12px] md:text-[14px]">Scan</span>
            <ImQrcode />
          </Button>
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
                        {column.id == "id" ? "Transaction Id" : column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
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
      {showQRmodal && <QRModal />}
    </>
  );
}
