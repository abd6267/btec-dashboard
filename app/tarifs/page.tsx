"use client";
import { useRouter } from "next/navigation";

const COLORS = {
  navy: "#0B1F3A", navyLight: "#1A3A5C",
  gold: "#C9A84C", white: "#FFFFFF",
  slate: "#64748B", slateLight: "#94A3B8",
  green: "#16A34A", gray: "#F1F5F9",
};

export default function TarifsPage() {
  const router = useRouter();
  const tarifs = [
    {
      nom: "Starter", prix: "15 000", periode: "mois",
      desc: "Idéal pour les petites entreprises",
      features: ["1 entreprise cliente", "Comptabilité de base", "Factures et ventes", "5 Go de stockage", "Support par email", "Mises à jour incluses"],
      color: COLORS.slate, recommande: false,
    },
    {
      nom: "Business", prix: "35 000", periode: "mois",
      desc: "Pour les PME et cabinets actifs",
      features: ["3 entreprises clientes", "Toutes les fonctionnalités", "Messagerie intégrée", "20 Go de stockage", "Support prioritaire", "Rapports avancés", "Suivi fiscal complet"],
      color: COLORS.gold, recommande: true,
    },
    {
      nom: "Enterprise", prix: "75 000", periode: "mois",
      desc: "Pour les grands cabinets comptables",
      features: ["Entreprises illimitées", "API disponible", "100 Go de stockage", "Manager dédié", "Formation incluse", "Personnalisation", "SLA garanti 99.9%"],
      color: COLORS.green, recommande: false,
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
        <h1 style={{ fontSize: 36, fontWeight: 900, color: COLORS.white, marginBottom: 12 }}>Nos Tarifs</h1>
        <p style={{ fontSize: 15, color: COLORS.slateLight }}>30 jours d'essai gratuit · Sans engagement · Résiliable à tout moment</p>
      </section>

      <section style={{ padding: "60px 24px", background: COLORS.gray }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {tarifs.map((t, i) => (
            <div key={i} style={{ background: t.recommande ? COLORS.navy : COLORS.white, borderRadius: 20, padding: 28, boxShadow: t.recommande ? "0 8px 32px rgba(11,31,58,0.25)" : "0 2px 8px rgba(0,0,0,0.06)", position: "relative", border: t.recommande ? "none" : "1px solid #E2E8F0" }}>
              {t.recommande && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: COLORS.gold, color: COLORS.navy, fontSize: 11, fontWeight: 800, padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" }}>⭐ PLUS POPULAIRE</div>
              )}
              <div style={{ fontSize: 18, fontWeight: 800, color: t.recommande ? COLORS.white : COLORS.navy, marginBottom: 4 }}>{t.nom}</div>
              <div style={{ fontSize: 12, color: t.recommande ? COLORS.slateLight : COLORS.slate, marginBottom: 20 }}>{t.desc}</div>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: t.recommande ? COLORS.gold : COLORS.navy }}>{t.prix}</span>
                <span style={{ fontSize: 13, color: t.recommande ? COLORS.slateLight : COLORS.slate }}> FCFA/{t.periode}</span>
              </div>
              <div style={{ borderTop: `1px solid ${t.recommande ? "rgba(255,255,255,0.1)" : "#F1F5F9"}`, paddingTop: 20, marginBottom: 20 }}>
                {t.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 13, color: t.recommande ? COLORS.slateLight : COLORS.slate }}>
                    <span style={{ color: COLORS.green, fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button onClick={() => router.push("/")} style={{ width: "100%", background: t.recommande ? COLORS.gold : COLORS.navy, color: t.recommande ? COLORS.navy : COLORS.white, border: "none", borderRadius: 10, padding: "13px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                Commencer →
              </button>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 700, margin: "40px auto 0", background: COLORS.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 16, textAlign: "center" }}>Toutes les offres incluent</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {["✅ SSL sécurisé", "✅ Sauvegardes auto", "✅ Mises à jour gratuites", "✅ Support technique", "✅ Interface responsive", "✅ Essai 30 jours"].map((f, i) => (
              <div key={i} style={{ fontSize: 13, color: COLORS.slate, padding: "8px 0" }}>{f}</div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: COLORS.navy, padding: "24px", textAlign: "center" }}>
        <div style={{ color: COLORS.slateLight, fontSize: 12 }}>© 2025 BTEC Bénin · Mènontin, Cotonou</div>
      </footer>
    </div>
  );
}