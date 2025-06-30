import { useForm } from "react-hook-form";
import { loginUsuario } from "./login.service";
import type { LoginForm } from "./login.types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await loginUsuario(data);
      login(res.usuario);
      setTimeout(() => navigate("/mensaje"), 100);
    } catch (err) {
      toast.error("Usuario o clave incorrecta", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto space-y-4"
      >
        <div>
          <input
            className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Correo"
            {...register("email", {
              required: "Correo requerido",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Correo inválido",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contraseña"
            {...register("password", { required: "Contraseña requerida" })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
          Ingresar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
