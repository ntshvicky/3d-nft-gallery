// MetaGallery — 3D NFT Art Gallery
// Three.js r162 | Free mouse-look (no pointer lock) | Web3

import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════
   GALLERY DIMENSIONS & PALETTE
═══════════════════════════════════════════════════════════ */
const G = { W: 28, H: 8, L: 56 };

const C = {
  BG:      0x0c0c18,
  FLOOR:   0x181828,
  WALL:    0x14142a,
  CEIL:    0x10101e,
  GOLD:    0xc9a84c,
  WARM:    0xfff5e0,
  COOL:    0xaaccff,
};

/* ═══════════════════════════════════════════════════════════
   ARTWORK DATA
═══════════════════════════════════════════════════════════ */
const ARTWORKS_DATA = [
  { id:'a1',  title:'The Starry Night',            artist:'Vincent van Gogh',     year:'1889',
    desc:'A masterpiece — a swirling night sky over Saint-Rémy-de-Provence, pulsing with cosmic energy.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    price:'2.5',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:true,  wall:'left',  wi:0,
    fallbackColors:['#0a1a5a','#0d2880','#1a3c9e','#c9a84c','#e8d87a'],  fallbackStyle:'swirl' },

  { id:'a2',  title:'Girl with a Pearl Earring',   artist:'Johannes Vermeer',     year:'1665',
    desc:'Often called the "Mona Lisa of the North" — a hauntingly beautiful portrait from the Dutch Golden Age.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
    price:'1.8',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:true,  wall:'left',  wi:1,
    fallbackColors:['#2a1a0a','#4a2e10','#7a4820','#c9a870','#e8d8b0'],  fallbackStyle:'portrait' },

  { id:'a3',  title:'The Great Wave',              artist:'Katsushika Hokusai',   year:'1831',
    desc:'A towering wave threatening fishing boats near Mount Fuji — Japan\'s most iconic woodblock print.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg',
    price:'3.2',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:true,  wall:'left',  wi:2,
    fallbackColors:['#051a4a','#0a3080','#1858c0','#4090e0','#ffffff'],   fallbackStyle:'wave' },

  { id:'a4',  title:'Water Lilies',                artist:'Claude Monet',         year:'1906',
    desc:'From Monet\'s celebrated series depicting his garden at Giverny — pure impressionist serenity.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/1280px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
    price:'4.0',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:false, wall:'left',  wi:3,
    fallbackColors:['#0a2a1a','#1a5030','#2a7848','#60c080','#a0e8b0'],   fallbackStyle:'ripple' },

  { id:'a5',  title:'The Persistence of Memory',  artist:'Salvador Dalí',        year:'1931',
    desc:'Melting watches in a dreamlike Catalan landscape — Surrealism\'s most enduring icon.',
    img:'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
    price:'5.0',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:true,  wall:'left',  wi:4,
    fallbackColors:['#3a2008','#6a4018','#9a6828','#c89848','#e8c870'],   fallbackStyle:'surreal' },

  { id:'a6',  title:'The Scream',                  artist:'Edvard Munch',         year:'1893',
    desc:'An agonized figure beneath a swirling orange sky — the defining image of existential dread.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
    price:'3.7',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:true,  wall:'left',  wi:5,
    fallbackColors:['#6a1000','#b82000','#e85010','#f09030','#f8d060'],   fallbackStyle:'scream' },

  { id:'a7',  title:'Mona Lisa',                   artist:'Leonardo da Vinci',    year:'1503',
    desc:'The world\'s most famous portrait — her enigmatic smile has captivated humanity for five centuries.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    price:'10.0', owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:false, wall:'right', wi:0,
    fallbackColors:['#1a1508','#3a2e10','#6a5020','#9a7840','#c8a860'],   fallbackStyle:'portrait' },

  { id:'a8',  title:'The Birth of Venus',          artist:'Sandro Botticelli',    year:'1485',
    desc:'The goddess Venus emerging from the sea — a Renaissance masterpiece of grace and divinity.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
    price:'6.5',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:true,  wall:'right', wi:1,
    fallbackColors:['#2a1020','#5a2848','#9a5888','#c898c0','#f0c8e0'],   fallbackStyle:'venus' },

  { id:'a9',  title:'Sunflowers',                  artist:'Vincent van Gogh',     year:'1888',
    desc:'Van Gogh\'s iconic series painted in Arles — radiant bursts of golden yellow that defy time.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_van_Gogh_-_Field_with_Irises_near_Arles.jpg/1280px-Vincent_van_Gogh_-_Field_with_Irises_near_Arles.jpg',
    price:'2.2',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:true,  wall:'right', wi:2,
    fallbackColors:['#6a4a00','#c08000','#e0b000','#f0d030','#fff080'],   fallbackStyle:'flower' },

  { id:'a10', title:'Las Meninas',                 artist:'Diego Velázquez',      year:'1656',
    desc:'One of the most analyzed paintings in Western art — a mirror of royal life in Habsburg Spain.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Las_Meninas_01.jpg/800px-Las_Meninas_01.jpg',
    price:'4.5',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:false, wall:'right', wi:3,
    fallbackColors:['#180808','#3a1818','#602828','#904848','#c07878'],   fallbackStyle:'portrait' },

  { id:'a11', title:'A Sunday on La Grande Jatte', artist:'Georges Seurat',       year:'1886',
    desc:'A Pointillist masterwork — thousands of dots forming a timeless Parisian afternoon.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1280px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg',
    price:'3.1',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:true,  wall:'right', wi:4,
    fallbackColors:['#0a3020','#1a6040','#2a9060','#60c090','#90e0b8'],   fallbackStyle:'dots' },

  { id:'a12', title:'The School of Athens',        artist:'Raphael',              year:'1511',
    desc:'Ancient philosophers gathered in animated discourse — the embodiment of Renaissance humanism.',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
    price:'7.0',  owner:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e', forSale:true,  wall:'back',  wi:0,
    fallbackColors:['#08101a','#102040','#1a3870','#3060a8','#6090d8'],   fallbackStyle:'classical' },
];

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */
let scene, camera, renderer, clock;
let moveF=false, moveB=false, moveL=false, moveR=false;
let velocity      = new THREE.Vector3();
let raycaster     = new THREE.Raycaster();
let artworkMeshes = [];
let meshToArtwork = new Map();
let particles, particlePositions;
let walletAddress = null;
let allArtworks   = ARTWORKS_DATA.map(enrichArtwork);
let hoveredId     = null;
let selectedArtwork = null;
let inGallery     = false;
let currentChainId = '0x1';
let activityLog = JSON.parse(localStorage.getItem('mg_activity') || '[]');

// Free mouse-look state
let camYaw    = 0, camPitch    = 0;
let targetYaw = 0, targetPitch = 0;
const LOOK_SMOOTH = 0.07;
const LOOK_H      = 0.65;  // horizontal range multiplier (±radians)
const LOOK_V      = 0.28;  // vertical range multiplier

/* ═══════════════════════════════════════════════════════════
   DOM HELPERS
═══════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
function show(id){ $(id).classList.remove('hidden'); }
function hide(id){ $(id).classList.add('hidden'); }
function visible(id){ return !$(id).classList.contains('hidden'); }
function modalOpen(){ return visible('art-modal') || visible('add-modal') || visible('wallet-modal') || visible('pause-overlay'); }

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */
function toast(title, msg='', type='info', dur=4000){
  const icons = { success:'✔', error:'✕', info:'◈' };
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type]||'◈'}</span>
    <div class="toast-body"><div class="toast-title">${title}</div>${msg?`<div class="toast-msg">${msg}</div>`:''}</div>`;
  $('toasts').appendChild(el);
  setTimeout(()=>{ el.classList.add('toast-exit'); setTimeout(()=>el.remove(), 350); }, dur);
}

/* ═══════════════════════════════════════════════════════════
   WEB3 / MARKETPLACE METADATA
═══════════════════════════════════════════════════════════ */
function hashSeed(str){
  return [...str].reduce((acc, ch)=>((acc << 5) - acc + ch.charCodeAt(0)) >>> 0, 2166136261);
}

function fakeHash(seed){
  const chars='0123456789abcdef';
  let n=hashSeed(seed), out='0x';
  for(let i=0;i<64;i++){
    n=(n*1664525+1013904223)>>>0;
    out+=chars[(n>>>((i%8)*4))&15];
  }
  return out;
}

function enrichArtwork(art){
  const seed=hashSeed(art.id);
  const tokenId=art.tokenId || String(1000 + seed % 9000);
  const chain=art.chain || 'Ethereum';
  const creator=art.creator || art.owner || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  const mintTx=art.mintTx || fakeHash(`${art.id}:mint`);
  return {
    collection:'MetaGallery Curated',
    contract:'0x8a90C5e8F3b7B8c7D8a1E6cB16f935A1560f7d0a',
    tokenStandard:'ERC-721',
    royaltyBps: art.forSale ? 750 : 500,
    verified:true,
    creator,
    tokenId,
    chain,
    mintTx,
    ...art,
    provenance: art.provenance || [
      { type:'Minted', by:creator, at:`${art.year || '2024'}-01-01`, tx:mintTx },
      { type:'Listed', by:art.owner, at:'2026-04-28', price:art.forSale ? `${art.price} ETH` : 'Private collection', tx:fakeHash(`${art.id}:list`) },
    ],
  };
}

function getCollectionStats(){
  const listed=allArtworks.filter(a=>a.forSale);
  const prices=listed.map(a=>parseFloat(a.price)).filter(Number.isFinite);
  const floor=prices.length ? Math.min(...prices) : 0;
  const volume=allArtworks.reduce((sum,a)=>sum+(parseFloat(a.lastSale || a.price || 0)||0),0);
  return { total:allArtworks.length, listed:listed.length, floor, volume };
}

function updateMarketDashboard(){
  const stats=getCollectionStats();
  if($('market-total')) $('market-total').textContent=stats.total;
  if($('market-listed')) $('market-listed').textContent=stats.listed;
  if($('market-floor')) $('market-floor').textContent=stats.floor ? `${stats.floor.toFixed(2)} ETH` : '—';
  if($('market-volume')) $('market-volume').textContent=`${stats.volume.toFixed(1)} ETH`;
  renderActivityFeed();
}

function recordActivity(type, art, details=''){
  const item={
    type,
    title:art.title,
    details,
    time:new Date().toLocaleString([], { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }),
    tx:fakeHash(`${type}:${art.id}:${Date.now()}`),
  };
  activityLog=[item, ...activityLog].slice(0, 6);
  localStorage.setItem('mg_activity', JSON.stringify(activityLog));
  renderActivityFeed();
  return item;
}

function renderActivityFeed(){
  const feed=$('activity-feed');
  if(!feed) return;
  const rows=activityLog.length ? activityLog : [
    { type:'Listed', title:'The Starry Night', details:'2.5 ETH', time:'Apr 28, 09:00 AM', tx:fakeHash('seed:list') },
    { type:'Minted', title:'MetaGallery Curated', details:'12 tokens', time:'Apr 28, 08:45 AM', tx:fakeHash('seed:mint') },
  ];
  feed.innerHTML=rows.map(item=>`
    <button class="activity-row" data-tx="${item.tx}" title="Copy transaction hash">
      <span class="activity-type">${item.type}</span>
      <span class="activity-main">${item.title}</span>
      <span class="activity-detail">${item.details || truncHash(item.tx)}</span>
      <span class="activity-time">${item.time}</span>
    </button>
  `).join('');
}

function truncHash(h){ return h ? h.slice(0,8)+'…'+h.slice(-6) : '—'; }

/* ═══════════════════════════════════════════════════════════
   LOADER
═══════════════════════════════════════════════════════════ */
function setLoader(pct, msg){
  $('loader-fill').style.width = pct+'%';
  $('loader-msg').textContent  = msg;
}
function hideLoader(){
  const el=$('loader');
  el.style.transition='opacity 0.6s ease';
  el.style.opacity='0';
  setTimeout(()=>el.remove(), 700);
}

/* ═══════════════════════════════════════════════════════════
   WALLET
═══════════════════════════════════════════════════════════ */
async function connectWallet(){
  if(!window.ethereum){
    toast('No Wallet Found','Please install MetaMask or a Web3 wallet.','error'); return false;
  }
  try {
    const accounts = await window.ethereum.request({ method:'eth_requestAccounts' });
    if(!accounts.length) return false;
    walletAddress = accounts[0];
    const chainId = await window.ethereum.request({ method:'eth_chainId' });
    currentChainId = chainId;
    updateNetworkBadge(chainId);
    $('hud-addr').textContent = truncAddr(walletAddress);
    toast('Wallet Connected', truncAddr(walletAddress), 'success');
    window.ethereum.on('accountsChanged', a=>{ if(!a.length){ disconnectWallet(); return; } walletAddress=a[0]; $('hud-addr').textContent=truncAddr(a[0]); });
    window.ethereum.on('chainChanged',    c=>{ currentChainId=c; updateNetworkBadge(c); });
    return true;
  } catch(e){ toast('Connection Declined','User rejected the request.','error'); return false; }
}

async function disconnectWallet(){
  walletAddress = null;
  exitGallery();
  show('landing');
  toast('Disconnected','You have left the gallery.','info');
}

async function buyArtwork(art){
  if(!walletAddress){ toast('Not Connected','Connect your wallet first.','error'); return; }
  if(walletAddress.startsWith('0xGuest') || !window.ethereum){ toast('Wallet Required','Preview mode cannot submit blockchain transactions.','error'); return; }
  if(!art.forSale){ toast('Not for Sale','This artwork is unavailable.','error'); return; }
  if(art.owner.toLowerCase()===walletAddress.toLowerCase()){ toast('Already Owned','You own this artwork.','info'); return; }
  const weiHex = '0x'+BigInt(Math.round(parseFloat(art.price)*1e18)).toString(16);
  try {
    toast('Confirm in Wallet','Please confirm in MetaMask…','info',8000);
    const txHash = await window.ethereum.request({ method:'eth_sendTransaction',
      params:[{ from:walletAddress, to:art.owner, value:weiHex }] });
    const seller=art.owner;
    toast('Purchase Sent!','Tx: '+txHash.slice(0,18)+'…','success',6000);
    art.owner=walletAddress;
    art.forSale=false;
    art.lastSale=art.price;
    art.provenance=[
      ...(art.provenance || []),
      { type:'Sold', by:seller, to:walletAddress, at:new Date().toISOString().slice(0,10), price:`${art.price} ETH`, tx:txHash },
    ];
    recordActivity('Sold', art, `${art.price} ETH`);
    updateMarketDashboard();
    closeArtModal();
  } catch(e){ toast('Transaction Failed',e.message?.slice(0,60)||'Unknown error','error'); }
}

function truncAddr(a){ return a?a.slice(0,6)+'…'+a.slice(-4):'—'; }
function updateNetworkBadge(c){
  const n={'0x1':'Ethereum','0x89':'Polygon','0xa':'Optimism','0xa4b1':'Arbitrum','0x38':'BNB Chain','0x5':'Goerli'};
  $('hud-net').textContent = n[c]||'Chain '+parseInt(c,16);
}

function networkName(c){
  const n={'0x1':'Ethereum','0x89':'Polygon','0xa':'Optimism','0xa4b1':'Arbitrum','0x38':'BNB Chain','0x5':'Goerli'};
  return n[c] || `Chain ${parseInt(c || '0x1', 16)}`;
}

function enterGuestPreview(){
  walletAddress='0xGuest000000000000000000000000000000000000';
  $('hud-addr').textContent='Guest';
  updateNetworkBadge(currentChainId);
  enterGallery();
  toast('Preview Mode','Explore the gallery. Connect a wallet before buying.','info');
}

/* ═══════════════════════════════════════════════════════════
   SCENE INIT
═══════════════════════════════════════════════════════════ */
function initScene(){
  scene    = new THREE.Scene();
  scene.background = new THREE.Color(C.BG);
  scene.fog = new THREE.FogExp2(C.BG, 0.009); // very light fog

  camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 300);
  camera.position.set(0, 1.72, G.L/2 - 6);
  camera.rotation.order = 'YXZ';
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ antialias:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = false; // off for perf
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2.2; // bright!
  $('canvas-wrap').appendChild(renderer.domElement);

  clock = new THREE.Clock();
  window.__mg = { camera, scene, renderer };

  window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ═══════════════════════════════════════════════════════════
   PROCEDURAL TEXTURES
═══════════════════════════════════════════════════════════ */
function makeMarbleTex(){
  const c=document.createElement('canvas'); c.width=c.height=512;
  const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,512,512);
  g.addColorStop(0,'#1a1a32'); g.addColorStop(0.5,'#141420'); g.addColorStop(1,'#1e1e38');
  ctx.fillStyle=g; ctx.fillRect(0,0,512,512);
  for(let i=0;i<22;i++){
    ctx.beginPath();
    ctx.moveTo(Math.random()*512,Math.random()*512);
    ctx.bezierCurveTo(Math.random()*512,Math.random()*512,Math.random()*512,Math.random()*512,Math.random()*512,Math.random()*512);
    ctx.strokeStyle=`rgba(201,168,76,${Math.random()*0.06+0.01})`;
    ctx.lineWidth=Math.random()*2+0.5; ctx.stroke();
  }
  for(let i=0;i<10;i++){
    ctx.beginPath();
    ctx.moveTo(Math.random()*512,Math.random()*512);
    ctx.bezierCurveTo(Math.random()*512,Math.random()*512,Math.random()*512,Math.random()*512,Math.random()*512,Math.random()*512);
    ctx.strokeStyle=`rgba(255,255,255,${Math.random()*0.03+0.005})`;
    ctx.lineWidth=Math.random()*1.5; ctx.stroke();
  }
  const t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(5,5); return t;
}

function makeWallTex(){
  const c=document.createElement('canvas'); c.width=c.height=256;
  const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,0,256);
  g.addColorStop(0,'#161626'); g.addColorStop(1,'#111120');
  ctx.fillStyle=g; ctx.fillRect(0,0,256,256);
  for(let x=0;x<256;x+=2){
    for(let y=0;y<256;y+=2){
      const n=Math.random()*6;
      ctx.fillStyle=`rgba(255,255,255,${n*0.003})`; ctx.fillRect(x,y,2,2);
    }
  }
  const t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(4,2); return t;
}

/* ═══════════════════════════════════════════════════════════
   BEAUTIFUL FALLBACK ART TEXTURES
═══════════════════════════════════════════════════════════ */
function makeFallbackTex(art){
  const c=document.createElement('canvas'); c.width=512; c.height=640;
  const ctx=c.getContext('2d');
  const cols = art.fallbackColors || ['#1a1a2e','#16213e','#0f3460','#533483','#e94560'];
  const style = art.fallbackStyle || 'abstract';

  // Background gradient
  const bg=ctx.createLinearGradient(0,0,512,640);
  bg.addColorStop(0,cols[0]); bg.addColorStop(0.5,cols[1]); bg.addColorStop(1,cols[2]||cols[0]);
  ctx.fillStyle=bg; ctx.fillRect(0,0,512,640);

  if(style==='swirl'){
    // Van Gogh swirls
    for(let i=0;i<40;i++){
      const x=Math.random()*512, y=Math.random()*640, r=Math.random()*80+20;
      const g2=ctx.createRadialGradient(x,y,0,x,y,r);
      g2.addColorStop(0,cols[3]+'aa'); g2.addColorStop(1,'transparent');
      ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
    // Stars
    for(let i=0;i<120;i++){
      const x=Math.random()*512,y=Math.random()*300;
      const r=Math.random()*3+1;
      const g2=ctx.createRadialGradient(x,y,0,x,y,r*3);
      g2.addColorStop(0,cols[4]+'ff'); g2.addColorStop(1,'transparent');
      ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
    // Swirl lines
    for(let i=0;i<25;i++){
      ctx.beginPath();
      let px=Math.random()*512, py=Math.random()*640;
      ctx.moveTo(px,py);
      for(let j=0;j<20;j++){
        px+=Math.sin(j*0.4+i)*18; py+=Math.cos(j*0.3+i)*12;
        ctx.lineTo(px,py);
      }
      ctx.strokeStyle=cols[3]+'60'; ctx.lineWidth=3; ctx.stroke();
    }
  } else if(style==='wave'){
    // Hokusai wave
    for(let y=0;y<640;y++){
      const t=y/640;
      const r=parseInt(cols[0].slice(1,3),16)*(1-t)+parseInt(cols[2].slice(1,3),16)*t;
      const g2=parseInt(cols[0].slice(3,5),16)*(1-t)+parseInt(cols[2].slice(3,5),16)*t;
      const b=parseInt(cols[0].slice(5,7),16)*(1-t)+parseInt(cols[2].slice(5,7),16)*t;
      ctx.fillStyle=`rgb(${r|0},${g2|0},${b|0})`; ctx.fillRect(0,y,512,1);
    }
    // Wave shapes
    for(let w=0;w<5;w++){
      ctx.beginPath(); ctx.moveTo(0, 300+w*60);
      for(let x=0;x<512;x+=8){
        ctx.lineTo(x, 300+w*60 + Math.sin(x*0.04+w)*40 - Math.sin(x*0.02)*60);
      }
      ctx.strokeStyle=`rgba(${200-w*20},${220-w*20},255,${0.8-w*0.12})`; ctx.lineWidth=4-w*0.5; ctx.stroke();
    }
    // White foam
    for(let i=0;i<60;i++){
      const x=Math.random()*512, y=200+Math.random()*200;
      ctx.fillStyle=`rgba(255,255,255,${Math.random()*0.6+0.1})`;
      ctx.beginPath(); ctx.ellipse(x,y,Math.random()*20+4,Math.random()*6+2,Math.random(),0,Math.PI*2); ctx.fill();
    }
  } else if(style==='ripple'){
    // Monet water lilies
    for(let i=0;i<8;i++){
      const cx2=Math.random()*512, cy2=Math.random()*640;
      for(let r=5;r<120;r+=15){
        ctx.beginPath(); ctx.ellipse(cx2,cy2,r,r*0.4,Math.random(),0,Math.PI*2);
        ctx.strokeStyle=`rgba(100,200,150,${0.3-r*0.002})`; ctx.lineWidth=2; ctx.stroke();
      }
    }
    // Lily pads
    for(let i=0;i<12;i++){
      const x=Math.random()*512, y=Math.random()*640;
      const r=Math.random()*30+15;
      const g2=ctx.createRadialGradient(x,y,0,x,y,r);
      g2.addColorStop(0,cols[3]+'cc'); g2.addColorStop(1,cols[2]+'44');
      ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(x,y,r,0.2,Math.PI*2); ctx.fill();
    }
    // Flower highlights
    for(let i=0;i<20;i++){
      const x=Math.random()*512, y=Math.random()*640, r=Math.random()*12+4;
      const g2=ctx.createRadialGradient(x,y,0,x,y,r);
      g2.addColorStop(0,cols[4]+'ee'); g2.addColorStop(1,'transparent');
      ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
  } else if(style==='scream'){
    // Edvard Munch — swirling dramatic sky
    for(let y=0;y<640;y++){
      const t=y/640;
      ctx.fillStyle=y<320 ? `rgba(248,${120+t*80|0},${20+t*30|0},1)` : `rgba(${40+t*30|0},${30+t*20|0},${60+t*40|0},1)`;
      ctx.fillRect(0,y,512,1);
    }
    for(let i=0;i<30;i++){
      ctx.beginPath(); ctx.moveTo(0, 80+i*8);
      for(let x=0;x<512;x+=16){
        ctx.lineTo(x, 80+i*8+Math.sin(x*0.05+i*0.3)*30);
      }
      ctx.strokeStyle=`rgba(220,${60+i*3},20,0.4)`; ctx.lineWidth=3; ctx.stroke();
    }
    // Dark figure silhouette
    ctx.fillStyle='rgba(10,5,20,0.85)';
    ctx.beginPath(); ctx.ellipse(256,420,50,70,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(206,420); ctx.lineTo(256,360); ctx.lineTo(306,420);
    ctx.lineTo(276,560); ctx.lineTo(236,560); ctx.closePath(); ctx.fill();
  } else if(style==='surreal'){
    // Dalí persistence
    const bg2=ctx.createLinearGradient(0,0,512,640);
    bg2.addColorStop(0,cols[0]); bg2.addColorStop(0.5,cols[2]); bg2.addColorStop(1,cols[1]);
    ctx.fillStyle=bg2; ctx.fillRect(0,0,512,640);
    // Horizon line
    ctx.strokeStyle=cols[3]+'88'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(0,320); ctx.lineTo(512,320); ctx.stroke();
    // Melting watch shapes
    for(let i=0;i<3;i++){
      const wx=80+i*160, wy=280+i*20;
      ctx.strokeStyle=cols[4]; ctx.lineWidth=2;
      ctx.beginPath(); ctx.ellipse(wx,wy,50,35,0,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(wx,wy+35); ctx.bezierCurveTo(wx+20,wy+80,wx-10,wy+120,wx-20,wy+160);
      ctx.strokeStyle=cols[3]; ctx.lineWidth=3; ctx.stroke();
    }
  } else if(style==='venus'){
    // Botticelli - soft pink/pearl
    const bg2=ctx.createRadialGradient(256,300,0,256,300,300);
    bg2.addColorStop(0,cols[3]+'ff'); bg2.addColorStop(0.5,cols[2]+'cc'); bg2.addColorStop(1,cols[0]);
    ctx.fillStyle=bg2; ctx.fillRect(0,0,512,640);
    // Shell shape
    ctx.strokeStyle=cols[4]+'88'; ctx.lineWidth=1.5;
    for(let r=20;r<180;r+=20){
      ctx.beginPath(); ctx.arc(256,520,r,Math.PI,Math.PI*2); ctx.stroke();
    }
    for(let a=-Math.PI/2;a<=Math.PI/2;a+=Math.PI/6){
      ctx.beginPath(); ctx.moveTo(256,520); ctx.lineTo(256+Math.cos(a)*180,520+Math.sin(a)*180); ctx.stroke();
    }
    // Waves
    for(let i=0;i<8;i++){
      ctx.beginPath(); ctx.moveTo(0,480+i*20);
      for(let x=0;x<=512;x+=20){
        ctx.lineTo(x,480+i*20+Math.sin(x*0.04+i)*15);
      }
      ctx.strokeStyle=`rgba(160,${200-i*10},${220-i*10},0.4)`; ctx.lineWidth=2; ctx.stroke();
    }
  } else if(style==='flower'){
    // Van Gogh sunflowers
    const bg2=ctx.createLinearGradient(0,0,0,640);
    bg2.addColorStop(0,cols[2]); bg2.addColorStop(1,cols[0]);
    ctx.fillStyle=bg2; ctx.fillRect(0,0,512,640);
    for(let f=0;f<6;f++){
      const fx=80+Math.random()*350, fy=80+Math.random()*500;
      const fr=Math.random()*40+20;
      for(let p=0;p<12;p++){
        const a=p/12*Math.PI*2;
        const g2=ctx.createRadialGradient(fx+Math.cos(a)*(fr+10),fy+Math.sin(a)*(fr+10),0,fx+Math.cos(a)*(fr+10),fy+Math.sin(a)*(fr+10),fr*0.7);
        g2.addColorStop(0,cols[4]); g2.addColorStop(1,cols[3]+'88');
        ctx.fillStyle=g2; ctx.beginPath(); ctx.ellipse(fx+Math.cos(a)*(fr+10),fy+Math.sin(a)*(fr+10),fr*0.35,fr*0.6,a,0,Math.PI*2); ctx.fill();
      }
      const g2=ctx.createRadialGradient(fx,fy,0,fx,fy,fr);
      g2.addColorStop(0,'#4a2800'); g2.addColorStop(1,'#2a1400');
      ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(fx,fy,fr,0,Math.PI*2); ctx.fill();
    }
  } else if(style==='dots'){
    // Seurat pointilism
    const bg2=ctx.createLinearGradient(0,0,0,640);
    bg2.addColorStop(0,cols[1]); bg2.addColorStop(0.6,cols[2]); bg2.addColorStop(1,cols[0]);
    ctx.fillStyle=bg2; ctx.fillRect(0,0,512,640);
    const dotCols=[cols[0],cols[1],cols[2],cols[3],cols[4],'#ffffff','#a0ffd0','#80d0ff'];
    for(let i=0;i<2500;i++){
      const x=Math.random()*512, y=Math.random()*640, r=Math.random()*4+1;
      ctx.fillStyle=dotCols[Math.floor(Math.random()*dotCols.length)]+'cc';
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
  } else if(style==='classical'){
    // Raphael School of Athens — blue arches
    const bg2=ctx.createLinearGradient(0,0,0,640);
    bg2.addColorStop(0,cols[2]); bg2.addColorStop(0.5,cols[1]); bg2.addColorStop(1,cols[0]);
    ctx.fillStyle=bg2; ctx.fillRect(0,0,512,640);
    // Arch shapes
    for(let i=0;i<3;i++){
      const ax=60+i*130, aw=120-i*20, ah=300-i*60;
      ctx.strokeStyle=`rgba(150,${180+i*20},255,${0.6-i*0.15})`; ctx.lineWidth=3-i*0.5;
      ctx.beginPath(); ctx.arc(ax+aw/2,640,aw/2,Math.PI,Math.PI*2); ctx.stroke();
    }
    // Pillars
    for(let i=0;i<4;i++){
      ctx.fillStyle=`rgba(80,120,200,0.25)`;
      ctx.fillRect(50+i*110,300,18,340);
    }
    // Figures (dots of light)
    for(let i=0;i<30;i++){
      const x=60+Math.random()*400, y=380+Math.random()*200;
      const g2=ctx.createRadialGradient(x,y,0,x,y,12);
      g2.addColorStop(0,cols[4]+'cc'); g2.addColorStop(1,'transparent');
      ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(x,y,12,0,Math.PI*2); ctx.fill();
    }
  } else {
    // Generic portrait: subtle vignette
    const g2=ctx.createRadialGradient(256,300,30,256,300,280);
    g2.addColorStop(0,cols[2]+'aa'); g2.addColorStop(1,cols[0]);
    ctx.fillStyle=g2; ctx.fillRect(0,0,512,640);
    for(let i=0;i<20;i++){
      const x=Math.random()*512, y=Math.random()*640, r=Math.random()*30+10;
      ctx.fillStyle=`${cols[3]}33`; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
  }

  // Bottom label band
  ctx.fillStyle='rgba(0,0,0,0.65)';
  ctx.fillRect(0,560,512,80);
  ctx.fillStyle=art.forSale?'#c9a84c':'#8888aa';
  ctx.font='bold 22px Playfair Display, serif';
  ctx.fillText(art.title.slice(0,32), 16, 590);
  ctx.fillStyle='rgba(200,195,230,0.7)';
  ctx.font='16px Space Grotesk, sans-serif';
  ctx.fillText(`${art.artist}  ·  ${art.year}`, 16, 614);
  ctx.fillStyle=art.forSale?'#e8c860':'#555577';
  ctx.font='bold 16px Space Grotesk, sans-serif';
  ctx.fillText(art.forSale?`${art.price} ETH`:'Not for Sale', 16, 634);

  return new THREE.CanvasTexture(c);
}

/* ═══════════════════════════════════════════════════════════
   GALLERY GEOMETRY
═══════════════════════════════════════════════════════════ */
function buildGallery(){
  const floorTex = makeMarbleTex();
  const wallTex  = makeWallTex();

  const floorMat = new THREE.MeshStandardMaterial({ map:floorTex, roughness:0.35, metalness:0.18 });
  const wallMat  = new THREE.MeshStandardMaterial({ map:wallTex,  roughness:0.82, metalness:0.02 });
  const ceilMat  = new THREE.MeshStandardMaterial({ color:0x10101e, roughness:0.9 });
  const goldMat  = new THREE.MeshStandardMaterial({ color:C.GOLD, metalness:0.95, roughness:0.06 });
  const trimMat  = new THREE.MeshStandardMaterial({ color:0x1e1e38, roughness:0.75 });

  // Floor
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(G.W, G.L), floorMat);
  floor.rotation.x=-Math.PI/2; scene.add(floor);

  // Ceiling
  const ceil=new THREE.Mesh(new THREE.PlaneGeometry(G.W, G.L), ceilMat);
  ceil.rotation.x=Math.PI/2; ceil.position.y=G.H; scene.add(ceil);

  // Walls
  const wMat = wallMat;
  [
    { pos:[-(G.W/2),G.H/2,0], sz:[0.3,G.H,G.L] },
    { pos:[ G.W/2, G.H/2,0], sz:[0.3,G.H,G.L] },
    { pos:[0,G.H/2,-(G.L/2)], sz:[G.W,G.H,0.3], ry:0 },
    { pos:[0,G.H/2, G.L/2],  sz:[G.W,G.H,0.3], ry:0 },
  ].forEach(w=>{
    const m=new THREE.Mesh(new THREE.BoxGeometry(...w.sz), wMat);
    m.position.set(...w.pos); scene.add(m);
  });

  // Gold baseboard + crown molding
  const bsGeo=new THREE.BoxGeometry(0.1,0.24,G.L);
  const cmGeo=new THREE.BoxGeometry(0.08,0.14,G.L);
  [-(G.W/2)+0.22, G.W/2-0.22].forEach(x=>{
    const bs=new THREE.Mesh(bsGeo,goldMat); bs.position.set(x,0.12,0); scene.add(bs);
    const cm=new THREE.Mesh(cmGeo,goldMat); cm.position.set(x,G.H-0.07,0); scene.add(cm);
  });

  // Ceiling centre track
  const track=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.1,G.L-2), new THREE.MeshStandardMaterial({color:0x1c1c34,roughness:0.7}));
  track.position.set(0,G.H-0.05,0); scene.add(track);

  // Ceiling light emissive housing
  const houseMat=new THREE.MeshStandardMaterial({color:0x2a2a50,roughness:0.5,emissive:0xfff5e0,emissiveIntensity:0.8});
  [-22,-14,-6,2,10,18].forEach(z=>{
    const h=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.14,0.7),houseMat);
    h.position.set(0,G.H-0.07,z); scene.add(h);
  });

  // Decorative pillars
  const pilH=G.H-0.3;
  [-24,-16,-8,0,8,16,24].forEach(z=>{
    [-(G.W/2)+0.32, G.W/2-0.32].forEach(x=>{
      const p=new THREE.Mesh(new THREE.BoxGeometry(0.2,pilH,0.2), trimMat);
      p.position.set(x,pilH/2,z); scene.add(p);
      const cap=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.09,0.3),goldMat);
      cap.position.set(x,pilH+0.045,z); scene.add(cap);
      const base=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.09,0.3),goldMat);
      base.position.set(x,0.045,z); scene.add(base);
    });
  });

  // Entrance arch
  const archMat2=new THREE.MeshStandardMaterial({color:0x181830,roughness:0.8});
  [-4,4].forEach(x=>{
    const p=new THREE.Mesh(new THREE.BoxGeometry(0.65,G.H*0.86,0.65),archMat2);
    p.position.set(x,G.H*0.86/2,G.L/2-0.35); scene.add(p);
    const cap=new THREE.Mesh(new THREE.BoxGeometry(0.95,0.18,0.95),goldMat);
    cap.position.set(x,G.H*0.86,G.L/2-0.35); scene.add(cap);
  });
  const beam=new THREE.Mesh(new THREE.BoxGeometry(10,0.32,0.6),archMat2);
  beam.position.set(0,G.H*0.86+0.16,G.L/2-0.35); scene.add(beam);

  // Gold floor inlay lines
  const inlayMat=new THREE.MeshStandardMaterial({color:C.GOLD,metalness:0.92,roughness:0.08,transparent:true,opacity:0.3});
  [-5,5].forEach(x=>{
    const m=new THREE.Mesh(new THREE.PlaneGeometry(0.07,G.L-4),inlayMat);
    m.rotation.x=-Math.PI/2; m.position.set(x,0.001,0); scene.add(m);
  });

  // Back wall decorative panel
  const panelMat=new THREE.MeshStandardMaterial({color:0x18182e,roughness:0.8});
  const panel=new THREE.Mesh(new THREE.BoxGeometry(14,6.5,0.08),panelMat);
  panel.position.set(0,3.5,-(G.L/2)+0.4); scene.add(panel);
  // Panel border
  const pbMat=new THREE.MeshStandardMaterial({color:C.GOLD,metalness:0.9,roughness:0.1});
  [[14.3,0.12,0.12,0,3.5],[14.3,0.12,0.12,0,0],[0.12,6.74,0.12,-7.15,3.5],[0.12,6.74,0.12,7.15,3.5]].forEach(([w,h,d,x,y])=>{
    const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),pbMat);
    m.position.set(x,y,-(G.L/2)+0.45); scene.add(m);
  });
}

/* ═══════════════════════════════════════════════════════════
   LIGHTING — BRIGHT MUSEUM
═══════════════════════════════════════════════════════════ */
function buildLights(){
  // Strong ambient (no dark corners)
  scene.add(new THREE.AmbientLight(0x3a3a6a, 4.0));

  // Hemisphere sky/ground fill
  scene.add(new THREE.HemisphereLight(0x6688cc, 0x332244, 2.5));

  // Ceiling track lights — main illumination
  [-22,-14,-6,2,10,18].forEach(z=>{
    const pl=new THREE.PointLight(C.WARM, 6.0, 35, 1.2);
    pl.position.set(0, G.H-0.2, z);
    scene.add(pl);
  });

  // Wall-wash accent lights (both sides)
  [-20,-8,6,18].forEach(z=>{
    [-(G.W/2)+2.0, G.W/2-2.0].forEach(x=>{
      const pl=new THREE.PointLight(0xffeedd, 3.5, 20, 1.5);
      pl.position.set(x, G.H-0.6, z);
      scene.add(pl);
    });
  });

  // Entrance welcome light (gold)
  const entry=new THREE.PointLight(0xd4aa50, 5.0, 24, 1.5);
  entry.position.set(0, G.H-0.5, G.L/2-4);
  scene.add(entry);

  // Back wall feature spot
  const back=new THREE.SpotLight(C.WARM, 12, 25, Math.PI/5, 0.35, 1.2);
  back.position.set(0, G.H-0.3, -G.L/2+10);
  back.target.position.set(0, 3.5, -G.L/2+1.5);
  scene.add(back); scene.add(back.target);

  // Floor bounce / fill
  const bounce=new THREE.PointLight(0x8899cc, 1.8, 40, 2);
  bounce.position.set(0, 0.3, 0);
  scene.add(bounce);
}

/* ═══════════════════════════════════════════════════════════
   ARTWORK PLACEMENT
═══════════════════════════════════════════════════════════ */
function artworkPosition(wall, wi){
  const zSlots=[20,12,4,-4,-12,-20];
  const z=zSlots[wi]??(20-wi*8);
  if(wall==='left')  return { pos:[-(G.W/2)+0.24, 3.5, z], ry:Math.PI/2  };
  if(wall==='right') return { pos:[ G.W/2-0.24,   3.5, z], ry:-Math.PI/2 };
  const xSlots=[0,-7,7,-3.5,3.5,-10,10];
  return { pos:[xSlots[wi]??(wi*6-12), 3.5, -(G.L/2)+0.24], ry:0 };
}

function makePlacardTex(art){
  const c=document.createElement('canvas'); c.width=512; c.height=120;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#0e0e20'; ctx.fillRect(0,0,512,120);
  ctx.fillStyle='rgba(201,168,76,0.15)'; ctx.fillRect(0,0,512,2);
  ctx.fillStyle='#c9a84c';
  ctx.font='bold 26px Playfair Display, serif';
  ctx.fillText(art.title.slice(0,38), 18, 36);
  ctx.fillStyle='rgba(180,175,210,0.75)';
  ctx.font='19px Space Grotesk, sans-serif';
  ctx.fillText(`${art.artist}  ·  ${art.year}`, 18, 66);
  ctx.fillStyle=art.forSale?'#e8c860':'#555577';
  ctx.font='bold 20px Space Grotesk, sans-serif';
  ctx.fillText(art.forSale?`${art.price} ETH  —  For Sale`:'Not for Sale', 18, 100);
  return new THREE.CanvasTexture(c);
}

function placeArtwork(art){
  const {pos, ry} = artworkPosition(art.wall, art.wi);
  const AW=3.5, AH=4.2;
  const group=new THREE.Group();
  group.position.set(...pos);
  group.rotation.y=ry;
  scene.add(group);

  // Back mount slab
  const mount=new THREE.Mesh(new THREE.BoxGeometry(AW+0.6,AH+0.6,0.1),
    new THREE.MeshStandardMaterial({color:0x080814,roughness:0.9}));
  mount.position.z=-0.05; group.add(mount);

  // Gold frame — 4 bars + 4 corner squares
  const fT=0.16, fD=0.14;
  const fMat=new THREE.MeshStandardMaterial({color:C.GOLD,metalness:0.96,roughness:0.07});
  [
    { sz:[AW+0.32,fT,fD],  pos:[0, AH/2+fT/2,   0.02] },
    { sz:[AW+0.32,fT,fD],  pos:[0,-AH/2-fT/2,   0.02] },
    { sz:[fT,AH,fD],       pos:[-(AW/2+fT/2), 0, 0.02] },
    { sz:[fT,AH,fD],       pos:[ AW/2+fT/2,   0, 0.02] },
  ].forEach(f=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(...f.sz),fMat); m.position.set(...f.pos); group.add(m); });
  // Corner ornaments
  const cGeo=new THREE.BoxGeometry(fT+0.05,fT+0.05,fD+0.03);
  [[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([sx,sy])=>{
    const m=new THREE.Mesh(cGeo,fMat); m.position.set(sx*(AW/2+fT/2),sy*(AH/2+fT/2),0.02); group.add(m);
  });

  // Inner mat (gallery-style cream mat board)
  const matBoard=new THREE.Mesh(new THREE.PlaneGeometry(AW+0.02, AH+0.02),
    new THREE.MeshStandardMaterial({color:0x1a1a2e,roughness:0.95}));
  matBoard.position.z=0.02; group.add(matBoard);

  // Artwork canvas
  const artMesh=new THREE.Mesh(new THREE.PlaneGeometry(AW, AH),
    new THREE.MeshStandardMaterial({color:0x444460,roughness:0.8}));
  artMesh.position.z=0.05;
  artMesh.userData.artworkId=art.id;
  group.add(artMesh);

  // Show fallback immediately — don't leave it black
  const fallback=makeFallbackTex(art);
  artMesh.material.map=fallback;
  artMesh.material.color.set(0xffffff);
  artMesh.material.needsUpdate=true;

  // Try to load real image
  const loader=new THREE.TextureLoader();
  loader.crossOrigin='anonymous';
  loader.load(art.img,
    tex=>{ tex.colorSpace=THREE.SRGBColorSpace; artMesh.material.map=tex; artMesh.material.needsUpdate=true; },
    undefined, ()=>{} // keep fallback on error
  );

  // Placard
  const placard=new THREE.Mesh(new THREE.PlaneGeometry(AW+0.08,0.62),
    new THREE.MeshStandardMaterial({map:makePlacardTex(art),roughness:0.85}));
  placard.position.set(0,-(AH/2+0.5),0.02); group.add(placard);

  // Per-artwork spotlight (from ceiling)
  const spX=pos[0]===0 ? 0 : (pos[0]>0 ? pos[0]-2.5 : pos[0]+2.5);
  const spot=new THREE.SpotLight(C.WARM, 8.0, 16, Math.PI/6, 0.4, 1.5);
  spot.position.set(spX, G.H-0.2, pos[2]);
  spot.target=artMesh;
  scene.add(spot); scene.add(spot.target);

  // Register for raycasting
  artworkMeshes.push(artMesh);
  meshToArtwork.set(artMesh.uuid, art);
  art._group=group;
}

/* ═══════════════════════════════════════════════════════════
   PARTICLES
═══════════════════════════════════════════════════════════ */
function buildParticles(){
  const count=700, pos=new Float32Array(count*3);
  for(let i=0;i<count;i++){
    pos[i*3]=(Math.random()-0.5)*G.W*0.9;
    pos[i*3+1]=Math.random()*G.H;
    pos[i*3+2]=(Math.random()-0.5)*G.L*0.9;
  }
  particlePositions=pos;
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  particles=new THREE.Points(geo,new THREE.PointsMaterial({color:0xfff8ee,size:0.032,transparent:true,opacity:0.28,sizeAttenuation:true}));
  scene.add(particles);
}

/* ═══════════════════════════════════════════════════════════
   FREE MOUSE-LOOK (no pointer lock needed)
═══════════════════════════════════════════════════════════ */
function setupMouseLook(){
  document.addEventListener('mousemove', e=>{
    if(!inGallery) return;
    // Map mouse position to look angles
    const cx=window.innerWidth/2, cy=window.innerHeight/2;
    const nx=(e.clientX-cx)/cx;  // -1 to +1
    const ny=(e.clientY-cy)/cy;  // -1 to +1
    targetYaw  = -nx * LOOK_H;          // horizontal look range
    targetPitch = Math.max(-0.55, Math.min(0.55, -ny * LOOK_V)); // vertical clamped
  });
}

/* ═══════════════════════════════════════════════════════════
   KEYBOARD MOVEMENT
═══════════════════════════════════════════════════════════ */
function setupMovement(){
  document.addEventListener('keydown', e=>{
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault();
    if(e.code==='Escape'){
      if(visible('art-modal')) closeArtModal();
      else if(visible('add-modal')) closeAddModal();
      else if(visible('wallet-modal')) hide('wallet-modal');
      else if(inGallery) show('pause-overlay');
      moveF=moveB=moveL=moveR=false;
      return;
    }
    if(e.target?.matches?.('input, textarea, select')) return;
    if(modalOpen()) return;
    switch(e.code){
      case'KeyW':case'ArrowUp':    moveF=true;  break;
      case'KeyS':case'ArrowDown':  moveB=true;  break;
      case'KeyA':case'ArrowLeft':  moveL=true;  break;
      case'KeyD':case'ArrowRight': moveR=true;  break;
      case'KeyE': if(hoveredId) openArtModal(meshToArtwork.get(hoveredId)); break;
    }
  });
  document.addEventListener('keyup', e=>{
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault();
    switch(e.code){
      case'KeyW':case'ArrowUp':    moveF=false; break;
      case'KeyS':case'ArrowDown':  moveB=false; break;
      case'KeyA':case'ArrowLeft':  moveL=false; break;
      case'KeyD':case'ArrowRight': moveR=false; break;
    }
  });

  // Click on canvas = interact with hovered artwork
  renderer.domElement.addEventListener('click', e=>{
    if(!inGallery) return;
    // Raycast from click position
    const mouse=new THREE.Vector2(
      (e.clientX/window.innerWidth)*2-1,
      -(e.clientY/window.innerHeight)*2+1
    );
    raycaster.setFromCamera(mouse, camera);
    const hits=raycaster.intersectObjects(artworkMeshes,false);
    if(hits.length>0 && hits[0].distance<60){
      openArtModal(meshToArtwork.get(hits[0].object.uuid));
    }
  });
}

function tickMovement(delta){
  if(!inGallery || modalOpen()) return;
  const speed=55, fric=14;
  velocity.x -= velocity.x*fric*delta;
  velocity.z -= velocity.z*fric*delta;

  const inputX=Number(moveR)-Number(moveL);
  const inputZ=Number(moveF)-Number(moveB);
  if(inputX || inputZ){
    const forward=new THREE.Vector3(-Math.sin(camYaw), 0, -Math.cos(camYaw));
    const right=new THREE.Vector3(Math.cos(camYaw), 0, -Math.sin(camYaw));
    const desired=forward.multiplyScalar(inputZ).add(right.multiplyScalar(inputX)).normalize();
    velocity.x += desired.x*speed*delta;
    velocity.z += desired.z*speed*delta;
  }

  camera.position.x += velocity.x*delta;
  camera.position.z += velocity.z*delta;

  // Clamp
  const hw=G.W/2-1.3, hl=G.L/2-1.3;
  camera.position.x=Math.max(-hw,Math.min(hw,camera.position.x));
  camera.position.z=Math.max(-hl,Math.min(hl,camera.position.z));
  camera.position.y=1.72;
}

/* ═══════════════════════════════════════════════════════════
   RAYCASTING / HOVER
═══════════════════════════════════════════════════════════ */
function tickRaycast(){
  if(!inGallery) return;
  // Cast from screen centre
  raycaster.setFromCamera(new THREE.Vector2(0,0), camera);
  const hits=raycaster.intersectObjects(artworkMeshes,false);
  if(hits.length>0 && hits[0].distance<60){
    const id=hits[0].object.uuid;
    if(id!==hoveredId){
      hoveredId=id;
      const art=meshToArtwork.get(id);
      $('ih-text').textContent=`"${art.title}" — Click to view`;
      show('interact-hint');
    }
  } else {
    if(hoveredId){ hoveredId=null; hide('interact-hint'); }
  }
}

/* ═══════════════════════════════════════════════════════════
   ART MODAL
═══════════════════════════════════════════════════════════ */
function openArtModal(art){
  if(!art) return;
  selectedArtwork=art;
  $('art-img').src=art.img;
  $('art-name').textContent=art.title;
  $('art-by').textContent=`by ${art.artist} · ${art.year}`;
  $('art-desc').textContent=art.desc;
  $('art-owner').textContent=truncAddr(art.owner);
  $('art-chain').textContent=art.chain || networkName(currentChainId);
  $('art-contract').textContent=truncAddr(art.contract);
  $('art-token').textContent=`#${art.tokenId}`;
  $('art-royalty').textContent=`${((art.royaltyBps || 0)/100).toFixed(1)}%`;
  $('art-standard').textContent=art.tokenStandard || 'ERC-721';
  $('art-verified').textContent=art.verified ? 'Verified' : 'Unverified';
  $('art-price').textContent=art.forSale?`${art.price} ETH`:'—';
  renderProvenance(art);
  const b=$('art-sale-badge');
  if(art.forSale){
    b.textContent='For Sale'; b.classList.remove('not-for-sale');
    $('btn-buy').disabled=false; $('btn-buy').textContent=`Buy for ${art.price} ETH`;
  } else {
    b.textContent='Not for Sale'; b.classList.add('not-for-sale');
    $('btn-buy').disabled=true; $('btn-buy').textContent='Not Available';
  }
  show('art-modal');
}
function closeArtModal(){ hide('art-modal'); selectedArtwork=null; }

function renderProvenance(art){
  const rows=(art.provenance || []).slice(-4).reverse();
  $('art-provenance').innerHTML=rows.map(row=>`
    <div class="prov-row">
      <span class="prov-dot"></span>
      <div>
        <strong>${row.type}</strong>
        <small>${row.price || row.at || ''} ${row.to ? `to ${truncAddr(row.to)}` : ''}</small>
      </div>
      <button class="prov-tx" data-tx="${row.tx}" title="Copy transaction hash">${truncHash(row.tx)}</button>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════
   ADD ART MODAL
═══════════════════════════════════════════════════════════ */
function openAddModal(){ show('add-modal'); }
function closeAddModal(){ hide('add-modal'); }

function handleAddArt(e){
  e.preventDefault();
  const url   =$('f-url').value.trim();
  const title =$('f-title').value.trim();
  const artist=$('f-artist').value.trim()||(walletAddress?truncAddr(walletAddress):'Anonymous');
  const desc  =$('f-desc').value.trim()||'A digital artwork.';
  const price =parseFloat($('f-price').value)||0;
  const forSale=$('f-forsale').checked;
  const contract=$('f-contract').value.trim() || `0x${fakeHash(`${title}:contract`).slice(2,42)}`;
  const tokenId=$('f-token').value.trim() || String(Date.now()).slice(-7);
  const royaltyBps=Math.round((parseFloat($('f-royalty').value) || 7.5) * 100);
  const tokenStandard=$('f-standard').value;
  if(!url||!title){ toast('Missing Fields','Fill in required fields.','error'); return; }

  const counts={
    left: allArtworks.filter(a=>a.wall==='left').length,
    right:allArtworks.filter(a=>a.wall==='right').length,
    back: allArtworks.filter(a=>a.wall==='back').length,
  };
  const wall=Object.keys(counts).reduce((a,b)=>counts[a]<=counts[b]?a:b);
  const art=enrichArtwork({
    id:'u_'+Date.now(), title, artist, year:new Date().getFullYear().toString(),
    desc, img:url, price:price.toFixed(3),
    owner:walletAddress||'0x0000000000000000000000000000000000000000',
    creator:walletAddress||'0x0000000000000000000000000000000000000000',
    forSale, wall, wi:counts[wall], contract, tokenId, royaltyBps, tokenStandard,
    collection:'Community Vault',
    chain:networkName(currentChainId),
    verified:Boolean(walletAddress),
    fallbackColors:['#1a1a2e','#2a2a4e','#3a3a6e','#c9a84c','#e8d87a'],
    fallbackStyle:'abstract',
  });
  allArtworks.push(art);
  placeArtwork(art);
  $('stat-count').textContent=allArtworks.length;
  const saved=JSON.parse(localStorage.getItem('mg_arts')||'[]');
  saved.push(art); localStorage.setItem('mg_arts',JSON.stringify(saved));
  recordActivity(forSale ? 'Listed' : 'Minted', art, forSale ? `${art.price} ETH` : `Token #${art.tokenId}`);
  updateMarketDashboard();
  toast('Artwork Added!',`"${title}" is live in the gallery.`,'success');
  closeAddModal(); e.target.reset(); hide('add-preview');
}

/* ═══════════════════════════════════════════════════════════
   ENTER / EXIT GALLERY
═══════════════════════════════════════════════════════════ */
function enterGallery(){
  hide('landing'); hide('wallet-modal');
  show('canvas-wrap'); show('gallery-hud');
  inGallery=true;
  // Show controls hint, fade after 6s
  const hint=$('hud-controls');
  hint.style.opacity='1';
  setTimeout(()=>{ hint.style.transition='opacity 2s ease'; hint.style.opacity='0'; }, 6000);
}
function exitGallery(){
  inGallery=false;
  hide('canvas-wrap'); hide('gallery-hud'); hide('pause-overlay');
  show('landing');
}

/* ═══════════════════════════════════════════════════════════
   LANDING BG CANVAS
═══════════════════════════════════════════════════════════ */
function initBgCanvas(){
  const cv=$('bg-canvas'), ctx=cv.getContext('2d');
  cv.width=window.innerWidth; cv.height=window.innerHeight;
  window.addEventListener('resize',()=>{ cv.width=window.innerWidth; cv.height=window.innerHeight; });

  const pts=Array.from({length:150},()=>({
    x:Math.random()*cv.width, y:Math.random()*cv.height,
    vx:(Math.random()-0.5)*0.35, vy:(Math.random()-0.5)*0.35,
    r:Math.random()*1.8+0.4, op:Math.random()*0.55+0.1,
    col:Math.random()>0.65?'#c9a84c':Math.random()>0.5?'#6a3de8':'#ffffff',
  }));

  (function frame(){
    ctx.fillStyle='rgba(7,7,14,0.15)'; ctx.fillRect(0,0,cv.width,cv.height);
    pts.forEach(p=>{
      p.x=(p.x+p.vx+cv.width)%cv.width; p.y=(p.y+p.vy+cv.height)%cv.height;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.col; ctx.globalAlpha=p.op; ctx.fill();
    });
    ctx.globalAlpha=1;
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<90){
        ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(201,168,76,${(1-d/90)*0.09})`; ctx.lineWidth=0.5; ctx.stroke();
      }
    }
    requestAnimationFrame(frame);
  })();
}

/* ═══════════════════════════════════════════════════════════
   ANIMATION LOOP
═══════════════════════════════════════════════════════════ */
function animate(){
  requestAnimationFrame(animate);
  const delta=Math.min(clock.getDelta(), 0.05);

  // Smooth mouse look
  camYaw   += (targetYaw   - camYaw)   * LOOK_SMOOTH;
  camPitch += (targetPitch - camPitch) * LOOK_SMOOTH;
  camera.rotation.y = camYaw;
  camera.rotation.x = camPitch;

  tickMovement(delta);
  tickRaycast();

  // Float particles upward
  if(particlePositions){
    for(let i=1;i<particlePositions.length;i+=3){
      particlePositions[i]+=0.003*delta*60;
      if(particlePositions[i]>G.H) particlePositions[i]=0;
    }
    particles.geometry.attributes.position.needsUpdate=true;
  }

  renderer.render(scene, camera);
}

/* ═══════════════════════════════════════════════════════════
   WIRE UI
═══════════════════════════════════════════════════════════ */
function wireUI(){
  $('open-wallet-btn').addEventListener('click',()=>show('wallet-modal'));
  $('guest-preview-btn').addEventListener('click',enterGuestPreview);
  $('wm-close').addEventListener('click',()=>hide('wallet-modal'));
  $('wallet-modal').addEventListener('click',e=>{ if(e.target===$('wallet-modal')) hide('wallet-modal'); });

  async function tryConnect(){
    hide('wallet-modal');
    const ok=await connectWallet();
    if(ok) enterGallery(); else show('wallet-modal');
  }
  $('btn-metamask').addEventListener('click',tryConnect);
  $('btn-coinbase').addEventListener('click',tryConnect);
  $('btn-other').addEventListener('click',tryConnect);

  $('hud-add-btn').addEventListener('click',openAddModal);
  $('hud-exit').addEventListener('click',()=>{ if(confirm('Exit the gallery?')) disconnectWallet(); });

  $('pause-resume').addEventListener('click',()=>hide('pause-overlay'));
  $('pause-add').addEventListener('click',openAddModal);
  $('pause-disconnect').addEventListener('click',()=>{ if(confirm('Disconnect?')) disconnectWallet(); });

  $('art-close').addEventListener('click',closeArtModal);
  $('art-modal').addEventListener('click',e=>{ if(e.target===$('art-modal')) closeArtModal(); });
  $('btn-buy').addEventListener('click',()=>{ if(selectedArtwork) buyArtwork(selectedArtwork); });
  $('btn-share').addEventListener('click',()=>{
    navigator.clipboard?.writeText(window.location.href);
    toast('Link Copied','Gallery link copied.','info');
  });
  $('btn-etherscan').addEventListener('click',()=>{
    if(selectedArtwork) window.open(`https://etherscan.io/address/${selectedArtwork.owner}`,'_blank');
  });
  $('art-provenance').addEventListener('click',e=>{
    const tx=e.target?.dataset?.tx;
    if(!tx) return;
    navigator.clipboard?.writeText(tx);
    toast('Transaction Copied', truncHash(tx), 'info');
  });
  $('activity-feed').addEventListener('click',e=>{
    const row=e.target.closest('[data-tx]');
    if(!row) return;
    navigator.clipboard?.writeText(row.dataset.tx);
    toast('Transaction Copied', truncHash(row.dataset.tx), 'info');
  });

  $('add-close').addEventListener('click',closeAddModal);
  $('add-modal').addEventListener('click',e=>{ if(e.target===$('add-modal')) closeAddModal(); });
  $('add-form').addEventListener('submit',handleAddArt);

  $('f-url').addEventListener('input',e=>{
    const url=e.target.value.trim();
    if(url.startsWith('http')){ $('preview-img').src=url; show('add-preview'); }
    else hide('add-preview');
  });
}

/* ═══════════════════════════════════════════════════════════
   BOOTSTRAP
═══════════════════════════════════════════════════════════ */
async function init(){
  setLoader(5,  'Initializing 3D engine…');   initScene();
  setLoader(20, 'Building gallery…');          buildGallery();
  setLoader(45, 'Lighting the space…');        buildLights();
  setLoader(60, 'Placing artworks…');
  allArtworks.forEach(art=>placeArtwork(art));

  // Restore user artworks
  JSON.parse(localStorage.getItem('mg_arts')||'[]').forEach(art=>{
    const enriched=enrichArtwork(art);
    if(!allArtworks.find(a=>a.id===enriched.id)){ allArtworks.push(enriched); placeArtwork(enriched); }
  });
  $('stat-count').textContent=allArtworks.length;
  updateMarketDashboard();

  setLoader(80, 'Adding atmosphere…');         buildParticles();
  setLoader(90, 'Setting up controls…');
  setupMouseLook();
  setupMovement();
  wireUI();

  setLoader(98, 'Starting render loop…');      animate();
  setLoader(100,'Welcome to MetaGallery!');
  await new Promise(r=>setTimeout(r,600));
  hideLoader();
  initBgCanvas();
  show('landing');
}

init();
