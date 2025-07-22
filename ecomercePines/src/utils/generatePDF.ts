import jsPDF from "jspdf";

export async function generateAnalyticsPDFFromImage(
  chart1Base64: string,
  chart2Base64: string,
  ingresos: number,
  pedidos: number,
  retencion: string
) {
  const doc = new jsPDF();

  // Título principal
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Reporte de Análisis Chibiquiles", 20, 20);

  // Métricas (sin emojis)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Ingresos Totales: $${ingresos.toFixed(2)}`, 20, 40);
  doc.text(`Pedidos Procesados: ${pedidos}`, 20, 50);
  doc.text(`Tasa de Retención: ${retencion}%`, 20, 60);

  // Gráfico 1
  doc.setFont("helvetica", "bold");
  doc.text("1. Ventas y Pedidos por Mes:", 20, 80);
  doc.addImage(chart1Base64, "PNG", 20, 90, 170, 80);

  // Gráfico 2
  doc.text("2. Nuevos vs Clientes Recurrentes:", 20, 180);
  doc.addImage(chart2Base64, "PNG", 20, 190, 170, 80);

  doc.save("reporte-analisis.pdf");
}
