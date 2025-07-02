import { Link } from "react-router-dom";

const categories = [
  { title: "Pines", img: "/categories/pines.webp", link: "/Pines" },
  { title: "Llaveros", img: "/categories/llaveros.webp", link: "/Llaveros" },
];

export default function CategoriesSlider() {
  return (
    <section className="py-16 bg-white" aria-labelledby="categorias-heading">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="categorias-heading" className="sr-only">
          Categorías destacadas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <article key={i} className="relative group rounded shadow-md overflow-hidden">
              <img
                src={cat.img}
                alt={`Categoría: ${cat.title}`}
                loading="lazy"
                width={400}
                height={256}
                className="w-full h-64 object-cover"
              />
              <Link
                to={cat.link}
                aria-label={`Explorar productos de la categoría ${cat.title}`}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center font-bold bg-white/80 text-[#14213d] px-4 py-2 uppercase tracking-wide rounded"
              >
                {cat.title}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
