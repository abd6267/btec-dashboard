"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const COLORS = {
  navy: "#0B1F3A", navyLight: "#1A3A5C",
  gold: "#C9A84C", goldLight: "#E8C96A",
  cream: "#F7F4EE", white: "#FFFFFF",
  slate: "#64748B", slateLight: "#94A3B8",
  green: "#16A34A", greenLight: "#DCFCE7",
  blue: "#2563EB", blueLight: "#DBEAFE",
  gray: "#F1F5F9",
};

export default function VitrinePage() {
  const router = useRouter();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const fonctionnalites = [
    { icon: "📊", titre: "Gestion Comptable", desc: "Saisie des opérations, grand livre, balance, bilan et compte de résultat selon les normes SYSCOHADA." },
    { icon: "💰", titre: "Gestion Financière", desc: "Suivi de trésorerie, créances, dettes et flux financiers en temps réel." },
    { icon: "🛒", titre: "Gestion Commerciale", desc: "Facturation, gestion des ventes, achats, clients et fournisseurs." },
    { icon: "📁", titre: "Gestion Documentaire", desc: "Archivage sécurisé, dépôt et téléchargement de documents comptables." },
    { icon: "💬", titre: "Collaboration", desc: "Messagerie intégrée entre le cabinet et ses entreprises clientes." },
    { icon: "🧾", titre: "Suivi Fiscal", desc: "Gestion TVA, déclarations fiscales et suivi des échéances DGI." },
  ];

  const avantages = [
    { icon: "🔒", titre: "Sécurisé", desc: "Données chiffrées et accès sécurisé SSL" },
    { icon: "📱", titre: "Responsive", desc: "Accessible sur mobile, tablette et desktop" },
    { icon: "⚡", titre: "Temps réel", desc: "Données mises à jour en temps réel" },
    { icon: "🌍", titre: "Multi-entreprises", desc: "Gérez plusieurs entreprises depuis un seul espace" },
  ];

  const temoignages = [
    { nom: "Kofi Mensah", poste: "DG, SARL AKPLA Commerce", texte: "BTEC nous a permis de suivre nos finances en temps réel. Un outil indispensable !" },
    { nom: "Aminata Diallo", poste: "Comptable, BENIN TECH", texte: "Interface moderne et intuitive. Notre cabinet gagne un temps précieux." },
    { nom: "Jean Zinsou", poste: "PDG, INDUSTRIE ZINSOU", texte: "La collaboration avec notre comptable est devenue beaucoup plus fluide." },
  ];

  const tarifs = [
    { nom: "Starter", prix: "15 000", desc: "Pour les petites entreprises", features: ["1 entreprise", "Comptabilité de base", "5 Go documents", "Support email"] },
    { nom: "Business", prix: "35 000", desc: "Pour les PME", features: ["3 entreprises", "Toutes les fonctionnalités", "20 Go documents", "Messagerie incluse", "Support prioritaire"], recommande: true },
    { nom: "Enterprise", prix: "75 000", desc: "Pour les grands cabinets", features: ["Illimité", "API disponible", "100 Go documents", "Manager dédié", "Formation incluse"] },
  ];

  const faqs = [
    { q: "Comment accéder à la plateforme ?", r: "Après souscription, vous recevez vos identifiants par email pour accéder à votre espace sécurisé." },
    { q: "Mes données sont-elles sécurisées ?", r: "Oui, toutes les données sont chiffrées avec SSL et hébergées sur des serveurs sécurisés." },
    { q: "Puis-je gérer plusieurs entreprises ?", r: "Oui, selon votre abonnement vous pouvez gérer de 1 à un nombre illimité d'entreprises." },
    { q: "Y a-t-il une période d'essai ?", r: "Oui, nous offrons 30 jours d'essai gratuit sans engagement." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: COLORS.white, color: COLORS.navy }}>

      {/* NAVBAR */}
      <nav style={{ background: COLORS.navy, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: COLORS.gold, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: COLORS.navy }}>B</div>
          <span style={{ color: COLORS.white, fontWeight: 800, fontSize: 16 }}>BTEC Bénin</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <span onClick={() => router.push("/fonctionnalites")} style={{ color: COLORS.slateLight, fontSize: 13, cursor: "pointer" }}>Fonctionnalités</span>
          <span onClick={() => router.push("/tarifs")} style={{ color: COLORS.slateLight, fontSize: 13, cursor: "pointer" }}>Tarifs</span>
          <span onClick={() => router.push("/contact")} style={{ color: COLORS.slateLight, fontSize: 13, cursor: "pointer" }}>Contact</span>
          <button onClick={() => router.push("/login")} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Connexion</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%)`, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: COLORS.gold, marginBottom: 20, fontWeight: 600 }}>
            🚀 Plateforme SaaS Comptable & Financière
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: COLORS.white, lineHeight: 1.2, marginBottom: 20 }}>
            Gérez la comptabilité de vos entreprises en toute simplicité
          </h1>
          <p style={{ fontSize: 16, color: COLORS.slateLight, marginBottom: 32, lineHeight: 1.7 }}>
            BTEC Bénin est la plateforme SaaS qui permet aux cabinets comptables de gérer plusieurs entreprises clientes depuis un seul espace sécurisé.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => router.push("/login")} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
              Commencer gratuitement →
            </button>
            <button onClick={() => router.push("/login")} style={{ background: "transparent", color: COLORS.white, border: "2px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "14px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Voir la démo
            </button>
          </div>
          <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {[{ val: "500+", label: "Entreprises" }, { val: "98%", label: "Satisfaction" }, { val: "30j", label: "Essai gratuit" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.gold }}>{s.val}</div>
                <div style={{ fontSize: 12, color: COLORS.slateLight }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section id="fonctionnalites" style={{ padding: "60px 24px", background: COLORS.gray }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: COLORS.navy, marginBottom: 8 }}>Fonctionnalités principales</h2>
          <p style={{ textAlign: "center", color: COLORS.slate, marginBottom: 40, fontSize: 14 }}>Tout ce dont vous avez besoin pour gérer votre comptabilité</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {fonctionnalites.map((f, i) => (
              <div key={i} style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, marginBottom: 8 }}>{f.titre}</div>
                <div style={{ fontSize: 13, color: COLORS.slate, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section style={{ padding: "60px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: COLORS.navy, marginBottom: 40 }}>Pourquoi choisir BTEC ?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {avantages.map((a, i) => (
              <div key={i} style={{ textAlign: "center", padding: 20 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{a.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, marginBottom: 6 }}>{a.titre}</div>
                <div style={{ fontSize: 13, color: COLORS.slate }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section style={{ padding: "60px 24px", background: COLORS.gray }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: COLORS.navy, marginBottom: 40 }}>Ce que disent nos clients</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {temoignages.map((t, i) => (
              <div key={i} style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 24, color: COLORS.gold, marginBottom: 12 }}>❝</div>
                <p style={{ fontSize: 13, color: COLORS.slate, lineHeight: 1.7, marginBottom: 16 }}>{t.texte}</p>
                <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 13 }}>{t.nom}</div>
                <div style={{ fontSize: 11, color: COLORS.slateLight }}>{t.poste}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" style={{ padding: "60px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: COLORS.navy, marginBottom: 8 }}>Nos tarifs</h2>
          <p style={{ textAlign: "center", color: COLORS.slate, marginBottom: 40, fontSize: 14 }}>30 jours d'essai gratuit · Sans engagement</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {tarifs.map((t, i) => (
              <div key={i} style={{ background: t.recommande ? COLORS.navy : COLORS.white, borderRadius: 16, padding: 24, boxShadow: t.recommande ? "0 8px 24px rgba(11,31,58,0.3)" : "0 2px 8px rgba(0,0,0,0.06)", border: t.recommande ? "none" : "1px solid #E2E8F0", position: "relative" }}>
                {t.recommande && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: COLORS.gold, color: COLORS.navy, fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>⭐ RECOMMANDÉ</div>}
                <div style={{ fontSize: 16, fontWeight: 800, color: t.recommande ? COLORS.white : COLORS.navy, marginBottom: 4 }}>{t.nom}</div>
                <div style={{ fontSize: 12, color: t.recommande ? COLORS.slateLight : COLORS.slate, marginBottom: 16 }}>{t.desc}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: t.recommande ? COLORS.gold : COLORS.navy, marginBottom: 4 }}>{t.prix} <span style={{ fontSize: 13, fontWeight: 400 }}>FCFA/mois</span></div>
                <div style={{ margin: "16px 0", borderTop: `1px solid ${t.recommande ? "rgba(255,255,255,0.1)" : "#F1F5F9"}` }} />
                {t.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13, color: t.recommande ? COLORS.slateLight : COLORS.slate }}>
                    <span style={{ color: COLORS.green }}>✓</span> {f}
                  </div>
                ))}
                <button onClick={() => router.push("/login")} style={{ width: "100%", marginTop: 16, background: t.recommande ? COLORS.gold : COLORS.navy, color: t.recommande ? COLORS.navy : COLORS.white, border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  Commencer →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "60px 24px", background: COLORS.gray }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: COLORS.navy, marginBottom: 40 }}>Questions fréquentes</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: COLORS.white, borderRadius: 12, marginBottom: 10, overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
              <div onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{f.q}</span>
                <span style={{ color: COLORS.gold, fontSize: 18 }}>{faqOpen === i ? "−" : "+"}</span>
              </div>
              {faqOpen === i && (
                <div style={{ padding: "0 20px 16px", fontSize: 13, color: COLORS.slate, lineHeight: 1.7 }}>{f.r}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "60px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: COLORS.navy, marginBottom: 8 }}>Contactez-nous</h2>
          <p style={{ textAlign: "center", color: COLORS.slate, marginBottom: 40, fontSize: 14 }}>Notre équipe vous répond dans les 24h</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
            {[
              { icon: "📧", label: "Email", val: "contact@btecbenin.com" },
              { icon: "📞", label: "WhatsApp", val: "+229 01 48 55 26 07" },
              { icon: "📍", label: "Adresse", val: "Mènontin, Cotonou, Bénin" },
            ].map((c, i) => (
              <div key={i} style={{ textAlign: "center", background: COLORS.gray, borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>{c.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.navy, padding: "40px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, background: COLORS.gold, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: COLORS.navy }}>B</div>
              <span style={{ color: COLORS.white, fontWeight: 800, fontSize: 16 }}>BTEC Bénin</span>
            </div>
            <p style={{ fontSize: 12, color: COLORS.slateLight, maxWidth: 220, lineHeight: 1.7 }}>Plateforme SaaS de gestion comptable et financière pour les cabinets et entreprises du Bénin.</p>
          </div>
          <div>
            <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Liens rapides</div>
            <div onClick={() => router.push("/fonctionnalites")} style={{ color: COLORS.slateLight, fontSize: 12, marginBottom: 8, cursor: "pointer" }}>Fonctionnalités</div>
            <div onClick={() => router.push("/tarifs")} style={{ color: COLORS.slateLight, fontSize: 12, marginBottom: 8, cursor: "pointer" }}>Tarifs</div>
            <div onClick={() => router.push("/contact")} style={{ color: COLORS.slateLight, fontSize: 12, marginBottom: 8, cursor: "pointer" }}>Contact</div>
            <div onClick={() => router.push("/login")} style={{ color: COLORS.slateLight, fontSize: 12, marginBottom: 8, cursor: "pointer" }}>Connexion</div>
          </div>
          <div>
            <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Contact</div>
            <div style={{ color: COLORS.slateLight, fontSize: 12, marginBottom: 6 }}>📧 contact@btecbenin.com</div>
            <div style={{ color: COLORS.slateLight, fontSize: 12, marginBottom: 6 }}>📞 +229 01 48 55 26 07</div>
            <div style={{ color: COLORS.slateLight, fontSize: 12 }}>📍 Mènontin, Cotonou</div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 32, color: COLORS.slateLight, fontSize: 12, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
          © 2025 BTEC Bénin. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}