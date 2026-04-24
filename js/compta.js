// Dreamwash — Comptabilité, Charges, Assurances

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

