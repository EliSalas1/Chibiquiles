// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export default function AuthSuccess() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const email = params.get("email");
//     const name = params.get("name");
//     const photo = params.get("photo");

//     if (email && name) {
//       const userData = { email, name, photo };
//       localStorage.setItem("google_user", JSON.stringify(userData));
//       navigate("/");
//     } else {
//       navigate("/Login");
//     }
//   }, []);

//   return (
//     <div className="h-screen flex items-center justify-center bg-white text-gray-700">
//       <p>Iniciando sesión con Google...</p>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const rol = params.get("rol");
    const email = params.get("email");
    const name = params.get("name");
    const photo = params.get("photo");

    if (token && rol) {
      // Guardar token y rol
      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);

      console.log("AuthSuccess token:", token);
      console.log("AuthSuccess rol:", rol);
      console.log("AuthSuccess email:", email);
      console.log("AuthSuccess name:", name);


      // Opcional: guardar datos de Google
      if (email && name) {
        const userData = { email, name, photo };
        localStorage.setItem("google_user", JSON.stringify(userData));
      }

      // Redirigir a home o donde quieras
      navigate("/");
    } else {
      navigate("/Login");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-white text-gray-700">
      <p>Iniciando sesión con Google...</p>
    </div>
  );
}

