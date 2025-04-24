'use client';

import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { useUserReservations } from "@/hooks/useUserReservations";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CancelReservationModal from "./ReservationActionsModal";

const localizer = dayjsLocalizer(dayjs);

export default function UserCalendar() {
  const { events, loading } = useUserReservations();
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div  className="p-4 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Mis reservas</h2>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 500
          }}
          onSelectEvent={(event:any) => setSelectedEvent(event)}
        />
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
