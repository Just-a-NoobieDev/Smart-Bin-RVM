import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

export const ExportExcel = async (data, fileName) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const Edata = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(Edata, fileName + fileExtension);
};
