"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { useUserReservations } from "@/hooks/useUserReservations";

import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// 🧪 Eventos simulados (tienen que venir de la API más adelante cargando los de cada usuario)
// const mockEvents = [
//   {
//     title: "Reserva: Golden Ale Taproom",
//     start: new Date(2025, 3, 24, 17, 0),
//     end: new Date(2025, 3, 24, 18, 0),
//   },
//   {
//     title: "Reserva: California Brew Pub",
//     start: new Date(2025, 3, 26, 19, 0),
//     end: new Date(2025, 3, 26, 20, 30),
//   },
//   {
//     title: "Reserva: La Birrería de Nacho",
//     start: new Date(2025, 3, 30, 15, 0),
//     end: new Date(2025, 3, 30, 16, 0),
//   },
// ];

export default function UserCalendar() {
  const { events, loading } = useUserReservations();
  console.log("Eventos de reservas:", events);
  return (
    <div className="p-4 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Mis Reservas</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64"> 
          <p>Cargando reservas...</p>
        </div>

      ) : (
        
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />)}
    </div>
  );
}
