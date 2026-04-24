// Dreamwash — Modals et fonctions diverses

function openBdcModal() {
  openModal('m-carpolish');
  document.getElementById('bdc-date').value = new Date().toISOString().split('T')[0];
  BDC_LINES = [{code:'', nom:'', qte:1, pu:0}];
  renderBdcLines();
}

function addBdcLine() {
  BDC_LINES.push({code:'', nom:'', qte:1, pu:0});
  renderBdcLines();
}

function renderBdcLines() {
  const el = document.getElementById('bdc-lines');
  if (!el) return;
  el.innerHTML = BDC_LINES.map((l, i) => `
    <div style="display:grid;grid-template-columns:1fr 2fr 60px 80px 80px 32px;gap:6px;align-items:center;margin-bottom:6px;">
      <select onchange="selectBdcProd(${i},this.value)" style="border:1px solid var(--border);border-radius:6px;padding:5px 6px;font-size:11px;background:var(--bg3);font-family:inherit;">
        <option value="">— Code —</option>
        ${CARPOLISH_PRODUITS.map(p=>`<option value="${p.code}" ${p.code===l.code?'selected':''}>${p.code}</option>`).join('')}
      </select>
      <input value="${l.nom}" placeholder="Désignation" style="border:1px solid var(--border);border-radius:6px;padding:5px 8px;font-size:11px;background:var(--bg3);font-family:inherit;" onchange="BDC_LINES[${i}].nom=this.value;updateBdcTotal();">
      <input type="number" value="${l.qte}" min="1" style="border:1px solid var(--border);border-radius:6px;padding:5px 6px;font-size:12px;font-weight:700;background:var(--bg3);font-family:inherit;text-align:center;" onchange="BDC_LINES[${i}].qte=parseInt(this.value)||1;updateBdcTotal();">
      <input type="number" value="${l.pu}" step="0.01" style="border:1px solid var(--border);border-radius:6px;padding:5px 6px;font-size:11px;background:var(--bg3);font-family:inherit;" onchange="BDC_LINES[${i}].pu=parseFloat(this.value)||0;updateBdcTotal();">
      <span style="font-size:12px;font-weight:700;color:var(--accent2);text-align:right;">${(l.qte*l.pu).toFixed(2)} €</span>
      <button onclick="BDC_LINES.splice(${i},1);renderBdcLines();" style="background:#FEE2E2;border:1px solid #FECACA;border-radius:6px;padding:4px 6px;cursor:pointer;font-size:13px;color:#DC2626;">✕</button>
    </div>`).join('');
  updateBdcTotal();
}

function selectBdcProd(i, code) {
  const prod = CARPOLISH_PRODUITS.find(p => p.code === code);
  if (prod) {
    BDC_LINES[i].code = prod.code;
    BDC_LINES[i].nom = prod.nom;
    BDC_LINES[i].pu = prod.prix;
  }
  renderBdcLines();
}

function updateBdcTotal() {
  const total = BDC_LINES.reduce((s, l) => s + (l.qte * l.pu), 0);
  const el = document.getElementById('bdc-total');
  if (el) el.textContent = total.toFixed(2).replace('.', ',') + ' €';
}

function buildBdcText() {
  const centre = document.getElementById('bdc-centre')?.value || '';
  const date = document.getElementById('bdc-date')?.value || '';
  const adresse = document.getElementById('bdc-adresse')?.value || '';
  const total = BDC_LINES.reduce((s, l) => s + (l.qte * l.pu), 0);
  let txt = `BON DE COMMANDE DREAMWASH\nDate : ${date}\nCentre : ${centre}\n`;
  if (adresse) txt += `Livraison : ${adresse}\n`;
  txt += `\n${'─'.repeat(40)}\n`;
  BDC_LINES.forEach(l => {
    if (l.nom) txt += `[${l.code||'—'}] ${l.nom}\n   Qté: ${l.qte} × ${l.pu.toFixed(2)}€ = ${(l.qte*l.pu).toFixed(2)}€\n`;
  });
  txt += `${'─'.repeat(40)}\nTOTAL HT : ${total.toFixed(2).replace('.',',')} €\n(Remise partenariat 25% applicable)`;
  return txt;
}

function sendBdcWhatsApp() {
  const txt = buildBdcText();
  const num = CARPOLISH_CONTACT.whatsapp.replace(/\D/g,'');
  openUrl(`https://wa.me/33${num.substring(1)}?text=${encodeURIComponent(txt)}`);
}

function sendBdcEmail() {
  const txt = buildBdcText();
  const centre = document.getElementById('bdc-centre')?.value || '';
  const date = document.getElementById('bdc-date')?.value || '';
  openUrl(`mailto:${CARPOLISH_CONTACT.email}?subject=Bon de commande Dreamwash - ${centre} - ${date}&body=${encodeURIComponent(txt)}`);
}

function printBdc() {
  const centre = document.getElementById('bdc-centre')?.value || '';
  const date = document.getElementById('bdc-date')?.value || '';
  const total = BDC_LINES.reduce((s, l) => s + (l.qte * l.pu), 0);
  const rows = BDC_LINES.filter(l=>l.nom).map(l =>
    `<tr><td>${l.code||'—'}</td><td>${l.nom}</td><td style="text-align:center;">${l.qte}</td><td style="text-align:right;">${l.pu.toFixed(2)} €</td><td style="text-align:right;font-weight:700;">${(l.qte*l.pu).toFixed(2)} €</td></tr>`
  ).join('');
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Bon de commande Carpolish</title>
  <style>body{font-family:Arial,sans-serif;padding:30px;max-width:700px;margin:0 auto;}
  h1{color:#F59E0B;}table{width:100%;border-collapse:collapse;margin:20px 0;}
  th{background:#F59E0B;color:#fff;padding:8px 10px;text-align:left;}
  td{padding:7px 10px;border-bottom:1px solid #eee;}
  .total{font-size:20px;font-weight:800;color:#D97706;text-align:right;margin-top:14px;}
  .footer{margin-top:30px;font-size:12px;color:#888;}
  @media print{button{display:none;}}</style></head><body>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <div><h1>🛒 Bon de Commande</h1><div style="font-size:13px;color:#888;">Dreamwash → Carpolish</div></div>
    <div style="text-align:right;font-size:13px;"><strong>Date :</strong> ${date}<br><strong>Centre :</strong> ${centre}</div>
  </div>
  <table><thead><tr><th>Code</th><th>Désignation</th><th>Qté</th><th>Prix HT</th><th>Total HT</th></tr></thead><tbody>${rows}</tbody></table>
  <div class="total">Total HT : ${total.toFixed(2).replace('.',',')} €</div>
  <div style="font-size:12px;color:#888;margin-top:6px;">Remise partenariat 25% applicable (hors articles RF, SC, Mi)</div>
  <div class="footer">
    <strong>Carpolish</strong> · ${CARPOLISH_CONTACT.email} · ${CARPOLISH_CONTACT.tel}<br>
    <strong>Dreamwash</strong> · Dossier : wash
  </div>
  <button onclick="window.print()" style="margin-top:20px;background:#F59E0B;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:14px;">🖨️ Imprimer</button>
  </body></html>`);
  win.document.close();
}

function openCarpolishPDF() {
  const win = window.open('', '_blank');
  const prodRows = CARPOLISH_PRODUITS.filter(p=>p.cat==='Produit').map(p=>
    `<tr><td style="font-weight:700;color:#666;">${p.code}</td><td>${p.nom}</td><td style="text-align:right;font-weight:700;color:#D97706;">${p.prix.toFixed(2)} €</td></tr>`
  ).join('');
  const matRows = CARPOLISH_PRODUITS.filter(p=>p.cat==='Matériel').map(p=>
    `<tr><td style="font-weight:700;color:#666;">${p.code}</td><td>${p.nom}</td><td style="text-align:right;font-weight:700;color:#D97706;">${p.prix.toFixed(2)} €</td></tr>`
  ).join('');
  const accRows = CARPOLISH_PRODUITS.filter(p=>p.cat==='Accessoire').map(p=>
    `<tr><td style="font-weight:700;color:#666;">${p.code}</td><td>${p.nom}</td><td style="text-align:right;font-weight:700;color:#D97706;">${p.prix.toFixed(2)} €</td></tr>`
  ).join('');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Catalogue Carpolish - Dreamwash</title>
  <style>
    body{font-family:Arial,sans-serif;padding:30px;max-width:800px;margin:0 auto;color:#1e293b;}
    h1{color:#F59E0B;margin-bottom:4px;}
    h2{color:#F59E0B;font-size:14px;margin:20px 0 8px;padding:6px 12px;background:#FEF3C7;border-radius:6px;}
    table{width:100%;border-collapse:collapse;margin-bottom:14px;}
    th{background:#F59E0B;color:#fff;padding:8px 10px;text-align:left;font-size:12px;}
    td{padding:7px 10px;border-bottom:1px solid #f1f5f9;font-size:12px;}
    tr:hover td{background:#FFFBEB;}
    .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;border-bottom:2px solid #F59E0B;padding-bottom:14px;}
    .contact{font-size:12px;color:#64748B;text-align:right;}
    .note{background:#FEF3C7;border:1px solid #FDE68A;border-radius:8px;padding:10px 14px;font-size:12px;margin-bottom:20px;}
    @media print{button{display:none;}}
  </style></head><body>
  <div class="header">
    <div>
      <h1>🧴 Catalogue Carpolish</h1>
      <div style="font-size:13px;color:#64748B;">Tarifs partenariat Dreamwash · ${new Date().toLocaleDateString('fr-FR')}</div>
    </div>
    <div class="contact">
      <strong>Carpolish</strong><br>
      📧 ${CARPOLISH_CONTACT.email}<br>
      📞 ${CARPOLISH_CONTACT.tel}<br>
      💬 WhatsApp : ${CARPOLISH_CONTACT.whatsapp}
    </div>
  </div>
  <div class="note">⭐ <strong>Remise partenariat 25%</strong> appliquée sur tous les produits (sauf codes RF, SC, Mi)</div>
  <h2>🧴 PRODUITS</h2>
  <table><thead><tr><th>Code</th><th>Désignation</th><th>Prix HT</th></tr></thead><tbody>${prodRows}</tbody></table>
  <h2>🔧 MATÉRIEL</h2>
  <table><thead><tr><th>Code</th><th>Désignation</th><th>Prix HT</th></tr></thead><tbody>${matRows}</tbody></table>
  <h2>🧹 ACCESSOIRES</h2>
  <table><thead><tr><th>Code</th><th>Désignation</th><th>Prix HT</th></tr></thead><tbody>${accRows}</tbody></table>
  <div style="margin-top:20px;display:flex;gap:10px;">
    <button onclick="window.print()" style="background:#F59E0B;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:700;">🖨️ Imprimer / Télécharger PDF</button>
    <button onclick="window.close()" style="background:#e2e8f0;color:#1e293b;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:14px;">✕ Fermer</button>
  </div>
  </body></html>`);
  win.document.close();
}

// ═══ DATE EN TEMPS RÉEL ═══════════════════════════════════════
function updateDate() {
  const now = new Date();
  const jours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  const mois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const dateStr = `${jours[now.getDay()]} ${now.getDate()} ${mois[now.getMonth()]} ${now.getFullYear()}`;
  const el1 = document.getElementById('topbar-date');
  const el2 = document.getElementById('dash-date');
  if (el1) el1.textContent = dateStr;
  if (el2) el2.textContent = dateStr;
}
updateDate();
setInterval(updateDate, 60000); // Mise à jour toutes les minutes

// ═══ CRA MANUEL ═══════════════════════════════════════════════
let pendingCRADates = [];

function openModal(id) {
  document.getElementById(id).style.display='flex';
  if (id==='m-slot') { updateSlotTechs(); }
  if (id==='m-carpolish') {
    document.getElementById('bdc-date').value = new Date().toISOString().split('T')[0];
    BDC_LINES = [{code:'', nom:'', qte:1, pu:0}];
    renderBdcLines();
  }
  if (id==='m-stock') { populateCatalogue(); }
  if (id==='m-badge-add') {
    const sel = document.getElementById('ba-nom');
    if (sel) sel.innerHTML = TECHS.map(t=>`<option value="${t.nom}">${t.nom} — ${t.centre}</option>`).join('');
    const timeEl = document.getElementById('ba-time');
    if (timeEl) timeEl.value = new Date().toTimeString().slice(0,5);
    const dateEl = document.getElementById('ba-date');
    const now = new Date();
    if (dateEl) dateEl.value = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
  }
  if (id==='m-cra-manuel') {
    pendingCRADates = [];
    renderPendingDates();
    const sel = document.getElementById('cra-m-tech');
    if (sel) {
      sel.innerHTML = TECHS.map(t=>`<option value="${t.nom}">${t.nom} — ${t.centre}</option>`).join('');
      sel.onchange = function() {
        const tech = TECHS.find(t => t.nom === this.value);
        if (tech) { const c = document.getElementById('cra-m-centre'); if(c) c.value = tech.centre; }
      };
    }
    const tech0 = TECHS[0];
    if (tech0) { const c = document.getElementById('cra-m-centre'); if(c) c.value = tech0.centre; }
    const dateEl = document.getElementById('cra-m-date');
    if (dateEl) dateEl.valueAsDate = new Date();
  }
}

function addCRADate() {
  const dateEl = document.getElementById('cra-m-date');
  if (!dateEl?.value) return;
  const d = new Date(dateEl.value);
  const dateStr = String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0') + '/' + d.getFullYear();
  if (!pendingCRADates.includes(dateStr)) {
    pendingCRADates.push(dateStr);
    pendingCRADates.sort();
    renderPendingDates();
  }
}

function removeCRADate(dateStr) {
  pendingCRADates = pendingCRADates.filter(d => d !== dateStr);
  renderPendingDates();
}

function renderPendingDates() {
  const el = document.getElementById('cra-m-dates-list');
  const countEl = document.getElementById('cra-m-count');
  if (!el) return;
  el.innerHTML = pendingCRADates.map(d => `
    <span style="background:#DCFCE7;color:#15803D;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:6px;">
      📅 ${d}
      <span onclick="removeCRADate('${d}')" style="cursor:pointer;color:#DC2626;font-size:14px;line-height:1;">×</span>
    </span>`).join('');
  if (countEl) countEl.textContent = pendingCRADates.length;
}

async function saveCRAManuel() {
  const tech = document.getElementById('cra-m-tech')?.value;
  const centre = document.getElementById('cra-m-centre')?.value;
  if (!tech || pendingCRADates.length === 0) {
    showNotif('⚠️ Sélectionnez un technicien et au moins une date', '#D97706');
    return;
  }

  // Ajouter dans CRA_DATA
  if (!CRA_DATA[tech]) CRA_DATA[tech] = {};
  pendingCRADates.forEach(d => { CRA_DATA[tech][d] = centre; });

  // Mettre à jour jours technicien
  const now = new Date();
  const moisCourant = String(now.getMonth()+1).padStart(2,'0') + '/' + now.getFullYear();
  const techIdx = TECHS.findIndex(t => t.nom === tech);
  if (techIdx >= 0) {
    TECHS[techIdx].jours = Object.keys(CRA_DATA[tech]).filter(d => d.endsWith(moisCourant)).length;
  }

  // Sauvegarder
  if (window._markCRASave) window._markCRASave(); if (window.saveToFirebase) await window.saveToFirebase('cra_data', CRA_DATA);
  saveLocal();

  // Mettre à jour l'affichage
  renderCRA();
  renderRapport();
  renderTechs();
  renderDashboard();

  closeModal('m-cra-manuel');
  pendingCRADates = [];
  showNotif(`✅ ${tech} — ${Object.keys(CRA_DATA[tech]).length} jours enregistrés`, '#16A34A');
}

// ═══ BADGE MANUEL ════════════════════════════════════════════════
async function saveBadgeManuel() {
  const nom = document.getElementById('ba-nom').value;
  const centre = document.getElementById('ba-centre').value;
  const time = document.getElementById('ba-time').value || new Date().toTimeString().slice(0,5);
  const dateRaw = document.getElementById('ba-date').value;
  const now = new Date();
  const dateStr = dateRaw || String(now.getDate()).padStart(2,'0') + '/' + String(now.getMonth()+1).padStart(2,'0') + '/' + now.getFullYear();
  const tech = TECHS.find(t => t.nom === nom);
  const entry = {
    nom, centreBadge: centre,
    centreHabituel: tech?.centre || centre,
    color: tech?.color || '#2563EB',
    time, date: dateStr, timestamp: Date.now()
  };

  // 1. Sauver dans Firebase badgeages
  if (window.addBadgeToFirebase) await window.addBadgeToFirebase(entry);

  // 2. Mettre à jour CRA_DATA
  if (!CRA_DATA[nom]) CRA_DATA[nom] = {};
  CRA_DATA[nom][dateStr] = centre;

  // 3. Sauver CRA dans Firebase
  if (window._markCRASave) window._markCRASave(); if (window.saveToFirebase) await window.saveToFirebase('cra_data', CRA_DATA);
  saveLocal();

  closeModal('m-badge-add');

  // 4. Tout re-rendre
  await refreshBadgeuse();
  renderCRA();
  renderRapport();
  renderDashboard();

  showNotif(`✅ Badge ajouté pour ${nom} — CRA et Rapport mis à jour`, '#16A34A');
}

// ═══ DÉCONNEXION ═════════════════════════════════════════════════
function logout() {
  localStorage.removeItem('dw_auth');
  location.reload();
}

// FIN
</script>
