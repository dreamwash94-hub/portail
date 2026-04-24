// Dreamwash — Variables globales et données

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════
const CENTRES = [
  {id:0,nom:"Aeroville A",tel:"01 23 45 67 89",wifi:"AeroA_DW",wifiPwd:"DreamA2024!",boites:["A1-4521","A1-7832","A1-3341","A1-9912"],loyer:1400,techs:["Sadoul","Khyal","Siraj"],ca:1100,lavages:18,color:"#2563EB"},
  {id:1,nom:"Aeroville B",tel:"01 23 45 67 90",wifi:"AeroB_DW",wifiPwd:"DreamB2024!",boites:["A2-1234","A2-5678","A2-9012","A2-3456"],loyer:1400,techs:["Saiful Islam","Siraj"],ca:980,lavages:15,color:"#7C3AED"},
  {id:2,nom:"Lafayette Rouge",tel:"01 34 56 78 90",wifi:"LafRouge_DW",wifiPwd:"Rouge2024#",boites:["LR-7832","LR-3341","LR-9912","LR-1234"],loyer:1600,techs:["Khalid","Mourad","Abdeldjalil"],ca:1250,lavages:21,color:"#DC2626"},
  {id:3,nom:"Lafayette Vert",tel:"01 34 56 78 91",wifi:"LafVert_DW",wifiPwd:"Vert2024#",boites:["LV-5678","LV-9012","LV-3456","LV-7890"],loyer:1600,techs:["Ayoub J.","Ali"],ca:980,lavages:16,color:"#16A34A"},
  {id:4,nom:"Cité des Sciences",tel:"01 45 67 89 01",wifi:"CDS_DW",wifiPwd:"CDS2024$",boites:["CS-1234","CS-5678","CS-9012","CS-3456"],loyer:1050,techs:["Ahmed","Abdesamad"],ca:750,lavages:12,color:"#0891B2"},
  {id:5,nom:"Le Parks",tel:"01 56 78 90 12",wifi:"Parks_DW",wifiPwd:"Parks2024@",boites:["LP-7890","LP-1234","LP-5678","LP-9012"],loyer:700,techs:["Adrien"],ca:420,lavages:7,color:"#D97706"},
  {id:6,nom:"Parly2",tel:"01 56 78 90 13",wifi:"Parly2_DW",wifiPwd:"Parly2024@",boites:["P2-3456","P2-7890","P2-1234","P2-5678"],loyer:1200,techs:["Amine_parly2","Abdesamad"],ca:820,lavages:14,color:"#9333EA"},
  {id:7,nom:"Belleville",tel:"01 67 89 01 23",wifi:"Bell_DW",wifiPwd:"Bell2024!",boites:["BV-9012","BV-3456","BV-7890","BV-1234"],loyer:900,techs:["Nabil","Amine"],ca:680,lavages:11,color:"#EA580C"},
  {id:8,nom:"Suresnes",tel:"01 78 90 12 34",wifi:"Sures_DW",wifiPwd:"SRS2024#",boites:["SR-5678","SR-9012","SR-3456","SR-7890"],loyer:800,techs:["Rachid"],ca:350,lavages:6,color:"#BE185D"},
];

let TECHS = [];

let PLANNING = {"Aeroville A":[[],[],[],[],[],[],[]],"Aeroville B":[[],[],[],[],[],[],[]],"Lafayette Rouge":[[],[],[],[],[],[],[]],"Lafayette Vert":[[],[],[],[],[],[],[]],"Cité des Sciences":[[],[],[],[],[],[],[]],"Le Parks":[[],[],[],[],[],[],[]],"Parly2":[[],[],[],[],[],[],[]],"Belleville":[[],[],[],[],[],[],[]],"Suresnes":[[],[],[],[],[],[],[]]};

// CRA_DATA : { "NomTech": { "JJ/MM/AAAA": "Centre" }, ... }
let CRA_DATA = {};

let CHARGES = [];
let ASSURANCES = [];
let STOCK = [];

const COMPTA = [
  {centre:"Aeroville A",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Aeroville B",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Lafayette Rouge",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Lafayette Vert",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Cité des Sciences",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Parly2",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Belleville",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Le Parks",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
  {centre:"Suresnes",ca:0,loyer:0,salaires:0,produits:0,evol:"",badge:"yl"},
];

const DOCS = [
  {n:"KBIS Dreamwash",i:"📋",d:"Mars 2026",s:"gr",url:"https://drive.google.com"},
  {n:"Contrats de bail",i:"🏠",d:"9 actifs",s:"gr",url:"https://drive.google.com"},
  {n:"Assurance multirisque",i:"🛡️",d:"Expire 01/06/2026",s:"gr",url:"https://drive.google.com"},
  {n:"Statuts société",i:"⚖️",d:"Version 2024",s:"gr",url:"https://drive.google.com"},
  {n:"Contrats Technovap",i:"🔧",d:"9 machines",s:"gr",url:"https://drive.google.com"},
  {n:"Convention collective",i:"📄",d:"En vigueur",s:"gr",url:"https://drive.google.com"},
  {n:"Registre du personnel",i:"👥",d:"22 salariés",s:"gr",url:"https://drive.google.com"},
  {n:"Déclarations URSSAF",i:"🏛️",d:"T1 2026",s:"yl",url:"https://drive.google.com"},
  {n:"Contrats téléphonie",i:"📱",d:"Expire 06/2026",s:"yl",url:"https://drive.google.com"},
  {n:"Relevés Bankin",i:"🏦",d:"Mars 2026",s:"gr",url:"https://app.bankin.com"},
  {n:"Déclarations TVA",i:"💰",d:"T1 2026",s:"gr",url:"https://drive.google.com"},
  {n:"Plan de formation",i:"📚",d:"2026",s:"gr",url:"https://drive.google.com"},
  {n:"Catalogue Carpolish",i:"🧴",d:"Bon de commande",s:"gr",url:"carpolish",carpolish:true},
  {n:"BON DE COMMANDE Carpolish",i:"📄",d:"PDF officiel",s:"gr",url:"carpolish_pdf",carpolish_pdf:true},
];

// Documents uploadés manuellement
let CUSTOM_DOCS = [];

let techFilter = 'tous';
let planFilter = 'tous';
const CRA_DATES = ['Lun 13 Avr.','Mar 14 Avr.','Mer 15 Avr.','Jeu 16 Avr.','Ven 17 Avr.'];
const MOIS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
let craDay = 2;
let rapportMois = 3; // index avril

// ═══════════════════════════════════════════════════════════════════════════════
// RENDER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

