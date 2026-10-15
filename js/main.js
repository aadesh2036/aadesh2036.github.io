(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== EDIT YOUR WORK HERE =====
   img: path or data URI of a static screenshot ("" shows the sky placeholder)
   href: link to the project ("" makes a non-clickable card) */
const PROJECTS=[
  {title:"Between Sessions", tag:"WeMakeDevs First Commit hackathon · 28/30", img:"", href:"https://github.com/aadesh2036/Between_Sessions"},
  {title:"AquaAgent", tag:"Description coming soon", img:"", href:""}
];
const MORE=[
  {title:"IRIS", tag:"UAV road defect detection · research", img:"", href:""},
  {title:"KrishiFlow", tag:"AI logistics for farmers · hackathon finalist", img:"", href:""},
  {title:"AgriPhenotyper", tag:"Plant disease detection · patent filed", img:"", href:""}
];
/* Set this to your resume PDF's path (e.g. "resume.pdf") to show the Download button */
const RESUME_PDF="";

const SKY='<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="300" fill="#C4E6FA"/><g fill="#fff"><ellipse cx="120" cy="70" rx="38" ry="16"/><ellipse cx="142" cy="58" rx="26" ry="17"/><ellipse cx="318" cy="112" rx="24" ry="9" opacity=".8"/></g><path d="M0 214c70-34 118-6 190-6s140-32 210 8v84H0z" fill="#c1dc83"/><path d="M0 242c80-26 140-8 210-10s130-14 190 6v62H0z" fill="#87a000"/></svg>';
const tilts=[-3.2,3.6,5.4,-4.2,2.6,-3.4];
function makeCard(p,i,base){
  const el=document.createElement(p.href?'a':'article');
  el.className='card'; el.style.setProperty('--r0',tilts[(i+base)%tilts.length]+'deg'); el.style.setProperty('--d',(-i*1.7)+'s');
  if(p.href){el.href=p.href; el.target='_blank'; el.rel='noopener'; el.dataset.cursor='open'} else el.tabIndex=0;
  const shot=document.createElement('div'); shot.className='shot';
  if(p.img){const im=new Image(); im.src=p.img; im.alt=p.title+' screenshot'; shot.append(im)} else shot.innerHTML=SKY;
  const h=document.createElement('h3'); h.textContent=p.title;
  const t=document.createElement('p'); t.textContent=p.tag;
  el.append(shot,h,t); return el;
}
const cards=$('#cards'), cardsMore=$('#cardsMore'), drawer=$('#drawer');
PROJECTS.forEach((p,i)=>cards.append(makeCard(p,i,0)));
const more=document.createElement('button'); more.type='button'; more.className='card more'; more.style.setProperty('--r0','7deg'); more.dataset.cursor='more!'; more.setAttribute('aria-expanded','false');
more.innerHTML='<h3>more...</h3>'; cards.append(more);
MORE.forEach((p,i)=>cardsMore.append(makeCard(p,i,2)));
more.addEventListener('click',()=>{
  const open=drawer.classList.toggle('open');
  more.setAttribute('aria-expanded',open); more.firstChild.textContent=open?'less...':'more...';
  $$('.card',cardsMore).forEach(c=>c.classList.toggle('in',open));
});

/* resume pdf */
if(RESUME_PDF){const a=$('#pdf'); a.href=RESUME_PDF; a.hidden=false}

/* 3D tilt on cards */
document.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse')return;
  const c=e.target.closest&&e.target.closest('.card');
  $$('.card').forEach(x=>{if(x!==c){x.style.setProperty('--rx','0deg'); x.style.setProperty('--ry','0deg')}});
  if(!c)return;
  const r=c.getBoundingClientRect(), px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
  c.style.setProperty('--ry',(px*14)+'deg'); c.style.setProperty('--rx',(-py*14)+'deg');
});

/* hero name */
const who=$('#who'); 'Aadesh'.split('').forEach((ch,i)=>{const s=document.createElement('span'); s.className='l'; s.style.setProperty('--i',i); s.textContent=ch; who.append(s)});
const letters=$$('.l',who);
addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse')return;
  letters.forEach(l=>{const r=l.getBoundingClientRect(); const d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2)); l.style.setProperty('--k',Math.max(0,1-d/230).toFixed(3))});
});

/* marquee */
const words=['Machine learning','Computer vision','Research','Hackathons','Data science','Agri-tech'];
const run=words.map(w=>`<span>${w}<svg><use href="#star"/></svg></span>`).join('');
$('#track').innerHTML=run+run+run+run;

/* hero video: "hi!" bubble during the wave, click to wave again */
const clip=$('#heroClip'), stage=$('#stage'), bubble=$('#bubble');
if(reduce){clip.removeAttribute('autoplay'); clip.pause()}
const sync=()=>bubble.classList.toggle('on',!clip.paused&&clip.currentTime>.25&&clip.currentTime<2.4);
clip.addEventListener('timeupdate',sync); clip.addEventListener('pause',sync);
const replay=()=>{clip.currentTime=0; const p=clip.play(); p&&p.catch(()=>{})};
stage.addEventListener('click',replay);
stage.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); replay()}});

/* theme */
$('#theme').addEventListener('click',()=>{
  const dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme=dark?'light':'dark';
});

/* nav pill */
const links=$$('#nav a'), pill=$('#nav .pill'); let current=links[0];
const place=a=>{pill.style.width=a.offsetWidth+'px'; pill.style.transform=`translateX(${a.parentElement.offsetLeft}px)`};
function setActive(id){const a=links.find(l=>l.getAttribute('href')==='#'+id); if(!a)return; current=a; links.forEach(l=>l.setAttribute('aria-current',l===a)); place(a)}
const go=(id)=>{const t=$('#'+id); t&&t.scrollIntoView({behavior:reduce?'auto':'smooth'})};
links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault(); const id=a.getAttribute('href').slice(1); go(id); setActive(id)}));
$('.peek').addEventListener('click',e=>{e.preventDefault(); go('projects')});
$('#toResume').addEventListener('click',e=>{e.preventDefault(); go('resume')});
const secObs=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)setActive(en.target.id)}),{rootMargin:'-40% 0px -55% 0px'});
['home','about','projects','resume'].forEach(id=>secObs.observe($('#'+id)));
setActive('home'); addEventListener('resize',()=>place(current)); document.fonts&&document.fonts.ready.then(()=>place(current));

/* reveal (transform only; content is visible at rest) */
const rvObs=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in'); rvObs.unobserve(en.target)}}),{threshold:.15});
$$('.rv').forEach(el=>rvObs.observe(el)); $$('#cards .card').forEach(el=>rvObs.observe(el));

/* scroll-linked: portrait parallax + resume rail */
const portrait=$('#portrait'), sheet=$('#sheet');
let ticking=false;
function onScroll(){
  ticking=false;
  const vh=innerHeight;
  const pr=portrait.getBoundingClientRect();
  const t=((pr.top+pr.height/2)-vh/2)/vh; portrait.style.setProperty('--py',(reduce?0:t*-26).toFixed(1)+'px');
  const sr=sheet.getBoundingClientRect();
  const prog=Math.min(1,Math.max(0,(vh*.6-sr.top)/sr.height));
  sheet.style.setProperty('--prog',prog.toFixed(3));
}
addEventListener('scroll',()=>{if(!ticking){ticking=true; requestAnimationFrame(onScroll)}},{passive:true}); onScroll();

/* copy email */
$('#copy').addEventListener('click',async e=>{
  const b=e.currentTarget, txt=$('#mail').textContent;
  try{await navigator.clipboard.writeText(txt); b.textContent='Copied'}
  catch(_){const r=document.createRange(); r.selectNodeContents($('#mail')); const s=getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent='Selected, press Ctrl+C'}
  setTimeout(()=>b.textContent='Copy email',1800);
});

/* ===== flat 2D cursor: arrow + lagging ring that becomes a label pill ===== */
if(matchMedia('(pointer: fine)').matches){
  root.classList.add('cursor-ok');
  const cur=$('#cur'), ring=$('#ring'), txt=$('#ringTxt');
  let mx=-100,my=-100,rx=-100,ry=-100,labeled=false;
  addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse')return;
    mx=e.clientX; my=e.clientY; root.classList.add('cursor-on');
    cur.style.transform=`translate3d(${mx}px,${my}px,0)`;
    const d=e.target.closest&&e.target.closest('[data-cursor]');
    const label=d&&d.dataset.cursor;
    if(label){if(txt.textContent!==label)txt.textContent=label; labeled=true; ring.classList.add('label')}
    else{labeled=false; ring.classList.remove('label')}
    cur.classList.toggle('hot',!!(e.target.closest&&e.target.closest('a,button,[role="button"],.card,[data-cursor]')));
  });
  document.addEventListener('mouseleave',()=>root.classList.remove('cursor-on'));
  addEventListener('pointerdown',e=>{
    if(e.pointerType!=='mouse')return; cur.classList.add('down');
    if(reduce)return;
    const b=document.createElement('div'); b.className='burst'; b.style.left=e.clientX+'px'; b.style.top=e.clientY+'px';
    for(let i=0;i<8;i++){const s=document.createElement('span'); s.style.setProperty('--a',(i*45)+'deg'); b.append(s)}
    document.body.append(b); setTimeout(()=>b.remove(),650);
  });
  addEventListener('pointerup',()=>cur.classList.remove('down'));
  (function loop(){
    const tx=labeled?mx+20:mx-17, ty=labeled?my+24:my-17;
    const k=reduce?1:.2; rx+=(tx-rx)*k; ry+=(ty-ry)*k;
    ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;
    requestAnimationFrame(loop);
  })();
}
})();
