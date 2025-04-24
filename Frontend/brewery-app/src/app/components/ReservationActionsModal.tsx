"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

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
                className="border border-white px-3 py-2 rounded"
              >
                Cerrar
              </button>
              <button
                onClick={() => setEditMode(true)}
                className="bg-white text-black px-3 py-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-600 px-3 py-2 rounded text-white"
              >
                Eliminar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <label>
                Fecha:
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="text-black w-full mt-1 rounded p-1"
                />
              </label>
              <label>
                Hora:
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="text-black w-full mt-1 rounded p-1"
                />
              </label>
              <label>
                Personas:
                <input
                  type="number"
                  value={newPeople}
                  min={1}
                  onChange={(e) => setNewPeople(+e.target.value)}
                  className="text-black w-full mt-1 rounded p-1"
                />
              </label>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditMode(false)}
                className="border border-white px-3 py-2 rounded"
              >
                Volver
              </button>
              <button
                onClick={handleEdit}
                className="bg-gradient-to-r from-[#3540E8] to-[#E41AD6] px-4 py-2 rounded text-white"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
