"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import MenuIcon from "../../../public/icons/menu-icon";
import BellIcon from "../../../public/icons/bell-icon";
import ProfileIcon from "../../../public/icons/profile-icon";
import BackIcon from "../../../public/icons/back-icon";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserReservations } from "@/hooks/useUserReservations";

export default function NavBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPing, setShowPing] = useState(false);
  const pathname = usePathname();
  const isDetailPage = pathname.includes("/detail/");
  const isTransportPage = pathname.includes("/transport/");
  const router = useRouter();

  const { events, loading } = useUserReservations();

  useEffect(() => {
    if (showNotifications) {
      const timer = setTimeout(() => setShowNotifications(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotifications]);

  useEffect(() => {
    if (!loading && events.length > 0) {
      setShowPing(true);
      const timer = setTimeout(() => setShowPing(false), 4000); // ~3 pulsos de ping (0.5s x 3)
      return () => clearTimeout(timer);
    }
  }, [events, loading]);

  return (
    <>
      <nav className="flex px-2 py-4 justify-content-center items-center">
        <div className="flex flex-col justify-center flex-grow pl-4">
          {isDetailPage ? (
            <Link href={"/"}>
              <BackIcon />
            </Link>
          ) : isTransportPage ? (
            <button onClick={() => router.back()} className="cursor-pointer">
              <BackIcon />
            </button>
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => setShowSidebar(true)}
            >
              <MenuIcon />
            </button>
          )}
        </div>
        <div className="flex flex-row flex-grow-0 px-4 py-4 gap-x-4 justify-start items-start">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`cursor-pointer transition-colors ${
                !loading && events.length > 0 ? "text-[#E41AD6]" : "text-white"
              }`}
            >
              <BellIcon />
            </button>
            {!loading && events.length > 0 && showPing && (
              <>
                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-pink-500 animate-ping" />
              </>
            )}
          </div>
          <Link href={"/profile"}>
            <ProfileIcon />
          </Link>
        </div>
      </nav>
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 top-16 bg-[#1d1d3b] text-white px-4 py-3 rounded shadow-lg text-sm z-50 w-[260px]"
          >
            {loading ? (
              <p>Cargando notificaciones...</p>
            ) : events.length === 0 ? (
              <p>No tenés notificaciones.</p>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-pink-400">
                  Tus próximas reservas:
                </p>
                {events.slice(0, 3).map((e) => (
                  <div key={e.id} className="border-b border-white/10 pb-1">
                    <p className="text-sm">{e.title}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(e.start).toLocaleDateString("es-AR", {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                      })}{" "}
                      - {e.time}
                    </p>
                  </div>
                ))}
                {events.length > 3 && (
                  <p className="text-xs text-right text-gray-300 italic">
                    +{events.length - 3} más
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      </AnimatePresence>
    </>
  );
}
