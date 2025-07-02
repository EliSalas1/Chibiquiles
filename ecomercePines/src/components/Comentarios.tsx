import { useState } from "react";
import { agregarOpinion } from "../services/api"; // Ajusta la ruta según tu proyecto
import { UserAuth } from "../context/AuthContext";

type Comentario = {
  id: number;
  cliente_id: string;
  producto_id: number;
  calificacion: number;
  comentario: string;
};

type Props = {
  productoId: number;
  opiniones: Comentario[];
  onOpinionAdded?: () => void; // opcional, para refrescar desde el padre
};

export default function Comentarios({ productoId, opiniones, onOpinionAdded }: Props) {
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [enviando, setEnviando] = useState(false);
  const { user } = UserAuth();
  const handleEnviar = async () => {
    if (!comentario.trim()) {
      alert("Por favor escribe un comentario.");
      return;
    }

    setEnviando(true);
    try {
      await agregarOpinion(productoId, calificacion, comentario, user.id);
      alert("¡Comentario enviado!");
      setComentario("");
      setCalificacion(5);
      if (onOpinionAdded) onOpinionAdded();
    } catch (err) {
      console.error(err);
      alert("Error al enviar el comentario.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <h4 className="text-xl font-semibold text-[#14213D] mb-4">Comentarios</h4>

      {/* Lista de comentarios */}
      {opiniones.length > 0 ? (
        <ul className="space-y-4 mb-6">
          {opiniones.map((r) => (
            <li key={r.id} className="bg-white p-4 rounded-md shadow">
              <div className="text-sm text-gray-600 mb-1">
                Calificación: {r.calificacion} / 5
              </div>
              <p className="text-[#0A0908]">{r.comentario}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mb-6">Sé el primero en dejar una opinión.</p>
      )}

      {/* Formulario */}
      <div className="bg-white p-4 rounded-md shadow space-y-4">
        <div>
          <label className="block mb-1 font-medium text-[#0A0908]">Calificación</label>
          <select
            value={calificacion}
            onChange={(e) => setCalificacion(Number(e.target.value))}
            className="border rounded p-2 w-full"
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>{num} estrellas</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#0A0908]">Comentario</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={3}
            className="w-full border rounded p-2"
            placeholder="Escribe tu opinión aquí..."
          />
        </div>

        <button
          onClick={handleEnviar}
          disabled={enviando}
          className="bg-[#FCA311] hover:bg-[#e6950e] text-white font-semibold px-6 py-2 rounded-md transition-all"
        >
          {enviando ? "Enviando..." : "Enviar comentario"}
        </button>
      </div>
    </div>
  );
}
