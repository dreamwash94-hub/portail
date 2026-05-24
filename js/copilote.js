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

7. Exporter un fichier CSV (badgeuse, CRA, ou liste techniciens) :
⚡ACTION:{"type":"EXPORT_CSV","source":"badgeuse","mois":"05/2026"}
⚡ACTION:{"type":"EXPORT_CSV","source":"cra","mois":"05/2026"}
⚡ACTION:{"type":"EXPORT_CSV","source":"techs"}
(mois format MM/AAAA — optionnel pour badgeuse/cra, si absent = tout)

Tu peux enchaîner plusieurs actions dans une seule réponse.

═══ RÈGLES ═══
- Quand l'utilisateur demande une modification → exécute-la avec ⚡ACTION, ne dis jamais "je ne peux pas".
- Pour TOUT export (CSV, rapport, liste) → utilise ⚡ACTION avec EXPORT_CSV.
- Confirme ce que tu fais en une ligne, puis mets l'action.
- Réponds en 2-4 lignes max sauf demande de texte long (mail, réponse Google...).
- Ne mets jamais d'explication inutile.
- Pour les mails et réponses Google : formate clairement avec "Objet :" et "Corps :" ou guillemets.`;
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

        return `❌ Source inconnue : ${src}. Utilise "badgeuse", "cra" ou "techs"`;
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
