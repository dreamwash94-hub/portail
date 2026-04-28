// ═══════════════════════════════════════════════════════════════
// CAISSE ENREGISTREUSE — Ventes & Factures
// ═══════════════════════════════════════════════════════════════

const CE_CENTRES = ['Belleville','Aeroville A','Aeroville B','Lafayette Rouge','Lafayette Vert','Malakoff','Suresnes'];
const CE_APP_URL = 'https://dw-caisse-enregistreuse.vercel.app';
const CE_MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

let _ceVentes = [];
let _ceFactures = [];
let _ceClients = [];
let _ceCentre = 'Tous';
let _ceMonth = null; // "2026-04" format, null = tout

function fmtEur(n) {
  return (n||0).toFixed(2).replace('.', ',') + ' €';
}

function ceMonthLabel(key) {
  const [y, m] = key.split('-');
  return CE_MONTHS_FR[parseInt(m)-1] + ' ' + y;
}

function ceGetMonthKey(dateISO) {
  if (!dateISO) return null;
  const d = new Date(dateISO);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}

function ceAvailableMonths(ventes) {
  const keys = new Set(ventes.map(v => ceGetMonthKey(v.dateISO)).filter(Boolean));
  return [...keys].sort().reverse();
}

function ceFilterVentes(ventes) {
  return ventes.filter(v => {
    const monthOk = !_ceMonth || ceGetMonthKey(v.dateISO) === _ceMonth;
    const centreOk = _ceCentre === 'Tous' || v.centre === _ceCentre;
    return monthOk && centreOk;
  });
}

function ceFilterFactures(factures) {
  return factures.filter(f => {
    const monthOk = !_ceMonth || ceGetMonthKey(f.dateISO) === _ceMonth;
    const centreOk = _ceCentre === 'Tous' || f.vente?.centre === _ceCentre;
    return monthOk && centreOk;
  });
}

function ceRender() {
  const el = document.getElementById('caisse-enregistreuse-container');
  if (!el) return;

  const todayStr = (() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  })();

  const months = ceAvailableMonths(_ceVentes);
  const allV = ceFilterVentes(_ceVentes);
  const todayV = allV.filter(v => v.date === todayStr);
  const allF = ceFilterFactures(_ceFactures);

  const ca = arr => arr.reduce((s,v) => s + (v.totalTTC||0), 0);
  const caAll = ca(allV), caToday = ca(todayV);
  const especes = allV.filter(v=>v.paiement==='especes').reduce((s,v)=>s+(v.totalTTC||0),0);
  const carte   = allV.filter(v=>v.paiement==='carte').reduce((s,v)=>s+(v.totalTTC||0),0);
  const tva     = allV.reduce((s,v)=>s+(v.tva||0),0);

  const byCenter = CE_CENTRES.map(c => ({
    centre: c,
    ca: allV.filter(v=>v.centre===c).reduce((s,v)=>s+(v.totalTTC||0),0),
    nb: allV.filter(v=>v.centre===c).length,
    today: todayV.filter(v=>v.centre===c).reduce((s,v)=>s+(v.totalTTC||0),0),
  })).filter(x => x.nb > 0).sort((a,b) => b.ca - a.ca);

  const recentV = [...allV].sort((a,b) => (b.timestamp||0)-(a.timestamp||0)).slice(0,25);
  const recentF = [...allF].sort((a,b) => new Date(b.dateISO) - new Date(a.dateISO)).slice(0,10);

  const currentLabel = _ceMonth ? ceMonthLabel(_ceMonth) : 'Tout';

  el.innerHTML = `
<div style="padding:16px;display:flex;flex-direction:column;gap:14px;">

  <!-- Month filter -->
  <div>
    <div style="font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:6px;">Période</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      <button onclick="window._ceMonth=null;window._ceRender()" style="
        padding:6px 14px;border-radius:8px;border:none;cursor:pointer;font-size:13px;font-weight:600;
        background:${!_ceMonth?'#1565C0':'rgba(0,0,0,0.07)'};color:${!_ceMonth?'#fff':'var(--text)'};">
        Tout
      </button>
      ${months.map(m => `
        <button onclick="window._ceMonth='${m}';window._ceRender()" style="
          padding:6px 14px;border-radius:8px;border:none;cursor:pointer;font-size:13px;font-weight:600;
          background:${_ceMonth===m?'#1565C0':'rgba(0,0,0,0.07)'};color:${_ceMonth===m?'#fff':'var(--text)'};">
          ${ceMonthLabel(m)}
        </button>`).join('')}
    </div>
  </div>

  <!-- Centre filter -->
  <div>
    <div style="font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:6px;">Centre</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      ${['Tous',...CE_CENTRES].map(c => `
        <button onclick="window._ceCentre='${c}';window._ceRender()" style="
          padding:5px 12px;border-radius:8px;border:none;cursor:pointer;font-size:12px;font-weight:600;
          background:${_ceCentre===c?'#F73FA4':'rgba(0,0,0,0.07)'};color:${_ceCentre===c?'#fff':'var(--text)'};">
          ${c}
        </button>`).join('')}
    </div>
  </div>

  <!-- KPI cards -->
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;">
    ${[
      { label: 'CA ' + currentLabel,  val: fmtEur(caAll),  color: '#F73FA4' },
      { label: "CA Aujourd'hui",       val: fmtEur(caToday),color: '#29B5E8' },
      { label: 'Espèces',              val: fmtEur(especes),color: '#10b981' },
      { label: 'Carte',                val: fmtEur(carte),  color: '#3b82f6' },
      { label: 'TVA collectée',         val: fmtEur(tva),   color: '#f59e0b' },
      { label: 'Nb ventes',            val: allV.length,    color: '#1565C0' },
      { label: 'Factures',             val: allF.length,    color: '#8b5cf6' },
    ].map(c => `
      <div class="card" style="padding:12px 14px;border-left:4px solid ${c.color};">
        <div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:3px;">${c.label}</div>
        <div style="font-size:19px;font-weight:900;color:${c.color};">${c.val}</div>
      </div>`).join('')}
  </div>

  <!-- By center (only when "Tous") -->
  ${_ceCentre === 'Tous' && byCenter.length > 0 ? `
  <div class="card">
    <div class="card-t" style="color:#F73FA4;">📍 Par centre — ${currentLabel}</div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;">
      ${byCenter.map(c => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg);border-radius:8px;cursor:pointer;"
             onclick="window._ceCentre='${c.centre}';window._ceRender()">
          <div>
            <div style="font-weight:700;font-size:13px;">${c.centre}</div>
            <div style="font-size:11px;color:var(--muted);">${c.nb} vente(s)${_ceMonth?'':' · auj. '+fmtEur(c.today)}</div>
          </div>
          <div style="font-weight:900;color:#F73FA4;font-size:15px;">${fmtEur(c.ca)}</div>
        </div>`).join('')}
    </div>
  </div>` : ''}

  <!-- Recent sales -->
  <div class="card">
    <div class="card-t" style="color:#29B5E8;">
      🧾 Ventes — ${currentLabel}${_ceCentre!=='Tous'?' · '+_ceCentre:''}
      <span style="font-weight:400;font-size:12px;color:var(--muted);margin-left:6px;">${allV.length} vente(s)</span>
    </div>
    ${recentV.length === 0 ? `<div style="color:var(--muted);padding:20px;text-align:center;">Aucune vente</div>` : `
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;max-height:340px;overflow-y:auto;">
      ${recentV.map(v => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg);border-radius:8px;gap:8px;">
          <div style="flex:1;min-width:0;">
            <div style="font-weight:700;font-size:13px;">${v.tech?.nom||'—'} <span style="color:var(--muted);font-weight:400;">· ${v.centre||''}</span></div>
            <div style="font-size:11px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${(v.items||[]).map(i=>i.nom).join(', ')}</div>
            ${v.client ? `<div style="font-size:11px;color:var(--muted);">👤 ${v.client.nom}</div>` : ''}
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div style="font-weight:900;color:#F73FA4;">${fmtEur(v.totalTTC)}</div>
            <div style="font-size:11px;color:var(--muted);">${v.date||''} ${v.paiement==='carte'?'💳':'💵'}</div>
          </div>
        </div>`).join('')}
    </div>`}
  </div>

  <!-- Recent invoices -->
  <div class="card">
    <div class="card-t" style="color:#1565C0;">
      📄 Factures — ${currentLabel}${_ceCentre!=='Tous'?' · '+_ceCentre:''}
      <span style="font-weight:400;font-size:12px;color:var(--muted);margin-left:6px;">${allF.length} facture(s)</span>
    </div>
    ${recentF.length === 0 ? `<div style="color:var(--muted);padding:20px;text-align:center;">Aucune facture</div>` : `
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;">
      ${recentF.map(f => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg);border-radius:8px;gap:8px;">
          <div style="flex:1;min-width:0;">
            <div style="font-weight:700;font-size:13px;">${f.numero||'—'}</div>
            <div style="font-size:11px;color:var(--muted);">${f.date||''} · ${f.vente?.centre||''}</div>
            ${f.client ? `<div style="font-size:11px;color:var(--muted);">👤 ${f.client.nom}</div>` : ''}
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div style="font-weight:900;color:#1565C0;">${fmtEur(f.vente?.totalTTC)}</div>
            ${f.sent ? `<div style="font-size:10px;color:#10b981;">✉ Envoyé</div>` : ''}
          </div>
        </div>`).join('')}
    </div>`}
  </div>

  <!-- Link to app -->
  <div style="text-align:center;padding:4px 0 8px;">
    <a href="${CE_APP_URL}" target="_blank"
       style="display:inline-block;padding:10px 24px;background:linear-gradient(135deg,#F73FA4,#29B5E8);color:#fff;border-radius:10px;font-weight:700;text-decoration:none;font-size:14px;">
      Ouvrir la Caisse Enregistreuse ↗
    </a>
  </div>

</div>`;
}

window._ceRender = function() {
  _ceMonth  = (window._ceMonth  !== undefined) ? window._ceMonth  : _ceMonth;
  _ceCentre = (window._ceCentre !== undefined) ? window._ceCentre : _ceCentre;
  ceRender();
};

window.refreshCaisseEnregistreuse = async function() {
  _ceCentre = 'Tous';
  _ceMonth  = null;
  window._ceCentre = 'Tous';
  window._ceMonth  = null;

  const el = document.getElementById('caisse-enregistreuse-container');
  if (!el) return;
  el.innerHTML = `<div style="text-align:center;padding:60px;color:var(--muted);">⏳ Chargement…</div>`;

  const [ventes, factures, clients] = await Promise.all([
    window.loadVentes  ? window.loadVentes()  : [],
    window.loadFactures? window.loadFactures(): [],
    window.loadClients ? window.loadClients() : [],
  ]);

  _ceVentes   = ventes;
  _ceFactures = factures;
  _ceClients  = clients;
  ceRender();
};
