'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Sidebar({ onClose }: { onClose: () => void }) {
  
  const {token, setToken} = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setToken(null); // Borra token del context y localStorage
    router.push("/login");
  };
  
  return (
    <motion.div
      className="fixed inset-0 bg-opacity-50 z-50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#13132D] w-[240px] h-full p-6"
        initial={{ x: -240 }}
        animate={{ x: 0 }}
        exit={{ x: -240 }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <button onClick={onClose} className="text-white text-right w-full mb-6">
          ✖
        </button>
        <ul className="flex flex-col gap-y-4 text-white pl-6">
          <li>
            <Link href="/profile" onClick={onClose} className="hover:underline">
              Ir a Perfil
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                handleLogout()
                onClose();
              }}
              className="hover:underline"
            >
              Logout
            </button>
          </li>
          <li>
            <Link href="/" onClick={onClose} className="hover:underline">
              Ir a Home
            </Link>
          </li>
        </ul>
      </motion.div>
      <div className="flex-1" onClick={onClose}></div>
    </motion.div>
  );
}
