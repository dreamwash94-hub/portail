// ═══════════════════════════════════════════════════════════════════════════════
// CAISSE — Module fermeture de caisse (suivi rouge/vert)
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
    caisseData = window.loadCaisses ? await window.loadCaisses(caisseDateFilter) : [];
  } catch(e) { caisseData = []; }

  renderCaisse();
};

function renderCaisse() {
  const container = document.getElementById('caisse-container');
  if (!container) return;

  const isToday = caisseDateFilter === getTodayStr();

  const filtered = caisseCentreFilter === 'tous'
    ? caisseData
    : caisseData.filter(e => e.centre === caisseCentreFilter);

  // Agréger par technicien avec séparation rouge/vert
  const byTech = {};
  filtered.forEach(e => {
    if (!byTech[e.nom]) byTech[e.nom] = {
      nom: e.nom, centre: e.centre, color: e.color||'#60A5FA',
      rouge: [], vert: []
    };
    const decl = { time: e.time||'--:--', montant: e.montant };
    if (e.couleur === 'vert') byTech[e.nom].vert.push(decl);
    else byTech[e.nom].rouge.push(decl);
  });

  const declaredTechs = Object.values(byTech);
  const declaredNames = new Set(declaredTechs.map(t => t.nom));

  // Techs sans déclaration
  const activeTechs = (typeof TECHS !== 'undefined' ? TECHS : []).filter(t => !t.statut || t.statut === 'actif');
  const filteredActive = caisseCentreFilter === 'tous'
    ? activeTechs
    : activeTechs.filter(t => t.centre === caisseCentreFilter);
  const undeclaredTechs = filteredActive.filter(t => !declaredNames.has(t.nom));

  // KPIs
  const totalVert  = filtered.filter(e=>e.couleur==='vert').reduce((s,e)=>s+e.montant,0);
  const totalRouge = filtered.filter(e=>e.couleur!=='vert').reduce((s,e)=>s+e.montant,0);
  const totalGlobal = totalVert + totalRouge;

  const allCentres = ['Aeroville A','Aeroville B','Lafayette Rouge','Lafayette Vert','Cité des Sciences','Le Parks','Parly2','Belleville','Suresnes'];

  function toInputDate(dStr) {
    if (!dStr) return '';
    const [d,m,y] = dStr.split('/');
    return `${y}-${m}-${d}`;
  }

  function declRow(d, couleur) {
    const isVert = couleur === 'vert';
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 10px;
      background:${isVert?'rgba(22,163,74,0.08)':'rgba(220,38,38,0.08)'};
      border-radius:6px;border:1px solid ${isVert?'rgba(22,163,74,0.2)':'rgba(220,38,38,0.2)'};">
      <span style="font-size:11px;color:${isVert?'#15803D':'#DC2626'};font-weight:600;">${isVert?'🟢':'🔴'} ${d.time}</span>
      <span style="font-size:13px;font-weight:700;color:${isVert?'#14532D':'#991B1B'};">${formatMontant(d.montant)}</span>
    </div>`;
  }

  function techCard(t) {
    const totalT = [...t.rouge,...t.vert].reduce((s,d)=>s+d.montant,0);
    const totalR = t.rouge.reduce((s,d)=>s+d.montant,0);
    const totalV = t.vert.reduce((s,d)=>s+d.montant,0);
    return `
    <div style="background:#fff;border:1.5px solid #E5E7EB;border-radius:12px;padding:14px 16px;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <div style="width:38px;height:38px;border-radius:50%;background:${t.color}22;color:${t.color};
          display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;
          flex-shrink:0;border:2px solid ${t.color}44;">${t.nom.charAt(0)}</div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:700;color:var(--text);">${t.nom}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:1px;">📍 ${t.centre}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:16px;font-weight:900;color:var(--text);">${formatMontant(totalT)}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:1px;">
            ${t.rouge.length?`<span style="color:#DC2626;">🔴 ${formatMontant(totalR)}</span>`:''}
            ${t.rouge.length&&t.vert.length?' · ':''}
            ${t.vert.length?`<span style="color:#15803D;">🟢 ${formatMontant(totalV)}</span>`:''}
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;">
        ${t.rouge.map(d=>declRow(d,'rouge')).join('')}
        ${t.vert.map(d=>declRow(d,'vert')).join('')}
      </div>
    </div>`;
  }

  container.innerHTML = `
    <div class="rh">
      <div>
        <div class="sec-title">Fermeture de caisse</div>
        <div class="sec-sub">${isToday?"Aujourd'hui":caisseDateFilter} — ${declaredTechs.length} déclaré${declaredTechs.length>1?'s':''}, ${undeclaredTechs.length} en attente</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <input type="date" id="caisse-date-input" value="${toInputDate(caisseDateFilter)}"
          style="border:1px solid var(--border);border-radius:8px;padding:7px 12px;font-size:13px;background:var(--bg3);font-family:inherit;cursor:pointer;"
          onchange="caisseDateFilter=fromInputDate_caisse(this.value);refreshCaisse()">
        <button class="btn btn-p btn-sm" onclick="refreshCaisse()">🔄 Actualiser</button>
      </div>
    </div>

    <div class="kpi-g" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px;">
      <div class="kpi">
        <div class="kpi-i" style="background:#DCFCE7;">✅</div>
        <div class="kpi-v" style="color:#16A34A;">${declaredTechs.length}</div>
        <div class="kpi-l">Déclarés</div>
        <div class="kpi-t up">● Caisse OK</div>
      </div>
      <div class="kpi">
        <div class="kpi-i" style="background:#FEE2E2;">⏳</div>
        <div class="kpi-v" style="color:#DC2626;">${undeclaredTechs.length}</div>
        <div class="kpi-l">En attente</div>
        <div class="kpi-t down">● Non déclaré</div>
      </div>
      <div class="kpi">
        <div class="kpi-i" style="background:#FEE2E2;font-size:20px;">🔴</div>
        <div class="kpi-v" style="color:#DC2626;font-size:clamp(14px,2vw,22px);">${formatMontant(totalRouge)}</div>
        <div class="kpi-l">Total Rouge</div>
        <div class="kpi-t down">Non encaissé</div>
      </div>
      <div class="kpi">
        <div class="kpi-i" style="background:#DCFCE7;font-size:20px;">🟢</div>
        <div class="kpi-v" style="color:#15803D;font-size:clamp(14px,2vw,22px);">${formatMontant(totalVert)}</div>
        <div class="kpi-l">Total Vert</div>
        <div class="kpi-t up">Encaissé</div>
      </div>
    </div>

    <div class="fbar" style="margin-bottom:16px;" id="caisse-fbar">
      <button class="fbtn ${caisseCentreFilter==='tous'?'active':''}" onclick="setCaisseFilter(this,'tous')">Tous</button>
      ${allCentres.map(c=>`<button class="fbtn ${caisseCentreFilter===c?'active':''}" onclick="setCaisseFilter(this,'${c}')">${c}</button>`).join('')}
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;">

      ${declaredTechs.length===0 && undeclaredTechs.length===0 ? `
        <div style="text-align:center;padding:60px;color:var(--muted);">
          <div style="font-size:36px;margin-bottom:12px;">💵</div>
          <div style="font-size:15px;font-weight:600;">Aucune déclaration pour cette date</div>
        </div>
      ` : ''}

      ${declaredTechs.length > 0 ? `
        <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px;">✅ Déclarés (${declaredTechs.length})</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;margin-bottom:8px;">
          ${declaredTechs.map(t=>techCard(t)).join('')}
        </div>
      ` : ''}

      ${undeclaredTechs.length > 0 ? `
        <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px;">⏳ Non déclarés (${undeclaredTechs.length})</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;">
          ${undeclaredTechs.map(t=>`
            <div style="background:#FFF5F5;border:1.5px solid #FECACA;border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;border-radius:50%;background:${t.color||'#60A5FA'}22;color:${t.color||'#60A5FA'};
                display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;
                flex-shrink:0;border:2px solid ${t.color||'#60A5FA'}44;">${t.nom.charAt(0)}</div>
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
  document.querySelectorAll('#caisse-fbar .fbtn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderCaisse();
}

window.fromInputDate_caisse = function(iStr) {
  if (!iStr) return '';
  const [y,m,d] = iStr.split('-');
  return `${d}/${m}/${y}`;
};
