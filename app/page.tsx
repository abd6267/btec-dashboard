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
  { id: "dashboard", icon: "⊞", label: "Tableau de bord" },
  { id: "ventes", icon: "↑", label: "Ventes" },
  { id: "achats", icon: "↓", label: "Achats" },
  { id: "depenses", icon: "💳", label: "Dépenses" },
  { id: "clients", icon: "👤", label: "Clients" },
  { id: "fournisseurs", icon: "🏭", label: "Fournisseurs" },
  { id: "tresorerie", icon: "🏦", label: "Trésorerie" },
  { id: "creances", icon: "📋", label: "Créances & Dettes" },
  { id: "rapports", icon: "📊", label: "Rapports" },
  { id: "fiscal", icon: "🧾", label: "Suivi Fiscal" },
  { id: "documents", icon: "📁", label: "Documents" },
  { id: "entreprises", icon: "🏢", label: "Entreprises" },
];

const ENTREPRISES = [
  { id: 1, nom: "SARL AKPLA Commerce", secteur: "Commerce" },
  { id: 2, nom: "BENIN TECH Services", secteur: "Services" },
  { id: 3, nom: "INDUSTRIE ZINSOU", secteur: "Industrie" },
];

const STATS = [
  { label: "Chiffre d'affaires", value: "48 250 000", unit: "FCFA", trend: "+12%", up: true, icon: "📈" },
  { label: "Dépenses totales", value: "19 870 000", unit: "FCFA", trend: "-3%", up: false, icon: "📉" },
  { label: "Bénéfice net", value: "28 380 000", unit: "FCFA", trend: "+18%", up: true, icon: "✅" },
  { label: "Créances clients", value: "6 450 000", unit: "FCFA", trend: "en attente", up: null, icon: "⏳" },
];

const TRANSACTIONS = [
  { date: "23 Jun", libelle: "Facture BENIN TECH #024", type: "vente", montant: 1250000, statut: "payé" },
  { date: "22 Jun", libelle: "Achat matériel bureau", type: "achat", montant: -380000, statut: "payé" },
  { date: "21 Jun", libelle: "Prestation ZINSOU", type: "vente", montant: 2100000, statut: "en attente" },
  { date: "20 Jun", libelle: "Loyer Mènontin", type: "depense", montant: -250000, statut: "payé" },
  { date: "19 Jun", libelle: "Facture AKPLA #019", type: "vente", montant: 870000, statut: "payé" },
];

const ECHEANCES = [
  { label: "TVA Juin 2025", date: "30 Jun", statut: "urgent" },
  { label: "IS Trimestre 2", date: "15 Jul", statut: "proche" },
  { label: "Déclaration DGI", date: "31 Jul", statut: "normal" },
  { label: "Bilan annuel", date: "31 Déc", statut: "normal" },
];

function StatCard({ s }: { s: typeof STATS[0] }) {
  return (
    <div style={{ background: COLORS.white, borderRadius: 14, padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", borderTop: `3px solid ${s.up === true ? COLORS.green : s.up === false ? COLORS.red : COLORS.gold}`, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: COLORS.slate, fontWeight: 500 }}>{s.label}</span>
        <span style={{ fontSize: 16 }}>{s.icon}</span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, marginBottom: 2, wordBreak: "break-word" }}>{s.value}</div>
      <div style={{ fontSize: 10, color: COLORS.slateLight, marginBottom: 6 }}>{s.unit}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: s.up === true ? COLORS.green : s.up === false ? COLORS.red : COLORS.gold }}>
        {s.up !== null ? (s.up ? "▲" : "▼") : "●"} {s.trend}
      </div>
    </div>
  );
}

function DashboardHome() {
  return (
    <div>
      {/* Stats grid - responsive via classe CSS (4 col desktop / 2 col tablette / 1 col petit mobile) */}
      <div className="stats-grid" style={{ display: "grid", gap: 12, marginBottom: 20 }}>
        {STATS.map((s, i) => <StatCard key={i} s={s} />)}
      </div>

      {/* Transactions */}
      <div style={{ background: COLORS.white, borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: 16, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>Transactions récentes</span>
          <span style={{ fontSize: 12, color: COLORS.gold, fontWeight: 600 }}>Voir tout →</span>
        </div>
        {TRANSACTIONS.map((t, i) => (
          <div key={i} style={{ padding: "12px 16px", borderBottom: i < TRANSACTIONS.length - 1 ? "1px solid #F8FAFC" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.libelle}</div>
              <div style={{ fontSize: 11, color: COLORS.slateLight, marginTop: 2 }}>{t.date} · <span style={{ color: t.type === "vente" ? COLORS.blue : t.type === "achat" ? COLORS.orange : COLORS.red }}>{t.type}</span></div>
            </div>
            <div style={{ textAlign: "right", marginLeft: 12, flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.montant > 0 ? COLORS.green : COLORS.red }}>
                {t.montant > 0 ? "+" : ""}{t.montant.toLocaleString("fr-FR")}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 10, background: t.statut === "payé" ? COLORS.greenLight : t.statut === "en attente" ? COLORS.orangeLight : COLORS.cream, color: t.statut === "payé" ? COLORS.green : t.statut === "en attente" ? COLORS.orange : COLORS.slate }}>{t.statut}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Échéances */}
      <div style={{ background: COLORS.white, borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9" }}>
          <span style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>Échéances fiscales</span>
        </div>
        {ECHEANCES.map((e, i) => (
          <div key={i} style={{ padding: "12px 16px", borderBottom: i < ECHEANCES.length - 1 ? "1px solid #F8FAFC" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>{e.label}</div>
              <div style={{ fontSize: 11, color: COLORS.slateLight }}>Limite : {e.date}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: e.statut === "urgent" ? COLORS.redLight : e.statut === "proche" ? COLORS.orangeLight : COLORS.greenLight, color: e.statut === "urgent" ? COLORS.red : e.statut === "proche" ? COLORS.orange : COLORS.green, flexShrink: 0 }}>{e.statut}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VentesPage() {
  const ventes = [
    { num: "F-2025-024", client: "BENIN TECH", date: "23 Jun", montant: 1250000, statut: "payé" },
    { num: "F-2025-023", client: "ZINSOU Ind.", date: "21 Jun", montant: 2100000, statut: "en attente" },
    { num: "F-2025-022", client: "AKPLA", date: "19 Jun", montant: 870000, statut: "payé" },
    { num: "F-2025-021", client: "BENIN TECH", date: "15 Jun", montant: 3200000, statut: "payé" },
    { num: "F-2025-020", client: "AKPLA", date: "10 Jun", montant: 640000, statut: "retard" },
  ];
  return (
    <div>
      <div className="page-header" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Ventes</h2>
        <button style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Nouvelle</button>
      </div>
      <div className="ventes-stats-grid" style={{ display: "grid", gap: 10, marginBottom: 16 }}>
        {[{ label: "CA mois", val: "8 060 000", color: COLORS.green }, { label: "Attente", val: "2 100 000", color: COLORS.orange }, { label: "Retard", val: "640 000", color: COLORS.red }].map((s, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 10, padding: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.06)", borderLeft: `3px solid ${s.color}`, minWidth: 0 }}>
            <div style={{ color: COLORS.slate, fontSize: 11, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color, wordBreak: "break-word" }}>{s.val}</div>
          </div>
        ))}
      </div>
      {ventes.map((v, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "12px 14px", marginBottom: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>{v.num}</div>
            <div style={{ fontSize: 12, color: COLORS.slate }}>{v.client} · {v.date}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>{v.montant.toLocaleString("fr-FR")} F</div>
            <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 10, background: v.statut === "payé" ? COLORS.greenLight : v.statut === "en attente" ? COLORS.orangeLight : COLORS.redLight, color: v.statut === "payé" ? COLORS.green : v.statut === "en attente" ? COLORS.orange : COLORS.red }}>{v.statut}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClientsPage() {
  const clients = [
    { nom: "SARL AKPLA Commerce", secteur: "Commerce", ville: "Cotonou", solde: 640000, statut: "actif" },
    { nom: "BENIN TECH Services", secteur: "Services", ville: "Cotonou", solde: 0, statut: "actif" },
    { nom: "INDUSTRIE ZINSOU", secteur: "Industrie", ville: "Porto-Novo", solde: 2100000, statut: "actif" },
    { nom: "GIE ALAFIA", secteur: "Agriculture", ville: "Parakou", solde: 0, statut: "inactif" },
  ];
  return (
    <div>
      <div className="page-header" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Clients</h2>
        <button style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Nouveau</button>
      </div>
      {clients.map((c, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 6, marginBottom: 6 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{c.nom}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: c.statut === "actif" ? COLORS.greenLight : COLORS.cream, color: c.statut === "actif" ? COLORS.green : COLORS.slate, flexShrink: 0 }}>{c.statut}</span>
          </div>
          <div style={{ color: COLORS.slate, fontSize: 12, marginBottom: 4 }}>{c.secteur} · {c.ville}</div>
          {c.solde > 0 ? <div style={{ color: COLORS.orange, fontSize: 12, fontWeight: 600 }}>Solde dû : {c.solde.toLocaleString("fr-FR")} FCFA</div> : <div style={{ color: COLORS.green, fontSize: 12 }}>✓ Aucun impayé</div>}
        </div>
      ))}
    </div>
  );
}

function RapportsPage() {
  const rapports = [
    { titre: "Bilan S1 2025", date: "30 Jun 2025", type: "Bilan", statut: "généré" },
    { titre: "Compte résultat Mai", date: "31 Mai 2025", type: "CdR", statut: "généré" },
    { titre: "Flux trésorerie", date: "30 Jun 2025", type: "Trésorerie", statut: "en cours" },
    { titre: "Balance Juin", date: "25 Jun 2025", type: "Balance", statut: "généré" },
  ];
  return (
    <div>
      <div className="page-header" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Rapports</h2>
        <button style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Générer</button>
      </div>
      {rapports.map((r, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: 14, marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 6, marginBottom: 6 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{r.titre}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: r.statut === "généré" ? COLORS.greenLight : COLORS.orangeLight, color: r.statut === "généré" ? COLORS.green : COLORS.orange, flexShrink: 0 }}>{r.statut}</span>
          </div>
          <div style={{ color: COLORS.slate, fontSize: 12, marginBottom: 10 }}>{r.type} · {r.date}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button style={{ fontSize: 12, padding: "6px 12px", borderRadius: 6, border: `1px solid ${COLORS.navy}`, background: "transparent", color: COLORS.navy, cursor: "pointer", fontWeight: 600 }}>📥 Télécharger</button>
            <button style={{ fontSize: 12, padding: "6px 12px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>👁 Aperçu</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlaceholderPage({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, color: COLORS.slate, textAlign: "center", padding: "0 16px" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 13 }}>Disponible prochainement.</div>
    </div>
  );
}

export default function Page() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeEntreprise, setActiveEntreprise] = useState(ENTREPRISES[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const renderPage = () => {
    switch (activeNav) {
      case "dashboard": return <DashboardHome />;
      case "ventes": return <VentesPage />;
      case "clients": return <ClientsPage />;
      case "rapports": return <RapportsPage />;
      default:
        const item = NAV_ITEMS.find(n => n.id === activeNav);
        return <PlaceholderPage label={item?.label || activeNav} />;
    }
  };

  const currentPage = NAV_ITEMS.find(n => n.id === activeNav);

  const handleNav = (id: string) => {
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* CSS global pour responsive */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { margin: 0; height: 100%; }

        .sidebar-desktop { display: flex !important; }
        .menu-mobile { display: none !important; }

        /* Grilles responsive pilotées par classe (pas de gridTemplateColumns inline) */
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        .ventes-stats-grid { grid-template-columns: repeat(3, 1fr); }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .menu-mobile { display: flex !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ventes-stats-grid { grid-template-columns: repeat(1, 1fr) !important; }
        }
        @media (max-width: 380px) {
          .stats-grid { grid-template-columns: repeat(1, 1fr) !important; }
          .page-header { flex-direction: column !important; align-items: flex-start !important; }
          .page-header button { width: 100% !important; }
        }
      `}</style>

      <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: COLORS.cream, overflow: "hidden" }}>

        {/* SIDEBAR DESKTOP */}
        <div className="sidebar-desktop" style={{ width: 220, minWidth: 220, background: COLORS.navy, flexDirection: "column", overflow: "hidden" }}>
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
              <div key={item.id} onClick={() => handleNav(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 8px", borderRadius: 8, cursor: "pointer", marginBottom: 1, background: activeNav === item.id ? COLORS.navyLight : "transparent", borderLeft: activeNav === item.id ? `3px solid ${COLORS.gold}` : "3px solid transparent" }}>
                <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
                <span style={{ fontSize: 12, color: activeNav === item.id ? COLORS.white : COLORS.slateLight, fontWeight: activeNav === item.id ? 600 : 400 }}>{item.label}</span>
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
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* TOPBAR */}
          <div style={{ background: COLORS.white, borderBottom: "1px solid #E2E8F0", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
              {/* Bouton hamburger mobile */}
              <button className="menu-mobile" onClick={() => setMenuOpen(!menuOpen)}
                style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: COLORS.navy, padding: 0, flexShrink: 0 }}>☰</button>
              <div style={{ minWidth: 0, overflow: "hidden" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentPage?.label}</div>
                <div style={{ fontSize: 11, color: COLORS.slateLight, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{activeEntreprise.nom}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div style={{ background: COLORS.cream, borderRadius: 8, padding: "6px 10px", fontSize: 13, cursor: "pointer" }}>
                🔔<span style={{ background: COLORS.red, color: "white", borderRadius: "50%", width: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, marginLeft: 4 }}>3</span>
              </div>
              <div style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>⚙</div>
            </div>
          </div>

          {/* MENU MOBILE DRAWER */}
          {menuOpen && (
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: "flex" }}>
              <div style={{ width: "min(260px, 82vw)", background: COLORS.navy, display: "flex", flexDirection: "column", overflowY: "auto" }}>
                <div style={{ padding: "18px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <div style={{ width: 32, height: 32, background: COLORS.gold, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: COLORS.navy, flexShrink: 0 }}>B</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: COLORS.white, fontWeight: 800, fontSize: 13 }}>BTEC Bénin</div>
                      <div style={{ color: COLORS.gold, fontSize: 9 }}>CABINET COMPTABLE</div>
                    </div>
                  </div>
                  <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: COLORS.slateLight, fontSize: 20, cursor: "pointer", flexShrink: 0 }}>✕</button>
                </div>
                <div style={{ padding: "10px" }}>
                  {ENTREPRISES.map(e => (
                    <div key={e.id} onClick={() => setActiveEntreprise(e)} style={{ padding: "7px 8px", borderRadius: 6, cursor: "pointer", background: activeEntreprise.id === e.id ? COLORS.navyLight : "transparent", marginBottom: 2 }}>
                      <div style={{ color: COLORS.white, fontSize: 12, fontWeight: activeEntreprise.id === e.id ? 700 : 400 }}>{e.nom}</div>
                      <div style={{ color: COLORS.slateLight, fontSize: 10 }}>{e.secteur}</div>
                    </div>
                  ))}
                </div>
                <nav style={{ flex: 1, padding: "6px 8px" }}>
                  {NAV_ITEMS.map(item => (
                    <div key={item.id} onClick={() => handleNav(item.id)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 10px", borderRadius: 8, cursor: "pointer", marginBottom: 2, background: activeNav === item.id ? COLORS.navyLight : "transparent", borderLeft: activeNav === item.id ? `3px solid ${COLORS.gold}` : "3px solid transparent" }}>
                      <span style={{ fontSize: 16 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, color: activeNav === item.id ? COLORS.white : COLORS.slateLight, fontWeight: activeNav === item.id ? 600 : 400 }}>{item.label}</span>
                    </div>
                  ))}
                </nav>
                <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: COLORS.navy, flexShrink: 0 }}>M</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 600 }}>Moumouni Nabil</div>
                    <div style={{ color: COLORS.slateLight, fontSize: 10 }}>Comptable principal</div>
                  </div>
                </div>
              </div>
              <div onClick={() => setMenuOpen(false)} style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} />
            </div>
          )}

          {/* PAGE CONTENT */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, minWidth: 0 }}>
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  );
}