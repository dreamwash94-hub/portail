// ═══════════════════════════════════════════════════════════════════════════════
// CAISSE — Module fermeture de caisse
// ═══════════════════════════════════════════════════════════════════════════════

let caisseDateFilter = '';
let caisseCentreFilter = 'tous';
let caisseData = [];

function getTodayStr() {
  const now = new Date();
  return `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
}

function formatMontant(v) {
  return v.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
}

window.refreshCaisse = async function() {
  const container = document.getElementById('caisse-container');
  if (!container) return;

  if (!caisseDateFilter) caisseDateFilter = getTodayStr();

  container.innerHTML = `<div style="text-align:center;padding:60px;color:var(--muted);">⏳ Chargement…</div>`;

  try {
    if (window.loadCaisses) {
      caisseData = await window.loadCaisses(caisseDateFilter);
    } else {
      caisseData = [];
    }
  } catch(e) { caisseData = []; }

  renderCaisse();
};

function renderCaisse() {
  const container = document.getElementById('caisse-container');
  if (!container) return;

  const isToday = caisseDateFilter === getTodayStr();

  // Filtrer par centre si besoin
  const filtered = caisseCentreFilter === 'tous'
    ? caisseData
    : caisseData.filter(e => e.centre === caisseCentreFilter);

  // Agréger par technicien
  const byTech = {};
  filtered.forEach(e => {
    if (!byTech[e.nom]) byTech[e.nom] = { nom: e.nom, centre: e.centre, color: e.color||'#4ADE80', decls: [] };
    byTech[e.nom].decls.push({ time: e.time||'--:--', montant: e.montant });
  });

  // Techs qui ont déclaré
  const declaredTechs = Object.values(byTech);
  const declaredNames = new Set(declaredTechs.map(t => t.nom));

  // Techs qui n'ont PAS déclaré (depuis la liste TECHS du portail)
  const activeTechs = (typeof TECHS !== 'undefined' ? TECHS : []).filter(t => !t.statut || t.statut === 'actif');
  const filteredActiveTechs = caisseCentreFilter === 'tous'
    ? activeTechs
    : activeTechs.filter(t => t.centre === caisseCentreFilter);
  const undeclaredTechs = filteredActiveTechs.filter(t => !declaredNames.has(t.nom));

  // KPIs
  const totalEspeces = filtered.reduce((s, e) => s + e.montant, 0);
  const nbDeclared = declaredTechs.length;
  const nbUndeclared = undeclaredTechs.length;

  // Convertir date DD/MM/YYYY → YYYY-MM-DD pour l'input date
  function toInputDate(dStr) {
    if (!dStr) return '';
    const [d, m, y] = dStr.split('/');
    return `${y}-${m}-${d}`;
  }
  function fromInputDate(iStr) {
    if (!iStr) return '';
    const [y, m, d] = iStr.split('-');
    return `${d}/${m}/${y}`;
  }

  // Centres disponibles
  const centresPresents = [...new Set(caisseData.map(e => e.centre))].filter(Boolean);
  const allCentres = ['Aeroville A','Aeroville B','Lafayette Rouge','Lafayette Vert','Cité des Sciences','Le Parks','Parly2','Belleville','Suresnes'];

  container.innerHTML = `
    <!-- HEADER ROW -->
    <div class="rh">
      <div>
        <div class="sec-title">Fermeture de caisse</div>
        <div class="sec-sub">${isToday ? "Aujourd'hui" : caisseDateFilter} — ${nbDeclared} déclaré${nbDeclared>1?'s':''}, ${nbUndeclared} en attente</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <input type="date" id="caisse-date-input" value="${toInputDate(caisseDateFilter)}"
          style="border:1px solid var(--border);border-radius:8px;padding:7px 12px;font-size:13px;background:var(--bg3);font-family:inherit;cursor:pointer;"
          onchange="caisseDateFilter=fromInputDate_caisse(this.value);refreshCaisse()">
        <button class="btn btn-p btn-sm" onclick="refreshCaisse()">🔄 Actualiser</button>
      </div>
    </div>

    <!-- KPIs -->
    <div class="kpi-g" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px;">
      <div class="kpi">
        <div class="kpi-i" style="background:#DCFCE7;">✅</div>
        <div class="kpi-v" style="color:#16A34A;">${nbDeclared}</div>
        <div class="kpi-l">Techniciens déclarés</div>
        <div class="kpi-t up">● Caisse OK</div>
      </div>
      <div class="kpi">
        <div class="kpi-i" style="background:#FEE2E2;">⏳</div>
        <div class="kpi-v" style="color:#DC2626;">${nbUndeclared}</div>
        <div class="kpi-l">Non déclarés</div>
        <div class="kpi-t down">● En attente</div>
      </div>
      <div class="kpi">
        <div class="kpi-i" style="background:#F0FDF4;">💵</div>
        <div class="kpi-v" style="color:#15803D;font-size:clamp(16px,2.5vw,26px);">${formatMontant(totalEspeces)}</div>
        <div class="kpi-l">Total espèces</div>
        <div class="kpi-t up">Déclaré</div>
      </div>
    </div>

    <!-- FILTRE CENTRE -->
    <div class="fbar" style="margin-bottom:16px;" id="caisse-fbar">
      <button class="fbtn ${caisseCentreFilter==='tous'?'active':''}" onclick="setCaisseFilter(this,'tous')">Tous</button>
      ${allCentres.map(c=>`<button class="fbtn ${caisseCentreFilter===c?'active':''}" onclick="setCaisseFilter(this,'${c}')">${c}</button>`).join('')}
    </div>

    <!-- CONTENU -->
    <div style="display:flex;flex-direction:column;gap:10px;">

      ${declaredTechs.length===0 && undeclaredTechs.length===0 ? `
        <div style="text-align:center;padding:60px;color:var(--muted);">
          <div style="font-size:36px;margin-bottom:12px;">💵</div>
          <div style="font-size:15px;font-weight:600;">Aucune donnée pour cette date</div>
        </div>
      ` : ''}

      ${declaredTechs.length > 0 ? `
        <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;">✅ Déclarés (${declaredTechs.length})</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;margin-bottom:12px;">
          ${declaredTechs.map(t => {
            const total = t.decls.reduce((s,d)=>s+d.montant,0);
            return `
            <div style="background:#F0FDF4;border:1.5px solid #BBF7D0;border-radius:12px;padding:14px 16px;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                <div style="width:38px;height:38px;border-radius:50%;background:${t.color}22;color:${t.color};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0;border:2px solid ${t.color}44;">${t.nom.charAt(0)}</div>
                <div style="flex:1;">
                  <div style="font-size:13px;font-weight:700;color:#14532D;">${t.nom}</div>
                  <div style="font-size:11px;color:#15803D;margin-top:1px;">📍 ${t.centre}</div>
                </div>
                <div style="font-size:18px;font-weight:900;color:#15803D;">${formatMontant(total)}</div>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                ${t.decls.map(d=>`
                  <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 10px;background:rgba(22,163,74,0.08);border-radius:6px;border:1px solid rgba(22,163,74,0.15);">
                    <span style="font-size:11px;color:#15803D;font-weight:600;">🕐 ${d.time}</span>
                    <span style="font-size:13px;font-weight:700;color:#14532D;">${formatMontant(d.montant)}</span>
                  </div>`).join('')}
              </div>
            </div>`;
          }).join('')}
        </div>
      ` : ''}

      ${undeclaredTechs.length > 0 ? `
        <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;">⏳ Non déclarés (${undeclaredTechs.length})</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;">
          ${undeclaredTechs.map(t=>`
            <div style="background:#FFF5F5;border:1.5px solid #FECACA;border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;border-radius:50%;background:${t.color||'#60A5FA'}22;color:${t.color||'#60A5FA'};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0;border:2px solid ${t.color||'#60A5FA'}44;">${t.nom.charAt(0)}</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:700;color:#991B1B;">${t.nom}</div>
                <div style="font-size:11px;color:#DC2626;margin-top:1px;">📍 ${t.centre}</div>
              </div>
              <div style="font-size:11px;font-weight:700;color:#EF4444;background:#FEE2E2;padding:4px 10px;border-radius:20px;">Pas déclaré</div>
            </div>`).join('')}
        </div>
      ` : ''}

    </div>
  `;
}

function setCaisseFilter(btn, centre) {
  caisseCentreFilter = centre;
  document.querySelectorAll('#caisse-fbar .fbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCaisse();
}

// Exposé globalement pour l'onchange inline
window.fromInputDate_caisse = function(iStr) {
  if (!iStr) return '';
  const [y, m, d] = iStr.split('-');
  return `${d}/${m}/${y}`;
};
