import ProductosLlaveros from "../components/ProductosLlaveros";
import SliderCardLlaveros from "../components/SliderCardLlaveros";

export default function LlaverosPage() {
  return (
    <>
      {/* Banner */}
      <section>
        <div className="flex flex-col items-center justify-center text-center bg-gray-800 text-white px-6 py-10 rounded">
          <p className="font-quicksand text-2xl font-extrabold">Llaveros</p>
          <p className="font-quicksand text-sm text-gray-300">
            Home → Categorías / Llaveros
          </p>
        </div>
      </section>

      {/* Contenedor slider */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Título centrado */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-center w-fit mx-auto">
            Destacados
          </h2>
          <div className="w-48 h-1 bg-orange-400 mx-auto mt-2 rounded"></div>
        </div>

        {/* Slider centrado y limpio */}
        <div className="w-full">
          <SliderCardLlaveros />
        </div>
      </div>

      <ProductosLlaveros />

      {/* productos */}
      
      {/* fin */}
    </>
  );
}
