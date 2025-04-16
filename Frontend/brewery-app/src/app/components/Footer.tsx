import React from "react";
import CalendarIcon from "../../../public/icons/calendar-icon";
import HomeIcon from "../../../public/icons/home-icon";
import ChatIcon from "../../../public/icons/chat-icon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-between items-baseline container px-6 ">
      <div className="flex flex-col justify-center items-center ">
        <CalendarIcon />
        <p className="text-[12px]">Calendario</p>
      </div>
      <Link 
      href={'/'}
      className="flex flex-col justify-center items-center">
        <HomeIcon fill="white" />
        <p className="text-[12px]">Inicio</p>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <ChatIcon />
        <p className="text-[12px]">Chat</p>
      </div>
    </footer>
  );
}
