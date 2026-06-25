"use client";
import { useState } from "react";

const COLORS = {
  navy: "#0B1F3A", navyMid: "#122848", navyLight: "#1A3A5C",
  gold: "#C9A84C", goldLight: "#E8C96A", cream: "#F7F4EE",
  white: "#FFFFFF", slate: "#64748B", slateLight: "#94A3B8",
  green: "#16A34A", greenLight: "#DCFCE7", red: "#DC2626",
  redLight: "#FEE2E2", orange: "#D97706", orangeLight: "#FEF3C7",
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
  { date: "21 Jun", libelle: "Prestation ZINSOU Ind.", type: "vente", montant: 2100000, statut: "en attente" },
  { date: "20 Jun", libelle: "Loyer local Mènontin", type: "depense", montant: -250000, statut: "payé" },
  { date: "19 Jun", libelle: "Facture AKPLA #019", type: "vente", montant: 870000, statut: "payé" },
  { date: "18 Jun", libelle: "Charges sociales Juin", type: "depense", montant: -540000, statut: "prévu" },
];

const ECHEANCES = [
  { label: "TVA Juin 2025", date: "30 Jun", statut: "urgent" },
  { label: "IS Trimestre 2", date: "15 Jul", statut: "proche" },
  { label: "Déclaration DGI", date: "31 Jul", statut: "normal" },
  { label: "Bilan annuel", date: "31 Déc", statut: "normal" },
];

function VentesPage() {
  const ventes = [
    { num: "F-2025-024", client: "BENIN TECH Services", date: "23 Jun", montant: 1250000, statut: "payé" },
    { num: "F-2025-023", client: "INDUSTRIE ZINSOU", date: "21 Jun", montant: 2100000, statut: "en attente" },
    { num: "F-2025-022", client: "SARL AKPLA Commerce", date: "19 Jun", montant: 870000, statut: "payé" },
    { num: "F-2025-021", client: "BENIN TECH Services", date: "15 Jun", montant: 3200000, statut: "payé" },
    { num: "F-2025-020", client: "SARL AKPLA Commerce", date: "10 Jun", montant: 640000, statut: "retard" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.navy }}>Gestion des Ventes</h2>
        <button style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>+ Nouvelle facture</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[{ label: "CA ce mois", val: "8 060 000 FCFA", color: COLORS.green }, { label: "En attente", val: "2 100 000 FCFA", color: COLORS.orange }, { label: "En retard", val: "640 000 FCFA", color: COLORS.red }].map((s, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ color: COLORS.slate, fontSize: 13, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>
      <div style={{ background: COLORS.white, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.cream }}>
              {["N° Facture", "Client", "Date", "Montant", "Statut"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: COLORS.slate, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ventes.map((v, i) => (
              <tr key={i} style={{ borderTop: "1px solid #F1F5F9" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: COLORS.navy, fontSize: 14 }}>{v.num}</td>
                <td style={{ padding: "14px 16px", fontSize: 14, color: COLORS.navy }}>{v.client}</td>
                <td style={{ padding: "14px 16px", fontSize: 14, color: COLORS.slate }}>{v.date}</td>
                <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{v.montant.toLocaleString("fr-FR")} FCFA</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: v.statut === "payé" ? COLORS.greenLight : v.statut === "en attente" ? COLORS.orangeLight : COLORS.redLight, color: v.statut === "payé" ? COLORS.green : v.statut === "en attente" ? COLORS.orange : COLORS.red }}>{v.statut}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.navy }}>Gestion des Clients</h2>
        <button style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>+ Nouveau client</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {clients.map((c, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: COLORS.navy }}>{c.nom}</div>
              <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: c.statut === "actif" ? COLORS.greenLight : COLORS.cream, color: c.statut === "actif" ? COLORS.green : COLORS.slate }}>{c.statut}</span>
            </div>
            <div style={{ color: COLORS.slate, fontSize: 13, marginBottom: 4 }}>{c.secteur} · {c.ville}</div>
            {c.solde > 0 ? <div style={{ color: COLORS.orange, fontSize: 13, fontWeight: 600 }}>Solde dû : {c.solde.toLocaleString("fr-FR")} FCFA</div> : <div style={{ color: COLORS.green, fontSize: 13 }}>Aucun impayé</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function RapportsPage() {
  const rapports = [
    { titre: "Bilan comptable S1 2025", date: "30 Jun 2025", type: "Bilan", statut: "généré" },
    { titre: "Compte de résultat Mai", date: "31 Mai 2025", type: "CdR", statut: "généré" },
    { titre: "Tableau de flux de trésorerie", date: "30 Jun 2025", type: "Trésorerie", statut: "en cours" },
    { titre: "Balance générale Juin", date: "25 Jun 2025", type: "Balance", statut: "généré" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.navy }}>Rapports Financiers</h2>
        <button style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>+ Générer rapport</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {rapports.map((r, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 15 }}>{r.titre}</div>
              <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: r.statut === "généré" ? COLORS.greenLight : COLORS.orangeLight, color: r.statut === "généré" ? COLORS.green : COLORS.orange, marginLeft: 8 }}>{r.statut}</span>
            </div>
            <div style={{ color: COLORS.slate, fontSize: 13, marginBottom: 12 }}>{r.type} · {r.date}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ fontSize: 12, padding: "6px 12px", borderRadius: 6, border: `1px solid ${COLORS.navy}`, background: "transparent", color: COLORS.navy, cursor: "pointer", fontWeight: 600 }}>📥 Télécharger</button>
              <button style={{ fontSize: 12, padding: "6px 12px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>👁 Aperçu</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderPage({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, color: COLORS.slate }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 14 }}>Cette section sera disponible dans la prochaine version.</div>
    </div>
  );
}

function DashboardHome() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 14, padding: "20px 18px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", borderTop: `3px solid ${s.up === true ? COLORS.green : s.up === false ? COLORS.red : COLORS.gold}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: COLORS.slate, fontWeight: 500 }}>{s.label}</span>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.navy, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.slateLight }}>{s.unit}</div>
            <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: s.up === true ? COLORS.green : s.up === false ? COLORS.red : COLORS.gold }}>
              {s.up !== null ? (s.up ? "▲" : "▼") : "●"} {s.trend}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div style={{ background: COLORS.white, borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: COLORS.navy, fontSize: 15 }}>Transactions récentes</span>
            <span style={{ fontSize: 12, color: COLORS.gold, cursor: "pointer", fontWeight: 600 }}>Voir tout →</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAFA" }}>
                {["Date", "Libellé", "Type", "Montant", "Statut"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.slateLight, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t, i) => (
                <tr key={i} style={{ borderTop: "1px solid #F8FAFC" }}>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: COLORS.slateLight }}>{t.date}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.navy, fontWeight: 500 }}>{t.libelle}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 12, fontWeight: 600, background: t.type === "vente" ? COLORS.blueLight : t.type === "achat" ? COLORS.orangeLight : COLORS.redLight, color: t.type === "vente" ? COLORS.blue : t.type === "achat" ? COLORS.orange : COLORS.red }}>{t.type}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: t.montant > 0 ? COLORS.green : COLORS.red }}>
                    {t.montant > 0 ? "+" : ""}{t.montant.toLocaleString("fr-FR")}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 12, fontWeight: 600, background: t.statut === "payé" ? COLORS.greenLight : t.statut === "en attente" ? COLORS.orangeLight : COLORS.cream, color: t.statut === "payé" ? COLORS.green : t.statut === "en attente" ? COLORS.orange : COLORS.slate }}>{t.statut}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: COLORS.white, borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #F1F5F9" }}>
            <span style={{ fontWeight: 700, color: COLORS.navy, fontSize: 15 }}>Échéances fiscales</span>
          </div>
          <div style={{ padding: "12px 16px" }}>
            {ECHEANCES.map((e, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < ECHEANCES.length - 1 ? "1px solid #F8FAFC" : "none" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, marginBottom: 2 }}>{e.label}</div>
                  <div style={{ fontSize: 12, color: COLORS.slateLight }}>Limite : {e.date}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: e.statut === "urgent" ? COLORS.redLight : e.statut === "proche" ? COLORS.orangeLight : COLORS.greenLight, color: e.statut === "urgent" ? COLORS.red : e.statut === "proche" ? COLORS.orange : COLORS.green }}>{e.statut}</span>
              </div>
            ))}
          </div>
          <div style={{ margin: "0 16px 16px", background: COLORS.cream, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>Répartition Revenus</div>
            {[{ label: "Ventes", pct: 65, color: COLORS.navy }, { label: "Prestations", pct: 25, color: COLORS.gold }, { label: "Autres", pct: 10, color: COLORS.slate }].map((b, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.slate, marginBottom: 3 }}>
                  <span>{b.label}</span><span style={{ fontWeight: 600 }}>{b.pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "#E2E8F0" }}>
                  <div style={{ height: 6, borderRadius: 3, background: b.color, width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeEntreprise, setActiveEntreprise] = useState(ENTREPRISES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: COLORS.cream, overflow: "hidden" }}>
      <div style={{ width: sidebarOpen ? 240 : 60, minWidth: sidebarOpen ? 240 : 60, background: COLORS.navy, display: "flex", flexDirection: "column", transition: "width 0.25s ease", overflow: "hidden" }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: COLORS.gold, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: COLORS.navy, flexShrink: 0 }}>B</div>
          {sidebarOpen && (
            <div>
              <div style={{ color: COLORS.white, fontWeight: 800, fontSize: 14 }}>BTEC Bénin</div>
              <div style={{ color: COLORS.gold, fontSize: 10, letterSpacing: "0.08em" }}>CABINET COMPTABLE</div>
            </div>
          )}
          <div style={{ marginLeft: "auto", cursor: "pointer", color: COLORS.slateLight, fontSize: 16, flexShrink: 0 }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "◀" : "▶"}
          </div>
        </div>
        {sidebarOpen && (
          <div style={{ padding: "12px 12px 8px" }}>
            <div style={{ fontSize: 10, color: COLORS.slateLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, paddingLeft: 4 }}>Entreprise active</div>
            <div style={{ background: COLORS.navyMid, borderRadius: 8, padding: "2px 0" }}>
              {ENTREPRISES.map(e => (
                <div key={e.id} onClick={() => setActiveEntreprise(e)} style={{ padding: "8px 10px", borderRadius: 6, cursor: "pointer", background: activeEntreprise.id === e.id ? COLORS.navyLight : "transparent", margin: "2px 4px" }}>
                  <div style={{ color: COLORS.white, fontSize: 12, fontWeight: activeEntreprise.id === e.id ? 700 : 400 }}>{e.nom}</div>
                  <div style={{ color: COLORS.slateLight, fontSize: 10 }}>{e.secteur}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
          {NAV_ITEMS.map(item => (
            <div key={item.id} onClick={() => setActiveNav(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: sidebarOpen ? "10px 10px" : "10px", borderRadius: 8, cursor: "pointer", marginBottom: 2, background: activeNav === item.id ? COLORS.navyLight : "transparent", borderLeft: activeNav === item.id ? `3px solid ${COLORS.gold}` : "3px solid transparent" }}>
              <span style={{ fontSize: 15, flexShrink: 0, width: 20, textAlign: "center" }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: 13, color: activeNav === item.id ? COLORS.white : COLORS.slateLight, fontWeight: activeNav === item.id ? 600 : 400, whiteSpace: "nowrap" }}>{item.label}</span>}
            </div>
          ))}
        </nav>
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: COLORS.navy, flexShrink: 0 }}>M</div>
          {sidebarOpen && (
            <div>
              <div style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>Moumouni Nabil</div>
              <div style={{ color: COLORS.slateLight, fontSize: 11 }}>Comptable principal</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: COLORS.white, borderBottom: "1px solid #E2E8F0", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy }}>{currentPage?.label}</div>
            <div style={{ fontSize: 12, color: COLORS.slateLight }}>{activeEntreprise.nom}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: COLORS.cream, borderRadius: 8, padding: "8px 14px", fontSize: 13, color: COLORS.slate, cursor: "pointer" }}>
              🔔 <span style={{ background: COLORS.red, color: "white", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>3</span>
            </div>
            <div style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>⚙ Paramètres</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}