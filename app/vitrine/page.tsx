"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const C = {
  navy:      "#0B1F3A",
  navyLight: "#1A3A5C",
  gold:      "#C9A84C",
  goldLight: "rgba(201,168,76,0.12)",
  cream:     "#F7F4EE",
  snow:      "#FFFFFF",
  slate:     "#64748B",
  mist:      "#94A3B8",
  border:    "rgba(255,255,255,0.10)",
  green:     "#16A34A",
  greenLight:"#DCFCE7",
};

export default function VitrinePage() {
  const router = useRouter();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [envoye, setEnvoye] = useState(false);

  const fonctionnalites = [
    { icon: "📊", titre: "Gestion Comptable", desc: "Saisie des opérations, grand livre, balance, bilan selon SYSCOHADA." },
    { icon: "💰", titre: "Gestion Financière", desc: "Suivi de trésorerie, créances, dettes et flux financiers en temps réel." },
    { icon: "🛒", titre: "Gestion Commerciale", desc: "Facturation, gestion des ventes, achats, clients et fournisseurs." },
    { icon: "📁", titre: "Gestion Documentaire", desc: "Archivage sécurisé, dépôt et téléchargement de documents." },
    { icon: "💬", titre: "Collaboration", desc: "Messagerie intégrée entre le cabinet et ses entreprises clientes." },
    { icon: "🧾", titre: "Suivi Fiscal", desc: "Gestion TVA, déclarations fiscales et suivi des échéances DGI." },
  ];

  const avantages = [
    { icon: "🔒", titre: "Sécurisé", desc: "Données chiffrées SSL" },
    { icon: "📱", titre: "Responsive", desc: "Mobile, tablette, desktop" },
    { icon: "⚡", titre: "Temps réel", desc: "Données en direct" },
    { icon: "🌍", titre: "Multi-entreprises", desc: "Plusieurs entreprises" },
  ];

  const temoignages = [
    { nom: "Kofi Mensah", poste: "DG, SARL AKPLA Commerce", texte: "BTEC nous a permis de suivre nos finances en temps réel. Un outil indispensable !" },
    { nom: "Aminata Diallo", poste: "Comptable, BENIN TECH", texte: "Interface moderne et intuitive. Notre cabinet gagne un temps précieux." },
    { nom: "Jean Zinsou", poste: "PDG, INDUSTRIE ZINSOU", texte: "La collaboration avec notre comptable est devenue beaucoup plus fluide." },
  ];

  const tarifs = [
    { nom: "Starter", prix: "15 000", desc: "Petites entreprises", features: ["1 entreprise", "Comptabilité de base", "5 Go documents", "Support email"], recommande: false },
    { nom: "Business", prix: "35 000", desc: "PME et cabinets actifs", features: ["3 entreprises", "Toutes les fonctionnalités", "20 Go documents", "Messagerie incluse", "Support prioritaire"], recommande: true },
    { nom: "Enterprise", prix: "75 000", desc: "Grands cabinets", features: ["Illimité", "API disponible", "100 Go documents", "Manager dédié", "Formation incluse"], recommande: false },
  ];

  const faqs = [
    { q: "Comment accéder à la plateforme ?", r: "Après souscription, vous recevez vos identifiants par email." },
    { q: "Mes données sont-elles sécurisées ?", r: "Oui, toutes les données sont chiffrées avec SSL." },
    { q: "Puis-je gérer plusieurs entreprises ?", r: "Oui, selon votre abonnement de 1 à illimité." },
    { q: "Y a-t-il une période d'essai ?", r: "Oui, 30 jours d'essai gratuit sans engagement." },
  ];

  const inputSt: React.CSSProperties = {
    padding: "12px 14px", borderRadius: 10,
    border: "1.5px solid rgba(255,255,255,0.15)", fontSize: 13,
    outline: "none", background: "rgba(255,255,255,0.08)",
    color: C.snow, width: "100%", boxSizing: "border-box",
  };

  const sectionDark: React.CSSProperties = { padding: "72px 24px", background: C.navy };
  const sectionMid: React.CSSProperties  = { padding: "72px 24px", background: C.navyLight };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: C.navy, color: C.snow }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        background: C.navy, borderBottom: `1px solid ${C.border}`,
        padding: "0 32px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: C.gold, borderRadius: 9,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 18, color: C.navy,
          }}>B</div>
          <span style={{ color: C.snow, fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em" }}>BTEC COMPTA</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {[
            { label: "Fonctionnalités", path: "/fonctionnalites" },
            { label: "Tarifs", path: "/tarifs" },
            { label: "Contact", path: "/contact" },
            { label: "À Propos", path: "/apropos" },
          ].map((item, i) => (
            <span key={i} onClick={() => router.push(item.path)}
              style={{ color: C.mist, fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
              {item.label}
            </span>
          ))}
          <button onClick={() => router.push("/login")} style={{
            background: C.gold, color: C.navy, border: "none",
            borderRadius: 8, padding: "9px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}>Connexion</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, #0F2D4A 60%, #0B3060 100%)`,
        padding: "90px 24px 80px", textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: C.goldLight, border: `1px solid rgba(201,168,76,0.35)`,
            borderRadius: 20, padding: "6px 16px", fontSize: 12,
            color: C.gold, marginBottom: 24, fontWeight: 700,
          }}>
            🚀 Plateforme SaaS Comptable & Financière
          </div>

          <h1 style={{
            fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900,
            color: C.snow, lineHeight: 1.15, marginBottom: 20,
            letterSpacing: "-0.03em",
          }}>
            Nous gérons la comptabilité<br />
            de nos entreprises clientes<br />
            <span style={{ color: C.gold }}>en toute simplicité</span>
          </h1>

          <p style={{ fontSize: 16, color: C.mist, marginBottom: 36, lineHeight: 1.75, maxWidth: 600, margin: "0 auto 36px" }}>
            BTEC Compta est la plateforme dédiée au Département Comptabilité du Cabinet BTEC Bénin.
            Elle centralise, en un seul espace sécurisé, la gestion comptable de l'ensemble de notre portefeuille d'entreprises clientes.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => router.push("/login")} style={{
              background: C.gold, color: C.navy, border: "none",
              borderRadius: 10, padding: "15px 32px", fontWeight: 800,
              fontSize: 15, cursor: "pointer",
              boxShadow: `0 4px 20px rgba(201,168,76,0.35)`,
            }}>
              Commencer gratuitement →
            </button>
            <button onClick={() => router.push("/login")} style={{
              background: "transparent", color: C.snow,
              border: "2px solid rgba(255,255,255,0.25)",
              borderRadius: 10, padding: "15px 32px", fontWeight: 700,
              fontSize: 15, cursor: "pointer",
            }}>
              Voir la démo
            </button>
          </div>

          <div style={{ marginTop: 56, display: "flex",  gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
            {[{ val: "500+", label: "Entreprises" }, { val: "98%", label: "Satisfaction" }, { val: "30j", label: "Essai gratuit" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: C.gold, letterSpacing: "-0.03em" }}>{s.val}</div>
                <div style={{ fontSize: 12, color: C.mist, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRÉSENTATION ── */}
      <section style={sectionDark}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Notre plateforme</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.snow, margin: 0 }}>Une solution complète pour les cabinets modernes</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: C.snow, marginBottom: 14 }}>Pourquoi BTEC Bénin ?</h3>
              <p style={{ fontSize: 14, color: C.mist, lineHeight: 1.8, marginBottom: 14 }}>
                Conçue spécialement pour les cabinets comptables et leurs entreprises clientes au Bénin et en Afrique de l'Ouest.
              </p>
              <p style={{ fontSize: 14, color: C.mist, lineHeight: 1.8, marginBottom: 22 }}>
                Notre système multi-entreprises permet de gérer la comptabilité de plusieurs clients depuis un seul tableau de bord centralisé.
              </p>
              {["Accès sécurisé 24h/24 et 7j/7", "Interface intuitive et moderne", "Conformité aux normes SYSCOHADA", "Support technique dédié"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: C.goldLight, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 11, color: C.gold, fontWeight: 900, flexShrink: 0,
                  }}>✓</span>
                  <span style={{ fontSize: 14, color: C.mist }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: "🏢", val: "500+", label: "Entreprises" },
                { icon: "👨‍💼", val: "50+", label: "Cabinets" },
                { icon: "📊", val: "10k+", label: "Rapports" },
                { icon: "⭐", val: "98%", label: "Satisfaction" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: C.navyLight, borderRadius: 14, padding: 20,
                  textAlign: "center", border: `1px solid ${C.border}`,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: C.gold }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: C.mist }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ── */}
      <section style={sectionMid}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Fonctionnalités</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.snow, margin: 0 }}>Tout ce dont vous avez besoin en un seul endroit</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {fonctionnalites.map((f, i) => (
              <div key={i} style={{
                background: C.navy, borderRadius: 14, padding: 22,
                border: `1px solid ${C.border}`,
                borderTop: `3px solid ${C.gold}`,
              }}>
                <div style={{ fontSize: 30, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.snow, marginBottom: 8 }}>{f.titre}</div>
                <div style={{ fontSize: 13, color: C.mist, lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button onClick={() => router.push("/fonctionnalites")} style={{
              background: C.gold, color: C.navy, border: "none",
              borderRadius: 10, padding: "12px 26px", fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}>
              Voir toutes les fonctionnalités →
            </button>
          </div>
        </div>
      </section>

      {/* ── AVANTAGES ── */}
      <section style={sectionDark}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Nos atouts</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.snow, margin: 0 }}>Pourquoi choisir BTEC ?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {avantages.map((a, i) => (
              <div key={i} style={{
                textAlign: "center", padding: 24,
                background: C.goldLight, borderRadius: 14,
                border: `1px solid rgba(201,168,76,0.25)`,
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{a.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.snow, marginBottom: 6 }}>{a.titre}</div>
                <div style={{ fontSize: 13, color: C.mist }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section style={sectionMid}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Témoignages</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.snow, margin: 0 }}>Ce que disent nos clients</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {temoignages.map((t, i) => (
              <div key={i} style={{
                background: C.navy, borderRadius: 14, padding: 22,
                border: `1px solid ${C.border}`,
              }}>
                <div style={{ fontSize: 28, color: C.gold, marginBottom: 12, fontWeight: 900 }}>❝</div>
                <p style={{ fontSize: 13, color: C.mist, lineHeight: 1.75, marginBottom: 16 }}>{t.texte}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: C.gold, display: "flex", alignItems: "center",
                    justifyContent: "center", color: C.navy, fontWeight: 800, fontSize: 14, flexShrink: 0,
                  }}>{t.nom[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.snow, fontSize: 13 }}>{t.nom}</div>
                    <div style={{ fontSize: 11, color: C.mist }}>{t.poste}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section style={sectionDark}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Tarification</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.snow, marginBottom: 6 }}>Nos tarifs</h2>
            <p style={{ fontSize: 14, color: C.mist, margin: 0 }}>30 jours d'essai gratuit · Sans engagement</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {tarifs.map((t, i) => (
              <div key={i} style={{
                background: t.recommande ? C.gold : C.navyLight,
                borderRadius: 16, padding: 28,
                boxShadow: t.recommande ? "0 12px 40px rgba(201,168,76,0.30)" : "0 2px 8px rgba(0,0,0,0.2)",
                border: t.recommande ? "none" : `1px solid ${C.border}`,
                position: "relative",
              }}>
                {t.recommande && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: C.snow, color: C.navy, fontSize: 11, fontWeight: 800,
                    padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap",
                  }}>⭐ RECOMMANDÉ</div>
                )}
                <div style={{ fontSize: 16, fontWeight: 800, color: t.recommande ? C.navy : C.snow, marginBottom: 4 }}>{t.nom}</div>
                <div style={{ fontSize: 12, color: t.recommande ? "rgba(11,31,58,0.65)" : C.mist, marginBottom: 18 }}>{t.desc}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: t.recommande ? C.navy : C.gold, marginBottom: 18 }}>
                  {t.prix} <span style={{ fontSize: 13, fontWeight: 400 }}>FCFA/mois</span>
                </div>
                {t.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9, fontSize: 13, color: t.recommande ? C.navy : C.mist }}>
                    <span style={{ fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
                <button onClick={() => router.push("/login")} style={{
                  width: "100%", marginTop: 20,
                  background: t.recommande ? C.navy : C.gold,
                  color: t.recommande ? C.snow : C.navy,
                  border: "none", borderRadius: 10, padding: "13px",
                  fontWeight: 800, fontSize: 14, cursor: "pointer",
                }}>
                  Commencer →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={sectionMid}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>FAQ</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.snow, margin: 0 }}>Questions fréquentes</h2>
          </div>
          {faqs.map((f, i) => (
            <div key={i} style={{
              background: C.navy, borderRadius: 12, marginBottom: 10,
              overflow: "hidden", border: `1px solid ${C.border}`,
            }}>
              <div onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                padding: "16px 20px", display: "flex", justifyContent: "space-between",
                alignItems: "center", cursor: "pointer",
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.snow }}>{f.q}</span>
                <span style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: faqOpen === i ? C.gold : C.goldLight,
                  color: faqOpen === i ? C.navy : C.gold,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 700, flexShrink: 0,
                }}>
                  {faqOpen === i ? "−" : "+"}
                </span>
              </div>
              {faqOpen === i && (
                <div style={{ padding: "0 20px 16px", fontSize: 13, color: C.mist, lineHeight: 1.75 }}>{f.r}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={sectionDark}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Contact</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.snow, marginBottom: 6 }}>Contactez-nous</h2>
            <p style={{ fontSize: 14, color: C.mist, margin: 0 }}>Notre équipe vous répond dans les 24h</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 32 }}>
            {[
              { icon: "📧", label: "Email", val: "contact@btecbenin.com" },
              { icon: "📞", label: "WhatsApp", val: "+229 01 48 55 26 07" },
              { icon: "📍", label: "Adresse", val: "Mènontin, Cotonou" },
            ].map((c, i) => (
              <div key={i} style={{
                textAlign: "center", background: C.goldLight,
                borderRadius: 12, padding: 16, border: "1px solid rgba(201,168,76,0.25)",
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
                <div style={{ fontSize: 11, color: C.mist, marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.snow }}>{c.val}</div>
              </div>
            ))}
          </div>
          {envoye ? (
            <div style={{
              textAlign: "center", padding: "48px 0",
              background: C.navyLight, borderRadius: 14,
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.snow }}>Message envoyé !</div>
              <div style={{ fontSize: 13, color: C.mist, marginTop: 8 }}>Nous vous répondrons dans les 24 heures.</div>
            </div>
          ) : (
            <div style={{ background: C.navyLight, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Votre nom" style={inputSt} />
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Votre email" style={inputSt} />
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Votre message..." rows={4} style={{ ...inputSt, resize: "none" }} />
                <button onClick={() => { if (form.nom && form.email && form.message) setEnvoye(true); }} style={{
                  background: C.gold, color: C.navy, border: "none",
                  borderRadius: 10, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer",
                }}>
                  Envoyer le message
                </button>
                <a href="https://wa.me/22901485526" style={{
                  display: "block", textAlign: "center", background: "#25D366",
                  color: C.snow, borderRadius: 10, padding: "13px",
                  fontWeight: 700, fontSize: 14, textDecoration: "none",
                }}>
                  💬 Contacter via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#060F1C", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 36, height: 36, background: C.gold, borderRadius: 9,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 18, color: C.navy,
              }}>B</div>
              <span style={{ color: C.snow, fontWeight: 800, fontSize: 16 }}>BTEC Bénin</span>
            </div>
            <p style={{ fontSize: 12, color: C.mist, maxWidth: 220, lineHeight: 1.75 }}>
              Plateforme SaaS de gestion comptable et financière pour les cabinets du Bénin.
            </p>
          </div>
          <div>
            <div style={{ color: C.snow, fontWeight: 700, fontSize: 13, marginBottom: 14 }}>Liens rapides</div>
            {[
              { label: "Fonctionnalités", path: "/fonctionnalites" },
              { label: "Tarifs", path: "/tarifs" },
              { label: "Contact", path: "/contact" },
              { label: "À Propos", path: "/apropos" },
              { label: "Connexion", path: "/login" },
            ].map((l, i) => (
              <div key={i} onClick={() => router.push(l.path)}
                style={{ color: C.mist, fontSize: 12, marginBottom: 9, cursor: "pointer" }}>{l.label}</div>
            ))}
          </div>
          <div>
            <div style={{ color: C.snow, fontWeight: 700, fontSize: 13, marginBottom: 14 }}>Contact</div>
            <div style={{ color: C.mist, fontSize: 12, marginBottom: 8 }}>📧 contact@btecbenin.com</div>
            <div style={{ color: C.mist, fontSize: 12, marginBottom: 8 }}>📞 +229 01 48 55 26 07</div>
            <div style={{ color: C.mist, fontSize: 12 }}>📍 Mènontin, Cotonou</div>
          </div>
        </div>
        <div style={{
          textAlign: "center", marginTop: 36, color: C.mist, fontSize: 12,
          borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20,
        }}>
          © 2025 BTEC Bénin. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}