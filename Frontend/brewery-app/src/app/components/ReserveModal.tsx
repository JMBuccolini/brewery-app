"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";// donde guardás el token del usuario

export default function ReserveModal({
  breweryName,
  onClose,
}: {
  breweryName: string;
  onClose: () => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(2);
  const [loading, setLoading] = useState(false);

  const {token} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          breweryName,
          date,
          time,
          people,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Error al crear la reserva');
      }

      toast.success("¡Reserva realizada con éxito!");
      onClose();
    } catch (err:any ) {
      toast.error(err.message || 'Error inesperado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#13132D] p-6 rounded-lg w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-4">Reservar en {breweryName}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Fecha
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full mt-1 p-2 rounded bg-[#1f1f3b] text-white border border-gray-600"
            />
          </label>
          <label>
            Hora
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full mt-1 p-2 rounded bg-[#1f1f3b] text-white border border-gray-600"
            />
          </label>
          <label>
            Cantidad de personas
            <input
              type="number"
              min={1}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full mt-1 p-2 rounded bg-[#1f1f3b] text-white border border-gray-600"
            />
          </label>

          <div className="flex justify-between mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 border border-[#E41AD6] py-2 rounded-md hover:bg-[#E41AD6]/10"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#3540E8] to-[#E41AD6] py-2 rounded-md text-white flex justify-center items-center gap-2"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Confirmar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
