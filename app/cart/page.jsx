'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cartStore } from '../../components/cartStore'

const SUGGESTED = [
  { id:3, name:'Rose Divya', category:'Agarbatti · Floral', price:40, bg:'#f0dcd8', type:'agarbatti' },
  { id:4, name:'Champak Sacred', category:'Dhupbatti · Rare', price:55, bg:'#ede8d0', type:'dhupbatti' },
  { id:5, name:'Eucalyptus Clear', category:'Agarbatti · Fresh', price:40, bg:'#d8edda', type:'agarbatti' },
]

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [coupon, setCoupon] = useState('')
  const [couponMsg, setCouponMsg] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [added, setAdded] = useState({})

  useEffect(() => {
    setCart(cartStore.get())
    const onUpdate = () => setCart(cartStore.get())
    window.addEventListener('cartUpdated', onUpdate)
    return () => window.removeEventListener('cartUpdated', onUpdate)
  }, [])

  const updateQty = (id, delta) => {
    cartStore.updateQty(id, delta)
    setCart(cartStore.get())
  }

  const remove = (id) => {
    cartStore.remove(id)
    setCart(cartStore.get())
  }

  const subtotal = cart.reduce((s,i) => s+i.price*i.qty, 0)
  const shipping = subtotal >= 299 ? 0 : 49
  const total = subtotal - discount + shipping

  const applyCoupon = () => {
    if (coupon.toUpperCase()==='HAMPAR10') { setDiscount(Math.round(subtotal*0.1)); setCouponMsg({type:'success',text:'10% discount applied!'}) }
    else if (coupon.toUpperCase()==='SACRED') { setDiscount(20); setCouponMsg({type:'success',text:'₹20 discount applied!'}) }
    else { setDiscount(0); setCouponMsg({type:'error',text:'Invalid coupon code.'}) }
  }

  const addSuggested = (p) => {
    cartStore.add(p)
    setCart(cartStore.get())
    setAdded(a => ({...a,[p.id]:true}))
    setTimeout(() => setAdded(a => ({...a,[p.id]:false})), 1800)
  }

  const s = {
    page: { fontFamily:"'DM Sans',sans-serif", background:'#f4f1eb', color:'#2a2a1e', minHeight:'100vh' },
    nav: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.9rem 2rem', background:'#f4f1eb', borderBottom:'1px solid #ddd8cc', position:'sticky', top:0, zIndex:100 },
    logoText: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', fontWeight:600, letterSpacing:3, color:'#4a7055', lineHeight:1 },
    logoSub: { fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'#7a9a80', marginTop:2 },
    wrapper: { maxWidth:1100, margin:'0 auto', padding:'2.5rem 2rem' },
    pageTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', fontWeight:400, color:'#2a2a1e', marginBottom:'0.3rem' },
    pageCount: { fontSize:'0.82rem', color:'#7a9a80', letterSpacing:'1px', marginBottom:'2rem' },
    layout: { display:'grid', gridTemplateColumns:'1fr 360px', gap:'2rem', alignItems:'start' },
    colHead: { display:'grid', gridTemplateColumns:'1fr 120px 100px 40px', gap:'1rem', padding:'0 0 0.75rem', borderBottom:'1px solid #ddd8cc', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#7a9a80' },
    cartRow: { display:'grid', gridTemplateColumns:'1fr 120px 100px 40px', gap:'1rem', alignItems:'center', padding:'1.25rem 0', borderBottom:'1px solid #ddd8cc' },
    itemLeft: { display:'flex', alignItems:'center', gap:'1rem' },
    thumb: { width:72, height:72, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'1px solid #ddd8cc' },
    itemName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', color:'#2a2a1e', marginBottom:3 },
    itemCat: { fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#7a9a80', marginBottom:3 },
    itemMeta: { fontSize:'0.74rem', color:'#9a9a7a' },
    qtyControl: { display:'flex', alignItems:'center', border:'1px solid #ddd8cc', borderRadius:2, overflow:'hidden', width:'fit-content' },
    qtyBtn: { background:'none', border:'none', width:32, height:32, cursor:'pointer', fontSize:'1rem', color:'#4a7055', display:'flex', alignItems:'center', justifyContent:'center' },
    qtyNum: { width:36, textAlign:'center', fontSize:'0.85rem', borderLeft:'1px solid #ddd8cc', borderRight:'1px solid #ddd8cc', height:32, display:'flex', alignItems:'center', justifyContent:'center' },
    itemPrice: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontWeight:500, color:'#4a7055' },
    removeBtn: { background:'none', border:'none', cursor:'pointer', color:'#c9a0a0', fontSize:18 },
    summary: { background:'#edeae0', border:'1px solid #ddd8cc', borderRadius:4, padding:'1.5rem', position:'sticky', top:80 },
    summaryTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', color:'#2a2a1e', marginBottom:'1.25rem', paddingBottom:'1rem', borderBottom:'1px solid #ddd8cc' },
    summaryRow: { display:'flex', justifyContent:'space-between', fontSize:'0.83rem', color:'#6a6a52', marginBottom:'0.6rem' },
    summaryTotal: { display:'flex', justifyContent:'space-between', alignItems:'center', margin:'1rem 0' },
    totalAmt: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:500, color:'#4a7055' },
    couponRow: { display:'flex', gap:6, marginBottom:'0.5rem' },
    couponInput: { flex:1, padding:'9px 12px', background:'#f4f1eb', border:'1px solid #ddd8cc', borderRadius:2, fontSize:'0.82rem', fontFamily:"'DM Sans',sans-serif", outline:'none', color:'#2a2a1e' },
    couponBtn: { background:'#2a2a1e', color:'#f4f1eb', border:'none', padding:'9px 14px', borderRadius:2, fontSize:'0.75rem', cursor:'pointer' },
    checkoutBtn: { width:'100%', background:'#4a7055', color:'#f4f1eb', fontSize:'0.78rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:13, border:'none', borderRadius:2, cursor:'pointer', marginBottom:'0.75rem', fontFamily:"'DM Sans',sans-serif" },
    continueLink: { display:'block', textAlign:'center', width:'100%', background:'transparent', color:'#2a2a1e', fontSize:'0.75rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'11px', border:'1px solid #2a2a1e', borderRadius:2, textDecoration:'none', boxSizing:'border-box' },
    shipNote: { textAlign:'center', fontSize:'0.75rem', color:'#7a9a80', marginTop:'0.75rem' },
    trust: { display:'flex', justifyContent:'space-around', marginTop:'1.25rem', paddingTop:'1.25rem', borderTop:'1px solid #ddd8cc' },
    trustItem: { textAlign:'center', fontSize:'9px', letterSpacing:'1px', textTransform:'uppercase', color:'#7a9a80' },
    suggestedSection: { marginTop:'3rem' },
    suggestedTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', color:'#2a2a1e', marginBottom:'1.25rem', paddingBottom:'0.75rem', borderBottom:'1px solid #ddd8cc' },
    suggestedGrid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' },
    sugCard: { background:'#edeae0', border:'1px solid #ddd8cc', borderRadius:4, overflow:'hidden', display:'flex', gap:'1rem', padding:'1rem', alignItems:'center' },
    sugThumb: { width:60, height:60, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
    sugName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:'#2a2a1e', marginBottom:3 },
    sugCat: { fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#7a9a80', marginBottom:6 },
    sugFooter: { display:'flex', alignItems:'center', justifyContent:'space-between' },
    sugPrice: { fontSize:'0.9rem', fontWeight:500, color:'#4a7055' },
    sugBtn: (a) => ({ background:a?'#4a7055':'transparent', color:a?'#f4f1eb':'#4a7055', border:'1px solid #4a7055', fontSize:'0.7rem', letterSpacing:'1px', textTransform:'uppercase', padding:'5px 12px', borderRadius:2, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }),
    footer: { background:'#1e1e14', padding:'1.5rem 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginTop:'3rem' },
    footerLogo: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', letterSpacing:3, color:'#7a9a80' },
    footerCopy: { fontSize:'0.72rem', color:'#3a3a24' },
    divider: { borderTop:'1px solid #ddd8cc', margin:'1rem 0' },
  }

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
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
        <Link href="/" style={{fontSize:'0.78rem',letterSpacing:'1.5px',textTransform:'uppercase',color:'#6a6a52',textDecoration:'none'}}>← Continue Shopping</Link>
      </nav>

      <div style={s.wrapper}>
        <div style={s.pageTitle}>Your Cart</div>
        <div style={s.pageCount}>{cart.reduce((s,i)=>s+i.qty,0)} items</div>

        {cart.length === 0 ? (
          <div style={{textAlign:'center',padding:'4rem 2rem',background:'#edeae0',borderRadius:4,border:'1px solid #ddd8cc'}}>
            <div style={{fontSize:48,marginBottom:'1rem'}}>🪔</div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.5rem',color:'#2a2a1e',marginBottom:'0.75rem'}}>Your cart is empty</h2>
            <p style={{fontSize:'0.85rem',color:'#6a6a52',marginBottom:'1.5rem'}}>Add some sacred fragrance to begin.</p>
            <Link href="/" style={{background:'#4a7055',color:'#f4f1eb',padding:'12px 28px',borderRadius:2,fontSize:'0.8rem',letterSpacing:'1.5px',textTransform:'uppercase',textDecoration:'none'}}>Shop Now</Link>
          </div>
        ) : (
          <div style={s.layout}>
            <div>
              <div style={s.colHead}>
                <div>Product</div><div>Quantity</div><div>Price</div><div></div>
              </div>
              {cart.map(item => (
                <div key={item.id} style={s.cartRow}>
                  <div style={s.itemLeft}>
                    <div style={{...s.thumb, background:item.bg||'#ede8d8'}}>
                      <svg width="32" height="44" viewBox="0 0 80 110" opacity="0.8">
                        <line x1="38" y1="5" x2="38" y2="90" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.4"/>
                        <circle cx="38" cy="5" r="4" fill="#c9a84c"/>
                        <ellipse cx="30" cy="65" rx="7" ry="10" fill="#c4889a" opacity="0.55"/>
                        <ellipse cx="46" cy="65" rx="7" ry="10" fill="#c4889a" opacity="0.55"/>
                      </svg>
                    </div>
                    <div>
                      <div style={s.itemName}>{item.name}</div>
                      <div style={s.itemCat}>{item.category}</div>
                      <div style={s.itemMeta}>{item.type === 'agarbatti' ? '30 sticks · Triangular prism' : '20 cones · Hexagonal box'}</div>
                    </div>
                  </div>
                  <div style={s.qtyControl}>
                    <button style={s.qtyBtn} onClick={()=>updateQty(item.id,-1)}>−</button>
                    <div style={s.qtyNum}>{item.qty}</div>
                    <button style={s.qtyBtn} onClick={()=>updateQty(item.id,+1)}>+</button>
                  </div>
                  <div style={s.itemPrice}>₹{item.price*item.qty}</div>
                  <button style={s.removeBtn} onClick={()=>remove(item.id)}>×</button>
                </div>
              ))}

              <div style={{marginTop:'1.5rem',padding:'1.25rem',background:'#edeae0',borderRadius:4,border:'1px solid #ddd8cc'}}>
                {shipping===0
                  ? <p style={{fontSize:'0.82rem',color:'#4a7055'}}>✓ You've unlocked <strong>free shipping!</strong></p>
                  : <>
                    <p style={{fontSize:'0.82rem',color:'#6a6a52',marginBottom:'0.6rem'}}>Add <strong style={{color:'#2a2a1e'}}>₹{299-subtotal}</strong> more for free shipping</p>
                    <div style={{background:'#ddd8cc',borderRadius:10,height:4,overflow:'hidden'}}>
                      <div style={{background:'#4a7055',height:'100%',width:`${Math.min(100,(subtotal/299)*100)}%`,transition:'width 0.4s'}}/>
                    </div>
                  </>
                }
              </div>
            </div>

            <div style={s.summary}>
              <div style={s.summaryTitle}>Order Summary</div>
              <div style={s.summaryRow}><span>Subtotal</span><span>₹{subtotal}</span></div>
              {discount>0 && <div style={{...s.summaryRow,color:'#4a7055'}}><span>Discount</span><span>−₹{discount}</span></div>}
              <div style={s.summaryRow}><span>Shipping</span><span style={{color:shipping===0?'#4a7055':'#2a2a1e'}}>{shipping===0?'FREE':`₹${shipping}`}</span></div>
              <div style={s.divider}/>
              <div style={s.summaryTotal}>
                <span style={{fontSize:'0.85rem',textTransform:'uppercase',letterSpacing:'1px'}}>Total</span>
                <span style={s.totalAmt}>₹{total}</span>
              </div>
              <div style={s.couponRow}>
                <input style={s.couponInput} placeholder="Coupon code" value={coupon} onChange={e=>setCoupon(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applyCoupon()}/>
                <button style={s.couponBtn} onClick={applyCoupon}>Apply</button>
              </div>
              {couponMsg && <div style={{fontSize:'0.75rem',color:couponMsg.type==='success'?'#4a7055':'#c9503a',marginBottom:'0.5rem'}}>{couponMsg.text}</div>}
              <p style={{fontSize:'0.72rem',color:'#9a9a7a',marginBottom:'1rem'}}>
                Try: <span style={{color:'#4a7055',cursor:'pointer'}} onClick={()=>setCoupon('HAMPAR10')}>HAMPAR10</span> or <span style={{color:'#4a7055',cursor:'pointer'}} onClick={()=>setCoupon('SACRED')}>SACRED</span>
              </p>
              <button style={s.checkoutBtn} onClick={()=>window.location.href='/checkout'}>Proceed to Checkout →</button>
              <Link href="/" style={s.continueLink}>← Continue Shopping</Link>
              <p style={s.shipNote}>{shipping===0?'✓ Free shipping applied':`₹${299-subtotal} more for free shipping`}</p>
              <div style={s.trust}>
                {[['🔒','Secure'],['↩','Returns'],['✓','Verified']].map(([icon,label])=>(
                  <div key={label} style={s.trustItem}><span style={{display:'block',fontSize:16,marginBottom:4}}>{icon}</span>{label}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={s.suggestedSection}>
          <div style={s.suggestedTitle}>You may also like</div>
          <div style={s.suggestedGrid}>
            {SUGGESTED.filter(p=>!cart.find(c=>c.id===p.id)).slice(0,3).map(p=>(
              <div key={p.id} style={s.sugCard}>
                <div style={{...s.sugThumb,background:p.bg}}>
                  <svg width="28" height="38" viewBox="0 0 80 110" opacity="0.8">
                    <line x1="38" y1="5" x2="38" y2="90" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.4"/>
                    <circle cx="38" cy="5" r="4" fill="#c9a84c"/>
                    <ellipse cx="30" cy="65" rx="7" ry="10" fill="#c4889a" opacity="0.55"/>
                    <ellipse cx="46" cy="65" rx="7" ry="10" fill="#c4889a" opacity="0.55"/>
                  </svg>
                </div>
                <div style={{flex:1}}>
                  <div style={s.sugCat}>{p.category}</div>
                  <div style={s.sugName}>{p.name}</div>
                  <div style={s.sugFooter}>
                    <div style={s.sugPrice}>₹{p.price}</div>
                    <button style={s.sugBtn(added[p.id])} onClick={()=>addSuggested(p)}>{added[p.id]?'✓ Added':'+ Add'}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={s.footer}>
        <div style={s.footerLogo}>HAMPAR SPIRITUALS</div>
        <div style={s.footerCopy}>© 2024 Hampar Spirituals · Jhansi, UP</div>
      </footer>
    </div>
  )
}
