const BlogDetailsSection: React.FC = () => {
  return (
    <>
      {/* Banner */}
      <section>
        <div className="flex flex-col items-center justify-center text-center bg-gray-800 text-white px-6 py-10 rounded">
          <p className="font-quicksand text-2xl font-extrabold">Blogquiquiles</p>
        </div>
      </section>

      {/* Blog Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:flex lg:space-x-8">
          {/* Sidebar */}
          <aside className="lg:w-1/3 w-full mb-8 lg:mb-0">
            <div className="space-y-6">
              <h4 className="text-xl font-semibold">Artículos disponibles</h4>
              {[
                {
                  src: "/blog/limpiar.webp",
                  title: "Cuidados básicos para que tus pines duren más",
                  date: "Marzo 4, 2025",
                },
                {
                  src: "/blog/creativo.webp",
                  title: "Tips You To Balance Nutrition Meal Day",
                  date: "MAR 05, 2019",
                },
                {
                  src: "/blog/escoger.webp",
                  title: "4 Principles Help You Lose Weight With Vegetables",
                  date: "MAR 05, 2019",
                },
              ].map((item, i) => (
                <a href="#" key={i} className="flex space-x-4">
                  <img
                    src={item.src}
                    alt=""
                    className="w-24 h-20 object-cover rounded"
                  />
                  <div>
                    <h6 className="font-semibold text-gray-800 text-sm">
                      {item.title}
                    </h6>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </a>
              ))}
            </div>
          </aside>

          {/* Blog Content */}
          <div className="lg:w-2/3 w-full space-y-10">
            {/* Artículo 1 */}
            <div>
              <img
                src="/blog/bannerblog.jpg"
                alt=""
                className="w-full h-auto rounded"
              />
              <h3 className="text-2xl font-bold mt-6" id="cuidados">
                Cuidados básicos para que tus pines duren más
              </h3>
              <p className="mt-4">
                ¿Tus pines favoritos están perdiendo color o se rayan
                fácilmente? 🧷 Aquí van algunos tips para mantenerlos siempre
                como nuevos:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Guárdalos en un corcho o tela suave cuando no los uses, evita
                  superficies duras.
                </li>
                <li>
                  Límpialos con un paño seco y suave, sin agua ni productos
                  abrasivos.
                </li>
                <li>Evita que rocen con llaves u objetos metálicos.</li>
                <li>Retíralos antes de lavar la prenda.</li>
              </ul>
              <p className="mt-4">
                ¡Un buen pin puede durar años si lo cuidas como se merece! ✨
              </p>
              <img src="/blog/cuidar.jpg" className="w-full mt-4 rounded" />
            </div>

            {/* Artículo 2 */}
            <div>
              <h3 className="text-2xl font-bold" id="formas">
                Formas creativas de usar llaveros (que no sabías)
              </h3>
              <p className="mt-2">
                ¿Pensabas que un llavero solo servía para… llaves? 😅 ¡Piensa
                otra vez!
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Úsalos como colgantes en mochilas o estuches 🎒</li>
                <li>
                  Añádelos a tus cierres de chaquetas para darles estilo 🧥
                </li>
                <li>Decora tu escritorio o espejo retrovisor 🪞</li>
                <li>Convierte uno en marcador de página 📖</li>
                <li>Haz un mural coleccionable 🖼️</li>
              </ul>
              <p className="mt-4">
                ¡Tus llaveros también hablan de tu estilo! 💛
              </p>
              <img
                src="/blog/formascreativas.jpg"
                className="w-full mt-4 rounded"
              />
            </div>

            {/* Artículo 3 */}
            <div>
              <h3 className="text-2xl font-bold" id="mochila">
                Cómo elegir el pin perfecto para tu mochila
              </h3>
              <p className="mt-2">
                Elegir un pin no es solo una decisión estética, ¡es una forma de
                expresión! 😎 Aquí te damos 3 claves para acertar:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Piensa en tu estilo: kawaii, gamer, minimalista, vintage…
                </li>
                <li>
                  Combina tamaños: uno grande con varios pequeños crea armonía.
                </li>
                <li>Colócalo en zonas visibles pero seguras.</li>
              </ul>
              <p className="mt-4">
                Y lo más importante: elige el que te haga sonreír. 🧡
              </p>
              <img
                src="/blog/escogermoc.jpg"
                className="w-full mt-4 rounded"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsSection;
