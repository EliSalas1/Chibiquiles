"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { X, CalendarDays, PartyPopper } from "lucide-react";

type Holiday = {
  date: string;
  localName: string;
};

export default function UpcomingHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [visible, setVisible] = useState(true); // ya no usamos localStorage

  const handleDismiss = () => {
    setVisible(false); // Solo lo oculta durante la sesión actual
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = new Date().getFullYear();
        const res = await axios.get<Holiday[]>(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/MX`
        );

        const today = new Date().toISOString().split("T")[0];
        const upcoming = res.data
          .filter((h) => h.date >= today)
          .slice(0, 3);

        setHolidays(upcoming);
      } catch (err) {
        console.error("Error al obtener los festivos:", err);
      }
    };

    fetchHolidays();
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8 shadow-sm">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-sm text-blue-400 hover:text-blue-600 transition"
        title="Descartar"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center mb-3">
        <CalendarDays className="text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-blue-800">
          Próximos Festivos en México
        </h2>
      </div>

      {holidays.length === 0 ? (
        <p className="text-sm text-gray-600">Cargando eventos próximos...</p>
      ) : (
        <ul className="space-y-2">
          {holidays.map((h) => (
            <li key={h.date} className="flex items-center text-sm">
              <PartyPopper className="w-4 h-4 text-purple-500 mr-2" />
              <span className="text-gray-700 font-medium">{h.localName}</span>
              <span className="ml-auto text-gray-500">
                {new Date(h.date).toLocaleDateString("es-MX", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 text-sm text-blue-600 font-medium">
        🎯 ¡Aprovecha para subir productos especiales o promocionales!
      </div>
    </div>
  );
}
