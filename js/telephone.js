// Dreamwash — Téléphone et Box

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
      <td><span class="secret" onclick="toggleSec(this)" data-v="${b.wifi}">${'●'.repeat(Math.max(b.wifi.length,1))}</span></td>
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
