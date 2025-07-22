"use client";

import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import HeaderAdmi from "../../components/HeaderAdmi";
import { generateChartUrl } from "../../utils/generateChartUrl";
import { generateAnalyticsPDFFromImage } from "../../utils/generatePDF";
// import { generateAnalyticsPDF } from "../../utils/generatePDF";
import { fetchQuickChartImage } from "../../utils/fetchQuickChartImage";
type AnalyticsData = {
  ventasPorMes: { mes: string; ventas: number; pedidos: number }[];
  nuevosClientes: number[];
  clientesRecurrentes: number[];
  ingresosTotales: number;
  pedidosProcesados: number;
  tasaRetencion: string;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/analytics`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const BarChart = ({ color1, color2 }: { color1: string; color2: string }) => (
    <div className="flex items-end justify-center space-x-2 h-16">
      <div className={`w-8 h-8 ${color1} rounded-sm`}></div>
      <div className={`w-8 h-12 ${color2} rounded-sm`}></div>
    </div>
  );

  const LineMetric = () => (
    <div className="relative h-16 w-full">
      <svg className="w-full h-full" viewBox="0 0 200 60">
        <polyline fill="none" stroke="#8b5cf6" strokeWidth="2" points="20,40 60,35 100,30 140,35 180,30" />
        {[20, 60, 100, 140, 180].map((cx, i) => (
          <circle key={i} cx={cx} cy={i % 2 === 0 ? 40 : 35} r="3" fill="#8b5cf6" />
        ))}
      </svg>
    </div>
  );

  const LineChart = () => {
    if (!data) return <div className="text-gray-500 text-sm">Cargando gráfico...</div>;

    const maxValue = Math.max(...data.ventasPorMes.map(d => d.ventas), 1);
    const scale = (val: number) => 160 - (val / maxValue) * 150;

    const puntosVentas = data.ventasPorMes.map((d, i) => `${60 + i * 40},${scale(d.ventas)}`).join(" ");
    const puntosPedidos = data.ventasPorMes.map((d, i) => `${60 + i * 40},${scale(d.pedidos)}`).join(" ");

    return (
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <defs>
          <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <polyline fill="none" stroke="#8b5cf6" strokeWidth="2" points={puntosVentas} />
        <polyline fill="none" stroke="#14b8a6" strokeWidth="2" points={puntosPedidos} />
        {data.ventasPorMes.map((d, i) => (
          <text key={i} x={50 + i * 40} y={190} className="text-xs fill-gray-500">{d.mes}</text>
        ))}
      </svg>
    );
  };

  const AreaChart = () => {
    if (!data) return <div className="text-gray-500 text-sm">Cargando gráfico...</div>;

    const nuevos = data.nuevosClientes;
    const recurrentes = data.clientesRecurrentes;
    const maxVal = Math.max(...nuevos, ...recurrentes, 1);
    const scale = (val: number) => 160 - (val / maxVal) * 150;

    const pathNuevos = nuevos.map((v, i) => `${60 + i * 40},${scale(v)}`).join(" ");
    const pathRecurrentes = recurrentes.map((v, i) => `${60 + i * 40},${scale(v)}`).join(" ");

    return (
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <defs>
          <pattern id="grid2" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />
        <path d={`M ${pathNuevos} L 260,160 L 60,160 Z`} fill="#c4b5fd" fillOpacity="0.7" />
        <path d={`M ${pathRecurrentes} L 260,160 L 60,160 Z`} fill="#86efac" fillOpacity="0.7" />
        {nuevos.map((_, i) => (
          <text key={i} x={50 + i * 40} y={190} className="text-xs fill-gray-500">
            {data.ventasPorMes[i]?.mes || ""}
          </text>
        ))}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-white flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <HeaderAdmi />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ventas Mensuales</h1>
            <p className="text-gray-600 mb-4">Análisis del rendimiento económico en Chibiquiles</p>

            {data && (
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Resumen Visual</h2>
                  <img
                    src={generateChartUrl({
                      type: "bar",
                      data: {
                        labels: data.ventasPorMes.map(v => v.mes),
                        datasets: [
                          {
                            label: "Ventas ($)",
                            data: data.ventasPorMes.map(v => v.ventas),
                            backgroundColor: "rgba(75,192,192,0.6)"
                          },
                          {
                            label: "Pedidos",
                            data: data.ventasPorMes.map(v => v.pedidos),
                            backgroundColor: "rgba(153,102,255,0.6)"
                          }
                        ]
                      },
                      options: {
                        responsive: true,
                        title: {
                          display: true,
                          text: "Ventas y Pedidos por Mes"
                        }
                      }
                    })}
                    alt="Gráfico generado por QuickChart"
                    className="w-full max-w-2xl mx-auto rounded shadow border"
                  />
                </div>
                <div className="text-center">
                  <button
  onClick={async () => {
    if (!data) return;

    // Gráfico de barras (ventas y pedidos)
    const chart1Config = {
      type: "bar",
      data: {
        labels: data.ventasPorMes.map(v => v.mes),
        datasets: [
          {
            label: "Ventas ($)",
            data: data.ventasPorMes.map(v => v.ventas),
            backgroundColor: "#f7e654f3"
          },
          {
            label: "Pedidos",
            data: data.ventasPorMes.map(v => v.pedidos),
            
            backgroundColor: "#0033c0ff"
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Ventas y Pedidos por Mes"
          }
        }
      }
    };

    // Gráfico de líneas (nuevos vs recurrentes)
    const chart2Config = {
      type: "line",
      data: {
        labels: data.ventasPorMes.map(v => v.mes),
        datasets: [
          {
            label: "Nuevos Clientes",
            data: data.nuevosClientes,
            borderColor: "#8b5cf6",
            fill: false
          },
          {
            label: "Clientes Recurrentes",
            data: data.clientesRecurrentes,
            borderColor: "#22c55e",
            fill: false
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Clientes Nuevos vs Recurrentes"
          }
        }
      }
    };

    // Obtener imágenes desde QuickChart
    const chart1Base64 = await fetchQuickChartImage(chart1Config);
    const chart2Base64 = await fetchQuickChartImage(chart2Config);

    // Generar PDF
    await generateAnalyticsPDFFromImage(
      chart1Base64,
      chart2Base64,
      data.ingresosTotales,
      data.pedidosProcesados,
      data.tasaRetencion
    );
  }}
className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:brightness-110 hover:scale-105 transition-transform duration-200"
>
  📄 Generar Reporte PDF
</button>


                </div>
              </div>
            )}
          </div>

          {/* Secciones de gráficas y métricas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Análisis de ventas de los últimos 6 meses</h3>
              <LineChart />
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Adquisición de Clientes</h3>
              <p className="text-sm text-gray-600 mb-4">Nuevos vs. recurrentes</p>
              <AreaChart />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Ingresos Totales</h3>
              <p className="text-sm text-gray-600 mb-4">Comparación con el mes anterior</p>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {data ? `$${data.ingresosTotales.toFixed(2)}` : "Cargando..."}
              </div>
              <BarChart color1="bg-purple-400" color2="bg-purple-600" />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Pedidos Procesados</h3>
              <p className="text-sm text-gray-600 mb-4">Comparación con el mes anterior</p>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {data ? data.pedidosProcesados : "Cargando..."}
              </div>
              <BarChart color1="bg-green-400" color2="bg-green-600" />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Tasa de Retención</h3>
              <p className="text-sm text-gray-600 mb-4">Porcentaje de clientes que regresan</p>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {data ? `${data.tasaRetencion}%` : "Cargando..."}
              </div>
              <LineMetric />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
