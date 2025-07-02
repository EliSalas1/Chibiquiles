"use client";
//ya
import SideBar from "../../components/SideBar";
import HeaderAdmi from "../../components/HeaderAdmi";

export default function AnalyticsPage() {
  const LineChart = () => (
    <div className="relative h-64 w-full">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <defs>
          <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <text x="10" y="20" className="text-xs fill-gray-500">1000</text>
        <text x="20" y="40" className="text-xs fill-gray-500">750</text>
        <text x="30" y="60" className="text-xs fill-gray-500">500</text>
        <text x="30" y="80" className="text-xs fill-gray-500">250</text>
        <text x="40" y="100" className="text-xs fill-gray-500">0</text>

        <polyline fill="none" stroke="#8b5cf6" strokeWidth="2" points="60,120 100,140 140,80 180,60 220,100 260,40" />
        <polyline fill="none" stroke="#14b8a6" strokeWidth="2" points="60,160 100,160 140,160 180,160 220,160 260,160" />

        <circle cx="60" cy="120" r="3" fill="#8b5cf6" />
        <circle cx="100" cy="140" r="3" fill="#8b5cf6" />
        <circle cx="140" cy="80" r="3" fill="#8b5cf6" />
        <circle cx="180" cy="60" r="3" fill="#8b5cf6" />
        <circle cx="220" cy="100" r="3" fill="#8b5cf6" />
        <circle cx="260" cy="40" r="3" fill="#8b5cf6" />

        <circle cx="60" cy="160" r="3" fill="#14b8a6" />
        <circle cx="100" cy="160" r="3" fill="#14b8a6" />
        <circle cx="140" cy="160" r="3" fill="#14b8a6" />
        <circle cx="180" cy="160" r="3" fill="#14b8a6" />
        <circle cx="220" cy="160" r="3" fill="#14b8a6" />
        <circle cx="260" cy="160" r="3" fill="#14b8a6" />

        <text x="50" y="190" className="text-xs fill-gray-500">Enero</text>
        <text x="90" y="190" className="text-xs fill-gray-500">Febrero</text>
        <text x="130" y="190" className="text-xs fill-gray-500">Marzo</text>
        <text x="170" y="190" className="text-xs fill-gray-500">Abril</text>
        <text x="210" y="190" className="text-xs fill-gray-500">Mayo</text>
        <text x="250" y="190" className="text-xs fill-gray-500">Junio</text>
      </svg>
    </div>
  );

  const AreaChart = () => (
    <div className="relative h-64 w-full">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <defs>
          <pattern id="grid2" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />

        <text x="10" y="20" className="text-xs fill-gray-500">12</text>
        <text x="10" y="40" className="text-xs fill-gray-500">9</text>
        <text x="10" y="60" className="text-xs fill-gray-500">6</text>
        <text x="10" y="80" className="text-xs fill-gray-500">3</text>
        <text x="10" y="100" className="text-xs fill-gray-500">0</text>

        <path d="M 60,140 L 100,130 L 140,120 L 180,110 L 220,100 L 260,90 L 260,160 L 60,160 Z" fill="#86efac" fillOpacity="0.7" />
        <path d="M 60,100 L 100,90 L 140,80 L 180,70 L 220,60 L 260,50 L 260,90 L 220,100 L 180,110 L 140,120 L 100,130 L 60,140 Z" fill="#c4b5fd" fillOpacity="0.7" />

        <text x="50" y="190" className="text-xs fill-gray-500">Enero</text>
        <text x="90" y="190" className="text-xs fill-gray-500">Febrero</text>
        <text x="130" y="190" className="text-xs fill-gray-500">Marzo</text>
        <text x="170" y="190" className="text-xs fill-gray-500">Abril</text>
        <text x="210" y="190" className="text-xs fill-gray-500">Mayo</text>
        <text x="250" y="190" className="text-xs fill-gray-500">Junio</text>
      </svg>
    </div>
  );

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
        <circle cx="20" cy="40" r="3" fill="#8b5cf6" />
        <circle cx="60" cy="35" r="3" fill="#8b5cf6" />
        <circle cx="100" cy="30" r="3" fill="#8b5cf6" />
        <circle cx="140" cy="35" r="3" fill="#8b5cf6" />
        <circle cx="180" cy="30" r="3" fill="#8b5cf6" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <HeaderAdmi />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ventas Mensuales</h1>
            <p className="text-gray-600">Análisis del rendimiento económico en Chibiquiles</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Análisis de ventas de los últimos 6 meses</h3>
              <LineChart />
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Ventas ($)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Pedidos</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Adquisición de Clientes</h3>
              <p className="text-sm text-gray-600 mb-4">Nuevos vs. recurrentes</p>
              <AreaChart />
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Nuevos Clientes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Clientes Recurrentes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Ingresos Totales</h3>
              <p className="text-sm text-gray-600 mb-4">Comparación con el mes anterior</p>
              <div className="text-3xl font-bold text-gray-900 mb-2">$12,345.67</div>
              <div className="text-sm text-green-600 mb-4">+12.5% desde el mes pasado</div>
              <BarChart color1="bg-purple-400" color2="bg-purple-600" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Mayo</span>
                <span>Junio</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Pedidos Procesados</h3>
              <p className="text-sm text-gray-600 mb-4">Comparación con el mes anterior</p>
              <div className="text-3xl font-bold text-gray-900 mb-2">57</div>
              <div className="text-sm text-green-600 mb-4">+8.2% desde el mes pasado</div>
              <BarChart color1="bg-green-400" color2="bg-green-600" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Mayo</span>
                <span>Junio</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Tasa de Retención</h3>
              <p className="text-sm text-gray-600 mb-4">Porcentaje de clientes que regresan</p>
              <div className="text-3xl font-bold text-gray-900 mb-2">68%</div>
              <div className="text-sm text-green-600 mb-4">+5.2% desde el mes pasado</div>
              <LineMetric />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Mayo</span>
                <span>Junio</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

//conexión con SQL
//"use client";

// import { useEffect, useState } from "react";
// import SideBar from "../../components/SideBar";
// import HeaderAdmi from "../../components/HeaderAdmi";

// type AnalyticsData = {
//   ventasPorMes: { mes: string; ventas: number; pedidos: number }[];
//   nuevosClientes: number[];
//   clientesRecurrentes: number[];
//   ingresosTotales: number;
//   pedidosProcesados: number;
//   tasaRetencion: string;
// };

// export default function AnalyticsPage() {
//   const [data, setData] = useState<AnalyticsData | null>(null);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics`)
//       .then((res) => res.json())
//       .then((json) => setData(json))
//       .catch((err) => console.error(err));
//   }, []);

//   const BarChart = ({ color1, color2 }: { color1: string; color2: string }) => (
//     <div className="flex items-end justify-center space-x-2 h-16">
//       <div className={`w-8 h-8 ${color1} rounded-sm`}></div>
//       <div className={`w-8 h-12 ${color2} rounded-sm`}></div>
//     </div>
//   );

//   const LineMetric = () => (
//     <div className="relative h-16 w-full">
//       <svg className="w-full h-full" viewBox="0 0 200 60">
//         <polyline
//           fill="none"
//           stroke="#8b5cf6"
//           strokeWidth="2"
//           points="20,40 60,35 100,30 140,35 180,30"
//         />
//         <circle cx="20" cy="40" r="3" fill="#8b5cf6" />
//         <circle cx="60" cy="35" r="3" fill="#8b5cf6" />
//         <circle cx="100" cy="30" r="3" fill="#8b5cf6" />
//         <circle cx="140" cy="35" r="3" fill="#8b5cf6" />
//         <circle cx="180" cy="30" r="3" fill="#8b5cf6" />
//       </svg>
//     </div>
//   );

//   const LineChart = () => {
//     if (!data) {
//       return <div className="text-gray-500 text-sm">Cargando gráfico...</div>;
//     }

//     const maxValue = Math.max(...data.ventasPorMes.map((d) => d.ventas), 1);
//     const scale = (val: number) => 160 - (val / maxValue) * 150;

//     const puntosVentas = data.ventasPorMes
//       .map((d, i) => `${60 + i * 40},${scale(d.ventas)}`)
//       .join(" ");

//     const puntosPedidos = data.ventasPorMes
//       .map((d, i) => `${60 + i * 40},${scale(d.pedidos)}`)
//       .join(" ");

//     return (
//       <svg className="w-full h-full" viewBox="0 0 400 200">
//         <defs>
//           <pattern
//             id="grid"
//             width="40"
//             height="20"
//             patternUnits="userSpaceOnUse"
//           >
//             <path
//               d="M 40 0 L 0 0 0 20"
//               fill="none"
//               stroke="#e5e7eb"
//               strokeWidth="1"
//             />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />

//         <polyline
//           fill="none"
//           stroke="#8b5cf6"
//           strokeWidth="2"
//           points={puntosVentas}
//         />
//         <polyline
//           fill="none"
//           stroke="#14b8a6"
//           strokeWidth="2"
//           points={puntosPedidos}
//         />

//         {data.ventasPorMes.map((d, i) => (
//           <text
//             key={i}
//             x={50 + i * 40}
//             y={190}
//             className="text-xs fill-gray-500"
//           >
//             {d.mes}
//           </text>
//         ))}
//       </svg>
//     );
//   };

//   const AreaChart = () => {
//     if (!data) {
//       return <div className="text-gray-500 text-sm">Cargando gráfico...</div>;
//     }

//     const nuevos = data.nuevosClientes;
//     const recurrentes = data.clientesRecurrentes;
//     const maxVal = Math.max(...nuevos, ...recurrentes, 1);

//     const scale = (val: number) => 160 - (val / maxVal) * 150;

//     const pathNuevos = nuevos
//       .map((v, i) => `${60 + i * 40},${scale(v)}`)
//       .join(" ");
//     const pathRecurrentes = recurrentes
//       .map((v, i) => `${60 + i * 40},${scale(v)}`)
//       .join(" ");

//     return (
//       <svg className="w-full h-full" viewBox="0 0 400 200">
//         <defs>
//           <pattern
//             id="grid2"
//             width="40"
//             height="20"
//             patternUnits="userSpaceOnUse"
//           >
//             <path
//               d="M 40 0 L 0 0 0 20"
//               fill="none"
//               stroke="#e5e7eb"
//               strokeWidth="1"
//             />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid2)" />

//         <path
//           d={`M ${pathNuevos} L 260,160 L 60,160 Z`}
//           fill="#c4b5fd"
//           fillOpacity="0.7"
//         />

//         <path
//           d={`M ${pathRecurrentes} L 260,160 L 60,160 Z`}
//           fill="#86efac"
//           fillOpacity="0.7"
//         />

//         {nuevos.map((_, i) => (
//           <text
//             key={i}
//             x={50 + i * 40}
//             y={190}
//             className="text-xs fill-gray-500"
//           >
//             {data.ventasPorMes[i]?.mes || ""}
//           </text>
//         ))}
//       </svg>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white flex">
//       <SideBar />
//       <div className="flex-1 flex flex-col">
//         <HeaderAdmi />
//         <main className="flex-1 p-6">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Ventas Mensuales
//             </h1>
//             <p className="text-gray-600">
//               Análisis del rendimiento económico en Chibiquiles
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Análisis de ventas de los últimos 6 meses
//               </h3>
//               <LineChart />
//               <div className="flex justify-center space-x-6 mt-4">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
//                   <span className="text-sm text-gray-600">Ventas ($)</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
//                   <span className="text-sm text-gray-600">Pedidos</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Adquisición de Clientes
//               </h3>
//               <p className="text-sm text-gray-600 mb-4">
//                 Nuevos vs. recurrentes
//               </p>
//               <AreaChart />
//               <div className="flex justify-center space-x-6 mt-4">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
//                   <span className="text-sm text-gray-600">Nuevos Clientes</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 bg-green-300 rounded-full"></div>
//                   <span className="text-sm text-gray-600">
//                     Clientes Recurrentes
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                 Ingresos Totales
//               </h3>
//               <p className="text-sm text-gray-600 mb-4">
//                 Comparación con el mes anterior
//               </p>
//               <div className="text-3xl font-bold text-gray-900 mb-2">
//                 {data
//                   ? `$${data.ingresosTotales.toFixed(2)}`
//                   : "Cargando..."}
//               </div>
//               <div className="text-sm text-green-600 mb-4">
//                 +12.5% desde el mes pasado
//               </div>
//               <BarChart color1="bg-purple-400" color2="bg-purple-600" />
//               <div className="flex justify-between text-xs text-gray-500 mt-2">
//                 <span>Mayo</span>
//                 <span>Junio</span>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                 Pedidos Procesados
//               </h3>
//               <p className="text-sm text-gray-600 mb-4">
//                 Comparación con el mes anterior
//               </p>
//               <div className="text-3xl font-bold text-gray-900 mb-2">
//                 {data ? data.pedidosProcesados : "Cargando..."}
//               </div>
//               <div className="text-sm text-green-600 mb-4">
//                 +8.2% desde el mes pasado
//               </div>
//               <BarChart color1="bg-green-400" color2="bg-green-600" />
//               <div className="flex justify-between text-xs text-gray-500 mt-2">
//                 <span>Mayo</span>
//                 <span>Junio</span>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                 Tasa de Retención
//               </h3>
//               <p className="text-sm text-gray-600 mb-4">
//                 Porcentaje de clientes que regresan
//               </p>
//               <div className="text-3xl font-bold text-gray-900 mb-2">
//                 {data ? `${data.tasaRetencion}%` : "Cargando..."}
//               </div>
//               <div className="text-sm text-green-600 mb-4">
//                 +5.2% desde el mes pasado
//               </div>
//               <LineMetric />
//               <div className="flex justify-between text-xs text-gray-500 mt-2">
//                 <span>Mayo</span>
//                 <span>Junio</span>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
