"use client";

import { useState } from "react";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import { useUserReservations } from "@/hooks/useUserReservations";
import CancelReservationModal from "./ReservationActionsModal";
import "react-big-calendar/lib/css/react-big-calendar.css";

import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el locale de español

dayjs.locale("es"); // Configura el locale de dayjs a español

const localizer = dayjsLocalizer(dayjs);

//Este messages impacta en el toolbar del calendario para cambiar el idioma
const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Sin eventos",
};

export default function UserCalendar() {
  const { events, loading } = useUserReservations();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4 px-6 max-w-4xl text-white bg-[#13132D] rounded-lg lg:self-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Mis reservas</h2>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <div className="overflow-x-auto sm:overflow-visible">
          <div className="min-w-[640px] sm:min-w-full">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              messages={messages}
              views={[Views.MONTH, Views.WEEK, Views.DAY]}
              view={view}
              date={date}
              onView={(view: any) => setView(view)}
              onNavigate={(newDate: Date | string) => {
                const parsedDate =
                  typeof newDate === "string" ? new Date(newDate) : newDate;
                setDate(parsedDate);
              }}
              style={{ height: 500 }}
              onSelectEvent={(event: any) => setSelectedEvent(event)}
            />
          </div>
        </div>
      )}

      {selectedEvent && (
        <CancelReservationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
