'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const EMAILJS_SERVICE_ID = 'service_fymj002'
const EMAILJS_TEMPLATE_ID = 'template_acekhg5'
const EMAILJS_PUBLIC_KEY = 'AzO_585k8-HYqo0gv'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [payMethod, setPayMethod] = useState('upi')
  const [upiId, setUpiId] = useState('')
  const [upiError, setUpiError] = useState('')
  const [placing, setPlacing] = useState(false)
  const [form, setForm] = useState({
    name:'', phone:'', email:'', address:'', city:'', state:'Uttar Pradesh', pincode:'', landmark:''
  })
  const [errors, setErrors] = useState({})
  const [orderId] = useState('HSP-' + Math.random().toString(36).substr(2,8).toUpperCase())

  const orderItems = [
    { name:'Lavender Serenity', category:'Agarbatti', price:40, qty:2, bg:'#ede8d8' },
    { name:'Sandalwood Sacred', category:'Dhupbatti', price:55, qty:1, bg:'#e4edd8' },
  ]
  const subtotal = orderItems.reduce((s,i) => s+i.price*i.qty, 0)
  const shipping = subtotal >= 299 ? 0 : 49
  const codFee = payMethod === 'cod' ? 20 : 0
  const total = subtotal + shipping + codFee

  // Load EmailJS
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.onload = () => window.emailjs.init(EMAILJS_PUBLIC_KEY)
    document.head.appendChild(script)
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter valid 10-digit mobile number'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter valid email'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = 'Enter valid 6-digit pincode'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validate()) setStep(2) }

  const sendEmail = async () => {
    const itemsList = orderItems.map(i => `${i.name} x${i.qty} = ₹${i.price*i.qty}`).join('\n')
    const templateParams = {
      order_id: orderId,
      customer_name: form.name,
      customer_phone: form.phone,
      customer_email: form.email,
      customer_address: form.address,
      customer_city: form.city,
      customer_state: form.state,
      customer_pincode: form.pincode,
      order_items: itemsList,
      subtotal: `₹${subtotal}`,
      shipping: shipping === 0 ? 'FREE' : `₹${shipping}`,
      total: `₹${total}`,
      payment_method: payMethod === 'upi' ? `UPI (${upiId})` : payMethod === 'cod' ? 'Cash on Delivery' : 'Net Banking',
      name: form.name,
      email: form.email,
    }
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      console.log('Order email sent!')
    } catch (err) {
      console.error('Email failed:', err)
    }
  }

  const handlePlaceOrder = async () => {
    if (payMethod === 'upi' && !upiId.match(/^[\w.\-]+@[\w]+$/)) {
      setUpiError('Enter a valid UPI ID (e.g. name@upi)')
      return
    }
    setUpiError('')
    setPlacing(true)
    await sendEmail()
    setTimeout(() => { setPlacing(false); setStep(3) }, 2000)
  }

  const s = {
    page: { fontFamily:"'DM Sans',sans-serif", background:'#f4f1eb', color:'#2a2a1e', minHeight:'100vh' },
    nav: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.9rem 2rem', background:'#f4f1eb', borderBottom:'1px solid #ddd8cc', position:'sticky', top:0, zIndex:100 },
    logoText: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', fontWeight:600, letterSpacing:3, color:'#4a7055', lineHeight:1 },
    logoSub: { fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'#7a9a80', marginTop:2 },
    progress: { background:'#edeae0', borderBottom:'1px solid #ddd8cc', padding:'1rem 2rem' },
    progressInner: { display:'flex', alignItems:'center', maxWidth:600, margin:'0 auto' },
    progDot: (active, done) => ({ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:600, background: done?'#4a7055':active?'#2a2a1e':'#ddd8cc', color: done||active?'#f4f1eb':'#9a9a7a', flexShrink:0 }),
    progLabel: (active, done) => ({ fontSize:'0.75rem', letterSpacing:'1px', textTransform:'uppercase', color: active||done?'#2a2a1e':'#9a9a7a', marginLeft:8 }),
    progLine: (done) => ({ flex:1, height:1, background: done?'#4a7055':'#ddd8cc', margin:'0 12px' }),
    layout: { display:'grid', gridTemplateColumns:'1fr 340px', gap:'2rem', maxWidth:1000, margin:'0 auto', padding:'2rem' },
    sectionTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', color:'#2a2a1e', marginBottom:'1.5rem', paddingBottom:'0.75rem', borderBottom:'1px solid #ddd8cc' },
    formGrid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' },
    formGroup: { marginBottom:'1rem' },
    label: { display:'block', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#7a9a80', marginBottom:6 },
    input: (err) => ({ width:'100%', padding:'11px 14px', background:'#f9f7f2', border:`1px solid ${err?'#e05a4a':'#ddd8cc'}`, borderRadius:2, fontSize:'0.85rem', fontFamily:"'DM Sans',sans-serif", outline:'none', color:'#2a2a1e', boxSizing:'border-box' }),
    select: { width:'100%', padding:'11px 14px', background:'#f9f7f2', border:'1px solid #ddd8cc', borderRadius:2, fontSize:'0.85rem', fontFamily:"'DM Sans',sans-serif", outline:'none', color:'#2a2a1e', boxSizing:'border-box' },
    errMsg: { fontSize:'0.72rem', color:'#e05a4a', marginTop:4 },
    payCard: (active) => ({ border:`1px solid ${active?'#4a7055':'#ddd8cc'}`, borderRadius:4, padding:'1rem 1.25rem', cursor:'pointer', background:active?'rgba(74,112,85,0.04)':'#f9f7f2', display:'flex', alignItems:'center', gap:12, marginBottom:'0.75rem' }),
    payRadio: (active) => ({ width:18, height:18, borderRadius:'50%', border:`2px solid ${active?'#4a7055':'#ddd8cc'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }),
    payDot: { width:8, height:8, borderRadius:'50%', background:'#4a7055' },
    payName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:'#2a2a1e' },
    payNote: { fontSize:'0.75rem', color:'#7a9a80', marginTop:2 },
    upiInput: (err) => ({ width:'100%', padding:'11px 14px', background:'#f9f7f2', border:`1px solid ${err?'#e05a4a':'#ddd8cc'}`, borderRadius:2, fontSize:'0.85rem', fontFamily:"'DM Sans',sans-serif", outline:'none', color:'#2a2a1e', boxSizing:'border-box', marginTop:8 }),
    upiApps: { display:'flex', gap:8, marginTop:10, flexWrap:'wrap' },
    upiApp: { fontSize:'8px', letterSpacing:'1px', textTransform:'uppercase', padding:'5px 12px', border:'1px solid #ddd8cc', borderRadius:20, color:'#6a6a52', cursor:'pointer', background:'#f4f1eb' },
    btnPrimary: (loading) => ({ width:'100%', background: loading?'#7a9a80':'#4a7055', color:'#f4f1eb', fontSize:'0.8rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:14, border:'none', borderRadius:2, cursor: loading?'not-allowed':'pointer', fontFamily:"'DM Sans',sans-serif", marginBottom:8 }),
    btnBack: { width:'100%', background:'transparent', color:'#6a6a52', fontSize:'0.75rem', letterSpacing:'1px', textTransform:'uppercase', padding:10, border:'1px solid #ddd8cc', borderRadius:2, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" },
    summary: { background:'#edeae0', border:'1px solid #ddd8cc', borderRadius:4, padding:'1.5rem', position:'sticky', top:80 },
    sumTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', marginBottom:'1.25rem', paddingBottom:'0.75rem', borderBottom:'1px solid #ddd8cc' },
    sumItem: { display:'flex', gap:10, marginBottom:'0.9rem', alignItems:'center' },
    sumThumb: { width:48, height:48, borderRadius:3, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #ddd8cc', flexShrink:0 },
    sumItemName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'0.92rem', color:'#2a2a1e' },
    sumItemMeta: { fontSize:'0.72rem', color:'#7a9a80', marginTop:2 },
    sumItemPrice: { marginLeft:'auto', fontSize:'0.88rem', fontWeight:500, color:'#4a7055' },
    sumDiv: { borderTop:'1px solid #ddd8cc', margin:'1rem 0' },
    sumRow: { display:'flex', justifyContent:'space-between', fontSize:'0.8rem', color:'#6a6a52', marginBottom:'0.5rem' },
    sumTotal: { display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'0.75rem' },
    totalAmt: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', fontWeight:500, color:'#4a7055' },
    successPage: { minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'4rem 2rem', textAlign:'center' },
    successIcon: { fontSize:56, marginBottom:'1.5rem' },
    successH1: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2.5rem', fontWeight:400, color:'#2a2a1e', marginBottom:'0.75rem' },
    successP: { fontSize:'0.88rem', color:'#6a6a52', lineHeight:1.85, maxWidth:440, margin:'0 auto 2rem' },
    orderCard: { background:'#edeae0', border:'1px solid #ddd8cc', borderRadius:4, padding:'1.5rem 2rem', maxWidth:420, width:'100%', margin:'0 auto 2rem', textAlign:'left' },
    orderRow: { display:'flex', justifyContent:'space-between', fontSize:'0.82rem', padding:'6px 0', borderBottom:'1px solid #ddd8cc', color:'#6a6a52' },
    orderVal: { color:'#2a2a1e', fontWeight:500 },
    successBtns: { display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' },
    successBtn: { background:'#4a7055', color:'#f4f1eb', fontSize:'0.75rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'12px 28px', border:'none', borderRadius:2, cursor:'pointer', textDecoration:'none' },
    successBtnGhost: { background:'transparent', color:'#2a2a1e', fontSize:'0.75rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'12px 28px', border:'1px solid #2a2a1e', borderRadius:2, textDecoration:'none' },
    footer: { background:'#1e1e14', padding:'1.75rem 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginTop:'2rem' },
    footerLogo: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', letterSpacing:3, color:'#7a9a80' },
    footerCopy: { fontSize:'0.72rem', color:'#3a3a24' },
  }

  const NavBar = () => (
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
        <div>
          <div style={s.logoText}>HAMPAR</div>
          <div style={s.logoSub}>Spirituals</div>
        </div>
      </Link>
      <div style={{fontSize:'0.78rem',color:'#7a9a80',letterSpacing:'1px'}}>🔒 Secure Checkout</div>
      <Link href="/cart" style={{fontSize:'0.75rem',letterSpacing:'1px',textTransform:'uppercase',color:'#6a6a52',textDecoration:'none'}}>← Back to Cart</Link>
    </nav>
  )

  // SUCCESS PAGE
  if (step === 3) return (
    <div style={s.page}>
      <NavBar/>
      <div style={s.successPage}>
        <div style={s.successIcon}>🙏</div>
        <h1 style={s.successH1}>Order Placed Successfully!</h1>
        <p style={s.successP}>
          Thank you, <strong>{form.name}</strong>! Your order has been received and a confirmation email has been sent to <strong>{form.email}</strong>. We will dispatch within 2 business days from Jhansi.
        </p>
        <div style={s.orderCard}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1rem',marginBottom:'0.75rem',color:'#2a2a1e'}}>Order Details</div>
          {[
            ['Order ID', orderId],
            ['Items', `${orderItems.reduce((s,i)=>s+i.qty,0)} items`],
            ['Total', `₹${total}`],
            ['Payment', payMethod==='upi'?'UPI':payMethod==='cod'?'Cash on Delivery':'Net Banking'],
            ['Delivery', `${form.city}, ${form.state}`],
            ['Expected', '3–5 business days'],
            ['Email Sent', '✓ Confirmation sent'],
          ].map(([k,v]) => (
            <div key={k} style={s.orderRow}><span>{k}</span><span style={s.orderVal}>{v}</span></div>
          ))}
        </div>
        <div style={s.successBtns}>
          <Link href="/" style={s.successBtn}>Continue Shopping</Link>
          <Link href="/purity" style={s.successBtnGhost}>Learn About Purity</Link>
        </div>
      </div>
      <footer style={s.footer}>
        <div style={s.footerLogo}>HAMPAR SPIRITUALS</div>
        <div style={s.footerCopy}>© 2024 Hampar Spirituals · Jhansi, UP</div>
      </footer>
    </div>
  )

  return (
    <div style={s.page}>
      <NavBar/>

      {/* PROGRESS */}
      <div style={s.progress}>
        <div style={s.progressInner}>
          {[['1','Address'],['2','Payment'],['3','Confirm']].map(([n,l],i) => (
            <div key={n} style={{display:'flex',alignItems:'center',flex:i<2?1:'auto'}}>
              <div style={s.progDot(step===i+1, step>i+1)}>{step>i+1?'✓':n}</div>
              <span style={s.progLabel(step===i+1, step>i+1)}>{l}</span>
              {i < 2 && <div style={s.progLine(step>i+1)}/>}
            </div>
          ))}
        </div>
      </div>

      <div style={s.layout}>
        <div>
          {/* STEP 1 — ADDRESS */}
          {step === 1 && <>
            <div style={s.sectionTitle}>Delivery Address</div>
            <div style={s.formGrid2}>
              <div>
                <label style={s.label}>Full Name *</label>
                <input style={s.input(errors.name)} placeholder="Manish Kumar" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                {errors.name && <div style={s.errMsg}>{errors.name}</div>}
              </div>
              <div>
                <label style={s.label}>Mobile Number *</label>
                <input style={s.input(errors.phone)} placeholder="9876543210" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                {errors.phone && <div style={s.errMsg}>{errors.phone}</div>}
              </div>
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Email Address *</label>
              <input style={s.input(errors.email)} placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              {errors.email && <div style={s.errMsg}>{errors.email}</div>}
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Full Address *</label>
              <input style={s.input(errors.address)} placeholder="House no, Street, Area" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
              {errors.address && <div style={s.errMsg}>{errors.address}</div>}
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Landmark (Optional)</label>
              <input style={s.input(false)} placeholder="Near temple, Behind school..." value={form.landmark} onChange={e=>setForm({...form,landmark:e.target.value})}/>
            </div>
            <div style={s.formGrid2}>
              <div>
                <label style={s.label}>City *</label>
                <input style={s.input(errors.city)} placeholder="Jhansi" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
                {errors.city && <div style={s.errMsg}>{errors.city}</div>}
              </div>
              <div>
                <label style={s.label}>Pincode *</label>
                <input style={s.input(errors.pincode)} placeholder="284001" value={form.pincode} onChange={e=>setForm({...form,pincode:e.target.value})}/>
                {errors.pincode && <div style={s.errMsg}>{errors.pincode}</div>}
              </div>
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>State</label>
              <select style={s.select} value={form.state} onChange={e=>setForm({...form,state:e.target.value})}>
                {['Uttar Pradesh','Delhi','Maharashtra','Rajasthan','Madhya Pradesh','Gujarat','Bihar','West Bengal','Karnataka','Tamil Nadu','Other'].map(st=><option key={st}>{st}</option>)}
              </select>
            </div>
            <button style={s.btnPrimary(false)} onClick={handleNext}>Continue to Payment →</button>
            <Link href="/cart" style={{display:'block',textAlign:'center',textDecoration:'none',marginTop:8,fontSize:'0.75rem',letterSpacing:'1px',textTransform:'uppercase',color:'#6a6a52',padding:10,border:'1px solid #ddd8cc',borderRadius:2}}>← Back to Cart</Link>
          </>}

          {/* STEP 2 — PAYMENT */}
          {step === 2 && <>
            <div style={s.sectionTitle}>Choose Payment Method</div>

            {[
              {id:'upi', icon:'📱', name:'UPI Payment', note:'Google Pay, PhonePe, Paytm, BHIM UPI'},
              {id:'cod', icon:'💵', name:'Cash on Delivery', note:'Pay when your order arrives — ₹20 COD fee'},
              {id:'netbanking', icon:'🏦', name:'Net Banking', note:'All major Indian banks supported'},
            ].map(m => (
              <div key={m.id} style={s.payCard(payMethod===m.id)} onClick={()=>setPayMethod(m.id)}>
                <div style={s.payRadio(payMethod===m.id)}>{payMethod===m.id && <div style={s.payDot}/>}</div>
                <span style={{fontSize:22}}>{m.icon}</span>
                <div><div style={s.payName}>{m.name}</div><div style={s.payNote}>{m.note}</div></div>
              </div>
            ))}

            {payMethod==='upi' && (
              <div style={{marginBottom:'1.5rem',padding:'1.25rem',background:'#edeae0',borderRadius:4,border:'1px solid #ddd8cc'}}>
                <label style={s.label}>Your UPI ID</label>
                <input style={s.upiInput(upiError)} placeholder="yourname@upi" value={upiId} onChange={e=>setUpiId(e.target.value)}/>
                {upiError && <div style={s.errMsg}>{upiError}</div>}
                <div style={s.upiApps}>
                  {['GPay','PhonePe','Paytm','BHIM'].map(app=><div key={app} style={s.upiApp}>{app}</div>)}
                </div>
              </div>
            )}

            {payMethod==='cod' && (
              <div style={{marginBottom:'1.5rem',padding:'1.25rem',background:'#fff9ec',borderRadius:4,border:'1px solid #e8d8a0'}}>
                <div style={{fontSize:'0.82rem',color:'#6a5a2a',lineHeight:1.8}}>
                  💡 <strong>COD Note:</strong> An additional ₹20 fee applies. Please keep exact change ready.
                </div>
              </div>
            )}

            {payMethod==='netbanking' && (
              <div style={{marginBottom:'1.5rem',padding:'1.25rem',background:'#edeae0',borderRadius:4,border:'1px solid #ddd8cc'}}>
                <label style={s.label}>Select Your Bank</label>
                <select style={{...s.select,marginTop:6}}>
                  {['SBI','HDFC Bank','ICICI Bank','Axis Bank','Punjab National Bank','Bank of Baroda','Other Bank'].map(b=><option key={b}>{b}</option>)}
                </select>
              </div>
            )}

            <div style={{padding:'1rem 1.25rem',background:'#f0f5f0',border:'1px solid rgba(74,112,85,0.2)',borderRadius:4,marginBottom:'1.5rem'}}>
              <div style={{fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'#4a7055',marginBottom:'0.5rem'}}>Delivering To</div>
              <div style={{fontSize:'0.85rem',color:'#2a2a1e'}}>{form.name} · {form.phone}</div>
              <div style={{fontSize:'0.82rem',color:'#6a6a52'}}>{form.address}, {form.city}, {form.state} — {form.pincode}</div>
              <button onClick={()=>setStep(1)} style={{background:'none',border:'none',color:'#4a7055',fontSize:'0.75rem',cursor:'pointer',textDecoration:'underline',marginTop:4,padding:0,fontFamily:"'DM Sans',sans-serif"}}>Edit Address</button>
            </div>

            <button style={s.btnPrimary(placing)} onClick={handlePlaceOrder} disabled={placing}>
              {placing ? '⏳ Placing Order & Sending Email...' : `Place Order — ₹${total} →`}
            </button>
            <button style={s.btnBack} onClick={()=>setStep(1)}>← Back to Address</button>
          </>}
        </div>

        {/* ORDER SUMMARY */}
        <div style={s.summary}>
          <div style={s.sumTitle}>Order Summary</div>
          {orderItems.map((item,i) => (
            <div key={i} style={s.sumItem}>
              <div style={{...s.sumThumb,background:item.bg}}>
                <svg width="28" height="38" viewBox="0 0 80 110" opacity="0.8">
                  <line x1="38" y1="5" x2="38" y2="90" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.4"/>
                  <circle cx="38" cy="5" r="4" fill="#c9a84c"/>
                  <ellipse cx="30" cy="65" rx="7" ry="10" fill="#c4889a" opacity="0.55"/>
                  <ellipse cx="46" cy="65" rx="7" ry="10" fill="#c4889a" opacity="0.55"/>
                </svg>
              </div>
              <div style={{flex:1}}>
                <div style={s.sumItemName}>{item.name}</div>
                <div style={s.sumItemMeta}>{item.category} · Qty {item.qty}</div>
              </div>
              <div style={s.sumItemPrice}>₹{item.price*item.qty}</div>
            </div>
          ))}
          <div style={s.sumDiv}/>
          <div style={s.sumRow}><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div style={s.sumRow}><span>Shipping</span><span style={{color:shipping===0?'#4a7055':'#2a2a1e'}}>{shipping===0?'FREE':`₹${shipping}`}</span></div>
          {payMethod==='cod' && <div style={s.sumRow}><span>COD Fee</span><span>₹20</span></div>}
          <div style={s.sumDiv}/>
          <div style={s.sumTotal}>
            <span style={{fontSize:'0.85rem',textTransform:'uppercase',letterSpacing:'1px'}}>Total</span>
            <span style={s.totalAmt}>₹{total}</span>
          </div>
          <div style={{marginTop:'1.25rem',padding:'0.75rem',background:'rgba(74,112,85,0.06)',borderRadius:3,border:'1px solid rgba(74,112,85,0.15)'}}>
            <div style={{fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'#4a7055',marginBottom:6}}>Your Order Is</div>
            {['100% Natural & Charcoal-Free','QR Purity Verified','Handcrafted in Jhansi','📧 Email confirmation on order'].map(t=>(
              <div key={t} style={{fontSize:'0.74rem',color:'#4a3d2c',padding:'2px 0',display:'flex',gap:6}}><span style={{color:'#4a7055'}}>✓</span>{t}</div>
            ))}
          </div>
        </div>
      </div>

      <footer style={s.footer}>
        <div style={s.footerLogo}>HAMPAR SPIRITUALS</div>
        <div style={s.footerCopy}>🔒 Secure · © 2024 Hampar Spirituals</div>
      </footer>
    </div>
  )
}