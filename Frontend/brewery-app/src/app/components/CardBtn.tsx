'use client'

import React from "react";
import { useRouter } from "next/navigation";

export default function CardBtn({cardID} : {cardID : string | null}){

    const router = useRouter();

    return(
        <button 
      onClick={()=> router.push(`/detail/${cardID}`)}
      className="bg-gradient-to-r from-[#3540E8] to-[#E41AD6] rounded-[8px] text-white py-1 w-[244px]">
        Ver Más
      </button>
    )
}