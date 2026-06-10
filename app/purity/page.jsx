'use client'
import Link from 'next/link'
import { useState } from 'react'
import MobileNav from '../../components/MobileNav'

export default function PurityPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [qrScanned, setQrScanned] = useState(false)

  const s = {
    page: { fontFamily:"'DM Sans',sans-serif", background:'#f4f1eb', color:'#2a2a1e', minHeight:'100vh' },
    nav: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.9rem 2rem', background:'#f4f1eb', borderBottom:'1px solid #ddd8cc', position:'sticky', top:0, zIndex:100 },
    logoText: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', fontWeight:600, letterSpacing:3, color:'#4a7055', lineHeight:1 },
    logoSub: { fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'#7a9a80', marginTop:2 },
    navLink: (active) => ({ fontSize:'0.78rem', letterSpacing:'1.5px', textTransform:'uppercase', color: active ? '#4a7055' : '#6a6a52', textDecoration:'none', fontWeight: active ? 500 : 'normal' }),
    cartBtn: { display:'flex', alignItems:'center', gap:6, background:'#4a7055', color:'#f4f1eb', fontSize:'0.75rem', letterSpacing:'1px', textTransform:'uppercase', padding:'8px 18px', border:'none', borderRadius:2, cursor:'pointer', textDecoration:'none' },

    // Hero
    hero: { background:'#1a2a1e', padding:'5rem 2rem', textAlign:'center', position:'relative', overflow:'hidden' },
    heroEyebrow: { fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'1.25rem' },
    heroH1: { fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:400, color:'#f4f1eb', lineHeight:1.15, marginBottom:'1.25rem' },
    heroP: { fontSize:'0.9rem', color:'#a8c89a', lineHeight:1.9, maxWidth:540, margin:'0 auto 2.5rem' },
    heroBadge: { display:'inline-flex', alignItems:'center', gap:8, border:'1px solid rgba(201,168,76,0.3)', padding:'8px 20px', borderRadius:20, fontSize:'0.78rem', color:'#c9a84c', letterSpacing:'1px' },

    // Problem Section
    problemSection: { background:'#f9f7f2', padding:'4rem 2rem' },
    problemGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#ddd8cc', maxWidth:800, margin:'2.5rem auto 0', border:'1px solid #ddd8cc' },
    problemCard: (bad) => ({ background: bad ? '#fff5f5' : '#f4fff8', padding:'2rem 1.75rem', borderLeft: bad ? '3px solid #e05a4a' : '3px solid #4a7055' }),
    problemLabel: (bad) => ({ fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color: bad ? '#e05a4a' : '#4a7055', marginBottom:'1rem', display:'flex', alignItems:'center', gap:6 }),
    problemH3: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', color:'#2a2a1e', marginBottom:'0.75rem' },
    problemList: { listStyle:'none', padding:0, margin:0 },
    problemItem: (bad) => ({ fontSize:'0.82rem', color:'#6a6a52', lineHeight:1.8, padding:'4px 0', display:'flex', alignItems:'flex-start', gap:8 }),
    dot: (bad) => ({ width:6, height:6, borderRadius:'50%', background: bad ? '#e05a4a' : '#4a7055', marginTop:6, flexShrink:0 }),

    // Ingredients
    ingredSection: { background:'#f4f1eb', padding:'4rem 2rem' },
    ingredGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'1rem', maxWidth:960, margin:'2.5rem auto 0' },
    ingredCard: { background:'#edeae0', border:'1px solid #ddd8cc', borderRadius:4, padding:'1.5rem 1.25rem', textAlign:'center' },
    ingredIcon: { fontSize:32, marginBottom:'0.75rem', display:'block' },
    ingredName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', color:'#2a2a1e', marginBottom:4 },
    ingredNote: { fontSize:'0.74rem', color:'#7a9a80', lineHeight:1.6 },
    ingredBadge: { display:'inline-block', fontSize:'8px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 8px', background:'rgba(74,112,85,0.1)', color:'#4a7055', borderRadius:2, marginTop:'0.6rem' },

    // Process Tabs
    processSection: { background:'#edeae0', padding:'4rem 2rem' },
    tabRow: { display:'flex', gap:0, maxWidth:800, margin:'2rem auto 0', border:'1px solid #ddd8cc', borderRadius:4, overflow:'hidden' },
    tab: (active) => ({ flex:1, padding:'12px 8px', background: active ? '#4a7055' : '#f4f1eb', color: active ? '#f4f1eb' : '#6a6a52', border:'none', cursor:'pointer', fontSize:'0.75rem', letterSpacing:'1px', textTransform:'uppercase', fontFamily:"'DM Sans',sans-serif", borderRight:'1px solid #ddd8cc', transition:'all 0.2s' }),
    tabContent: { maxWidth:800, margin:'1.5rem auto 0', background:'#f4f1eb', border:'1px solid #ddd8cc', borderRadius:4, padding:'2rem' },
    tabTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', color:'#2a2a1e', marginBottom:'0.75rem' },
    tabDesc: { fontSize:'0.85rem', color:'#6a6a52', lineHeight:1.85, marginBottom:'1rem' },
    tabSteps: { display:'flex', flexDirection:'column', gap:12, marginTop:'1.25rem' },
    tabStep: { display:'flex', alignItems:'flex-start', gap:12, padding:'0.75rem', background:'#edeae0', borderRadius:3 },
    stepNum: { width:28, height:28, borderRadius:'50%', background:'#4a7055', color:'#f4f1eb', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:600, flexShrink:0 },
    stepText: { fontSize:'0.82rem', color:'#4a3d2c', lineHeight:1.7 },

    // QR Section
    qrSection: { background:'#2a2a1e', padding:'4rem 2rem', textAlign:'center' },
    qrBox: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:8, padding:'2.5rem', maxWidth:480, margin:'2.5rem auto 0', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.25rem' },
    qrMock: { width:140, height:140, background:'#f4f1eb', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'transform 0.2s' },
    qrLabel: { fontSize:'0.82rem', color:'#9a9a7a' },
    qrResult: { background:'rgba(74,112,85,0.15)', border:'1px solid rgba(74,112,85,0.3)', borderRadius:4, padding:'1rem 1.5rem', width:'100%', textAlign:'left' },
    qrResultTitle: { fontSize:'0.78rem', letterSpacing:'1.5px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'0.5rem' },
    qrResultRow: { display:'flex', justifyContent:'space-between', fontSize:'0.8rem', color:'#c8dbc8', padding:'3px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    qrResultVal: { color:'#a8c89a', fontSize:'0.78rem' },

    // Certifications
    certSection: { background:'#4a7055', padding:'3.5rem 2rem', textAlign:'center' },
    certGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'1px', background:'rgba(255,255,255,0.1)', maxWidth:800, margin:'2rem auto 0', border:'1px solid rgba(255,255,255,0.1)' },
    certItem: { background:'#4a7055', padding:'1.75rem 1rem' },
    certIcon: { fontSize:28, display:'block', marginBottom:'0.6rem' },
    certName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:'#f4f1eb', marginBottom:4 },
    certNote: { fontSize:'0.74rem', color:'#a8c89a', lineHeight:1.6 },

    // CTA
    ctaSection: { background:'#edeae0', padding:'3.5rem 2rem', textAlign:'center' },
    footer: { background:'#1e1e14', padding:'1.75rem 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' },
    footerLogo: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', letterSpacing:3, color:'#7a9a80' },
    footerCopy: { fontSize:'0.72rem', color:'#3a3a24' },
    eyebrow: { fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'0.75rem' },
    h2: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:400, color:'#2a2a1e', marginBottom:'0.5rem' },
    subP: { fontSize:'0.87rem', color:'#6a6a52', maxWidth:520, margin:'0 auto' },
  }

  const tabs = [
    {
      label:'Sourcing', title:'Authentic Sourcing', 
      desc:'We partner with local industry leaders like Shahi Agrawal Agarbatti Udyog in Jhansi to ensure every raw material meets our rigorous quality standards before it reaches your home.',
      steps:['Natural botanicals are sourced directly from trusted farms in India','Each material is physically inspected by Harsh, our Fragrance Curator','Only ingredients that pass our purity threshold are accepted']
    },
    {
      label:'Blending', title:'Master Blending',
      desc:'Our fragrance formulas are developed through extensive testing — combining pure essential oils, sacred resins, and organic flower powders into a harmonious aromatic profile.',
      steps:['Each fragrance formula is tested over multiple iterations','No synthetic fragrance compounds or artificial enhancers used','Final blend must meet the "Temple Grade" aromatic standard']
    },
    {
      label:'Rolling', title:'Hand Rolling',
      desc:'Every single HAMPAR agarbatti is hand-rolled on bamboo sticks — never machine-pressed. This ensures even coating, optimal burn, and the integrity of the natural fragrance.',
      steps:['Bamboo sticks are pre-cleaned and quality-checked','Masala is applied by hand, rolled uniformly for even burn','Each stick is visually inspected before moving to curing']
    },
    {
      label:'Curing', title:'72-Hour Sun Curing',
      desc:'After rolling, every batch is slow sun-dried for a minimum of 72 hours. This natural curing process locks in fragrance depth and ensures a clean, consistent burn.',
      steps:['Sticks are laid in ventilated drying areas, not artificial ovens','72-hour minimum curing time — never rushed','Burn test performed on each batch before packaging']
    },
    {
      label:'Verify', title:'QR Batch Verification',
      desc:'Every HAMPAR pack carries a unique QR code linking to its batch\'s purity certificate. Scan it to verify ingredients, batch date, and production details.',
      steps:['Unique QR code printed on every pack','Links to live batch certificate with ingredient list','Production date, batch number, and artisan details visible']
    },
  ]

  const ingredients = [
    { icon:'🌸', name:'Lavender Powder', note:'Pure lavender flower powder — calming, anti-anxiety', badge:'Certified Natural' },
    { icon:'🪵', name:'Sandalwood', note:'Authentic chandan for deep, sacred aroma', badge:'Temple Grade' },
    { icon:'🌹', name:'Rose Petals', note:'Dried rose petals for warm, devotional fragrance', badge:'Organic' },
    { icon:'🌿', name:'Organic Herbs', note:'Tulsi, neem and other sacred herbs', badge:'Farm Sourced' },
    { icon:'🫙', name:'Sacred Resins', note:'Pure guggul and dhoop resins for deep burn', badge:'Natural' },
    { icon:'💧', name:'Essential Oils', note:'Pure essential oils — no synthetic compounds', badge:'100% Pure' },
  ]

  return (
    <div style={s.page}>
      {/* NAV */}
      <MobileNav activePage="Purity" />

      {/* HERO */}
      <section style={s.hero}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(ellipse at 50% 0%, rgba(74,112,85,0.15) 0%, transparent 70%)',pointerEvents:'none'}}/>
        <div style={s.heroEyebrow}>The HAMPAR Purity Promise</div>
        <h1 style={s.heroH1}>
          Nothing But<br/>
          <span style={{fontStyle:'italic',color:'#c9a84c'}}>Pure Purity</span>
        </h1>
        <p style={s.heroP}>We drew a strict line in the sand. No charcoal. No toxic binders. No synthetic fragrance. Every HAMPAR product is verified from source to your sacred space.</p>
        <div style={s.heroBadge}>✓ Temple Grade Certified · Batch Traceable · QR Verified</div>
      </section>

      {/* PROBLEM vs HAMPAR */}
      <section style={s.problemSection}>
        <div style={{textAlign:'center'}}>
          <div style={s.eyebrow}>The Hard Truth</div>
          <h2 style={s.h2}>What others hide,<br/>we eliminate</h2>
          <p style={{...s.subP, marginTop:'0.5rem'}}>Most commercial incense is a health hazard. We built HAMPAR as the answer.</p>
        </div>
        <div style={s.problemGrid}>
          <div style={s.problemCard(true)}>
            <div style={s.problemLabel(true)}>✗ Typical Commercial Incense</div>
            <h3 style={s.problemH3}>What you're usually burning</h3>
            <ul style={s.problemList}>
              {['Cheap charcoal as a base binder — releases toxic fumes','Synthetic chemical fragrances that irritate lungs','Petroleum-based glues and adhesives','Artificial dyes and colorants','No ingredient transparency whatsoever'].map(item => (
                <li key={item} style={s.problemItem(true)}><div style={s.dot(true)}/>{item}</li>
              ))}
            </ul>
          </div>
          <div style={s.problemCard(false)}>
            <div style={s.problemLabel(false)}>✓ HAMPAR Spirituals</div>
            <h3 style={s.problemH3}>What you get with HAMPAR</h3>
            <ul style={s.problemList}>
              {['100% charcoal-free — pure botanical base only','Real essential oils and natural flower powders','Sacred resins — guggul, dhoop, pure organic binders','Zero synthetic fragrance compounds','Full batch traceability via QR code'].map(item => (
                <li key={item} style={s.problemItem(false)}><div style={s.dot(false)}/>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section style={s.ingredSection}>
        <div style={{textAlign:'center'}}>
          <div style={s.eyebrow}>What Goes Inside</div>
          <h2 style={s.h2}>Every ingredient, named</h2>
          <p style={{...s.subP, marginTop:'0.5rem'}}>No hidden compounds. No vague "fragrance blend." Every ingredient in HAMPAR is intentional and pure.</p>
        </div>
        <div style={s.ingredGrid}>
          {ingredients.map((ing,i) => (
            <div key={i} style={s.ingredCard}>
              <span style={s.ingredIcon}>{ing.icon}</span>
              <div style={s.ingredName}>{ing.name}</div>
              <div style={s.ingredNote}>{ing.note}</div>
              <span style={s.ingredBadge}>{ing.badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS TABS */}
      <section style={s.processSection}>
        <div style={{textAlign:'center'}}>
          <div style={{...s.eyebrow}}>Our 5-Step Process</div>
          <h2 style={s.h2}>How purity is made</h2>
          <p style={{...s.subP, marginTop:'0.5rem'}}>Every batch follows the same rigorous five-step process — no shortcuts, no exceptions.</p>
        </div>
        <div style={s.tabRow}>
          {tabs.map((t,i) => (
            <button key={i} style={{...s.tab(activeTab===i), borderRight: i<tabs.length-1 ? '1px solid #ddd8cc' : 'none'}} onClick={() => setActiveTab(i)}>{t.label}</button>
          ))}
        </div>
        <div style={s.tabContent}>
          <div style={s.tabTitle}>{tabs[activeTab].title}</div>
          <p style={s.tabDesc}>{tabs[activeTab].desc}</p>
          <div style={s.tabSteps}>
            {tabs[activeTab].steps.map((step,i) => (
              <div key={i} style={s.tabStep}>
                <div style={s.stepNum}>{i+1}</div>
                <div style={s.stepText}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR DEMO */}
      <section style={s.qrSection}>
        <div style={{fontSize:9,letterSpacing:'3px',textTransform:'uppercase',color:'#7a9a80',marginBottom:'0.75rem'}}>Batch Verification</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:400,color:'#f4f1eb',marginBottom:'0.75rem'}}>Scan. Verify. Trust.</h2>
        <p style={{fontSize:'0.87rem',color:'#7a9a80',maxWidth:480,margin:'0 auto'}}>Every HAMPAR pack has a unique QR code. Scan it to see the full purity certificate for your exact batch.</p>
        <div style={s.qrBox}>
          <div
            style={{...s.qrMock, transform: qrScanned ? 'scale(0.95)' : 'scale(1)'}}
            onClick={() => setQrScanned(true)}
          >
            <svg width="110" height="110" viewBox="0 0 110 110">
              <rect width="110" height="110" fill="white"/>
              <rect x="10" y="10" width="35" height="35" fill="none" stroke="#2a2a1e" strokeWidth="3"/>
              <rect x="16" y="16" width="23" height="23" fill="#2a2a1e"/>
              <rect x="65" y="10" width="35" height="35" fill="none" stroke="#2a2a1e" strokeWidth="3"/>
              <rect x="71" y="16" width="23" height="23" fill="#2a2a1e"/>
              <rect x="10" y="65" width="35" height="35" fill="none" stroke="#2a2a1e" strokeWidth="3"/>
              <rect x="16" y="71" width="23" height="23" fill="#2a2a1e"/>
              <rect x="65" y="65" width="8" height="8" fill="#2a2a1e"/>
              <rect x="78" y="65" width="8" height="8" fill="#2a2a1e"/>
              <rect x="91" y="65" width="8" height="8" fill="#2a2a1e"/>
              <rect x="65" y="78" width="8" height="8" fill="#2a2a1e"/>
              <rect x="91" y="78" width="8" height="8" fill="#2a2a1e"/>
              <rect x="65" y="91" width="8" height="8" fill="#2a2a1e"/>
              <rect x="78" y="91" width="22" height="8" fill="#2a2a1e"/>
              <text x="55" y="57" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="5" fill="#4a7055" letterSpacing="1">HAMPAR</text>
            </svg>
          </div>
          {!qrScanned ? (
            <p style={s.qrLabel}>👆 Click the QR to simulate a scan</p>
          ) : (
            <div style={s.qrResult}>
              <div style={s.qrResultTitle}>✓ Batch Certificate — Verified</div>
              {[
                ['Product','Lavender Serenity Agarbatti'],
                ['Batch No','HS-2024-LAV-042'],
                ['Mfg Date','12 Nov 2024'],
                ['Base','100% Natural Botanical'],
                ['Charcoal','None — Verified'],
                ['Essential Oil','Pure Lavender — 8%'],
                ['Artisan','Shahi Agrawal Udyog, Jhansi'],
                ['Status','✓ Passed All Checks'],
              ].map(([k,v]) => (
                <div key={k} style={s.qrResultRow}><span>{k}</span><span style={s.qrResultVal}>{v}</span></div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={s.certSection}>
        <div style={{fontSize:9,letterSpacing:'3px',textTransform:'uppercase',color:'#a8c89a',marginBottom:'0.75rem'}}>Our Standards</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:400,color:'#f4f1eb',marginBottom:'0.5rem'}}>What Temple Grade means</h2>
        <div style={s.certGrid}>
          {[
            {icon:'🌿', name:'Zero Charcoal', note:'No charcoal base — ever. Clean botanical binding only.'},
            {icon:'🧪', name:'Non-Toxic', note:'Safe for lungs, children, pets, and daily use.'},
            {icon:'📋', name:'Full Transparency', note:'Every ingredient named, every batch traceable.'},
            {icon:'🏛️', name:'Temple Tested', note:'Meets the purity standard used in sacred spaces.'},
            {icon:'🤲', name:'Handcrafted', note:'Every stick hand-rolled — never machine pressed.'},
          ].map((c,i) => (
            <div key={i} style={s.certItem}>
              <span style={s.certIcon}>{c.icon}</span>
              <div style={s.certName}>{c.name}</div>
              <div style={s.certNote}>{c.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={s.ctaSection}>
        <div style={s.eyebrow}>Experience It Yourself</div>
        <h2 style={s.h2}>Pure fragrance,<br/>earned not claimed</h2>
        <p style={{...s.subP, marginTop:'0.5rem', marginBottom:'2rem'}}>Every HAMPAR product is our purity promise made real — from Jhansi to your sacred space.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/#shop" style={{background:'#4a7055',color:'#f4f1eb',fontSize:'0.75rem',letterSpacing:'1.5px',textTransform:'uppercase',padding:'13px 32px',borderRadius:2,textDecoration:'none'}}>Shop Now</Link>
          <Link href="/story" style={{background:'transparent',color:'#2a2a1e',fontSize:'0.75rem',letterSpacing:'1.5px',textTransform:'uppercase',padding:'13px 32px',border:'1px solid #2a2a1e',borderRadius:2,textDecoration:'none'}}>Our Story</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.footerLogo}>HAMPAR SPIRITUALS</div>
        <div style={{display:'flex',gap:'1.25rem',flexWrap:'wrap'}}>
          {[['Shop','/'],['Our Story','/story'],['Purity','/purity'],['Cart','/cart']].map(([l,h]) => (
            <Link key={l} href={h} style={{fontSize:'0.72rem',letterSpacing:'1px',textTransform:'uppercase',color:'#4a4a32',textDecoration:'none'}}>{l}</Link>
          ))}
        </div>
        <div style={s.footerCopy}>© 2024 Hampar Spirituals · Jhansi, UP</div>
      </footer>
    </div>
  )
}
