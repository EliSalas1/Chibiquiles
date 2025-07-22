import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[]; // opcional: restringir por roles
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = UserAuth();

  if (loading) return <div className="text-center py-10">Cargando...</div>;

  if (!user) {
    console.log("No autenticado → redirigiendo a login");
    return <Navigate to="/Login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes((user.rol || "").toString())) {
    console.log("Rol no permitido → redirigiendo a home");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
