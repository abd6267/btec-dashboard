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
  { id: "soumettre", icon: "📤", label: "Soumettre un travail" },
  { id: "historique", icon: "📋", label: "Mes tâches" },
  { id: "compte", icon: "⚙", label: "Mon compte" },
];

// Compte de démonstration connecté (dans la vraie plateforme, cela viendrait
// de la session — chaque auxiliaire n'a accès qu'à ses propres tâches).
const AUXILIAIRE_ACTUEL = { nom: "Bello", prenom: "Rafiatou", email: "rafiatou.bello@btec.bj" };
const ENTREPRISES_ASSIGNEES = ["SARL AKPLA Commerce"];

const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const formatDateFr = (d: Date) => `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()} à ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

const TACHES_INIT = [
  { id: 1, titre: "Saisie factures fournisseurs — Juin", entreprise: "SARL AKPLA Commerce", description: "12 factures fournisseurs saisies pour le mois de juin.", date: "28 Jun 2026 à 09:15", statut: "en_attente" },
  { id: 2, titre: "Classement pièces justificatives", entreprise: "SARL AKPLA Commerce", description: "Classement et numérisation des pièces du 1er trimestre.", date: "25 Jun 2026 à 11:00", statut: "valide" },
  { id: 3, titre: "Saisie recettes caisse — Semaine 24", entreprise: "SARL AKPLA Commerce", description: "Saisie des recettes journalières de la semaine 24.", date: "20 Jun 2026 à 14:20", statut: "rejete" },
];

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
    en_attente: { label: "En attente de validation", bg: COLORS.orangeLight, color: COLORS.orange },
    valide: { label: "Validé par le comptable", bg: COLORS.greenLight, color: COLORS.green },
    rejete: { label: "Rejeté — à corriger", bg: COLORS.redLight, color: COLORS.red },
  };
  const s = map[statut] || { label: statut, bg: COLORS.cream, color: COLORS.slate };
  return <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: s.bg, color: s.color, fontWeight: 700, whiteSpace: "nowrap" }}>{s.label}</span>;
}

function AccueilPage({ taches }: { taches: typeof TACHES_INIT }) {
  const enAttente = taches.filter(t => t.statut === "en_attente").length;
  const valides = taches.filter(t => t.statut === "valide").length;
  const rejetes = taches.filter(t => t.statut === "rejete").length;

  const stats = [
    { label: "En attente", value: enAttente, icon: "⏳", color: COLORS.orange },
    { label: "Validées", value: valides, icon: "✅", color: COLORS.green },
    { label: "Rejetées", value: rejetes, icon: "✖", color: COLORS.red },
  ];

  return (
    <div>
      <div style={{ background: COLORS.white, borderRadius: 14, padding: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Bonjour {AUXILIAIRE_ACTUEL.prenom} 👋</div>
        <div style={{ fontSize: 13, color: COLORS.slate }}>Entreprise(s) assignée(s) : {ENTREPRISES_ASSIGNEES.join(", ")}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
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
      <div style={{ background: COLORS.blueLight, borderRadius: 10, padding: "12px 16px", fontSize: 12, color: COLORS.navy, lineHeight: 1.6 }}>
        ℹ️ Chaque travail que vous soumettez est envoyé au comptable en charge de votre entreprise, qui le vérifie avant de le valider.
      </div>
    </div>
  );
}

function SoumettrePage({ taches, setTaches }: { taches: typeof TACHES_INIT; setTaches: (t: typeof TACHES_INIT) => void }) {
  const [form, setForm] = useState({ titre: "", entreprise: ENTREPRISES_ASSIGNEES[0] || "", description: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!form.titre || !form.description) {
      setError("Veuillez renseigner le titre et la description du travail.");
      return;
    }
    const now = new Date();
    setTaches([{ id: Date.now(), titre: form.titre, entreprise: form.entreprise, description: form.description, date: formatDateFr(now), statut: "en_attente" }, ...taches]);
    setForm({ titre: "", entreprise: ENTREPRISES_ASSIGNEES[0] || "", description: "" });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Soumettre un travail</h2>

      {success && (
        <div style={{ background: COLORS.greenLight, color: COLORS.green, padding: "12px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13 }}>
          ✅ Travail envoyé au comptable pour vérification.
        </div>
      )}

      <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Titre du travail *</label>
        <input style={inputStyle} placeholder="Ex: Saisie factures fournisseurs — Juillet" value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })} />

        <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Entreprise concernée</label>
        <select style={inputStyle} value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })}>
          {ENTREPRISES_ASSIGNEES.map(ent => <option key={ent}>{ent}</option>)}
        </select>

        <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Description du travail effectué *</label>
        <textarea style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} rows={5} placeholder="Décrivez le travail réalisé, les éléments joints, remarques éventuelles..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

        {error && (
          <div style={{ background: COLORS.redLight, color: COLORS.red, padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 500 }}>⚠ {error}</div>
        )}

        <button onClick={handleSubmit} style={{ ...btnStyle(COLORS.navy, COLORS.white), width: "100%" }}>📤 Envoyer au comptable</button>
      </div>
    </div>
  );
}

function HistoriquePage({ taches }: { taches: typeof TACHES_INIT }) {
  const [filtre, setFiltre] = useState("toutes");
  const [selected, setSelected] = useState<typeof TACHES_INIT[0] | null>(null);

  const filtres = [
    { id: "toutes", label: "Toutes" },
    { id: "en_attente", label: "En attente" },
    { id: "valide", label: "Validées" },
    { id: "rejete", label: "Rejetées" },
  ];

  const tachesFiltrees = filtre === "toutes" ? taches : taches.filter(t => t.statut === filtre);

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>Mes tâches</h2>

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
        <div key={i} onClick={() => setSelected(t)} style={{ background: COLORS.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, gap: 8 }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{t.titre}</div>
            <StatutBadge statut={t.statut} />
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 4 }}>🏢 {t.entreprise}</div>
          <div style={{ fontSize: 11, color: COLORS.slateLight }}>🗓 {t.date}</div>
        </div>
      ))}

      {selected && (
        <Modal titre={selected.titre} onClose={() => setSelected(null)}>
          <div style={{ marginBottom: 14 }}><StatutBadge statut={selected.statut} /></div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 6 }}>🏢 Entreprise : <b style={{ color: COLORS.navy }}>{selected.entreprise}</b></div>
          <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 14 }}>🗓 {selected.date}</div>
          <div style={{ background: COLORS.cream, borderRadius: 10, padding: 14, fontSize: 13, color: COLORS.navy, lineHeight: 1.6, marginBottom: 18 }}>
            {selected.description}
          </div>
          {selected.statut === "rejete" && (
            <div style={{ background: COLORS.redLight, color: COLORS.red, padding: "10px 14px", borderRadius: 8, fontSize: 12, marginBottom: 16 }}>
              ✖ Ce travail a été rejeté par le comptable. Vous pouvez soumettre une version corrigée.
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setSelected(null)} style={btnStyle(COLORS.navy, COLORS.white)}>Fermer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ComptePage() {
  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Mon compte</h2>
      <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, color: COLORS.navy }}>
            {AUXILIAIRE_ACTUEL.prenom[0]}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy }}>{AUXILIAIRE_ACTUEL.prenom} {AUXILIAIRE_ACTUEL.nom}</div>
            <div style={{ fontSize: 12, color: COLORS.slate }}>{AUXILIAIRE_ACTUEL.email}</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 6 }}>Entreprise(s) assignée(s)</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {ENTREPRISES_ASSIGNEES.map(e => (
            <span key={e} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: COLORS.cream, color: COLORS.navy, fontWeight: 600 }}>{e}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: COLORS.slateLight, lineHeight: 1.6 }}>
          Ce compte a été créé par votre comptable, et l'activation a été confirmée par l'administrateur de la plateforme.
        </div>
      </div>
    </div>
  );
}

export default function AuxiliairePage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [taches, setTaches] = useState(TACHES_INIT);

  const currentItem = NAV.find(n => n.id === activeNav);

  const renderPage = () => {
    switch (activeNav) {
      case "accueil": return <AccueilPage taches={taches} />;
      case "soumettre": return <SoumettrePage taches={taches} setTaches={setTaches} />;
      case "historique": return <HistoriquePage taches={taches} />;
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
          <div style={{ color: COLORS.gold, fontSize: 9, letterSpacing: "0.08em", fontWeight: 700 }}>AUXILIAIRE</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        {NAV.map(item => (
          <div key={item.id} onClick={() => { setActiveNav(item.id); setMenuOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 8px", borderRadius: 8, cursor: "pointer", marginBottom: 1, background: activeNav === item.id ? COLORS.navyLight : "transparent", borderLeft: activeNav === item.id ? `3px solid ${COLORS.gold}` : "3px solid transparent" }}>
            <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
            <span style={{ fontSize: 12, color: activeNav === item.id ? COLORS.white : COLORS.slateLight, fontWeight: activeNav === item.id ? 600 : 400, flex: 1 }}>{item.label}</span>
          </div>
        ))}
      </nav>
      <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: COLORS.navy }}>
            {AUXILIAIRE_ACTUEL.prenom[0]}
          </div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 600 }}>{AUXILIAIRE_ACTUEL.prenom} {AUXILIAIRE_ACTUEL.nom}</div>
            <div style={{ color: COLORS.slateLight, fontSize: 10 }}>Comptable auxiliaire</div>
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
                <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 600 }}>Espace Comptable auxiliaire</div>
              </div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: COLORS.navy }}>
              {AUXILIAIRE_ACTUEL.prenom[0]}
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