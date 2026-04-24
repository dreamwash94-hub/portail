// Dreamwash — Planning

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
