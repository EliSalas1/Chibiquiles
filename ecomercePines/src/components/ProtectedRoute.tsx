import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};
export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  console.log("ProtectedRoute → token:", token);
  console.log("ProtectedRoute → rol:", rol);

  if (!token) {
    console.log("No token → redirigiendo a login");
    return <Navigate to="/Login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(rol || "")) {
    console.log("Rol no permitido → redirigiendo a home");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}



// import { Navigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user, loading } = UserAuth();
//   // console.log(user, loading);
//   if (loading) {
//     return <div className="text-center py-10">Cargando...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/Login" replace />;
//   } 

//   return <>{children}</>;
// }
