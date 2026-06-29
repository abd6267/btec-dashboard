"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const COLORS = {
  navy: "#0B1F3A", navyLight: "#1A3A5C",
  gold: "#C9A84C", white: "#FFFFFF",
  slate: "#64748B", slateLight: "#94A3B8",
  green: "#16A34A", greenLight: "#DCFCE7", gray: "#F1F5F9",
};

export default function ContactPage() {
  const router = useRouter();
  const [envoye, setEnvoye] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });

  const handleSubmit = () => {
    if (form.nom && form.email && form.message) setEnvoye(true);
  };

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
        <h1 style={{ fontSize: 36, fontWeight: 900, color: COLORS.white, marginBottom: 12 }}>Contactez-nous</h1>
        <p style={{ fontSize: 15, color: COLORS.slateLight }}>Notre équipe vous répond dans les 24 heures</p>
      </section>

      <section style={{ padding: "60px 24px", background: COLORS.gray }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>

          {/* Infos contact */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.navy, marginBottom: 20 }}>Nos coordonnées</h2>
            {[
              { icon: "📧", titre: "Email", val: "contact@btecbenin.com", lien: "mailto:services@btecbenin.com" },
              { icon: "📞", titre: "WhatsApp", val: "+229 01 66 37 54 68", lien: "https://wa.me/22901485526" },
              { icon: "📞", titre: "Téléphone", val: "+229 01 66 37 54 68", lien: "tel:+2290166375468" },
              { icon: "📍", titre: "Adresse", val: "Mènontin, Cotonou, Bénin", lien: null },
            ].map((c, i) => (
              <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "16px 20px", marginBottom: 12, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <span style={{ fontSize: 24 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.slateLight, marginBottom: 2 }}>{c.titre}</div>
                  {c.lien ? (
                    <a href={c.lien} style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy, textDecoration: "none" }}>{c.val}</a>
                  ) : (
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{c.val}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Horaires */}
            <div style={{ background: COLORS.white, borderRadius: 12, padding: 20, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, marginBottom: 10 }}>🕐 Horaires d'ouverture</div>
              {[
                { jour: "Lundi - Vendredi", heure: "08h00 - 18h00" },
                { jour: "Samedi", heure: "09h00 - 13h00" },
                { jour: "Dimanche", heure: "Fermé" },
              ].map((h, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.slate, padding: "6px 0", borderBottom: i < 2 ? "1px solid #F8FAFC" : "none" }}>
                  <span>{h.jour}</span>
                  <span style={{ fontWeight: 600, color: COLORS.navy }}>{h.heure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div style={{ background: COLORS.white, borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            {envoye ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 8 }}>Message envoyé !</div>
                <div style={{ fontSize: 13, color: COLORS.slate }}>Nous vous répondrons dans les 24 heures.</div>
                <button onClick={() => setEnvoye(false)} style={{ marginTop: 20, background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Envoyer un autre message</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, marginBottom: 20 }}>Envoyer un message</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Nom complet *</label>
                    <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Votre nom" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Email *</label>
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Sujet</label>
                    <input value={form.sujet} onChange={e => setForm({ ...form, sujet: e.target.value })} placeholder="Objet de votre message" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Décrivez votre besoin..." rows={5} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={handleSubmit} style={{ background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 10, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                    📤 Envoyer le message
                  </button>
                  <a href="https://wa.me/2290166375468" style={{ display: "block", textAlign: "center", background: "#25D366", color: COLORS.white, borderRadius: 10, padding: "13px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                    💬 Contacter via WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <footer style={{ background: COLORS.navy, padding: "24px", textAlign: "center" }}>
        <div style={{ color: COLORS.slateLight, fontSize: 12 }}>© 2026 BTEC Bénin · Mènontin, Cotonou</div>
      </footer>
    </div>
  );
}