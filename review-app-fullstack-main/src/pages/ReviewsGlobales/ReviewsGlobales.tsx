import { useEffect, useState } from "react";
import type { Review } from "./reviewg.types";
import { obtenerReviewsGlobales } from "./reviewg.service";

export const ReviewsGlobales = () => {
  const [reviewsGlobales, setReviewsGlobales] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarReviewsGlobales = async () => {
    try {
      const data = await obtenerReviewsGlobales();
      setReviewsGlobales(data);
    } catch (error) {
      console.error("Error al obtener reseñas globales:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReviewsGlobales();
  }, []);

  if (loading) return <p>Cargando reseñas globales...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Reseñas Globales</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-700 bg-gray-800 rounded-xl shadow">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="text-left px-4 py-2">#</th>
              <th className="text-left px-4 py-2">Nombre</th>
              <th className="text-left px-4 py-2">Género</th>
              <th className="text-left px-4 py-2">Calificación</th>
              <th className="text-left px-4 py-2">Comentario</th>
            </tr>
          </thead>
          <tbody>
            {reviewsGlobales.map((r, i) => (
              <tr key={r.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{r.nombre}</td>
                <td className="px-4 py-2">{r.genero}</td>
                <td className="px-4 py-2">{r.calificacion}</td>
                <td className="px-4 py-2">{r.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

