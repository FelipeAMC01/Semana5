import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { ModalReview } from "./ModalReview";
import type { Review } from "./review.types";
import { obtenerReviews, eliminarReview } from "./review.service";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reviewEditando, setReviewEditando] = useState<Review | undefined>();

  const cargarReviews = async () => {
    try {
      const data = await obtenerReviews();
      setReviews(data);
    } catch (error) {
      console.error("Error al obtener las reviews:", error);
    }
  };

  const abrirModal = (review?: Review) => {
    setReviewEditando(review);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setReviewEditando(undefined);
    setMostrarModal(false);
    cargarReviews();
  };

  const confirmarEliminacion = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar esta review?",
      icon: "warning",
      background: "#1f2937",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await eliminarReview(id);
      toast.success("Review eliminada", { autoClose: 1000 });
      cargarReviews();
    }
  };

  useEffect(() => {
    cargarReviews();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-white">Reseñas de Videojuegos</h2>
        <button
          onClick={() => abrirModal()}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
        >
          <FiPlus className="text-lg" />
          <span>Agregar</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-700 bg-gray-800 mt-4 rounded-xl shadow">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="text-left px-4 py-2">#</th>
              <th className="text-left px-4 py-2">Nombre</th>
              <th className="text-left px-4 py-2">Género</th>
              <th className="text-left px-4 py-2">Calificación</th>
              <th className="text-left px-4 py-2">Comentario</th>
              <th className="text-center px-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                <td className="px-4 py-2">{r.id}</td>
                <td className="px-4 py-2">{r.nombre}</td>
                <td className="px-4 py-2">{r.genero}</td>
                <td className="px-4 py-2">{r.calificacion}</td>
                <td className="px-4 py-2">{r.comentario}</td>
                <td className="p-2 flex justify-center gap-3">
                  <button onClick={() => abrirModal(r)} className="text-blue-400 hover:text-blue-300">
                    <FiEdit />
                  </button>
                  <button onClick={() => confirmarEliminacion(r.id)} className="text-red-400 hover:text-red-300">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <ModalReview
          onClose={cerrarModal}
          review={reviewEditando ?? undefined}
        />
      )}

      <ToastContainer theme="dark" />
    </div>
  );
};
