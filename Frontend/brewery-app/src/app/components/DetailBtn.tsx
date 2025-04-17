"use client";

import React from "react";
import { useRouter } from "next/navigation";
export default function DetailBtn() {

  const router = useRouter()

  return (
    <button 
      onClick={()=> router.push('/error')}
      className="bg-gradient-to-r from-[#3540E8] to-[#E41AD6] rounded-[8px] text-white py-1 w-full h-[48px] font-bold cursor-pointer">
      Reservar mesa
    </button>
  );
}
