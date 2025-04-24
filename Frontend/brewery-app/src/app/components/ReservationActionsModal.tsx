"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

export default function ReservationActionsModal({
  event,
  onClose,
}: {
  event: any;
  onClose: () => void;
}) {
  const { token } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newDate, setNewDate] = useState(
    event.start.toISOString().split("T")[0]
  );
  const [newTime, setNewTime] = useState(
    event.start.toTimeString().slice(0, 5)
  );
  const [newPeople, setNewPeople] = useState(event.people || 2);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/reservations/${event.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("No se pudo cancelar la reserva");

      toast.success("Reserva cancelada correctamente");
      onClose();
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/reservations/${event.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: newDate,
            time: newTime,
            people: newPeople,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok)
        throw new Error(result.message || "No se pudo editar la reserva");

      toast.success("Reserva actualizada correctamente");
      onClose();
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#13132D] text-white p-6 rounded-lg w-[320px]">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Editar reserva" : "Detalles de la reserva"}
            </h2>

            {!editMode ? (
              <>
                <p>
                  <strong>Cervecería:</strong> {event.title}
                </p>
                <p>
                  <strong>Fecha:</strong> {event.start.toLocaleDateString()}
                </p>
                <p>
                  <strong>Hora:</strong>{" "}
                  {event.start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={onClose}
                    className="border border-[#E41AD6] rounded-[8px] text-white py-2 px-3 cursor-pointer hover:bg-[#E41AD6]/10"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => setEditMode(true)}
                    className="border border-[#E41AD6] bg-gradient-to-r from-[#3540E8] to-[#E41AD6] rounded-[8px] text-white py-2 px-3 cursor-pointer hover:bg-none"
                  >
                    Editar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="border border-red-600 rounded-[8px] text-white py-2 px-3 cursor-pointer hover:bg-[#E41AD6]/10"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-4 text-white">
                  {/* FECHA */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="edit-date"
                      className="text-sm font-semibold text-pink-400"
                    >
                      Fecha:
                    </label>
                    <input
                      id="edit-date"
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="bg-[#1a1a2e] border border-pink-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E41AD6] transition-all duration-200"
                    />
                  </div>

                  {/* HORA */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="edit-time"
                      className="text-sm font-semibold text-pink-400"
                    >
                      Hora:
                    </label>
                    <input
                      id="edit-time"
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="bg-[#1a1a2e] border border-pink-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E41AD6] transition-all duration-200"
                    />
                  </div>

                  {/* PERSONAS */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="edit-people"
                      className="text-sm font-semibold text-pink-400"
                    >
                      Personas:
                    </label>
                    <input
                      id="edit-people"
                      type="number"
                      value={newPeople}
                      min={1}
                      onChange={(e) => setNewPeople(+e.target.value)}
                      className="bg-[#1a1a2e] border border-pink-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E41AD6] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* BOTONES */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setEditMode(false)}
                    className="border cursor-pointer border-white px-4 py-2 rounded hover:bg-white/10 transition-all"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleEdit}
                    disabled={loading}
                    className="bg-gradient-to-r cursor-pointer from-[#3540E8] to-[#E41AD6] px-4 py-2 rounded text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? "Guardando..." : "Guardar cambios"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
