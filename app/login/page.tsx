"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "admin@btec.bj" && password === "BTEC6267") {
      router.push("/admin");
    } else if (email === "client@btec.bj" && password === "client6267") {
      router.push("/dashboard");
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0B1F3A 0%, #1A3A5C 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", position: "relative" }}>

        {/* Bouton fermer */}
        <button onClick={() => router.push("/vitrine")} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "#F1F5F9", border: "none", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontWeight: 700 }}>✕</button>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: "#C9A84C", borderRadius: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 24, color: "#0B1F3A", marginBottom: 12 }}>B</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0B1F3A" }}>BTEC Bénin</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Plateforme Comptable & Financière</div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Adresse email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="exemple@btec.bj"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }} />
        </div>

        {/* Mot de passe + œil */}
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Mot de passe</label>
          <div style={{ position: "relative" }}>
            <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width: "100%", padding: "12px 44px 12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }} />
            <button onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#64748B" }}>
              {showPwd ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <span style={{ fontSize: 12, color: "#2563EB", cursor: "pointer", fontWeight: 600 }}>Mot de passe oublié ?</span>
        </div>

        {error && (
          <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 500 }}>⚠ {error}</div>
        )}

        <button onClick={handleLogin} style={{ width: "100%", padding: "13px", background: "#0B1F3A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>
          Se connecter
        </button>

        {/* Lien Inscription */}
        <div style={{ textAlign: "center", fontSize: 13, color: "#64748B", marginBottom: 16 }}>
          Pas encore de compte ?{" "}
          <span
            onClick={() => router.push("/inscription")}
            style={{ color: "#2563EB", fontWeight: 700, cursor: "pointer" }}
          >
            S'inscrire
          </span>
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: "#94A3B8" }}>🔒 Connexion sécurisée SSL</div>
      </div>
    </div>
  );
}