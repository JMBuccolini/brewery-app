"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";


export default function ProfilePage() {
  const { token, setToken } = useAuth();
  const router = useRouter();
  //Estado para setear el usuario con el fetch de la BD si trae el token
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  //Estado para manejar el loader
  const [loading, setLoading] = useState(true);

  //Estados que manejan el formulario para editar el perfil del usuario
  const [editMode, setEditMode] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setUser({
          name: data.name || "Sin nombre",
          email: data.email,
        });
        setNameInput(data.name);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    setToken(null); // Borra token del context y localStorage
    router.push("/login");
  };

  if (loading)
    return <p className="text-white text-center">Cargando perfil...</p>;

  if (!user)
    return (
      <p className="text-red-400 text-center">No se pudo cargar el perfil</p>
    );

  return (
    <div className="text-white -mt-44">
      <h1 className="text-2xl font-bold mb-6 text-center">Mi Perfil</h1>

      <div className="flex flex-col items-center mb-6">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=13132D&color=fff`}
          alt={`Avatar de ${user.name}`}
          width={80}
          height={80}
          className="rounded-full object-cover"
        />

        <p className="mt-4 text-lg font-semibold">{user.name}</p>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>

      <div className="flex flex-col gap-y-4 px-6">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-gradient-to-r from-[#3540E8] to-[#E41AD6] rounded-[8px] text-white py-2"
          >
            Editar perfil
          </button>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              setSuccessMsg("");

              // ✅ No hay cambios: no hacer request
              if (nameInput === user.name && passwordInput === "") {
                setEditMode(false);
                setSuccessMsg("No se detectaron cambios");
                setSaving(false);
                return;
              }

              if (nameInput.trim() === "") {
                setFormError("El nombre no puede estar vacío");
                setSaving(false);
                return;
              }

              try {
                const res = await fetch("http://localhost:5000/users/update", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    name: nameInput,
                    password: passwordInput || undefined,
                  }),
                });

                if (!res.ok) throw new Error("Error al actualizar el perfil");

                setUser({ ...user, name: nameInput });
                setPasswordInput("");
                toast.success('Perfil actualizado correctamente');
                setEditMode(false);
              } catch (err) {
                alert("Hubo un error al guardar los cambios");
              } finally {
                setSaving(false);
              }
            }}
            className="flex flex-col gap-y-4"
          >
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="bg-[#1d1d3b] px-4 py-2 rounded outline-none text-white"
              placeholder="Nombre"
            />
            <input
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              type="password"
              className="bg-[#1d1d3b] px-4 py-2 rounded outline-none text-white"
              placeholder="Nueva contraseña (opcional)"
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-[#3540E8] to-[#E41AD6] rounded-[8px] text-white py-2"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setNameInput(user.name);
                setPasswordInput("");
                setFormError("");
                setSuccessMsg("");
              }}
              className="border border-gray-500 text-white rounded-[8px] py-2 hover:bg-white/10"
            >
              Cancelar
            </button>
          </form>
        )}

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
