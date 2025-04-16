"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import MenuIcon from "../../../public/icons/menu-icon";
import BellIcon from "../../../public/icons/bell-icon";
import ProfileIcon from "../../../public/icons/profile-icon";
import BackIcon from "../../../public/icons/back-icon";
import Sidebar from "./Sidebar";
import Link from "next/link";

export default function NavBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();
  const isDetailPage = pathname.includes("/detail/");

  return (
    <>
      <nav className="flex px-2 py-4 justify-content-center items-center">
        <div className="flex flex-col justify-center flex-grow pl-4">
          {isDetailPage ? (
            <Link href={"/"}>
              <BackIcon />
            </Link>
          ) : (
            <button 
            className="cursor-pointer"
            onClick={() => setShowSidebar(true)}>
              <MenuIcon />
            </button>
          )}
        </div>
        <div className="flex flex-row flex-grow-0 px-4 py-4 gap-x-4 justify-start items-center">
          <BellIcon />
          <Link href={"/profile"}>
            <ProfileIcon />
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      </AnimatePresence>
    </>
  );
}
