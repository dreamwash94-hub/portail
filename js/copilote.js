// ═══════════════════════════════════════════════════════════════
// COPILOTE IA — Powered by Google Gemini
// ═══════════════════════════════════════════════════════════════

let _coHistory = [];
let _coInitialized = false;

function buildCopiloteContext() {
  const centresInfo = (typeof CENTRES !== 'undefined' ? CENTRES : [])
    .map(c => `  • ${c.nom}: loyer ${c.loyer}€/mois, techs: ${(c.techs||[]).join(', ')}`)
    .join('\n');

  const techsList = (typeof TECHS !== 'undefined' ? TECHS : [])
    .map(t => `${t.nom}${t.centre ? ' ('+t.centre+')' : ''}`)
    .join(', ');

  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;

  return `Tu es le Copilote IA de Dreamwash, une entreprise française de lavage automobile écologique sans eau.
Tu t'appelles "Copilote Dreamwash". Tu parles TOUJOURS en français. Tu es direct, efficace et pratique.
Date du jour : ${dateStr}

DONNÉES DU PORTAIL :
Centres (${(typeof CENTRES !== 'undefined' ? CENTRES : []).length}) :
${centresInfo || '  Aucun centre'}
Techniciens (${(typeof TECHS !== 'undefined' ? TECHS : []).length}) :
${techsList || 'Aucun technicien'}

SOCIÉTÉ : Dreamwash · 54 av. Henri Barbusse, Drancy 93700 · 07 82 48 43 00 · reservation@dreamwash.fr · SIRET 977 739 242

NAVIGATION DU PORTAIL (explique comment accéder aux fonctions) :
- Ajouter/modifier un technicien → onglet "Techniciens" → bouton "+ Ajouter"
- Modifier le planning → onglet "Planning" → clic sur une case
- Voir/modifier le CRA → onglet "CRA" → choisir le mois
- Fermeture de caisse → onglet "Caisse"
- Ventes & factures → onglet "Caisse Enreg."
- Badgeuse (pointage) → onglet "Badgeuse"
- Stock produits → onglet "Stock & Produits"
- Charges fixes → onglet "Charges fixes"

TES CAPACITÉS :
1. GUIDE PORTAIL → explique comment faire une action dans le portail (navigation, où cliquer)
2. AVIS GOOGLE → rédige une réponse professionnelle prête à copier-coller entre guillemets
3. MAIL / WHATSAPP → rédige le message complet avec "Objet :" et "Corps :" pour les mails
4. ANALYSE → résumé de l'équipe, des centres, des performances
5. CRA / PLANNING → analyse et conseils sur l'organisation
6. RÉDACTION → annonces, affiches, contenu commercial

RÈGLES ABSOLUES :
- Réponds TOUJOURS en 3-5 lignes max sauf si on te demande un texte long.
- Ne dis JAMAIS "je ne peux pas modifier le portail" — dis plutôt "pour faire ça, va dans [onglet X] et clique [bouton Y]".
- Si quelqu'un veut ajouter un technicien → explique où le faire dans le portail.
- Sois direct et opérationnel. Pas de blabla.
- Formate les mails et réponses Google clairement pour copier-coller.`;
}

function initCopilote() {
  if (_coInitialized) return;
  _coInitialized = true;
  _renderCopiloteShell();
}

function _renderCopiloteShell() {
  const el = document.getElementById('page-copilote');
  if (!el) return;

  el.innerHTML = `
<style>
@keyframes coFadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
@keyframes coBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
@keyframes coPulse  { 0%,100%{opacity:1} 50%{opacity:.4} }
#co-wrap { display:flex; height:calc(100vh - 115px); font-family:'Inter',sans-serif; border-radius:14px; overflow:hidden; border:1px solid #E2E8F0; box-shadow:0 2px 16px rgba(0,0,0,.06); }
#co-sidebar { width:200px; background:#0F172A; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto; }
#co-chat   { flex:1; display:flex; flex-direction:column; overflow:hidden; background:#F8FAFC; }
#co-messages { flex:1; overflow-y:auto; padding:18px; display:flex; flex-direction:column; gap:12px; }
#co-messages::-webkit-scrollbar { width:3px; }
#co-messages::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:3px; }
</style>

<div id="co-wrap">

  <!-- Sidebar raccourcis -->
  <div id="co-sidebar">
    <div style="padding:14px 10px 6px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);">Actions rapides</div>
    ${[
      {i:'⭐', l:'Répondre avis Google', t:'Réponds à cet avis Google : '},
      {i:'📧', l:'Rédiger un mail',      t:'Rédige un mail pour '},
      {i:'📊', l:'Résumé portail',       t:'Donne-moi un résumé complet du portail Dreamwash'},
      {i:'📋', l:'CRA du mois',          t:'Génère le CRA du mois en cours'},
      {i:'💡', l:'Conseils',             t:'Quels conseils pour optimiser Dreamwash ?'},
      {i:'📣', l:'Message WhatsApp',     t:'Rédige un message WhatsApp pour les techniciens : '},
    ].map(b => `
      <button onclick="coQuick(${JSON.stringify(b.t)})" style="
        display:flex;align-items:center;gap:8px;padding:8px 8px;margin:1px 5px;
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
        Gemini 1.5 Flash · actif
      </div>
    </div>
  </div>

  <!-- Zone chat -->
  <div id="co-chat">

    <!-- Header -->
    <div style="background:#fff;border-bottom:1px solid #E2E8F0;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <div style="font-weight:800;font-size:14px;color:#0F172A;">💧 Copilote Dreamwash</div>
        <div style="font-size:11px;color:#64748B;">Parlez-moi, je gère votre portail</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="padding:3px 9px;border-radius:20px;font-size:10px;font-weight:600;background:#D1FAE5;color:#065F46;">● En ligne</span>
        <button onclick="_coHistory=[];_coRenderMessages()" title="Effacer la conversation"
          style="padding:4px 10px;border-radius:8px;font-size:11px;font-weight:600;background:#F1F5F9;color:#64748B;border:none;cursor:pointer;">🗑</button>
      </div>
    </div>

    <!-- Messages -->
    <div id="co-messages"></div>

    <!-- Input -->
    <div style="background:#fff;border-top:1px solid #E2E8F0;padding:12px 16px;flex-shrink:0;">
      <div style="display:flex;align-items:flex-end;gap:8px;background:#F1F5F9;border:1.5px solid #E2E8F0;border-radius:11px;padding:9px 12px;">
        <textarea id="co-input" rows="1"
          placeholder="Parlez-moi… ex: Réponds à cet avis 1 étoile, rédige un mail client…"
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

  // Message de bienvenue
  if (_coHistory.length === 0) {
    const nbCentres = typeof CENTRES !== 'undefined' ? CENTRES.length : '?';
    const nbTechs   = typeof TECHS   !== 'undefined' ? TECHS.length   : '?';
    const welcome = `Bonjour ! Je suis votre **Copilote Dreamwash** 💧\n\nJe connais votre portail en temps réel :\n• **${nbCentres} centres** actifs · **${nbTechs} techniciens** dans l'équipe\n\nQuelques exemples :\n• *"Réponds à cet avis 1 étoile : le lavage était décevant…"*\n• *"Rédige un mail de relance pour un client Belleville"*\n• *"Donne-moi un résumé de l'équipe"*\n• *"Quels conseils pour optimiser Aeroville A ?"*\n\nQu'est-ce que je peux faire pour vous ?`;
    _coHistory.push({ role: 'assistant', content: welcome });
    _coRenderMessages();
  }

  setTimeout(() => { const i = document.getElementById('co-input'); if (i) i.focus(); }, 100);
}

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
    if (!isUser && msg.content.length > 80) {
      actions = `<div style="margin-top:9px;display:flex;gap:6px;flex-wrap:wrap;">
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

function _coAddTyping() {
  const c = document.getElementById('co-messages');
  if (!c) return;
  const div = document.createElement('div');
  div.id = 'co-typing';
  div.style.cssText = 'display:flex;gap:9px;animation:coFadeUp .2s ease;';
  div.innerHTML = `
    <div style="width:30px;height:30px;border-radius:8px;background:#2563EB;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">💧</div>
    <div style="padding:13px 15px;border-radius:13px;border-top-left-radius:3px;background:#fff;border:1px solid #E2E8F0;">
      <div style="display:flex;gap:5px;align-items:center;">
        ${[0,.2,.4].map(d=>`<span style="width:6px;height:6px;background:#94A3B8;border-radius:50%;animation:coBounce 1.2s infinite ${d}s;display:inline-block;"></span>`).join('')}
      </div>
    </div>`;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

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
  _coAddTyping();

  try {
    // Send only real exchanges (skip the welcome message for API context, it's handled by systemContext)
    const apiMessages = _coHistory
      .filter((m, i) => !(i === 0 && m.role === 'assistant'))
      .map(m => ({ role: m.role, content: m.content }));

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages, systemContext: buildCopiloteContext() })
    });

    const data = await res.json();
    _coHistory.push({ role: 'assistant', content: data.reply || data.error || "Erreur inattendue." });
  } catch (e) {
    _coHistory.push({ role: 'assistant', content: `❌ Erreur de connexion : ${e.message}` });
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
