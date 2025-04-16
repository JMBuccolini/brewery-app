'use client';

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  // Simulamos un usuario mock por ahora
  const user = {
    name: "Lucía Fernández",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "lucia.fernandez@mail.com"
  };

  const handleLogout = () => {
    console.log("Logout...");
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Mi Perfil</h1>

      <div className="flex flex-col items-center mb-6">
        <img
          src={user.avatar}
          alt="Avatar"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <p className="mt-4 text-lg font-semibold">{user.name}</p>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>

      <div className="flex flex-col gap-y-4">
        <button className="bg-gradient-to-r from-[#3540E8] to-[#E41AD6] rounded-[8px] text-white py-2">
          Editar perfil
        </button>
        <button
          onClick={handleLogout}
          className="border border-[#E41AD6] rounded-[8px] text-white py-2 hover:bg-[#E41AD6]/10"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
