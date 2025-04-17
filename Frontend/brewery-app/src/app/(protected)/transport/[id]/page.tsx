'use client';

import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import MapView from '@/app/components/MapView';

export default function TransportPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const nm = searchParams.get('nm');

  // Validaciones básicas
  if (!lat || !lng) {
    return <p className="text-white p-6">Coordenadas no disponibles.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-white text-[32px] font-bold mb-4">
        Opciones de transporte para cervecería {nm}
      </h1>
      <MapView breweryCoords={[parseFloat(lat), parseFloat(lng)]} />
    </div>
  );
}
