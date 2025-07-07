import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

export const Layout = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold">App de Reseñas</h1>

          <div className="flex gap-6 items-center">
            <Link to="/reviews" className="hover:text-blue-400 transition">
              Mis Reseñas
            </Link>
            <Link to="/reviews-globales" className="hover:text-blue-400 transition">
              Reseñas Globales
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{usuario?.nombre}</span>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 text-lg transition-colors duration-200"
              title="Cerrar sesión"
            >
              <FiLogOut />
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6 bg-gray-900 text-white">
        <Outlet />
      </main>
    </div>
  );
};


