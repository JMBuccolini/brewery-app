"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const { setToken } = useAuth();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (name && name.length < 2) {
      setNameError("El nombre debe tener al menos 2 letras");
    } else {
      setNameError("");
    }

    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("El email no es válido");
    } else {
      setEmailError("");
    }

    if (password && password.length < 6) {
      setPasswordError("Mínimo 6 caracteres");
    } else {
      setPasswordError("");
    }
  }, [name, email, password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (nameError || emailError || passwordError) {
      toast.error("Corregí los errores antes de continuar");
      return;
    }

    if (name === "" || email === "" || password === "") {
      toast.error("Todos los campos deben estar completos");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al registrarse");

      const loginRes = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.message);

      toast.success("Usuario creado correctamente");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-white"
    >
      <div className="min-h-screen flex flex-col justify-center">
        <div className="text-white container mx-auto px-8 sm:max-w-[400px]">
          <div className="flex">
            <Image
              src="/imgs/beer-53.png"
              alt="Logo"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h2 className="text-4xl font-bold pt-6">Brewery App</h2>
          </div>
          <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-y-4">
            <div>
              <input
                type="text"
                placeholder="Nombre"
                className="bg-[#1d1d3b] px-4 py-2 rounded w-full outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <p className="text-sm text-red-400 mt-1">{nameError}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="bg-[#1d1d3b] px-4 py-2 rounded w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-sm text-red-400 mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="bg-[#1d1d3b] px-4 py-2 rounded w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-sm text-red-400 mt-1">{passwordError}</p>
              )}
            </div>

            {formError && (
              <p className="text-red-500 text-sm text-center">{formError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer bg-gradient-to-r from-[#3540E8] to-[#E41AD6] py-2 rounded text-white flex justify-center items-center gap-x-2"
            >
              {loading ? (
                <span className="border-2 border-t-transparent border-white animate-spin w-5 h-5 rounded-full" />
              ) : (
                "Registrarse"
              )}
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-gray-400">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="text-[#E41AD6] hover:underline">
              Ingresá
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
