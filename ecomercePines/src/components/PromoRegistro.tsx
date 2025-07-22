import { Link } from "react-router-dom";

export default function PromoRegistro() {
  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-3 text-center">
      ¿Aún no tienes cuenta?{" "}
      <Link to="/Registro" className="font-semibold text-orange-600 hover:underline">
        ¡Regístrate ahora y obtén ofertas exclusivas!
      </Link>
    </div>
  );
}
