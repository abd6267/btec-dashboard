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

const NAV = [
  { id: "accueil", icon: "⊞", label: "Accueil" },
  { id: "taches", icon: "📋", label: "Tâches à valider" },
  { id: "auxiliaires", icon: "👥", label: "Comptables auxiliaires" },
  { id: "compte", icon: "⚙", label: "Mon compte" },
];

const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const formatDateFr = (d: Date) => `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()} à ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

// ── Données de démonstration ────────────────────────────────────────────
const TACHES_INIT = [
  { id: 1, titre: "Saisie factures fournisseurs — Juin", auxiliaire: "Rafiatou Bello", entreprise: "SARL AKPLA Commerce", description: "12 factures fournisseurs saisies pour le mois de juin.", date: "28 Jun 2026 à 09:15", statut: "en_attente" },
  { id: 2, titre: "Rapprochement bancaire Mai", auxiliaire: "Emile Todjinou", entreprise: "BENIN TECH Services", description: "Rapprochement du compte BOA effectué, écart de 3 200 FCFA à vérifier.", date: "27 Jun 2026 à 16:40", statut: "en_attente" },
  { id: 3, titre: "Classement pièces justificatives", auxiliaire: "Rafiatou Bello", entreprise: "SARL AKPLA Commerce", description: "Classement et numérisation des pièces du 1er trimestre.", date: "25 Jun 2026 à 11:00", statut: "valide" },
  { id: 4, titre: "Saisie recettes caisse", auxiliaire: "Emile Todjinou", entreprise: "INDUSTRIE ZINSOU", description: "Saisie des recettes journalières de la semaine 25.", date: "24 Jun 2026 à 14:20", statut: "rejete" },
];

const AUXILIAIRES_INIT = [
  { id: 1, nom: "Bello", prenom: "Rafiatou", email: "rafiatou.bello@btec.bj", telephone: "+229 97 55 66 77", entreprises: ["SARL AKPLA Commerce"], statutConfirmation: "confirme", statutCompte: "actif" },
  { id: 2, nom: "Todjinou", prenom: "Emile", telephone: "+229 97 66 77 88", email: "emile.todjinou@btec.bj", entreprises: ["BENIN TECH Services", "INDUSTRIE ZINSOU"], statutConfirmation: "confirme", statutCompte: "actif" },
  { id: 3, nom: "Houngbo", prenom: "Carole", telephone: "+229 97 88 99 00", email: "carole.houngbo@btec.bj", entreprises: ["GIE ALAFIA"], statutConfirmation: "en_attente_admin", statutCompte: "en_attente" },
];

const ENTREPRISES = ["SARL AKPLA Commerce", "BENIN TECH Services", "INDUSTRIE ZINSOU", "GIE ALAFIA"];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10,
  border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none",
  boxSizing: "border-box", marginBottom: 12, color: COLORS.navy,
};

const btnStyle = (bg: string, color: string): React.CSSProperties => ({
  padding: "11px 20px", background: bg, color, border: "none",
  borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer",
});

function Modal({ titre, onClose, children }: { titre: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: COLORS.white, borderRadius: 16, padding: 24, width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy }}>{titre}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.slate }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StatutBadge({ statut }: { statut: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    en_attente: { label: "En attente", bg: COLORS.orangeLight, color: COLORS.orange },
    valide: { label: "Validé", bg: COLORS.greenLight, color: COLORS.green },
    rejete: { label: "Rejeté", bg: COLORS.redLight, color: COLORS.red },
    confirme: { label: "Confirmé", bg: COLORS.greenLight, color: COLORS.green },
    en_attente_admin: { label: "Attente confirmation admin", bg: COLORS.orangeLight, color: COLORS.orange },
    retrait_demande: { label: "Retrait demandé", bg: COLORS.redLight, color: COLORS.red },
    actif: { label: "actif", bg: COLORS.greenLight, color: COLORS.green },
  };
  const s = map[statut] || { label: statut, bg: COLORS.cream, color: COLORS.slate };
  return <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: s.bg, color: s.color, fontWeight: 700, whiteSpace: "nowrap" }}>{s.label}</span>;
}

// ── Accueil ──────────────────────────────────────────────────────────────
function AccueilPage({ taches, auxiliaires }: { taches: typeof TACHES_INIT; auxiliaires: typeof AUXILIAIRES_INIT }) {
  const enAttente = taches.filter(t => t.statut === "en_attente").length;
  const valides = taches.filter(t => t.statut === "valide").length;
  const auxActifs = auxiliaires.filter(a => a.statutCompte === "actif").length;
  const auxEnAttente = auxiliaires.filter(a => a.statutConfirmation === "en_attente_admin").length;

  const stats = [
    { label: "Tâches en attente", value: enAttente, icon: "⏳", color: COLORS.orange },
    { label: "Tâches validées", value: valides, icon: "✅", color: COLORS.green },
    { label: "Auxiliaires actifs", value: auxActifs, icon: "👥", color: COLORS.blue },
    { label: "Attente admin", value: auxEnAttente, icon: "🕓", color: COLORS.gold },
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
        <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14, marginBottom: 12 }}>Dernières tâches soumises</div>
        {taches.slice(0, 4).map((t, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? "1px solid #F8FAFC" : "none" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>{t.titre}</div>
              <div style={{ fontSize: 11, color: COLORS.slate }}>{t.auxiliaire} · {t.entreprise}</div>
            </div>
            <StatutBadge statut={t.statut} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tâches à valider ─────────────────────────────────────────────────────
function TachesPage({ taches, setTaches }: { taches: typeof TACHES_INIT; setTaches: (t: typeof TACHES_INIT) => void }) {
  const [filtre, setFiltre] = useState("en_attente");
  const [selected, setSelected] = useState<typeof TACHES_INIT[0] | null>(null);
  const [success, setSuccess] = useState("");
  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  const filtres = [
    { id: "en_attente", label: "En attente" },
    { id: "valide", label: "Validées" },
    { id: "rejete", label: "Rejetées" },
    { id: "toutes", label: "Toutes" },
  ];

  const tachesFiltrees = filtre === "toutes" ? taches : taches.filter(t => t.statut === filtre);

  const updateStatut = (id: number, statut: string) => {
    setTaches(taches.map(t => t.id === id ? { ...t, statut } : t));
    setSelected(null);
    showSuccess(statut === "valide" ? "Tâche validée avec succès !" : "Tâche rejetée.");
  };

  return (
    <div>
      {success && <div style={{ background: COLORS.greenLight, color: COLORS.green, padding: "10px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13 }}>✅ {success}</div>}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>Tâches soumises par les auxiliaires</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {filtres.map(f => (
          <button key={f.id} onClick={() => setFiltre(f.id)}
            style={{ padding: "7px 14px", borderRadius: 20, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", background: filtre === f.id ? COLORS.navy : COLORS.white, color: filtre === f.id ? COLORS.white : COLORS.slate, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            {f.label}
          </button>
        ))}
      </div>

      {tachesFiltrees.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: COLORS.slate }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>Aucune tâche dans cette catégorie</div>
        </div>
      )}

      {tachesFiltrees.map((t, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, gap: 8 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{t.titre}</div>
            <StatutBadge statut={t.statut} />
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 4 }}>👤 {t.auxiliaire} · 🏢 {t.entreprise}</div>
          <div style={{ fontSize: 11, color: COLORS.slateLight, marginBottom: 10 }}>🗓 {t.date}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => setSelected(t)} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>👁 Voir détail</button>
            {t.statut === "en_attente" && (
              <>
                <button onClick={() => updateStatut(t.id, "valide")} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.greenLight, color: COLORS.green, cursor: "pointer", fontWeight: 600 }}>✅ Valider</button>
                <button onClick={() => updateStatut(t.id, "rejete")} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.redLight, color: COLORS.red, cursor: "pointer", fontWeight: 600 }}>✖ Rejeter</button>
              </>
            )}
          </div>
        </div>
      ))}

      {selected && (
        <Modal titre={selected.titre} onClose={() => setSelected(null)}>
          <div style={{ marginBottom: 14 }}>
            <StatutBadge statut={selected.statut} />
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 6 }}>👤 Soumis par <b style={{ color: COLORS.navy }}>{selected.auxiliaire}</b></div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 6 }}>🏢 Entreprise : <b style={{ color: COLORS.navy }}>{selected.entreprise}</b></div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 14 }}>🗓 {selected.date}</div>
          <div style={{ background: COLORS.cream, borderRadius: 10, padding: 14, fontSize: 13, color: COLORS.navy, lineHeight: 1.6, marginBottom: 18 }}>
            {selected.description}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setSelected(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Fermer</button>
            {selected.statut === "en_attente" && (
              <>
                <button onClick={() => updateStatut(selected.id, "rejete")} style={btnStyle(COLORS.red, COLORS.white)}>✖ Rejeter</button>
                <button onClick={() => updateStatut(selected.id, "valide")} style={btnStyle(COLORS.green, COLORS.white)}>✅ Valider</button>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Comptables auxiliaires ───────────────────────────────────────────────
const EMPTY_AUX = { nom: "", prenom: "", telephone: "", email: "", motDePasse: "", entreprises: [] as string[] };

function AuxiliairesPage({ auxiliaires, setAuxiliaires }: { auxiliaires: typeof AUXILIAIRES_INIT; setAuxiliaires: (a: typeof AUXILIAIRES_INIT) => void }) {
  const [modal, setModal] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof AUXILIAIRES_INIT[0] | null>(null);
  const [form, setForm] = useState(EMPTY_AUX);
  const [success, setSuccess] = useState("");
  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 4000); };

  const toggleEntreprise = (nom: string) => {
    setForm(prev => prev.entreprises.includes(nom)
      ? { ...prev, entreprises: prev.entreprises.filter(e => e !== nom) }
      : { ...prev, entreprises: [...prev.entreprises, nom] });
  };

  const handleAjouter = () => {
    if (form.nom && form.prenom && form.telephone && form.email && form.motDePasse) {
      setAuxiliaires([...auxiliaires, {
        id: Date.now(), nom: form.nom, prenom: form.prenom, telephone: form.telephone,
        email: form.email, entreprises: form.entreprises, statutConfirmation: "en_attente_admin", statutCompte: "en_attente",
      }]);
      setModal(null);
      showSuccess("Compte créé. En attente de confirmation par l'administrateur avant activation.");
    }
  };

  const demanderRetrait = (id: number) => {
    setAuxiliaires(auxiliaires.map(a => a.id === id ? { ...a, statutConfirmation: "retrait_demande" } : a));
    setModal(null);
    showSuccess("Demande de retrait envoyée à l'administrateur.");
  };

  return (
    <div>
      {success && <div style={{ background: COLORS.greenLight, color: COLORS.green, padding: "10px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13, lineHeight: 1.5 }}>✅ {success}</div>}

      <div style={{ background: COLORS.blueLight, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: COLORS.navy, marginBottom: 18, lineHeight: 1.5 }}>
        ℹ️ Vous pouvez ajouter ou retirer un comptable auxiliaire, mais chaque action doit être <b>confirmée par l'administrateur</b> avant de prendre effet.
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Comptables auxiliaires</h2>
        <button onClick={() => { setForm(EMPTY_AUX); setModal("ajouter"); }} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Ajouter</button>
      </div>

      {auxiliaires.map((a, i) => (
        <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, gap: 8 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{a.prenom} {a.nom}</div>
            <StatutBadge statut={a.statutConfirmation} />
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 4 }}>{a.email} · 📞 {a.telephone}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {a.entreprises.length === 0 ? (
              <span style={{ fontSize: 11, color: COLORS.slateLight }}>Aucune entreprise assignée</span>
            ) : a.entreprises.map(e => (
              <span key={e} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: COLORS.cream, color: COLORS.navy, fontWeight: 600 }}>{e}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {a.statutConfirmation !== "retrait_demande" && (
              <button onClick={() => { setSelected(a); setModal("retirer"); }} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.redLight, color: COLORS.red, cursor: "pointer", fontWeight: 600 }}>🗑 Demander le retrait</button>
            )}
            {a.statutConfirmation === "retrait_demande" && (
              <span style={{ fontSize: 11, color: COLORS.slateLight, fontStyle: "italic" }}>En attente de confirmation de l'administrateur pour le retrait</span>
            )}
          </div>
        </div>
      ))}

      {modal === "ajouter" && (
        <Modal titre="Ajouter un comptable auxiliaire" onClose={() => setModal(null)}>
          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Nom *</label>
          <input style={inputStyle} placeholder="Ex: Bello" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Prénom *</label>
          <input style={inputStyle} placeholder="Ex: Rafiatou" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} />
          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Téléphone *</label>
          <input style={inputStyle} type="tel" placeholder="Ex: +229 97 00 00 00" value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} />
          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Email *</label>
          <input style={inputStyle} type="email" placeholder="Ex: rafiatou@btec.bj" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 4 }}>Mot de passe *</label>
          <input style={inputStyle} type="password" placeholder="••••••••" value={form.motDePasse} onChange={e => setForm({ ...form, motDePasse: e.target.value })} />
          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Entreprises à assigner</label>
          <div style={{ marginBottom: 16 }}>
            {ENTREPRISES.map(ent => (
              <label key={ent} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}>
                <input type="checkbox" checked={form.entreprises.includes(ent)} onChange={() => toggleEntreprise(ent)} />
                <span style={{ fontSize: 13, color: COLORS.navy }}>{ent}</span>
              </label>
            ))}
          </div>
          <div style={{ background: COLORS.orangeLight, color: COLORS.orange, padding: "9px 12px", borderRadius: 8, fontSize: 12, marginBottom: 16, fontWeight: 500 }}>
            ⚠ Le compte restera inactif tant que l'administrateur n'a pas confirmé la création.
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={handleAjouter} style={btnStyle(COLORS.gold, COLORS.navy)}>Créer (envoyer pour confirmation)</button>
          </div>
        </Modal>
      )}

      {modal === "retirer" && selected && (
        <Modal titre="Demander le retrait" onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: COLORS.slate, marginBottom: 20, lineHeight: 1.6 }}>
            Retirer <b style={{ color: COLORS.navy }}>{selected.prenom} {selected.nom}</b> de la plateforme ?
            Cette demande sera envoyée à l'administrateur pour confirmation avant suppression définitive.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={btnStyle("#F1F5F9", COLORS.slate)}>Annuler</button>
            <button onClick={() => demanderRetrait(selected.id)} style={btnStyle(COLORS.red, COLORS.white)}>Envoyer la demande</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Mon compte ────────────────────────────────────────────────────────────
function ComptePage() {
  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Mon compte</h2>
      <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, color: COLORS.navy }}>C</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy }}>Comptable Principal</div>
            <div style={{ fontSize: 12, color: COLORS.slate }}>comptable@btec.bj</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 10 }}>Statut du compte</div>
        <StatutBadge statut="actif" />
        <div style={{ fontSize: 11, color: COLORS.slateLight, marginTop: 14, lineHeight: 1.6 }}>
          Ce compte est géré par l'administrateur de la plateforme, qui peut l'ajouter ou le retirer à tout moment.
        </div>
      </div>
    </div>
  );
}

export default function ComptablePage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [taches, setTaches] = useState(TACHES_INIT);
  const [auxiliaires, setAuxiliaires] = useState(AUXILIAIRES_INIT);

  const enAttenteCount = taches.filter(t => t.statut === "en_attente").length;

  const currentItem = NAV.find(n => n.id === activeNav);

  const renderPage = () => {
    switch (activeNav) {
      case "accueil": return <AccueilPage taches={taches} auxiliaires={auxiliaires} />;
      case "taches": return <TachesPage taches={taches} setTaches={setTaches} />;
      case "auxiliaires": return <AuxiliairesPage auxiliaires={auxiliaires} setAuxiliaires={setAuxiliaires} />;
      case "compte": return <ComptePage />;
      default: return null;
    }
  };

  const SidebarContent = () => (
    <>
      <div style={{ padding: "18px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, background: COLORS.gold, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: COLORS.navy }}>B</div>
        <div>
          <div style={{ color: COLORS.white, fontWeight: 800, fontSize: 13 }}>BTEC Bénin</div>
          <div style={{ color: COLORS.gold, fontSize: 9, letterSpacing: "0.08em", fontWeight: 700 }}>COMPTABLE</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        {NAV.map(item => (
          <div key={item.id} onClick={() => { setActiveNav(item.id); setMenuOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 8px", borderRadius: 8, cursor: "pointer", marginBottom: 1, background: activeNav === item.id ? COLORS.navyLight : "transparent", borderLeft: activeNav === item.id ? `3px solid ${COLORS.gold}` : "3px solid transparent" }}>
            <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
            <span style={{ fontSize: 12, color: activeNav === item.id ? COLORS.white : COLORS.slateLight, fontWeight: activeNav === item.id ? 600 : 400, flex: 1 }}>{item.label}</span>
            {item.id === "taches" && enAttenteCount > 0 && (
              <span style={{ background: COLORS.red, color: "white", borderRadius: "50%", minWidth: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, padding: "0 4px" }}>{enAttenteCount}</span>
            )}
          </div>
        ))}
      </nav>
      <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: COLORS.navy }}>C</div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 600 }}>Comptable</div>
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
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy }}>{currentItem?.label}</div>
                <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 600 }}>Espace Comptable</div>
              </div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: COLORS.navy }}>C</div>
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