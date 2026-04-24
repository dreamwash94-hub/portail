// Dreamwash — Carpolish

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
