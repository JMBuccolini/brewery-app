"use client";
import { useBreweries } from "@/hooks/useBreweries";
import BreweryCarousel from "../components/BreweryCarousel";
import BreweryCard from "../components/BreweryCard";
import Snackbar from "../components/Snackbar";

export default function Home() {
  const { data: breweries, loading, error } = useBreweries();

  const onlyCalifornia = breweries.filter(
    (item) => item.state === "California"
  );

  if (loading) return <p className="text-white p-6">Cargando cervecerías...</p>;
  if (error) return <p className="text-red-400 p-6">{error}</p>;

  return (
    <div className="flex flex-col">
      <header className="w-full sm:flex justify-center">
        <Snackbar />
      </header>

      <main>
        <section className="container px-3 mx-auto pb-6">
          <h2 className="text-[32px] font-bold pb-8 pt-6">
            Todas las opciones
          </h2>
          <div className="overflow-x-auto whitespace-nowrap pr-4 pb-4 hide-scrollbar">
            <div className="block sm:hidden">
              {breweries.map((data) => (
                <BreweryCard data={data} key={data.id} hoverShadow={false} />
              ))}
            </div>
            <div className="hidden sm:block">
              <BreweryCarousel data={breweries} />
            </div>
          </div>
        </section>
        <section className="container px-3 mx-auto pb-6">
          <h2 className="text-[32px] font-bold pb-8">Opciones en California</h2>
          <div className="overflow-x-auto whitespace-nowrap pr-4 pb-4 hide-scrollbar sm:ml-14">
            {breweries &&
              onlyCalifornia.map((data) => (
                <BreweryCard data={data} key={data.id} hoverShadow={true} />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
