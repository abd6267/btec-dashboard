"use client";
import { useRouter } from "next/navigation";

const COLORS = {
  navy: "#0B1F3A", navyLight: "#1A3A5C",
  gold: "#C9A84C", cream: "#F7F4EE", white: "#FFFFFF",
  slate: "#64748B", slateLight: "#94A3B8", gray: "#F1F5F9",
};

export default function AProposPage() {
  const router = useRouter();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* NAVBAR */}
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

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%)`, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: COLORS.white, marginBottom: 12 }}>À Propos de BTEC Bénin</h1>
        <p style={{ fontSize: 15, color: COLORS.slateLight, maxWidth: 600, margin: "0 auto" }}>
          Un cabinet comptable moderne au service des entreprises béninoises
        </p>
      </section>

      {/* PRÉSENTATION */}
      <section style={{ padding: "60px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: COLORS.navy, marginBottom: 16 }}>Notre Cabinet</h2>
              <p style={{ fontSize: 14, color: COLORS.slate, lineHeight: 1.8, marginBottom: 16 }}>
                BTEC Bénin est un cabinet d'expertise comptable basé à Mènontin, Cotonou. Nous accompagnons les entreprises béninoises dans leur gestion comptable, financière et fiscale depuis plusieurs années.
              </p>
              <p style={{ fontSize: 14, color: COLORS.slate, lineHeight: 1.8 }}>
                Notre plateforme SaaS permet à nos clients d'accéder à leurs données financières en temps réel, où qu'ils soient.
              </p>
            </div>
            <div style={{ background: COLORS.gray, borderRadius: 16, padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🏢</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.navy }}>BTEC Bénin</div>
              <div style={{ fontSize: 13, color: COLORS.slate, marginTop: 8 }}>Cabinet d'Expertise Comptable</div>
              <div style={{ fontSize: 13, color: COLORS.slate }}>Mènontin, Cotonou</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALEURS */}
      <section style={{ padding: "60px 24px", background: COLORS.gray }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: COLORS.navy, marginBottom: 40 }}>Notre ADN</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { icon: "🎯", titre: "Mission", desc: "Accompagner les entreprises béninoises dans leur gestion comptable et financière grâce à des outils modernes et accessibles." },
              { icon: "🔭", titre: "Vision", desc: "Devenir la référence des plateformes SaaS comptables en Afrique de l'Ouest d'ici 2030." },
              { icon: "💎", titre: "Valeurs", desc: "Professionnalisme, Transparence, Innovation, Proximité et Confidentialité sont au cœur de notre démarche." },
            ].map((item, i) => (
              <div key={i} style={{ background: COLORS.white, borderRadius: 14, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `3px solid ${COLORS.gold}` }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 10 }}>{item.titre}</div>
                <div style={{ fontSize: 13, color: COLORS.slate, lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section style={{ padding: "60px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: COLORS.navy, marginBottom: 40 }}>Notre Équipe</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { nom: "Moumouni Nabil", poste: "Comptable Principal", initial: "M" },
              { nom: "Adjobo Sylvie", poste: "Experte Fiscale", initial: "A" },
              { nom: "Koffi Jean", poste: "Analyste Financier", initial: "K" },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: "center", background: COLORS.gray, borderRadius: 14, padding: 24 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 24, color: COLORS.gold, margin: "0 auto 12px" }}>{p.initial}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy }}>{p.nom}</div>
                <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 4 }}>{p.poste}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.navy, padding: "24px", textAlign: "center" }}>
        <div style={{ color: COLORS.slateLight, fontSize: 12 }}>© 2025 BTEC Bénin · Mènontin, Cotonou</div>
      </footer>
    </div>
  );
}