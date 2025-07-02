//cambios aqui
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type UserData = {
  correo: string;
  nombre?: string;
  rol?: number;
  photo?: string;
  [key: string]: any;
};

type AuthContextType = {
  signInWithPassword: (correo: string, contraseña: string) => Promise<any>;
  signUp: (correo: string, contraseña: string, nombre: string) => Promise<any>;
  signInWithGoogle: () => void;
  signOut: () => void;
  user: UserData | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const googleUser = localStorage.getItem("google_user");

    if (token) {
      const decoded: UserData = jwtDecode(token);
      setUser(decoded);
    } else if (googleUser) {
      const parsed = JSON.parse(googleUser);
      setUser(parsed);
    }

    setLoading(false);
  }, []);

  const signUp = async (correo: string, contraseña: string, nombre: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/registro`, { //PENDIENTE VER LA RUTA
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña, nombre }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.mensaje || "Error al registrar");
    }

    return await response.json();
  };

const signInWithPassword = async (email: string, password: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {//PENDIENTE VER LA RUTA
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      correo: email,
      contraseña: password
    }),
  });


    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "Credenciales incorrectas");
    }

    const { token } = data;
    localStorage.setItem("token", token);

    const decoded: UserData = jwtDecode(token);
    setUser(decoded);

    return decoded;
  };

  const signInWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("google_user");
    setUser(null);
    navigate("/Login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ signUp, signInWithPassword, signInWithGoogle, signOut, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
