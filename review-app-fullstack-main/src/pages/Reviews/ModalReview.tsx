import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { Review } from "./review.types";
import { crearReview, actualizarReview } from "./review.service";

interface Props {
  onClose: () => void;
  review?: Review;
}

export const ModalReview = ({ onClose, review }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Review, "id">>({
    defaultValues: {
      nombre: review?.nombre || "",
      genero: review?.genero || "",
      calificacion: review?.calificacion || 1,
      comentario: review?.comentario || "",
    },
  });

  const onSubmit = async (data: Omit<Review, "id">) => {
    try {
      const dataConCalificacionNumero = {
        ...data,
        calificacion: Number(data.calificacion),
      };

      if (review) {
        await actualizarReview(review.id, dataConCalificacionNumero);
        toast.success("Review actualizada", { autoClose: 2000 });
      } else {
        await crearReview(dataConCalificacionNumero);
        toast.success("Review creada", { autoClose: 2000 });
      }
      reset();
      onClose();
    } catch (err) {
      toast.error("Error al guardar la review");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 w-full max-w-md border border-gray-700">
        <h3 className="text-lg font-bold mb-4">
          {review ? "Editar Review" : "Agregar Review"}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del videojuego"
            className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("nombre", { required: "Campo requerido" })}
          />
          <input
            type="text"
            placeholder="Género"
            className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("genero", { required: "Campo requerido" })}
          />
          <input
            type="number"
            min={1}
            max={10}
            placeholder="Calificación (1-10)"
            className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("calificacion", {
              required: true,
              min: 1,
              max: 10,
            })}
          />
          <textarea
            rows={4}
            placeholder="Comentario"
            className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("comentario", { required: "Comentario requerido" })}
          ></textarea>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
