"use client";
import { useRouter } from "next/navigation";

const COLORS = {
  navy: "#0B1F3A", navyLight: "#1A3A5C",
  gold: "#C9A84C", white: "#FFFFFF",
  slate: "#64748B", slateLight: "#94A3B8", gray: "#F1F5F9",
};

export default function FonctionnalitesPage() {
  const router = useRouter();
  const sections = [
    {
      icon: "📊", titre: "Gestion Comptable", color: "#2563EB",
      items: ["Saisie des opérations comptables", "Grand livre et balance", "Bilan comptable SYSCOHADA", "Compte de résultat", "Rapprochement bancaire", "Clôture d'exercice"]
    },
    {
      icon: "💰", titre: "Gestion Financière", color: "#16A34A",
      items: ["Suivi de trésorerie en temps réel", "Gestion des créances", "Gestion des dettes", "Flux de trésorerie", "Tableaux de bord financiers", "Alertes de solde"]
    },
    {
      icon: "🛒", titre: "Gestion Commerciale", color: "#D97706",
      items: ["Création de factures", "Gestion des ventes", "Gestion des achats", "Suivi des commandes", "Gestion clients", "Gestion fournisseurs"]
    },
    {
      icon: "📁", titre: "Gestion Documentaire", color: "#7C3AED",
      items: ["Dépôt de fichiers sécurisé", "Classement par dossier", "Téléchargement rapide", "Aperçu PDF en ligne", "Historique des documents", "Recherche avancée"]
    },
    {
      icon: "💬", titre: "Collaboration Cabinet", color: "#DC2626",
      items: ["Messagerie intégrée", "Échanges en temps réel", "Pièces jointes", "Notifications push", "Historique des échanges", "Accès multi-utilisateurs"]
    },
    {
      icon: "🧾", titre: "Suivi Fiscal", color: "#0891B2",
      items: ["Gestion de la TVA", "Déclarations fiscales", "Suivi des échéances DGI", "Alertes fiscales", "Historique des déclarations", "Export des données"]
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <nav style={{ background: COLORS.navy, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: COLORS.gold, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: COLORS.navy }}>B</div>
          <span style={{ color: COLORS.white, fontWeight: 800, fontSize: 16 }}>BTEC Bénin</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span onClick={() => router.push("/vitrine")} style={{ color: COLORS.slateLight, fontSize: 13, cursor: "pointer" }}>Accueil</span>
          <button onClick={() => router.push("/")} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Connexion</button>
        </div>
      </nav>

      <section style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%)`, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: COLORS.white, marginBottom: 12 }}>Nos Fonctionnalités</h1>
        <p style={{ fontSize: 15, color: COLORS.slateLight, maxWidth: 600, margin: "0 auto" }}>Tout ce dont vous avez besoin pour gérer votre comptabilité en un seul endroit</p>
      </section>

      <section style={{ padding: "60px 24px", background: COLORS.gray }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ background: COLORS.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `4px solid ${s.color}` }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.navy, marginBottom: 16 }}>{s.titre}</div>
              {s.items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13, color: COLORS.slate }}>
                  <span style={{ color: s.color, fontWeight: 700 }}>✓</span> {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 24px", background: COLORS.navy, textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: COLORS.white, marginBottom: 16 }}>Prêt à commencer ?</h2>
        <button onClick={() => router.push("/")} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          Essai gratuit 30 jours →
        </button>
      </section>

      <footer style={{ background: COLORS.navy, padding: "24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ color: COLORS.slateLight, fontSize: 12 }}>© 2025 BTEC Bénin · Mènontin, Cotonou</div>
      </footer>
    </div>
  );
}