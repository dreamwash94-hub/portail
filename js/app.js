
// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════
const CENTRES = [
  {id:0,nom:"Aeroville A",tel:"01 23 45 67 89",wifi:"AeroA_DW",wifiPwd:"DreamA2024!",boites:["A1-4521","A1-7832","A1-3341","A1-9912"],loyer:1400,techs:["Sadoul","Khyal","Siraj"],ca:1100,lavages:18,color:"#2563EB"},
  {id:1,nom:"Aeroville B",tel:"01 23 45 67 90",wifi:"AeroB_DW",wifiPwd:"DreamB2024!",boites:["A2-1234","A2-5678","A2-9012","A2-3456"],loyer:1400,techs:["Saiful Islam","Siraj"],ca:980,lavages:15,color:"#7C3AED"},
  {id:2,nom:"Lafayette Rouge",tel:"01 34 56 78 90",wifi:"LafRouge_DW",wifiPwd:"Rouge2024#",boites:["LR-7832","LR-3341","LR-9912","LR-1234"],loyer:1600,techs:["Khalid","Mourad","Abdeldjalil"],ca:1250,lavages:21,color:"#DC2626"},
  {id:3,nom:"Lafayette Vert",tel:"01 34 56 78 91",wifi:"LafVert_DW",wifiPwd:"Vert2024#",boites:["LV-5678","LV-9012","LV-3456","LV-7890"],loyer:1600,techs:["Ayoub J.","Ali"],ca:980,lavages:16,color:"#16A34A"},
  {id:4,nom:"Cité des Sciences",tel:"01 45 67 89 01",wifi:"CDS_DW",wifiPwd:"CDS2024$",boites:["CS-1234","CS-5678","CS-9012","CS-3456"],loyer:1050,techs:["Ahmed","Abdesamad"],ca:750,lavages:12,color:"#0891B2"},
  {id:5,nom:"Le Parks",tel:"01 56 78 90 12",wifi:"Parks_DW",wifiPwd:"Parks2024@",boites:["LP-7890","LP-1234","LP-5678","LP-9012"],loyer:700,techs:["Adrien"],ca:420,lavages:7,color:"#D97706"},
  {id:6,nom:"Parly2",tel:"01 56 78 90 13",wifi:"Parly2_DW",wifiPwd:"Parly2024@",boites:["P2-3456","P2-7890","P2-1234","P2-5678"],loyer:1200,techs:["Amine_parly2","Abdesamad"],ca:820,lavages:14,color:"#9333EA"},
  {id:7,nom:"Belleville",tel:"01 67 89 01 23",wifi:"Bell_DW",wifiPwd:"Bell2024!",boites:["BV-9012","BV-3456","BV-7890","BV-1234"],loyer:900,techs:["Nabil","Amine"],ca:680,lavages:11,color:"#EA580C"},
  {id:8,nom:"Suresnes",tel:"01 78 90 12 34",wifi:"Sures_DW",wifiPwd:"SRS2024#",boites:["SR-5678","SR-9012","SR-3456","SR-7890"],loyer:800,techs:["Rachid"],ca:350,lavages:6,color:"#BE185D"},
];

let TECHS = [];

let PLANNING = {"Aeroville A":[[],[],[],[],[],[],[]],"Aeroville B":[[],[],[],[],[],[],[]],"Lafayette Rouge":[[],[],[],[],[],[],[]],"Lafayette Vert":[[],[],[],[],[],[],[]],"Cité des Sciences":[[],[],[],[],[],[],[]],"Le Parks":[[],[],[],[],[],[],[]],"Parly2":[[],[],[],[],[],[],[]],"Belleville":[[],[],[],[],[],[],[]],"Suresnes":[[],[],[],[],[],[],[]]};

// CRA_DATA : { "NomTech": { "JJ/MM/AAAA": "Centre" }, ... }
let CRA_DATA = {};

let CHARGES = [];
let ASSURANCES = [];
let STOCK = [];

const COMPTA = [
  {centre:"Aeroville A",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Aeroville B",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Lafayette Rouge",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Lafayette Vert",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Cité des Sciences",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Parly2",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Belleville",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Le Parks",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Suresnes",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
];

const DOCS = [
  {n:"KBIS Dreamwash",i:"📋",d:"Mars 2026",s:"gr",url:"https://drive.google.com"},
  {n:"Contrats de bail",i:"🏠",d:"9 actifs",s:"gr",url:"https://drive.google.com"},
  {n:"Assurance multirisque",i:"🛡️",d:"Expire 01/06/2026",s:"gr",url:"https://drive.google.com"},
  {n:"Statuts société",i:"⚖️",d:"Version 2024",s:"gr",url:"https://drive.google.com"},
  {n:"Contrats Technovap",i:"🔧",d:"9 machines",s:"gr",url:"https://drive.google.com"},
  {n:"Convention collective",i:"📄",d:"En vigueur",s:"gr",url:"https://drive.google.com"},
  {n:"Registre du personnel",i:"👥",d:"22 salariés",s:"gr",url:"https://drive.google.com"},
  {n:"Déclarations URSSAF",i:"🏛️",d:"T1 2026",s:"yl",url:"https://drive.google.com"},
  {n:"Contrats téléphonie",i:"📱",d:"Expire 06/2026",s:"yl",url:"https://drive.google.com"},
  {n:"Relevés Bankin",i:"🏦",d:"Mars 2026",s:"gr",url:"https://app.bankin.com"},
  {n:"Déclarations TVA",i:"💰",d:"T1 2026",s:"gr",url:"https://drive.google.com"},
  {n:"Plan de formation",i:"📚",d:"2026",s:"gr",url:"https://drive.google.com"},
  {n:"Catalogue Carpolish",i:"🧴",d:"Bon de commande",s:"gr",url:"carpolish",carpolish:true},
  {n:"BON DE COMMANDE Carpolish",i:"📄",d:"PDF officiel",s:"gr",url:"carpolish_pdf",carpolish_pdf:true},
];

// Documents uploadés manuellement
let CUSTOM_DOCS = [];

let techFilter = 'tous';
let planFilter = 'tous';
const CRA_DATES = ['Lun 13 Avr.','Mar 14 Avr.','Mer 15 Avr.','Jeu 16 Avr.','Ven 17 Avr.'];
const MOIS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
let craDay = 2;
let rapportMois = 3; // index avril

// ═══════════════════════════════════════════════════════════════════════════════
// RENDER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function renderDashboard() {
  const cb = document.getElementById('ca-bars');
  cb.innerHTML = '';
  const maxCA = Math.max(...CENTRES.map(c=>c.ca));
  CENTRES.forEach(c => {
    const pct = Math.round(c.ca/maxCA*100);
    cb.innerHTML += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
      <span style="font-size:11px;color:var(--muted);min-width:120px;font-weight:500;">${c.nom}</span>
      <div style="flex:1;height:7px;background:var(--bg3);border-radius:4px;overflow:hidden;"><div style="width:${pct}%;height:100%;background:${c.color};border-radius:4px;"></div></div>
      <span style="font-size:11px;font-weight:700;min-width:50px;text-align:right;color:var(--accent2);">${c.ca} €</span>
    </div>`;
  });
  const today = new Date();
  const todayStr = String(today.getDate()).padStart(2,'0') + '/' + String(today.getMonth()+1).padStart(2,'0') + '/' + today.getFullYear();
  const presentsAujourdHui = TECHS.filter(t => CRA_DATA[t.nom]?.[todayStr]).length;
  document.getElementById('dash-presences').textContent = presentsAujourdHui;
  document.getElementById('dash-techs').textContent = TECHS.length;
}

function renderCentres() {
  const g = document.getElementById('cg');
  g.innerHTML = '';
  CENTRES.forEach((c,i) => {
    g.innerHTML += `<div class="cc" onclick="showFiche(${i})">
      <div class="cc-top" style="background:${c.color};"></div>
      <div class="cc-name">${c.nom}</div>
      <div class="cc-stats">
        <div class="cc-stat"><div class="cc-stat-v">${c.lavages}</div><div class="cc-stat-l">Lavages/jour</div></div>
        <div class="cc-stat"><div class="cc-stat-v">${c.ca} €</div><div class="cc-stat-l">CA aujourd'hui</div></div>
        <div class="cc-stat"><div class="cc-stat-v">${TECHS.filter(t=>t.centre===c.nom&&(t.statut||'actif')==='actif').length}</div><div class="cc-stat-l">Techniciens</div></div>
        <div class="cc-stat"><div class="cc-stat-v">4</div><div class="cc-stat-l">Boîtes à clés</div></div>
      </div>
      <div class="cc-info">📞 <span>${c.tel}</span></div>
      <div class="cc-info">👷 <span>${TECHS.filter(t=>t.centre===c.nom&&(t.statut||'actif')==='actif').map(t=>t.nom.split(' ')[0]).join(', ')||'Aucun'}</span></div>
      <button class="cc-btn">Voir la fiche complète →</button>
    </div>`;
  });
}

function showFiche(i) {
  const c = CENTRES[i];
  if (!c.boites) c.boites = ['','','',''];
  if (!c.wifi) c.wifi = '';
  if (!c.wifiPwd) c.wifiPwd = '';
  if (!c.tel) c.tel = '';
  document.getElementById('fiche-c').innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
      <div style="width:46px;height:46px;border-radius:12px;background:${c.color};display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;">💧</div>
      <div>
        <input id="cnom-${i}" value="${c.nom}" style="font-size:20px;font-weight:800;border:1px solid var(--border);background:var(--bg3);border-radius:7px;padding:4px 10px;font-family:inherit;width:200px;" onchange="CENTRES[${i}].nom=this.value;">
        <span class="badge gr">● Actif</span>
      </div>
      <div style="margin-left:auto;display:flex;gap:8px;">
        <button class="btn btn-p btn-sm" onclick="saveCentre(${i})">💾 Sauvegarder</button>
      </div>
    </div>
    <div class="fg">
      <div class="card">
        <div class="card-t">📋 Informations</div>
        <div class="fr"><span class="fk">Téléphone</span><input id="ctel-${i}" value="${c.tel}" style="font-size:13px;font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:160px;" onchange="CENTRES[${i}].tel=this.value;"></div>
        <div class="fr"><span class="fk">Loyer mensuel</span><input id="cloyer-${i}" value="${c.loyer}" type="number" style="font-size:13px;font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:100px;color:var(--accent4);" onchange="CENTRES[${i}].loyer=parseFloat(this.value)||0;"> €</div>
        <div class="fr"><span class="fk">Techniciens affectés</span><span class="fv">${TECHS.filter(t=>t.centre===c.nom&&(t.statut||'actif')==='actif').map(t=>t.nom).join(', ')||'Aucun'}</span></div>
        <div class="fr"><span class="fk">CA aujourd'hui</span><span class="fv" style="color:var(--accent2);font-size:16px;font-weight:800;">${c.ca} €</span></div>
        <div class="fr"><span class="fk">Lavages du jour</span><span class="fv">${c.lavages}</span></div>
      </div>
      <div class="card">
        <div class="card-t">🔒 Codes d'accès <span style="font-weight:400;font-size:10px;">(cliquer pour révéler)</span></div>
        <div class="fr"><span class="fk">Réseau WiFi</span><input id="cwifi-${i}" value="${c.wifi}" style="font-size:13px;font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:160px;" onchange="CENTRES[${i}].wifi=this.value;"></div>
        <div class="fr"><span class="fk">Mot de passe WiFi</span><span class="secret" onclick="toggleSec(this)" data-v="${c.wifiPwd||''}">${'●'.repeat((c.wifiPwd||'').length||6)}</span></div>
        <div class="fr"><span class="fk">🔑 Boîte à clés 1</span><input id="cb1-${i}" value="${c.boites[0]}" style="font-family:monospace;font-size:12px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 8px;width:100px;" onchange="CENTRES[${i}].boites[0]=this.value;"></div>
        <div class="fr"><span class="fk">🔑 Boîte à clés 2</span><input id="cb2-${i}" value="${c.boites[1]}" style="font-family:monospace;font-size:12px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 8px;width:100px;" onchange="CENTRES[${i}].boites[1]=this.value;"></div>
        <div class="fr"><span class="fk">🔑 Boîte à clés 3</span><input id="cb3-${i}" value="${c.boites[2]}" style="font-family:monospace;font-size:12px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 8px;width:100px;" onchange="CENTRES[${i}].boites[2]=this.value;"></div>
        <div class="fr"><span class="fk">🔑 Boîte à clés 4</span><input id="cb4-${i}" value="${c.boites[3]}" style="font-family:monospace;font-size:12px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 8px;width:100px;" onchange="CENTRES[${i}].boites[3]=this.value;"></div>
      </div>
    </div>`;
  go('fiche');
}

function saveCentre(i) {
  CENTRES[i].nom = document.getElementById('cnom-'+i)?.value || CENTRES[i].nom;
  CENTRES[i].tel = document.getElementById('ctel-'+i)?.value || CENTRES[i].tel;
  CENTRES[i].loyer = parseFloat(document.getElementById('cloyer-'+i)?.value)||CENTRES[i].loyer;
  CENTRES[i].wifi = document.getElementById('cwifi-'+i)?.value || CENTRES[i].wifi;
  if(document.getElementById('cb1-'+i)) CENTRES[i].boites[0] = document.getElementById('cb1-'+i).value;
  if(document.getElementById('cb2-'+i)) CENTRES[i].boites[1] = document.getElementById('cb2-'+i).value;
  if(document.getElementById('cb3-'+i)) CENTRES[i].boites[2] = document.getElementById('cb3-'+i).value;
  if(document.getElementById('cb4-'+i)) CENTRES[i].boites[3] = document.getElementById('cb4-'+i).value;
  saveAll();
}

function renderTechs() {
  const tb = document.getElementById('tech-tbody');
  tb.innerHTML = '';
  const search = (document.getElementById('tech-search')?.value||'').toLowerCase();
  const statutF = document.getElementById('tech-statut-filter')?.value || 'tous';
  const filtered = TECHS.filter(t => {
    if (techFilter !== 'tous' && t.centre !== techFilter) return false;
    if (search && !t.nom.toLowerCase().includes(search)) return false;
    if (statutF !== 'tous' && (t.statut||'actif') !== statutF) return false;
    return true;
  });
  const actifs = TECHS.filter(t => (t.statut||'actif') === 'actif').length;
  document.getElementById('tech-sub').textContent = `${TECHS.length} techniciens · ${actifs} actifs · ${filtered.length} affichés`;
  document.getElementById('nb-techs').textContent = actifs;
  const countEl = document.getElementById('tech-count-display');
  if (countEl) countEl.textContent = `${filtered.length} résultat${filtered.length>1?'s':''}`;
  filtered.forEach(t => {
    const idx = TECHS.indexOf(t);
    if (!t.statut) t.statut = 'actif';
    const statutColors = {actif:'#16A34A', inactif:'#6B7280', conge:'#D97706', maladie:'#DC2626'};
    const statutLabels = {actif:'● Actif', inactif:'● Inactif', conge:'🌴 Congé', maladie:'🏥 Arrêt'};
    const sc = statutColors[t.statut] || '#16A34A';
    tb.innerHTML += `<tr>
      <td><div style="display:flex;align-items:center;gap:9px;">
        <div style="width:34px;height:34px;border-radius:50%;background:${t.color}22;color:${t.color};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0;">${t.nom.charAt(0)}</div>
        <div>
          <input id="tnom-${idx}" value="${t.nom}" style="font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:13px;font-family:inherit;width:160px;" onchange="TECHS[${idx}].nom=this.value;">
          <div style="font-size:10px;color:var(--muted);margin-top:2px;">${t.poste||'Laveur Automobile'} · <span style="font-family:monospace;color:var(--accent);font-weight:700;">Code: ${t.code||'—'}</span></div>
        </div>
      </div></td>
      <td>
        <select onchange="TECHS[${idx}].centre=this.value;renderDashboard();renderCentres();saveAll();" style="border:1px solid var(--border);border-radius:6px;padding:5px 8px;font-size:12px;background:var(--bg3);font-family:inherit;cursor:pointer;width:140px;">
          <option value="">— Choisir —</option>
          ${CENTRES.map(c=>`<option value="${c.nom}" ${c.nom===t.centre?'selected':''}>${c.nom}</option>`).join('')}
        </select>
      </td>
      <td><select onchange="TECHS[${idx}].contrat=this.value;" style="border:1px solid var(--border);border-radius:6px;padding:5px 8px;font-size:12px;background:var(--bg3);font-family:inherit;">
        <option ${t.contrat==='CDI'?'selected':''}>CDI</option>
        <option ${t.contrat==='CDD'?'selected':''}>CDD</option>
        <option ${t.contrat==='Intérim'?'selected':''}>Intérim</option>
      </select></td>
      <td><input id="ttel-${idx}" value="${t.tel||''}" style="color:var(--muted);font-size:12px;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-family:inherit;width:120px;" onchange="TECHS[${idx}].tel=this.value;" placeholder="06..."></td>
      <td style="text-align:center;"><span class="${t.jours>0?'cra-total-g':'cra-total'}">${t.jours}j</span></td>
      <td>
        <select onchange="TECHS[${idx}].statut=this.value;renderTechs();saveAll();" style="border:1px solid ${sc};border-radius:20px;padding:4px 10px;font-size:12px;font-weight:600;color:${sc};background:${sc}11;font-family:inherit;cursor:pointer;appearance:none;text-align:center;">
          <option value="actif" ${t.statut==='actif'?'selected':''}>● Actif</option>
          <option value="inactif" ${t.statut==='inactif'?'selected':''}>● Inactif</option>
          <option value="conge" ${t.statut==='conge'?'selected':''}>🌴 Congé</option>
          <option value="maladie" ${t.statut==='maladie'?'selected':''}>🏥 Arrêt maladie</option>
        </select>
      </td>
      <td><div style="display:flex;gap:5px;">
        <button class="btn btn-o btn-sm" onclick="showFicheTech(${idx})">✏️ Fiche</button>
        <button class="btn btn-sm btn-r" onclick="if(confirm('Supprimer ?')){TECHS.splice(${idx},1);renderTechs();saveAll();}">🗑️</button>
      </div></td>
    </tr>`;
  });
}

function showFicheTech(i) {
  const t = TECHS[i];
  const totH = t.jours;
  // Init extra tech data if not exists
  if (!t.email) t.email = t.nom.toLowerCase().replace(/\s/g,'.')+'@dreamwash.fr';
  if (!t.adresse) t.adresse = '';
  if (!t.dateDebut) t.dateDebut = '';
  if (!t.cni_type) t.cni_type = 'CNI';
  if (!t.cni_num) t.cni_num = '';
  if (!t.cni_exp) t.cni_exp = '';
  if (!t.nationalite) t.nationalite = '';

  document.getElementById('fiche-t').innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
      <div style="width:52px;height:52px;border-radius:50%;background:${t.color}22;color:${t.color};display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;">${t.nom.charAt(0)}</div>
      <div>
        <div style="font-size:20px;font-weight:800;" id="ft-nom-${i}">${t.nom}</div>
        <input id="ftnom-${i}" value="${t.nom}" style="font-size:20px;font-weight:800;border:1px solid var(--border);background:var(--bg3);border-radius:7px;padding:4px 10px;font-family:inherit;width:250px;" onchange="TECHS[${i}].nom=this.value;">
        <div style="color:var(--muted);font-size:12px;">📍 ${t.centre} · ${t.poste||t.contrat} · Dossier n°${t.numero||'—'}</div>
      </div>
      <span class="badge gr" style="margin-left:auto;">● Actif</span>
      <button class="btn btn-p btn-sm" onclick="saveFicheTech(${i})">💾 Sauvegarder</button>
    </div>
    <div style="margin-bottom:16px;">
      <label style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;display:block;margin-bottom:6px;">Statut</label>
      <select id="ftstatut-${i}" onchange="TECHS[${i}].statut=this.value;saveAll();" style="border:1px solid var(--border);border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;background:var(--bg3);font-family:inherit;cursor:pointer;">
        <option value="actif" ${(t.statut||'actif')==='actif'?'selected':''}>● Actif</option>
        <option value="inactif" ${t.statut==='inactif'?'selected':''}>● Inactif</option>
        <option value="conge" ${t.statut==='conge'?'selected':''}>🌴 En congé</option>
        <option value="maladie" ${t.statut==='maladie'?'selected':''}>🏥 Arrêt maladie</option>
      </select>
    </div>
    <div class="fg">
      <div class="card">
        <div class="card-t">💼 Contrat de travail</div>
        <div class="fr"><span class="fk">N° Dossier</span><span class="fv" style="font-family:monospace;font-weight:700;">${t.numero||'—'}</span></div>
        <div class="fr"><span class="fk">Poste</span><input id="ftposte-${i}" value="${t.poste||''}" placeholder="Poste..." style="font-size:13px;font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:200px;" onchange="TECHS[${i}].poste=this.value;"></div>
        <div class="fr"><span class="fk">Type contrat</span>
          <select id="ftcontrat-${i}" onchange="TECHS[${i}].contrat=this.value;" style="border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:12px;background:var(--bg3);font-family:inherit;">
            <option ${t.contrat==='CDI'?'selected':''}>CDI</option>
            <option ${t.contrat==='CDD'?'selected':''}>CDD</option>
            <option ${t.contrat==='Intérim'?'selected':''}>Intérim</option>
          </select>
        </div>
        <div class="fr"><span class="fk">Date début</span><input id="ftdebut-${i}" value="${t.debut||''}" placeholder="JJ/MM/AAAA" style="font-size:13px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:130px;" onchange="TECHS[${i}].debut=this.value;"></div>
        <div class="fr"><span class="fk">Date fin</span><input id="ftfin-${i}" value="${t.fin||''}" placeholder="JJ/MM/AAAA (CDD)" style="font-size:13px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:160px;color:${t.fin?'var(--accent4)':'var(--muted)'};" onchange="TECHS[${i}].fin=this.value;"></div>
        <div class="fr"><span class="fk">Heures/semaine</span><span class="fv">35h</span></div>
        <div class="fr"><span class="fk">Téléphone</span><input id="fttel-${i}" value="${t.tel||''}" style="font-size:13px;font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:160px;" onchange="TECHS[${i}].tel=this.value;"></div>
        <div class="fr"><span class="fk">Email</span><input id="ftemail-${i}" value="${t.email}" style="font-size:13px;font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:200px;" onchange="TECHS[${i}].email=this.value;"></div>
        <div class="fr"><span class="fk">Adresse</span><input id="ftadr-${i}" value="${t.adresse}" placeholder="À compléter" style="font-size:13px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:200px;" onchange="TECHS[${i}].adresse=this.value;"></div>
        <div class="fr"><span class="fk">Centre affecté</span>
          <select id="ftcentre-${i}" onchange="TECHS[${i}].centre=this.value;" style="border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:12px;background:var(--bg3);font-family:inherit;">
            ${CENTRES.map(c=>`<option value="${c.nom}" ${c.nom===t.centre?'selected':''}>${c.nom}</option>`).join('')}
          </select>
        </div>
        <div class="fr"><span class="fk">Type contrat</span>
          <select id="ftcontrat-${i}" onchange="TECHS[${i}].contrat=this.value;" style="border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:12px;background:var(--bg3);font-family:inherit;">
            <option ${t.contrat==='CDI'?'selected':''}>CDI</option>
            <option ${t.contrat==='CDD'?'selected':''}>CDD</option>
            <option ${t.contrat==='Intérim'?'selected':''}>Intérim</option>
          </select>
        </div>
        <div class="fr"><span class="fk">Date début</span><input id="ftdebut-${i}" value="${t.dateDebut}" type="date" style="font-size:13px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;" onchange="TECHS[${i}].dateDebut=this.value;"></div>
      </div>
      <div class="card">
        <div class="card-t">🪪 Pièces d'identité</div>
        <div class="fr"><span class="fk">Type</span>
          <select id="ftcni-${i}" onchange="TECHS[${i}].cni_type=this.value;" style="border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:12px;background:var(--bg3);font-family:inherit;">
            <option ${t.cni_type==='CNI'?'selected':''}>CNI</option>
            <option ${t.cni_type==='Passeport'?'selected':''}>Passeport</option>
            <option ${t.cni_type==='Titre de séjour'?'selected':''}>Titre de séjour</option>
          </select>
        </div>
        <div class="fr"><span class="fk">Numéro</span><input id="ftcninum-${i}" value="${t.cni_num}" placeholder="À compléter" style="font-size:13px;font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:160px;" onchange="TECHS[${i}].cni_num=this.value;"></div>
        <div class="fr"><span class="fk">Date expiration</span><input id="ftcniexp-${i}" value="${t.cni_exp}" type="date" style="font-size:13px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;" onchange="TECHS[${i}].cni_exp=this.value;"></div>
        <div class="fr"><span class="fk">Nationalité</span><input id="ftnatio-${i}" value="${t.nationalite}" placeholder="À compléter" style="font-size:13px;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:4px 10px;font-family:inherit;width:160px;" onchange="TECHS[${i}].nationalite=this.value;"></div>
        <div class="fr"><span class="fk">🔐 Code badgeuse</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <input id="ftcode-${i}" value="${t.code||String(1000+i+1).padStart(4,'0')}" 
              style="background:#EFF6FF;border:2px solid #DBEAFE;padding:5px 14px;border-radius:20px;font-family:monospace;font-size:15px;font-weight:800;color:var(--accent);letter-spacing:.1em;width:100px;text-align:center;outline:none;" 
              onchange="TECHS[${i}].code=this.value;saveAll();"
              placeholder="ex: 1001">
            <span style="font-size:11px;color:var(--muted);">Modifiable</span>
          </div>
        </div>
        <div style="margin-top:10px;"><button class="btn btn-o btn-sm" onclick="openUrl('https://drive.google.com')">📎 Ajouter document</button></div>
      </div>
      <div class="card" style="grid-column:1/-1;">
        <div class="card-t">📋 CRA détaillé — Avril 2026</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
          ${[1,2,3,4].map(s => {
            const days = ['Lun','Mar','Mer','Jeu','Ven'];
            return `<div style="background:var(--bg3);border-radius:8px;padding:12px;">
              <div style="font-size:11px;font-weight:700;color:var(--muted);margin-bottom:8px;">Semaine ${s}</div>
              <div style="display:flex;gap:4px;justify-content:center;">
                ${days.map(d=>`<div style="text-align:center;">
                  <div style="font-size:9px;color:var(--muted);margin-bottom:3px;">${d}</div>
                  <div class="cra-circle" style="margin:0 auto;" onclick="this.classList.toggle('present');this.textContent=this.classList.contains('present')?'✓':'';"></div>
                </div>`).join('')}
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="fr" style="border-top:2px solid var(--border);margin-top:12px;"><span class="fk" style="font-weight:700;">Total mois</span><span class="fv" style="color:var(--accent2);font-size:16px;font-weight:800;">${totH} jours</span></div>
      </div>
      <div class="card" style="grid-column:1/-1;">
        <div class="card-t">📄 Documents RH</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;">
          ${['Contrat de travail','Fiche paie mars','Fiche paie avr.','Mutuelle','URSSAF','Attestation employeur','Certificat médical'].map(d=>`
            <div style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:10px;cursor:pointer;transition:all .15s;" onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--border)'">
              <div style="font-size:18px;margin-bottom:5px;">📄</div>
              <div style="font-size:11px;font-weight:600;">${d}</div>
            </div>`).join('')}
          <div style="background:#EFF6FF;border:1px dashed #93C5FD;border-radius:8px;padding:10px;cursor:pointer;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;" onclick="openUrl('https://drive.google.com')">
            <div style="font-size:18px;">☁️</div>
            <div style="font-size:11px;color:var(--accent);margin-top:4px;">Google Drive</div>
          </div>
        </div>
      </div>
    </div>`;
  go('fiche-tech');
}

function saveFicheTech(i) {
  TECHS[i].nom = document.getElementById('ftnom-'+i)?.value || TECHS[i].nom;
  TECHS[i].tel = document.getElementById('fttel-'+i)?.value || TECHS[i].tel;
  TECHS[i].email = document.getElementById('ftemail-'+i)?.value || TECHS[i].email;
  TECHS[i].adresse = document.getElementById('ftadr-'+i)?.value || '';
  TECHS[i].centre = document.getElementById('ftcentre-'+i)?.value || TECHS[i].centre;
  TECHS[i].contrat = document.getElementById('ftcontrat-'+i)?.value || TECHS[i].contrat;
  TECHS[i].dateDebut = document.getElementById('ftdebut-'+i)?.value || '';
  TECHS[i].cni_type = document.getElementById('ftcni-'+i)?.value || 'CNI';
  TECHS[i].cni_num = document.getElementById('ftcninum-'+i)?.value || '';
  TECHS[i].cni_exp = document.getElementById('ftcniexp-'+i)?.value || '';
  TECHS[i].nationalite = document.getElementById('ftnatio-'+i)?.value || '';
  TECHS[i].code = document.getElementById('ftcode-'+i)?.value || TECHS[i].code;
  saveAll();
}

function setTF(btn, f) {
  document.querySelectorAll('#tech-fbar .fbtn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  techFilter = f;
  renderTechs();
}

function renderPlanning() {
  const tb = document.getElementById('plan-tbody');
  const thead = document.getElementById('plan-table')?.querySelector('thead tr');
  if (!tb) return;
  tb.innerHTML = '';

  // Update header for 7 days
  if (thead) {
    // Calculer les jours de la semaine courante
    const now = new Date();
    const dayOfWeek = now.getDay() || 7;
    const lundi = new Date(now);
    lundi.setDate(now.getDate() - dayOfWeek + 1);
    const jours = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
    thead.innerHTML = `<th style="text-align:left;min-width:130px;border-right:2px solid var(--border);">Centre</th>` +
      jours.map((j,i) => {
        const isWE = i >= 5;
        const isToday = new Date(lundi.getTime() + i*86400000).toDateString() === now.toDateString();
        return `<th ${isWE?'style="background:#FEF3C7;"':''} ${isToday?'class="today-h"':''}>${j}</th>`;
      }).join('');
  }

  const centres = planFilter === 'tous'
    ? CENTRES.map(c=>c.nom)
    : [planFilter];

  centres.forEach(centre => {
    if (!PLANNING[centre]) PLANNING[centre] = [[],[],[],[],[],[],[]];
    // Ensure 7 days
    while (PLANNING[centre].length < 7) PLANNING[centre].push([]);

    let row = `<tr><td class="centre-lbl">${centre}</td>`;
    for (let j = 0; j < 7; j++) {
      const slots = PLANNING[centre][j] || [];
      const isToday = j === 2;
      const isWE = j >= 5;
      row += `<td class="${isToday?'today-td':''}" style="vertical-align:top;padding:5px 7px;${isWE?'background:#FFFBEB;':''}">`;
      slots.forEach((s, si) => {
        const col = TECHS.find(t=>t.nom===s.nom)?.color||'#64748B';
        row += `<div class="plan-slot ${s.statut}" style="border-left:3px solid ${col};display:flex;align-items:center;justify-content:space-between;gap:4px;" onclick="toggleSlotPresence('${centre}',${j},${si},this)">
          <span style="font-size:11px;">${s.nom}</span>
          <span onclick="event.stopPropagation();removeSlot('${centre}',${j},${si})" style="color:#DC2626;font-size:14px;cursor:pointer;opacity:0.6;line-height:1;" title="Supprimer">×</span>
        </div>`;
      });
      row += `<span class="plan-add" title="Ajouter" onclick="openPlanModal('${centre}',${j})">+</span></td>`;
    }
    row += '</tr>';
    tb.innerHTML += row;
  });
}

function toggleSlotPresence(centre, jour, idx, el) {
  if (!PLANNING[centre]?.[jour]?.[idx]) return;
  const current = PLANNING[centre][jour][idx].statut;
  PLANNING[centre][jour][idx].statut = current === 'present' ? 'absent' : 'present';
  renderPlanning();
  saveLocal();
}

function removeSlot(centre, jour, idx) {
  if (!PLANNING[centre]?.[jour]) return;
  PLANNING[centre][jour].splice(idx, 1);
  renderPlanning();
  saveAll();
}

function toggleSlot(el) {
  if (el.classList.contains('present')) { el.classList.remove('present'); el.classList.add('absent'); }
  else { el.classList.remove('absent'); el.classList.add('present'); }
  saveLocal();
}

function setPF(btn, f) {
  document.querySelectorAll('#plan-fbar .fbtn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  planFilter = f;
  renderPlanning();
}

function openPlanModal(centre, jour) {
  openModal('m-slot');
  // Pre-select centre and jour
  const centreEl = document.getElementById('sl-centre');
  const jourEl = document.getElementById('sl-jour');
  if (centreEl && centre) centreEl.value = centre;
  if (jourEl && jour !== undefined) jourEl.value = jour;
  // Update tech list for selected centre
  updateSlotTechs();
}

function updateSlotTechs() {
  const centre = document.getElementById('sl-centre')?.value;
  const sel = document.getElementById('sl-tech');
  if (!sel) return;
  // Show techs of selected centre first, then others
  const centreTechs = TECHS.filter(t => t.centre === centre && (t.statut||'actif') === 'actif');
  const otherTechs = TECHS.filter(t => t.centre !== centre && (t.statut||'actif') === 'actif');
  sel.innerHTML = `<optgroup label="📍 ${centre}">
    ${centreTechs.map(t=>`<option value="${t.nom}">${t.nom}</option>`).join('')}
  </optgroup>
  <optgroup label="Autres techniciens">
    ${otherTechs.map(t=>`<option value="${t.nom}">${t.nom} (${t.centre})</option>`).join('')}
  </optgroup>`;
}

function addSlot() {
  const centre = document.getElementById('sl-centre').value;
  const tech = document.getElementById('sl-tech').value;
  const jour = parseInt(document.getElementById('sl-jour').value);
  const statut = document.getElementById('sl-statut').value;
  if (!tech) return;
  if (!PLANNING[centre]) PLANNING[centre] = [[],[],[],[],[],[],[]];
  if (!PLANNING[centre][jour]) PLANNING[centre][jour] = [];
  if (PLANNING[centre][jour].find(s => s.nom === tech)) {
    closeModal('m-slot');
    return;
  }
  PLANNING[centre][jour].push({nom:tech, statut});

  // ⚠️ Le planning ne met PAS à jour le CRA
  // Le CRA est alimenté uniquement par la badgeuse et la saisie manuelle

  renderPlanning();
  closeModal('m-slot');
  saveAll();
}

function renderCRA() {
  const thead = document.getElementById('cra-thead');
  const tbody = document.getElementById('cra-tbody');
  if (!thead || !tbody) return;
  thead.innerHTML = ''; tbody.innerHTML = '';

  const search = (document.getElementById('cra-search')?.value||'').toLowerCase();
  const centreF = document.getElementById('cra-centre-filter')?.value||'tous';
  const statutF = document.getElementById('cra-statut-filter')?.value||'tous';
  const moisF = document.getElementById('cra-mois-filter')?.value || (String(new Date().getMonth()+1).padStart(2,'0') + '/' + new Date().getFullYear());

  const today = new Date();
  const todayStr = String(today.getDate()).padStart(2,'0') + '/' + String(today.getMonth()+1).padStart(2,'0') + '/' + today.getFullYear();

  // Calculer jours réels depuis CRA_DATA
  const getTechJours = (nom) => {
    if (!CRA_DATA[nom]) return 0;
    return Object.keys(CRA_DATA[nom]).filter(d => d.endsWith(moisF)).length;
  };

  const filtered = TECHS.filter(t => {
    const j = getTechJours(t.nom) || t.jours;
    if (search && !t.nom.toLowerCase().includes(search)) return false;
    if (centreF !== 'tous' && t.centre !== centreF) return false;
    if (statutF === 'present' && j === 0) return false;
    if (statutF === 'absent' && j > 0) return false;
    return true;
  });

  // KPIs
  const totalJours = filtered.reduce((s,t) => s + (getTechJours(t.nom)||t.jours), 0);
  const techsActifs = filtered.filter(t => (getTechJours(t.nom)||t.jours) > 0).length;
  const centresActifs = new Set(filtered.filter(t => (getTechJours(t.nom)||t.jours) > 0).map(t => t.centre)).size;
  const presentsAujourdhui = TECHS.filter(t => CRA_DATA[t.nom]?.[todayStr]).length;

  const kpi1 = document.getElementById('cra-kpi-techs');
  const kpi2 = document.getElementById('cra-kpi-jours');
  const kpi3 = document.getElementById('cra-kpi-centres');
  const kpi4 = document.getElementById('cra-kpi-today');
  if (kpi1) kpi1.textContent = techsActifs;
  if (kpi2) kpi2.textContent = totalJours;
  if (kpi3) kpi3.textContent = centresActifs;
  if (kpi4) kpi4.textContent = presentsAujourdhui;

  const countEl = document.getElementById('cra-count');
  if (countEl) countEl.textContent = filtered.length;

  const visibleCentres = centreF === 'tous' ? CENTRES.map(c=>c.nom) : [centreF];

  thead.innerHTML = `<th style="text-align:left;padding:10px 14px;background:var(--bg3);font-size:11px;font-weight:600;color:var(--muted);min-width:180px;position:sticky;left:0;z-index:2;">Employé</th>` +
    visibleCentres.map(n => {
      const cnt = filtered.filter(t => CRA_DATA[t.nom] && Object.values(CRA_DATA[t.nom]).some(c=>c===n)).length;
      return `<th style="padding:8px 6px;background:var(--bg3);font-size:10px;font-weight:600;color:var(--muted);text-align:center;min-width:80px;">${n.split(' ')[0]}</th>`;
    }).join('') +
    `<th style="padding:8px;background:var(--bg3);font-size:11px;font-weight:600;color:var(--muted);text-align:center;">Total</th>
    <th style="padding:8px;background:var(--bg3);font-size:11px;font-weight:600;color:var(--muted);text-align:center;">Dernière présence</th>
    <th style="padding:8px;background:var(--bg3);font-size:11px;font-weight:600;color:var(--muted);text-align:center;">Aujourd'hui</th>`;

  filtered.forEach(t => {
    const techCRA = CRA_DATA[t.nom] || {};
    const joursMois = Object.keys(techCRA).filter(d => d.endsWith(moisF));
    const totalJoursTech = joursMois.length;
    const dernier = [...joursMois].sort().reverse()[0] || '—';
    const presentAujourd = techCRA[todayStr] ? `<span class="badge gr">✓ ${techCRA[todayStr].split(' ')[0]}</span>` : '<span style="color:var(--muted);font-size:11px;">—</span>';

    let row = `<tr>
      <td style="text-align:left;font-weight:600;padding:8px 14px;font-size:13px;position:sticky;left:0;background:var(--bg2);z-index:1;border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;border-radius:50%;background:${t.color}22;color:${t.color};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;flex-shrink:0;">${t.nom.charAt(0)}</div>
          <div>
            <div>${t.nom}</div>
            <div style="font-size:10px;color:var(--muted);font-weight:400;">📍 ${t.centre} · ${t.contrat}</div>
          </div>
        </div>
      </td>`;

    visibleCentres.forEach(cn => {
      const joursIci = Object.keys(techCRA).filter(d => d.endsWith(moisF) && techCRA[d] === cn).length;
      row += `<td style="text-align:center;padding:6px;border-bottom:1px solid var(--border);">
        ${joursIci > 0
          ? `<span style="background:#DCFCE7;color:#15803D;border-radius:20px;padding:3px 10px;font-size:12px;font-weight:700;cursor:pointer;" onclick="showCRATechDetail('${t.nom}','${cn}','${moisF}')">✓ ${joursIci}j</span>`
          : `<span style="color:var(--light);font-size:11px;">—</span>`
        }
      </td>`;
    });

    row += `
      <td style="text-align:center;padding:6px;border-bottom:1px solid var(--border);">
        <span class="${totalJoursTech>0?'cra-total-g':'cra-total'}">${totalJoursTech}</span>
      </td>
      <td style="text-align:center;padding:6px;font-size:11px;color:var(--muted);border-bottom:1px solid var(--border);">${dernier}</td>
      <td style="text-align:center;padding:6px;border-bottom:1px solid var(--border);">${presentAujourd}</td>
    </tr>`;
    tbody.innerHTML += row;
  });

  // Mettre à jour le rapport en même temps
  renderRapport();
}

function showCRATechDetail(nom, centre, mois) {
  const techCRA = CRA_DATA[nom] || {};
  const jours = Object.keys(techCRA).filter(d => d.endsWith(mois) && techCRA[d] === centre).sort();
  if (!jours.length) return;

  // Créer modal d'édition
  let existing = document.getElementById('m-cra-edit');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'm-cra-edit';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;';
  modal.innerHTML = `
    <div style="background:var(--bg2);border-radius:16px;padding:24px;max-width:460px;width:90%;box-shadow:0 8px 40px rgba(0,0,0,0.3);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <div style="font-size:16px;font-weight:800;">✏️ ${nom} — ${centre}</div>
        <button onclick="document.getElementById('m-cra-edit').remove()" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--muted);">✕</button>
      </div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:12px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">Jours travaillés (${mois})</div>
      <div id="cra-edit-jours" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
        ${jours.map(d => `
          <div style="display:flex;align-items:center;gap:6px;background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:6px 10px;">
            <span style="font-size:13px;font-weight:600;">📅 ${d}</span>
            <button onclick="deleteCRADay('${nom}','${d}')" style="background:#FEE2E2;border:none;border-radius:6px;padding:2px 7px;cursor:pointer;color:#DC2626;font-size:12px;font-weight:700;">✕</button>
          </div>`).join('')}
      </div>
      <div style="border-top:1px solid var(--border);padding-top:16px;">
        <div style="font-size:12px;font-weight:600;color:var(--muted);margin-bottom:8px;">Ajouter un jour :</div>
        <div style="display:flex;gap:8px;">
          <input type="date" id="cra-edit-date" style="flex:1;border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:13px;background:var(--bg3);font-family:inherit;color:var(--text);">
          <select id="cra-edit-centre" style="border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:12px;background:var(--bg3);font-family:inherit;color:var(--text);">
            <option>Aeroville A</option><option>Aeroville B</option><option>Lafayette Rouge</option><option>Lafayette Vert</option><option>Cité des Sciences</option><option>Le Parks</option><option>Parly2</option><option>Belleville</option><option>Suresnes</option>
          </select>
          <button onclick="addCRADayFromEdit('${nom}')" style="background:var(--accent);border:none;border-radius:8px;padding:8px 14px;color:#fff;font-weight:700;cursor:pointer;font-size:13px;">+ Ajouter</button>
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:16px;">
        <button onclick="deleteAllCRADays('${nom}','${centre}','${mois}')" style="flex:1;padding:10px;background:#FEE2E2;border:1px solid #FECACA;border-radius:10px;color:#DC2626;font-weight:700;cursor:pointer;font-size:13px;">🗑️ Supprimer tout</button>
        <button onclick="document.getElementById('m-cra-edit').remove();renderCRA();renderRapport();" style="flex:1;padding:10px;background:var(--accent);border:none;border-radius:10px;color:#fff;font-weight:700;cursor:pointer;font-size:13px;">✅ Fermer</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  // Pré-sélectionner le centre
  const centreEl = document.getElementById('cra-edit-centre');
  if (centreEl) centreEl.value = centre;
  // Date du jour par défaut
  const dateEl = document.getElementById('cra-edit-date');
  if (dateEl) dateEl.valueAsDate = new Date();
}

async function deleteCRADay(nom, dateStr) {
  if (!CRA_DATA[nom]) return;
  delete CRA_DATA[nom][dateStr];
  // Supprimer aussi le badge Firebase correspondant
  try {
    if (window.getAllBadgeages) {
      const all = await window.getAllBadgeages();
      // On sauvegarde juste le CRA mis à jour
    }
    if (window._markCRASave) window._markCRASave(); if (window.saveToFirebase) await window.saveToFirebase('cra_data', CRA_DATA);
    saveLocal();
  } catch(e) {}
  // Rafraîchir la modal
  const modal = document.getElementById('m-cra-edit');
  if (modal) modal.remove();
  showCRATechDetail(nom, CRA_DATA[nom] ? Object.values(CRA_DATA[nom])[0] || '' : '', Object.keys(CRA_DATA[nom]||{})[0]?.slice(3) || '');
  renderCRA(); renderRapport();
  showNotif(`🗑️ ${dateStr} supprimé pour ${nom}`, '#DC2626');
}

async function deleteAllCRADays(nom, centre, mois) {
  if (!CRA_DATA[nom]) return;
  Object.keys(CRA_DATA[nom]).filter(d => d.endsWith(mois) && CRA_DATA[nom][d] === centre)
    .forEach(d => delete CRA_DATA[nom][d]);
  if (window._markCRASave) window._markCRASave(); if (window.saveToFirebase) await window.saveToFirebase('cra_data', CRA_DATA);
  saveLocal();
  document.getElementById('m-cra-edit')?.remove();
  renderCRA(); renderRapport();
  showNotif(`🗑️ Toutes les présences supprimées pour ${nom} — ${centre}`, '#DC2626');
}

async function addCRADayFromEdit(nom) {
  const dateInput = document.getElementById('cra-edit-date');
  const centreInput = document.getElementById('cra-edit-centre');
  if (!dateInput?.value) return;
  const d = new Date(dateInput.value);
  const dateStr = String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0') + '/' + d.getFullYear();
  const centre = centreInput?.value || 'Aeroville A';
  if (!CRA_DATA[nom]) CRA_DATA[nom] = {};
  CRA_DATA[nom][dateStr] = centre;
  if (window._markCRASave) window._markCRASave(); if (window.saveToFirebase) await window.saveToFirebase('cra_data', CRA_DATA);
  saveLocal();
  // Rafraîchir modal
  document.getElementById('m-cra-edit')?.remove();
  showCRATechDetail(nom, centre, String(d.getMonth()+1).padStart(2,'0') + '/' + d.getFullYear());
  renderCRA(); renderRapport();
  showNotif(`✅ ${dateStr} ajouté pour ${nom}`, '#16A34A');
}

let rapportMoisIdx = 3;
const MOIS_NOMS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

function renderRapport() {
  const moisNom = MOIS_NOMS[rapportMoisIdx];
  const annee = 2026;
  const moisStr = String(rapportMoisIdx+1).padStart(2,'0') + '/' + annee;
  const moisEl = document.getElementById('rapport-mois');
  if (moisEl) moisEl.textContent = `${moisNom} ${annee}`;

  const thead = document.getElementById('rapport-thead');
  const tbody = document.getElementById('rapport-tbody');
  if (!thead || !tbody) return;
  thead.innerHTML = ''; tbody.innerHTML = '';

  const search = (document.getElementById('rapp-search')?.value||'').toLowerCase();
  const centreF = document.getElementById('rapp-centre')?.value||'tous';
  const presF = document.getElementById('rapp-presence')?.value||'tous';

  // Jours travaillés depuis CRA_DATA
  const getJours = (nom) => {
    if (!CRA_DATA[nom]) return t => t.nom === nom ? (TECHS.find(t=>t.nom===nom)?.jours||0) : 0;
    return Object.keys(CRA_DATA[nom]).filter(d => d.endsWith(moisStr)).length;
  };

  const filtered = TECHS.filter(t => {
    const j = CRA_DATA[t.nom] ? Object.keys(CRA_DATA[t.nom]).filter(d=>d.endsWith(moisStr)).length : t.jours;
    if (search && !t.nom.toLowerCase().includes(search)) return false;
    if (centreF !== 'tous' && t.centre !== centreF) return false;
    if (presF === 'present' && j === 0) return false;
    if (presF === 'absent' && j > 0) return false;
    return true;
  });

  const countEl = document.getElementById('rapp-count');
  if (countEl) countEl.textContent = filtered.length;

  // KPIs rapport
  const totalJoursTous = filtered.reduce((s,t) => {
    const tc = CRA_DATA[t.nom]||{};
    return s + (Object.keys(tc).filter(d=>d.endsWith(moisStr)).length || t.jours);
  }, 0);
  const techsAvecJours = filtered.filter(t => {
    const tc = CRA_DATA[t.nom]||{};
    return (Object.keys(tc).filter(d=>d.endsWith(moisStr)).length || t.jours) > 0;
  }).length;
  const moy = techsAvecJours > 0 ? (totalJoursTous/techsAvecJours).toFixed(1) : 0;
  const k1 = document.getElementById('rapp-kpi-total');
  const k2 = document.getElementById('rapp-kpi-techs');
  const k3 = document.getElementById('rapp-kpi-moy');
  if (k1) k1.textContent = totalJoursTous;
  if (k2) k2.textContent = techsAvecJours;
  if (k3) k3.textContent = moy;

  const visibleCentres = centreF === 'tous' ? CENTRES.map(c=>c.nom) : [centreF];

  // Totaux par centre
  const totalParCentre = {};
  visibleCentres.forEach(cn => {
    totalParCentre[cn] = TECHS.reduce((s,t) => {
      const tc = CRA_DATA[t.nom] || {};
      return s + Object.keys(tc).filter(d=>d.endsWith(moisStr)&&tc[d]===cn).length;
    }, 0);
  });

  thead.innerHTML = `
    <th style="text-align:left;padding:10px 14px;background:var(--bg3);font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;min-width:180px;position:sticky;left:0;z-index:2;">Technicien</th>
    <th style="padding:10px 8px;background:var(--bg3);font-size:11px;font-weight:700;color:var(--muted);text-align:center;">Jours</th>
    <th style="padding:10px 8px;background:var(--bg3);font-size:11px;font-weight:700;color:var(--muted);text-align:center;">Centres travaillés</th>
    <th style="padding:10px 8px;background:var(--bg3);font-size:11px;font-weight:700;color:var(--muted);text-align:center;">Dernière présence</th>` +
    visibleCentres.map(cn => `<th style="padding:8px 6px;background:var(--bg3);font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;text-align:center;">${cn.split(' ')[0]}</th>`).join('');

  filtered.forEach(t => {
    const techCRA = CRA_DATA[t.nom] || {};
    const joursMois = Object.keys(techCRA).filter(d => d.endsWith(moisStr));
    const totalJours = joursMois.length || t.jours;
    const dernier = [...joursMois].sort().reverse()[0] || '—';

    // Centres travaillés
    const centresTrav = {};
    joursMois.forEach(d => { const c = techCRA[d]; centresTrav[c] = (centresTrav[c]||0)+1; });
    const centresLabel = Object.entries(centresTrav).map(([c,j])=>`${c.split(' ')[0]}(${j}j)`).join(', ') || `${t.centre}`;

    let row = `<tr>
      <td style="padding:9px 14px;font-weight:600;border-bottom:1px solid var(--border);position:sticky;left:0;background:var(--bg2);z-index:1;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:26px;height:26px;border-radius:50%;background:${t.color}22;color:${t.color};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:10px;flex-shrink:0;">${t.nom.charAt(0)}</div>
          <div>
            <div style="font-size:13px;">${t.nom}</div>
            <div style="font-size:10px;color:var(--muted);font-weight:400;">${t.poste||'Laveur'} · N°${t.numero||'—'}</div>
          </div>
        </div>
      </td>
      <td style="padding:9px 8px;text-align:center;border-bottom:1px solid var(--border);">
        <span class="rc ${totalJours>0?'g':'z'}">${totalJours}</span>
      </td>
      <td style="padding:9px 8px;text-align:center;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted);">${centresLabel}</td>
      <td style="padding:9px 8px;text-align:center;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted);">${dernier}</td>`;

    visibleCentres.forEach(cn => {
      const joursIci = Object.keys(techCRA).filter(d=>d.endsWith(moisStr)&&techCRA[d]===cn).length;
      const val = joursIci || (t.centre===cn && joursMois.length===0 ? t.jours : 0);
      row += `<td style="padding:9px 6px;text-align:center;border-bottom:1px solid var(--border);">
        ${val > 0 ? `<span class="rc b">${val}</span>` : `<span class="rc z">—</span>`}
      </td>`;
    });
    row += '</tr>';
    tbody.innerHTML += row;
  });

  // Ligne total
  const grandTotal = filtered.reduce((s,t) => {
    const tc = CRA_DATA[t.nom] || {};
    return s + Object.keys(tc).filter(d=>d.endsWith(moisStr)).length || t.jours;
  }, 0);

  tbody.innerHTML += `<tr style="background:var(--bg3);font-weight:800;">
    <td style="padding:10px 14px;position:sticky;left:0;background:var(--bg3);z-index:1;">TOTAL</td>
    <td style="padding:10px 8px;text-align:center;"><span class="cra-total-g">${grandTotal}</span></td>
    <td colspan="2"></td>
    ${visibleCentres.map(cn=>`<td style="padding:10px 6px;text-align:center;"><span class="cra-total-g">${totalParCentre[cn]}</span></td>`).join('')}
  </tr>`;
}

function rapportNav(d) {
  rapportMoisIdx = Math.max(0,Math.min(11,rapportMoisIdx+d));
  renderRapport();
}

function renderCompta() {
  const tb = document.getElementById('compta-tbody');
  tb.innerHTML = '';
  let totalCA=0,totalCh=0;
  COMPTA.forEach((r,i) => {
    const result = r.ca-r.loyer-r.salaires-r.produits;
    totalCA+=r.ca; totalCh+=(r.loyer+r.salaires+r.produits);
    tb.innerHTML += `<tr>
      <td style="font-weight:700;">${r.centre}</td>
      <td><input id="compx-ca-${i}" value="${r.ca}" type="number" style="width:80px;border:1px solid var(--border);border-radius:5px;padding:3px 6px;font-size:13px;font-weight:700;color:var(--accent2);font-family:inherit;background:var(--bg3);" onchange="COMPTA[${i}].ca=parseFloat(this.value)||0;recalcCompta();"> €</td>
      <td><input id="compx-loyer-${i}" value="${r.loyer}" type="number" style="width:80px;border:1px solid var(--border);border-radius:5px;padding:3px 6px;font-size:13px;color:var(--muted);font-family:inherit;background:var(--bg3);" onchange="COMPTA[${i}].loyer=parseFloat(this.value)||0;recalcCompta();"> €</td>
      <td><input id="compx-sal-${i}" value="${r.salaires}" type="number" style="width:80px;border:1px solid var(--border);border-radius:5px;padding:3px 6px;font-size:13px;color:var(--muted);font-family:inherit;background:var(--bg3);" onchange="COMPTA[${i}].salaires=parseFloat(this.value)||0;recalcCompta();"> €</td>
      <td><input id="compx-prod-${i}" value="${r.produits}" type="number" style="width:80px;border:1px solid var(--border);border-radius:5px;padding:3px 6px;font-size:13px;color:var(--muted);font-family:inherit;background:var(--bg3);" onchange="COMPTA[${i}].produits=parseFloat(this.value)||0;recalcCompta();"> €</td>
      <td style="font-weight:700;color:${result>0?'var(--accent2)':'var(--accent4)'};" id="compx-res-${i}">${result} €</td>
      <td><span class="badge ${r.badge}">${r.evol}</span></td>
    </tr>`;
  });
  document.getElementById('compta-ca').textContent = totalCA.toLocaleString()+' €';
  document.getElementById('compta-charges').textContent = totalCh.toLocaleString()+' €';
  document.getElementById('compta-net').textContent = (totalCA-totalCh).toLocaleString()+' €';
}

function recalcCompta() {
  let totalCA=0,totalCh=0;
  COMPTA.forEach((r,i) => {
    const ca = parseFloat(document.getElementById('compx-ca-'+i)?.value)||r.ca;
    const loyer = parseFloat(document.getElementById('compx-loyer-'+i)?.value)||r.loyer;
    const sal = parseFloat(document.getElementById('compx-sal-'+i)?.value)||r.salaires;
    const prod = parseFloat(document.getElementById('compx-prod-'+i)?.value)||r.produits;
    const res = ca - loyer - sal - prod;
    totalCA+=ca; totalCh+=(loyer+sal+prod);
    const resEl = document.getElementById('compx-res-'+i);
    if(resEl) { resEl.textContent = res+' €'; resEl.style.color = res>0?'var(--accent2)':'var(--accent4)'; }
  });
  document.getElementById('compta-ca').textContent = totalCA.toLocaleString()+' €';
  document.getElementById('compta-charges').textContent = totalCh.toLocaleString()+' €';
  document.getElementById('compta-net').textContent = (totalCA-totalCh).toLocaleString()+' €';
}

function renderCharges() {
  const list = document.getElementById('charges-list');
  list.innerHTML = '';
  CHARGES.forEach((c,i) => {
    list.innerHTML += `<div class="chr" id="chr-${i}">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:18px;">${c.c}</span>
        <div>
          <input id="cn-${i}" value="${c.n}" style="font-size:13px;font-weight:600;border:1px solid var(--border);background:var(--bg3);color:var(--text);font-family:inherit;width:200px;border-radius:6px;padding:4px 8px;">
          <div style="font-size:11px;color:var(--muted);margin-top:4px;">Échéance : <input id="ce-${i}" value="${c.e}" style="font-size:11px;border:1px solid var(--border);background:var(--bg3);color:var(--muted);font-family:inherit;width:100px;border-radius:6px;padding:3px 6px;"></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="text-align:right;">
          <div style="display:flex;align-items:center;gap:4px;justify-content:flex-end;">
            <input id="cm-${i}" value="${c.m}" type="number" style="font-size:14px;font-weight:700;color:${c.s==='paid'?'var(--accent2)':'var(--accent3)'};border:1px solid var(--border);background:var(--bg3);font-family:inherit;width:90px;border-radius:6px;padding:4px 8px;text-align:right;">
            <span style="font-size:14px;font-weight:700;">€</span>
          </div>
          <div style="margin-top:4px;"><span class="badge ${c.s==='paid'?'gr':'yl'}">${c.s==='paid'?'✓ Payé':'⏳ À payer'}</span></div>
        </div>
        <button class="btn btn-sm btn-p" onclick="saveCharge(${i})">💾</button>
        <button class="btn btn-sm ${c.s==='paid'?'btn-o':'btn-g'}" onclick="toggleCharge(${i},this)">${c.s==='paid'?'Marqué payé':'Encaisser'}</button>
        <button class="btn btn-sm btn-r" onclick="CHARGES.splice(${i},1);renderCharges();saveAll();">🗑️</button>
      </div>
    </div>`;
  });
}

function saveCharge(i) {
  CHARGES[i].n = document.getElementById('cn-'+i).value;
  CHARGES[i].e = document.getElementById('ce-'+i).value;
  CHARGES[i].m = parseFloat(document.getElementById('cm-'+i).value)||0;
  saveAll();
}

function toggleCharge(i,btn) {
  // Capture current values before toggling
  if(document.getElementById('cn-'+i)) {
    CHARGES[i].n = document.getElementById('cn-'+i).value;
    CHARGES[i].e = document.getElementById('ce-'+i).value;
    CHARGES[i].m = parseFloat(document.getElementById('cm-'+i).value)||0;
  }
  CHARGES[i].s = CHARGES[i].s==='paid'?'due':'paid';
  renderCharges();
  saveAll();
}

function addCharge() {
  const nom=document.getElementById('nc-nom').value;
  const montant=parseFloat(document.getElementById('nc-montant').value)||0;
  const cat=document.getElementById('nc-cat').value;
  const ech=document.getElementById('nc-ech').value;
  if(!nom) return;
  CHARGES.push({n:nom,m:montant,e:ech||'—',s:'due',c:cat.split(' ')[0]});
  renderCharges();
  closeModal('m-charge');
  saveAll();
}

function renderAssurances() {
  const list = document.getElementById('assurances-list');
  list.innerHTML = '';
  ASSURANCES.forEach((a,i) => {
    const urgent = a.jours<30;
    list.innerHTML += `<div class="ass-card">
      <div class="ass-icon" style="background:${urgent?'#FEF3C7':'#DCFCE7'};">🛡️</div>
      <div style="flex:1;">
        <input id="ass-nom-${i}" value="${a.nom}" style="font-size:14px;font-weight:700;border:1px solid var(--border);background:var(--bg3);color:var(--text);font-family:inherit;width:100%;border-radius:6px;padding:4px 8px;margin-bottom:4px;">
        <div style="font-size:12px;color:var(--muted);">Assureur : <input id="ass-assureur-${i}" value="${a.assureur}" style="font-size:12px;border:1px solid var(--border);background:var(--bg3);color:var(--muted);font-family:inherit;width:120px;border-radius:6px;padding:3px 6px;"> · Centres : ${a.centres}</div>
      </div>
      <div style="text-align:center;min-width:100px;">
        <div style="font-size:16px;font-weight:800;color:${urgent?'var(--accent3)':'var(--accent2)'};">${a.jours}j</div>
        <div style="font-size:10px;color:var(--muted);">avant expiration</div>
        <span class="badge ${urgent?'yl':'gr'}" style="margin-top:4px;display:inline-block;">${a.expiration}</span>
      </div>
      <div style="text-align:right;min-width:100px;">
        <div style="display:flex;align-items:center;gap:4px;justify-content:flex-end;">
          <input id="ass-montant-${i}" value="${a.montant}" type="number" style="font-size:14px;font-weight:700;border:1px solid var(--border);background:var(--bg3);font-family:inherit;width:80px;border-radius:6px;padding:4px 8px;text-align:right;"> €
        </div>
        <div style="font-size:10px;color:var(--muted);">/an</div>
        <div style="display:flex;gap:4px;margin-top:6px;justify-content:flex-end;">
          <button class="btn btn-sm btn-p" onclick="saveAssurance(${i})">💾</button>
          <button class="btn btn-sm btn-r" onclick="ASSURANCES.splice(${i},1);renderAssurances();saveAll();">🗑️</button>
        </div>
      </div>
    </div>`;
  });
}

function saveAssurance(i) {
  ASSURANCES[i].nom = document.getElementById('ass-nom-'+i).value;
  ASSURANCES[i].assureur = document.getElementById('ass-assureur-'+i).value;
  ASSURANCES[i].montant = parseFloat(document.getElementById('ass-montant-'+i).value)||0;
  saveAll();
}

function addAssurance() {
  const nom=document.getElementById('na-nom').value;
  const assureur=document.getElementById('na-assureur').value;
  const montant=parseFloat(document.getElementById('na-montant').value)||0;
  const exp=document.getElementById('na-exp').value;
  const centres=document.getElementById('na-centres').value;
  if(!nom) return;
  const today=new Date();
  const expDate=new Date(exp);
  const jours=Math.max(0,Math.round((expDate-today)/(1000*60*60*24)));
  ASSURANCES.push({nom,assureur,montant,expiration:exp,centres:centres||'Tous',jours,couleur:jours<30?'#D97706':'#16A34A'});
  renderAssurances();
  closeModal('m-assurance');
  saveAll();
}

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
const TITLES={dashboard:"Dashboard",centres:"Centres",fiche:"Fiche Centre",techniciens:"Gestion des techniciens","fiche-tech":"Fiche Technicien",planning:"Planning",cra:"CRA",rapport:"Rapport mensuel",stock:"Stock & Produits",comptabilite:"Comptabilité",charges:"Charges fixes",assurances:"Assurances",prestations:"Prestations",documents:"Documents",telephone:"📱 Téléphone & Box Internet","badgeuse-view":"Badgeuse — Temps réel",technovap:"♨️ Technovap — Machines à vapeur",westfield:"🏬 Westfield / Indigo",caisse:"💵 Fermeture de caisse"};

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
  // BOX
  const bt = document.getElementById('box-tbody');
  bt.innerHTML = '';
  BOX_DATA.forEach((b,i) => {
    if (!b.identifiant) b.identifiant = '';
    if (!b.mdp) b.mdp = '';
    if (!b.lien) b.lien = '';
    bt.innerHTML += `<tr>
      <td><input id="bc-${i}" value="${b.centre}" style="font-weight:700;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:13px;font-family:inherit;width:120px;" onchange="BOX_DATA[${i}].centre=this.value;"></td>
      <td><input id="bo-${i}" value="${b.operateur}" style="border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:13px;font-family:inherit;width:90px;" onchange="BOX_DATA[${i}].operateur=this.value;"></td>
      <td><input id="bl-${i}" value="${b.ligne}" style="font-family:monospace;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:12px;width:110px;" onchange="BOX_DATA[${i}].ligne=this.value;"></td>
      <td><span class="secret" onclick="toggleSec(this)" data-v="${b.wifi||''}">${'●'.repeat(Math.max((b.wifi||'').length,1))}</span></td>
      <td><input id="bid-${i}" value="${b.identifiant}" placeholder="identifiant" style="border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:12px;font-family:inherit;width:110px;" onchange="BOX_DATA[${i}].identifiant=this.value;"></td>
      <td><span class="secret" onclick="toggleSec(this)" data-v="${b.mdp||'●●●●●●●●'}">${'●'.repeat(Math.max(b.mdp?.length||8,4))}</span>
        <input id="bmp-${i}" value="${b.mdp}" placeholder="mot de passe" type="password" style="border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:12px;font-family:inherit;width:110px;" onchange="BOX_DATA[${i}].mdp=this.value;"></td>
      <td><input id="br-${i}" value="${b.renouvellement}" style="color:var(--accent3);border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:12px;font-family:inherit;width:70px;" onchange="BOX_DATA[${i}].renouvellement=this.value;"></td>
      <td><input id="bm-${i}" value="${b.mensuel}" style="color:var(--accent2);font-weight:700;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:12px;font-family:inherit;width:60px;" onchange="BOX_DATA[${i}].mensuel=this.value;"></td>
      <td><div style="display:flex;gap:4px;align-items:center;">
        <input id="bln-${i}" value="${b.lien}" placeholder="https://..." style="border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:11px;font-family:inherit;width:100px;" onchange="BOX_DATA[${i}].lien=this.value;">
        ${b.lien ? `<button class="btn btn-sm btn-o" onclick="openUrl('${b.lien}')" title="Ouvrir">↗</button>` : ''}
      </div></td>
      <td><button class="btn btn-sm btn-r" onclick="BOX_DATA.splice(${i},1);renderTelephone();saveAll();">🗑️</button></td>
    </tr>`;
  });

  // TEL
  const tt = document.getElementById('tel-tbody');
  tt.innerHTML = '';
  TEL_DATA.forEach((t,i) => {
    tt.innerHTML += `<tr>
      <td><input id="tn-${i}" value="${t.nom}" style="font-weight:700;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:13px;font-family:inherit;width:130px;" onchange="TEL_DATA[${i}].nom=this.value;"></td>
      <td><input id="tnu-${i}" value="${t.numero}" style="font-family:monospace;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:13px;width:130px;" onchange="TEL_DATA[${i}].numero=this.value;"></td>
      <td><input id="top-${i}" value="${t.operateur}" style="border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:13px;font-family:inherit;width:80px;" onchange="TEL_DATA[${i}].operateur=this.value;"></td>
      <td><input id="tf-${i}" value="${t.forfait}" style="border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:13px;font-family:inherit;width:80px;" onchange="TEL_DATA[${i}].forfait=this.value;"></td>
      <td><input id="tr-${i}" value="${t.renouvellement}" style="color:var(--accent3);border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:13px;font-family:inherit;width:80px;" onchange="TEL_DATA[${i}].renouvellement=this.value;"></td>
      <td><input id="tm-${i}" value="${t.mensuel}" style="color:var(--accent2);font-weight:700;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-size:13px;font-family:inherit;width:70px;" onchange="TEL_DATA[${i}].mensuel=this.value;"></td>
      <td><button class="btn btn-sm btn-r" onclick="TEL_DATA.splice(${i},1);renderTelephone();saveAll();">🗑️</button></td>
    </tr>`;
  });

  // EXTRA
  const er = document.getElementById('tel-extra-rows');
  er.innerHTML = '';
  EXTRA_ROWS.forEach((r,i) => {
    er.innerHTML += `<div style="display:flex;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">
      <input value="${r.label}" placeholder="Libellé" style="flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:7px 10px;font-size:13px;color:var(--text);font-family:inherit;outline:none;" oninput="EXTRA_ROWS[${i}].label=this.value">
      <input value="${r.valeur}" placeholder="Valeur" style="flex:2;background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:7px 10px;font-size:13px;color:var(--text);font-family:inherit;outline:none;" oninput="EXTRA_ROWS[${i}].valeur=this.value">
      <button class="btn btn-sm btn-r" onclick="EXTRA_ROWS.splice(${i},1);renderTelephone();saveAll();">🗑️</button>
    </div>`;
  });
}

function addBoxRow() {
  BOX_DATA.push({centre:"Nouveau centre", operateur:"", ligne:"", wifi:"", renouvellement:"", mensuel:"0 €"});
  renderTelephone();
}

function addTelRow() {
  TEL_DATA.push({nom:"Nouveau", numero:"", operateur:"", forfait:"", renouvellement:"", mensuel:"0 €"});
  renderTelephone();
}

function addExtraRow() {
  EXTRA_ROWS.push({label:"", valeur:""});
  renderTelephone();
}

// ── BADGEUSE VIEW ──────────────────────────────────────────────────────────
async function refreshBadgeuse() {
  const tb = document.getElementById('bdg-tbody');
  tb.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px;">⏳ Chargement depuis Firebase...</td></tr>';

  const today = new Date();
  const dateStr = String(today.getDate()).padStart(2,'0') + '/' + String(today.getMonth()+1).padStart(2,'0') + '/' + today.getFullYear();

  let todayLog = [];
  if (window.loadBadgeages) {
    try { todayLog = await window.loadBadgeages(); } catch(e) {}
  }
  if (todayLog.length === 0) {
    const log = JSON.parse(localStorage.getItem('dw_log') || '[]');
    todayLog = log.filter(l => l.date === dateStr);
  }

  // La sync CRA est gérée par syncAllBadgeages() — pas par refreshBadgeuse
  // syncBadgeagesToCRA(todayLog); // supprimé

  const uniq = [...new Set(todayLog.map(l=>l.nom))];
  const centres = [...new Set(todayLog.map(l=>l.centreBadge))];
  document.getElementById('bdg-presents').textContent = uniq.length;
  document.getElementById('bdg-badges').textContent = todayLog.length;
  document.getElementById('bdg-centres').textContent = centres.length;

  if (todayLog.length === 0) {
    tb.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px;">Aucun badgeage aujourd\'hui</td></tr>';
    return;
  }

  // Stocker les badges en mémoire pour édition
  window._currentBadges = todayLog;

  tb.innerHTML = '';
  // Grouper par technicien pour afficher arrivée et départ sur une ligne
  const grouped = {};
  todayLog.forEach((l, idx) => {
    if (!grouped[l.nom]) grouped[l.nom] = { arrivee: null, depart: null, entry: l, idx };
    if (l.type === 'depart') { grouped[l.nom].depart = l; }
    else { grouped[l.nom].arrivee = l; grouped[l.nom].entry = l; grouped[l.nom].idx = idx; }
  });
  Object.values(grouped).forEach(({ arrivee, depart, entry, idx }) => {
    const l = entry;
    const isMobile = l.centreBadge !== l.centreHabituel;
    const heureArrivee = arrivee ? `<span style="font-weight:700;color:#16A34A;">${arrivee.time}</span>` : '<span style="color:var(--muted);">—</span>';
    const heureDepart = depart ? `<span style="font-weight:700;color:#DC2626;">${depart.time}</span>` : '<span style="color:var(--muted);">—</span>';
    tb.innerHTML += `<tr>
      <td style="font-weight:700;">${l.nom}</td>
      <td style="font-weight:600;color:var(--accent);">${l.centreBadge}</td>
      <td style="color:var(--muted);">${l.centreHabituel||l.centreBadge}</td>
      <td>${heureArrivee}</td>
      <td>${heureDepart}</td>
      <td style="color:var(--muted);font-size:12px;">${l.date}</td>
      <td>${isMobile ? '<span class="badge yl">⚡ Mobile</span>' : '<span class="badge gr">✓ Habituel</span>'}</td>
      <td style="display:flex;gap:6px;">
        <button onclick="editBadge(${idx})" style="background:#EFF6FF;border:1px solid #DBEAFE;border-radius:7px;padding:4px 10px;cursor:pointer;color:#2563EB;font-size:12px;font-weight:600;">✏️</button>
        <button onclick="deleteBadge(${idx})" style="background:#FEE2E2;border:1px solid #FECACA;border-radius:7px;padding:4px 10px;cursor:pointer;color:#DC2626;font-size:12px;font-weight:600;">🗑️</button>
      </td>
    </tr>`;
  });
}

function editBadge(idx) {
  const badge = (window._currentBadges||[])[idx];
  if (!badge) return;
  let existing = document.getElementById('m-badge-edit');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'm-badge-edit';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;';
  modal.innerHTML = `
    <div style="background:var(--bg2);border-radius:16px;padding:24px;max-width:420px;width:90%;box-shadow:0 8px 40px rgba(0,0,0,0.3);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <div style="font-size:16px;font-weight:800;">✏️ Modifier le badge</div>
        <button onclick="document.getElementById('m-badge-edit').remove()" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--muted);">✕</button>
      </div>
      <div class="field"><label>Technicien</label>
        <select id="be-nom" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:13px;background:var(--bg3);font-family:inherit;">
          ${TECHS.map(t=>`<option value="${t.nom}" ${t.nom===badge.nom?'selected':''}>${t.nom}</option>`).join('')}
        </select>
      </div>
      <div class="field"><label>Centre badgé</label>
        <select id="be-centre" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:13px;background:var(--bg3);font-family:inherit;">
          <option ${badge.centreBadge==='Aeroville A'?'selected':''}>Aeroville A</option>
          <option ${badge.centreBadge==='Aeroville B'?'selected':''}>Aeroville B</option>
          <option ${badge.centreBadge==='Lafayette Rouge'?'selected':''}>Lafayette Rouge</option>
          <option ${badge.centreBadge==='Lafayette Vert'?'selected':''}>Lafayette Vert</option>
          <option ${badge.centreBadge==='Cité des Sciences'?'selected':''}>Cité des Sciences</option>
          <option ${badge.centreBadge==='Le Parks'?'selected':''}>Le Parks</option>
          <option ${badge.centreBadge==='Parly2'?'selected':''}>Parly2</option>
          <option ${badge.centreBadge==='Belleville'?'selected':''}>Belleville</option>
          <option ${badge.centreBadge==='Suresnes'?'selected':''}>Suresnes</option>
        </select>
      </div>
      <div style="display:flex;gap:8px;" class="field">
        <div style="flex:1;"><label>Heure</label><input id="be-time" value="${badge.time}" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:13px;background:var(--bg3);" placeholder="HH:MM"></div>
        <div style="flex:1;"><label>Date</label><input id="be-date" value="${badge.date}" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:13px;background:var(--bg3);" placeholder="JJ/MM/AAAA"></div>
      </div>
      <div class="mac">
        <button class="btn btn-o" style="flex:1;justify-content:center;" onclick="document.getElementById('m-badge-edit').remove()">Annuler</button>
        <button class="btn btn-p" style="flex:1;justify-content:center;" onclick="saveBadgeEdit(${idx})">✅ Enregistrer</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

async function saveBadgeEdit(idx) {
  const badges = window._currentBadges || [];
  if (!badges[idx]) return;
  const old = {...badges[idx]};
  badges[idx].nom = document.getElementById('be-nom').value;
  badges[idx].centreBadge = document.getElementById('be-centre').value;
  badges[idx].time = document.getElementById('be-time').value;
  badges[idx].date = document.getElementById('be-date').value;
  const b = badges[idx];

  showNotif('🔄 Modification en cours...', '#7C3AED');

  // 1. Supprimer l'ancien badge Firebase
  if (window.deleteBadgeFromFirebase && old.timestamp) {
    await window.deleteBadgeFromFirebase(old.nom, old.timestamp);
  }

  // 2. Ajouter le nouveau badge Firebase
  b.timestamp = b.timestamp || Date.now();
  if (window.addBadgeToFirebase) await window.addBadgeToFirebase(b);

  // 3. Mettre à jour CRA_DATA
  if (old.nom !== b.nom || old.date !== b.date) {
    // Supprimer l'ancien
    if (CRA_DATA[old.nom]?.[old.date]) delete CRA_DATA[old.nom][old.date];
  }
  if (!CRA_DATA[b.nom]) CRA_DATA[b.nom] = {};
  CRA_DATA[b.nom][b.date] = b.centreBadge;

  // 4. Sauvegarder CRA dans Firebase
  if (window._markCRASave) window._markCRASave(); if (window.saveToFirebase) await window.saveToFirebase('cra_data', CRA_DATA);
  saveLocal();

  document.getElementById('m-badge-edit')?.remove();

  // 5. Tout re-rendre
  await refreshBadgeuse();
  renderCRA();
  renderRapport();
  renderDashboard();

  showNotif('✅ Badge modifié — CRA et Rapport mis à jour', '#16A34A');
}

async function deleteBadge(idx) {
  const badges = window._currentBadges || [];
  const b = badges[idx];
  if (!b) return;
  if (!confirm(`Supprimer le badge de ${b.nom} (${b.date} ${b.time}) ?`)) return;

  showNotif('🔄 Suppression en cours...', '#DC2626');

  // 1. Supprimer de Firebase badgeages
  if (window.deleteBadgeFromFirebase && b.timestamp) {
    const ok = await window.deleteBadgeFromFirebase(b.nom, b.timestamp);
    if (!ok) console.log('⚠️ Badge non trouvé dans Firebase — suppression locale uniquement');
  }

  // 2. Supprimer du CRA_DATA
  if (CRA_DATA[b.nom]?.[b.date]) {
    // Vérifier s'il y a d'autres badges ce jour pour ce technicien
    const autresBadgesCeJour = (window._currentBadges||[]).filter(
      (x,i) => i !== idx && x.nom === b.nom && x.date === b.date
    );
    if (autresBadgesCeJour.length === 0) {
      delete CRA_DATA[b.nom][b.date];
    }
  }

  // 3. Sauvegarder CRA dans Firebase
  if (window._markCRASave) window._markCRASave(); if (window.saveToFirebase) await window.saveToFirebase('cra_data', CRA_DATA);
  saveLocal();

  // 4. Supprimer du cache local
  badges.splice(idx, 1);
  window._currentBadges = badges;

  // 5. Tout re-rendre
  await refreshBadgeuse();
  renderCRA();
  renderRapport();
  renderDashboard();

  showNotif(`🗑️ Badge supprimé — CRA et Rapport mis à jour`, '#DC2626');
}

// ═══ SYNCHRONISATION BADGEUSE → CRA ═══════════════════════════
async function syncAllBadgeages() {
  try {
    if (!window.getAllBadgeages) return;
    const allBadges = await window.getAllBadgeages();
    if (allBadges.length === 0) return;

    const NOMS_VALIDES = new Set(TECHS.map(t => t.nom));

    // Charger le CRA actuel depuis Firebase (source de vérité pour les suppressions manuelles)
    const fbCRA = await window.loadFromFirebase('cra_data');

    // Construire CRA depuis les badges (uniquement vrais techniciens)
    const craFromBadges = {};
    allBadges.forEach(b => {
      if (!b.nom || !b.date || !NOMS_VALIDES.has(b.nom)) return;
      if (!craFromBadges[b.nom]) craFromBadges[b.nom] = {};
      craFromBadges[b.nom][b.date] = b.centreBadge || b.centreHabituel || '—';
    });

    // Fusionner Firebase CRA + tous les badges
    const newCRA = {};

    // 1. Partir de Firebase CRA (inclut saisies manuelles)
    if (fbCRA) {
      Object.keys(fbCRA).forEach(nom => {
        if (NOMS_VALIDES.has(nom)) newCRA[nom] = {...fbCRA[nom]};
      });
    }

    // 2. Ajouter TOUS les badges sans exception
    Object.keys(craFromBadges).forEach(nom => {
      if (!newCRA[nom]) newCRA[nom] = {};
      Object.keys(craFromBadges[nom]).forEach(date => {
        newCRA[nom][date] = craFromBadges[nom][date];
      });
    });

    // Remplacer CRA_DATA
    Object.keys(CRA_DATA).forEach(k => delete CRA_DATA[k]);
    Object.keys(newCRA).forEach(k => { CRA_DATA[k] = newCRA[k]; });

    // Mettre à jour jours techniciens
    const now = new Date();
    const moisCourant = String(now.getMonth()+1).padStart(2,'0') + '/' + now.getFullYear();
    TECHS.forEach((t, i) => {
      TECHS[i].jours = CRA_DATA[t.nom] ? Object.keys(CRA_DATA[t.nom]).filter(d => d.endsWith(moisCourant)).length : 0;
    });

    // Sauvegarder
    if (window._markCRASave) window._markCRASave();
    if (window.saveToFirebase) await window.saveToFirebase('cra_data', CRA_DATA);
    saveLocal();

    renderCRA(); renderRapport(); renderDashboard();
    // Forcer l'affichage si on est sur la page CRA
    const activePage = document.querySelector('.page.active');
    if (activePage?.id === 'page-cra') renderCRA();
    if (activePage?.id === 'page-rapport') renderRapport();
    showNotif('✅ CRA synchronisé — ' + Object.keys(CRA_DATA).length + ' techniciens', '#16A34A');
    console.log('✅ Sync :', allBadges.length, 'badges →', Object.keys(CRA_DATA).length, 'techniciens');
  } catch(e) {
    console.log('Erreur sync:', e.message);
  }
}

function syncBadgeagesToCRA(badges) {
  if (!badges?.length) return;
  badges.forEach(b => {
    if (!b.nom || !b.date) return;
    if (!CRA_DATA[b.nom]) CRA_DATA[b.nom] = {};
    CRA_DATA[b.nom][b.date] = b.centreBadge || b.centreHabituel;
  });
  // Mettre à jour jours du mois courant
  const now = new Date();
  const moisCourant = String(now.getMonth()+1).padStart(2,'0') + '/' + now.getFullYear();
  TECHS.forEach((t, i) => {
    if (CRA_DATA[t.nom]) {
      const joursMois = Object.keys(CRA_DATA[t.nom]).filter(d => d.endsWith(moisCourant)).length;
      if (joursMois > 0) TECHS[i].jours = joursMois;
    }
  });
  renderCRA();
  renderRapport();
}

function go(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const a=document.querySelector(`.nav-item[onclick="go('${id}')"]`);
  if(a)a.classList.add('active');
  document.getElementById('page-title').textContent=TITLES[id]||id;
  document.getElementById('np').style.display='none';
  notifOpen=false;
  if(id==='telephone') renderTelephone();
  if(id==='badgeuse-view') refreshBadgeuse();
  if(id==='caisse') refreshCaisse();
  if(id==='cra') syncAllBadgeages();
  if(id==='technovap') renderTechnovap();
  if(id==='westfield') renderWestfield();
}
function toggleSec(el){const v=el.dataset.v;el.textContent=el.textContent.includes('●')?v:'●'.repeat(v.length);el.style.color=el.textContent.includes('●')?'':'var(--accent)';}
function setFbtn(b){document.querySelectorAll('.fbtn').forEach(x=>x.classList.remove('active'));b.classList.add('active');}
function openUrl(u){window.open(u,'_blank');}
function openModal_carpolish_stock(id) {
  if(id==='m-carpolish'){
    document.getElementById('bdc-date').value = new Date().toISOString().split('T')[0];
    BDC_LINES = [{code:'', nom:'', qte:1, pu:0}];
    renderBdcLines();
  }
  if(id==='m-stock'){ populateCatalogue(); }
}

function populateCatalogue() {
  const sel = document.getElementById('ns-catalogue');
  if (!sel || sel.options.length > 2) return; // Already populated
  sel.innerHTML = '<option value="">— Choisir dans le catalogue —</option>';
  const cats = ['Produit','Matériel','Accessoire'];
  const icons = {'Produit':'🧴','Matériel':'🔧','Accessoire':'🧹'};
  cats.forEach(cat => {
    const group = document.createElement('optgroup');
    group.label = icons[cat] + ' ' + cat + 's';
    CARPOLISH_PRODUITS.filter(p => p.cat === cat).forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.code;
      opt.textContent = '[' + p.code + '] ' + p.nom + ' — ' + p.prix + '€';
      group.appendChild(opt);
    });
    sel.appendChild(group);
  });
  const autre = document.createElement('option');
  autre.value = 'autre';
  autre.textContent = '✏️ Autre produit...';
  sel.appendChild(autre);
}
function closeModal(id){document.getElementById(id).style.display='none';}
function addTech(){const nom=document.getElementById('nt-nom').value,centre=document.getElementById('nt-centre').value,tel=document.getElementById('nt-tel').value,contrat=document.getElementById('nt-contrat').value;if(!nom)return;TECHS.push({nom,centre,contrat,tel,jours:0,color:'#2563EB'});renderTechs();renderDashboard();closeModal('m-tech');saveAll();}
let notifOpen=false;
function toggleNotif(){notifOpen=!notifOpen;document.getElementById('np').style.display=notifOpen?'block':'none';}
document.addEventListener('click',e=>{if(!e.target.closest('.nb-btn')&&!e.target.closest('.np')){document.getElementById('np').style.display='none';notifOpen=false;}});
function craNav(d){craDay=Math.max(0,Math.min(4,craDay+d));document.getElementById('cra-date-lbl').textContent=CRA_DATES[craDay];}
function copyCRA(){alert('Planning copié ! Vous pouvez le coller dans la semaine suivante.');}
function exportCSV(){
  const cnames=CENTRES.map(c=>c.nom);
  let csv='Technicien,Jours Présent,'+cnames.join(',')+'\n';
  TECHS.forEach(t=>{csv+=`${t.nom},${t.jours},${cnames.map(cn=>t.centre===cn?t.jours:0).join(',')}\n`;});
  const blob=new Blob([csv],{type:'text/csv'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`dreamwash-rapport-${MOIS_NOMS[rapportMoisIdx].toLowerCase()}-2026.csv`;
  a.click();
}

// ═══════════════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════════════
// ancienne fonction remplacée

// ═══════════════════════════════════════════════════════════════
// SAUVEGARDE LOCALE (localStorage) — toujours disponible
// ═══════════════════════════════════════════════════════════════
function saveLocal() {
  const data = {
    TECHS, CENTRES, CHARGES, ASSURANCES, STOCK,
    BOX_DATA, TEL_DATA, EXTRA_ROWS, COMPTA, PLANNING,
    // ⚠️ CRA_DATA NON SAUVEGARDÉ localement — Firebase est la source de vérité
    TECHNOVAP_MACHINES, WESTFIELD_CONTACTS, WESTFIELD_CONTRATS,
    CARPOLISH_CONTACT, CUSTOM_DOCS,
    prestations: capturePresta()
  };
  try {
    localStorage.setItem('dw_portail', JSON.stringify(data));
    return true;
  } catch(e) { return false; }
}

function loadLocal() {
  try {
    const raw = localStorage.getItem('dw_portail');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch(e) { return null; }
}

function capturePresta() {
  const ids = ['p-s-ext','p-s-int','p-s-comp','p-m-ext','p-m-int','p-m-comp','p-l-ext','p-l-int','p-l-comp','p-xl-ext','p-xl-int','p-xl-comp'];
  const d = {};
  ids.forEach(id => { const el = document.getElementById(id); if(el) d[id] = parseFloat(el.value)||0; });
  return d;
}

// ═══════════════════════════════════════════════════════════════
// CAPTURE tous les inputs avant sauvegarde
// ═══════════════════════════════════════════════════════════════
function captureAll() {
  // Techniciens
  TECHS.forEach((t, i) => {
    const n = document.getElementById('tnom-'+i);
    const tel = document.getElementById('ttel-'+i);
    if (n) TECHS[i].nom = n.value;
    if (tel) TECHS[i].tel = tel.value;
  });
  // Centres
  CENTRES.forEach((c, i) => {
    ['cnom','ctel','cwifi'].forEach(pre => {
      const el = document.getElementById(pre+'-'+i);
      if (el) {
        if (pre==='cnom') CENTRES[i].nom = el.value;
        if (pre==='ctel') CENTRES[i].tel = el.value;
        if (pre==='cwifi') CENTRES[i].wifi = el.value;
      }
    });
    const l = document.getElementById('cloyer-'+i);
    if (l) CENTRES[i].loyer = parseFloat(l.value)||CENTRES[i].loyer;
  });
  // Charges
  CHARGES.forEach((c, i) => {
    const n = document.getElementById('cn-'+i);
    const e = document.getElementById('ce-'+i);
    const m = document.getElementById('cm-'+i);
    if (n) CHARGES[i].n = n.value;
    if (e) CHARGES[i].e = e.value;
    if (m) CHARGES[i].m = parseFloat(m.value)||0;
  });
  // Assurances
  ASSURANCES.forEach((a, i) => {
    const n = document.getElementById('ass-nom-'+i);
    const as = document.getElementById('ass-assureur-'+i);
    const m = document.getElementById('ass-montant-'+i);
    if (n) ASSURANCES[i].nom = n.value;
    if (as) ASSURANCES[i].assureur = as.value;
    if (m) ASSURANCES[i].montant = parseFloat(m.value)||0;
  });
  // Stock
  STOCK.forEach((s, i) => {
    ['sd','sc','sp','sq','spu'].forEach(pre => {
      const el = document.getElementById(pre+'-'+i);
      if (el) {
        if (pre==='sd') STOCK[i].date = el.value;
        if (pre==='sc') STOCK[i].centre = el.value;
        if (pre==='sp') STOCK[i].produit = el.value;
        if (pre==='sq') STOCK[i].qte = parseInt(el.value)||0;
        if (pre==='spu') STOCK[i].pu = parseFloat(el.value)||0;
      }
    });
  });
  // Box
  BOX_DATA.forEach((b, i) => {
    ['bc','bo','bl','br','bm','bid','bln'].forEach(pre => {
      const el = document.getElementById(pre+'-'+i);
      if (el) {
        if (pre==='bc') BOX_DATA[i].centre = el.value;
        if (pre==='bo') BOX_DATA[i].operateur = el.value;
        if (pre==='bl') BOX_DATA[i].ligne = el.value;
        if (pre==='br') BOX_DATA[i].renouvellement = el.value;
        if (pre==='bm') BOX_DATA[i].mensuel = el.value;
        if (pre==='bid') BOX_DATA[i].identifiant = el.value;
        if (pre==='bln') BOX_DATA[i].lien = el.value;
      }
    });
    const bmpEl = document.getElementById('bmp-'+i);
    if (bmpEl && bmpEl.value) BOX_DATA[i].mdp = bmpEl.value;
  });
  // Tel
  TEL_DATA.forEach((t, i) => {
    ['tn','tnu','top','tf','tr','tm'].forEach(pre => {
      const el = document.getElementById(pre+'-'+i);
      if (el) {
        if (pre==='tn') TEL_DATA[i].nom = el.value;
        if (pre==='tnu') TEL_DATA[i].numero = el.value;
        if (pre==='top') TEL_DATA[i].operateur = el.value;
        if (pre==='tf') TEL_DATA[i].forfait = el.value;
        if (pre==='tr') TEL_DATA[i].renouvellement = el.value;
        if (pre==='tm') TEL_DATA[i].mensuel = el.value;
      }
    });
  });
  // Compta
  COMPTA.forEach((r, i) => {
    const ca = document.getElementById('compx-ca-'+i);
    const lo = document.getElementById('compx-loyer-'+i);
    const sa = document.getElementById('compx-sal-'+i);
    const pr = document.getElementById('compx-prod-'+i);
    if (ca) COMPTA[i].ca = parseFloat(ca.value)||0;
    if (lo) COMPTA[i].loyer = parseFloat(lo.value)||0;
    if (sa) COMPTA[i].salaires = parseFloat(sa.value)||0;
    if (pr) COMPTA[i].produits = parseFloat(pr.value)||0;
  });

  // CRA — capturer état des cercles
  const craCircles = document.querySelectorAll('.cra-circle');
  if (craCircles.length > 0) {
    const craState = {};
    craCircles.forEach((el, i) => { craState['c'+i] = el.classList.contains('present') ? 1 : 0; });
    try { localStorage.setItem('dw_cra_state', JSON.stringify(craState)); } catch(e) {}
  }
}

// ═══════════════════════════════════════════════════════════════
// SAVE ALL — localStorage d'abord, Firebase ensuite
// ═══════════════════════════════════════════════════════════════
async function saveAll() {
  captureAll();

  // 1. Sauvegarder en local IMMÉDIATEMENT
  const localOk = saveLocal();

  // 2. Sauvegarder sur Firebase en arrière-plan
  let firebaseOk = false;
  if (window.saveToFirebase) {
    try {
      // Marquer pour éviter boucle listener
      if (window._markPortailSave) window._markPortailSave();
      const prestaData = capturePresta();
      await Promise.all([
        window.saveToFirebase('techs', TECHS),
        window.saveToFirebase('centres', CENTRES),
        window.saveToFirebase('charges', CHARGES),
        window.saveToFirebase('assurances', ASSURANCES),
        window.saveToFirebase('stock', STOCK),
        window.saveToFirebase('box', BOX_DATA),
        window.saveToFirebase('tel', TEL_DATA),
        window.saveToFirebase('extra', EXTRA_ROWS),
        window.saveToFirebase('compta', COMPTA),
        window.saveToFirebase('prestations', prestaData),
        window.saveToFirebase('planning', PLANNING),
        window.saveToFirebase('cra_data', CRA_DATA),
        window.saveToFirebase('technovap', TECHNOVAP_MACHINES),
        window.saveToFirebase('westfield_contacts', WESTFIELD_CONTACTS),
        window.saveToFirebase('westfield_contrats', WESTFIELD_CONTRATS),
        window.saveToFirebase('carpolish_contact', CARPOLISH_CONTACT),
      ]);
      firebaseOk = true;
    } catch(e) {
      console.log('Firebase save error:', e.message);
    }
  }

  if (localOk && firebaseOk) showNotif('✅ Sauvegardé (local + cloud) !', '#16A34A');
  else if (localOk) showNotif('✅ Sauvegardé en local !', '#D97706');
  else showNotif('❌ Erreur sauvegarde', '#DC2626');
}

function showNotif(msg, color='#16A34A') {
  document.querySelectorAll('.dw-notif').forEach(n => n.remove());
  const notif = document.createElement('div');
  notif.className = 'dw-notif';
  notif.style.cssText = `position:fixed;bottom:20px;right:20px;background:${color};color:#fff;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:700;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.2);transition:opacity .3s;`;
  notif.textContent = msg;
  document.body.appendChild(notif);
  setTimeout(() => { notif.style.opacity='0'; setTimeout(() => notif.remove(), 300); }, 3000);
}

// ═══════════════════════════════════════════════════════════════
// INIT — Firebase prioritaire, localStorage pour affichage immédiat
// ═══════════════════════════════════════════════════════════════
async function init() {
  const loader = document.createElement('div');
  loader.id = 'dw-loader';
  loader.style.cssText = 'position:fixed;inset:0;background:rgba(255,255,255,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;';
  loader.innerHTML = '<div style="font-size:36px;">💧</div><div style="font-size:15px;font-weight:700;color:#2563EB;">Chargement Dreamwash...</div>';
  document.body.appendChild(loader);

  // ⚠️ localStorage ignoré au démarrage — Firebase est la source de vérité
  // Les données locales peuvent être obsolètes sur d'autres appareils
  console.log('✅ Chargement depuis Firebase...');

  // 2. Rendre l'interface immédiatement
  renderDashboard(); renderCentres(); renderTechs(); renderPlanning();
  renderCRA(); renderRapport(); renderCompta(); renderCharges();
  renderAssurances(); renderStock(); renderDocs(); renderPresta();

  // Enlever le loader
  loader.remove();

  // ⚠️ NE PAS sauvegarder dans Firebase au démarrage
  // Chaque appareil qui s'ouvre ne doit PAS écraser les données des autres

  // 4. Charger Firebase — CRA en PRIORITÉ
  if (window.loadFromFirebase) {
    try {
      // Charger CRA en premier et immédiatement
      const fbCraData = await window.loadFromFirebase('cra_data');
      if (fbCraData && Object.keys(fbCraData).length > 0) {
        Object.keys(CRA_DATA).forEach(k => delete CRA_DATA[k]);
        Object.keys(fbCraData).forEach(k => { CRA_DATA[k] = fbCraData[k]; });
        const now = new Date();
        const moisCourant = String(now.getMonth()+1).padStart(2,'0') + '/' + now.getFullYear();
        TECHS.forEach((t,i) => {
          if (CRA_DATA[t.nom]) TECHS[i].jours = Object.keys(CRA_DATA[t.nom]).filter(d=>d.endsWith(moisCourant)).length;
        });
        renderCRA(); renderRapport(); renderDashboard();
        console.log('✅ CRA chargé depuis Firebase :', Object.keys(fbCraData).length, 'techniciens');
      } else {
        // Firebase CRA vide — reconstruire depuis les badges
        console.log('⚠️ CRA Firebase vide — reconstruction depuis les badges...');
        await syncAllBadgeages();
      }

      // Charger le reste en parallèle
      const [fbTechs, fbCentres, fbCharges, fbAss, fbStock, fbBox, fbTel, fbExtra, fbCompta, fbPresta, fbPlanning, fbTechnovap, fbWestCont, fbWestContr, fbCarpolish] = await Promise.all([
        window.loadFromFirebase('techs'),
        window.loadFromFirebase('centres'),
        window.loadFromFirebase('charges'),
        window.loadFromFirebase('assurances'),
        window.loadFromFirebase('stock'),
        window.loadFromFirebase('box'),
        window.loadFromFirebase('tel'),
        window.loadFromFirebase('extra'),
        window.loadFromFirebase('compta'),
        window.loadFromFirebase('prestations'),
        window.loadFromFirebase('planning'),
        window.loadFromFirebase('technovap'),
        window.loadFromFirebase('westfield_contacts'),
        window.loadFromFirebase('westfield_contrats'),
        window.loadFromFirebase('carpolish_contact'),
      ]);
      let updated = false;
      if (fbTechs?.length) { TECHS.splice(0, TECHS.length, ...fbTechs); updated = true; console.log('✅ Techniciens:', fbTechs.length); }
      if (fbCentres?.length) { CENTRES.splice(0, CENTRES.length, ...fbCentres); updated = true; }
      if (fbCharges?.length) { CHARGES.splice(0, CHARGES.length, ...fbCharges); updated = true; }
      if (fbAss?.length) { ASSURANCES.splice(0, ASSURANCES.length, ...fbAss); updated = true; }
      if (fbStock?.length) { STOCK.splice(0, STOCK.length, ...fbStock); updated = true; }
      if (fbBox?.length) { BOX_DATA.splice(0, BOX_DATA.length, ...fbBox); updated = true; }
      if (fbTel?.length) { TEL_DATA.splice(0, TEL_DATA.length, ...fbTel); updated = true; }
      if (fbExtra?.length) { EXTRA_ROWS.splice(0, EXTRA_ROWS.length, ...fbExtra); updated = true; }
      if (fbCompta?.length) { fbCompta.forEach((r,i) => { if(COMPTA[i]) Object.assign(COMPTA[i], r); }); updated = true; }
      if (fbPlanning) { Object.assign(PLANNING, fbPlanning); updated = true; }
      if (fbTechnovap?.length) { TECHNOVAP_MACHINES.splice(0, TECHNOVAP_MACHINES.length, ...fbTechnovap); updated = true; }
      if (fbWestCont?.length) { WESTFIELD_CONTACTS.splice(0, WESTFIELD_CONTACTS.length, ...fbWestCont); updated = true; }
      if (fbWestContr?.length) { WESTFIELD_CONTRATS.splice(0, WESTFIELD_CONTRATS.length, ...fbWestContr); updated = true; }
      if (fbCarpolish?.nom) { Object.assign(CARPOLISH_CONTACT, fbCarpolish); updated = true; }
      // ⚠️ CRA_DATA déjà chargé en priorité au-dessus — ne pas recharger ici
      if (updated) {
        renderDashboard(); renderCentres(); renderTechs(); renderCompta();
        renderCharges(); renderAssurances(); renderStock(); renderPlanning();
        saveLocal();
        console.log('🔥 Données Firebase chargées ✅');
      }
      if (fbPresta) {
        Object.keys(fbPresta).forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = fbPresta[id];
        });
      }
      // Toujours sync badgeuse → CRA au chargement
      await syncAllBadgeages();
      renderCRA(); renderRapport(); renderDashboard();
      console.log('🔄 Sync badgeuse → CRA → Rapport ✅');
    } catch(e) {
      console.log('Firebase load error:', e.message);
    }
  }

  // Auto-sauvegarde locale toutes les 60 secondes (pas Firebase — évite les écrasements)
  setInterval(() => saveLocal(), 60000);
}

// Lancer init dès que Firebase est prêt
(function waitAndInit() {
  if (window._firebaseReady && window.loadFromFirebase) {
    init();
  } else {
    setTimeout(waitAndInit, 200);
  }
})();

// ═══ TECHNOVAP ════════════════════════════════════════════════
function renderTechnovap() {
  const list = document.getElementById('technovap-list');
  if (!list) return;
  list.innerHTML = '';
  TECHNOVAP_MACHINES.forEach((m, i) => {
    const statutColor = m.statut==='ok' ? '#16A34A' : m.statut==='attention' ? '#D97706' : '#DC2626';
    const statutLabel = m.statut==='ok' ? '✅ Opérationnel' : m.statut==='attention' ? '⚠️ Attention' : '🔴 Urgent';
    list.innerHTML += `<div class="card" style="border-left:4px solid ${statutColor};">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
        <div>
          <div style="font-size:15px;font-weight:800;">${m.centre}</div>
          <div style="font-size:12px;color:var(--muted);">${m.modele} · ${m.id}</div>
        </div>
        <span class="badge" style="background:${statutColor}22;color:${statutColor};border:1px solid ${statutColor}44;">${statutLabel}</span>
      </div>
      <div class="fr"><span class="fk">N° Série</span><input value="${m.serie}" style="font-size:12px;font-weight:600;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-family:inherit;width:150px;" onchange="TECHNOVAP_MACHINES[${i}].serie=this.value;"></div>
      <div class="fr"><span class="fk">Date achat</span><input value="${m.achat}" style="font-size:12px;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-family:inherit;width:100px;" onchange="TECHNOVAP_MACHINES[${i}].achat=this.value;"></div>
      <div class="fr"><span class="fk">Dernier entretien</span><input value="${m.dernierEntretien}" style="font-size:12px;border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-family:inherit;width:100px;" onchange="TECHNOVAP_MACHINES[${i}].dernierEntretien=this.value;"></div>
      <div class="fr"><span class="fk">Prochain entretien</span><input value="${m.prochainEntretien}" style="font-size:12px;font-weight:700;color:${statutColor};border:1px solid var(--border);background:var(--bg3);border-radius:5px;padding:3px 8px;font-family:inherit;width:100px;" onchange="TECHNOVAP_MACHINES[${i}].prochainEntretien=this.value;"></div>
      <div class="fr"><span class="fk">Statut</span>
        <select onchange="TECHNOVAP_MACHINES[${i}].statut=this.value;renderTechnovap();saveAll();" style="border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:12px;background:var(--bg3);font-family:inherit;">
          <option value="ok" ${m.statut==='ok'?'selected':''}>✅ Opérationnel</option>
          <option value="attention" ${m.statut==='attention'?'selected':''}>⚠️ Attention</option>
          <option value="urgent" ${m.statut==='urgent'?'selected':''}>🔴 Urgent</option>
        </select>
      </div>
      <div style="margin-top:8px;"><textarea placeholder="Notes..." style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:8px;font-size:12px;font-family:inherit;resize:vertical;min-height:50px;" onchange="TECHNOVAP_MACHINES[${i}].notes=this.value;">${m.notes}</textarea></div>
      <div style="display:flex;gap:6px;margin-top:8px;">
        <button class="btn btn-sm btn-p" onclick="saveTechnovapRow(${i})">💾 Sauvegarder</button>
        <button class="btn btn-sm btn-r" onclick="if(confirm('Supprimer ?')){TECHNOVAP_MACHINES.splice(${i},1);renderTechnovap();saveAll();}">🗑️</button>
      </div>
    </div>`;
  });
}

function saveTechnovapRow(i) {
  saveAll();
  showNotif('✅ Machine sauvegardée !');
}

function addMachine() {
  TECHNOVAP_MACHINES.push({id:'TV-00'+(TECHNOVAP_MACHINES.length+1), centre:'À définir', modele:'Technovap Pro', serie:'', achat:'', dernierEntretien:'', prochainEntretien:'', statut:'ok', notes:''});
  renderTechnovap();
}

// ═══ WESTFIELD ════════════════════════════════════════════════
function renderWestfield() {
  // Contacts
  const contacts = document.getElementById('westfield-contacts');
  if (contacts) {
    contacts.innerHTML = '';
    WESTFIELD_CONTACTS.forEach((c, i) => {
      contacts.innerHTML += `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Nom</div><input value="${c.nom}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].nom=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Poste</div><input value="${c.poste}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].poste=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Centre</div><input value="${c.centre}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].centre=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Téléphone</div><input value="${c.tel}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].tel=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Email</div><input value="${c.email}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].email=this.value;"></div>
        <div style="display:flex;align-items:flex-end;gap:6px;">
          <button class="btn btn-sm btn-p" onclick="saveAll()">💾</button>
          <button class="btn btn-sm" style="background:#25D366;color:#fff;border:none;" onclick="openUrl('https://wa.me/'+WESTFIELD_CONTACTS[${i}].tel.replace(/\\D/g,''))">💬 WhatsApp</button>
          <button class="btn btn-sm btn-r" onclick="WESTFIELD_CONTACTS.splice(${i},1);renderWestfield();saveAll();">🗑️</button>
        </div>
      </div>`;
    });
  }

  // Contrats
  const contrats = document.getElementById('westfield-contrats');
  if (contrats) {
    contrats.innerHTML = '';
    WESTFIELD_CONTRATS.forEach((c, i) => {
      const isUrgent = c.renouvellement === 'À renouveler';
      contrats.innerHTML += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:12px 0;border-bottom:1px solid var(--border);">
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Centre</div><input value="${c.centre}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-weight:700;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].centre=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Bailleur</div><input value="${c.bailleur}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].bailleur=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Loyer mensuel</div><input value="${c.loyer}" type="number" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-weight:700;color:var(--accent4);font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].loyer=parseFloat(this.value)||0;"> €</div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Statut</div>
          <select onchange="WESTFIELD_CONTRATS[${i}].renouvellement=this.value;renderWestfield();" style="width:100%;border:1px solid var(--border);border-radius:6px;padding:5px 8px;font-size:12px;background:var(--bg3);font-family:inherit;">
            <option ${c.renouvellement==='En cours'?'selected':''}>En cours</option>
            <option ${c.renouvellement==='À renouveler'?'selected':''}>À renouveler</option>
            <option ${c.renouvellement==='Renouvelé'?'selected':''}>Renouvelé</option>
            <option ${c.renouvellement==='Résilié'?'selected':''}>Résilié</option>
          </select>
        </div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Début</div><input value="${c.debut}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].debut=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Fin</div><input value="${c.fin}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].fin=this.value;"></div>
        <div style="grid-column:3/5;"><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Notes</div><input value="${c.notes}" placeholder="Remarques..." style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].notes=this.value;"></div>
        <div style="display:flex;align-items:flex-end;gap:6px;">
          <button class="btn btn-sm btn-p" onclick="saveAll()">💾</button>
          <button class="btn btn-sm btn-r" onclick="WESTFIELD_CONTRATS.splice(${i},1);renderWestfield();saveAll();">🗑️</button>
        </div>
      </div>`;
    });
  }

  // Docs
  const docsEl = document.getElementById('westfield-docs');
  if (docsEl) {
    if (WESTFIELD_DOCS.length === 0) {
      docsEl.innerHTML = '<div style="color:var(--muted);font-size:13px;font-style:italic;">Aucun document ajouté</div>';
    } else {
      docsEl.innerHTML = WESTFIELD_DOCS.map((d,i) => {
        const icon = d.type?.includes('pdf') ? '📄' : d.type?.includes('image') ? '🖼️' : '📎';
        return `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .15s;" onmouseenter="this.style.borderColor='#7C3AED'" onmouseleave="this.style.borderColor='var(--border)'" onclick="openDoc(${i})">
          <div style="font-size:28px;margin-bottom:6px;">${icon}</div>
          <div style="font-size:11px;font-weight:600;word-break:break-all;">${d.nom}</div>
          <div style="font-size:10px;color:var(--muted);margin-top:3px;">${d.size||''} · ${d.date||''}</div>
          <button class="btn btn-sm btn-r" style="margin-top:8px;width:100%;" onclick="event.stopPropagation();WESTFIELD_DOCS.splice(${i},1);renderWestfield();saveAll();">🗑️ Supprimer</button>
        </div>`;
      }).join('');
    }
  }
}

function addWestfieldContact() {
  WESTFIELD_CONTACTS.push({nom:'Nouveau contact', poste:'', tel:'', email:'', centre:''});
  renderWestfield();
}

function addWestfieldContrat() {
  WESTFIELD_CONTRATS.push({centre:'', bailleur:'Westfield', loyer:0, debut:'', fin:'', renouvellement:'En cours', notes:''});
  renderWestfield();
}

function handleWestfieldUpload(input) {
  if (!input.files?.length) return;
  Array.from(input.files).forEach(f => {
    const reader = new FileReader();
    reader.onload = (e) => {
      WESTFIELD_DOCS.push({
        nom: f.name,
        type: f.type,
        size: (f.size/1024).toFixed(0) + ' Ko',
        data: e.target.result,
        date: new Date().toLocaleDateString('fr-FR')
      });
      renderWestfield();
      saveAll();
    };
    reader.readAsDataURL(f);
  });
  input.value = '';
}

function selectCarpolish(code) {
  if (!code || code === 'autre') return;
  const prod = CARPOLISH_PRODUITS.find(p => p.code === code);
  if (prod) {
    document.getElementById('ns-produit').value = `[${prod.code}] ${prod.nom}`;
    document.getElementById('ns-pu').value = prod.prix;
  }
}

function buildOrderEmail() {
  const centre = document.getElementById('ns-centre')?.value || '';
  const produit = document.getElementById('ns-produit')?.value || '';
  const qte = document.getElementById('ns-qte')?.value || '';
  const pu = document.getElementById('ns-pu')?.value || '';
  return `Bonjour,\n\nNous souhaitons passer la commande suivante :\n\nCentre : ${centre}\nProduit : ${produit}\nQuantité : ${qte}\nPrix unitaire : ${pu} €\n\nCordialement,\nDreamwash`;
}

// ═══ MODE TABLETTE ════════════════════════════════════════════
function toggleDrawer() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('drawer-overlay');
  sidebar.classList.toggle('drawer-open');
  overlay.classList.toggle('open');
}

function closeDrawer() {
  document.querySelector('.sidebar').classList.remove('drawer-open');
  document.getElementById('drawer-overlay').classList.remove('open');
}

// Fermer drawer quand on clique sur un nav item sur tablette
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 1024) closeDrawer();
  });
});

// Bottom nav go
function bnGo(id) {
  go(id);
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  document.querySelector(`.bn-item[data-page="${id}"]`)?.classList.add('active');
}

function openDoc(i) {
  const doc = WESTFIELD_DOCS[i];
  if (!doc?.data) return;
  const win = window.open();
  win.document.write(`<iframe src="${doc.data}" style="width:100%;height:100vh;border:none;"></iframe>`);
}

// ═══ BON DE COMMANDE CARPOLISH ════════════════════════════════
let BDC_LINES = [];

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
