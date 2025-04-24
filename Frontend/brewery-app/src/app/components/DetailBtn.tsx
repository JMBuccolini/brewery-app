"use client";

import React from "react";
import { useState } from "react";
import ReserveModal from "./ReserveModal";

export default function DetailBtn({
  breweryName,
  breweryId,
}: {
  breweryName: string;
  breweryId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-[#3540E8] to-[#E41AD6] rounded-[8px] text-white py-1 w-full h-[48px] font-bold cursor-pointer"
      >
        Reservar mesa
      </button>
      {isModalOpen && (
        <ReserveModal
          breweryName={breweryName}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
