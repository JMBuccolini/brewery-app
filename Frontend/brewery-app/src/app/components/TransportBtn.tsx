'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
  latitude: string;
  longitude: string;
  name: string;
}

export default function TransportBtn({ id, latitude, longitude, name }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/transport/${id}?lat=${latitude}&lng=${longitude}&nm=${name}`);
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-full h-[48px] rounded-[8px] p-[2px] bg-gradient-to-r from-[#3540E8] to-[#E41AD6] transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-center w-full h-full bg-[#010316] text-white rounded-[6px] hover:bg-transparent transition-all duration-300">
        Opciones de transporte
      </div>
    </button>
  );
}
