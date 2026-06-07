'use client'
import Link from 'next/link'
import { useState } from 'react'

const CAUSES = [
  {
    id:1, icon:'🍱', title:'Feed an Orphan', tag:'Nutrition',
    desc:'Every ₹40 feeds one orphan child a nutritious meal. Your single pack of HAMPAR agarbatti funds one meal — a sacred exchange of fragrance for food.',
    goal:50000, raised:32400, donors:218, amount:40,
    color:'#c9a84c', bg:'#fff9ec',
  },
  {
    id:2, icon:'📚', title:'Education for Every Child', tag:'Education',
    desc:'₹200 buys a month of stationery for one child. Help keep orphaned children in school with the tools they need to learn and grow.',
    goal:100000, raised:67800, donors:156, amount:200,
    color:'#4a7055', bg:'#f0f5f0',
  },
  {
    id:3, icon:'🏥', title:'Medical Aid for Needy', tag:'Healthcare',
    desc:'₹500 covers a basic medical checkup for a child in need. Many orphans lack access to even basic healthcare — your donation changes that.',
    goal:75000, raised:41200, donors:94, amount:500,
    color:'#6a7aaa', bg:'#f0f2ff',
  },
  {
    id:4, icon:'👘', title:'Warm Clothes Drive', tag:'Essentials',
    desc:'₹150 provides a set of winter clothes for one child. No child should shiver in the cold — help us keep them warm this season.',
    goal:30000, raised:18900, donors:132, amount:150,
    color:'#aa6a4a', bg:'#fff4f0',
  },
]

const IMPACT = [
  { num:'1,240+', label:'Children Helped', icon:'👶' },
  { num:'₹3.2L+', label:'Donations Raised', icon:'💚' },
  { num:'18', label:'Orphanages Reached', icon:'🏠' },
  { num:'6', label:'Cities in UP', icon:'📍' },
]

export default function CharityPage() {
  const [donating, setDonating] = useState(null)
  const [customAmt, setCustomAmt] = useState('')
  const [selectedAmt, setSelectedAmt] = useState(null)
  const [donorName, setDonorName] = useState('')
  const [donorPhone, setDonorPhone] = useState('')
  const [donorMsg, setDonorMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submittedCause, setSubmittedCause] = useState(null)

  const handleDonate = (cause) => {
    setDonating(cause)
    setSelectedAmt(cause.amount)
    setCustomAmt('')
    setSubmitted(false)
  }

  const handleSubmit = () => {
    const amt = customAmt ? parseInt(customAmt) : selectedAmt
    if (!amt || amt < 10) return
    setSubmittedCause({ ...donating, donatedAmt: amt, donorName })
    setSubmitted(true)
  }

  const s = {
    page: { fontFamily:"'DM Sans',sans-serif", background:'#f4f1eb', color:'#2a2a1e', minHeight:'100vh' },
    nav: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.9rem 2rem', background:'#f4f1eb', borderBottom:'1px solid #ddd8cc', position:'sticky', top:0, zIndex:100 },
    logoText: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', fontWeight:600, letterSpacing:3, color:'#4a7055', lineHeight:1 },
    logoSub: { fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'#7a9a80', marginTop:2 },
    navLink: (a) => ({ fontSize:'0.78rem', letterSpacing:'1.5px', textTransform:'uppercase', color:a?'#4a7055':'#6a6a52', textDecoration:'none', fontWeight:a?500:'normal' }),
    cartBtn: { display:'flex', alignItems:'center', gap:6, background:'#4a7055', color:'#f4f1eb', fontSize:'0.75rem', letterSpacing:'1px', textTransform:'uppercase', padding:'8px 18px', border:'none', borderRadius:2, cursor:'pointer', textDecoration:'none' },

    // Hero
    hero: { background:'linear-gradient(135deg, #1a2a1e 0%, #2a1e0a 100%)', padding:'5rem 2rem', textAlign:'center', position:'relative', overflow:'hidden' },
    heroEyebrow: { fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'1.25rem' },
    heroH1: { fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:400, color:'#f4f1eb', lineHeight:1.15, marginBottom:'1.25rem' },
    heroP: { fontSize:'0.92rem', color:'#a8c89a', lineHeight:1.9, maxWidth:560, margin:'0 auto 2.5rem' },
    heroQuote: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontStyle:'italic', color:'#c9a84c', maxWidth:500, margin:'0 auto', lineHeight:1.8 },

    // Impact
    impactBand: { background:'#2a2a1e', padding:'2.5rem 2rem' },
    impactGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'rgba(255,255,255,0.08)', maxWidth:860, margin:'0 auto', border:'1px solid rgba(255,255,255,0.08)' },
    impactItem: { background:'#2a2a1e', padding:'1.75rem 1rem', textAlign:'center' },
    impactIcon: { fontSize:24, display:'block', marginBottom:'0.5rem' },
    impactNum: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:500, color:'#c9a84c', lineHeight:1 },
    impactLabel: { fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#7a9a80', marginTop:4 },

    // Mission
    missionBand: { display:'grid', gridTemplateColumns:'1fr 1fr', background:'#edeae0' },
    missionText: { padding:'4rem 3rem', borderRight:'1px solid #ddd8cc' },
    missionVisual: { background:'#e2ddd0', display:'flex', alignItems:'center', justifyContent:'center', padding:'3rem' },
    eyebrow: { fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'1rem' },
    h2: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:400, color:'#2a2a1e', lineHeight:1.3, marginBottom:'1.25rem' },
    p: { fontSize:'0.87rem', color:'#6a6a52', lineHeight:1.9, marginBottom:'1rem' },
    highlight: { background:'#f4f1eb', borderLeft:'3px solid #c9a84c', padding:'1rem 1.25rem', fontSize:'0.87rem', color:'#4a3d2c', fontStyle:'italic', lineHeight:1.8, marginTop:'1.5rem', borderRadius:'0 3px 3px 0' },

    // Causes
    causesSection: { padding:'4rem 2rem', background:'#f4f1eb' },
    causesGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.5rem', maxWidth:1000, margin:'2.5rem auto 0' },
    causeCard: { background:'#f9f7f2', border:'1px solid #ddd8cc', borderRadius:4, overflow:'hidden', transition:'transform 0.3s, box-shadow 0.3s' },
    causeTop: (bg) => ({ background:bg, padding:'2rem 1.5rem', borderBottom:'1px solid #ddd8cc' }),
    causeIcon: { fontSize:36, display:'block', marginBottom:'0.75rem' },
    causeTag: (color) => ({ display:'inline-block', fontSize:'8px', letterSpacing:'2px', textTransform:'uppercase', padding:'3px 9px', background:`${color}20`, color, borderRadius:2, marginBottom:'0.6rem', border:`1px solid ${color}40` }),
    causeTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', color:'#2a2a1e', marginBottom:'0.5rem' },
    causeDesc: { fontSize:'0.8rem', color:'#6a6a52', lineHeight:1.75 },
    causeBody: { padding:'1.25rem 1.5rem' },
    progressWrap: { marginBottom:'1rem' },
    progressLabel: { display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'#6a6a52', marginBottom:6 },
    progressTrack: { background:'#e0dbd0', borderRadius:10, height:5, overflow:'hidden' },
    progressFill: (pct, color) => ({ background:color, height:'100%', width:`${pct}%`, borderRadius:10 }),
    causeStats: { display:'flex', gap:'1.5rem', marginBottom:'1.25rem' },
    causeStat: { fontSize:'0.75rem', color:'#6a6a52' },
    causeStatNum: (color) => ({ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontWeight:500, color, display:'block' }),
    donateBtn: (color) => ({ width:'100%', background:color, color:'#f4f1eb', fontSize:'0.75rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'11px', border:'none', borderRadius:2, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }),

    // Donation Modal
    overlay: { position:'fixed', inset:0, background:'rgba(42,42,30,0.6)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' },
    modal: { background:'#f4f1eb', borderRadius:6, maxWidth:480, width:'100%', overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,0.3)' },
    modalTop: (color) => ({ background:color, padding:'1.5rem 1.75rem', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }),
    modalTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', color:'#f4f1eb' },
    modalSub: { fontSize:'0.78rem', color:'rgba(255,255,255,0.7)', marginTop:4 },
    closeBtn: { background:'none', border:'none', color:'rgba(255,255,255,0.7)', fontSize:22, cursor:'pointer', lineHeight:1 },
    modalBody: { padding:'1.5rem 1.75rem' },
    amtLabel: { fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'0.75rem', display:'block' },
    amtGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:'1rem' },
    amtBtn: (active, color) => ({ padding:'9px 4px', border:`1px solid ${active?color:'#ddd8cc'}`, background:active?color:'transparent', color:active?'#f4f1eb':'#6a6a52', borderRadius:2, cursor:'pointer', fontSize:'0.82rem', fontWeight:active?500:'normal', fontFamily:"'DM Sans',sans-serif", textAlign:'center' }),
    customInput: { width:'100%', padding:'10px 14px', border:'1px solid #ddd8cc', borderRadius:2, fontSize:'0.85rem', fontFamily:"'DM Sans',sans-serif", outline:'none', color:'#2a2a1e', background:'#f9f7f2', boxSizing:'border-box', marginBottom:'1rem' },
    fieldGroup: { marginBottom:'0.9rem' },
    fieldLabel: { display:'block', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#7a9a80', marginBottom:5 },
    fieldInput: { width:'100%', padding:'10px 14px', border:'1px solid #ddd8cc', borderRadius:2, fontSize:'0.84rem', fontFamily:"'DM Sans',sans-serif", outline:'none', color:'#2a2a1e', background:'#f9f7f2', boxSizing:'border-box' },
    submitBtn: (color) => ({ width:'100%', background:color, color:'#f4f1eb', fontSize:'0.8rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:13, border:'none', borderRadius:2, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", marginTop:'1rem' }),
    cancelLink: { display:'block', textAlign:'center', fontSize:'0.75rem', color:'#9a9a7a', marginTop:'0.75rem', cursor:'pointer' },

    // Success Modal
    successModal: { background:'#f4f1eb', borderRadius:6, maxWidth:440, width:'100%', padding:'2.5rem 2rem', textAlign:'center', boxShadow:'0 24px 60px rgba(0,0,0,0.3)' },
    successIcon: { fontSize:52, display:'block', marginBottom:'1rem' },
    successH: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', color:'#2a2a1e', marginBottom:'0.75rem' },
    successP: { fontSize:'0.85rem', color:'#6a6a52', lineHeight:1.8, marginBottom:'1.5rem' },
    successAmt: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', color:'#4a7055', fontWeight:500 },

    // How it works
    howSection: { padding:'4rem 2rem', background:'#edeae0' },
    howGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:0, maxWidth:900, margin:'2.5rem auto 0', border:'1px solid #ddd8cc' },
    howStep: { padding:'2rem 1.5rem', borderRight:'1px solid #ddd8cc', textAlign:'center' },
    howNum: { width:36, height:36, borderRadius:'50%', border:'1px solid #7a9a80', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', color:'#4a7055' },
    howTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:'#2a2a1e', marginBottom:6 },
    howDesc: { fontSize:'0.78rem', color:'#6a6a52', lineHeight:1.7 },

    // CTA
    ctaSection: { background:'#4a7055', padding:'4rem 2rem', textAlign:'center' },
    footer: { background:'#1e1e14', padding:'1.75rem 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' },
    footerLogo: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', letterSpacing:3, color:'#7a9a80' },
    footerCopy: { fontSize:'0.72rem', color:'#3a3a24' },
  }

  return (
    <div style={s.page}>
      {/* NAV */}
      <nav style={s.nav}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <svg width="34" height="34" viewBox="0 0 80 80" fill="none">
            <rect x="18" y="38" width="44" height="28" rx="4" stroke="#2a2a1e" strokeWidth="2.5" fill="none"/>
            <path d="M26 38 Q28 24 40 22 Q52 24 54 38" stroke="#2a2a1e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <rect x="30" y="16" width="8" height="22" rx="4" stroke="#2a2a1e" strokeWidth="2" fill="none"/>
            <rect x="42" y="16" width="8" height="22" rx="4" stroke="#2a2a1e" strokeWidth="2" fill="none"/>
            <circle cx="32" cy="38" r="2.5" fill="#2a2a1e"/>
            <circle cx="48" cy="38" r="2.5" fill="#2a2a1e"/>
            <path d="M40 62 Q36 54 38 48 Q40 44 40 44 Q40 44 42 48 Q44 54 40 62Z" fill="#4a7055" opacity="0.8"/>
          </svg>
          <div><div style={s.logoText}>HAMPAR</div><div style={s.logoSub}>Spirituals</div></div>
        </Link>
        <ul style={{display:'flex',gap:'1.5rem',listStyle:'none',margin:0,padding:0}}>
          {[['Shop','/'],['Our Story','/story'],['Purity','/purity'],['Charity','/charity']].map(([l,h])=>(
            <li key={l}><Link href={h} style={s.navLink(l==='Charity')}>{l}</Link></li>
          ))}
        </ul>
        <Link href="/cart" style={s.cartBtn}>🛍 Cart</Link>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(74,112,85,0.08) 0%, transparent 60%)',pointerEvents:'none'}}/>
        <div style={s.heroEyebrow}>HAMPAR Gives Back · Jhansi, UP</div>
        <h1 style={s.heroH1}>
          Every Purchase,<br/>
          <span style={{fontStyle:'italic',color:'#c9a84c'}}>A Sacred Act of Giving</span>
        </h1>
        <p style={s.heroP}>At HAMPAR Spirituals, we believe that burning incense is an act of offering — and so is helping a child in need. A portion of every purchase goes directly to orphan care, education, and relief for the needy in Uttar Pradesh.</p>
        <div style={s.heroQuote}>"The fragrance of kindness travels further than any incense."</div>
      </section>

      {/* IMPACT NUMBERS */}
      <div style={s.impactBand}>
        <div style={s.impactGrid}>
          {IMPACT.map((item,i)=>(
            <div key={i} style={s.impactItem}>
              <span style={s.impactIcon}>{item.icon}</span>
              <div style={s.impactNum}>{item.num}</div>
              <div style={s.impactLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION */}
      <section style={s.missionBand}>
        <div style={s.missionText}>
          <div style={s.eyebrow}>Our Charitable Mission</div>
          <h2 style={s.h2}>Fragrance for the soul,<br/>food for the child</h2>
          <p style={s.p}>In Jhansi and across Uttar Pradesh, thousands of orphaned and underprivileged children go without basic necessities every day — food, education, healthcare, and warmth.</p>
          <p style={s.p}>HAMPAR Spirituals was built with a belief that a brand can be more than a product — it can be a force for compassion. We channel a meaningful portion of every sale into direct, transparent charity work for these children.</p>
          <p style={s.p}>No middlemen. No vague "CSR reports." Real children, real help, real impact — verified and documented by our team on the ground in Jhansi.</p>
          <div style={s.highlight}>"When you light a HAMPAR agarbatti, you are not just purifying your space — you are lighting a lamp of hope for a child somewhere in our city."<br/><span style={{fontSize:'0.78rem',color:'#7a9a80',fontStyle:'normal',marginTop:4,display:'block'}}>— Manish, Founder</span></div>
        </div>
        <div style={s.missionVisual}>
          <svg width="100%" height="400" viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="320" height="400" fill="#ddd8c8"/>
            <circle cx="160" cy="160" r="110" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3"/>
            <circle cx="160" cy="160" r="80" fill="none" stroke="#4a7055" strokeWidth="0.5" opacity="0.25"/>
            <circle cx="160" cy="160" r="50" fill="rgba(74,112,85,0.08)" stroke="#4a7055" strokeWidth="1"/>
            <text x="160" y="150" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="13" fill="#2a2a1e" letterSpacing="2">HAMPAR</text>
            <text x="160" y="168" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="7" fill="#4a7055" letterSpacing="2">GIVES BACK</text>
            <g transform="translate(80,240)">
              <circle cx="0" cy="0" r="28" fill="#fff9ec" stroke="#c9a84c" strokeWidth="1"/>
              <text x="0" y="5" textAnchor="middle" fontSize="18">🍱</text>
            </g>
            <g transform="translate(160,270)">
              <circle cx="0" cy="0" r="28" fill="#f0f5f0" stroke="#4a7055" strokeWidth="1"/>
              <text x="0" y="5" textAnchor="middle" fontSize="18">📚</text>
            </g>
            <g transform="translate(240,240)">
              <circle cx="0" cy="0" r="28" fill="#f0f2ff" stroke="#6a7aaa" strokeWidth="1"/>
              <text x="0" y="5" textAnchor="middle" fontSize="18">🏥</text>
            </g>
            <line x1="80" y1="240" x2="130" y2="170" stroke="#c9a84c" strokeWidth="0.7" opacity="0.4" strokeDasharray="3,4"/>
            <line x1="160" y1="242" x2="160" y2="182" stroke="#4a7055" strokeWidth="0.7" opacity="0.4" strokeDasharray="3,4"/>
            <line x1="240" y1="240" x2="190" y2="170" stroke="#6a7aaa" strokeWidth="0.7" opacity="0.4" strokeDasharray="3,4"/>
            <text x="160" y="360" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="10" fill="#7a9a80" letterSpacing="2" fontStyle="italic">Jhansi · उत्तर प्रदेश</text>
          </svg>
        </div>
      </section>

      {/* CAUSES */}
      <section style={s.causesSection}>
        <div style={{textAlign:'center'}}>
          <div style={s.eyebrow}>Active Causes</div>
          <h2 style={{...s.h2,textAlign:'center'}}>Choose Your Act of Giving</h2>
          <p style={{fontSize:'0.87rem',color:'#6a6a52',maxWidth:520,margin:'0.5rem auto 0'}}>Every rupee goes directly to the cause. Donate once, donate monthly — even ₹40 makes a difference.</p>
        </div>
        <div style={s.causesGrid}>
          {CAUSES.map(cause=>{
            const pct = Math.round((cause.raised/cause.goal)*100)
            return (
              <div key={cause.id} style={s.causeCard}>
                <div style={s.causeTop(cause.bg)}>
                  <span style={s.causeIcon}>{cause.icon}</span>
                  <span style={s.causeTag(cause.color)}>{cause.tag}</span>
                  <div style={s.causeTitle}>{cause.title}</div>
                  <p style={s.causeDesc}>{cause.desc}</p>
                </div>
                <div style={s.causeBody}>
                  <div style={s.progressWrap}>
                    <div style={s.progressLabel}>
                      <span>₹{cause.raised.toLocaleString('en-IN')} raised</span>
                      <span style={{color:cause.color}}>{pct}%</span>
                    </div>
                    <div style={s.progressTrack}>
                      <div style={s.progressFill(pct,cause.color)}/>
                    </div>
                    <div style={{fontSize:'0.72rem',color:'#9a9a7a',marginTop:4}}>Goal: ₹{cause.goal.toLocaleString('en-IN')}</div>
                  </div>
                  <div style={s.causeStats}>
                    <div style={s.causeStat}><span style={s.causeStatNum(cause.color)}>{cause.donors}</span>Donors</div>
                    <div style={s.causeStat}><span style={s.causeStatNum(cause.color)}>₹{cause.amount}</span>Min. donation</div>
                  </div>
                  <button style={s.donateBtn(cause.color)} onClick={()=>handleDonate(cause)}>
                    Donate to This Cause 🙏
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={s.howSection}>
        <div style={{textAlign:'center'}}>
          <div style={s.eyebrow}>Transparency Promise</div>
          <h2 style={{...s.h2,textAlign:'center'}}>How your donation works</h2>
        </div>
        <div style={s.howGrid}>
          {[
            ['1','You Donate','Choose a cause and donate any amount — as little as ₹40.'],
            ['2','We Verify','Our team on the ground in Jhansi verifies the need directly.'],
            ['3','We Deliver','Food, books, medicines or clothes — delivered personally.'],
            ['4','We Report','You receive a WhatsApp update with photos of your impact.'],
          ].map(([n,t,d],i,arr)=>(
            <div key={n} style={{...s.howStep, borderRight:i<arr.length-1?'1px solid #ddd8cc':'none'}}>
              <div style={s.howNum}>{n}</div>
              <div style={s.howTitle}>{t}</div>
              <p style={s.howDesc}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={s.ctaSection}>
        <div style={{fontSize:9,letterSpacing:'3px',textTransform:'uppercase',color:'#a8c89a',marginBottom:'0.75rem'}}>Another Way to Give</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:400,color:'#f4f1eb',marginBottom:'0.75rem'}}>Buy HAMPAR, Give Automatically</h2>
        <p style={{fontSize:'0.87rem',color:'#c8dbc8',maxWidth:500,margin:'0 auto 2rem',lineHeight:1.85}}>Every HAMPAR product purchase automatically contributes to our charity fund. Shop our sacred collection and give without even thinking about it.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/#shop" style={{background:'#f4f1eb',color:'#4a7055',fontSize:'0.75rem',letterSpacing:'1.5px',textTransform:'uppercase',padding:'13px 32px',borderRadius:2,textDecoration:'none',fontWeight:500}}>Shop & Give</Link>
          <Link href="/story" style={{background:'transparent',color:'#f4f1eb',fontSize:'0.75rem',letterSpacing:'1.5px',textTransform:'uppercase',padding:'13px 32px',border:'1px solid rgba(255,255,255,0.4)',borderRadius:2,textDecoration:'none'}}>Our Story</Link>
        </div>
      </section>

      <footer style={s.footer}>
        <div style={s.footerLogo}>HAMPAR SPIRITUALS</div>
        <div style={{display:'flex',gap:'1.25rem',flexWrap:'wrap'}}>
          {[['Shop','/'],['Our Story','/story'],['Purity','/purity'],['Charity','/charity'],['Cart','/cart']].map(([l,h])=>(
            <Link key={l} href={h} style={{fontSize:'0.72rem',letterSpacing:'1px',textTransform:'uppercase',color:'#4a4a32',textDecoration:'none'}}>{l}</Link>
          ))}
        </div>
        <div style={s.footerCopy}>© 2024 Hampar Spirituals · Jhansi, UP</div>
      </footer>

      {/* DONATION MODAL */}
      {donating && !submitted && (
        <div style={s.overlay} onClick={e=>e.target===e.currentTarget&&setDonating(null)}>
          <div style={s.modal}>
            <div style={s.modalTop(donating.color)}>
              <div>
                <div style={s.modalTitle}>{donating.icon} {donating.title}</div>
                <div style={s.modalSub}>Your donation makes a real difference</div>
              </div>
              <button style={s.closeBtn} onClick={()=>setDonating(null)}>×</button>
            </div>
            <div style={s.modalBody}>
              <span style={s.amtLabel}>Select Amount</span>
              <div style={s.amtGrid}>
                {[donating.amount, donating.amount*2, donating.amount*5, donating.amount*10].map(amt=>(
                  <button key={amt} style={s.amtBtn(selectedAmt===amt&&!customAmt, donating.color)} onClick={()=>{setSelectedAmt(amt);setCustomAmt('')}}>₹{amt}</button>
                ))}
              </div>
              <input style={s.customInput} type="number" placeholder="Or enter custom amount (₹)" value={customAmt} onChange={e=>{setCustomAmt(e.target.value);setSelectedAmt(null)}}/>
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Your Name</label>
                <input style={s.fieldInput} placeholder="Manish Kumar" value={donorName} onChange={e=>setDonorName(e.target.value)}/>
              </div>
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Phone (for WhatsApp update)</label>
                <input style={s.fieldInput} placeholder="9876543210" value={donorPhone} onChange={e=>setDonorPhone(e.target.value)}/>
              </div>
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Message (Optional)</label>
                <input style={s.fieldInput} placeholder="A message of hope..." value={donorMsg} onChange={e=>setDonorMsg(e.target.value)}/>
              </div>
              <div style={{background:'#f0f5f0',border:'1px solid rgba(74,112,85,0.2)',borderRadius:3,padding:'0.75rem 1rem',fontSize:'0.78rem',color:'#4a3d2c',lineHeight:1.7,marginTop:'0.5rem'}}>
                💡 Payment via UPI / bank transfer after confirmation. Our team will contact you on WhatsApp within 2 hours.
              </div>
              <button style={s.submitBtn(donating.color)} onClick={handleSubmit}>
                Confirm Donation — ₹{customAmt || selectedAmt} 🙏
              </button>
              <span style={s.cancelLink} onClick={()=>setDonating(null)}>Cancel</span>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {submitted && submittedCause && (
        <div style={s.overlay} onClick={e=>e.target===e.currentTarget&&(setSubmitted(false),setDonating(null))}>
          <div style={s.successModal}>
            <span style={s.successIcon}>🙏</span>
            <h2 style={s.successH}>Thank You, {submittedCause.donorName || 'Kind Soul'}!</h2>
            <p style={s.successP}>Your donation of <strong style={{color:'#4a7055'}}>₹{submittedCause.donatedAmt}</strong> to <strong>"{submittedCause.title}"</strong> has been received. Our team in Jhansi will contact you on WhatsApp within 2 hours with payment details and your impact update.</p>
            <div style={s.successAmt}>₹{submittedCause.donatedAmt}</div>
            <p style={{fontSize:'0.78rem',color:'#7a9a80',margin:'0.5rem 0 1.5rem',fontStyle:'italic'}}>"A small act of kindness ripples forever."</p>
            <button style={{...s.submitBtn('#4a7055'),marginTop:0}} onClick={()=>{setSubmitted(false);setDonating(null)}}>Close & Continue</button>
          </div>
        </div>
      )}
    </div>
  )
}
