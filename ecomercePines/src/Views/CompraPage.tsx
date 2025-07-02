const CheckoutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="bg-[#F6F6F6] py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#14213D] mb-2">Checkout</h2>
          <div className="text-sm text-[#0A0908] space-x-2">
            <a href="/" className="hover:text-[#FCA311] transition">Carrito</a>
            <span>/</span>
            <span className="text-[#FCA311] font-semibold">Checkout</span>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="mb-6 bg-[#FFF5E5] border-l-4 border-[#FCA311] p-4 text-[#0A0908] text-sm">
            <span className="font-medium">¿Tienes un cupón?</span>
            <a href="/Carrito" className="underline ml-1 text-[#FCA311]">Haz clic aquí</a> para ingresar tu código
          </div>

          <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Billing Info */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold text-[#14213D]">Detalles de Facturación</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">Nombre *</label>
                  <input type="text" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">Apellido *</label>
                  <input type="text" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#0A0908]">País *</label>
                <input type="text" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#0A0908]">Dirección *</label>
                <input type="text" placeholder="Calle, número" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5] mb-2" />
                <input type="text" placeholder="Departamento, suite (opcional)" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">Ciudad *</label>
                  <input type="text" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">Estado *</label>
                  <input type="text" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">Código Postal *</label>
                  <input type="text" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">Teléfono *</label>
                  <input type="text" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">Correo Electrónico *</label>
                  <input type="email" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="create-account" className="accent-[#FCA311]" />
                <label htmlFor="create-account" className="text-[#0A0908]">¿Crear una cuenta?</label>
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#0A0908]">Contraseña de la cuenta *</label>
                <input type="password" className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="diff-address" className="accent-[#FCA311]" />
                <label htmlFor="diff-address" className="text-[#0A0908]">¿Enviar a una dirección diferente?</label>
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#0A0908]">Notas del pedido</label>
                <input type="text" placeholder="Ej: indicaciones de entrega..." className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]" />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#F6F6F6] p-6 rounded-xl shadow-md max-w-sm w-full self-start">
              <h4 className="text-xl font-bold text-[#14213D] mb-4">Tu Pedido</h4>

              <div className="flex justify-between border-b border-[#E5E5E5] pb-2 mb-2 font-semibold text-[#0A0908]">
                <span>Productos</span>
                <span>Total</span>
              </div>

              <ul className="text-[#0A0908] space-y-2 text-sm mb-4">
                <li className="flex justify-between">Pines <span>$75.99</span></li>
                <li className="flex justify-between">Llaveros <span>$151.99</span></li>
                <li className="flex justify-between">Anime <span>$53.99</span></li>
              </ul>

              <div className="flex justify-between border-t border-[#E5E5E5] pt-2 font-medium">
                <span>Subtotal</span>
                <span>$281.97</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>$281.97</span>
              </div>

              <div className="mt-4 space-y-3 text-sm text-[#0A0908]">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#FCA311]" /> Pago con cheque
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#FCA311]" /> Paypal
                </label>
              </div>

              <button type="submit" className="w-full mt-6 bg-[#FCA311] text-white font-bold py-3 rounded-md hover:bg-[#e6950e] transition">
                REALIZAR PEDIDO
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
