import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Estilos oficiales Swiper
import "swiper/swiper-bundle.css";

const products = [
  {
    img: "/product/1.jpg",
    discount: "-20%",
    category: "Pines",
    name: "Pin Gato Meme",
    price: 30,
    oldPrice: 36,
  },
  {
    img: "/product/11.jpg",
    discount: "-15%",
    category: "Pines",
    name: "Pin Meme Mundo de Gumball",
    price: 38,
    oldPrice: 50,
  },
  {
    img: "/product/20.jpg",
    discount: "-25%",
    category: "Pines",
    name: "Pin Gato Arcoiris",
    price: 18,
    oldPrice: 25,
  },
  {
    img: "/product/3l.jpg",
    discount: "-20%",
    category: "Llaveros",
    name: "Llavero Michi aveja",
    price: 18,
    oldPrice: 26,
  },
  {
    img: "/product/13l.jpg",
    discount: "-30%",
    category: "Llaveros",
    name: "Llaveros Michis",
    price: 45,
    oldPrice: 60,
  },
  {
    img: "/product/9l.jpg",
    discount: "-20%",
    category: "Llaveros",
    name: "Llaveros Troll Face",
    price: 30,
    oldPrice: 36,
  },
];

export default function SliderCard({
  forceFullWidth = false,
}: {
  forceFullWidth?: boolean;
}) {
  return (
    <section className="w-full px-2 sm:px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold uppercase text-center">
          Ofertas Irresistibles
        </h2>

        <div className="w-48 h-1 bg-orange-400 mx-auto mt-2 rounded"></div>
        <Swiper
          className="w-full"
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 2000 }}
          spaceBetween={15}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1.2 }, // Se verá más grande y el siguiente apenas asomado
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: forceFullWidth ? 4 : 3 },
            1280: { slidesPerView: forceFullWidth ? 2 : 4 },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <div
                  className="relative aspect-square bg-center bg-cover h-48 sm:h-52 md:h-56"
                  style={{ backgroundImage: `url(${product.img})` }}
                >
                  <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {product.discount}
                  </div>
                  <ul className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                    {[
                      { icon: "fa fa-heart" },
                      { icon: "fa fa-retweet" },
                      { icon: "fa fa-shopping-cart" },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="bg-white text-black hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow transition text-xs"
                        >
                          <i className={item.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-2 text-center">
                  <span className="text-xs text-gray-500">
                    {product.category}
                  </span>
                  <h5 className="text-sm font-semibold text-gray-700">
                    {product.name}
                  </h5>
                  <div className="text-gray-800 text-sm font-bold">
                    ${product.price.toFixed(2)}
                    <span className="line-through text-gray-400 text-xs ml-1">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
