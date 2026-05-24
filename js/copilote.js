// ═══════════════════════════════════════════════════════════════
// COPILOTE IA — Accès complet au portail + actions en temps réel
// ═══════════════════════════════════════════════════════════════

let _coHistory = [];
let _coInitialized = false;

// ── Contexte complet du portail ────────────────────────────────
function buildCopiloteContext() {
  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;
  const jours = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

  const techs = typeof TECHS !== 'undefined' ? TECHS : [];
  const centres = typeof CENTRES !== 'undefined' ? CENTRES : [];
  const planning = typeof PLANNING !== 'undefined' ? PLANNING : {};
  const craData = typeof CRA_DATA !== 'undefined' ? CRA_DATA : {};
  const charges = typeof CHARGES !== 'undefined' ? CHARGES : [];
  const stock = typeof STOCK !== 'undefined' ? STOCK : [];

  const centresInfo = centres.map(c =>
    `  • ${c.nom}: loyer ${c.loyer}€/mois, techs: ${(c.techs||[]).join(', ')}`
  ).join('\n');

  const techsInfo = techs.map(t =>
    `  • ${t.nom} | centre: ${t.centre||'—'} | contrat: ${t.contrat||'—'} | tél: ${t.tel||'—'}`
  ).join('\n');

  // Planning résumé
  const planningInfo = Object.entries(planning).map(([centre, days]) => {
    const lignes = days.map((techs, i) => {
      const noms = (techs||[]).filter(t=>t.statut==='present').map(t=>t.nom);
      return noms.length ? `    ${jours[i]}: ${noms.join(', ')}` : '';
    }).filter(Boolean);
    return lignes.length ? `  ${centre}:\n${lignes.join('\n')}` : '';
  }).filter(Boolean).join('\n');

  // CRA résumé (mois en cours)
  const moisActuel = `${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;
  const craInfo = Object.entries(craData).map(([nom, dates]) => {
    const datesduMois = Object.entries(dates)
      .filter(([d]) => d.endsWith(moisActuel.replace('/', '/')))
      .map(([d, centre]) => `${d}→${centre}`);
    return datesduMois.length ? `  • ${nom}: ${datesduMois.join(', ')}` : '';
  }).filter(Boolean).join('\n');

  const chargesInfo = charges.map(c => `  • ${c.nom}: ${c.montant}€ (${c.cat||'—'})`).join('\n');
  const stockInfo = stock.slice(-5).map(s => `  • ${s.produit||s.nom}: qté ${s.qte}, centre ${s.centre}`).join('\n');

  return `Tu es le Copilote IA de Dreamwash, une entreprise de lavage automobile écologique sans eau.
Tu t'appelles "Copilote Dreamwash". Tu parles TOUJOURS en français. Tu es direct et efficace.
Date du jour : ${dateStr}

═══ DONNÉES PORTAIL EN TEMPS RÉEL ═══

CENTRES (${centres.length}) :
${centresInfo || '  Aucun'}

TECHNICIENS (${techs.length}) :
${techsInfo || '  Aucun'}

PLANNING SEMAINE EN COURS :
${planningInfo || '  Aucune donnée'}

CRA MOIS EN COURS (${moisActuel}) :
${craInfo || '  Aucune donnée'}

CHARGES FIXES :
${chargesInfo || '  Aucune'}

STOCK (5 dernières commandes) :
${stockInfo || '  Aucune'}

SOCIÉTÉ : Dreamwash · 54 av. Henri Barbusse, Drancy 93700 · 07 82 48 43 00 · reservation@dreamwash.fr · SIRET 977 739 242

═══ TES CAPACITÉS D'ACTION ═══

Tu peux MODIFIER le portail en incluant des actions dans ta réponse avec ce format exact :
⚡ACTION:{"type":"NOM_ACTION", ...données}

ACTIONS DISPONIBLES :

1. Ajouter un technicien :
⚡ACTION:{"type":"ADD_TECH","nom":"Prénom Nom","centre":"Belleville","contrat":"CDI","tel":"06 00 00 00 00"}

2. Ajouter une journée au CRA d'un technicien :
⚡ACTION:{"type":"ADD_CRA","tech":"Nom Tech","date":"JJ/MM/AAAA","centre":"Belleville"}

3. Supprimer une journée du CRA :
⚡ACTION:{"type":"REMOVE_CRA","tech":"Nom Tech","date":"JJ/MM/AAAA"}

4. Ajouter un technicien au planning un jour donné (0=Lundi ... 6=Dimanche) :
⚡ACTION:{"type":"ADD_PLANNING","centre":"Belleville","tech":"Nom Tech","jour":0,"statut":"present"}

5. Retirer un technicien du planning un jour donné :
⚡ACTION:{"type":"REMOVE_PLANNING","centre":"Belleville","tech":"Nom Tech","jour":0}

6. Ajouter une charge fixe :
⚡ACTION:{"type":"ADD_CHARGE","nom":"Nom charge","montant":500,"cat":"Loyer"}

7. Ajouter/supprimer un pointage badgeuse :
⚡ACTION:{"type":"ADD_BADGE","nom":"Nom Tech","type_badge":"arrivee","heure":"08:30","date":"JJ/MM/AAAA","centre":"Belleville"}
⚡ACTION:{"type":"DELETE_BADGE","nom":"Nom Tech","timestamp":1234567890}

8. Ajouter/supprimer une déclaration caisse (fermeture) :
⚡ACTION:{"type":"ADD_CAISSE","nom":"Nom Tech","montant":250.50,"couleur":"vert","centre":"Belleville","date":"JJ/MM/AAAA","heure":"18:00"}
(couleur = "vert" pour fond de caisse, "rouge" pour recette)
⚡ACTION:{"type":"DELETE_CAISSE","id":"firebase_doc_id"}

9. Modifier ou supprimer un technicien :
⚡ACTION:{"type":"UPDATE_TECH","nom":"Nom actuel","centre":"Nouveau centre","contrat":"CDI","tel":"06 00 00 00 00"}
⚡ACTION:{"type":"DELETE_TECH","nom":"Nom Tech"}

10. Ajouter un stock / supprimer :
⚡ACTION:{"type":"ADD_STOCK","produit":"Speed Polish 25L","centre":"Belleville","qte":2,"pu":96.75,"date":"JJ/MM/AAAA"}
⚡ACTION:{"type":"DELETE_STOCK","index":0}

11. Ajouter une assurance :
⚡ACTION:{"type":"ADD_ASSURANCE","nom":"Assurance RC","assureur":"AXA","montant":1200,"expiration":"2027-06-01","centres":"Tous"}

12. Modifier les infos d'un centre :
⚡ACTION:{"type":"UPDATE_CENTRE","nom":"Belleville","loyer":950,"tel":"01 67 89 01 23"}

13. Envoyer un email (vrai envoi automatique) :
⚡ACTION:{"type":"SEND_EMAIL","to":"client@email.com","subject":"Objet du mail","body":"Corps du mail complet ici"}
(from par défaut = reservation@dreamwash.fr)

14. Exporter CSV :
⚡ACTION:{"type":"EXPORT_CSV","source":"badgeuse","mois":"05/2026"}
⚡ACTION:{"type":"EXPORT_CSV","source":"cra","mois":"05/2026"}
⚡ACTION:{"type":"EXPORT_CSV","source":"techs"}
⚡ACTION:{"type":"EXPORT_CSV","source":"stock"}
⚡ACTION:{"type":"EXPORT_CSV","source":"charges"}
(mois format MM/AAAA — optionnel)

Tu peux enchaîner plusieurs actions dans une seule réponse.

═══ RÈGLES ABSOLUES ═══
- Quand l'utilisateur demande une modification → exécute-la DIRECTEMENT avec ⚡ACTION, sans jamais dire "je ne peux pas".
- Tu as FULL ACCÈS à tout le portail : techniciens, planning, CRA, badgeuse, caisse, stock, charges, assurances, centres.
- Pour TOUT export → utilise ⚡ACTION EXPORT_CSV.
- Confirme ce que tu fais en 1-2 lignes, puis mets les actions.
- Réponds en 3 lignes max sauf demande de texte long (mail, réponse Google...).
- Pour les mails et réponses Google : formate avec "Objet :" et "Corps :" ou guillemets.`;
}

// ── Helpers CSV ────────────────────────────────────────────────
function _coDownloadCSV(filename, rows) {
  const bom = '\uFEFF'; // UTF-8 BOM pour Excel
  const csv = bom + rows.map(r => r.map(c => `"${String(c||'').replace(/"/g,'""')}"`).join(';')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── Exécution des actions (async) ─────────────────────────────
async function _coExecAction(action) {
  try {
    switch (action.type) {

      case 'SEND_EMAIL': {
        if (!action.to || !action.subject || !action.body) return '❌ to, subject et body requis';
        const r = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: action.to, subject: action.subject, body: action.body, from: action.from })
        });
        const data = await r.json();
        if (data.success) return `✅ Mail envoyé à **${action.to}** — "${action.subject}"`;
        return `❌ Erreur envoi mail : ${data.error}`;
      }

      case 'EXPORT_CSV': {
        const src = action.source || 'techs';
        const mois = action.mois || null; // "MM/AAAA"

        if (src === 'techs') {
          const techs = typeof TECHS !== 'undefined' ? TECHS : [];
          const rows = [['Nom','Centre','Contrat','Téléphone']];
          techs.forEach(t => rows.push([t.nom, t.centre||'', t.contrat||'', t.tel||'']));
          _coDownloadCSV('dreamwash_techniciens.csv', rows);
          return `✅ CSV techniciens téléchargé (${techs.length} lignes)`;
        }

        if (src === 'cra') {
          const craData = typeof CRA_DATA !== 'undefined' ? CRA_DATA : {};
          const rows = [['Technicien','Date','Centre']];
          Object.entries(craData).forEach(([nom, dates]) => {
            Object.entries(dates).forEach(([date, centre]) => {
              if (!mois || date.slice(3) === mois) rows.push([nom, date, centre]);
            });
          });
          const fname = `dreamwash_cra${mois ? '_' + mois.replace('/','_') : ''}.csv`;
          _coDownloadCSV(fname, rows);
          return `✅ CSV CRA téléchargé (${rows.length - 1} entrées${mois ? ' · ' + mois : ''})`;
        }

        if (src === 'badgeuse') {
          const loader = typeof getAllBadgeages === 'function' ? getAllBadgeages :
                         (typeof window.getAllBadgeages === 'function' ? window.getAllBadgeages : null);
          if (!loader) return '❌ Fonction getAllBadgeages non disponible';
          const data = await loader();
          const rows = [['Nom','Type','Date','Heure','Centre','Timestamp']];
          const filtered = mois ? data.filter(b => b.date && b.date.slice(3) === mois) : data;
          filtered.sort((a,b) => (a.timestamp||0) - (b.timestamp||0))
            .forEach(b => rows.push([b.nom||'', b.type||'', b.date||'', b.heure||'', b.centre||'', b.timestamp||'']));
          const fname = `dreamwash_badgeuse${mois ? '_' + mois.replace('/','_') : ''}.csv`;
          _coDownloadCSV(fname, rows);
          return `✅ CSV badgeuse téléchargé (${rows.length - 1} pointages${mois ? ' · ' + mois : ''})`;
        }

        if (src === 'stock') {
          const s = typeof STOCK !== 'undefined' ? STOCK : [];
          const rows = [['Date','Centre','Produit','Quantité','Prix unitaire','Total']];
          s.forEach(x => rows.push([x.date||'', x.centre||'', x.produit||'', x.qte||0, x.pu||0, ((x.qte||0)*(x.pu||0)).toFixed(2)]));
          _coDownloadCSV('dreamwash_stock.csv', rows);
          return `✅ CSV stock téléchargé (${s.length} lignes)`;
        }

        if (src === 'charges') {
          const ch = typeof CHARGES !== 'undefined' ? CHARGES : [];
          const rows = [['Nom','Montant','Catégorie','Échéance']];
          ch.forEach(x => rows.push([x.nom||'', x.montant||0, x.cat||'', x.ech||'']));
          _coDownloadCSV('dreamwash_charges.csv', rows);
          return `✅ CSV charges téléchargé (${ch.length} lignes)`;
        }

        return `❌ Source inconnue : ${src}. Utilise "badgeuse", "cra", "techs", "stock" ou "charges"`;
      }

      case 'ADD_TECH': {
        if (!action.nom) return '❌ Nom manquant';
        const centre = action.centre || '';
        if (!TECHS.find(t => t.nom.toLowerCase() === action.nom.toLowerCase())) {
          TECHS.push({ nom: action.nom, centre, contrat: action.contrat||'CDI', tel: action.tel||'', jours: 0, color: '#2563EB' });
          if (typeof renderTechs === 'function') renderTechs();
          if (typeof renderDashboard === 'function') renderDashboard();
          if (typeof saveAll === 'function') saveAll();
          return `✅ **${action.nom}** ajouté${centre ? ' au centre ' + centre : ''}`;
        }
        return `ℹ️ ${action.nom} existe déjà`;
      }

      case 'ADD_CRA': {
        if (!action.tech || !action.date || !action.centre) return '❌ Données CRA incomplètes (tech, date, centre requis)';
        if (!CRA_DATA[action.tech]) CRA_DATA[action.tech] = {};
        CRA_DATA[action.tech][action.date] = action.centre;
        if (typeof saveAll === 'function') saveAll();
        return `✅ CRA mis à jour : **${action.tech}** — ${action.date} @ ${action.centre}`;
      }

      case 'REMOVE_CRA': {
        if (!action.tech || !action.date) return '❌ tech et date requis';
        if (CRA_DATA[action.tech]) {
          delete CRA_DATA[action.tech][action.date];
          if (typeof saveAll === 'function') saveAll();
          return `✅ Journée ${action.date} supprimée du CRA de **${action.tech}**`;
        }
        return `ℹ️ Aucune entrée trouvée pour ${action.tech}`;
      }

      case 'ADD_PLANNING': {
        if (!action.centre || !action.tech || action.jour === undefined) return '❌ centre, tech et jour requis';
        if (!PLANNING[action.centre]) return `❌ Centre "${action.centre}" introuvable`;
        const day = PLANNING[action.centre][action.jour];
        if (!day.find(t => t.nom === action.tech)) {
          day.push({ nom: action.tech, statut: action.statut || 'present' });
          if (typeof renderPlan === 'function') renderPlan();
          if (typeof saveAll === 'function') saveAll();
          const joursNoms = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
          return `✅ **${action.tech}** ajouté au planning de ${action.centre} le ${joursNoms[action.jour]}`;
        }
        return `ℹ️ ${action.tech} est déjà dans le planning ce jour-là`;
      }

      case 'REMOVE_PLANNING': {
        if (!action.centre || !action.tech || action.jour === undefined) return '❌ centre, tech et jour requis';
        if (!PLANNING[action.centre]) return `❌ Centre "${action.centre}" introuvable`;
        const before = PLANNING[action.centre][action.jour].length;
        PLANNING[action.centre][action.jour] = PLANNING[action.centre][action.jour].filter(t => t.nom !== action.tech);
        if (PLANNING[action.centre][action.jour].length < before) {
          if (typeof renderPlan === 'function') renderPlan();
          if (typeof saveAll === 'function') saveAll();
          return `✅ **${action.tech}** retiré du planning de ${action.centre}`;
        }
        return `ℹ️ ${action.tech} non trouvé dans ce planning`;
      }

      case 'ADD_CHARGE': {
        if (!action.nom || !action.montant) return '❌ nom et montant requis';
        CHARGES.push({ nom: action.nom, montant: Number(action.montant), cat: action.cat || 'Autre', ech: action.ech || '' });
        if (typeof renderCharges === 'function') renderCharges();
        if (typeof saveAll === 'function') saveAll();
        return `✅ Charge **${action.nom}** (${action.montant}€) ajoutée`;
      }

      case 'UPDATE_TECH': {
        if (!action.nom) return '❌ nom requis';
        const t = TECHS.find(x => x.nom.toLowerCase() === action.nom.toLowerCase());
        if (!t) return `❌ Technicien "${action.nom}" introuvable`;
        if (action.centre !== undefined) t.centre = action.centre;
        if (action.contrat !== undefined) t.contrat = action.contrat;
        if (action.tel !== undefined) t.tel = action.tel;
        if (typeof renderTechs === 'function') renderTechs();
        if (typeof saveAll === 'function') saveAll();
        return `✅ **${action.nom}** mis à jour`;
      }

      case 'DELETE_TECH': {
        if (!action.nom) return '❌ nom requis';
        const idx = TECHS.findIndex(x => x.nom.toLowerCase() === action.nom.toLowerCase());
        if (idx === -1) return `❌ Technicien "${action.nom}" introuvable`;
        TECHS.splice(idx, 1);
        if (typeof renderTechs === 'function') renderTechs();
        if (typeof renderDashboard === 'function') renderDashboard();
        if (typeof saveAll === 'function') saveAll();
        return `✅ **${action.nom}** supprimé`;
      }

      case 'ADD_BADGE': {
        if (!action.nom || !action.heure) return '❌ nom et heure requis';
        const today = new Date();
        const dateStr = action.date || `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;
        const entry = {
          nom: action.nom,
          type: action.type_badge === 'depart' ? 'depart' : 'arrivee',
          heure: action.heure,
          date: dateStr,
          centre: action.centre || '',
          timestamp: Date.now()
        };
        const ok = window.addBadgeToFirebase ? await window.addBadgeToFirebase(entry) : false;
        return ok ? `✅ Pointage **${action.type_badge||'arrivée'}** ajouté pour **${action.nom}** à ${action.heure}` : '❌ Erreur Firebase badge';
      }

      case 'DELETE_BADGE': {
        if (!action.nom || !action.timestamp) return '❌ nom et timestamp requis';
        const ok = window.deleteBadgeFromFirebase ? await window.deleteBadgeFromFirebase(action.nom, action.timestamp) : false;
        return ok ? `✅ Pointage de **${action.nom}** supprimé` : '❌ Pointage introuvable';
      }

      case 'ADD_CAISSE': {
        if (!action.nom || action.montant === undefined) return '❌ nom et montant requis';
        const today = new Date();
        const dateStr = action.date || `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;
        const heureStr = action.heure || `${String(today.getHours()).padStart(2,'0')}:${String(today.getMinutes()).padStart(2,'0')}`;
        const entry = {
          nom: action.nom,
          montant: Number(action.montant),
          couleur: action.couleur || 'rouge',
          centre: action.centre || '',
          date: dateStr,
          time: heureStr,
          timestamp: Date.now()
        };
        const ok = window.addCaisseEntry ? await window.addCaisseEntry(entry) : false;
        if (ok && typeof window.refreshCaisse === 'function') await window.refreshCaisse();
        return ok ? `✅ Déclaration caisse ajoutée : **${action.nom}** — ${Number(action.montant).toFixed(2)}€ (${action.couleur||'rouge'})` : '❌ Erreur Firebase caisse';
      }

      case 'DELETE_CAISSE': {
        if (!action.id) return '❌ id requis';
        const ok = window.deleteCaisseEntry ? await window.deleteCaisseEntry(action.id) : false;
        if (ok && typeof window.refreshCaisse === 'function') await window.refreshCaisse();
        return ok ? `✅ Déclaration caisse supprimée` : '❌ Entrée introuvable';
      }

      case 'ADD_STOCK': {
        if (!action.produit) return '❌ produit requis';
        const today = new Date();
        const dateStr = action.date || `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;
        STOCK.unshift({ date: dateStr, centre: action.centre||'', produit: action.produit, qte: Number(action.qte||1), pu: Number(action.pu||0), statut: 'en cours' });
        if (typeof renderStock === 'function') renderStock();
        if (typeof saveAll === 'function') saveAll();
        return `✅ Stock ajouté : **${action.produit}** ×${action.qte||1} @ ${action.centre||'—'}`;
      }

      case 'DELETE_STOCK': {
        const i = Number(action.index);
        if (isNaN(i) || i < 0 || i >= STOCK.length) return '❌ index invalide';
        const nom = STOCK[i].produit;
        STOCK.splice(i, 1);
        if (typeof renderStock === 'function') renderStock();
        if (typeof saveAll === 'function') saveAll();
        return `✅ Stock **${nom}** supprimé`;
      }

      case 'ADD_ASSURANCE': {
        if (!action.nom) return '❌ nom requis';
        const exp = action.expiration || '';
        const expDate = exp ? new Date(exp) : new Date();
        const jours = Math.max(0, Math.round((expDate - new Date()) / 86400000));
        ASSURANCES.push({ nom: action.nom, assureur: action.assureur||'', montant: Number(action.montant||0), expiration: exp, centres: action.centres||'Tous', jours, couleur: jours < 30 ? '#D97706' : '#16A34A' });
        if (typeof renderAssurances === 'function') renderAssurances();
        if (typeof saveAll === 'function') saveAll();
        return `✅ Assurance **${action.nom}** ajoutée`;
      }

      case 'UPDATE_CENTRE': {
        if (!action.nom) return '❌ nom requis';
        const c = (typeof CENTRES !== 'undefined' ? CENTRES : []).find(x => x.nom.toLowerCase() === action.nom.toLowerCase());
        if (!c) return `❌ Centre "${action.nom}" introuvable`;
        if (action.loyer !== undefined) c.loyer = Number(action.loyer);
        if (action.tel !== undefined) c.tel = action.tel;
        if (action.wifi !== undefined) c.wifi = action.wifi;
        if (action.wifiPwd !== undefined) c.wifiPwd = action.wifiPwd;
        if (typeof saveAll === 'function') saveAll();
        return `✅ Centre **${action.nom}** mis à jour`;
      }

      default:
        return `⚠️ Action inconnue : ${action.type}`;
    }
  } catch (e) {
    return `❌ Erreur action ${action.type} : ${e.message}`;
  }
}

// ── Traitement de la réponse IA (async pour CSV/badgeuse) ──────
async function _coProcessReply(raw) {
  const actionResults = [];
  const actionMatches = [];

  // Collecte tous les blocs ⚡ACTION:{...} (JSON peut contenir des virgules)
  let cleaned = raw.replace(/⚡ACTION:\{[\s\S]*?\}(?=\s|$)/g, (match) => {
    actionMatches.push(match);
    return '';
  }).trim();

  for (const match of actionMatches) {
    try {
      const json = match.replace('⚡ACTION:', '');
      const action = JSON.parse(json);
      const result = await _coExecAction(action);
      actionResults.push(result);
    } catch (e) {
      actionResults.push(`❌ Action invalide : ${e.message}`);
    }
  }

  let display = cleaned;
  if (actionResults.length) {
    display += (cleaned ? '\n\n' : '') + actionResults.join('\n');
  }
  return display || raw;
}

// ── Rendu des messages ─────────────────────────────────────────
function _coRenderMessages() {
  const container = document.getElementById('co-messages');
  if (!container) return;
  container.innerHTML = '';

  _coHistory.forEach(msg => {
    const isUser = msg.role === 'user';
    const wrap = document.createElement('div');
    wrap.style.cssText = `display:flex;gap:9px;max-width:88%;animation:coFadeUp .2s ease;${isUser ? 'align-self:flex-end;flex-direction:row-reverse;' : ''}`;

    const avatar = document.createElement('div');
    avatar.style.cssText = `width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:${isUser?'9px':'13px'};font-weight:700;flex-shrink:0;${isUser?'background:#0F172A;color:#fff;':'background:#2563EB;color:#fff;'}`;
    avatar.textContent = isUser ? 'DW' : '💧';

    const bubble = document.createElement('div');
    bubble.style.cssText = `padding:10px 14px;border-radius:13px;font-size:13px;line-height:1.65;${isUser ? 'background:#2563EB;color:#fff;border-top-right-radius:3px;' : 'background:#fff;border:1px solid #E2E8F0;color:#0F172A;border-top-left-radius:3px;'}`;

    const formatted = msg.content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');

    let actions = '';
    if (!isUser && msg.content.length > 60) {
      actions = `<div style="margin-top:9px;">
        <button onclick="coCopyBubble(this)" style="padding:4px 11px;border-radius:6px;border:1.5px solid #E2E8F0;background:#fff;font-size:10px;font-weight:600;cursor:pointer;color:#64748B;">📋 Copier</button>
      </div>`;
    }

    bubble.innerHTML = `<div class="co-bc">${formatted}</div>${actions}`;
    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    container.appendChild(wrap);
  });

  container.scrollTop = container.scrollHeight;
}

// ── Shell UI ────────────────────────────────────────────────────
function _renderCopiloteShell() {
  const el = document.getElementById('page-copilote');
  if (!el) return;

  el.innerHTML = `
<style>
@keyframes coFadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
@keyframes coBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
@keyframes coPulse  { 0%,100%{opacity:1} 50%{opacity:.4} }
#co-wrap { display:flex; height:calc(100vh - 115px); font-family:'Inter',sans-serif; border-radius:14px; overflow:hidden; border:1px solid #E2E8F0; box-shadow:0 2px 16px rgba(0,0,0,.06); }
#co-sidebar { width:195px; background:#0F172A; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto; }
#co-chat   { flex:1; display:flex; flex-direction:column; overflow:hidden; background:#F8FAFC; }
#co-messages { flex:1; overflow-y:auto; padding:18px; display:flex; flex-direction:column; gap:12px; }
#co-messages::-webkit-scrollbar { width:3px; }
#co-messages::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:3px; }
</style>

<div id="co-wrap">
  <div id="co-sidebar">
    <div style="padding:14px 10px 6px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);">Actions rapides</div>
    ${[
      {i:'👷', l:'Ajouter un technicien', t:'Ajoute le technicien '},
      {i:'📋', l:'Mettre à jour le CRA',  t:'Ajoute au CRA : le technicien '},
      {i:'📅', l:'Modifier le planning',   t:'Ajoute au planning : '},
      {i:'⭐', l:'Répondre avis Google',   t:'Réponds à cet avis Google : '},
      {i:'📧', l:'Rédiger un mail',        t:'Rédige un mail pour '},
      {i:'📊', l:'Résumé portail',         t:'Donne-moi un résumé complet du portail Dreamwash'},
      {i:'💡', l:'Conseils',               t:'Quels conseils pour optimiser Dreamwash ?'},
    ].map(b => `
      <button onclick="coQuick(${JSON.stringify(b.t)})" style="
        display:flex;align-items:center;gap:8px;padding:8px;margin:1px 5px;
        border-radius:7px;border:none;background:transparent;color:rgba(255,255,255,.6);
        font-family:'Inter',sans-serif;font-size:11px;cursor:pointer;text-align:left;
        width:calc(100% - 10px);"
        onmouseover="this.style.background='rgba(255,255,255,.08)';this.style.color='#fff'"
        onmouseout="this.style.background='transparent';this.style.color='rgba(255,255,255,.6)'">
        <span style="width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;
          font-size:12px;background:rgba(255,255,255,.07);flex-shrink:0;">${b.i}</span>
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${b.l}</span>
      </button>`).join('')}
    <div style="margin-top:auto;padding:12px;border-top:1px solid rgba(255,255,255,.08);">
      <div style="display:flex;align-items:center;gap:7px;font-size:10px;color:rgba(255,255,255,.4);">
        <div style="width:6px;height:6px;border-radius:50%;background:#10b981;box-shadow:0 0 5px #10b981;animation:coPulse 2s infinite;flex-shrink:0;"></div>
        Gemini · accès portail complet
      </div>
    </div>
  </div>

  <div id="co-chat">
    <div style="background:#fff;border-bottom:1px solid #E2E8F0;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <div style="font-weight:800;font-size:14px;color:#0F172A;">💧 Copilote Dreamwash</div>
        <div style="font-size:11px;color:#64748B;">Lecture + modifications en temps réel</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="padding:3px 9px;border-radius:20px;font-size:10px;font-weight:600;background:#D1FAE5;color:#065F46;">● En ligne</span>
        <button onclick="_coHistory=[];_coRenderMessages()" title="Effacer"
          style="padding:4px 10px;border-radius:8px;font-size:11px;background:#F1F5F9;color:#64748B;border:none;cursor:pointer;">🗑</button>
      </div>
    </div>

    <div id="co-messages"></div>

    <div style="background:#fff;border-top:1px solid #E2E8F0;padding:12px 16px;flex-shrink:0;">
      <div style="display:flex;align-items:flex-end;gap:8px;background:#F1F5F9;border:1.5px solid #E2E8F0;border-radius:11px;padding:9px 12px;">
        <textarea id="co-input" rows="1"
          placeholder="Ex: Ajoute le technicien Karim au centre Belleville en CDI, ou: Réponds à cet avis 1 étoile…"
          style="flex:1;border:none;background:transparent;font-family:'Inter',sans-serif;font-size:13px;color:#0F172A;resize:none;outline:none;max-height:90px;min-height:18px;line-height:1.5;"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();coSend()}"
          oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
        <button id="co-send-btn" onclick="coSend()"
          style="width:34px;height:34px;background:#2563EB;border:none;border-radius:8px;cursor:pointer;color:#fff;font-size:13px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">➤</button>
      </div>
      <div style="font-size:10px;color:#94A3B8;text-align:center;margin-top:5px;">Entrée pour envoyer · Shift+Entrée pour saut de ligne</div>
    </div>
  </div>
</div>`;

  _coRenderMessages();

  if (_coHistory.length === 0) {
    const nb = typeof TECHS !== 'undefined' ? TECHS.length : '?';
    const nc = typeof CENTRES !== 'undefined' ? CENTRES.length : '?';
    const welcome = `Bonjour ! Je suis votre **Copilote Dreamwash** 💧\n\nJ'ai accès en temps réel à tout votre portail (**${nc} centres**, **${nb} techniciens**) et je peux faire des modifications directement.\n\nExemples :\n• *"Ajoute le technicien Karim Benali au centre Belleville en CDI"*\n• *"Ajoute au CRA : Ahmed a travaillé le 20/05/2026 à Aeroville A"*\n• *"Ajoute Ahmed au planning de lundi à Aeroville A"*\n• *"Réponds à cet avis 1 étoile : …"*\n\nQue voulez-vous faire ?`;
    _coHistory.push({ role: 'assistant', content: welcome });
    _coRenderMessages();
  }

  setTimeout(() => { const i = document.getElementById('co-input'); if (i) i.focus(); }, 100);
}

// ── Init ────────────────────────────────────────────────────────
function initCopilote() {
  if (_coInitialized) return;
  _coInitialized = true;
  _renderCopiloteShell();
}

// ── Send ────────────────────────────────────────────────────────
window.coSend = async function() {
  const input = document.getElementById('co-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';

  _coHistory.push({ role: 'user', content: text });
  _coRenderMessages();

  const btn = document.getElementById('co-send-btn');
  if (btn) btn.disabled = true;

  // Typing indicator
  const c = document.getElementById('co-messages');
  if (c) {
    const typing = document.createElement('div');
    typing.id = 'co-typing';
    typing.style.cssText = 'display:flex;gap:9px;animation:coFadeUp .2s ease;';
    typing.innerHTML = `
      <div style="width:30px;height:30px;border-radius:8px;background:#2563EB;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">💧</div>
      <div style="padding:13px 15px;border-radius:13px;border-top-left-radius:3px;background:#fff;border:1px solid #E2E8F0;">
        <div style="display:flex;gap:5px;">${[0,.2,.4].map(d=>`<span style="width:6px;height:6px;background:#94A3B8;border-radius:50%;animation:coBounce 1.2s infinite ${d}s;display:inline-block;"></span>`).join('')}</div>
      </div>`;
    c.appendChild(typing);
    c.scrollTop = c.scrollHeight;
  }

  try {
    const apiMessages = _coHistory
      .filter((m, i) => !(i === 0 && m.role === 'assistant'))
      .map(m => ({ role: m.role, content: m.content }));

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages, systemContext: buildCopiloteContext() })
    });

    const data = await res.json();
    const raw = data.reply || data.error || 'Erreur inattendue.';
    const display = await _coProcessReply(raw);
    _coHistory.push({ role: 'assistant', content: display });
  } catch (e) {
    _coHistory.push({ role: 'assistant', content: `❌ Erreur : ${e.message}` });
  }

  const typing = document.getElementById('co-typing');
  if (typing) typing.remove();
  if (btn) btn.disabled = false;

  _coRenderMessages();
  setTimeout(() => { const i = document.getElementById('co-input'); if (i) i.focus(); }, 50);
};

window.coQuick = function(text) {
  const input = document.getElementById('co-input');
  if (!input) return;
  input.value = text;
  input.focus();
  input.style.height = 'auto';
  input.style.height = input.scrollHeight + 'px';
};

window.coCopyBubble = function(btn) {
  const content = btn.closest('div').previousElementSibling?.innerText || '';
  navigator.clipboard.writeText(content).then(() => {
    btn.textContent = '✅ Copié !';
    setTimeout(() => btn.textContent = '📋 Copier', 2000);
  });
};

window._coRenderMessages = _coRenderMessages;
window.initCopilote = initCopilote;
