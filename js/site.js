(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const page=document.body.dataset.page;

/* ===== project cards ===== */
const SKY='<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="300" fill="#C4E6FA"/><g fill="#fff"><ellipse cx="120" cy="70" rx="38" ry="16"/><ellipse cx="142" cy="58" rx="26" ry="17"/><ellipse cx="318" cy="112" rx="24" ry="9" opacity=".8"/></g><path d="M0 214c70-34 118-6 190-6s140-32 210 8v84H0z" fill="#c1dc83"/><path d="M0 242c80-26 140-8 210-10s130-14 190 6v62H0z" fill="#87a000"/></svg>';
const tilts=[-3.2,3.6,5.4,-4.2,2.6,-3.4];
/* a card is an <article>; the cover plays the demo (when there is one) and the action row holds Demo / Code */
function makeCard(p,i,full){
  const el=document.createElement('article');
  el.className='card'+(full?' full':''); el.style.setProperty('--r0',tilts[i%tilts.length]+'deg'); el.style.setProperty('--d',(-i*1.7)+'s');
  const shot=document.createElement(p.demo?'button':'div'); shot.className='shot';
  if(p.img){const im=new Image(); im.src=p.img; im.alt=p.title+' cover'; im.loading='lazy'; shot.append(im)} else shot.innerHTML=SKY;
  if(p.demo){
    shot.type='button'; shot.dataset.cursor='play demo'; shot.setAttribute('aria-label','Play the '+p.title+' demo');
    shot.insertAdjacentHTML('beforeend','<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span>');
    shot.addEventListener('click',()=>openDemo(p));
  }
  const h=document.createElement('h3'); h.textContent=p.title;
  const t=document.createElement('p'); t.className='tag'; t.textContent=p.tag;
  el.append(shot,h,t);
  if(full){
    const d=document.createElement('p'); d.className='desc'; d.textContent=p.desc; el.append(d);
    if(p.stack&&p.stack.length){const ul=document.createElement('ul'); ul.className='stack'; p.stack.forEach(s=>{const li=document.createElement('li'); li.textContent=s; ul.append(li)}); el.append(ul)}
  }
  const acts=document.createElement('div'); acts.className='acts';
  if(p.demo){const b=document.createElement('button'); b.type='button'; b.className='act solid'; b.dataset.cursor='play'; b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>Demo'; b.addEventListener('click',()=>openDemo(p)); acts.append(b)}
  if(p.href){const a=document.createElement('a'); a.className='act'; a.href=p.href; a.target='_blank'; a.rel='noopener'; a.dataset.cursor='repo'; a.textContent='Code ↗'; acts.append(a)}
  if(!p.demo&&!p.href){const s=document.createElement('span'); s.className='act ghost'; s.textContent='links coming soon'; acts.append(s)}
  el.append(acts);
  return el;
}

/* demo lightbox: YouTube (privacy-enhanced domain), loaded only when opened */
let demoBox;
function openDemo(p){
  if(!demoBox){
    demoBox=document.createElement('dialog'); demoBox.className='demo';
    demoBox.innerHTML='<div class="demo-top"><h2></h2><button type="button" class="demo-x" data-cursor="close" aria-label="Close demo">&times;</button></div><div class="demo-frame"></div>';
    document.body.append(demoBox);
    demoBox.querySelector('.demo-x').addEventListener('click',()=>demoBox.close());
    demoBox.addEventListener('click',e=>{if(e.target===demoBox)demoBox.close()});
    demoBox.addEventListener('close',()=>{demoBox.querySelector('.demo-frame').replaceChildren(); document.body.classList.remove('locked')});
  }
  demoBox.querySelector('h2').textContent=p.title+' — demo';
  const f=document.createElement('iframe');
  f.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(p.demo)+'?autoplay=1&rel=0&modestbranding=1';
  f.title=p.title+' demo video'; f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen=true;
  demoBox.querySelector('.demo-frame').replaceChildren(f);
  document.body.classList.add('locked'); demoBox.showModal();
}
const cards=$('#cards');
if(cards&&page==='home'){
  PROJECTS.filter(p=>p.featured).forEach((p,i)=>cards.append(makeCard(p,i,false)));
  const more=document.createElement('a'); more.href='projects.html'; more.className='card more'; more.style.setProperty('--r0','7deg'); more.dataset.cursor='all work';
  more.innerHTML='<h3>more...</h3><p class="tag">'+PROJECTS.length+' projects in the gallery</p>'; cards.append(more);
}
if(cards&&page==='projects') PROJECTS.forEach((p,i)=>cards.append(makeCard(p,i,true)));

/* 3D tilt on cards */
document.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse')return;
  const c=e.target.closest&&e.target.closest('.card');
  $$('.card').forEach(x=>{if(x!==c){x.style.setProperty('--rx','0deg'); x.style.setProperty('--ry','0deg')}});
  if(!c)return;
  const r=c.getBoundingClientRect(), px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
  c.style.setProperty('--ry',(px*14)+'deg'); c.style.setProperty('--rx',(-py*14)+'deg');
});

/* ===== links from data ===== */
$$('[data-link="github"]').forEach(a=>a.href=SITE.github);
$$('[data-link="linkedin"]').forEach(a=>a.href=SITE.linkedin);
if(SITE.resumePdf) $$('[data-pdf]').forEach(a=>{a.href=SITE.resumePdf; a.hidden=false});

/* ===== email: clicking copies the address and opens the mail app ===== */
const toast=document.createElement('div'); toast.className='toast'; toast.setAttribute('role','status'); document.body.append(toast);
let toastT;
const say=m=>{toast.textContent=m; toast.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>toast.classList.remove('on'),2200)};
$$('[data-email]').forEach(a=>{
  a.href='mailto:'+SITE.email;
  if(a.dataset.email==='text') a.textContent=SITE.email;
  a.addEventListener('click',()=>{
    const ok=()=>say('Copied '+SITE.email+' — opening your mail app');
    try{navigator.clipboard.writeText(SITE.email).then(ok,()=>say('Opening your mail app'))}catch(_){say('Opening your mail app')}
  });
});

/* ===== hero ===== */
const who=$('#who');
if(who){
  'Aadesh'.split('').forEach((ch,i)=>{const s=document.createElement('span'); s.className='l'; s.style.setProperty('--i',i); s.textContent=ch; who.append(s)});
  const letters=$$('.l',who);
  addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse')return;
    letters.forEach(l=>{const r=l.getBoundingClientRect(); const d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2)); l.style.setProperty('--k',Math.max(0,1-d/230).toFixed(3))});
  });
}

const track=$('#track');
if(track){
  const words=['Software engineering','Dev + AI','Machine learning','Computer vision','Web development','Hackathons','Always curious'];
  const run=words.map(w=>`<span>${w}<svg><use href="#star"/></svg></span>`).join('');
  track.innerHTML=run+run+run+run;
}

/* hero character
   Chrome/Firefox/Edge play the transparent WebM directly. Safari can't decode WebM alpha, so it plays an H.264 file
   with the colour (premultiplied) stacked above its alpha mask, recombined on a WebGL canvas. */
function stackedAlpha(src,poster){
  const c=document.createElement('canvas'), gl=c.getContext('webgl',{premultipliedAlpha:true,alpha:true});
  if(!gl)return null;
  const v=document.createElement('video');
  v.muted=true; v.loop=true; v.playsInline=true; v.autoplay=true; v.preload='auto';
  v.setAttribute('playsinline',''); v.setAttribute('muted',''); v.className='feed'; v.src=src;
  const sh=(t,s)=>{const o=gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); return o};
  const pg=gl.createProgram();
  gl.attachShader(pg,sh(gl.VERTEX_SHADER,'attribute vec2 p;varying vec2 u;void main(){u=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}'));
  gl.attachShader(pg,sh(gl.FRAGMENT_SHADER,'precision mediump float;uniform sampler2D t;varying vec2 u;void main(){vec3 c=texture2D(t,vec2(u.x,u.y*.5)).rgb;float a=texture2D(t,vec2(u.x,.5+u.y*.5)).r;gl_FragColor=vec4(min(c,vec3(a)),a);}'));
  gl.linkProgram(pg); gl.useProgram(pg);
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(pg,'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  gl.bindTexture(gl.TEXTURE_2D,gl.createTexture());
  [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE));
  [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.LINEAR));
  c.style.background=`url(${poster}) 50% 100%/contain no-repeat`;
  const draw=()=>{
    if(v.readyState>=2){
      if(c.width!==v.videoWidth){c.width=v.videoWidth; c.height=v.videoHeight/2; gl.viewport(0,0,c.width,c.height)}
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,v);
      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
      c.style.background='';
    }
    v.requestVideoFrameCallback?v.requestVideoFrameCallback(draw):requestAnimationFrame(draw);
  };
  draw();
  return {canvas:c,video:v};
}
const stage=$('#stage');
if(stage){
  const bubble=$('#bubble'); let clip=$('#heroClip');
  const safari=/^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)||/[?&]alpha=stacked/.test(location.search);
  if(reduce){
    const img=new Image(); img.alt=clip.getAttribute('aria-label'); img.className='char'; img.src=clip.poster; clip.replaceWith(img);
  }else{
    if(safari){
      const s=stackedAlpha(clip.dataset.stacked,clip.poster);
      if(s){s.canvas.className='char'; s.canvas.setAttribute('role','img'); s.canvas.setAttribute('aria-label',clip.getAttribute('aria-label')); clip.replaceWith(s.canvas); stage.append(s.video); clip=s.video; const p=clip.play(); p&&p.catch(()=>{})}
    }
    const sync=()=>bubble.classList.toggle('on',!clip.paused&&clip.currentTime>.25&&clip.currentTime<2.4);
    clip.addEventListener('timeupdate',sync); clip.addEventListener('pause',sync);
    const replay=()=>{clip.currentTime=0; const p=clip.play(); p&&p.catch(()=>{})};
    stage.addEventListener('click',replay);
    stage.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); replay()}});
  }
}

/* ===== theme (remembered across pages) ===== */
$('#theme').addEventListener('click',()=>{
  const dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme=dark?'light':'dark';
  try{localStorage.setItem('theme',root.dataset.theme)}catch(_){}
});

/* ===== nav pill ===== */
const links=$$('#nav a'), pill=$('#nav .pill'); let current=links[0];
const place=a=>{pill.style.width=a.offsetWidth+'px'; pill.style.transform=`translateX(${a.parentElement.offsetLeft}px)`};
function setActive(id){const a=links.find(l=>l.dataset.sec===id); if(!a)return; current=a; links.forEach(l=>l.setAttribute('aria-current',l===a)); place(a)}
const go=id=>{const t=$('#'+id); t&&t.scrollIntoView({behavior:reduce?'auto':'smooth'})};
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1); if(!$('#'+id))return; e.preventDefault(); go(id); setActive(id)}));
/* first placement is instant; the spring slide is only for later changes */
pill.style.transition='none';
requestAnimationFrame(()=>requestAnimationFrame(()=>pill.style.transition=''));
if(page==='home'){
  const secObs=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)setActive(en.target.id)}),{rootMargin:'-40% 0px -55% 0px'});
  ['home','about','projects'].forEach(id=>secObs.observe($('#'+id)));
  setActive(location.hash.slice(1)||'home');
}else setActive(page);
addEventListener('resize',()=>place(current)); document.fonts&&document.fonts.ready.then(()=>place(current));

/* ===== reveal (transform only; content is visible at rest) ===== */
const rvObs=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in'); rvObs.unobserve(en.target)}}),{threshold:.15});
$$('.rv').forEach(el=>rvObs.observe(el)); $$('#cards .card').forEach(el=>rvObs.observe(el));

/* ===== scroll-linked: portrait parallax + resume rail ===== */
const portrait=$('#portrait'), sheet=$('#sheet');
let ticking=false;
function onScroll(){
  ticking=false;
  const vh=innerHeight;
  if(portrait){const pr=portrait.getBoundingClientRect(); const t=((pr.top+pr.height/2)-vh/2)/vh; portrait.style.setProperty('--py',(reduce?0:Math.max(-1,Math.min(1,t))*-12).toFixed(1)+'px')}
  if(sheet){const sr=sheet.getBoundingClientRect(); sheet.style.setProperty('--prog',Math.min(1,Math.max(0,(vh*.6-sr.top)/sr.height)).toFixed(3))}
}
addEventListener('scroll',()=>{if(!ticking){ticking=true; requestAnimationFrame(onScroll)}},{passive:true}); onScroll();

/* ===== resume: profile photo + print ===== */
const photo=$('#photo');
if(photo&&SITE.profilePhoto){const im=new Image(); im.src=SITE.profilePhoto; im.alt='Aadesh Deshmukh'; photo.replaceChildren(im); photo.classList.add('has')}
const pr=$('#print'); pr&&pr.addEventListener('click',()=>print());

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
