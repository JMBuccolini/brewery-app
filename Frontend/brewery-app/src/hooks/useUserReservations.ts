'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface ReservationEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  time: string;
}

export function useUserReservations() {
  const { token } = useAuth();
  const [events, setEvents] = useState<ReservationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchReservations = async () => {
      try {
        const res = await fetch('http://localhost:5000/reservations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        const formatted = data.map((reserva: any) => {
          const dateObj = new Date(reserva.date); // esto ya viene como fecha pura
          const [hour, minute] = reserva.time.split(':');
        
          dateObj.setHours(Number(hour));
          dateObj.setMinutes(Number(minute));
        
          const endObj = new Date(dateObj);
          endObj.setHours(endObj.getHours() + 1);
        
          return {
            id: reserva.id,
            title: `${reserva.breweryName} (${reserva.people} pers)`,
            start: dateObj,
            end: endObj,
            time: reserva.time,
          };
        });

        setEvents(formatted);
      } catch (err) {
        console.error('Error al cargar reservas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [token]);

  return { events, loading };
}
