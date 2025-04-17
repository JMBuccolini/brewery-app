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

export default function NavBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const isDetailPage = pathname.includes("/detail/");
  const isTransportPage = pathname.includes("/transport/");
  const router = useRouter();

  useEffect(() => {
    if (showNotifications) {
      const timer = setTimeout(() => setShowNotifications(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showNotifications]);
  

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
        <div className="flex flex-row flex-grow-0 px-4 py-4 gap-x-4 justify-start items-center">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="cursor-pointer"
          >
            <BellIcon />
          </button>
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
            className="absolute right-4 top-16 bg-[#1d1d3b] text-white px-4 py-2 rounded shadow-lg text-sm z-50"
          >
            No tienes notificaciones
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      </AnimatePresence>
    </>
  );
}
