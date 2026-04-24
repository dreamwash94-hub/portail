// Dreamwash — Caisse Enregistreuse

const CAISSE_TAILLES = [
  { k: 's',  label: 'Small',  icon: '🚗', defaults: [25, 30, 45] },
  { k: 'm',  label: 'Medium', icon: '🚙', defaults: [30, 35, 55] },
  { k: 'l',  label: 'Large',  icon: '🚐', defaults: [40, 45, 70] },
  { k: 'xl', label: 'XL',     icon: '🚌', defaults: [55, 60, 95] },
];
const CAISSE_TYPES = [
  { k: 'ext',  label: 'Extérieur', icon: '🚿' },
  { k: 'int',  label: 'Intérieur', icon: '🪑' },
  { k: 'comp', label: 'Complet',   icon: '✨' },
];

let caisseCart = [];
let caisseCentreSel = '';
let caissePaiement = 'cb';

function caisseGetPrix(tIdx, tpIdx) {
  const t  = CAISSE_TAILLES[tIdx];
  const tp = CAISSE_TYPES[tpIdx];
  const el = document.getElementById('p-' + t.k + '-' + tp.k);
  return el ? (parseFloat(el.value) || t.defaults[tpIdx]) : t.defaults[tpIdx];
}

function renderCaisse() {
  const page = document.getElementById('page-caisse');
  if (!page) return;

  if (!caisseCentreSel && typeof CENTRES !== 'undefined' && CENTRES.length > 0) {
    caisseCentreSel = CENTRES[0].nom;
  }

  const today   = new Date();
  const todayStr = String(today.getDate()).padStart(2,'0') + '/' +
                   String(today.getMonth()+1).padStart(2,'0') + '/' +
                   today.getFullYear();
  const ventesJour  = CAISSE_VENTES.filter(v => v.date === todayStr);
  const caJour      = ventesJour.reduce((s, v) => s + v.total, 0);
  const nbVentes    = ventesJour.length;
  const panierMoyen = nbVentes > 0 ? Math.round(caJour / nbVentes) : 0;
  const cartTotal   = caisseCart.reduce((s, i) => s + i.prix, 0);

  // ── Service grid ──────────────────────────────────────────────
  const serviceRows = CAISSE_TAILLES.map((t, tIdx) => {
    const btns = CAISSE_TYPES.map((tp, tpIdx) => {
      const prix = caisseGetPrix(tIdx, tpIdx);
      return `<button onclick="caisseAddItem(${tIdx},${tpIdx})"
        style="padding:10px 4px;border:1.5px solid var(--border);border-radius:8px;
               background:var(--bg3);cursor:pointer;font-family:inherit;text-align:center;transition:all .15s;"
        onmouseenter="this.style.background='#DBEAFE';this.style.borderColor='#2563EB'"
        onmouseleave="this.style.background='var(--bg3)';this.style.borderColor='var(--border)'">
        <div style="font-size:13px;">${tp.icon}</div>
        <div style="font-size:15px;font-weight:800;color:var(--accent2);margin-top:2px;">${prix}€</div>
      </button>`;
    }).join('');
    return `<div style="font-size:12px;font-weight:700;display:flex;align-items:center;gap:5px;padding:6px 8px;">${t.icon} ${t.label}</div>${btns}`;
  }).join('');

  // ── Cart ──────────────────────────────────────────────────────
  let cartItems = caisseCart.length === 0
    ? `<div style="text-align:center;padding:18px;color:var(--muted);font-size:13px;">Sélectionnez des prestations ↑</div>`
    : caisseCart.map((item, i) => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--bg3);border-radius:7px;margin-bottom:5px;">
          <span style="font-size:13px;font-weight:600;">${item.nom}</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:14px;font-weight:700;color:var(--accent2);">${item.prix}€</span>
            <button onclick="caisseRemoveItem(${i})" style="background:#FEE2E2;border:none;border-radius:5px;padding:2px 8px;cursor:pointer;color:#DC2626;font-weight:700;font-size:13px;line-height:1;">×</button>
          </div>
        </div>`).join('');

  // ── Payment buttons ───────────────────────────────────────────
  const payStyle = key => {
    const on = caissePaiement === key;
    return `padding:11px 6px;border:2px solid ${on?'#2563EB':'var(--border)'};border-radius:8px;
            background:${on?'#EFF6FF':'var(--bg3)'};cursor:pointer;font-family:inherit;font-weight:700;
            font-size:12px;width:100%;transition:all .15s;color:var(--text);`;
  };

  // ── History ───────────────────────────────────────────────────
  const sorted = [...CAISSE_VENTES].sort((a,b) => (b.timestamp||0)-(a.timestamp||0)).slice(0,100);
  let histRows = '';
  if (sorted.length === 0) {
    histRows = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--muted);font-size:13px;">Aucune vente enregistrée</td></tr>`;
  } else {
    sorted.forEach(v => {
      const payIcon  = {especes:'💵', cb:'💳', cheque:'📄'}[v.paiement] || '💳';
      const payBg    = {especes:'#DCFCE7', cb:'#DBEAFE', cheque:'#FEF3C7'}[v.paiement] || '#DBEAFE';
      const payColor = {especes:'#16A34A', cb:'#2563EB', cheque:'#D97706'}[v.paiement] || '#2563EB';
      const realIdx  = CAISSE_VENTES.findIndex(x => x.id === v.id);
      histRows += `<tr style="border-bottom:1px solid var(--border);">
        <td style="padding:8px;white-space:nowrap;">${v.date}</td>
        <td style="padding:8px;color:var(--muted);">${v.heure}</td>
        <td style="padding:8px;font-weight:600;">${v.centre}</td>
        <td style="padding:8px;color:var(--muted);font-size:12px;">${v.services.join(' + ')}</td>
        <td style="padding:8px;text-align:right;font-weight:700;color:var(--accent2);">${v.total}€</td>
        <td style="padding:8px;text-align:center;">
          <span style="padding:3px 8px;border-radius:20px;font-size:11px;font-weight:700;background:${payBg};color:${payColor};">${payIcon} ${v.paiement}</span>
        </td>
        <td style="padding:8px;text-align:center;">
          <button onclick="caisseDeleteVente(${realIdx})" style="background:#FEE2E2;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;color:#DC2626;font-size:11px;font-weight:700;">×</button>
        </td>
      </tr>`;
    });
  }

  // ── CA par centre aujourd'hui ─────────────────────────────────
  const centres = typeof CENTRES !== 'undefined' ? CENTRES : [];
  const centreOpts = centres.map(c =>
    `<option value="${c.nom}" ${c.nom === caisseCentreSel ? 'selected':''}>${c.nom}</option>`
  ).join('');

  const caParCentre = centres.map(c => ({
    nom: c.nom,
    color: c.color,
    total: ventesJour.filter(v => v.centre === c.nom).reduce((s,v) => s + v.total, 0)
  })).filter(c => c.total > 0);
  const maxCA = caParCentre.length > 0 ? Math.max(...caParCentre.map(c => c.total)) : 1;
  const caBars = caParCentre.length === 0
    ? `<div style="color:var(--muted);font-size:12px;padding:6px 0;">Aucune vente aujourd'hui</div>`
    : caParCentre.map(c => `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="font-size:11px;color:var(--muted);min-width:120px;">${c.nom}</span>
          <div style="flex:1;height:6px;background:var(--bg3);border-radius:4px;overflow:hidden;">
            <div style="width:${Math.round(c.total/maxCA*100)}%;height:100%;background:${c.color};border-radius:4px;"></div>
          </div>
          <span style="font-size:11px;font-weight:700;color:var(--accent2);min-width:45px;text-align:right;">${c.total}€</span>
        </div>`).join('');

  // ── Render ────────────────────────────────────────────────────
  page.innerHTML = `
    <div class="rh">
      <div><div class="sec-title">🏧 Caisse Enregistreuse</div><div class="sec-sub">Enregistrez les ventes de vos centres</div></div>
      <button onclick="caisseExport()" class="btn btn-sm" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);">📥 Export CSV</button>
    </div>

    <div class="kpi-g" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px;">
      <div class="kpi"><div class="kpi-i">💰</div><div class="kpi-v" style="color:var(--accent2);">${caJour}€</div><div class="kpi-l">CA aujourd'hui</div><div class="kpi-t up">${nbVentes} vente${nbVentes>1?'s':''}</div></div>
      <div class="kpi"><div class="kpi-i">🛒</div><div class="kpi-v" style="color:var(--accent);">${nbVentes}</div><div class="kpi-l">Ventes du jour</div><div class="kpi-t neu">Toutes prestations</div></div>
      <div class="kpi"><div class="kpi-i">📊</div><div class="kpi-v" style="color:var(--accent5);">${panierMoyen}€</div><div class="kpi-l">Panier moyen</div><div class="kpi-t neu">Par vente</div></div>
    </div>

    <div style="display:grid;grid-template-columns:390px 1fr;gap:16px;align-items:start;">

      <!-- ══ POS Terminal ══════════════════════════════════════════ -->
      <div>

        <!-- Centre -->
        <div class="card" style="margin-bottom:12px;">
          <div class="card-t">🏪 Centre</div>
          <select onchange="caisseCentreSel=this.value"
            style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;
                   font-size:13px;font-weight:700;background:var(--bg3);font-family:inherit;cursor:pointer;color:var(--text);">
            ${centreOpts}
          </select>
        </div>

        <!-- Catalogue -->
        <div class="card" style="margin-bottom:12px;">
          <div class="card-t">🧾 Prestations</div>
          <div style="display:grid;grid-template-columns:88px 1fr 1fr 1fr;gap:5px;align-items:center;">
            <div></div>
            <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;text-align:center;padding:4px 0;">🚿 Ext.</div>
            <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;text-align:center;padding:4px 0;">🪑 Int.</div>
            <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;text-align:center;padding:4px 0;">✨ Comp.</div>
            ${serviceRows}
          </div>
        </div>

        <!-- Cart -->
        <div class="card" style="margin-bottom:12px;">
          <div class="card-t" style="display:flex;justify-content:space-between;align-items:center;">
            🛒 Panier
            ${caisseCart.length > 0 ? `<button onclick="caisseCart=[];renderCaisse()" style="background:#FEE2E2;border:none;border-radius:5px;padding:2px 9px;cursor:pointer;color:#DC2626;font-size:11px;font-weight:700;">Vider</button>` : ''}
          </div>
          ${cartItems}
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:2px solid var(--border);padding-top:10px;margin-top:8px;">
            <span style="font-size:13px;font-weight:700;color:var(--muted);">TOTAL</span>
            <span style="font-size:26px;font-weight:800;color:var(--accent2);">${cartTotal}€</span>
          </div>
        </div>

        <!-- Payment & Validate -->
        <div class="card">
          <div class="card-t">💳 Paiement</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px;">
            <button onclick="caissePaiement='cb';renderCaisse()"      style="${payStyle('cb')}">💳<br><span style="font-size:11px;">Carte</span></button>
            <button onclick="caissePaiement='especes';renderCaisse()" style="${payStyle('especes')}">💵<br><span style="font-size:11px;">Espèces</span></button>
            <button onclick="caissePaiement='cheque';renderCaisse()"  style="${payStyle('cheque')}">📄<br><span style="font-size:11px;">Chèque</span></button>
          </div>
          <button onclick="caisseValider()"
            style="width:100%;padding:15px;background:linear-gradient(135deg,#16A34A,#15803D);border:none;
                   border-radius:10px;color:#fff;font-size:15px;font-weight:800;cursor:pointer;
                   font-family:inherit;box-shadow:0 2px 10px rgba(22,163,74,0.3);letter-spacing:.3px;">
            ✅ Valider la vente — ${cartTotal}€
          </button>
        </div>
      </div>

      <!-- ══ Panneau droit ═════════════════════════════════════════ -->
      <div style="display:flex;flex-direction:column;gap:14px;">

        <!-- CA par centre -->
        <div class="card">
          <div class="card-t">📈 CA par centre — Aujourd'hui</div>
          ${caBars}
        </div>

        <!-- Historique -->
        <div class="card">
          <div class="card-t">📋 Historique des ventes</div>
          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:12px;">
              <thead><tr style="border-bottom:2px solid var(--border);">
                <th style="padding:7px 8px;text-align:left;color:var(--muted);font-weight:600;">Date</th>
                <th style="padding:7px 8px;text-align:left;color:var(--muted);font-weight:600;">Heure</th>
                <th style="padding:7px 8px;text-align:left;color:var(--muted);font-weight:600;">Centre</th>
                <th style="padding:7px 8px;text-align:left;color:var(--muted);font-weight:600;">Prestations</th>
                <th style="padding:7px 8px;text-align:right;color:var(--muted);font-weight:600;">Total</th>
                <th style="padding:7px 8px;text-align:center;color:var(--muted);font-weight:600;">Paiement</th>
                <th style="padding:7px 8px;"></th>
              </tr></thead>
              <tbody>${histRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;
}

function caisseAddItem(tIdx, tpIdx) {
  const t   = CAISSE_TAILLES[tIdx];
  const tp  = CAISSE_TYPES[tpIdx];
  const prix = caisseGetPrix(tIdx, tpIdx);
  caisseCart.push({ nom: t.label + ' ' + tp.label, taille: t.k, type: tp.k, prix });
  renderCaisse();
}

function caisseRemoveItem(idx) {
  caisseCart.splice(idx, 1);
  renderCaisse();
}

function caisseValider() {
  if (caisseCart.length === 0) {
    if (typeof showNotif === 'function') showNotif('⚠️ Ajoutez au moins une prestation', '#D97706');
    return;
  }
  const now   = new Date();
  const date  = String(now.getDate()).padStart(2,'0') + '/' + String(now.getMonth()+1).padStart(2,'0') + '/' + now.getFullYear();
  const heure = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  const total = caisseCart.reduce((s, i) => s + i.prix, 0);

  CAISSE_VENTES.push({
    id:        Date.now(),
    date,
    heure,
    centre:    caisseCentreSel || (typeof CENTRES !== 'undefined' ? CENTRES[0]?.nom : '') || '',
    services:  caisseCart.map(i => i.nom),
    total,
    paiement:  caissePaiement,
    timestamp: Date.now(),
  });

  caisseCart = [];
  if (typeof showNotif === 'function') showNotif('✅ Vente enregistrée — ' + total + '€', '#16A34A');
  if (typeof saveAll === 'function') saveAll();
  renderCaisse();
}

function caisseDeleteVente(idx) {
  if (idx < 0 || idx >= CAISSE_VENTES.length) return;
  CAISSE_VENTES.splice(idx, 1);
  if (typeof saveAll === 'function') saveAll();
  renderCaisse();
}

function caisseExport() {
  let csv = 'Date,Heure,Centre,Prestations,Total,Paiement\n';
  [...CAISSE_VENTES]
    .sort((a,b) => (b.timestamp||0)-(a.timestamp||0))
    .forEach(v => {
      csv += `"${v.date}","${v.heure}","${v.centre}","${v.services.join(' + ')}","${v.total}","${v.paiement}"\n`;
    });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'dreamwash-caisse.csv';
  a.click();
}
