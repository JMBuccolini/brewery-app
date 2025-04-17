"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="text-[32px] font-bold">La sección está en construcción</h2>
      <DotLottieReact
        src="https://lottie.host/408124d3-ecb1-4112-9c95-48883dc6f60e/5fayh97Ara.lottie"
        loop
        autoplay
      />
    </div>
  );
}
