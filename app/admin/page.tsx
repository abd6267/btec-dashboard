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

const TYPES_ENTREPRISE = ["SARL", "SA", "SAS", "EURL", "GIE", "Association", "Autre"];
const SECTEURS = ["Commerce", "Services", "Industrie", "Agriculture", "BTP", "Santé", "Éducation", "Transport", "Autre"];
const ROLES = ["Administrateur", "Comptable", "Secrétaire caissière"];

const ENTREPRISES_DATA = [
  { id: 1, nom: "SARL AKPLA Commerce", type: "SARL", secteur: "Commerce", rccm: "RB/COT/24 A 12345", ifu: "123456789", telephone: "+229 97 00 00 01", localisation: "Cotonou, Mènontin", statut: "actif", users: 3, abonnement: "Business" },
  { id: 2, nom: "BENIN TECH Services", type: "SAS", secteur: "Services", rccm: "RB/COT/23 A 67890", ifu: "987654321", telephone: "+229 97 00 00 02", localisation: "Cotonou, Akpakpa", statut: "actif", users: 2, abonnement: "Starter" },
  { id: 3, nom: "INDUSTRIE ZINSOU", type: "SA", secteur: "Industrie", rccm: "RB/COT/22 A 11111", ifu: "111222333", telephone: "+229 97 00 00 03", localisation: "Porto-Novo", statut: "actif", users: 4, abonnement: "Enterprise" },
  { id: 4, nom: "GIE ALAFIA", type: "GIE", secteur: "Agriculture", rccm: "RB/COT/21 A 22222", ifu: "444555666", telephone: "+229 97 00 00 04", localisation: "Parakou", statut: "suspendu", users: 1, abonnement: "Starter" },
];

const COMPTABLES_DATA = [
  { id: 1, nom: "Moumouni Nabil", email: "nabil@btec.bj", entreprises: 3, statut: "actif" },
  { id: 2, nom: "Adjobo Sylvie", email: "sylvie@btec.bj", entreprises: 2, statut: "actif" },
  { id: 3, nom: "Koffi Jean", email: "jean@btec.bj", entreprises: 1, statut: "inactif" },
];

const UTILISATEURS_DATA = [
  { id: 1, nom: "Kofi Mensah", email: "kofi@akpla.bj", entreprise: "SARL AKPLA", role: "Administrateur", statut: "actif" },
  { id: 2, nom: "Aminata Diallo", email: "aminata@benintech.bj", entreprise: "BENIN TECH", role: "Comptable", statut: "actif" },
  { id: 3, nom: "Jean Zinsou", email: "jean@zinsou.bj", entreprise: "INDUSTRIE ZINSOU", role: "Administrateur", statut: "actif" },
  { id: 4, nom: "Marie Alafia", email: "marie@alafia.bj", entreprise: "GIE ALAFIA", role: "Secrétaire caissière", statut: "suspendu" },
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

const INIT_PERMISSIONS = [
  { action: "Voir les rapports", comptable: true, secretaire: true },
  { action: "Créer des factures", comptable: true, secretaire: true },
  { action: "Gérer les utilisateurs", comptable: false, secretaire: false },
  { action: "Déposer des documents", comptable: true, secretaire: false },
  { action: "Voir la trésorerie", comptable: true, secretaire: true },
  { action: "Modifier les paramètres", comptable: false, secretaire: false },
  { action: "Saisir les recettes", comptable: true, secretaire: true },
  { action: "Valider les opérations", comptable: true, secretaire: false },
];

function Modal({ titre, onClose, children }: { titre: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: COLORS.white, borderRadius: 16, padding: 24, width: "100%", maxWidth: 500, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy }}>{titre}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.slate }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10,
  border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none",
  boxSizing: "border-box", marginBottom: 12, color: COLORS.navy,
};

const btnStyle = (bg: string, color: string): React.CSSProperties => ({
  padding: "11px 20px", background: bg, color, border: "none",
  borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer",
});

const EMPTY_ENT = { nom: "", type: "SARL", secteur: "Commerce", rccm: "", ifu: "", telephone: "", localisation: "", abonnement: "Starter" };

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
            <div style={{ fontSize: 11, color: COLORS.slateLight }}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EntreprisesPage() {
  const [entreprises, setEntreprises] = useState(ENTREPRISES_DATA);
  const [modal, setModal] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof ENTREPRISES_DATA[0] | null>(null);
  const [form, setForm] = useState(EMPTY_ENT);
  const [success, setSuccess] = useState("");

  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  const FormEntreprise = () => (
    <>
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Nom de l'entreprise *</label>
      <input style={inputStyle} placeholder="Ex: SARL AKPLA Commerce" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Type d'entreprise</label>
      <select style={inputStyle} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
        {TYPES_ENTREPRISE.map(t => <option key={t}>{t}</option>)}
      </select>
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Secteur d'activité</label>
      <select style={inputStyle} value={form.secteur} onChange={e => setForm({ ...form, secteur: e.target.value })}>
        {SECTEURS.map(s => <option key={s}>{s}</option>)}
      </select>
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>N° RCCM</label>
      <input style={inputStyle} placeholder="Ex: RB/COT/24 A 12345" value={form.rccm} onChange={e => setForm({ ...form, rccm: e.target.value })} />
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>N° IFU</label>
      <input style={inputStyle} placeholder="Ex: 123456789" value={form.ifu} onChange={e => setForm({ ...form, ifu: e.target.value })} />
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Téléphone</label>
      <input style={inputStyle} placeholder="Ex: +229 97 00 00 00" value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} />
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Situation géographique</label>
      <input style={inputStyle} placeholder="Ex: Cotonou, Mènontin" value={form.localisation} onChange={e => setForm({ ...form, localisation: e.target.value })} />
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Plan d'abonnement</label>
      <select style={inputStyle} value={form.abonnement} onChange={e => setForm({ ...form, abonnement: e.target.value })}>
        <option>Starter</option><option>Business</option><option>Enterprise</option>
      </select>
    </>
  );

  return (
    <div>
      {success && <div style={{ background: COLORS.greenLight, color: COLORS.green, padding: "10px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13 }}>✅ {success}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Gestion des Entreprises</h2>
        <button onClick={() => { setForm(EMPTY_ENT); setModal("creer"); }} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Créer</button>
      </div>
      {entreprises.map((e, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{e.nom}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: e.statut === "actif" ? COLORS.greenLight : COLORS.redLight, color: e.statut === "actif" ? COLORS.green : COLORS.red }}>{e.statut}</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 4 }}>{e.type} · {e.secteur} · Plan {e.abonnement}</div>
          <div style={{ fontSize: 11, color: COLORS.slateLight, marginBottom: 4 }}>📞 {e.telephone} · 📍 {e.localisation}</div>
          <div style={{ fontSize: 11, color: COLORS.slateLight, marginBottom: 10 }}>RCCM: {e.rccm} · IFU: {e.ifu}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setSelected(e); setForm({ nom: e.nom, type: e.type, secteur: e.secteur, rccm: e.rccm, ifu: e.ifu, telephone: e.telephone, localisation: e.localisation, abonnement: e.abonnement }); setModal("modifier"); }} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>✏️ Modifier</button>
            <button onClick={() => { setSelected(e); setModal("suspendre"); }} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.orangeLight, color: COLORS.orange, cursor: "pointer", fontWeight: 600 }}>⏸ {e.statut === "actif" ? "Suspendre" : "Réactiver"}</button>
          </div>
        </div>
      ))}
      {modal === "creer" && (
        <Modal titre="Créer une entreprise" onClose={() => setModal(null)}>
          <FormEntreprise />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => { if (form.nom) { setEntreprises([...entreprises, { id: Date.now(), ...form, statut: "actif", users: 0 }]); setModal(null); showSuccess("Entreprise créée !"); } }} style={btnStyle(COLORS.gold, COLORS.navy)}>Créer</button>
          </div>
        </Modal>
      )}
      {modal === "modifier" && selected && (
        <Modal titre={`Modifier — ${selected.nom}`} onClose={() => setModal(null)}>
          <FormEntreprise />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => { setEntreprises(entreprises.map(e => e.id === selected.id ? { ...e, ...form } : e)); setModal(null); showSuccess("Modifié !"); }} style={btnStyle(COLORS.navy, COLORS.white)}>Enregistrer</button>
          </div>
        </Modal>
      )}
      {modal === "suspendre" && selected && (
        <Modal titre={selected.statut === "actif" ? "Suspendre" : "Réactiver"} onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: COLORS.slate, marginBottom: 20 }}>{selected.statut === "actif" ? `Suspendre ${selected.nom} ?` : `Réactiver ${selected.nom} ?`}</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => { setEntreprises(entreprises.map(e => e.id === selected.id ? { ...e, statut: e.statut === "actif" ? "suspendu" : "actif" } : e)); setModal(null); showSuccess("Statut mis à jour !"); }} style={btnStyle(selected.statut === "actif" ? COLORS.orange : COLORS.green, COLORS.white)}>Confirmer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ComptablesPage() {
  const [comptables, setComptables] = useState(COMPTABLES_DATA);
  const [modal, setModal] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof COMPTABLES_DATA[0] | null>(null);
  const [form, setForm] = useState({ nom: "", email: "" });
  const [success, setSuccess] = useState("");
  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  return (
    <div>
      {success && <div style={{ background: COLORS.greenLight, color: COLORS.green, padding: "10px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13 }}>✅ {success}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Gestion des Comptables</h2>
        <button onClick={() => { setForm({ nom: "", email: "" }); setModal("ajouter"); }} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Ajouter</button>
      </div>
      {comptables.map((c, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{c.nom}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: c.statut === "actif" ? COLORS.greenLight : COLORS.cream, color: c.statut === "actif" ? COLORS.green : COLORS.slate }}>{c.statut}</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 10 }}>{c.email} · {c.entreprises} entreprises</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setSelected(c); setForm({ nom: c.nom, email: c.email }); setModal("modifier"); }} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>✏️ Modifier</button>
            <button onClick={() => { setSelected(c); setModal("supprimer"); }} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.redLight, color: COLORS.red, cursor: "pointer", fontWeight: 600 }}>🗑 Supprimer</button>
          </div>
        </div>
      ))}
      {modal === "ajouter" && (
        <Modal titre="Ajouter un comptable" onClose={() => setModal(null)}>
          <input style={inputStyle} placeholder="Nom complet" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
          <input style={inputStyle} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => { if (form.nom && form.email) { setComptables([...comptables, { id: Date.now(), ...form, entreprises: 0, statut: "actif" }]); setModal(null); showSuccess("Ajouté !"); } }} style={btnStyle(COLORS.gold, COLORS.navy)}>Ajouter</button>
          </div>
        </Modal>
      )}
      {modal === "modifier" && selected && (
        <Modal titre={`Modifier — ${selected.nom}`} onClose={() => setModal(null)}>
          <input style={inputStyle} placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
          <input style={inputStyle} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => { setComptables(comptables.map(c => c.id === selected.id ? { ...c, ...form } : c)); setModal(null); showSuccess("Modifié !"); }} style={btnStyle(COLORS.navy, COLORS.white)}>Enregistrer</button>
          </div>
        </Modal>
      )}
      {modal === "supprimer" && selected && (
        <Modal titre="Supprimer" onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: COLORS.slate, marginBottom: 20 }}>Supprimer <b>{selected.nom}</b> ?</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => { setComptables(comptables.filter(c => c.id !== selected.id)); setModal(null); showSuccess("Supprimé !"); }} style={btnStyle(COLORS.red, COLORS.white)}>Supprimer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function UtilisateursPage({ sub }: { sub: string }) {
  const [utilisateurs, setUtilisateurs] = useState(UTILISATEURS_DATA);
  const [permissions, setPermissions] = useState(INIT_PERMISSIONS);
  const [modal, setModal] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof UTILISATEURS_DATA[0] | null>(null);
  const [form, setForm] = useState({ nom: "", email: "", role: "Comptable", entreprise: "" });
  const [success, setSuccess] = useState("");
  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  const togglePerm = (i: number, col: "comptable" | "secretaire") => {
    setPermissions(permissions.map((p, idx) => idx === i ? { ...p, [col]: !p[col] } : p));
  };

  if (sub === "Permissions") {
    return (
      <div>
        {success && <div style={{ background: COLORS.greenLight, color: COLORS.green, padding: "10px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13 }}>✅ {success}</div>}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Gestion des Permissions</h2>
          <button onClick={() => showSuccess("Permissions enregistrées !")} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>💾 Enregistrer</button>
        </div>
        <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "12px 16px", background: COLORS.cream }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy }}>Action</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, textAlign: "center" }}>Administrateur</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, textAlign: "center" }}>Comptable</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, textAlign: "center" }}>Sec. Caissière</div>
          </div>
          {permissions.map((p, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "12px 16px", borderTop: "1px solid #F1F5F9", alignItems: "center" }}>
              <div style={{ fontSize: 13, color: COLORS.navy }}>{p.action}</div>
              {/* Administrateur — fixe, non modifiable */}
              <div style={{ textAlign: "center", fontSize: 16 }}>✅</div>
              {/* Comptable — modifiable */}
              <div style={{ textAlign: "center" }}>
                <button onClick={() => togglePerm(i, "comptable")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>
                  {p.comptable ? "✅" : "❌"}
                </button>
              </div>
              {/* Secrétaire caissière — modifiable */}
              <div style={{ textAlign: "center" }}>
                <button onClick={() => togglePerm(i, "secretaire")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>
                  {p.secretaire ? "✅" : "❌"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: COLORS.slate }}>💡 Cliquez sur ✅ ou ❌ pour modifier. L'administrateur a toujours tous les droits.</div>
      </div>
    );
  }

  return (
    <div>
      {success && <div style={{ background: COLORS.greenLight, color: COLORS.green, padding: "10px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13 }}>✅ {success}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Gestion des Utilisateurs</h2>
        <button onClick={() => { setForm({ nom: "", email: "", role: "Comptable", entreprise: "" }); setModal("ajouter"); }} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Ajouter</button>
      </div>
      {utilisateurs.map((u, i) => (
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
            <button onClick={() => { setSelected(u); setForm({ nom: u.nom, email: u.email, role: u.role, entreprise: u.entreprise }); setModal("modifier"); }} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>✏️ Modifier</button>
            <button onClick={() => { setSelected(u); setModal("supprimer"); }} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.redLight, color: COLORS.red, cursor: "pointer", fontWeight: 600 }}>🗑 Supprimer</button>
          </div>
        </div>
      ))}
      {modal === "ajouter" && (
        <Modal titre="Ajouter un utilisateur" onClose={() => setModal(null)}>
          <input style={inputStyle} placeholder="Nom complet" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
          <input style={inputStyle} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input style={inputStyle} placeholder="Entreprise" value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })} />
          <select style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => { if (form.nom && form.email) { setUtilisateurs([...utilisateurs, { id: Date.now(), ...form, statut: "actif" }]); setModal(null); showSuccess("Ajouté !"); } }} style={btnStyle(COLORS.gold, COLORS.navy)}>Ajouter</button>
          </div>
        </Modal>
      )}
      {modal === "modifier" && selected && (
        <Modal titre={`Modifier — ${selected.nom}`} onClose={() => setModal(null)}>
          <input style={inputStyle} placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
          <input style={inputStyle} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <select style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => { setUtilisateurs(utilisateurs.map(u => u.id === selected.id ? { ...u, ...form } : u)); setModal(null); showSuccess("Modifié !"); }} style={btnStyle(COLORS.navy, COLORS.white)}>Enregistrer</button>
          </div>
        </Modal>
      )}
      {modal === "supprimer" && selected && (
        <Modal titre="Supprimer" onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: COLORS.slate, marginBottom: 20 }}>Supprimer <b>{selected.nom}</b> ?</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => { setUtilisateurs(utilisateurs.filter(u => u.id !== selected.id)); setModal(null); showSuccess("Supprimé !"); }} style={btnStyle(COLORS.red, COLORS.white)}>Supprimer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function RapportsPage({ sub }: { sub: string }) {
  const [rapports, setRapports] = useState([
    { id: 1, titre: "Bilan global S1 2025", type: "Bilan", entreprise: "Toutes", date: "30 Jun 2025", statut: "généré" },
    { id: 2, titre: "Compte de résultat Mai", type: "CdR", entreprise: "Toutes", date: "31 Mai 2025", statut: "généré" },
    { id: 3, titre: "Balance AKPLA Juin", type: "Balance", entreprise: "SARL AKPLA Commerce", date: "25 Jun 2025", statut: "généré" },
    { id: 4, titre: "Flux trésorerie ZINSOU", type: "Trésorerie", entreprise: "INDUSTRIE ZINSOU", date: "20 Jun 2025", statut: "en cours" },
  ]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ titre: "", type: "Bilan", entreprise: "Toutes", periode: "" });
  const [success, setSuccess] = useState("");
  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  const rapportsFiltres = sub === "Par entreprise"
    ? rapports.filter(r => r.entreprise !== "Toutes")
    : rapports.filter(r => r.entreprise === "Toutes");

  const handleGenerer = () => {
    if (form.titre && form.periode) {
      const now = new Date().toLocaleDateString("fr-FR");
      setRapports([...rapports, { id: Date.now(), titre: form.titre, type: form.type, entreprise: sub === "Par entreprise" ? form.entreprise : "Toutes", date: now, statut: "généré" }]);
      setModal(false);
      showSuccess("Rapport généré avec succès !");
    }
  };

  return (
    <div>
      {success && <div style={{ background: COLORS.greenLight, color: COLORS.green, padding: "10px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13 }}>✅ {success}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>
          Rapports — {sub || "Global"}
        </h2>
        <button onClick={() => { setForm({ titre: "", type: "Bilan", entreprise: "SARL AKPLA Commerce", periode: "" }); setModal(true); }}
          style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
          + Générer
        </button>
      </div>

      {rapportsFiltres.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: COLORS.slate }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>Aucun rapport pour cette catégorie</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Cliquez sur "+ Générer" pour créer un rapport.</div>
        </div>
      )}

      {rapportsFiltres.map((r, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{r.titre}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: r.statut === "généré" ? COLORS.greenLight : COLORS.orangeLight, color: r.statut === "généré" ? COLORS.green : COLORS.orange }}>{r.statut}</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 10 }}>
            {r.type} · {r.entreprise} · {r.date}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>👁 Aperçu</button>
            <button style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.greenLight, color: COLORS.green, cursor: "pointer", fontWeight: 600 }}>📥 Télécharger</button>
            <button onClick={() => { setRapports(rapports.filter(rp => rp.id !== r.id)); showSuccess("Rapport supprimé !"); }} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.redLight, color: COLORS.red, cursor: "pointer", fontWeight: 600 }}>🗑 Supprimer</button>
          </div>
        </div>
      ))}

      {modal && (
        <Modal titre={`Générer un rapport — ${sub || "Global"}`} onClose={() => setModal(false)}>
          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Titre du rapport *</label>
          <input style={inputStyle} placeholder="Ex: Bilan S1 2025" value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })} />

          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Type de rapport</label>
          <select style={inputStyle} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            {["Bilan", "Compte de résultat", "Balance", "Flux de trésorerie", "Grand livre", "Déclaration TVA"].map(t => <option key={t}>{t}</option>)}
          </select>

          {sub === "Par entreprise" && (
            <>
              <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Entreprise</label>
              <select style={inputStyle} value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })}>
                {ENTREPRISES_DATA.map(e => <option key={e.id}>{e.nom}</option>)}
              </select>
            </>
          )}

          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Période *</label>
          <input style={inputStyle} placeholder="Ex: Juin 2025 ou S1 2025" value={form.periode} onChange={e => setForm({ ...form, periode: e.target.value })} />

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(false)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={handleGenerer} style={btnStyle(COLORS.gold, COLORS.navy)}>Générer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function FacturationPage({ sub }: { sub: string }) {
  const [success, setSuccess] = useState("");

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
        {success && <div style={{ background: COLORS.greenLight, color: COLORS.green, padding: "10px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13 }}>✅ {success}</div>}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Renouvellements</h2>
        {ABONNEMENTS.map((a, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>{a.entreprise}</div>
              <div style={{ fontSize: 12, color: COLORS.slate }}>Plan {a.plan} · {a.prix} FCFA/mois</div>
              <div style={{ fontSize: 11, color: COLORS.slateLight }}>Renouvellement : {a.renouvellement}</div>
            </div>
            <button onClick={() => { setSuccess(`${a.entreprise} renouvelé !`); setTimeout(() => setSuccess(""), 3000); }} style={{ fontSize: 11, padding: "6px 12px", borderRadius: 6, border: "none", background: COLORS.gold, color: COLORS.navy, cursor: "pointer", fontWeight: 700 }}>Renouveler</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Abonnements</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {[{ plan: "Starter", count: 2, prix: "15 000", color: COLORS.slate }, { plan: "Business", count: 1, prix: "35 000", color: COLORS.gold }, { plan: "Enterprise", count: 1, prix: "75 000", color: COLORS.green }].map((p, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: 16, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", borderTop: `3px solid ${p.color}`, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>{p.plan}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: p.color }}>{p.count}</div>
            <div style={{ fontSize: 11, color: COLORS.slate }}>{p.prix} FCFA</div>
          </div>
        ))}
      </div>
      {ABONNEMENTS.map((a, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>{a.entreprise}</div>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: a.statut === "actif" ? COLORS.greenLight : COLORS.redLight, color: a.statut === "actif" ? COLORS.green : COLORS.red }}>{a.statut}</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate }}>Plan {a.plan} · {a.prix} FCFA/mois · Renouvellement : {a.renouvellement}</div>
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
      case "rapports": return <RapportsPage sub={activeSub} />;
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