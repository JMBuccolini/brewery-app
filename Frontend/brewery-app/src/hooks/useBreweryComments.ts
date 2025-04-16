'use client'

import { useMemo } from "react";
import { commentsSet } from "@/@mockapi/commentsSet.js";

//Esta funcion hash genera un indice aleatorio para simular comentarios diferentes para cada cerveceria
function hashStringToIndex(str: string, max: number) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
}

export function useBreweryComments(breweryId: string) {
  const comments = useMemo(() => {
    const index = hashStringToIndex(breweryId, commentsSet.length);
    return commentsSet[index];
  }, [breweryId]);

  return comments;
}

