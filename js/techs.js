// Dreamwash — Techniciens

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

