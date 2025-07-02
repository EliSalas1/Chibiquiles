
import AllProducts from "../components/AllProducts";

export default function TopPage() {

  return (
    <>
      {/* Banner */}
      <section>
        <div className="flex flex-col items-center justify-center text-center bg-gray-800 text-white px-6 py-10 rounded">
          <p className="font-quicksand text-2xl font-extrabold">Top</p>
          <p className="font-quicksand text-sm text-gray-300">Home → Shop</p>
        </div>
      </section>
      <div className="container mx-auto px-2 py-4">

        <AllProducts />

        {/* fin */}
      </div>
    </>
  );
}
