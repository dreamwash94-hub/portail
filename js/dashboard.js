// Dreamwash — Dashboard et Centres

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
        <div class="fr"><span class="fk">Mot de passe WiFi</span><span class="secret" onclick="toggleSec(this)" data-v="${c.wifiPwd}">${'●'.repeat(c.wifiPwd.length)}</span></div>
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

