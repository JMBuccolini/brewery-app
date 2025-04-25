import { useEffect, useState } from 'react';
import { Brewery } from '@/app/types/brewery';

//Este hook se encarga de hacer la llamada a la API y devolver los datos, el loading y el error

export const useBreweries = () => {
  const [data, setData] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const res = await fetch('https://api.openbrewerydb.org/v1/breweries');
        if (!res.ok) throw new Error('No se pudieron cargar las cervecerías');

        const breweries: Brewery[] = await res.json();
        setData(breweries);
      } catch (err: any) {
        setError(err.message || 'Error inesperado');
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  return { data, loading, error };
};
