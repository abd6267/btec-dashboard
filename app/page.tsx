"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "admin@btec.bj" && password === "admin123") {
      router.push("/admin");
    } else if (email === "client@btec.bj" && password === "client123") {
      router.push("/dashboard");
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0B1F3A 0%, #1A3A5C 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: "#C9A84C", borderRadius: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 24, color: "#0B1F3A", marginBottom: 12 }}>B</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0B1F3A" }}>BTEC Bénin</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Plateforme Comptable & Financière</div>
        </div>

        {/* Champs */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Adresse email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="exemple@btec.bj"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }}
          />
        </div>

        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <span style={{ fontSize: 12, color: "#2563EB", cursor: "pointer", fontWeight: 600 }}>Mot de passe oublié ?</span>
        </div>

        {error && (
          <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 500 }}>
            ⚠ {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "13px", background: "#0B1F3A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 20 }}>
          Se connecter
        </button>

        {/* Comptes de test */}
        <div style={{ background: "#F7F4EE", borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", marginBottom: 8 }}>🔑 Comptes de démonstration</div>
          <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>👤 <b>Admin :</b> admin@btec.bj / admin123</div>
          <div style={{ fontSize: 12, color: "#64748B" }}>🏢 <b>Client :</b> client@btec.bj / client123</div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#94A3B8" }}>
          🔒 Connexion sécurisée SSL
        </div>
      </div>
    </div>
  );
}