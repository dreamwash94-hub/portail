// Dreamwash — Utilitaires, Save, Init

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

