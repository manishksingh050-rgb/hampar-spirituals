'use client'
import Link from 'next/link'
import MobileNav from '../../components/MobileNav'

const founders = [
  {
    num:'01', name:'Manish', title:'Founder & Creative Visionary',
    tags:['Medicine & Wellness','Design & Tech','Creative Arts'],
    desc1:'An MBBS student whose medical training directly shapes HAMPAR\'s product philosophy. He deeply understands the neurological impact of what we inhale — ensuring every product is charcoal-free, non-toxic, and truly therapeutic.',
    desc2:'HAMPAR\'s entire digital world is built by Manish — UI/UX, web development, graphic design, video editing, and app development. He also brings the brand to life as a poet, writer, and music singer.',
    pills:['UI/UX Design','Web Dev','Graphic Design','Video Editing','Poetry','Medicine'],
  },
  {
    num:'02', name:'Harsh', title:'Co-Founder, Fragrance & Inventory',
    tags:['Master of Scents','Operations'],
    desc1:'HAMPAR\'s chief fragrance curator. Harsh spends countless hours sourcing, blending, and evaluating natural botanicals, pure essential oils, and sacred resins to find the perfect aromatic harmony.',
    desc2:'Beyond his olfactory expertise, Harsh is the operational engine — managing inventory and the supply chain with meticulous care to ensure every raw material meets HAMPAR\'s strict purity standards.',
    pills:['Fragrance Curation','Inventory','Supply Chain','Quality Control'],
  },
  {
    num:'03', name:'Pushpendra', title:'Strategic Anchor & Legal Backbone',
    tags:['Finance','Legal & Compliance'],
    desc1:'The elder brother whose wisdom and structural discipline anchor the company. Pushpendra manages the numbers — calculating production costs, keeping products accessible through fair pricing, and securing the financial roadmap.',
    desc2:'From legal compliance and licensing to structuring macro operations, he handles the critical foundational work behind the scenes. The protector, counselor, and business backbone of HAMPAR.',
    pills:['Financial Strategy','Legal Compliance','Business Structure','Operations'],
  },
]

export default function StoryPage() {
  const s = {
    page: { fontFamily:"'DM Sans',sans-serif", background:'#f4f1eb', color:'#2a2a1e', minHeight:'100vh' },
    heroSection: { background:'#2a2a1e', padding:'5rem 2rem', textAlign:'center', position:'relative', overflow:'hidden' },
    heroEyebrow: { fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'1.25rem' },
    heroH1: { fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:400, color:'#f4f1eb', lineHeight:1.15, marginBottom:'1.25rem' },
    heroP: { fontSize:'0.92rem', color:'#9a9a7a', lineHeight:1.9, maxWidth:560, margin:'0 auto 2.5rem' },
    heroDivider: { width:60, height:1, background:'#c9a84c', margin:'0 auto' },
    meaningSection: { background:'#edeae0', padding:'4rem 2rem', textAlign:'center' },
    meaningGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'1px', background:'#ddd8cc', maxWidth:900, margin:'2rem auto 0', border:'1px solid #ddd8cc' },
    meaningCard: { background:'#edeae0', padding:'1.5rem 1rem', textAlign:'center' },
    meaningLetter: { fontFamily:"'Cormorant Garamond',serif", fontSize:'3rem', fontWeight:500, color:'#4a7055', lineHeight:1, marginBottom:'0.5rem' },
    meaningName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem', color:'#2a2a1e', marginBottom:4 },
    meaningRole: { fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#7a9a80' },
    originBand: { display:'grid', gridTemplateColumns:'1fr 1fr', background:'#f4f1eb' },
    originText: { padding:'4rem 3rem', borderRight:'1px solid #ddd8cc' },
    originVisual: { background:'#e8e4d8', display:'flex', alignItems:'center', justifyContent:'center', padding:'3rem' },
    eyebrow: { fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'1rem' },
    h2: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:400, color:'#2a2a1e', lineHeight:1.3, marginBottom:'1.25rem' },
    p: { fontSize:'0.87rem', color:'#6a6a52', lineHeight:1.9, marginBottom:'1rem' },
    highlight: { background:'#edeae0', borderLeft:'3px solid #c9a84c', padding:'1rem 1.25rem', fontSize:'0.87rem', color:'#4a3d2c', fontStyle:'italic', lineHeight:1.8, marginTop:'1.5rem' },
    foundersSection: { padding:'4rem 2rem', background:'#f9f7f2' },
    foundersGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem', maxWidth:1000, margin:'2.5rem auto 0' },
    founderCard: { background:'#f4f1eb', border:'1px solid #ddd8cc', borderRadius:4, overflow:'hidden' },
    founderTop: { padding:'2rem 1.75rem 1.5rem', borderBottom:'1px solid #ddd8cc' },
    founderNum: { fontFamily:"'Cormorant Garamond',serif", fontSize:'3rem', fontWeight:400, color:'rgba(74,112,85,0.15)', lineHeight:1, marginBottom:'-0.5rem' },
    founderName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.6rem', fontWeight:400, color:'#2a2a1e', marginBottom:4 },
    founderTitle: { fontSize:'9px', letterSpacing:'2.5px', textTransform:'uppercase', color:'#7a9a80' },
    founderBody: { padding:'1.5rem 1.75rem' },
    founderTag: { display:'inline-block', fontSize:'8px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 8px', background:'rgba(74,112,85,0.1)', color:'#4a7055', borderRadius:2, marginBottom:'0.6rem', marginRight:4 },
    founderP: { fontSize:'0.82rem', color:'#6a6a52', lineHeight:1.8, marginBottom:'0.75rem' },
    skillPills: { display:'flex', flexWrap:'wrap', gap:6, marginTop:'1rem' },
    pill: { fontSize:'8px', letterSpacing:'1px', textTransform:'uppercase', padding:'4px 10px', border:'1px solid #ddd8cc', borderRadius:20, color:'#6a6a52' },
    packagingSection: { background:'#2a2a1e', padding:'4rem 2rem' },
    packGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'rgba(255,255,255,0.08)', maxWidth:800, margin:'2.5rem auto 0', border:'1px solid rgba(255,255,255,0.08)' },
    packCard: { background:'#2a2a1e', padding:'2.5rem 2rem' },
    packName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', color:'#f4f1eb', marginBottom:6 },
    packDesc: { fontSize:'0.82rem', color:'#7a9a80', lineHeight:1.8 },
    packTag: { display:'inline-block', fontSize:'8px', letterSpacing:'2px', textTransform:'uppercase', padding:'4px 10px', border:'1px solid rgba(201,168,76,0.3)', color:'#c9a84c', borderRadius:2, marginTop:'1rem' },
    promiseSection: { background:'#4a7055', padding:'4rem 2rem', textAlign:'center' },
    promiseGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'1px', background:'rgba(255,255,255,0.1)', maxWidth:800, margin:'2rem auto 0', border:'1px solid rgba(255,255,255,0.1)' },
    promiseItem: { background:'#4a7055', padding:'1.75rem 1rem' },
    ctaSection: { background:'#edeae0', padding:'4rem 2rem', textAlign:'center' },
    footer: { background:'#1e1e14', padding:'1.75rem 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' },
    footerLogo: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', letterSpacing:3, color:'#7a9a80' },
    footerCopy: { fontSize:'0.72rem', color:'#3a3a24' },
  }

  return (
    <div style={s.page}>
      <MobileNav activePage="Our Story" />

      <section style={s.heroSection}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)',pointerEvents:'none'}}/>
        <div style={s.heroEyebrow}>Jhansi, Uttar Pradesh · Est. 2024</div>
        <h1 style={s.heroH1}>An Unbreakable Bond,<br/><span style={{fontStyle:'italic',color:'#c9a84c'}}>A Sacred Vision</span></h1>
        <p style={s.heroP}>We didn't start with industrial investors or impersonal factories. Our foundation is built on something far more enduring — an unbreakable bond of brotherhood, a deep reverence for ancient spiritual traditions, and an ambitious dream to bring pure, temple-grade tranquility into modern living spaces.</p>
        <div style={s.heroDivider}/>
      </section>

      <section style={s.meaningSection}>
        <div style={s.eyebrow}>The Name Behind the Brand</div>
        <h2 style={{...s.h2,textAlign:'center'}}>HAMPAR — More Than a Name</h2>
        <p style={{...s.p,textAlign:'center',maxWidth:560,margin:'0 auto'}}>HAMPAR is born from the initials of its three founders — and carries a deeper meaning: <strong>Arpan</strong> (Devotion) blended with <strong>Aroma</strong> (Fragrance).</p>
        <div style={s.meaningGrid}>
          {[
            {letter:'H',name:'Harsh',role:'Co-Founder · Fragrance'},
            {letter:'A',name:'Arpan',role:'Devotion — our offering'},
            {letter:'M',name:'Manish',role:'Founder · Creative Vision'},
            {letter:'P',name:'Pushpendra',role:'Co-Founder · Strategy'},
            {letter:'A',name:'Aroma',role:'Fragrance — our craft'},
            {letter:'R',name:'...ra',role:'Pushpend-ra · Together'},
          ].map((item,i) => (
            <div key={i} style={s.meaningCard}>
              <div style={s.meaningLetter}>{item.letter}</div>
              <div style={s.meaningName}>{item.name}</div>
              <div style={s.meaningRole}>{item.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={s.originBand}>
        <div style={s.originText}>
          <div style={s.eyebrow}>Our Origin</div>
          <h2 style={s.h2}>From Jhansi,<br/>with purpose</h2>
          <p style={s.p}>Based out of the historic city of Jhansi, Uttar Pradesh, HAMPAR Spirituals is the physical manifestation of what happens when lifelong friendship merges with a diverse, multi-disciplinary powerhouse of skills.</p>
          <p style={s.p}>We noticed a frustrating reality: many commercial incense sticks are laden with cheap charcoal, toxic binders, and synthetic fragrances that irritate the lungs and pollute your indoor air. We drew a strict line. HAMPAR Spirituals stands for absolute ingredient integrity.</p>
          <div style={s.highlight}>"From our family in Jhansi to your sacred space — we are sharing a story, a mood, and a timeless piece of art."</div>
        </div>
        <div style={s.originVisual}>
          <svg width="100%" height="360" viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="360" fill="#ddd8c8"/>
            <circle cx="150" cy="150" r="100" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.4"/>
            <circle cx="150" cy="150" r="70" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3"/>
            <polygon points="150,70 220,112 220,196 150,238 80,196 80,112" fill="#7a9a80" opacity="0.15" stroke="#4a7055" strokeWidth="1"/>
            <text x="150" y="144" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="18" fill="#2a2a1e" letterSpacing="3" fontWeight="500">HAMPAR</text>
            <text x="150" y="162" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="8" fill="#4a7055" letterSpacing="3">SPIRITUALS</text>
            <text x="150" y="300" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="11" fill="#7a9a80" fontStyle="italic" letterSpacing="2">Jhansi · उत्तर प्रदेश</text>
          </svg>
        </div>
      </section>

      <section style={s.foundersSection}>
        <div style={{textAlign:'center'}}>
          <div style={s.eyebrow}>The Trio Behind the Tradition</div>
          <h2 style={{...s.h2,textAlign:'center'}}>Three Brothers,<br/>One Sacred Mission</h2>
        </div>
        <div style={s.foundersGrid}>
          {founders.map((f,i) => (
            <div key={i} style={s.founderCard}>
              <div style={s.founderTop}>
                <div style={s.founderNum}>{f.num}</div>
                <div style={s.founderName}>{f.name}</div>
                <div style={s.founderTitle}>{f.title}</div>
                <div style={{marginTop:'0.75rem',display:'flex',flexWrap:'wrap',gap:4}}>
                  {f.tags.map(t=><span key={t} style={s.founderTag}>{t}</span>)}
                </div>
              </div>
              <div style={s.founderBody}>
                <p style={s.founderP}>{f.desc1}</p>
                <p style={s.founderP}>{f.desc2}</p>
                <div style={s.skillPills}>
                  {f.pills.map(p=><span key={p} style={s.pill}>{p}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={s.packagingSection}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:9,letterSpacing:'3px',textTransform:'uppercase',color:'#7a9a80',marginBottom:'0.75rem'}}>Signature Innovation</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:400,color:'#f4f1eb',marginBottom:'0.75rem'}}>Beyond the Rectangle</h2>
          <p style={{fontSize:'0.87rem',color:'#7a9a80',maxWidth:520,margin:'0 auto'}}>Every box is a sacred geometry, engineered for protection and ritual.</p>
        </div>
        <div style={s.packGrid}>
          <div style={s.packCard}>
            <svg width="80" height="50" viewBox="0 0 200 120" style={{marginBottom:'1.25rem'}}>
              <polygon points="0,0 160,0 180,30 -20,30" fill="#c9a84c" opacity="0.6"/>
              <polygon points="0,0 -20,30 -20,80 0,50" fill="#a88832" opacity="0.7"/>
              <polygon points="160,0 180,30 180,80 160,50" fill="#b89a42" opacity="0.5"/>
              <polygon points="0,0 160,0 160,50 0,50" fill="#dfc878" opacity="0.35"/>
              <text x="55" y="28" fontFamily="'Cormorant Garamond',serif" fontSize="9" fill="#2a1e08" letterSpacing="2">HAMPAR</text>
            </svg>
            <div style={s.packName}>Triangular Agarbatti Prism</div>
            <p style={s.packDesc}>Our signature triangular packaging is engineered for a striking shelf presence and structurally protects the delicate, hand-rolled incense from bending.</p>
            <span style={s.packTag}>9.5" × 1.5" · E-flute</span>
          </div>
          <div style={s.packCard}>
            <svg width="80" height="70" viewBox="0 0 160 140" style={{marginBottom:'1.25rem'}}>
              <polygon points="80,10 140,45 140,110 80,145 20,110 20,45" fill="#7a9a80" opacity="0.2" stroke="#4a7055" strokeWidth="1.5"/>
              <polygon points="80,26 124,51 124,101 80,126 36,101 36,51" fill="#4a7055" opacity="0.12" stroke="#4a7055" strokeWidth="0.8"/>
              <text x="80" y="82" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="10" fill="#c8dbc8" letterSpacing="2">HAMPAR</text>
            </svg>
            <div style={s.packName}>Hexagonal Dhupbatti Box</div>
            <p style={s.packDesc}>A unique hexagonal die-cut box with an overlapping lid that mirrors patterns in sacred geometry — a ritualistic experience from the moment you hold it.</p>
            <span style={s.packTag}>Sacred Geometry · Overlapping Lid</span>
          </div>
        </div>
        <div style={{textAlign:'center',marginTop:'2rem',fontSize:'0.82rem',color:'#7a9a80'}}>
          Manufactured with <span style={{color:'#c9a84c'}}>Shahi Agrawal Agarbatti Udyog, Jhansi</span>
        </div>
      </section>

      <section style={s.promiseSection}>
        <div style={{fontSize:9,letterSpacing:'3px',textTransform:'uppercase',color:'#a8c89a',marginBottom:'0.75rem'}}>The HAMPAR Promise</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:400,color:'#f4f1eb',marginBottom:'1rem'}}>Nothing But Purity</h2>
        <p style={{fontSize:'0.87rem',color:'#c8dbc8',maxWidth:520,margin:'0 auto 2rem',lineHeight:1.85}}>Every HAMPAR product is handcrafted using 100% natural flower powders, pure essential oils, sacred resins, and organic herbs — never charcoal, never synthetic fragrance.</p>
        <div style={s.promiseGrid}>
          {[
            {icon:'🌿',label:'Natural Botanicals',note:'100% natural flower powders, herbs & resins'},
            {icon:'🚫',label:'Zero Charcoal',note:'Completely charcoal-free — never toxic binders'},
            {icon:'🧪',label:'Non-Toxic',note:'Safe for lungs, children, and daily worship'},
            {icon:'📱',label:'QR Verified',note:'Every batch traceable via QR purity certificate'},
            {icon:'🏛️',label:'Temple Grade',note:'Meets the purity standard of sacred spaces'},
          ].map((item,i)=>(
            <div key={i} style={s.promiseItem}>
              <span style={{fontSize:24,display:'block',marginBottom:'0.75rem'}}>{item.icon}</span>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1rem',color:'#f4f1eb',marginBottom:4}}>{item.label}</div>
              <div style={{fontSize:'0.75rem',color:'#a8c89a',lineHeight:1.6}}>{item.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={s.ctaSection}>
        <div style={s.eyebrow}>Ready to Experience It?</div>
        <h2 style={{...s.h2,textAlign:'center'}}>From our family in Jhansi<br/>to your sacred space</h2>
        <p style={{...s.p,textAlign:'center',maxWidth:440,margin:'0.5rem auto 2rem'}}>Every stick, every cone — handcrafted with the intention of three brothers who believe your ritual deserves the purest fragrance.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/#shop" style={{background:'#4a7055',color:'#f4f1eb',fontSize:'0.75rem',letterSpacing:'1.5px',textTransform:'uppercase',padding:'13px 32px',borderRadius:2,textDecoration:'none'}}>Shop Now</Link>
          <Link href="/cart" style={{background:'transparent',color:'#2a2a1e',fontSize:'0.75rem',letterSpacing:'1.5px',textTransform:'uppercase',padding:'13px 32px',border:'1px solid #2a2a1e',borderRadius:2,textDecoration:'none'}}>View Cart</Link>
        </div>
      </section>

      <footer style={s.footer}>
        <div style={s.footerLogo}>HAMPAR SPIRITUALS</div>
        <div style={{display:'flex',gap:'1.25rem',flexWrap:'wrap'}}>
          {[['Shop','/'],['Purity','/purity'],['Charity','/charity'],['Cart','/cart']].map(([l,h])=>(
            <Link key={l} href={h} style={{fontSize:'0.72rem',letterSpacing:'1px',textTransform:'uppercase',color:'#4a4a32',textDecoration:'none'}}>{l}</Link>
          ))}
        </div>
        <div style={s.footerCopy}>© 2024 Hampar Spirituals · Jhansi, UP</div>
      </footer>
    </div>
  )
}
