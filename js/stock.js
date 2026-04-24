// Dreamwash — Stock, Produits, Documents

function renderStock() {
  const tb = document.getElementById('stock-tbody');
  tb.innerHTML = '';
  const filtered = stockFilter === 'tous' ? STOCK : STOCK.filter(s => s.centre === stockFilter);
  let grandTotal = 0;
  let totalQte = 0;
  filtered.forEach((s,i) => {
    const idx = STOCK.indexOf(s);
    const total = s.qte * s.pu;
    grandTotal += total;
    totalQte += s.qte;
    tb.innerHTML += `<tr>
      <td><input id="sd-${idx}" value="${s.date}" style="font-size:12px;color:var(--muted);border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 6px;width:90px;font-family:inherit;"></td>
      <td><input id="sc-${idx}" value="${s.centre}" style="font-size:13px;font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 6px;width:120px;font-family:inherit;"></td>
      <td><input id="sp-${idx}" value="${s.produit}" style="font-size:13px;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 6px;width:150px;font-family:inherit;"></td>
      <td><input id="sq-${idx}" value="${s.qte}" type="number" style="font-size:13px;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 6px;width:60px;text-align:center;font-family:inherit;"></td>
      <td><input id="spu-${idx}" value="${s.pu}" type="number" style="font-size:13px;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 6px;width:70px;font-family:inherit;"> €</td>
      <td style="font-weight:700;color:var(--accent2);">${total.toFixed(2)} €</td>
      <td><div style="display:flex;gap:4px;">
        <button class="btn btn-sm btn-p" onclick="saveStockRow(${idx})">💾</button>
        <button class="btn btn-sm btn-r" onclick="STOCK.splice(${idx},1);renderStock();saveAll();">🗑️</button>
      </div></td>
    </tr>`;
  });
  const label = stockFilter === 'tous' ? 'TOTAL — Tous centres' : 'TOTAL — ' + stockFilter;
  tb.innerHTML += '<tr style="background:var(--bg3);border-top:2px solid var(--border);">'
    + '<td colspan="2" style="padding:12px 14px;font-weight:800;font-size:13px;">' + label + '</td>'
    + '<td style="padding:12px 14px;color:var(--muted);font-size:12px;">' + filtered.length + ' commande' + (filtered.length>1?'s':'') + '</td>'
    + '<td style="padding:12px 14px;text-align:center;font-weight:700;">' + totalQte + '</td>'
    + '<td style="padding:12px 14px;color:var(--muted);">—</td>'
    + '<td style="padding:12px 14px;font-weight:800;font-size:15px;color:var(--accent2);">' + grandTotal.toFixed(2) + ' €</td>'
    + '<td></td></tr>';
}

function saveStockRow(idx) {
  STOCK[idx].date = document.getElementById('sd-'+idx)?.value || STOCK[idx].date;
  STOCK[idx].centre = document.getElementById('sc-'+idx)?.value || STOCK[idx].centre;
  STOCK[idx].produit = document.getElementById('sp-'+idx)?.value || STOCK[idx].produit;
  STOCK[idx].qte = parseInt(document.getElementById('sq-'+idx)?.value)||0;
  STOCK[idx].pu = parseFloat(document.getElementById('spu-'+idx)?.value)||0;
  renderStock();
  saveAll();
}

function addStock() {
  const dateVal = document.getElementById('ns-date').value;
  const centre = document.getElementById('ns-centre').value;
  const produit = document.getElementById('ns-produit').value;
  const qte = parseInt(document.getElementById('ns-qte').value)||0;
  const pu = parseFloat(document.getElementById('ns-pu').value)||0;
  if (!produit) return;
  let date = '—';
  if (dateVal) {
    const d = new Date(dateVal);
    date = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  }
  STOCK.unshift({date,centre,produit,qte,pu,statut:'en cours'});
  renderStock();
  closeModal('m-stock');
  saveAll();
}

let stockFilter = 'tous';
function setStockFilter(btn, f) {
  document.querySelectorAll('#stock-fbar .fbtn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  stockFilter = f;
  renderStock();
}

function renderDocs() {
  const g = document.getElementById('docs-grid');
  g.innerHTML = '';

  // Docs fixes
  DOCS.forEach(d => {
    let onclick;
    if (d.carpolish) onclick = `openModal('m-carpolish')`;
    else if (d.carpolish_pdf) onclick = `openCarpolishPDF()`;
    else onclick = `openUrl('${d.url||'https://drive.google.com'}')`;
    g.innerHTML += `<div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;transition:all .2s;text-align:center;box-shadow:var(--shadow);" onclick="${onclick}" onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--border)'">
      <div style="font-size:26px;margin-bottom:8px;">${d.i}</div>
      <div style="font-size:12px;font-weight:700;">${d.n}</div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px;">${d.d}</div>
      <div style="margin-top:7px;"><span class="badge ${d.s}">${d.s==='gr'?'✓ À jour':'⚠️ À renouveler'}</span></div>
      ${d.carpolish ? '<div style="font-size:10px;color:var(--accent);margin-top:4px;font-weight:600;">🛒 Commander →</div>' : ''}
      ${d.carpolish_pdf ? '<div style="font-size:10px;color:#F59E0B;margin-top:4px;font-weight:600;">📄 Voir PDF →</div>' : ''}
    </div>`;
  });

  // Docs uploadés
  CUSTOM_DOCS.forEach((d, i) => {
    const icon = d.type?.includes('pdf') ? '📄' : d.type?.includes('image') ? '🖼️' : '📎';
    g.innerHTML += `<div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;transition:all .2s;text-align:center;box-shadow:var(--shadow);position:relative;" onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--border)'">
      <button onclick="event.stopPropagation();CUSTOM_DOCS.splice(${i},1);renderDocs();saveAll();" style="position:absolute;top:6px;right:6px;background:none;border:none;cursor:pointer;color:var(--muted);font-size:14px;">✕</button>
      <div style="font-size:26px;margin-bottom:8px;" onclick="openCustomDoc(${i})">${icon}</div>
      <div style="font-size:11px;font-weight:700;word-break:break-all;" onclick="openCustomDoc(${i})">${d.nom}</div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px;">${d.size} · ${d.date}</div>
      <div style="margin-top:7px;"><span class="badge gr">✓ Uploadé</span></div>
    </div>`;
  });
}

function handleDocUpload(input) {
  if (!input.files?.length) return;
  Array.from(input.files).forEach(f => {
    const reader = new FileReader();
    reader.onload = (e) => {
      CUSTOM_DOCS.push({
        nom: f.name,
        type: f.type,
        size: (f.size/1024).toFixed(0) + ' Ko',
        data: e.target.result,
        date: new Date().toLocaleDateString('fr-FR')
      });
      renderDocs();
      saveAll();
    };
    reader.readAsDataURL(f);
  });
  input.value = '';
}

function openCustomDoc(i) {
  const doc = CUSTOM_DOCS[i];
  if (!doc?.data) return;
  const win = window.open();
  win.document.write(`<iframe src="${doc.data}" style="width:100%;height:100vh;border:none;"></iframe>`);
}

function renderPresta() {
  const ps=document.getElementById('presta-stats');
  if(!ps) return;
  ps.innerHTML='';
  [{l:"Small Extérieur",p:22,c:"#2563EB"},{l:"Medium Complet",p:18,c:"#16A34A"},{l:"Medium Extérieur",p:16,c:"#2563EB"},{l:"Large Complet",p:14,c:"#D97706"},{l:"Small Complet",p:12,c:"#16A34A"},{l:"Extra Large Complet",p:10,c:"#DC2626"},{l:"Autres",p:8,c:"#7C3AED"}].forEach(d=>{
    ps.innerHTML+=`<div style="display:flex;align-items:center;gap:10px;">
      <span style="font-size:12px;color:var(--muted);min-width:160px;">${d.l}</span>
      <div style="flex:1;height:7px;background:var(--bg3);border-radius:4px;overflow:hidden;"><div style="width:${d.p}%;height:100%;background:${d.c};border-radius:4px;"></div></div>
      <span style="font-size:11px;font-weight:700;color:${d.c};min-width:32px;text-align:right;">${d.p}%</span>
    </div>`;
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAV & UTILS
// ═══════════════════════════════════════════════════════════════════════════════
const TITLES={dashboard:"Dashboard",centres:"Centres",fiche:"Fiche Centre",techniciens:"Gestion des techniciens","fiche-tech":"Fiche Technicien",planning:"Planning",cra:"CRA",rapport:"Rapport mensuel",stock:"Stock & Produits",comptabilite:"Comptabilité",charges:"Charges fixes",assurances:"Assurances",prestations:"Prestations",documents:"Documents",telephone:"📱 Téléphone & Box Internet","badgeuse-view":"Badgeuse — Temps réel",technovap:"♨️ Technovap — Machines à vapeur",westfield:"🏬 Westfield / Indigo"};

// ── TELEPHONE DATA ─────────────────────────────────────────────────────────
let BOX_DATA = [];

let TEL_DATA = [];

let EXTRA_ROWS = [];

// ═══ CATALOGUE CARPOLISH ═══════════════════════════════════════
const CARPOLISH_PRODUITS = [
  {code:"SPE25S", nom:"Speed Polish Evolution Nettoyant sans eau 25L", prix:96.75, cat:"Produit"},
  {code:"BLUE5", nom:"Blue Cleaner Dégraissant puissant 5L", prix:31.13, cat:"Produit"},
  {code:"NT25", nom:"Nettoyant Universel Parfumé 25L", prix:97.43, cat:"Produit"},
  {code:"NVD25", nom:"Nettoyant Vitre et Miroiterie 25L", prix:70.93, cat:"Produit"},
  {code:"JASA25", nom:"Nettoyant Jante Sans Acide 25L", prix:93.00, cat:"Produit"},
  {code:"IZR5", nom:"Décontaminant Ferreux 5L", prix:50.25, cat:"Produit"},
  {code:"BPM25", nom:"Brillant Pneu Base Aqueuse 25L", prix:108.95, cat:"Produit"},
  {code:"CF5", nom:"Cokpit Fresh Nettoyant Rénovateur Habitacle 5L", prix:54.68, cat:"Produit"},
  {code:"BPD5", nom:"Blue Polar Destructeur Odeur 5L", prix:59.18, cat:"Produit"},
  {code:"PARFUMAN5", nom:"Parfum de Luxe pour Habitacle 5L", prix:55.43, cat:"Produit"},
  {code:"DP5", nom:"Dégoudronnant Puissant 5L", prix:40.43, cat:"Produit"},
  {code:"CREM1", nom:"Crème Nettoyante Nourrissante Tous Coloris 1L", prix:19.52, cat:"Produit"},
  {code:"CUIRRECO-N-05", nom:"Crème Nettoyante Nourrissante Cuir Noir 500ml", prix:22.43, cat:"Produit"},
  {code:"RF901", nom:"Refinish 9000 Pâte One Step Abrasivité Moyenne 1L", prix:45.58, cat:"Produit"},
  {code:"CP025", nom:"Chrome Polish Pâte à Polir Chrome 250gr", prix:8.24, cat:"Produit"},
  {code:"NTS5", nom:"Nettoyant Spécial ACFPB Sous Air Comprimé 5L", prix:48.67, cat:"Produit"},
  {code:"TT1N", nom:"Top Tincture Régénérateur Plastique Extérieur 1L", prix:18.42, cat:"Produit"},
  {code:"ASPI2E", nom:"Aspirateur Eau et Poussière 2 Moteurs Flexible 4m", prix:374.93, cat:"Matériel"},
  {code:"ACFPB", nom:"Air Cleaning Foam Pistol Black", prix:96.75, cat:"Matériel"},
  {code:"SAGP", nom:"Soufflette Préparation Gros Débit", prix:36.76, cat:"Matériel"},
  {code:"MPA", nom:"Marche Pied Aluminium", prix:100.69, cat:"Matériel"},
  {code:"LBR1L", nom:"Rampe d'Éclairage", prix:152.84, cat:"Matériel"},
  {code:"LTL", nom:"Lampe de Travail à Main", prix:46.95, cat:"Matériel"},
  {code:"ABMSSC", nom:"Air Brush Brosseuse Mécanique", prix:225.00, cat:"Matériel"},
  {code:"COMPR", nom:"Compresseur Mono 90L Silencieux", prix:420.00, cat:"Matériel"},
  {code:"SCENROU0812IS", nom:"Enrouleur pour Air Comprimé", prix:225.62, cat:"Matériel"},
  {code:"SCMDPRACK25", nom:"Meuble Débiteur 25L", prix:325.00, cat:"Matériel"},
  {code:"SCMDRACK5", nom:"Meuble Débiteur 5L", prix:325.00, cat:"Matériel"},
  {code:"BRRS", nom:"Mobil Rack Seul", prix:434.80, cat:"Matériel"},
  {code:"MWFUSH-BLE/300", nom:"Tissus Microfibre Bleu Lot de 300", prix:299.25, cat:"Accessoire"},
  {code:"MWFUSH-JAU/300", nom:"Tissus Microfibre Jaune Lot de 300", prix:299.25, cat:"Accessoire"},
  {code:"MWTS/12", nom:"Tissus Microfibre Vitre et Laque Lot de 12", prix:39.12, cat:"Accessoire"},
  {code:"EPV10", nom:"Éponge Vinyl Lot de 10", prix:5.45, cat:"Accessoire"},
  {code:"MD", nom:"Mousse Décapante Lot de 12", prix:10.13, cat:"Accessoire"},
  {code:"PUBU/10", nom:"Pulvérisateur Burette 500ml Lot de 10", prix:23.13, cat:"Accessoire"},
  {code:"FLAC/10", nom:"Corps de Pulvérisateur 500ml", prix:13.60, cat:"Accessoire"},
  {code:"PU6", nom:"Pulvérisateur Pression pour Jante", prix:25.01, cat:"Accessoire"},
  {code:"BROSNYL", nom:"Brosse Nylon", prix:5.66, cat:"Accessoire"},
  {code:"EAPP/1", nom:"Éponge Application Brillant Pneu", prix:1.96, cat:"Accessoire"},
  {code:"GANY2", nom:"Gant Nitrile Boîte de 100", prix:8.92, cat:"Accessoire"},
  {code:"GANPRO", nom:"Gant de Protection Produit Agressif", prix:7.67, cat:"Accessoire"},
];

// ═══ FOURNISSEUR CARPOLISH ═════════════════════════════════════
let CARPOLISH_CONTACT = {nom:"",tel:"",email:"",whatsapp:"",commercial:"",site:""};

// ═══ TECHNOVAP DATA ════════════════════════════════════════════
let TECHNOVAP_MACHINES = [];

// ═══ WESTFIELD / INDIGO DATA ═══════════════════════════════════
let WESTFIELD_CONTACTS = [];

let WESTFIELD_CONTRATS = [];

let WESTFIELD_DOCS = [];

function renderTelephone() {
