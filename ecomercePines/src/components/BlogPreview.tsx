
const blogs = [
  {
    id: 1,
    title: "Cuidados básicos para que tus pines duren más",
    date: "Marzo 4, 2025",
    comments: 5,
    image: "/blog/limpiar.webp",
    excerpt:
      "Unos simples trucos (como dónde colocarlos y cómo limpiarlos) pueden alargar la vida de tus pines favoritos 🧽🧼",
    link: "/blog#cuidados",
  },
  {
    id: 2,
    title: "Formas creativas de usar llaveros (que no sabías)",
    date: "Marzo 16, 2025",
    comments: 5,
    image: "/blog/creativo.webp",
    excerpt:
      "No solo son para tus llaves. Decora mochilas, estuches o incluso conviértelos en colgantes únicos 🧷💡",
    link: "/blog#formas",
  },
  {
    id: 3,
    title: "Cómo elegir el pin perfecto para tu mochila",
    date: "Marzo 27, 2025",
    comments: 5,
    image: "/blog/escoger.webp",
    excerpt:
      "¿Eres más de colores vibrantes o diseños minimalistas? Aquí te damos ideas para encontrar el pin que hable por ti 🎒✨",
    link: "/blog#mochila",
  },
];

export default function BlogPreview(){
  return (
    <section className="py-12" aria-labelledby="blog-heading">
      <div className="container mx-auto px-4">
        <h2
          id="blog-heading"
          className="text-3xl font-bold text-center mb-10 relative inline-block"
        >
          Blog
          <span className="block w-20 h-1 bg-orange-400 mt-2 mx-auto"></span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded shadow overflow-hidden"
              aria-label={`Artículo del blog: ${blog.title}`}
            >
              <a
                href={blog.link}
                aria-label={`Leer más: ${blog.title}`}
              >
                <img
                  src={blog.image}
                  alt={`Imagen del artículo: ${blog.title}`}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </a>

              <div className="p-4">
                <ul className="text-gray-500 text-sm flex gap-4 mb-2" aria-label="Metadatos del artículo">
                  <li>
                    <i className="fa fa-calendar-o mr-1" aria-hidden="true"></i>
                    <span className="sr-only">Fecha de publicación:</span>
                    {blog.date}
                  </li>
                  <li>
                    <i className="fa fa-comment-o mr-1" aria-hidden="true"></i>
                    <span className="sr-only">Cantidad de comentarios:</span>
                    {blog.comments}
                  </li>
                </ul>
                <p className="font-semibold text-lg mb-2">
                  <a
                    href={blog.link}
                    aria-label={`Leer artículo completo: ${blog.title}`}
                  >
                    {blog.title}
                  </a>
                </p>
                <p className="text-gray-600 text-sm">{blog.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};