"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SECTEURS = [
  "Commerce / Distribution",
  "Services",
  "BTP / Construction",
  "Industrie / Production",
  "Transport / Logistique",
  "Agriculture / Agroalimentaire",
  "Technologies / Digital",
  "Santé",
  "Éducation",
  "Autre",
];

export default function InscriptionPage() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [secteur, setSecteur] = useState(SECTEURS[0]);
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInscription = async () => {
    setError("");

    if (!nom || !entreprise || !telephone || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: brancher sur l'API d'inscription, ex. POST /api/inscriptions
      // Le backend doit créer un enregistrement avec statut "en_attente"
      // (table demandes_inscription dans Postgres / Prisma) et notifier le cabinet.
      // await fetch("/api/inscriptions", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ nom, entreprise, secteur, telephone, email, password, message }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (e) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Écran de confirmation après envoi de la demande ──────────────────
  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0B1F3A 0%, #1A3A5C 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", padding: 16 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "#DCFCE7", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 20 }}>✓</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#0B1F3A", marginBottom: 10 }}>Demande envoyée avec succès</div>
          <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 22 }}>
            Merci {nom.split(" ")[0] || ""} ! Votre demande d'inscription pour <strong style={{ color: "#0B1F3A" }}>{entreprise}</strong> a bien été reçue.
            <br /><br />
            Le cabinet BTEC Bénin va examiner votre dossier et vous contactera par téléphone ou email dans les <strong>24 à 48h</strong> pour finaliser l'activation de votre compte.
          </p>
          <div style={{ background: "#F7F4EE", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: "#0B1F3A", marginBottom: 22, textAlign: "left" }}>
            📌 Vous recevrez un email de confirmation à <strong>{email}</strong> dès que votre compte sera activé.
          </div>
          <button onClick={() => router.push("/vitrine")} style={{ width: "100%", padding: "13px", background: "#0B1F3A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>
            Retour à l'accueil
          </button>
          <div style={{ fontSize: 13, color: "#64748B" }}>
            Une question ?{" "}
            <span onClick={() => router.push("/contact")} style={{ color: "#2563EB", fontWeight: 700, cursor: "pointer" }}>
              Contactez le cabinet
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0B1F3A 0%, #1A3A5C 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", position: "relative" }}>

        {/* Bouton fermer */}
        <button onClick={() => router.push("/vitrine")} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "#F1F5F9", border: "none", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontWeight: 700 }}>✕</button>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ width: 56, height: 56, background: "#C9A84C", borderRadius: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 24, color: "#0B1F3A", marginBottom: 12 }}>B</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0B1F3A" }}>BTEC Bénin</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Demande d'inscription — Espace client</div>
        </div>

        <div style={{ background: "#EFF6FF", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#1E3A8A", marginBottom: 22 }}>
          ℹ️ Votre demande sera examinée par le cabinet avant l'activation de votre accès au dashboard.
        </div>

        {/* Nom complet */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Nom complet *</label>
          <input type="text" value={nom} onChange={e => setNom(e.target.value)} placeholder="Ex : Jean Kouassi"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }} />
        </div>

        {/* Entreprise */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Entreprise *</label>
          <input type="text" value={entreprise} onChange={e => setEntreprise(e.target.value)} placeholder="Nom de votre structure"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }} />
        </div>

        {/* Secteur + Téléphone */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Secteur d'activité</label>
            <select value={secteur} onChange={e => setSecteur(e.target.value)}
              style={{ width: "100%", padding: "12px 10px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", boxSizing: "border-box", color: "#0B1F3A", background: "#fff" }}>
              {SECTEURS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Téléphone *</label>
            <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="+229 XX XX XX XX"
              style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }} />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Adresse email *</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="exemple@btec.bj"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }} />
        </div>

        {/* Mot de passe + œil */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Mot de passe *</label>
          <div style={{ position: "relative" }}>
            <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="6 caractères minimum"
              style={{ width: "100%", padding: "12px 44px 12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }} />
            <button onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#64748B" }}>
              {showPwd ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {/* Confirmation mot de passe + œil */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Confirmer le mot de passe *</label>
          <div style={{ position: "relative" }}>
            <input type={showConfirmPwd ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••"
              style={{ width: "100%", padding: "12px 44px 12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A" }} />
            <button onClick={() => setShowConfirmPwd(!showConfirmPwd)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#64748B" }}>
              {showConfirmPwd ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {/* Message optionnel */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0B1F3A", display: "block", marginBottom: 6 }}>Message (optionnel)</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Précisez vos besoins comptables si vous le souhaitez..."
            rows={3}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", color: "#0B1F3A", resize: "vertical", fontFamily: "inherit" }} />
        </div>

        {error && (
          <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 500 }}>⚠ {error}</div>
        )}

        <button onClick={handleInscription} disabled={submitting} style={{ width: "100%", padding: "13px", background: submitting ? "#94A3B8" : "#0B1F3A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: submitting ? "default" : "pointer", marginBottom: 16 }}>
          {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
        </button>

        {/* Lien retour vers Connexion */}
        <div style={{ textAlign: "center", fontSize: 13, color: "#64748B", marginBottom: 16 }}>
          Déjà un compte actif ?{" "}
          <span
            onClick={() => router.push("/login")}
            style={{ color: "#2563EB", fontWeight: 700, cursor: "pointer" }}
          >
            Se connecter
          </span>
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: "#94A3B8" }}>🔒 Connexion sécurisée SSL</div>
      </div>
    </div>
  );
}