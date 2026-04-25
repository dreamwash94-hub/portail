// Dreamwash — Badgeuse (portail)

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
  todayLog.forEach((l, idx) => {
    const isMobile = l.centreBadge !== l.centreHabituel;
    const isDepart = l.type === 'depart';
    const typeBadge = isDepart
      ? '<span class="badge" style="background:#FEE2E2;color:#DC2626;border:1px solid #FECACA;">🔴 Départ</span>'
      : '<span class="badge" style="background:#DCFCE7;color:#16A34A;border:1px solid #BBF7D0;">🟢 Arrivée</span>';
    tb.innerHTML += `<tr>
      <td style="font-weight:700;">${l.nom}</td>
      <td style="font-weight:600;color:var(--accent);">${l.centreBadge}</td>
      <td style="color:var(--muted);">${l.centreHabituel||l.centreBadge}</td>
      <td style="font-weight:700;color:var(--accent2);">${l.time}</td>
      <td style="color:var(--muted);font-size:12px;">${l.date}</td>
      <td>${typeBadge}</td>
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

    // Si Firebase CRA existe, il a priorité (respecte les suppressions manuelles)
    // On fusionne : badges ajoutent, Firebase CRA supprime
    const newCRA = {};
    if (fbCRA && Object.keys(fbCRA).length > 0) {
      // Utiliser Firebase CRA comme base (respecte les suppressions)
      Object.keys(fbCRA).forEach(nom => {
        if (NOMS_VALIDES.has(nom)) newCRA[nom] = {...fbCRA[nom]};
      });
      // Ajouter les nouveaux badges non présents dans Firebase CRA
      Object.keys(craFromBadges).forEach(nom => {
        if (!newCRA[nom]) newCRA[nom] = {};
        Object.keys(craFromBadges[nom]).forEach(date => {
          // N'ajouter que si ce jour n'a pas été supprimé manuellement
          // (si la date existe dans badges mais pas dans fbCRA = suppression manuelle)
          if (fbCRA[nom] && fbCRA[nom][date]) {
            newCRA[nom][date] = craFromBadges[nom][date];
          } else if (!fbCRA[nom]) {
            // Nouveau technicien pas encore dans Firebase CRA
            newCRA[nom][date] = craFromBadges[nom][date];
          }
        });
      });
    } else {
      // Pas de Firebase CRA — utiliser les badges
      Object.assign(newCRA, craFromBadges);
    }

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
