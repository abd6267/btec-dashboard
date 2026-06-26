"use client";
import { useState } from "react";

const COLORS = {
  navy: "#0B1F3A", navyMid: "#122848", navyLight: "#1A3A5C",
  gold: "#C9A84C", cream: "#F7F4EE", white: "#FFFFFF",
  slate: "#64748B", slateLight: "#94A3B8",
  green: "#16A34A", greenLight: "#DCFCE7",
  red: "#DC2626", redLight: "#FEE2E2",
  orange: "#D97706", orangeLight: "#FEF3C7",
  blue: "#2563EB", blueLight: "#DBEAFE",
};

const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞", label: "Tableau de bord", sub: [] },
  { id: "ventes", icon: "↑", label: "Ventes", sub: ["Factures", "Historique"] },
  { id: "achats", icon: "↓", label: "Achats", sub: ["Fournisseurs", "Commandes"] },
  { id: "depenses", icon: "💳", label: "Dépenses", sub: ["Dépenses enregistrées", "Catégories"] },
  { id: "clients", icon: "👤", label: "Clients", sub: ["Liste clients", "Créances"] },
  { id: "fournisseurs", icon: "🏭", label: "Fournisseurs", sub: ["Liste fournisseurs", "Dettes"] },
  { id: "tresorerie", icon: "🏦", label: "Trésorerie", sub: ["Entrées", "Sorties", "Solde"] },
  { id: "rapports", icon: "📊", label: "Rapports", sub: ["Bilan", "Compte de résultat", "Flux de trésorerie"] },
  { id: "fiscal", icon: "🧾", label: "Fiscalité", sub: ["TVA", "Déclarations", "Échéances"] },
  { id: "documents", icon: "📁", label: "Documents", sub: ["Dépôt de fichiers", "Archivage", "Recherche"] },
  { id: "messagerie", icon: "💬", label: "Messagerie", sub: ["Échanges avec le cabinet"] },
  { id: "parametres", icon: "⚙", label: "Paramètres", sub: ["Profil", "Mot de passe", "Sécurité"] },
];

const STATS = [
  { label: "Chiffre d'affaires", value: "48 250 000", unit: "FCFA", trend: "+12%", up: true, icon: "📈" },
  { label: "Total ventes", value: "32 100 000", unit: "FCFA", trend: "+8%", up: true, icon: "🛒" },
  { label: "Total achats", value: "12 400 000", unit: "FCFA", trend: "+2%", up: false, icon: "📦" },
  { label: "Dépenses", value: "7 470 000", unit: "FCFA", trend: "-3%", up: false, icon: "💳" },
  { label: "Trésorerie", value: "18 900 000", unit: "FCFA", trend: "+5%", up: true, icon: "🏦" },
  { label: "Créances", value: "6 450 000", unit: "FCFA", trend: "en attente", up: null, icon: "⏳" },
  { label: "Dettes", value: "3 200 000", unit: "FCFA", trend: "à payer", up: null, icon: "📋" },
  { label: "Résultat net", value: "28 380 000", unit: "FCFA", trend: "+18%", up: true, icon: "✅" },
];

const TRANSACTIONS = [
  { date: "23 Jun", libelle: "Facture BENIN TECH #024", type: "vente", montant: 1250000, statut: "payé" },
  { date: "22 Jun", libelle: "Achat matériel bureau", type: "achat", montant: -380000, statut: "payé" },
  { date: "21 Jun", libelle: "Prestation ZINSOU", type: "vente", montant: 2100000, statut: "en attente" },
  { date: "20 Jun", libelle: "Loyer Mènontin", type: "depense", montant: -250000, statut: "payé" },
  { date: "19 Jun", libelle: "Facture AKPLA #019", type: "vente", montant: 870000, statut: "payé" },
];

const ENTREPRISES = [
  { id: 1, nom: "SARL AKPLA Commerce", secteur: "Commerce" },
  { id: 2, nom: "BENIN TECH Services", secteur: "Services" },
  { id: 3, nom: "INDUSTRIE ZINSOU", secteur: "Industrie" },
];

function PageContent({ active, sub }: { active: string; sub: string }) {
  const titles: Record<string, string> = {
    dashboard: "Tableau de bord",
    ventes: "Ventes", achats: "Achats", depenses: "Dépenses",
    clients: "Clients", fournisseurs: "Fournisseurs", tresorerie: "Trésorerie",
    rapports: "Rapports", fiscal: "Fiscalité", documents: "Documents",
    messagerie: "Messagerie", parametres: "Paramètres",
  };

  if (active === "dashboard") {
    return (
      <div>
        <div className="stats-grid" style={{ display: "grid", gap: 12, marginBottom: 20 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `3px solid ${s.up === true ? COLORS.green : s.up === false ? COLORS.red : COLORS.gold}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: COLORS.slate, fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.navy, marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: COLORS.slateLight, marginBottom: 4 }}>{s.unit}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: s.up === true ? COLORS.green : s.up === false ? COLORS.red : COLORS.gold }}>
                {s.up !== null ? (s.up ? "▲" : "▼") : "●"} {s.trend}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9", fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>Transactions récentes</div>
          {TRANSACTIONS.map((t, i) => (
            <div key={i} style={{ padding: "12px 16px", borderBottom: i < TRANSACTIONS.length - 1 ? "1px solid #F8FAFC" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.libelle}</div>
                <div style={{ fontSize: 11, color: COLORS.slateLight }}>{t.date} · <span style={{ color: t.type === "vente" ? COLORS.blue : t.type === "achat" ? COLORS.orange : COLORS.red }}>{t.type}</span></div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.montant > 0 ? COLORS.green : COLORS.red }}>{t.montant > 0 ? "+" : ""}{t.montant.toLocaleString("fr-FR")}</div>
                <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 10, background: t.statut === "payé" ? COLORS.greenLight : t.statut === "en attente" ? COLORS.orangeLight : COLORS.cream, color: t.statut === "payé" ? COLORS.green : t.statut === "en attente" ? COLORS.orange : COLORS.slate }}>{t.statut}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (active === "messagerie") {
    const messages = [
      { from: "Cabinet BTEC", text: "Bonjour, vos documents du mois de Mai sont prêts.", time: "10:30", me: false },
      { from: "Moi", text: "Merci ! Je vais les consulter.", time: "10:45", me: true },
      { from: "Cabinet BTEC", text: "N'hésitez pas si vous avez des questions.", time: "11:00", me: false },
    ];
    return (
      <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", height: 400, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9", fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>💬 Messagerie — Cabinet BTEC</div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.me ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "70%", background: m.me ? COLORS.navy : COLORS.cream, color: m.me ? COLORS.white : COLORS.navy, borderRadius: m.me ? "14px 14px 0 14px" : "14px 14px 14px 0", padding: "10px 14px" }}>
                {!m.me && <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gold, marginBottom: 4 }}>{m.from}</div>}
                <div style={{ fontSize: 13 }}>{m.text}</div>
                <div style={{ fontSize: 10, color: m.me ? COLORS.slateLight : COLORS.slate, marginTop: 4, textAlign: "right" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #F1F5F9", display: "flex", gap: 8 }}>
          <input placeholder="Écrire un message..." style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none" }} />
          <button style={{ background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Envoyer</button>
        </div>
      </div>
    );
  }

  if (active === "documents") {
    const docs = [
      { nom: "Bilan_2024.pdf", type: "PDF", taille: "2.4 MB", date: "20 Jun" },
      { nom: "Factures_Mai.xlsx", type: "Excel", taille: "1.1 MB", date: "18 Jun" },
      { nom: "Contrat_ZINSOU.pdf", type: "PDF", taille: "890 KB", date: "15 Jun" },
      { nom: "Declaration_TVA.pdf", type: "PDF", taille: "540 KB", date: "10 Jun" },
    ];
    return (
      <div>
        <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 16 }}>
          <div style={{ border: "2px dashed #E2E8F0", borderRadius: 12, padding: "30px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📤</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Déposer vos fichiers ici</div>
            <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 12 }}>PDF, Excel, Word acceptés</div>
            <button style={{ background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>📁 Parcourir</button>
          </div>
        </div>
        <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9", fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>📂 Documents archivés</div>
          {docs.map((d, i) => (
            <div key={i} style={{ padding: "12px 16px", borderBottom: i < docs.length - 1 ? "1px solid #F8FAFC" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>{d.nom}</div>
                <div style={{ fontSize: 11, color: COLORS.slateLight }}>{d.type} · {d.taille} · {d.date}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>👁 Aperçu</button>
                <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.greenLight, color: COLORS.green, cursor: "pointer", fontWeight: 600 }}>📥 Télécharger</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (active === "parametres") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { icon: "👤", titre: "Profil", desc: "Modifier vos informations personnelles" },
          { icon: "🔑", titre: "Mot de passe", desc: "Changer votre mot de passe" },
          { icon: "🔒", titre: "Sécurité", desc: "Authentification à deux facteurs" },
        ].map((p, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 24 }}>{p.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy }}>{p.titre}</div>
                <div style={{ fontSize: 12, color: COLORS.slate }}>{p.desc}</div>
              </div>
            </div>
            <span style={{ color: COLORS.slate, fontSize: 18 }}>›</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>{titles[active]} {sub ? `— ${sub}` : ""}</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", color: COLORS.slate }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy, marginBottom: 6 }}>Section {sub || titles[active]}</div>
        <div style={{ fontSize: 13 }}>Les données s'afficheront ici.</div>
        <button style={{ marginTop: 16, background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Ajouter</button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeSub, setActiveSub] = useState("");
  const [openMenus, setOpenMenus] = useState<string[]>(["dashboard"]);
  const [activeEntreprise, setActiveEntreprise] = useState(ENTREPRISES[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleNav = (id: string, sub = "") => {
    setActiveNav(id);
    setActiveSub(sub);
    setMenuOpen(false);
  };

  const currentItem = NAV_ITEMS.find(n => n.id === activeNav);

  const SidebarContent = () => (
    <>
      <div style={{ padding: "18px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, background: COLORS.gold, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: COLORS.navy, flexShrink: 0 }}>B</div>
        <div>
          <div style={{ color: COLORS.white, fontWeight: 800, fontSize: 13 }}>BTEC Bénin</div>
          <div style={{ color: COLORS.gold, fontSize: 9, letterSpacing: "0.08em" }}>CABINET COMPTABLE</div>
        </div>
      </div>
      <div style={{ padding: "10px 10px 6px" }}>
        <div style={{ fontSize: 9, color: COLORS.slateLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4, paddingLeft: 4 }}>Entreprise</div>
        {ENTREPRISES.map(e => (
          <div key={e.id} onClick={() => setActiveEntreprise(e)} style={{ padding: "7px 8px", borderRadius: 6, cursor: "pointer", background: activeEntreprise.id === e.id ? COLORS.navyLight : "transparent", margin: "2px 0" }}>
            <div style={{ color: COLORS.white, fontSize: 11, fontWeight: activeEntreprise.id === e.id ? 700 : 400 }}>{e.nom}</div>
            <div style={{ color: COLORS.slateLight, fontSize: 10 }}>{e.secteur}</div>
          </div>
        ))}
      </div>
      <nav style={{ flex: 1, padding: "6px 8px", overflowY: "auto" }}>
        {NAV_ITEMS.map(item => (
          <div key={item.id}>
            <div onClick={() => { handleNav(item.id); if (item.sub.length > 0) toggleMenu(item.id); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 8px", borderRadius: 8, cursor: "pointer", marginBottom: 1, background: activeNav === item.id ? COLORS.navyLight : "transparent", borderLeft: activeNav === item.id ? `3px solid ${COLORS.gold}` : "3px solid transparent" }}>
              <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
              <span style={{ fontSize: 12, color: activeNav === item.id ? COLORS.white : COLORS.slateLight, fontWeight: activeNav === item.id ? 600 : 400, flex: 1 }}>{item.label}</span>
              {item.sub.length > 0 && <span style={{ fontSize: 10, color: COLORS.slateLight }}>{openMenus.includes(item.id) ? "▾" : "▸"}</span>}
            </div>
            {item.sub.length > 0 && openMenus.includes(item.id) && (
              <div style={{ paddingLeft: 28, marginBottom: 4 }}>
                {item.sub.map((s, i) => (
                  <div key={i} onClick={() => handleNav(item.id, s)}
                    style={{ padding: "7px 8px", borderRadius: 6, cursor: "pointer", fontSize: 11, color: activeSub === s ? COLORS.gold : COLORS.slateLight, fontWeight: activeSub === s ? 700 : 400, background: activeSub === s ? "rgba(201,168,76,0.1)" : "transparent", marginBottom: 1 }}>
                    › {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: COLORS.navy }}>M</div>
        <div>
          <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 600 }}>Moumouni Nabil</div>
          <div style={{ color: COLORS.slateLight, fontSize: 10 }}>Comptable principal</div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { margin: 0; height: 100%; }
        .sidebar-desktop { display: flex !important; }
        .menu-mobile { display: none !important; }
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .menu-mobile { display: flex !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 380px) { .stats-grid { grid-template-columns: repeat(1, 1fr) !important; } }
      `}</style>

      <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: COLORS.cream, overflow: "hidden" }}>

        {/* SIDEBAR DESKTOP */}
        <div className="sidebar-desktop" style={{ width: 220, minWidth: 220, background: COLORS.navy, flexDirection: "column", overflow: "hidden" }}>
          <SidebarContent />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* TOPBAR */}
          <div style={{ background: COLORS.white, borderBottom: "1px solid #E2E8F0", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
              <button className="menu-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: COLORS.navy, padding: 0, flexShrink: 0 }}>☰</button>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {currentItem?.label}{activeSub ? ` — ${activeSub}` : ""}
                </div>
                <div style={{ fontSize: 11, color: COLORS.slateLight }}>{activeEntreprise.nom}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div style={{ background: COLORS.cream, borderRadius: 8, padding: "6px 10px", fontSize: 13, cursor: "pointer" }}>
                🔔<span style={{ background: COLORS.red, color: "white", borderRadius: "50%", width: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, marginLeft: 4 }}>3</span>
              </div>
              <div style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>⚙</div>
            </div>
          </div>

          {/* MENU MOBILE */}
          {menuOpen && (
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: "flex" }}>
              <div style={{ width: "min(260px, 82vw)", background: COLORS.navy, display: "flex", flexDirection: "column", overflowY: "auto" }}>
                <div style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: COLORS.slateLight, fontSize: 20, cursor: "pointer" }}>✕</button>
                </div>
                <SidebarContent />
              </div>
              <div onClick={() => setMenuOpen(false)} style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} />
            </div>
          )}

          {/* PAGE CONTENT */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, minWidth: 0 }}>
            <PageContent active={activeNav} sub={activeSub} />
          </div>
        </div>
      </div>
    </>
  );
}