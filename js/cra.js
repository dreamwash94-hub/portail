// Dreamwash — CRA et Rapport

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

