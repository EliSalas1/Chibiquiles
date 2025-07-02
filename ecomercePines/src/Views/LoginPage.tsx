import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [showMessage, setShowMessage] = useState(true);
    const message = location.state?.message;
    const { signInWithPassword } = UserAuth();
    const { signInWithGoogle } = UserAuth();
    
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setShowMessage(false), 5000); // Oculta el mensaje después de 5s
            return () => clearTimeout(timer);
        }
    }, [message]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(""); // Limpia errores previos      
        try {
          const result = await signInWithPassword(email, password);
          if (result?.error) {
            setErrorMessage("Correo o contraseña incorrecta");
        } else {
            const { token, rol } = result;
            // Guarda token y rol
            if (token) {
                localStorage.setItem("token", token);
            }

            //localStorage.setItem("token", token);
            localStorage.setItem("rol", rol);
            if (rol === "1") {
            // Es administrador → ir al dashboard
            navigate("/dashboard");
        } else {
            // Es cliente → redirigir a home u otra página
        navigate("/");
        }
    }

        } catch (error: any) {
          console.error("Error al iniciar sesión:", error);
          setErrorMessage("Correo o contraseña incorrecta");
        }
      };
      



    return (
        <>

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f1e36] to-[#162b4d] p-4">
                {message && showMessage && (
                    <div className="w-full max-w-md bg-gray-50 text-green-800 px-6 py-3 text-center font-medium rounded shadow-md mb-4">
                        {message}
                    </div>
                )}
                {errorMessage && (
                    <div className="w-full max-w-md bg-red-100 text-red-800 px-6 py-3 text-center font-medium rounded shadow-md mb-4">
                        {errorMessage}
                    </div>
                )}

                <div className="relative w-full max-w-md">

                    {/* Logo floating above the card */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-30 h-30 bg-white rounded-full p-2 shadow-lg flex items-center justify-center z-10">
                        <div className="w-24 h-24 relative">
                            <img src="/logo.webp" alt="Chibiquiles Logo" className="object-contain w-full h-full" />
                        </div>
                    </div>

                    {/* Main card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mt-10 border border-gray-100">
                        <div className="h-8 bg-orange-400 rounded-t-3xl"></div>

                        <div className="p-8 pt-12">
                            <h2 className="text-2xl font-bold text-center text-[#0f1e36] mb-2">¡Bienvenido!</h2>
                            <p className="text-center text-gray-500 mb-8">Inicia sesión para acceder a tu cuenta</p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-[#0f1e36] font-medium flex items-center gap-2">
                                        <Mail size={16} className="text-orange-400" />
                                        Correo electrónico
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="current-email"
                                            placeholder="ejemplo@correo.com"
                                            className="w-full pl-4 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-[#0f1e36] font-medium flex items-center gap-2">
                                        <Lock size={16} className="text-orange-400" />
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <div className="flex justify-end">
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-orange-400 hover:text-orange-500 transition-colors"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-orange-400 hover:bg-orange-500 text-white py-4 rounded-xl font-medium text-lg shadow-lg shadow-orange-400/20 transition-all hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 cursor-pointer"
                                >
                                    Iniciar Sesión
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <div className="relative flex items-center justify-center">
                                    <div className="border-t border-gray-200 absolute w-full"></div>
                                    <span className="bg-white px-4 text-sm text-gray-500 relative">o continúa con</span>
                                </div>

                                <div className="flex justify-center gap-4 mt-4">
                                    {/* Google */}
                                    <button onClick={signInWithGoogle} className="cursor-pointer p-3 rounded-full border-2 border-gray-200 hover:border-orange-500 hover:bg-gray-50 transition-all">
                                        {/* SVG de Google */}
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600">
                                    ¿No tienes una cuenta?{" "}
                                    <Link to="/Registro" className="text-orange-400 font-medium hover:text-orange-500 transition-colors">
                                        Regístrate
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-white text-sm text-center max-w-md">
                    <p>© 2024 Chibiquiles - Sabrosos de corazón, coleccionables de profesión</p>
                </div>

                {/* Decorative elements */}
                <div className="fixed top-20 left-20 w-64 h-64 bg-orange-400/5 rounded-full blur-3xl"></div>
                <div className="fixed bottom-20 right-20 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl"></div>
            </div>
        </>
    )
}