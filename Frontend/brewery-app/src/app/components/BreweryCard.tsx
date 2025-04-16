import React from "react";
import LocationIcon from "../../../public/icons/location-icon";
import PhoneIcon from "../../../public/icons/phone-icon";
import { Brewery } from "../types/brewery";
import CardBtn from "./CardBtn";



export default function BreweryCard({data} : {data:Brewery}){

   return(
    <div
    className="inline-block bg-[#13132D] px-4 py-4 rounded-[8px] min-w-[328px] mr-4 shrink-0"
  >
    <h2 className="text-[20px] font-bold pb-4">{data.name}</h2>
    <div className="flex justify-center items-center gap-x-2 pb-4">
      <img
        src={"imgs/nimbar.jpg"}
        alt={data.name}
        className="w-[70px] h-[70px] rounded-full object-cover"
      />

      <div className="flex flex-col gap-y-2 justify-center">
        <p className="flex gap-x-1">
          <LocationIcon width="24" height="24" />
          <span>
            {data.address_1 === null
              ? "Havre 73, Juarez, Cuauhtemoc"
              : data.address_1}
          </span>
        </p>
        <p className="flex gap-x-2">
          <PhoneIcon />
          <span>
            {data.phone === null ? "4535-8766" : data.phone}
          </span>
        </p>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <CardBtn cardID = {data.id} />
    </div>
  </div>
   ) 
}