'use client';

import { useKeenSlider } from 'keen-slider/react';
import { useMemo, useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import BreweryCard from './BreweryCard';
import { Brewery } from '../types/brewery';
import LeftArrow from '../../../public/icons/svgIcons/leftArrow';
import RightArrow from '../../../public/icons/svgIcons/rightArrow';

interface Props {
  data: Brewery[];
}

export default function BreweryCarousel({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  // Agrupamos por páginas de a 5
  const pages = useMemo(() => {
    const result = [];
    for (let i = 0; i < data.length; i += 4) {
      result.push(data.slice(i, i + 4));
    }
    return result;
  }, [data]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: 'snap',
    slides: {
      perView: 1,
      spacing: 8,
    },
    slideChanged(slider) {
      setCurrentPage(slider.track.details.rel);
    },
  });

  return (
    <div className="relative">
      {/* Flechas */}
      <div className="hidden md:flex justify-between items-center absolute top-[40%] w-full z-10">
        <button
          onClick={() => instanceRef.current?.prev()}
          disabled = {currentPage === 0 }
          className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"

        >
          <LeftArrow/>
        </button>
        <button
          disabled = {currentPage === pages.length - 1}
          onClick={() => instanceRef.current?.next()}
          className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"

        >
          <RightArrow/>
        </button>
      </div>

      {/* Carrusel paginado */}
      <div ref={sliderRef} className="keen-slider">
        {pages.map((group, pageIndex) => (
          <div
            className="keen-slider__slide flex py-4 px-14"
            key={`page-${pageIndex}`}
          >
            <div className="flex justify-center align-items-center">
              {group.map((brewery) => (
                <BreweryCard data={brewery} key={brewery.id} hoverShadow={false}/>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bullets por página */}
      <div className="flex justify-center mt-2 gap-x-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => instanceRef.current?.moveToIdx(i)}
            className={`w-3 h-3 cursor-pointer rounded-full transition-all ${
              currentPage === i ? 'bg-[#E41AD6]' : 'bg-gray-500/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
