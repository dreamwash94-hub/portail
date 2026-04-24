// Dreamwash — Technovap

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
