"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

interface Props {
  breweryCoords: LatLngExpression;
}

export default function MapView({ breweryCoords }: Props) {
  const [userCoords, setUserCoords] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords: LatLngExpression = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setUserCoords(coords);
      });
    }
  }, []);

  const center = userCoords || breweryCoords;

  return (
    <div className="h-[450px] relative w-full rounded-lg bg-[#13132D] flex justify-center items-center">
      <MapContainer
        center={center}
        zoom={13}
        style={{
          position:'absolute',
          height: "400px",
          width:'70%',
          marginLeft:'15%',
          top:'5%',
          left:'0%'
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
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
    </div>
  );
}
