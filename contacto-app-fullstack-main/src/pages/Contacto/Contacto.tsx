// contacto.tsx
import "react-toastify/dist/ReactToastify.css";
import type { ContactoForm } from "./contacto.types";
import { useEffect, useState } from "react";
import { ModalContacto } from "./ModalContacto";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { obtenerContactos, eliminarContacto } from "./contacto.service";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

export const Contacto = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [contactos, setContactos] = useState<ContactoForm[]>([]);
  const [contactoEditando, setContactoEditando] = useState<ContactoForm | undefined>();

  const cargarContactos = async () => {
    try {
      const data = await obtenerContactos();
      setContactos(data);
    } catch (error) {
      console.error("Error al obtener los contactos:", error);
      toast.error("Error al cargar los contactos");
    }
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  const abrirModal = (contacto?: ContactoForm) => {
    setContactoEditando(contacto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setContactoEditando(undefined);
    cargarContactos(); 
  };

  const confirmarEliminacion = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar este contacto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try { 
        await eliminarContacto(id);
        toast.success("Contacto eliminado", {
          position: "top-right",
          autoClose: 1000,
        });
        cargarContactos(); 
      } catch (error) { 
        console.error("Error al eliminar el contacto:", error);
        toast.error("Error al eliminar el contacto", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const formatoFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getUTCDate()).padStart(2, "0");
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
    const anio = fecha.getUTCFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Contactos
        </h2>
        <button
          onClick={() => abrirModal()}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <FiPlus className="text-lg" />
          <span className="text-sm sm:text-base">Agregar</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border bg-white border-gray-300 mt-4 rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Nombre</th>
              <th className="text-left px-4 py-2">Correo</th>
              <th className="text-left px-4 py-2">Mensaje</th>
              <th className="text-left px-4 py-2">Fecha</th>
              <th className="text-center px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((c) => (
              <tr key={c.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2">{c.nombre}</td>
                <td className="px-4 py-2">{c.correo}</td>
                <td className="px-4 py-2">{c.mensaje}</td>
                <td className="px-4 py-2">{formatoFecha(c.fecha.toString())}</td>
                <td className="px-4 py-2 flex justify-center gap-3">
                  <button
                    onClick={() => abrirModal(c)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => confirmarEliminacion(c.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <ModalContacto onClose={cerrarModal} contacto={contactoEditando} />
      )}

      <ToastContainer />
    </div>
  );
};
