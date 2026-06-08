'use client'
import { useState, useEffect } from 'react'
import { useProducts } from '../components/useProducts'
import { cartStore } from '../components/cartStore'

export default function Home() {
  const { products, loading, source } = useProducts()
  const [cartCount, setCartCount] = useState(0)
  const [toast, setToast] = useState({ visible:false, message:'' })
  const [filter, setFilter] = useState('all')
  const [added, setAdded] = useState({})

  // Sync cart count from localStorage
  useEffect(() => {
    setCartCount(cartStore.count())
    const onUpdate = () => setCartCount(cartStore.count())
    window.addEventListener('cartUpdated', onUpdate)
    return () => window.removeEventListener('cartUpdated', onUpdate)
  }, [])

  const addToCart = (product) => {
    cartStore.add(product)
    setCartCount(cartStore.count())
    setAdded(a => ({...a,[product.id]:true}))
    setTimeout(() => setAdded(a => ({...a,[product.id]:false})), 1800)
    setToast({visible:true, message:`${product.name} added!`})
    setTimeout(() => setToast(t => ({...t,visible:false})), 2500)
  }

  const heroProds = products.slice(0,2)
  const moreProds = products.slice(2).filter(p => filter==='all' || p.type===filter)

  const s = {
    page: { fontFamily:"'DM Sans',sans-serif", background:'#f4f1eb', color:'#2a2a1e', margin:0 },
    nav: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.9rem 2rem', background:'#f4f1eb', borderBottom:'1px solid #ddd8cc', position:'sticky', top:0, zIndex:100 },
    logoWrap: { display:'flex', alignItems:'center', gap:10 },
    logoText: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', fontWeight:600, letterSpacing:3, color:'#4a7055', lineHeight:1 },
    logoSub: { fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'#7a9a80', marginTop:2 },
    navLinks: { display:'flex', flexDirection:'row', gap:'1.5rem', listStyle:'none', margin:0, padding:0 },
    navLink: { fontSize:'0.78rem', letterSpacing:'1.5px', textTransform:'uppercase', color:'#5a5a42', textDecoration:'none' },
    cartBtn: { display:'flex', alignItems:'center', gap:6, background:'#4a7055', color:'#f4f1eb', fontSize:'0.75rem', letterSpacing:'1px', textTransform:'uppercase', padding:'8px 18px', border:'none', borderRadius:2, cursor:'pointer' },
    badge: { background:'#c9a84c', color:'#2a2a1e', fontSize:9, fontWeight:700, width:16, height:16, borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center' },
    hero: { display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:480, background:'#edeae0' },
    heroLeft: { padding:'3.5rem 2.5rem', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:'1px solid #ddd8cc' },
    eyebrow: { fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'1.2rem', display:'flex', alignItems:'center', gap:8 },
    h1: { fontFamily:"'Cormorant Garamond',serif", fontSize:'3rem', fontWeight:400, lineHeight:1.2, color:'#2a2a1e', marginBottom:'1rem' },
    heroDesc: { fontSize:'0.88rem', color:'#6a6a52', lineHeight:1.85, maxWidth:360, marginBottom:'2rem' },
    btnRow: { display:'flex', gap:10 },
    btnPrimary: { background:'#4a7055', color:'#f4f1eb', fontSize:'0.75rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'12px 28px', border:'none', borderRadius:2, cursor:'pointer' },
    btnGhost: { background:'transparent', color:'#2a2a1e', fontSize:'0.75rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'12px 28px', border:'1px solid #2a2a1e', borderRadius:2, cursor:'pointer' },
    heroRight: { background:'#e2ddd0', overflow:'hidden' },
    trustStrip: { display:'flex', justifyContent:'space-around', alignItems:'center', padding:'0.9rem 2rem', background:'#4a7055', flexWrap:'wrap', gap:8 },
    trustItem: { fontSize:'0.74rem', color:'#c8dbc8', letterSpacing:'0.5px' },
    section: { padding:'3rem 2rem', background:'#f4f1eb' },
    section2: { padding:'2.5rem 2rem 3rem', background:'#f9f7f2' },
    sectionHead: { textAlign:'center', marginBottom:'2.5rem' },
    eyebrowGreen: { fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'#7a9a80', marginBottom:'0.6rem' },
    h2: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:400, color:'#2a2a1e', margin:0 },
    heroGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', maxWidth:880, margin:'0 auto' },
    heroCard: { background:'#edeae0', border:'1px solid #ddd8cc', borderRadius:4, overflow:'hidden' },
    cardImg: { display:'flex', alignItems:'center', justifyContent:'center', position:'relative', borderBottom:'1px solid #ddd8cc', height:240, overflow:'hidden' },
    cardBadge: { position:'absolute', top:12, left:12, fontSize:8, letterSpacing:'2px', textTransform:'uppercase', padding:'4px 10px', background:'#4a7055', color:'#f4f1eb', borderRadius:2, zIndex:1 },
    cardBody: { padding:'1.5rem' },
    cardCat: { fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'#7a9a80', marginBottom:6 },
    cardName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.7rem', fontWeight:400, color:'#2a2a1e', marginBottom:6 },
    cardDesc: { fontSize:'0.8rem', color:'#6a6a52', lineHeight:1.8, marginBottom:'1rem' },
    cardFooter: { display:'flex', alignItems:'center', justifyContent:'space-between' },
    price: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', fontWeight:500, color:'#4a7055' },
    origPrice: { fontSize:'0.75rem', color:'#9a9a7a', textDecoration:'line-through', marginBottom:2 },
    addBtn: (isAdded) => ({ background:isAdded?'#c9a84c':'#4a7055', color:isAdded?'#2a2a1e':'#f4f1eb', fontSize:'0.72rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'10px 20px', border:'none', borderRadius:2, cursor:'pointer' }),
    filters: { display:'flex', justifyContent:'center', gap:8, marginBottom:'2rem', flexWrap:'wrap' },
    filterBtn: (active) => ({ fontSize:'0.75rem', letterSpacing:'1px', textTransform:'uppercase', padding:'7px 20px', border:'1px solid', borderColor:active?'#4a7055':'#ddd8cc', background:active?'#4a7055':'transparent', color:active?'#f4f1eb':'#6a6a52', borderRadius:2, cursor:'pointer' }),
    prodGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem', maxWidth:960, margin:'0 auto' },
    smallCard: { background:'#f4f1eb', border:'1px solid #ddd8cc', borderRadius:4, overflow:'hidden' },
    smallImg: { height:160, display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid #ddd8cc', position:'relative', overflow:'hidden' },
    smallBody: { padding:'1rem' },
    smallName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', color:'#2a2a1e', marginBottom:4 },
    smallDesc: { fontSize:'0.75rem', color:'#6a6a52', lineHeight:1.7, marginBottom:10 },
    smallFooter: { display:'flex', alignItems:'center', justifyContent:'space-between' },
    smallPrice: { fontSize:'0.92rem', fontWeight:500, color:'#4a7055' },
    smallBtn: (isAdded) => ({ background:isAdded?'#4a7055':'transparent', color:isAdded?'#f4f1eb':'#4a7055', border:'1px solid #4a7055', fontSize:'0.7rem', letterSpacing:'1px', textTransform:'uppercase', padding:'5px 12px', borderRadius:2, cursor:'pointer' }),
    storyBand: { display:'grid', gridTemplateColumns:'1fr 1fr', background:'#edeae0' },
    storyText: { padding:'3.5rem 2.5rem', borderRight:'1px solid #ddd8cc' },
    storyH2: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.9rem', fontWeight:400, lineHeight:1.35, marginBottom:'1rem', color:'#2a2a1e' },
    storyP: { fontSize:'0.85rem', color:'#6a6a52', lineHeight:1.9, marginBottom:'0.9rem' },
    statsRow: { display:'flex', gap:'1.5rem', marginTop:'1.5rem', paddingTop:'1.5rem', borderTop:'1px solid #ddd8cc' },
    statNum: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:500, color:'#4a7055' },
    statLbl: { fontSize:9, letterSpacing:'2px', textTransform:'uppercase', color:'#7a9a80', marginTop:2 },
    storyVisual: { background:'#ddd8c8', overflow:'hidden' },
    processBand: { padding:'3rem 2rem', background:'#4a7055', textAlign:'center' },
    processH2: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:400, color:'#f4f1eb', marginBottom:'2rem' },
    stepsRow: { display:'grid', gridTemplateColumns:'repeat(5,1fr)' },
    step: { padding:'1.25rem 0.75rem' },
    stepNum: { width:32, height:32, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 0.75rem', fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:'#c8dbc8' },
    stepH3: { fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem', fontWeight:500, color:'#f4f1eb', marginBottom:5 },
    stepP: { fontSize:'0.75rem', color:'#a8c89a', lineHeight:1.65 },
    reviews: { padding:'3rem 2rem', background:'#f9f7f2' },
    reviewGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1rem', maxWidth:900, margin:'0 auto' },
    revCard: { background:'#f4f1eb', border:'1px solid #ddd8cc', borderRadius:4, padding:'1.25rem' },
    revStars: { color:'#c9a84c', fontSize:'0.9rem', marginBottom:8, letterSpacing:2 },
    revText: { fontSize:'0.82rem', color:'#4a3d2c', lineHeight:1.75, fontStyle:'italic', marginBottom:10 },
    revName: { fontSize:'0.72rem', letterSpacing:'1.5px', textTransform:'uppercase', color:'#7a9a80' },
    newsletter: { background:'#2a2a1e', padding:'2.5rem 2rem', textAlign:'center' },
    nlH2: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.7rem', fontWeight:400, color:'#f4f1eb', marginBottom:'0.5rem' },
    nlP: { fontSize:'0.83rem', color:'#9a9a7a', marginBottom:'1.5rem' },
    nlForm: { display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', maxWidth:420, margin:'0 auto' },
    nlInput: { flex:1, minWidth:190, padding:'10px 14px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', color:'#f4f1eb', fontFamily:"'DM Sans',sans-serif", fontSize:'0.83rem', borderRadius:2, outline:'none' },
    nlBtn: { background:'#c9a84c', color:'#2a2a1e', border:'none', padding:'10px 22px', fontFamily:"'DM Sans',sans-serif", fontSize:'0.75rem', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', borderRadius:2, cursor:'pointer' },
    footer: { background:'#1e1e14', padding:'2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' },
    footerLogo: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', letterSpacing:3, color:'#7a9a80', marginBottom:4 },
    footerNote: { fontSize:'0.72rem', color:'#4a4a32' },
    footerLinks: { display:'flex', gap:'1.25rem', flexWrap:'wrap' },
    footerLink: { fontSize:'0.72rem', letterSpacing:'1px', textTransform:'uppercase', color:'#4a4a32', textDecoration:'none' },
    footerCopy: { fontSize:'0.72rem', color:'#3a3a24' },
    toast: (v) => ({ position:'fixed', bottom:24, right:24, background:'#2a2a1e', color:'#f4f1eb', padding:'12px 18px', borderRadius:4, fontSize:'0.82rem', display:'flex', alignItems:'center', gap:8, borderLeft:'3px solid #4a7055', opacity:v?1:0, transform:v?'translateY(0)':'translateY(8px)', transition:'all 0.3s', zIndex:300, pointerEvents:'none' }),
    skeleton: { background:'linear-gradient(90deg,#edeae0 25%,#e8e4d8 50%,#edeae0 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite', borderRadius:4 },
  }

  const ProductImage = ({ product, height }) => {
    if (product.image) {
      return <img src={product.image} alt={product.name} style={{width:'100%', height:height||'100%', objectFit:'cover'}}/>
    }
    if (product.type === 'agarbatti') {
      return (
        <svg width="100" height="140" viewBox="0 0 120 168" style={{opacity:0.9}}>
          <line x1="58" y1="15" x2="58" y2="125" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.45"/>
          <line x1="62" y1="15" x2="62" y2="125" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.45"/>
          <circle cx="60" cy="13" r="5" fill="#c9a84c" opacity="0.9"/>
          <path d="M60 18 Q44 34 37 54 Q30 72 40 82 Q50 90 60 76" fill="none" stroke="#4a7055" strokeWidth="1.4" opacity="0.7"/>
          <ellipse cx="35" cy="58" rx="13" ry="8" fill="#6a9a6a" opacity="0.6" transform="rotate(-25 35 58)"/>
          <path d="M60 18 Q76 34 83 54 Q90 72 80 82 Q70 90 60 76" fill="none" stroke="#4a7055" strokeWidth="1.4" opacity="0.7"/>
          <ellipse cx="85" cy="58" rx="13" ry="8" fill="#6a9a6a" opacity="0.6" transform="rotate(25 85 58)"/>
          <ellipse cx="44" cy="84" rx="9" ry="13" fill="#c4889a" opacity="0.65" transform="rotate(-10 44 84)"/>
          <ellipse cx="60" cy="80" rx="8" ry="12" fill="#b87888" opacity="0.5"/>
          <ellipse cx="76" cy="84" rx="9" ry="13" fill="#c4889a" opacity="0.65" transform="rotate(10 76 84)"/>
        </svg>
      )
    }
    return (
      <svg width="100" height="140" viewBox="0 0 120 168">
        <polygon points="60,10 110,38 110,100 60,128 10,100 10,38" fill="#7a9a80" opacity="0.2" stroke="#4a7055" strokeWidth="1.5"/>
        <polygon points="60,24 96,44 96,90 60,110 24,90 24,44" fill="#4a7055" opacity="0.1"/>
        <text x="60" y="72" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="10" fill="#2a2a1e" letterSpacing="2" opacity="0.8">HAMPAR</text>
        <text x="60" y="86" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="7" fill="#4a7055" letterSpacing="1.5" opacity="0.9">DHUPBATTI</text>
      </svg>
    )
  }

  return (
    <div style={s.page}>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>

      <nav style={s.nav}>
        <div style={s.logoWrap}>
          <svg width="36" height="36" viewBox="0 0 80 80" fill="none">
            <rect x="18" y="38" width="44" height="28" rx="4" stroke="#2a2a1e" strokeWidth="2.5" fill="none"/>
            <path d="M26 38 Q28 24 40 22 Q52 24 54 38" stroke="#2a2a1e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <rect x="30" y="16" width="8" height="22" rx="4" stroke="#2a2a1e" strokeWidth="2" fill="none"/>
            <rect x="42" y="16" width="8" height="22" rx="4" stroke="#2a2a1e" strokeWidth="2" fill="none"/>
            <circle cx="32" cy="38" r="2.5" fill="#2a2a1e"/>
            <circle cx="48" cy="38" r="2.5" fill="#2a2a1e"/>
            <path d="M40 62 Q36 54 38 48 Q40 44 40 44 Q40 44 42 48 Q44 54 40 62Z" fill="#4a7055" opacity="0.8"/>
          </svg>
          <div><div style={s.logoText}>HAMPAR</div><div style={s.logoSub}>Spirituals</div></div>
        </div>
        <ul style={s.navLinks}>
          <li><a href="#shop" style={s.navLink}>Shop</a></li>
          <li><a href="/story" style={s.navLink}>Our Story</a></li>
          <li><a href="/purity" style={s.navLink}>Purity</a></li>
          <li><a href="/charity" style={s.navLink}>Charity</a></li>
        </ul>
        <button style={s.cartBtn} onClick={()=>window.location.href='/cart'}>
          🛍 Cart <span style={s.badge}>{cartCount}</span>
        </button>
      </nav>

      <section style={s.hero}>
        <div style={s.heroLeft}>
          <div style={s.eyebrow}><span style={{width:24,height:1,background:'#7a9a80',display:'inline-block'}}></span>Temple-grade · Jhansi, India</div>
          <h1 style={s.h1}>Sacred fragrance,<br/><em style={{color:'#4a7055',fontStyle:'italic'}}>purely crafted</em><br/>for your ritual</h1>
          <p style={s.heroDesc}>HAMPAR Spirituals brings you charcoal-free agarbatti and dhupbatti — hand-crafted from the finest botanicals.</p>
          <div style={s.btnRow}>
            <button style={s.btnPrimary} onClick={()=>document.getElementById('shop').scrollIntoView({behavior:'smooth'})}>Shop Now</button>
            <button style={s.btnGhost} onClick={()=>window.location.href='/story'}>Our Story ↗</button>
          </div>
        </div>
        <div style={s.heroRight}>
          <svg width="100%" height="480" viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="480" fill="#e2ddd0"/>
            <g transform="translate(50,210)">
              <polygon points="0,0 200,0 220,35 -20,35" fill="#c9a84c" opacity="0.75"/>
              <polygon points="0,0 -20,35 -20,90 0,58" fill="#a88832" opacity="0.8"/>
              <polygon points="200,0 220,35 220,90 200,58" fill="#b89a42" opacity="0.6"/>
              <polygon points="0,0 200,0 200,58 0,58" fill="#dfc878" opacity="0.4"/>
              <text x="58" y="30" fontFamily="'Cormorant Garamond',serif" fontSize="12" fill="#2a1e08" letterSpacing="2">HAMPAR</text>
              <text x="44" y="44" fontFamily="'DM Sans',sans-serif" fontSize="7" fill="#5c4a1a" letterSpacing="1.5">AGARBATTI · LAVENDER</text>
            </g>
            <g transform="translate(140,60)">
              <line x1="25" y1="0" x2="25" y2="130" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,6" opacity="0.4"/>
              <circle cx="27" cy="0" r="5" fill="#c9a84c" opacity="0.9"/>
              <path d="M27 8 Q12 26 6 48 Q0 68 10 78 Q20 86 27 72" fill="none" stroke="#4a7055" strokeWidth="1.3" opacity="0.7"/>
              <ellipse cx="4" cy="52" rx="13" ry="8" fill="#6a9a6a" opacity="0.6" transform="rotate(-25 4 52)"/>
              <path d="M27 8 Q42 26 48 48 Q54 68 44 78 Q34 86 27 72" fill="none" stroke="#4a7055" strokeWidth="1.3" opacity="0.7"/>
              <ellipse cx="50" cy="52" rx="13" ry="8" fill="#6a9a6a" opacity="0.6" transform="rotate(25 50 52)"/>
              <ellipse cx="18" cy="80" rx="9" ry="13" fill="#c4889a" opacity="0.65" transform="rotate(-10 18 80)"/>
              <ellipse cx="27" cy="76" rx="8" ry="12" fill="#b87888" opacity="0.5"/>
              <ellipse cx="36" cy="80" rx="9" ry="13" fill="#c4889a" opacity="0.65" transform="rotate(10 36 80)"/>
            </g>
            <g transform="translate(260,120)">
              <polygon points="45,0 90,26 90,78 45,104 0,78 0,26" fill="#7a9a80" opacity="0.25" stroke="#4a7055" strokeWidth="1.5"/>
              <text x="45" y="54" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="9" fill="#2a2a1e" letterSpacing="2" opacity="0.8">HAMPAR</text>
              <text x="45" y="66" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="6" fill="#4a7055" letterSpacing="1.5" opacity="0.9">DHUPBATTI</text>
            </g>
            <text x="200" y="450" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="11" fill="#7a9a80" letterSpacing="3" fontStyle="italic">pure · sacred · handcrafted</text>
          </svg>
        </div>
      </section>

      <div style={s.trustStrip}>
        {['🌿 100% Natural','🚫 Charcoal-Free','📱 QR Verified','📍 Jhansi Crafted','🚚 Free Ship ₹299+'].map(t=><div key={t} style={s.trustItem}>{t}</div>)}
      </div>

      <section style={s.section} id="shop">
        <div style={s.sectionHead}>
          <div style={s.eyebrowGreen}>Signature Products</div>
          <h2 style={s.h2}>Our Sacred Offerings</h2>
          <p style={{fontSize:'0.85rem',color:'#6a6a52',marginTop:'0.5rem'}}>Two forms. One intention. Pure fragrance for every ritual.</p>
          {source==='sheets' && <p style={{fontSize:'0.7rem',color:'#7a9a80',marginTop:'0.4rem'}}>✓ Live from Google Sheets</p>}
        </div>
        {loading ? (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',maxWidth:880,margin:'0 auto'}}>
            {[1,2].map(i=><div key={i} style={{...s.skeleton,height:400}}/>)}
          </div>
        ) : (
          <div style={s.heroGrid}>
            {heroProds.map(p=>(
              <div key={p.id} style={s.heroCard}>
                <div style={{...s.cardImg,background:p.bg}}>
                  {p.badge && <span style={s.cardBadge}>{p.badge}</span>}
                  <ProductImage product={p}/>
                </div>
                <div style={s.cardBody}>
                  <div style={s.cardCat}>{p.category}</div>
                  <div style={s.cardName}>{p.name}</div>
                  <p style={s.cardDesc}>{p.description}</p>
                  <div style={s.cardFooter}>
                    <div>
                      {p.originalPrice && <div style={s.origPrice}>₹{p.originalPrice}</div>}
                      <div style={s.price}>₹{p.price}</div>
                    </div>
                    <button style={s.addBtn(added[p.id])} onClick={()=>addToCart(p)}>{added[p.id]?'✓ Added':'Add to Cart'}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={s.section2}>
        <div style={s.sectionHead}>
          <div style={s.eyebrowGreen}>Full Collection</div>
          <h2 style={s.h2}>More Fragrances</h2>
        </div>
        <div style={s.filters}>
          {[['all','All'],['agarbatti','Agarbatti'],['dhupbatti','Dhupbatti']].map(([f,l])=>(
            <button key={f} style={s.filterBtn(filter===f)} onClick={()=>setFilter(f)}>{l}</button>
          ))}
        </div>
        {loading ? (
          <div style={s.prodGrid}>{[1,2,3,4].map(i=><div key={i} style={{...s.skeleton,height:280}}/>)}</div>
        ) : (
          <div style={s.prodGrid}>
            {moreProds.map(p=>(
              <div key={p.id} style={s.smallCard}>
                <div style={{...s.smallImg,background:p.bg}}>
                  {p.badge && <span style={{...s.cardBadge,fontSize:7}}>{p.badge}</span>}
                  <ProductImage product={p}/>
                </div>
                <div style={s.smallBody}>
                  <div style={s.cardCat}>{p.category}</div>
                  <div style={s.smallName}>{p.name}</div>
                  <p style={s.smallDesc}>{p.description}</p>
                  <div style={s.smallFooter}>
                    <div style={s.smallPrice}>₹{p.price}</div>
                    <button style={s.smallBtn(added[p.id])} onClick={()=>addToCart(p)}>{added[p.id]?'✓':'Add'}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={s.storyBand}>
        <div style={s.storyText}>
          <div style={{...s.eyebrowGreen,marginBottom:'0.8rem'}}>Our Promise</div>
          <h2 style={s.storyH2}>Crafted with reverence,<br/>verified with trust</h2>
          <p style={s.storyP}>In the heart of Jhansi, every HAMPAR stick is hand-rolled using lavender, sandalwood, and pure botanical resins — never charcoal, never synthetic fragrance.</p>
          <p style={s.storyP}>Our triangular prism and hexagonal packs protect fragrance integrity, and every box carries a QR code linking to your batch purity certificate.</p>
          <div style={s.statsRow}>
            {[['100%','Natural'],['45m','Burn time'],['₹40','Accessible']].map(([n,l])=>(
              <div key={l}><div style={s.statNum}>{n}</div><div style={s.statLbl}>{l}</div></div>
            ))}
          </div>
        </div>
        <div style={s.storyVisual}>
          <svg width="100%" height="360" viewBox="0 0 300 360">
            <rect width="300" height="360" fill="#ddd8c8"/>
            <g transform="translate(60,60)">
              <polygon points="90,0 180,52 180,156 90,208 0,156 0,52" fill="#7a9a80" opacity="0.2" stroke="#4a7055" strokeWidth="1.5"/>
              <text x="90" y="108" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="16" fill="#2a2a1e" letterSpacing="2">HAMPAR</text>
              <text x="90" y="128" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="9" fill="#4a7055" letterSpacing="2">SPIRITUALS</text>
            </g>
            <text x="150" y="300" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="12" fill="#7a9a80" fontStyle="italic" letterSpacing="2">Jhansi · उत्तर प्रदेश</text>
          </svg>
        </div>
      </section>

      <section style={s.processBand}>
        <div style={{fontSize:9,letterSpacing:'3px',textTransform:'uppercase',color:'#a8c89a',marginBottom:'0.6rem'}}>Craft Process</div>
        <h2 style={s.processH2}>From botanical to sacred smoke</h2>
        <div style={s.stepsRow}>
          {[['1','Source','Pure botanicals from trusted farms'],['2','Blend','Temple-grade formulas, master blended'],['3','Roll','Each stick hand-rolled, not machine-pressed'],['4','Cure','Sun-dried 72 hours to lock fragrance'],['5','Verify','QR purity cert on every pack']].map(([n,t,d],i,arr)=>(
            <div key={n} style={{...s.step,borderRight:i<arr.length-1?'1px solid rgba(255,255,255,0.12)':'none'}}>
              <div style={s.stepNum}>{n}</div>
              <div style={s.stepH3}>{t}</div>
              <p style={s.stepP}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={s.reviews}>
        <div style={s.sectionHead}>
          <div style={s.eyebrowGreen}>Reviews</div>
          <h2 style={s.h2}>Loved across sacred homes</h2>
        </div>
        <div style={s.reviewGrid}>
          {[
            ['"The lavender fragrance is ethereal — no harsh smoke. HAMPAR has replaced every other brand in our home."','Priya S. · Jhansi'],
            ['"The dhupbatti cones are outstanding. Sandalwood lasts over 25 minutes. Premium at a fair price."','Ananya M. · Lucknow'],
            ['"Scanned the QR, saw the purity certificate. That transparency is rare. Ordered 12 packs for the family."','Rohan K. · Delhi'],
          ].map(([text,name],i)=>(
            <div key={i} style={s.revCard}>
              <div style={s.revStars}>★★★★★</div>
              <p style={s.revText}>{text}</p>
              <div style={s.revName}>{name}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={s.newsletter}>
        <h2 style={s.nlH2}>Join the sacred circle</h2>
        <p style={s.nlP}>New fragrances, batch drops & early access — straight to your inbox.</p>
        <div style={s.nlForm}>
          <input style={s.nlInput} type="email" placeholder="Your email address"/>
          <button style={s.nlBtn}>Subscribe</button>
        </div>
      </section>

      <footer style={s.footer}>
        <div>
          <div style={s.footerLogo}>HAMPAR SPIRITUALS</div>
          <div style={s.footerNote}>Crafted in Jhansi, Uttar Pradesh</div>
        </div>
        <div style={s.footerLinks}>
          {[['Shop','#shop'],['Our Story','/story'],['Purity','/purity'],['Charity','/charity'],['Cart','/cart']].map(([l,h])=>(
            <a key={l} href={h} style={s.footerLink}>{l}</a>
          ))}
        </div>
        <div style={s.footerCopy}>© 2024 Hampar Spirituals</div>
      </footer>

      <div style={s.toast(toast.visible)}>✓ {toast.message}</div>
    </div>
  )
}
