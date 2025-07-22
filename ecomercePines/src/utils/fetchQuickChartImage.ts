// src/utils/fetchQuickChartImage.ts
export async function fetchQuickChartImage(chartConfig: any): Promise<string> {
  const response = await fetch("https://quickchart.io/chart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chart: chartConfig })
  });

  const blob = await response.blob();

  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
