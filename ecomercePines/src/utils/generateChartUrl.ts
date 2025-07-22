type ChartDataset = {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  fill?: boolean;
};

type ChartData = {
  labels: string[];
  datasets: ChartDataset[];
};

type ChartOptions = {
  responsive?: boolean;
  title?: {
    display: boolean;
    text: string;
  };
  scales?: any;
};

type ChartConfig = {
  type: string;
  data: ChartData;
  options?: ChartOptions;
};

export function generateChartUrl(config: ChartConfig): string {
  const baseUrl = 'https://quickchart.io/chart';
  const encodedConfig = encodeURIComponent(JSON.stringify(config));
  return `${baseUrl}?c=${encodedConfig}`;
}
