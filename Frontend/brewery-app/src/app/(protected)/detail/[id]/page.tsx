// src/app/detail/[id]/page.tsx

import { notFound } from "next/navigation";
import LocationIcon from "../../../../../public/icons/location-icon";
import PhoneIcon from "../../../../../public/icons/phone-icon";
import UserReview from "@/app/components/UserReview";
import DetailBtn from "@/app/components/DetailBtn";
import TransportBtn from "@/app/components/TransportBtn";

interface Brewery {
  id: string;
  name: string;
  address_1: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  phone: string | null;
  longitude: string | null;
  latitude: string | null;
}

export default async function BreweryDetail({
  params,
}: {
  params: { id: string };
}) {
  //await necesario para la v.15 de Nextjs, si no está se dispara un warnin porque en el futuro params será asíncrono
  const { id } = await params;

  //llamado a la api con el id especifico de la cerveceria
  const res = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);

  //si la respuesta falla, retorna el notFound de Nextjs
  if (!res.ok) return notFound();

  const brewery: Brewery = await res.json();

  const fakeImages = new Array(5).fill(null);

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">{brewery.name}</h2>
      <div className="flex gap-x-2 pb-4">
        <div className="flex flex-col gap-y-2 justify-center">
          <p className="flex gap-x-1">
            <LocationIcon width="24" height="24" />
            <span className="text-[14px]">
              {brewery.address_1 === null
                ? "Havre 73, Juarez, Cuauhtemoc"
                : brewery.address_1}
            </span>
          </p>
          <p className="flex gap-x-2 text-[14px]">
            <PhoneIcon />
            <span>{brewery.phone === null ? "4535-8766" : brewery.phone}</span>
          </p>
        </div>
      </div>
      <div className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory px-4 mb-6 hide-scrollbar">
        {fakeImages.map((item, i) => (
          <img
            key={i}
            src={`../imgs/detailCarruselImgs/${i + 1}.jpg`}
            alt={`Imagen ${i + 1}`}
            className="inline-block mr-2 rounded-xl w-[156px] h-[104px] object-cover snap-start shrink-0 hide-scrollbar"
          />
        ))}
      </div>
      <h2 className="text-3xl font-bold mb-8">Opiniones</h2>
      <div>
        <UserReview id={id} />
      </div>
      <div className="flex flex-col gap-y-6">
        <DetailBtn 
          breweryName={brewery.name} 
          breweryId={brewery.id} 
        />
        <TransportBtn
          id={brewery.id}
          latitude={brewery.latitude ?? "0"}
          longitude={brewery.longitude ?? "0"}
          name={brewery.name}
        />
      </div>
    </div>
  );
}
