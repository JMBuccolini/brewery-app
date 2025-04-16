"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading]);

  if (loading || !isAuthenticated) return null; // o un loader si querés

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <NavBar />
      {children} <Footer />
    </div>
  );
}
