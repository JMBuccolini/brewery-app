'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CardBtn({ cardID }: { cardID: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push(`/detail/${cardID}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-gradient-to-r from-[#3540E8] to-[#E41AD6] rounded-[8px] text-white py-1 w-[244px] min-h-[32px] flex items-center justify-center gap-x-2 cursor-pointer"
    >
      {loading ? (
        <span className="loader border-t-transparent border-white animate-spin w-5 h-5 border-2 rounded-full"></span>
      ) : (
        "Ver Más"
      )}
    </button>
  );
}
