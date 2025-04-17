'use client';

import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';

interface Props {
  breweryCoords: LatLngExpression;
}

export default function MapView({ breweryCoords }: Props) {
  const [userCoords, setUserCoords] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords: LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
      });
    }
  }, []);

  const center = userCoords || breweryCoords;

  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '70%',marginLeft:'15%', marginTop:'10%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={breweryCoords} />
      {userCoords && (
        <>
          <Marker position={userCoords} />
          <Polyline positions={[userCoords, breweryCoords]} color="purple" />
        </>
      )}
    </MapContainer>
  );
}
