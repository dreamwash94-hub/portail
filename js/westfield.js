// Dreamwash — Westfield/Indigo

  if (contacts) {
    contacts.innerHTML = '';
    WESTFIELD_CONTACTS.forEach((c, i) => {
      contacts.innerHTML += `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Nom</div><input value="${c.nom}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].nom=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Poste</div><input value="${c.poste}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].poste=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Centre</div><input value="${c.centre}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].centre=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Téléphone</div><input value="${c.tel}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].tel=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Email</div><input value="${c.email}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTACTS[${i}].email=this.value;"></div>
        <div style="display:flex;align-items:flex-end;gap:6px;">
          <button class="btn btn-sm btn-p" onclick="saveAll()">💾</button>
          <button class="btn btn-sm" style="background:#25D366;color:#fff;border:none;" onclick="openUrl('https://wa.me/'+WESTFIELD_CONTACTS[${i}].tel.replace(/\\D/g,''))">💬 WhatsApp</button>
          <button class="btn btn-sm btn-r" onclick="WESTFIELD_CONTACTS.splice(${i},1);renderWestfield();saveAll();">🗑️</button>
        </div>
      </div>`;
    });
  }

  // Contrats
  const contrats = document.getElementById('westfield-contrats');
  if (contrats) {
    contrats.innerHTML = '';
    WESTFIELD_CONTRATS.forEach((c, i) => {
      const isUrgent = c.renouvellement === 'À renouveler';
      contrats.innerHTML += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:12px 0;border-bottom:1px solid var(--border);">
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Centre</div><input value="${c.centre}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-weight:700;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].centre=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Bailleur</div><input value="${c.bailleur}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].bailleur=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Loyer mensuel</div><input value="${c.loyer}" type="number" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-weight:700;color:var(--accent4);font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].loyer=parseFloat(this.value)||0;"> €</div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Statut</div>
          <select onchange="WESTFIELD_CONTRATS[${i}].renouvellement=this.value;renderWestfield();" style="width:100%;border:1px solid var(--border);border-radius:6px;padding:5px 8px;font-size:12px;background:var(--bg3);font-family:inherit;">
            <option ${c.renouvellement==='En cours'?'selected':''}>En cours</option>
            <option ${c.renouvellement==='À renouveler'?'selected':''}>À renouveler</option>
            <option ${c.renouvellement==='Renouvelé'?'selected':''}>Renouvelé</option>
            <option ${c.renouvellement==='Résilié'?'selected':''}>Résilié</option>
          </select>
        </div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Début</div><input value="${c.debut}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].debut=this.value;"></div>
        <div><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Fin</div><input value="${c.fin}" style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].fin=this.value;"></div>
        <div style="grid-column:3/5;"><div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;margin-bottom:4px;">Notes</div><input value="${c.notes}" placeholder="Remarques..." style="width:100%;border:1px solid var(--border);background:var(--bg3);border-radius:6px;padding:5px 8px;font-size:13px;font-family:inherit;" onchange="WESTFIELD_CONTRATS[${i}].notes=this.value;"></div>
        <div style="display:flex;align-items:flex-end;gap:6px;">
          <button class="btn btn-sm btn-p" onclick="saveAll()">💾</button>
          <button class="btn btn-sm btn-r" onclick="WESTFIELD_CONTRATS.splice(${i},1);renderWestfield();saveAll();">🗑️</button>
        </div>
      </div>`;
    });
  }

  // Docs
  const docsEl = document.getElementById('westfield-docs');
  if (docsEl) {
    if (WESTFIELD_DOCS.length === 0) {
      docsEl.innerHTML = '<div style="color:var(--muted);font-size:13px;font-style:italic;">Aucun document ajouté</div>';
    } else {
      docsEl.innerHTML = WESTFIELD_DOCS.map((d,i) => {
        const icon = d.type?.includes('pdf') ? '📄' : d.type?.includes('image') ? '🖼️' : '📎';
        return `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .15s;" onmouseenter="this.style.borderColor='#7C3AED'" onmouseleave="this.style.borderColor='var(--border)'" onclick="openDoc(${i})">
          <div style="font-size:28px;margin-bottom:6px;">${icon}</div>
          <div style="font-size:11px;font-weight:600;word-break:break-all;">${d.nom}</div>
          <div style="font-size:10px;color:var(--muted);margin-top:3px;">${d.size||''} · ${d.date||''}</div>
          <button class="btn btn-sm btn-r" style="margin-top:8px;width:100%;" onclick="event.stopPropagation();WESTFIELD_DOCS.splice(${i},1);renderWestfield();saveAll();">🗑️ Supprimer</button>
        </div>`;
      }).join('');
    }
  }
}

function addWestfieldContact() {
  WESTFIELD_CONTACTS.push({nom:'Nouveau contact', poste:'', tel:'', email:'', centre:''});
  renderWestfield();
}

function addWestfieldContrat() {
  WESTFIELD_CONTRATS.push({centre:'', bailleur:'Westfield', loyer:0, debut:'', fin:'', renouvellement:'En cours', notes:''});
  renderWestfield();
}

function handleWestfieldUpload(input) {
  if (!input.files?.length) return;
  Array.from(input.files).forEach(f => {
    const reader = new FileReader();
    reader.onload = (e) => {
      WESTFIELD_DOCS.push({
        nom: f.name,
        type: f.type,
        size: (f.size/1024).toFixed(0) + ' Ko',
        data: e.target.result,
        date: new Date().toLocaleDateString('fr-FR')
      });
      renderWestfield();
      saveAll();
    };
    reader.readAsDataURL(f);
  });
  input.value = '';
}

function selectCarpolish(code) {
  if (!code || code === 'autre') return;
  const prod = CARPOLISH_PRODUITS.find(p => p.code === code);
  if (prod) {
    document.getElementById('ns-produit').value = `[${prod.code}] ${prod.nom}`;
    document.getElementById('ns-pu').value = prod.prix;
  }
}

function buildOrderEmail() {
  const centre = document.getElementById('ns-centre')?.value || '';
  const produit = document.getElementById('ns-produit')?.value || '';
  const qte = document.getElementById('ns-qte')?.value || '';
  const pu = document.getElementById('ns-pu')?.value || '';
  return `Bonjour,\n\nNous souhaitons passer la commande suivante :\n\nCentre : ${centre}\nProduit : ${produit}\nQuantité : ${qte}\nPrix unitaire : ${pu} €\n\nCordialement,\nDreamwash`;
}

// ═══ MODE TABLETTE ════════════════════════════════════════════
function toggleDrawer() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('drawer-overlay');
  sidebar.classList.toggle('drawer-open');
  overlay.classList.toggle('open');
}

function closeDrawer() {
  document.querySelector('.sidebar').classList.remove('drawer-open');
  document.getElementById('drawer-overlay').classList.remove('open');
}

// Fermer drawer quand on clique sur un nav item sur tablette
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 1024) closeDrawer();
  });
});

// Bottom nav go
function bnGo(id) {
  go(id);
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  document.querySelector(`.bn-item[data-page="${id}"]`)?.classList.add('active');
}

function openDoc(i) {
  const doc = WESTFIELD_DOCS[i];
  if (!doc?.data) return;
  const win = window.open();
  win.document.write(`<iframe src="${doc.data}" style="width:100%;height:100vh;border:none;"></iframe>`);
}

// ═══ BON DE COMMANDE CARPOLISH ════════════════════════════════
let BDC_LINES = [];

