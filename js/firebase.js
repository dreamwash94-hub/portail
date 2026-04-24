  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getFirestore, setDoc, getDoc, doc, collection, getDocs, query, addDoc, deleteDoc, where, writeBatch } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCSZqfL3G-DK0VzNmptblT7F_kgq5R4Oww",
    authDomain: "dreamwash-d4a2c.firebaseapp.com",
    projectId: "dreamwash-d4a2c",
    storageBucket: "dreamwash-d4a2c.firebasestorage.app",
    messagingSenderId: "294836515742",
    appId: "1:294836515742:web:3fdbe1b28db8f97b7cdc8f"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  window.saveToFirebase = async function(key, data) {
    try {
      await setDoc(doc(db, 'portail', key), { data: JSON.stringify(data), updated: Date.now() });
      return true;
    } catch(e) { console.log('Firebase save error:', key, e.message); return false; }
  };

  window.loadFromFirebase = async function(key) {
    try {
      const snap = await getDoc(doc(db, 'portail', key));
      if (snap.exists()) return JSON.parse(snap.data().data);
    } catch(e) { console.log('Firebase load error:', key, e.message); }
    return null;
  };

  window.loadBadgeages = async function() {
    try {
      const now = new Date();
      const dateStr = String(now.getDate()).padStart(2,'0') + '/' + String(now.getMonth()+1).padStart(2,'0') + '/' + now.getFullYear();
      const snap = await getDocs(query(collection(db, 'badgeages')));
      const data = [];
      snap.forEach(d => data.push({...d.data(), _id: d.id}));
      return data.filter(l => l.date === dateStr).sort((a,b) => (b.timestamp||0) - (a.timestamp||0));
    } catch(e) { return []; }
  };

  window.getAllBadgeages = async function() {
    try {
      const snap = await getDocs(collection(db, 'badgeages'));
      const data = [];
      snap.forEach(d => data.push({...d.data(), _id: d.id}));
      return data;
    } catch(e) { console.log('Erreur getAllBadgeages:', e.message); return []; }
  };

  window.deleteBadgeFromFirebase = async function(nom, timestamp) {
    try {
      const snap = await getDocs(collection(db, 'badgeages'));
      const batch = writeBatch(db);
      let count = 0;
      snap.forEach(d => {
        const data = d.data();
        if (data.nom === nom && data.timestamp === timestamp) {
          batch.delete(d.ref);
          count++;
        }
      });
      if (count > 0) await batch.commit();
      return count > 0;
    } catch(e) { console.log('Erreur suppression badge:', e.message); return false; }
  };

  window.addBadgeToFirebase = async function(entry) {
    try {
      await addDoc(collection(db, 'badgeages'), entry);
      return true;
    } catch(e) { return false; }
  };

  // ═══ PAS DE LISTENERS ════════════════════════════════════════
  // Les données sont chargées UNE SEULE FOIS au démarrage
  // Sauvegarde UNIQUEMENT sur clic 💾
  window._markPortailSave = () => {};
  window._markCRASave = () => {};
  window._firebaseReady = true;
  window._db = db;
  console.log('🔥 Firebase connecté ✅');
</script>
