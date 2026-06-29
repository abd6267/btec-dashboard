"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const COLORS = {
  navy: "#0B1F3A", navyMid: "#122848", navyLight: "#1A3A5C",
  gold: "#C9A84C", cream: "#F7F4EE", white: "#FFFFFF",
  slate: "#64748B", slateLight: "#94A3B8",
  green: "#16A34A", greenLight: "#DCFCE7",
  red: "#DC2626", redLight: "#FEE2E2",
  orange: "#D97706", orangeLight: "#FEF3C7",
  blue: "#2563EB", blueLight: "#DBEAFE",
  purple: "#7C3AED", purpleLight: "#EDE9FE",
};

const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞", label: "Tableau de bord", sub: [] },
  { id: "ventes", icon: "↑", label: "Ventes", sub: ["Factures", "Historique"] },
  { id: "achats", icon: "↓", label: "Achats", sub: ["Fournisseurs", "Prestataires", "Historique"] },
  { id: "depenses", icon: "💳", label: "Dépenses", sub: ["État", "Divers"] },
  { id: "clients", icon: "👤", label: "Clients", sub: ["Liste des Clients", "Créances"] },
  { id: "fournisseurs", icon: "🏭", label: "Fournisseurs", sub: ["Liste des Fournisseurs", "Dettes"] },
  { id: "tresorerie", icon: "🏦", label: "Trésorerie", sub: ["Entrées", "Sorties", "Solde"] },
  { id: "rapports", icon: "📊", label: "Rapports", sub: ["Bilan", "Compte de résultat", "Flux de trésorerie"] },
  { id: "fiscal", icon: "🧾", label: "Fiscalité", sub: ["TVA", "Déclarations", "Échéances"] },
  { id: "documents", icon: "📁", label: "Documents", sub: ["Dépôt de fichiers", "Archivage", "Recherche"] },
  { id: "messagerie", icon: "💬", label: "Messagerie", sub: ["Échanges avec le cabinet"] },
  { id: "parametres", icon: "⚙", label: "Paramètres", sub: ["Profil", "Mot de passe", "Sécurité"] },
];

// Droits d'édition par sous-rubrique (true = bouton Ajouter + import fichiers visibles)
const EDIT_RIGHTS: Record<string, boolean> = {
  "ventes::Factures": true,
  "ventes::Historique": false,
  "achats::Fournisseurs": true,
  "achats::Prestataires": true,
  "achats::Historique": false,
  "depenses::État": true,
  "depenses::Divers": true,
  "clients::Liste des Clients": true,
  "clients::Créances": false,
  "fournisseurs::Liste des Fournisseurs": true,
  "fournisseurs::Dettes": false,
  "tresorerie::Entrées": false,
  "tresorerie::Sorties": false,
  "tresorerie::Solde": false,
  "rapports::Bilan": false,
  "rapports::Compte de résultat": false,
  "rapports::Flux de trésorerie": false,
  "fiscal::TVA": false,
  "fiscal::Déclarations": false,
  "fiscal::Échéances": false,
  "documents::Dépôt de fichiers": false,
  "documents::Archivage": false,
  "documents::Recherche": false,
};

const STATS = [
  { label: "Chiffre d'affaires", value: "48 250 000", unit: "FCFA", up: true,  icon: "📈", evolValue: "+12%", evolUp: true  },
  { label: "Recettes encaissées", value: "41 800 000", unit: "FCFA", up: true,  icon: "💰", evolValue: "+9%",  evolUp: true  },
  { label: "Créances Clients",    value: "6 450 000",  unit: "FCFA", up: null,  icon: "⏳", evolValue: "+3%",  evolUp: true  },
  { label: "Dépenses totales",    value: "19 870 000", unit: "FCFA", up: false, icon: "💳", evolValue: "-1%",  evolUp: false },
  { label: "Dettes",              value: "3 200 000",  unit: "FCFA", up: null,  icon: "📋", evolValue: "-5%",  evolUp: false },
  { label: "Trésorerie",          value: "18 900 000", unit: "FCFA", up: true,  icon: "🏦", evolValue: "+5%",  evolUp: true  },
  { label: "Résultat Brut",       value: "28 380 000", unit: "FCFA", up: true,  icon: "✅", evolValue: "+18%", evolUp: true  },
];

// Section Opérations (avant Transactions)
const INITIAL_OPERATIONS: Operation[] = [
  { id: "OP-2024-061", libelle: "Virement entrant — Client BENIN TECH", categorie: "Encaissement", montant: 3500000, date: "25 Jun", statut: "validé",    methode: "Virement" },
  { id: "OP-2024-060", libelle: "Paiement fournisseur — MATCO SARL",     categorie: "Décaissement", montant: -820000, date: "24 Jun", statut: "validé",    methode: "Chèque"   },
  { id: "OP-2024-059", libelle: "Encaissement espèces — Prestation WEB",  categorie: "Encaissement", montant: 1150000, date: "23 Jun", statut: "en attente", methode: "Espèces"  },
  { id: "OP-2024-058", libelle: "Règlement TVA Q2 2024",                  categorie: "Fiscal",       montant: -640000, date: "22 Jun", statut: "validé",    methode: "Virement" },
  { id: "OP-2024-057", libelle: "Remboursement avance — ZINSOU",          categorie: "Autre",        montant: -200000, date: "20 Jun", statut: "validé",    methode: "Espèces"  },
];

const TRANSACTIONS = [
  { date: "23 Jun", libelle: "Facture BENIN TECH #024", type: "vente",   montant:  1250000, statut: "payé" },
  { date: "22 Jun", libelle: "Achat matériel bureau",   type: "achat",   montant:  -380000, statut: "payé" },
  { date: "21 Jun", libelle: "Prestation ZINSOU",        type: "vente",   montant:  2100000, statut: "en attente" },
  { date: "20 Jun", libelle: "Loyer Mènontin",           type: "depense", montant:  -250000, statut: "payé" },
  { date: "19 Jun", libelle: "Facture AKPLA #019",       type: "vente",   montant:   870000, statut: "payé" },
];

const ENTREPRISES = [
  { id: 1, nom: "BENIN TECH Services", secteur: "Services" },
];

type Message = { from: string; text: string; time: string; me: boolean };
type DocItem  = { nom: string; type: string; taille: string; date: string; url?: string };
// Fichier attaché à une entrée d'une sous-rubrique
type AttachedFile = { nom: string; taille: string; type: string; url: string };
type SectionEntry = { label: string; files: AttachedFile[] };
type Operation = {
  id: string; libelle: string; categorie: string; montant: number;
  date: string; statut: string; methode: string;
};

const INITIAL_MESSAGES: Message[] = [
  { from: "Cabinet BTEC", text: "Bonjour, vos documents du mois de Mai sont prêts.", time: "10:30", me: false },
  { from: "Moi",          text: "Merci ! Je vais les consulter.",                    time: "10:45", me: true  },
  { from: "Cabinet BTEC", text: "N'hésitez pas si vous avez des questions.",         time: "11:00", me: false },
];

const INITIAL_DOCS: DocItem[] = [
  { nom: "Bilan_2024.pdf",        type: "PDF",   taille: "2.4 MB", date: "20 Jun" },
  { nom: "Factures_Mai.xlsx",     type: "Excel", taille: "1.1 MB", date: "18 Jun" },
  { nom: "Contrat_ZINSOU.pdf",    type: "PDF",   taille: "890 KB", date: "15 Jun" },
  { nom: "Declaration_TVA.pdf",   type: "PDF",   taille: "540 KB", date: "10 Jun" },
];

const OP_CATEGORIES = ["Encaissement", "Décaissement", "Fiscal", "Autre"];
const OP_METHODES = ["Virement", "Chèque", "Espèces", "Mobile Money"];
const OP_STATUTS = ["validé", "en attente"];

// ─── Barre de catégorie opération ──────────────────────────────────────────
const OP_CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  "Encaissement": { bg: COLORS.greenLight,  color: COLORS.green  },
  "Décaissement": { bg: COLORS.redLight,    color: COLORS.red    },
  "Fiscal":       { bg: COLORS.orangeLight, color: COLORS.orange },
  "Autre":        { bg: "#EDE9FE",          color: "#7C3AED"     },
};

// ─── Composant principal du contenu ────────────────────────────────────────
function PageContent({
  active, sub, itemsMap, onOpenModal,
  messages, messageInput, setMessageInput, onSendMessage,
  docs, onBrowseClick, onDownload, onOpenSettings,
  onSectionFileBrowse,
  sectionDocsMap, onSectionDocBrowse, onDownloadSectionDoc,
  operations, onOpenOpModal, onDeleteOp,
}: {
  active: string; sub: string;
  itemsMap: Record<string, SectionEntry[]>;
  onOpenModal: () => void;
  messages: Message[]; messageInput: string;
  setMessageInput: (v: string) => void; onSendMessage: () => void;
  docs: DocItem[]; onBrowseClick: () => void; onDownload: (doc: DocItem) => void;
  onOpenSettings: (modal: "profil" | "password" | "securite") => void;
  onSectionFileBrowse: (key: string, entryIdx: number) => void;
  sectionDocsMap: Record<string, AttachedFile[]>;
  onSectionDocBrowse: (key: string) => void;
  onDownloadSectionDoc: (f: AttachedFile) => void;
  operations: Operation[]; onOpenOpModal: (op?: Operation) => void; onDeleteOp: (id: string) => void;
}) {
  const titles: Record<string, string> = {
    dashboard: "Tableau de bord",
    ventes: "Ventes", achats: "Achats", depenses: "Dépenses",
    clients: "Clients", fournisseurs: "Fournisseurs", tresorerie: "Trésorerie",
    rapports: "Rapports", fiscal: "Fiscalité", documents: "Documents",
    messagerie: "Messagerie", parametres: "Paramètres",
  };

  // ── Tableau de bord ────────────────────────────────────────────────────
  if (active === "dashboard") {
    return (
      <div>
        {/* KPI Grid */}
        <div className="stats-grid" style={{ display: "grid", gap: 12, marginBottom: 20 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: COLORS.white, borderRadius: 12, padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              borderTop: `3px solid ${s.up === true ? COLORS.green : s.up === false ? COLORS.red : COLORS.gold}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: COLORS.slate, fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.navy, marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: COLORS.slateLight, marginBottom: 8 }}>{s.unit}</div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                background: s.evolUp ? COLORS.greenLight : COLORS.redLight,
                borderRadius: 6, padding: "2px 8px",
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: s.evolUp ? COLORS.green : COLORS.red }}>
                  {s.evolUp ? "▲" : "▼"} {s.evolValue}
                </span>
                <span style={{ fontSize: 9, color: COLORS.slate }}>vs N-1</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── SECTION OPÉRATIONS (éditable) ─────────────────────────────── */}
        <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <div style={{
            padding: "14px 16px", borderBottom: "1px solid #F1F5F9",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap",
          }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>🔄 Opérations du mois</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["Tout", "Encaissement", "Décaissement", "Fiscal"].map((f, i) => (
                  <span key={i} style={{
                    fontSize: 10, fontWeight: 600, padding: "3px 8px",
                    borderRadius: 20, cursor: "pointer",
                    background: i === 0 ? COLORS.navy : COLORS.cream,
                    color: i === 0 ? COLORS.white : COLORS.slate,
                  }}>
                    {f}
                  </span>
                ))}
              </div>
              <button onClick={() => onOpenOpModal()} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>+ Ajouter</button>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  {["Réf.", "Libellé", "Catégorie", "Méthode", "Date", "Montant (FCFA)", "Statut", ""].map((h, i) => (
                    <th key={i} style={{
                      padding: "10px 14px", textAlign: i >= 5 && i < 7 ? "right" : "left",
                      color: COLORS.slate, fontWeight: 600, fontSize: 11,
                      borderBottom: "1px solid #F1F5F9", whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {operations.map((op, i) => {
                  const catStyle = OP_CATEGORY_COLORS[op.categorie] || { bg: COLORS.cream, color: COLORS.slate };
                  return (
                    <tr key={op.id} style={{ borderBottom: i < operations.length - 1 ? "1px solid #F8FAFC" : "none" }}>
                      <td style={{ padding: "11px 14px", color: COLORS.slateLight, fontFamily: "monospace", fontSize: 11 }}>{op.id}</td>
                      <td style={{ padding: "11px 14px", color: COLORS.navy, fontWeight: 600, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{op.libelle}</td>
                      <td style={{ padding: "11px 14px" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 10, background: catStyle.bg, color: catStyle.color }}>{op.categorie}</span>
                      </td>
                      <td style={{ padding: "11px 14px", color: COLORS.slate, fontSize: 11 }}>{op.methode}</td>
                      <td style={{ padding: "11px 14px", color: COLORS.slateLight, fontSize: 11 }}>{op.date}</td>
                      <td style={{ padding: "11px 14px", textAlign: "right", fontWeight: 700, color: op.montant > 0 ? COLORS.green : COLORS.red }}>
                        {op.montant > 0 ? "+" : ""}{op.montant.toLocaleString("fr-FR")}
                      </td>
                      <td style={{ padding: "11px 14px", textAlign: "right" }}>
                        <span style={{
                          fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 10,
                          background: op.statut === "validé" ? COLORS.greenLight : COLORS.orangeLight,
                          color: op.statut === "validé" ? COLORS.green : COLORS.orange,
                        }}>{op.statut}</span>
                      </td>
                      <td style={{ padding: "11px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                        <button onClick={() => onOpenOpModal(op)} title="Modifier" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, marginRight: 6 }}>✏️</button>
                        <button onClick={() => onDeleteOp(op.id)} title="Supprimer" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>🗑️</button>
                      </td>
                    </tr>
                  );
                })}
                {operations.length === 0 && (
                  <tr><td colSpan={8} style={{ padding: "20px 14px", textAlign: "center", color: COLORS.slateLight, fontSize: 12 }}>Aucune opération enregistrée.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── TRANSACTIONS RÉCENTES ─────────────────────────────────────── */}
        <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9", fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>📄 Transactions récentes</div>
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

  // ── Messagerie ────────────────────────────────────────────────────────
  if (active === "messagerie") {
    return (
      <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", height: 460, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9", fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>💬 Messagerie — Cabinet BTEC</div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.me ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "70%", background: m.me ? COLORS.navy : COLORS.cream, color: m.me ? COLORS.white : COLORS.navy, borderRadius: m.me ? "14px 14px 0 14px" : "14px 14px 14px 0", padding: "10px 14px" }}>
                {!m.me && <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gold, marginBottom: 4 }}>{m.from}</div>}
                <div style={{ fontSize: 13, wordBreak: "break-word" }}>{m.text}</div>
                <div style={{ fontSize: 10, color: m.me ? COLORS.slateLight : COLORS.slate, marginTop: 4, textAlign: "right" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #F1F5F9", display: "flex", gap: 8 }}>
          <input
            value={messageInput} onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onSendMessage(); }}
            placeholder="Écrire un message..."
            style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none" }}
          />
          <button onClick={onSendMessage} style={{ background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Envoyer</button>
        </div>
      </div>
    );
  }

  // ── Documents ─────────────────────────────────────────────────────────
  if (active === "documents") {
    return (
      <div>
        <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 16 }}>
          <div style={{ border: "2px dashed #E2E8F0", borderRadius: 12, padding: "30px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📤</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Déposer vos fichiers ici</div>
            <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 12 }}>PDF, Excel, Word acceptés</div>
            <button onClick={onBrowseClick} style={{ background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>📁 Parcourir</button>
          </div>
        </div>
        <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9", fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>📂 Documents archivés</div>
          {docs.map((d, i) => (
            <div key={i} style={{ padding: "12px 16px", borderBottom: i < docs.length - 1 ? "1px solid #F8FAFC" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.nom}</div>
                <div style={{ fontSize: 11, color: COLORS.slateLight }}>{d.type} · {d.taille} · {d.date}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={() => onDownload(d)} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.blueLight, color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>👁 Aperçu</button>
                <button onClick={() => onDownload(d)} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.greenLight, color: COLORS.green, cursor: "pointer", fontWeight: 600 }}>📥 Télécharger</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Paramètres ────────────────────────────────────────────────────────
  if (active === "parametres") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { icon: "👤", titre: "Profil",       desc: "Modifier vos informations personnelles", key: "profil"   as const },
          { icon: "🔑", titre: "Mot de passe", desc: "Changer votre mot de passe",             key: "password" as const },
          { icon: "🔒", titre: "Sécurité",     desc: "Authentification à deux facteurs",       key: "securite" as const },
        ].map((p, i) => (
          <div key={i} onClick={() => onOpenSettings(p.key)} style={{ background: COLORS.white, borderRadius: 12, padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
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

  // ── Sections génériques avec import de fichiers ───────────────────────
  const key = `${active}::${sub}`;
  const entries: SectionEntry[] = itemsMap[key] || [];
  const sectionDocs: AttachedFile[] = sectionDocsMap[key] || [];
  const canEdit = sub ? (EDIT_RIGHTS[key] === true) : false;

  const handleDownloadAttached = (f: AttachedFile) => {
    const a = document.createElement("a");
    a.href = f.url; a.download = f.nom;
    document.body.appendChild(a); a.click(); a.remove();
  };

  return (
    <div>
      {/* Zone de dépôt direct de fichiers — visible sur toute sous-rubrique éditable */}
      {canEdit && (
        <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 16 }}>
          <div style={{ border: "2px dashed #E2E8F0", borderRadius: 12, padding: "22px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>📤</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Importer un fichier dans « {sub} »</div>
            <div style={{ fontSize: 11, color: COLORS.slate, marginBottom: 10 }}>PDF, Excel, Word, images — téléchargeables ensuite</div>
            <button onClick={() => onSectionDocBrowse(key)} style={{ background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>📁 Parcourir</button>
          </div>
          {sectionDocs.length > 0 && (
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              {sectionDocs.map((f, fi) => (
                <div key={fi} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 8, background: "#F8FAFC", gap: 10 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.nom}</div>
                    <div style={{ fontSize: 10, color: COLORS.slateLight }}>{f.type} · {f.taille}</div>
                  </div>
                  <button onClick={() => onDownloadSectionDoc(f)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: "none", background: COLORS.greenLight, color: COLORS.green, cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>📥 Télécharger</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ background: COLORS.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy }}>{titles[active]}{sub ? ` — ${sub}` : ""}</h2>
          {canEdit && (
            <button onClick={onOpenModal} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Ajouter</button>
          )}
        </div>

        {entries.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", color: COLORS.slate }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy, marginBottom: 6 }}>Section {sub || titles[active]}</div>
            <div style={{ fontSize: 13 }}>Les données s'afficheront ici.</div>
            {canEdit && (
              <button onClick={onOpenModal} style={{ marginTop: 16, background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Ajouter</button>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {entries.map((entry, idx) => (
              <div key={idx} style={{ borderRadius: 10, border: "1.5px solid #E2E8F0", overflow: "hidden" }}>
                {/* En-tête de l'entrée */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: COLORS.cream }}>
                  <div style={{ fontSize: 13, color: COLORS.navy, fontWeight: 600 }}>{entry.label}</div>
                  {canEdit && (
                    <button
                      onClick={() => onSectionFileBrowse(key, idx)}
                      style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: "none", background: COLORS.navy, color: COLORS.white, cursor: "pointer", fontWeight: 600, flexShrink: 0 }}
                    >
                      📎 Joindre un fichier
                    </button>
                  )}
                </div>
                {/* Liste des fichiers joints */}
                {entry.files.length > 0 && (
                  <div style={{ padding: "8px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                    {entry.files.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 8, background: "#F8FAFC", gap: 10 }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.nom}</div>
                          <div style={{ fontSize: 10, color: COLORS.slateLight }}>{f.type} · {f.taille}</div>
                        </div>
                        <button
                          onClick={() => handleDownloadAttached(f)}
                          style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: "none", background: COLORS.greenLight, color: COLORS.green, cursor: "pointer", fontWeight: 600, flexShrink: 0 }}
                        >
                          📥 Télécharger
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {entry.files.length === 0 && canEdit && (
                  <div style={{ padding: "10px 14px", fontSize: 12, color: COLORS.slateLight, fontStyle: "italic" }}>
                    Aucun fichier joint — cliquez sur « Joindre un fichier » pour en ajouter.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Composant racine ───────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [activeNav, setActiveNav]           = useState("dashboard");
  const [activeSub, setActiveSub]           = useState("");
  const [openMenus, setOpenMenus]           = useState<string[]>(["dashboard"]);
  const [activeEntreprise, setActiveEntreprise] = useState(ENTREPRISES[0]);
  const [menuOpen, setMenuOpen]             = useState(false);

  // itemsMap : clé = "section::sous-rubrique" → tableau de SectionEntry
  const [itemsMap, setItemsMap]             = useState<Record<string, SectionEntry[]>>({});
  const [modalOpen, setModalOpen]           = useState(false);
  const [modalValue, setModalValue]         = useState("");

  // Fichiers importés directement au niveau d'une sous-rubrique (sans entrée)
  const [sectionDocsMap, setSectionDocsMap] = useState<Record<string, AttachedFile[]>>({});
  const sectionDocInputRef                  = useRef<HTMLInputElement>(null!);
  const [sectionDocTarget, setSectionDocTarget] = useState<string>("");

  const [messages, setMessages]             = useState<Message[]>(INITIAL_MESSAGES);
  const [messageInput, setMessageInput]     = useState("");

  const [docs, setDocs]                     = useState<DocItem[]>(INITIAL_DOCS);
  const fileInputRef                        = useRef<HTMLInputElement>(null!);

  // ── Opérations (éditables) ──────────────────────────────────────────
  const [operations, setOperations]         = useState<Operation[]>(INITIAL_OPERATIONS);
  const [opModalOpen, setOpModalOpen]       = useState(false);
  const [opEditingId, setOpEditingId]       = useState<string | null>(null);
  const [opLibelle, setOpLibelle]           = useState("");
  const [opCategorie, setOpCategorie]       = useState(OP_CATEGORIES[0]);
  const [opMethode, setOpMethode]           = useState(OP_METHODES[0]);
  const [opMontant, setOpMontant]           = useState("");
  const [opStatut, setOpStatut]             = useState(OP_STATUTS[0]);
  const [opDate, setOpDate]                 = useState("");

  // ── Import fichiers dans une sous-rubrique ──────────────────────────
  const sectionFileInputRef                 = useRef<HTMLInputElement>(null!);
  // stocke "key::entryIdx" pour savoir quelle entrée reçoit le fichier
  const [sectionFileTarget, setSectionFileTarget] = useState<string>("");

  const [settingsModal, setSettingsModal]   = useState<null | "profil" | "password" | "securite">(null);
  const [profilNom, setProfilNom]           = useState("David GOLOU");
  const [profilEmail, setProfilEmail]       = useState("david.golou@btecbenin.com");
  const [pwdCurrent, setPwdCurrent]         = useState("");
  const [pwdNew, setPwdNew]                 = useState("");
  const [pwdConfirm, setPwdConfirm]         = useState("");
  const [twoFA, setTwoFA]                   = useState(false);

  const toggleMenu = (id: string) =>
    setOpenMenus(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleNav = (id: string, sub = "") => { setActiveNav(id); setActiveSub(sub); setMenuOpen(false); };

  const handleLogout = () => router.push("/login");

  const handleSaveModal = () => {
    if (!modalValue.trim()) return;
    const key = `${activeNav}::${activeSub}`;
    const newEntry: SectionEntry = { label: modalValue.trim(), files: [] };
    setItemsMap(prev => ({ ...prev, [key]: [...(prev[key] || []), newEntry] }));
    setModalValue("");
    setModalOpen(false);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const time = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { from: "Moi", text: messageInput.trim(), time, me: true }]);
    setMessageInput("");
  };

  // ── Documents globaux ───────────────────────────────────────────────
  const handleBrowseClick   = () => fileInputRef.current?.click();
  const handleFileChange    = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const months = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
    const now = new Date();
    const dateStr = `${now.getDate()} ${months[now.getMonth()]}`;
    const newDocs: DocItem[] = Array.from(files).map(f => ({
      nom: f.name,
      type: f.name.split(".").pop()?.toUpperCase() || "Fichier",
      taille: f.size / (1024 * 1024) >= 1 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`,
      date: dateStr,
      url: URL.createObjectURL(f),
    }));
    setDocs(prev => [...newDocs, ...prev]);
    e.target.value = "";
  };

  const handleDownload = (doc: DocItem) => {
    let url = doc.url;
    let isTemporary = false;
    if (!url) {
      const blob = new Blob([`Document : ${doc.nom}\nType : ${doc.type}\nTaille : ${doc.taille}\nDate : ${doc.date}\n\nCeci est un fichier de démonstration.`], { type: "text/plain" });
      url = URL.createObjectURL(blob);
      isTemporary = true;
    }
    const a = document.createElement("a");
    a.href = url; a.download = doc.nom;
    document.body.appendChild(a); a.click(); a.remove();
    if (isTemporary) URL.revokeObjectURL(url);
  };

  // ── Import fichier dans une entrée de sous-rubrique ─────────────────
  const handleSectionFileBrowse = (key: string, entryIdx: number) => {
    setSectionFileTarget(`${key}::${entryIdx}`);
    sectionFileInputRef.current?.click();
  };

  const handleSectionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !sectionFileTarget) return;

    // Décode key et idx
    const lastSep = sectionFileTarget.lastIndexOf("::");
    const sectionKey = sectionFileTarget.substring(0, lastSep);
    const entryIdx   = parseInt(sectionFileTarget.substring(lastSep + 2), 10);

    const newFiles: AttachedFile[] = Array.from(files).map(f => ({
      nom: f.name,
      type: f.name.split(".").pop()?.toUpperCase() || "Fichier",
      taille: f.size / (1024 * 1024) >= 1 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`,
      url: URL.createObjectURL(f),
    }));

    setItemsMap(prev => {
      const entries = [...(prev[sectionKey] || [])];
      if (entries[entryIdx]) {
        entries[entryIdx] = { ...entries[entryIdx], files: [...entries[entryIdx].files, ...newFiles] };
      }
      return { ...prev, [sectionKey]: entries };
    });

    setSectionFileTarget("");
    e.target.value = "";
  };

  // ── Import fichier direct au niveau d'une sous-rubrique (sans entrée) ──
  const handleSectionDocBrowse = (key: string) => {
    setSectionDocTarget(key);
    sectionDocInputRef.current?.click();
  };

  const handleSectionDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !sectionDocTarget) return;

    const newFiles: AttachedFile[] = Array.from(files).map(f => ({
      nom: f.name,
      type: f.name.split(".").pop()?.toUpperCase() || "Fichier",
      taille: f.size / (1024 * 1024) >= 1 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`,
      url: URL.createObjectURL(f),
    }));

    setSectionDocsMap(prev => ({
      ...prev,
      [sectionDocTarget]: [...(prev[sectionDocTarget] || []), ...newFiles],
    }));

    setSectionDocTarget("");
    e.target.value = "";
  };

  const handleDownloadSectionDoc = (f: AttachedFile) => {
    const a = document.createElement("a");
    a.href = f.url; a.download = f.nom;
    document.body.appendChild(a); a.click(); a.remove();
  };

  // ── Opérations : ouvrir modal (création ou édition) ─────────────────
  const handleOpenOpModal = (op?: Operation) => {
    if (op) {
      setOpEditingId(op.id);
      setOpLibelle(op.libelle);
      setOpCategorie(op.categorie);
      setOpMethode(op.methode);
      setOpMontant(String(op.montant));
      setOpStatut(op.statut);
      setOpDate(op.date);
    } else {
      setOpEditingId(null);
      setOpLibelle("");
      setOpCategorie(OP_CATEGORIES[0]);
      setOpMethode(OP_METHODES[0]);
      setOpMontant("");
      setOpStatut(OP_STATUTS[0]);
      const months = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
      const now = new Date();
      setOpDate(`${now.getDate()} ${months[now.getMonth()]}`);
    }
    setOpModalOpen(true);
  };

  const handleSaveOp = () => {
    const montantNum = parseInt(opMontant.replace(/[^\-0-9]/g, ""), 10);
    if (!opLibelle.trim() || isNaN(montantNum)) return;

    if (opEditingId) {
      setOperations(prev => prev.map(o => o.id === opEditingId
        ? { ...o, libelle: opLibelle.trim(), categorie: opCategorie, methode: opMethode, montant: montantNum, statut: opStatut, date: opDate }
        : o));
    } else {
      const newId = `OP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`;
      setOperations(prev => [
        { id: newId, libelle: opLibelle.trim(), categorie: opCategorie, methode: opMethode, montant: montantNum, statut: opStatut, date: opDate },
        ...prev,
      ]);
    }
    setOpModalOpen(false);
  };

  const handleDeleteOp = (id: string) => {
    setOperations(prev => prev.filter(o => o.id !== id));
  };

  // ── Paramètres ───────────────────────────────────────────────────────
  const handleSaveProfil   = () => { setSettingsModal(null); alert("Profil mis à jour avec succès."); };
  const handleSavePassword = () => {
    if (!pwdCurrent || !pwdNew || !pwdConfirm) { alert("Veuillez remplir tous les champs."); return; }
    if (pwdNew !== pwdConfirm) { alert("Les mots de passe ne correspondent pas."); return; }
    setPwdCurrent(""); setPwdNew(""); setPwdConfirm("");
    setSettingsModal(null); alert("Mot de passe changé avec succès.");
  };
  const handleSaveSecurite = () => {
    setSettingsModal(null);
    alert(twoFA ? "Authentification à deux facteurs activée." : "Authentification à deux facteurs désactivée.");
  };

  const currentItem = NAV_ITEMS.find(n => n.id === activeNav);
  const titlesForModal: Record<string, string> = {
    ventes: "Ventes", achats: "Achats", depenses: "Dépenses",
    clients: "Clients", fournisseurs: "Fournisseurs", tresorerie: "Trésorerie",
    rapports: "Rapports", fiscal: "Fiscalité",
  };

  // ── Sidebar ─────────────────────────────────────────────────────────
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
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: COLORS.navy }}>D</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{profilNom}</div>
          <div style={{ color: COLORS.slateLight, fontSize: 10 }}>Comptable principal</div>
        </div>
        <button onClick={handleLogout} title="Déconnexion"
          style={{ background: "rgba(220,38,38,0.12)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: COLORS.red, fontSize: 14, flexShrink: 0 }}>
          🚪
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
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .menu-mobile { display: flex !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 380px) { .stats-grid { grid-template-columns: repeat(1, 1fr) !important; } }
      `}</style>

      {/* Input global documents */}
      <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} style={{ display: "none" }} />
      {/* Input fichiers de sous-rubrique (par entrée) */}
      <input ref={sectionFileInputRef} type="file" multiple onChange={handleSectionFileChange} style={{ display: "none" }} />
      {/* Input fichiers de sous-rubrique (direct, sans entrée) */}
      <input ref={sectionDocInputRef} type="file" multiple onChange={handleSectionDocChange} style={{ display: "none" }} />

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
              <div onClick={() => handleNav("parametres")} style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>⚙</div>
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
            <PageContent
              active={activeNav} sub={activeSub} itemsMap={itemsMap}
              onOpenModal={() => setModalOpen(true)}
              messages={messages} messageInput={messageInput}
              setMessageInput={setMessageInput} onSendMessage={handleSendMessage}
              docs={docs} onBrowseClick={handleBrowseClick} onDownload={handleDownload}
              onOpenSettings={(modal) => setSettingsModal(modal)}
              onSectionFileBrowse={handleSectionFileBrowse}
              sectionDocsMap={sectionDocsMap}
              onSectionDocBrowse={handleSectionDocBrowse}
              onDownloadSectionDoc={handleDownloadSectionDoc}
              operations={operations}
              onOpenOpModal={handleOpenOpModal}
              onDeleteOp={handleDeleteOp}
            />
          </div>
        </div>
      </div>

      {/* MODAL AJOUTER (entrée de sous-rubrique) */}
      {modalOpen && (
        <div onClick={() => setModalOpen(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 14, padding: 24, width: "100%", maxWidth: 380 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>
              Ajouter — {titlesForModal[activeNav] || currentItem?.label}{activeSub ? ` (${activeSub})` : ""}
            </h3>
            <p style={{ fontSize: 12, color: COLORS.slate, marginBottom: 16 }}>Saisissez un libellé pour cette nouvelle entrée. Vous pourrez ensuite y joindre des fichiers téléchargeables.</p>
            <input autoFocus value={modalValue} onChange={(e) => setModalValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSaveModal(); }}
              placeholder="Ex : Nom, référence, description..."
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", marginBottom: 16 }}
            />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => { setModalOpen(false); setModalValue(""); }} style={{ background: COLORS.cream, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={handleSaveModal} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL OPÉRATION (ajout / édition) */}
      {opModalOpen && (
        <div onClick={() => setOpModalOpen(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 14, padding: 24, width: "100%", maxWidth: 420 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>
              {opEditingId ? "✏️ Modifier l'opération" : "+ Nouvelle opération"}
            </h3>

            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 4, display: "block" }}>Libellé</label>
            <input autoFocus value={opLibelle} onChange={(e) => setOpLibelle(e.target.value)}
              placeholder="Ex : Virement entrant — Client X"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", marginBottom: 14 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 4, display: "block" }}>Catégorie</label>
                <select value={opCategorie} onChange={(e) => setOpCategorie(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", background: COLORS.white }}>
                  {OP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 4, display: "block" }}>Méthode</label>
                <select value={opMethode} onChange={(e) => setOpMethode(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", background: COLORS.white }}>
                  {OP_METHODES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 4, display: "block" }}>Montant (FCFA)</label>
                <input value={opMontant} onChange={(e) => setOpMontant(e.target.value)}
                  placeholder="Ex : 1500000 ou -250000"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 4, display: "block" }}>Date</label>
                <input value={opDate} onChange={(e) => setOpDate(e.target.value)}
                  placeholder="Ex : 28 Jun"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none" }} />
              </div>
            </div>

            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 4, display: "block" }}>Statut</label>
            <select value={opStatut} onChange={(e) => setOpStatut(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", background: COLORS.white, marginBottom: 18 }}>
              {OP_STATUTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setOpModalOpen(false)} style={{ background: COLORS.cream, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={handleSaveOp} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PROFIL */}
      {settingsModal === "profil" && (
        <div onClick={() => setSettingsModal(null)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 14, padding: 24, width: "100%", maxWidth: 380 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>👤 Modifier le profil</h3>
            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 4, display: "block" }}>Nom complet</label>
            <input value={profilNom} onChange={(e) => setProfilNom(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", marginBottom: 14 }} />
            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 4, display: "block" }}>Adresse email</label>
            <input value={profilEmail} onChange={(e) => setProfilEmail(e.target.value)} type="email" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", marginBottom: 16 }} />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setSettingsModal(null)} style={{ background: COLORS.cream, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={handleSaveProfil} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MOT DE PASSE */}
      {settingsModal === "password" && (
        <div onClick={() => setSettingsModal(null)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 14, padding: 24, width: "100%", maxWidth: 380 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>🔑 Changer le mot de passe</h3>
            {[
              { label: "Mot de passe actuel",              val: pwdCurrent, set: setPwdCurrent },
              { label: "Nouveau mot de passe",              val: pwdNew,     set: setPwdNew     },
              { label: "Confirmer le nouveau mot de passe", val: pwdConfirm, set: setPwdConfirm },
            ].map((f, i) => (
              <div key={i}>
                <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 4, display: "block" }}>{f.label}</label>
                <input type="password" value={f.val} onChange={(e) => f.set(e.target.value)}
                  onKeyDown={i === 2 ? (e) => { if (e.key === "Enter") handleSavePassword(); } : undefined}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", marginBottom: 14 }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => { setSettingsModal(null); setPwdCurrent(""); setPwdNew(""); setPwdConfirm(""); }} style={{ background: COLORS.cream, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={handleSavePassword} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Changer</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SÉCURITÉ */}
      {settingsModal === "securite" && (
        <div onClick={() => setSettingsModal(null)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 14, padding: 24, width: "100%", maxWidth: 380 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 6 }}>🔒 Sécurité du compte</h3>
            <p style={{ fontSize: 12, color: COLORS.slate, marginBottom: 18 }}>Renforcez la sécurité avec l'authentification à deux facteurs (2FA).</p>
            <div onClick={() => setTwoFA(!twoFA)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 10, background: COLORS.cream, cursor: "pointer", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>Authentification à deux facteurs</div>
                <div style={{ fontSize: 11, color: COLORS.slate }}>{twoFA ? "Activée" : "Désactivée"}</div>
              </div>
              <div style={{ width: 42, height: 24, borderRadius: 12, background: twoFA ? COLORS.green : "#CBD5E1", position: "relative", flexShrink: 0, transition: "background 0.2s" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: COLORS.white, position: "absolute", top: 3, left: twoFA ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setSettingsModal(null)} style={{ background: COLORS.cream, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={handleSaveSecurite} style={{ background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}