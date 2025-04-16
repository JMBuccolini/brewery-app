import React from "react";
import AlertIcon from "../../../public/icons/alert-icon";

export default function Snackbar() {
  return (
    <div
      className="bg-[#FEEBCB] py-[16px] px-3 text-black flex gap-3 align-items-center"
      style={{ borderLeft: "4px solid #DD6B20" }}
    >
      <span className=" flex justify-center items-center">
        <AlertIcon />
      </span>
      <div>
        <p className="font-bold">Hapy Hour</p>
        <p>16:00 - 17:00 hs MEX</p>
      </div>
    </div>
  );
}
