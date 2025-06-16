// modalcontacto.tsx
import { useForm } from "react-hook-form";
import { enviarContacto, actualizarContacto } from "./contacto.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ContactoRequest } from "./contacto.types";

interface Props {
  onClose: () => void;
  contacto?: {
    id: number;
    nombre: string;
    correo: string;
    mensaje: string;
  };
}

export const ModalContacto = ({ onClose, contacto }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactoRequest>({
    defaultValues: {
      nombre: contacto?.nombre || "",
      correo: contacto?.correo || "",
      mensaje: contacto?.mensaje || "",
    },
  });

  const onSubmit = async (data: ContactoRequest) => {
    try {
      if (contacto) {
        await actualizarContacto(contacto.id, data);
        toast.success("Contacto actualizado correctamente", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        await enviarContacto(data);
        toast.success("Mensaje enviado correctamente", {
          position: "top-right",
          autoClose: 4000,
        });
      }
      reset();
      onClose();
    } catch (err: any) {
      console.error("Error al guardar el contacto:", err); 
      toast.error("Error al guardar el contacto", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {contacto ? "Editar contacto" : "Agregar contacto"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nombre:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <p className="text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Correo electrónico:</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-xl"
              {...register("correo", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.correo && (
              <p className="text-red-500">{errors.correo.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Mensaje:</label>
            <textarea
              className="w-full px-3 py-2 border rounded-xl"
              rows={4}
              {...register("mensaje", {
                required: "El mensaje es obligatorio",
              })}
            ></textarea>
            {errors.mensaje && (
              <p className="text-red-500">{errors.mensaje.message}</p>
            )}
          </div>

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
        <ToastContainer />
      </div>
    </div>
  );
};