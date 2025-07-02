import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ProductoExcel {
  ID: number;
  Nombre: string;
  Categoría: string | number;
  Stock: number;
  Precio: string;
}

export function exportProductsToExcel(data: ProductoExcel[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "productos.xlsx");
}
