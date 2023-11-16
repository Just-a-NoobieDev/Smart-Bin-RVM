import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import { Button } from "@/components/ui/Buttons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataTablePagination({ table }) {
  return (
    <div className="flex items-center justify-end px-2 z-10">
      <div className="flex items-center space-x-6 lg:space-x-8 font-bold">
        <div className="flex items-center md:space-x-2 md:mr-9">
          <p className=" text-[12px] md:text-sm mr-2 md:mr-0 ">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="text-[12px]">
              {[10, 20, 30, 40, 50, 70].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[60px] whitespace-nowrap items-center justify-center text-[12px] md:text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center md:space-x-2">
          <Button
            variant="outline2"
            className="hidden md:flex h-8 w-8 p-0 lg:flex shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] z-10"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <MdKeyboardDoubleArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline2"
            className="h-8 w-8 p-0 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <MdKeyboardArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline2"
            className="h-8 w-8 p-0 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <MdKeyboardArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline2"
            className="hidden md:flex h-8 w-8 p-0 lg:flex shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <MdKeyboardDoubleArrowRight className="h-4 w-4 text-center" />
          </Button>
        </div>
      </div>
    </div>
  );
}
