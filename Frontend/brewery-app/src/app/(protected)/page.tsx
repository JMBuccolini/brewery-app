import resultsBrewery from "@/@mockapi/brews.json";
import BreweryCarousel from "../components/BreweryCarousel";
import BreweryCard from "../components/BreweryCard";
import Snackbar from "../components/Snackbar";

export default function Home() {
  const breweries = resultsBrewery?.length > 0;

  const onlyCalifornia = resultsBrewery.filter(
    (item) => item.state === "California"
  );

  return (
    <div className="flex flex-col">
      <header className="w-full">
        <Snackbar />
      </header>

      <main>
        <section className="container px-3 mx-auto pb-6">
          <h2 className="text-[32px] font-bold pb-8 pt-6">
            Todas las opciones
          </h2>
          <div className="overflow-x-auto whitespace-nowrap pr-4 pb-4 hide-scrollbar">
            <div className="block sm:hidden">
              {resultsBrewery.map((data) => (
                <BreweryCard data={data} key={data.id} />
              ))}
            </div>
          <div className="hidden sm:block">
            <BreweryCarousel data={resultsBrewery} />
          </div>
          </div>
        </section>
        <section className="container px-3 mx-auto pb-6">
          <h2 className="text-[32px] font-bold pb-8">Opciones en California</h2>
          <div className="overflow-x-auto whitespace-nowrap pr-4 pb-4 hide-scrollbar">
            {breweries &&
              onlyCalifornia.map((data) => (
                <BreweryCard data={data} key={data.id} />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
