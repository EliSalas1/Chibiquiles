export default function Busqueda() {
    return (
        <section className="w-full bg-white py-4">
            <div className="max-w-7xl mx-auto px-6">
                {/* Búsqueda */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <form className="flex flex-wrap w-full md:flex-nowrap md:gap-4 gap-2">
                        {/* Categorías */}
                        <div className="w-full md:w-1/4 flex items-center justify-between px-4 py-2 border rounded-md bg-gray-100 text-gray-700">
                            <span>Categorías</span>
                            <span className="arrow_carrot-down" />
                        </div>
                        {/* Input */}
                        <input
                            type="text"
                            placeholder="El accesorio ideal te espera"
                            className="w-full md:w-2/4 h-[50px] px-4 border rounded-md focus:outline-none"
                        />
                        {/* Botón */}
                        <button
                            type="submit"
                            className="w-full md:w-1/4 bg-orange-400 text-white font-bold rounded-md h-[50px] hover:bg-orange-600 transition"
                        >
                            BUSCAR
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}  