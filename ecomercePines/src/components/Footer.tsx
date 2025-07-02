import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo y dirección */}
          <div className="w-full md:w-1/3 text-center md:text-left mb-6">
            <img src="/Logo_V6_LRWH.webp"  alt="Logo de Chibiquiles" loading="lazy" className="mx-auto md:mx-0 w-36 mb-3" />
            <address className="not-italic text-sm space-y-1">
              <p><strong>Dirección:</strong> Cancún, Quintana Roo</p>
              <p><strong>Teléfono:</strong> +998 123 4567</p>
              <p><strong>Correo:</strong> <a href="mailto:Chibiquiles@pedidos.com">Chibiquiles@pedidos.com</a></p>
            </address>

          </div>

          {/* Redes sociales */}
          <div className="w-full md:w-1/3 text-center mb-6">
            <div className="flex justify-center space-x-4">
              <a href="#" aria-label="Síguenos en Facebook" className="text-gray-600 hover:text-orange-400">
                <FaFacebookF className="w-6 h-6" aria-hidden="true"/> 
              </a>
              <a href="#" aria-label="Síguenos en Instagram" className="text-gray-600 hover:text-orange-400">
                <FaInstagram className="w-6 h-6" aria-hidden="true"/>
              </a>
            </div>
          </div>

          {/* Suscripción */}
          <div className="w-full md:w-1/3 text-center md:text-right">
            <p className="text-lg font-semibold">Únete a nuestra comunidad</p>
            <p className="text-sm mt-1">
              Recibe actualizaciones por correo electrónico sobre nuestras últimas novedades y ofertas especiales.
            </p>
            <form className="mt-3 flex flex-col md:flex-row gap-2 items-center justify-end">
              <input
                type="email"
                placeholder="Correo electrónico"
                aria-label="Correo electrónico para suscripción"
                className="px-3 py-2 border rounded w-full md:w-auto"
              />

              <button
                type="submit"
                aria-label="Enviar correo para suscripción"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Suscribirse
              </button>

            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-200 mt-8 pt-4 text-center">
          <p className="text-sm">© 2025 Chibiquiles. Todos los derechos reservados.</p>
          <div className="mt-2">
            <img src="/payment-item.webp" alt="Íconos de métodos de pago aceptados como Visa y PayPal" loading="lazy" className="mx-auto h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}