"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  // ── Mot de passe oublié ──────────────────────────────────────────────
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSending, setForgotSending] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = () => {
    const e = email.trim().toLowerCase();

    if (e === "admin@btec.bj" && password === "BTEC6267") {
      router.push("/admin");
    } else if (e === "client@btec.bj" && password === "client6267") {
      router.push("/dashboard");
    } else if (e === "comptable@btec.bj" && password === "Comptable6267") {
      router.push("/comptable");
    } else if (e === "assistant@btec.bj" && password === "assistant6267") {
      // Compte de démonstration. Dans la vraie plateforme, chaque comptable
      // auxiliaire a son propre email/mot de passe créé par le Comptable
      // (voir /comptable → Auxiliaires → Ajouter), puis confirmé par l'Admin.
      router.push("/auxiliaire");
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  const openForgot = () => {
    setForgotEmail(email); // pré-remplit avec l'email déjà saisi si présent
    setForgotError("");
    setForgotSent(false);
    setForgotOpen(true);
  };

  const closeForgot = () => {
    setForgotOpen(false);
    setForgotEmail("");
    setForgotError("");
    setForgotSent(false);
  };

  const handleSendReset = async () => {
    setForgotError("");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail);
    if (!forgotEmail) {
      setForgotError("Veuillez saisir votre adresse email.");
      return;
    }
    if (!emailOk) {
      setForgotError("Adresse email invalide.");
      return;
    }

    setForgotSending(true);
    try {
      // TODO: brancher sur l'API de réinitialisation, ex. POST /api/auth/forgot-password
      // Le backend doit vérifier si l'email existe, générer un token de réinitialisation
      // à durée limitée, et envoyer un email avec un lien type /reinitialiser?token=...
      // await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: forgotEmail }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 900));
      setForgotSent(true);
    } catch (e) {
      setForgotError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setForgotSending(false);
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
            <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
              placeholder="••••••••"
              style={{ width: "100%", padding: "12px 44px 12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }} />
            <button onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#64748B" }}>
              {showPwd ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <span onClick={openForgot} style={{ fontSize: 12, color: "#2563EB", cursor: "pointer", fontWeight: 600 }}>Mot de passe oublié ?</span>
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

      {/* MODAL MOT DE PASSE OUBLIÉ */}
      {forgotOpen && (
        <div onClick={closeForgot} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 380, position: "relative" }}>
            <button onClick={closeForgot} style={{ position: "absolute", top: 14, right: 14, width: 28, height: 28, borderRadius: "50%", background: "#F1F5F9", border: "none", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontWeight: 700 }}>✕</button>

            {!forgotSent ? (
              <>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#0B1F3A", marginBottom: 6 }}>🔑 Mot de passe oublié</div>
                <p style={{ fontSize: 13, color: "#64748B", marginBottom: 18, lineHeight: 1.5 }}>
                  Saisissez l'adresse email associée à votre compte. Nous vous envoyons un lien pour créer un nouveau mot de passe.
                </p>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Adresse email</label>
                <input
                  autoFocus type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSendReset(); }}
                  placeholder="exemple@btec.bj"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A", marginBottom: 14 }}
                />
                {forgotError && (
                  <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "9px 12px", borderRadius: 8, fontSize: 12, marginBottom: 14, fontWeight: 500 }}>⚠ {forgotError}</div>
                )}
                <button onClick={handleSendReset} disabled={forgotSending} style={{ width: "100%", padding: "12px", background: forgotSending ? "#94A3B8" : "#0B1F3A", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: forgotSending ? "default" : "pointer" }}>
                  {forgotSending ? "Envoi en cours..." : "Envoyer le lien"}
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "6px 0" }}>
                <div style={{ width: 56, height: 56, background: "#DCFCE7", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16 }}>✓</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#0B1F3A", marginBottom: 8 }}>Email envoyé</div>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 20 }}>
                  Si un compte existe pour <strong style={{ color: "#0B1F3A" }}>{forgotEmail}</strong>, un lien de réinitialisation vient d'être envoyé. Vérifiez votre boîte de réception (et vos spams).
                </p>
                <button onClick={closeForgot} style={{ width: "100%", padding: "12px", background: "#0B1F3A", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}