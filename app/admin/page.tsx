"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const COLORS = {
  navy: "#0B1F3A", navyLight: "#1A3A5C",
  gold: "#C9A84C", cream: "#F7F4EE", white: "#FFFFFF",
  slate: "#64748B", slateLight: "#94A3B8",
  green: "#16A34A", greenLight: "#DCFCE7",
  red: "#DC2626", redLight: "#FEE2E2",
  orange: "#D97706", orangeLight: "#FEF3C7",
  blue: "#2563EB", blueLight: "#DBEAFE",
};

const NAV_ADMIN = [
  { id: "supervision", icon: "⊞", label: "Supervision", sub: [] },
  { id: "entreprises", icon: "🏢", label: "Entreprises", sub: ["Créer", "Modifier", "Suspendre"] },
  { id: "comptables", icon: "👨‍💼", label: "Comptables", sub: ["Ajouter", "Modifier", "Supprimer"] },
  { id: "utilisateurs", icon: "👥", label: "Utilisateurs", sub: ["Rôles", "Permissions"] },
  { id: "facturation", icon: "💰", label: "Facturation SaaS", sub: ["Abonnements", "Paiements", "Renouvellements"] },
  { id: "rapports", icon: "📊", label: "Rapports", sub: ["Global", "Par entreprise"] },
  { id: "parametres", icon: "⚙", label: "Paramètres", sub: ["Profil", "Sécurité"] },
];

const ENTREPRISES = [
  { nom: "SARL AKPLA Commerce", secteur: "Commerce", statut: "actif", users: 3, abonnement: "Business" },
  { nom: "BENIN TECH Services", secteur: "Services", statut: "actif", users: 2, abonnement: "Starter" },
  { nom: "INDUSTRIE ZINSOU", secteur: "Industrie", statut: "actif", users: 4, abonnement: "Enterprise" },
  { nom: "GIE ALAFIA", secteur: "Agriculture", statut: "suspendu", users: 1, abonnement: "Starter" },
];

const COMPTABLES = [
  { nom: "Moumouni Nabil", email: "nabil@btec.bj", entreprises: 3, statut: "actif" },
  { nom: "Adjobo Sylvie", email: "sylvie@btec.bj", entreprises: 2, statut: "actif" },
  { nom: "Koffi Jean", email: "jean@btec.bj", entreprises: 1, statut: "inactif" },
];

const UTILISATEURS = [
  { nom: "Kofi Mensah", email: "kofi@akpla.bj", entreprise: "SARL AKPLA", role: "Admin", statut: "actif" },
  { nom: "Aminata Diallo", email: "aminata@benintech.bj", entreprise: "BENIN TECH", role: "Lecteur", statut: "actif" },
  { nom: "Jean Zinsou", email: "jean@zinsou.bj", entreprise: "INDUSTRIE ZINSOU", role: "Admin", statut: "actif" },
  { nom: "Marie Alafia", email: "marie@alafia.bj", entreprise: "GIE ALAFIA", role: "Lecteur", statut: "suspendu" },
];

const ABONNEMENTS = [
  { entreprise: "SARL AKPLA Commerce", plan: "Business", prix: "35 000", statut: "actif", renouvellement: "01 Jul 2025" },
  { entreprise: "BENIN TECH Services", plan: "Starter", prix: "15 000", statut: "actif", renouvellement: "15 Jul 2025" },
  { entreprise: "INDUSTRIE ZINSOU", plan: "Enterprise", prix: "75 000", statut: "actif", renouvellement: "30 Jun 2025" },
  { entreprise: "GIE ALAFIA", plan: "Starter", prix: "15 000", statut: "suspendu", renouvellement: "01 Jun 2025" },
];

const PAIEMENTS = [
  { entreprise: "INDUSTRIE ZINSOU", montant: "75 000", date: "01 Jun 2025", statut: "payé" },
  { entreprise: "SARL AKPLA Commerce", montant: "35 000", date: "01 Jun 2025", statut: "payé" },
  { entreprise: "BENIN TECH Services", montant: "15 000", date: "15 Mai 2025", statut: "payé" },
  { entreprise: "GIE ALAFIA", montant: "15 000", date: "01 Mai 2025", statut: "impayé" },
];

function SupervisionPage() {
  const stats = [
    { label: "Entreprises", value: "4", icon: "🏢", color: COLORS.blue },
    { label: "Utilisateurs", value: "10", icon: "👥", color: COLORS.green },
    { label: "Comptables", value: "3", icon: "👨‍💼", color: COLORS.gold },
    { label: "Abonnements actifs", value: "3", icon: "✅", color: COLORS.green },
    { label: "Revenu mensuel", value: "125 000", icon: "💰", color: COLORS.navy },
    { label: "Tickets ouverts", value: "2", icon: "🎫", color: COLORS.orange },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: COLORS.slate }}>{s.label}</span>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.navy }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: COLORS.white, borderRadius: 14, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14, marginBottom: 12 }}>Activité récente</div>
        {[
          { action: "Nouvelle entreprise créée", detail: "SARL AKPLA Commerce", time: "Il y a 2h" },
          { action: "Document déposé", detail: "BENIN TECH - Bilan 2024", time: "Il y a 4h" },
          { action: "Rapport généré", detail: "INDUSTRIE ZINSOU - CdR", time: "Il y a 6h" },
          { action: "Paiement reçu", detail: "SARL AKPLA - 35 000 FCFA", time: "Il y a 1j" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid #F8FAFC" : "none" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>{a.action}</div>
              <div style={{ fontSize: 11, color: COLORS.slate }}>{a.detail}</div>
            </div>
            <div style={{ fontSize: 11, color: COLORS.slateLight, flexShrink: 0, marginLeft: 8 }}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EntreprisesPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Gestion des Entreprises</h2>
        <button style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Créer</button>
      </div>
      {ENTREPRISES.map((e, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{e.nom}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: e.statut === "actif" ? COLORS.greenLight : COLORS.redLight, color: e.statut === "actif" ? COLORS.green : COLORS.red }}>{e.statut}</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 10 }}>{e.secteur} · {e.users} utilisateurs · Plan {e.abonnement}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>✏️ Modifier</button>
            <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.orangeLight, color: COLORS.orange, cursor: "pointer", fontWeight: 600 }}>⏸ Suspendre</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ComptablesPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Gestion des Comptables</h2>
        <button style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Ajouter</button>
      </div>
      {COMPTABLES.map((c, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{c.nom}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: c.statut === "actif" ? COLORS.greenLight : COLORS.cream, color: c.statut === "actif" ? COLORS.green : COLORS.slate }}>{c.statut}</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 10 }}>{c.email} · {c.entreprises} entreprises</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>✏️ Modifier</button>
            <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.redLight, color: COLORS.red, cursor: "pointer", fontWeight: 600 }}>🗑 Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function UtilisateursPage({ sub }: { sub: string }) {
  const roles = ["Admin", "Comptable", "Lecteur", "Invité"];
  const permissions = [
    { action: "Voir les rapports", admin: true, comptable: true, lecteur: true, invite: false },
    { action: "Créer des factures", admin: true, comptable: true, lecteur: false, invite: false },
    { action: "Gérer les utilisateurs", admin: true, comptable: false, lecteur: false, invite: false },
    { action: "Déposer des documents", admin: true, comptable: true, lecteur: false, invite: false },
    { action: "Voir la trésorerie", admin: true, comptable: true, lecteur: true, invite: false },
    { action: "Modifier les paramètres", admin: true, comptable: false, lecteur: false, invite: false },
  ];

  if (sub === "Permissions") {
    return (
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Gestion des Permissions</h2>
        <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "12px 16px", background: COLORS.cream, gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy }}>Action</div>
            {roles.map((r, i) => <div key={i} style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, textAlign: "center" }}>{r}</div>)}
          </div>
          {permissions.map((p, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "12px 16px", borderTop: "1px solid #F1F5F9", gap: 8, alignItems: "center" }}>
              <div style={{ fontSize: 13, color: COLORS.navy }}>{p.action}</div>
              {[p.admin, p.comptable, p.lecteur, p.invite].map((val, j) => (
                <div key={j} style={{ textAlign: "center", fontSize: 16 }}>{val ? "✅" : "❌"}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Gestion des Utilisateurs</h2>
        <button style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Ajouter</button>
      </div>
      {UTILISATEURS.map((u, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{u.nom}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: u.statut === "actif" ? COLORS.greenLight : COLORS.redLight, color: u.statut === "actif" ? COLORS.green : COLORS.red }}>{u.statut}</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 4 }}>{u.email}</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: COLORS.slate }}>{u.entreprise}</span>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: COLORS.blueLight, color: COLORS.blue, fontWeight: 600 }}>{u.role}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>✏️ Modifier</button>
            <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.redLight, color: COLORS.red, cursor: "pointer", fontWeight: 600 }}>🗑 Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function FacturationPage({ sub }: { sub: string }) {
  if (sub === "Paiements") {
    return (
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Historique des Paiements</h2>
        <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          {PAIEMENTS.map((p, i) => (
            <div key={i} style={{ padding: "14px 16px", borderBottom: i < PAIEMENTS.length - 1 ? "1px solid #F8FAFC" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>{p.entreprise}</div>
                <div style={{ fontSize: 11, color: COLORS.slateLight }}>{p.date}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy }}>{p.montant} FCFA</div>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: p.statut === "payé" ? COLORS.greenLight : COLORS.redLight, color: p.statut === "payé" ? COLORS.green : COLORS.red, fontWeight: 600 }}>{p.statut}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sub === "Renouvellements") {
    return (
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Renouvellements à venir</h2>
        {ABONNEMENTS.map((a, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>{a.entreprise}</div>
              <div style={{ fontSize: 12, color: COLORS.slate }}>Plan {a.plan} · {a.prix} FCFA/mois</div>
              <div style={{ fontSize: 11, color: COLORS.slateLight }}>Renouvellement : {a.renouvellement}</div>
            </div>
            <button style={{ fontSize: 11, padding: "6px 12px", borderRadius: 6, border: "none", background: COLORS.gold, color: COLORS.navy, cursor: "pointer", fontWeight: 700 }}>Renouveler</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Abonnements</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { plan: "Starter", count: 2, prix: "15 000", color: COLORS.slate },
          { plan: "Business", count: 1, prix: "35 000", color: COLORS.gold },
          { plan: "Enterprise", count: 1, prix: "75 000", color: COLORS.green },
        ].map((p, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: 16, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", borderTop: `3px solid ${p.color}`, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>{p.plan}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: p.color }}>{p.count}</div>
            <div style={{ fontSize: 11, color: COLORS.slate }}>clients · {p.prix} FCFA</div>
          </div>
        ))}
      </div>
      {ABONNEMENTS.map((a, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>{a.entreprise}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: a.statut === "actif" ? COLORS.greenLight : COLORS.redLight, color: a.statut === "actif" ? COLORS.green : COLORS.red }}>{a.statut}</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 4 }}>Plan {a.plan} · {a.prix} FCFA/mois</div>
          <div style={{ fontSize: 11, color: COLORS.slateLight }}>Renouvellement : {a.renouvellement}</div>
        </div>
      ))}
    </div>
  );
}

function PlaceholderPage({ label }: { label: string }) {
  return (
    <div style={{ background: COLORS.white, borderRadius: 14, padding: "40px 20px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 13, color: COLORS.slate }}>Les données s'afficheront ici.</div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("supervision");
  const [activeSub, setActiveSub] = useState("");
  const [openMenus, setOpenMenus] = useState<string[]>(["supervision"]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleNav = (id: string, sub = "") => {
    setActiveNav(id);
    setActiveSub(sub);
    setMenuOpen(false);
  };

  const currentItem = NAV_ADMIN.find(n => n.id === activeNav);

  const renderPage = () => {
    switch (activeNav) {
      case "supervision": return <SupervisionPage />;
      case "entreprises": return <EntreprisesPage />;
      case "comptables": return <ComptablesPage />;
      case "utilisateurs": return <UtilisateursPage sub={activeSub} />;
      case "facturation": return <FacturationPage sub={activeSub} />;
      default: return <PlaceholderPage label={`${currentItem?.label}${activeSub ? ` — ${activeSub}` : ""}`} />;
    }
  };

  const SidebarContent = () => (
    <>
      <div style={{ padding: "18px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, background: COLORS.gold, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: COLORS.navy }}>B</div>
        <div>
          <div style={{ color: COLORS.white, fontWeight: 800, fontSize: 13 }}>BTEC Bénin</div>
          <div style={{ color: COLORS.red, fontSize: 9, letterSpacing: "0.08em", fontWeight: 700 }}>ADMINISTRATEUR</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        {NAV_ADMIN.map(item => (
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
      <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: COLORS.navy }}>A</div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 600 }}>Administrateur</div>
            <div style={{ color: COLORS.slateLight, fontSize: 10 }}>Cabinet BTEC</div>
          </div>
        </div>
        <button onClick={() => router.push("/login")} style={{ width: "100%", background: COLORS.redLight, color: COLORS.red, border: "none", borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          🚪 Déconnexion
        </button>
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
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .menu-mobile { display: flex !important; }
        }
      `}</style>
      <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: COLORS.cream, overflow: "hidden" }}>
        <div className="sidebar-desktop" style={{ width: 220, minWidth: 220, background: COLORS.navy, flexDirection: "column", overflow: "hidden" }}>
          <SidebarContent />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          <div style={{ background: COLORS.white, borderBottom: "1px solid #E2E8F0", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className="menu-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: COLORS.navy, padding: 0 }}>☰</button>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy }}>{currentItem?.label}{activeSub ? ` — ${activeSub}` : ""}</div>
                <div style={{ fontSize: 11, color: COLORS.red, fontWeight: 600 }}>Espace Administrateur</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ background: COLORS.cream, borderRadius: 8, padding: "6px 10px", fontSize: 13 }}>
                🔔<span style={{ background: COLORS.red, color: "white", borderRadius: "50%", width: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, marginLeft: 4 }}>5</span>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: COLORS.navy }}>A</div>
            </div>
          </div>
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
          <div style={{ flex: 1, overflowY: "auto", padding: 16, minWidth: 0 }}>
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  );
}
