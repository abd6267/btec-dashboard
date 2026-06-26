"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/vitrine");
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0B1F3A", color: "white", fontFamily: "sans-serif" }}>
      Chargement...
    </div>
  );
}