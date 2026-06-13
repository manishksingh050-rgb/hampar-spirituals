'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const ADMIN_PASSWORD = 'hampar2024'

// ── SHEET URLs (replace with your actual published CSV URLs) ──
const SHEETS = {
  products: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSivhbpd6RNc5YPFqTXVVJ0dBlFS_aIn76yxR_oj_sFkXQVEVNFYaWnCzenJX3_QxmfC2hSfJzfX_Y7/pub?gid=733134948&single=true&output=csv',
  orders:   'https://docs.google.com/spreadsheets/d/e/2PACX-1vSivhbpd6RNc5YPFqTXVVJ0dBlFS_aIn76yxR_oj_sFkXQVEVNFYaWnCzenJX3_QxmfC2hSfJzfX_Y7/pub?gid=0&single=true&output=csv',
}

function parseCSV(text) {
  const lines = text.trim().split('\n').filter(l => l.trim())
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  return lines.slice(1).map(line => {
    const values = []
    let cur = '', inQ = false
    for (let c of line) {
      if (c === '"') inQ = !inQ
      else if (c === ',' && !inQ) { values.push(cur.trim()); cur = '' }
      else cur += c
    }
    values.push(cur.trim())
    const obj = {}
    headers.forEach((h, i) => obj[h] = values[i] || '')
    return obj
  })
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [passError, setPassError] = useState(false)
  const [tab, setTab] = useState('dashboard')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')
  const [siteSettings, setSiteSettings] = useState({
    announcement: 'Free shipping on orders above ₹299!',
    whatsapp: '9876543210',
    upiId: 'hampar@upi',
    freeShipThreshold: '299',
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const a = sessionStorage.getItem('hampar_admin')
      if (a === 'true') setAuthed(true)
    }
  }, [])

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem('hampar_admin', 'true')
    } else {
      setPassError(true)
      setTimeout(() => setPassError(false), 2000)
    }
  }

  const logout = () => {
    setAuthed(false)
    sessionStorage.removeItem('hampar_admin')
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const loadData = async (type) => {
    setLoading(true)
    try {
      const res = await fetch(SHEETS[type] || SHEETS.products)
      const text = await res.text()
      const data = parseCSV(text)
      if (type === 'products') setProducts(data)
      else setOrders(data)
      showToast(`✓ ${type} loaded from Google Sheets`)
    } catch (e) {
      showToast('⚠ Could not load from Sheets — check URL')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (authed) {
      loadData('products')
    }
  }, [authed])

  const s = {
    page: { fontFamily:"'DM Sans',sans-serif", background:'#f0f2f5', minHeight:'100vh', color:'#1a1a2e' },
    // Login
    loginWrap: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f4f1eb' },
    loginCard: { background:'#fff', border:'1px solid #ddd8cc', borderRadius:8, padding:'2.5rem', width:360, textAlign:'center' },
    loginLogo: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', color:'#4a7055', letterSpacing:3, marginBottom:4 },
    loginSub: { fontSize:'0.78rem', color:'#7a9a80', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'2rem' },
    loginInput: { width:'100%', padding:'11px 14px', border:`1px solid ${passError?'#e05a4a':'#ddd8cc'}`, borderRadius:4, fontSize:'0.9rem', outline:'none', marginBottom:'0.75rem', boxSizing:'border-box', textAlign:'center', letterSpacing:4, fontFamily:"'DM Sans',sans-serif" },
    loginBtn: { width:'100%', background:'#4a7055', color:'#fff', border:'none', padding:'12px', borderRadius:4, fontSize:'0.85rem', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", letterSpacing:'1px', textTransform:'uppercase' },
    loginErr: { fontSize:'0.78rem', color:'#e05a4a', marginBottom:'0.75rem' },
    // Layout
    sidebar: { width:220, background:'#1a2a1e', minHeight:'100vh', position:'fixed', top:0, left:0, padding:'1.5rem 0' },
    sidebarLogo: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', color:'#a8c89a', letterSpacing:2, padding:'0 1.25rem', marginBottom:'0.25rem' },
    sidebarSub: { fontSize:'9px', color:'#5a7a5a', letterSpacing:'2px', textTransform:'uppercase', padding:'0 1.25rem', marginBottom:'1.5rem' },
    sidebarItem: (active) => ({ display:'flex', alignItems:'center', gap:10, padding:'0.65rem 1.25rem', fontSize:'0.82rem', color:active?'#f4f1eb':'#7a9a80', background:active?'rgba(255,255,255,0.08)':'transparent', cursor:'pointer', borderLeft:active?'3px solid #a8c89a':'3px solid transparent', transition:'all 0.15s', textDecoration:'none' }),
    main: { marginLeft:220, padding:'1.5rem' },
    topbar: { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem' },
    topTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.6rem', color:'#1a2a1e' },
    logoutBtn: { background:'transparent', border:'1px solid #ddd8cc', color:'#6a6a52', fontSize:'0.75rem', padding:'7px 14px', borderRadius:4, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" },
    // Cards
    statsGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' },
    statCard: (color) => ({ background:'#fff', borderRadius:8, padding:'1.25rem', borderLeft:`4px solid ${color}` }),
    statNum: { fontSize:'1.8rem', fontWeight:600, color:'#1a2a1e', fontFamily:"'Cormorant Garamond',serif" },
    statLabel: { fontSize:'0.75rem', color:'#6a6a52', textTransform:'uppercase', letterSpacing:'1px', marginTop:2 },
    // Tables
    card: { background:'#fff', borderRadius:8, padding:'1.25rem', marginBottom:'1rem', border:'1px solid #e8e4dc' },
    cardTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', color:'#1a2a1e', marginBottom:'1rem', paddingBottom:'0.75rem', borderBottom:'1px solid #f0ece4', display:'flex', alignItems:'center', justifyContent:'space-between' },
    table: { width:'100%', borderCollapse:'collapse', fontSize:'0.82rem' },
    th: { textAlign:'left', padding:'8px 12px', background:'#f8f6f0', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#7a9a80', borderBottom:'1px solid #e8e4dc' },
    td: { padding:'10px 12px', borderBottom:'1px solid #f0ece4', color:'#2a2a1e', verticalAlign:'top' },
    badge: (color) => ({ display:'inline-block', fontSize:'10px', padding:'2px 8px', borderRadius:20, background:color+'20', color, fontWeight:500 }),
    reloadBtn: { background:'#4a7055', color:'#fff', border:'none', padding:'6px 14px', borderRadius:4, fontSize:'0.75rem', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" },
    // Settings
    settingRow: { marginBottom:'1rem' },
    settingLabel: { display:'block', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#7a9a80', marginBottom:6 },
    settingInput: { width:'100%', padding:'10px 14px', border:'1px solid #e8e4dc', borderRadius:4, fontSize:'0.85rem', fontFamily:"'DM Sans',sans-serif", outline:'none', color:'#1a2a1e', boxSizing:'border-box' },
    saveBtn: { background:'#4a7055', color:'#fff', border:'none', padding:'10px 24px', borderRadius:4, fontSize:'0.8rem', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", letterSpacing:'1px', textTransform:'uppercase', marginTop:'0.5rem' },
    // Toast
    toast: (v) => ({ position:'fixed', bottom:24, right:24, background:'#1a2a1e', color:'#f4f1eb', padding:'12px 18px', borderRadius:6, fontSize:'0.82rem', opacity:v?1:0, transform:v?'translateY(0)':'translateY(8px)', transition:'all 0.3s', zIndex:999, pointerEvents:'none', borderLeft:'3px solid #4a7055' }),
  }

  // LOGIN SCREEN
  if (!authed) return (
    <div style={s.loginWrap}>
      <div style={s.loginCard}>
        <div style={s.loginLogo}>HAMPAR</div>
        <div style={s.loginSub}>Admin Panel</div>
        <input
          style={s.loginInput}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
        />
        {passError && <div style={s.loginErr}>Wrong password. Try again.</div>}
        <button style={s.loginBtn} onClick={login}>Login →</button>
        <div style={{marginTop:'1.5rem',fontSize:'0.72rem',color:'#9a9a7a'}}>
          Password hint: hampar + year
        </div>
      </div>
    </div>
  )

  const navItems = [
    { id:'dashboard', icon:'📊', label:'Dashboard' },
    { id:'products', icon:'📦', label:'Products' },
    { id:'orders', icon:'🛍', label:'Orders' },
    { id:'charity', icon:'💚', label:'Charity' },
    { id:'settings', icon:'⚙️', label:'Site Settings' },
    { id:'sheets', icon:'📋', label:'Sheets Guide' },
  ]

  return (
    <div style={s.page}>
      {/* SIDEBAR */}
      <div style={s.sidebar}>
        <div style={s.sidebarLogo}>HAMPAR</div>
        <div style={s.sidebarSub}>Admin Panel</div>
        {navItems.map(item => (
          <div key={item.id} style={s.sidebarItem(tab===item.id)} onClick={() => {
            setTab(item.id)
            if (item.id === 'products') loadData('products')
            if (item.id === 'orders') loadData('orders')
          }}>
            <span>{item.icon}</span>{item.label}
          </div>
        ))}
        <div style={{position:'absolute',bottom:'1rem',left:0,right:0,padding:'0 1.25rem'}}>
          <Link href="/" style={{...s.sidebarItem(false), borderLeft:'none', fontSize:'0.75rem'}}>← View Site</Link>
          <div style={{...s.sidebarItem(false), borderLeft:'none', fontSize:'0.75rem', cursor:'pointer'}} onClick={logout}>🚪 Logout</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={s.main}>
        <div style={s.topbar}>
          <div style={s.topTitle}>{navItems.find(n=>n.id===tab)?.icon} {navItems.find(n=>n.id===tab)?.label}</div>
          <button style={s.logoutBtn} onClick={logout}>Logout</button>
        </div>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <>
            <div style={s.statsGrid}>
              {[
                { num: products.length, label:'Total Products', color:'#4a7055' },
                { num: orders.length || '—', label:'Total Orders', color:'#c9a84c' },
                { num: products.filter(p=>p.inStock!=='false').length, label:'In Stock', color:'#185FA5' },
                { num: '₹40', label:'Starting Price', color:'#993C1D' },
              ].map((s2,i) => (
                <div key={i} style={s.statCard(s2.color)}>
                  <div style={s.statNum}>{s2.num}</div>
                  <div style={s.statLabel}>{s2.label}</div>
                </div>
              ))}
            </div>
            <div style={s.card}>
              <div style={s.cardTitle}>Quick Actions</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
                {[
                  { icon:'📦', title:'Edit Products', desc:'Update prices, names, descriptions in Google Sheets', action:()=>setTab('products') },
                  { icon:'🛍', title:'View Orders', desc:'See all customer orders from Google Sheets', action:()=>setTab('orders') },
                  { icon:'⚙️', title:'Site Settings', desc:'Change UPI ID, WhatsApp, announcement bar', action:()=>setTab('settings') },
                  { icon:'💚', title:'Charity Causes', desc:'Update donation targets in Google Sheets', action:()=>setTab('charity') },
                  { icon:'🌐', title:'View Live Site', desc:'Open hampar-spirituals.vercel.app', action:()=>window.open('https://hampar-spirituals.vercel.app','_blank') },
                  { icon:'📋', title:'Open Sheets', desc:'Edit products directly in Google Sheets', action:()=>window.open('https://docs.google.com/spreadsheets/d/1d4nT5kg6pEiQPeFsPk4cEQQgfXQJnBbLS7V03uWLTD4','_blank') },
                ].map((item,i) => (
                  <div key={i} onClick={item.action} style={{background:'#f8f6f0',border:'1px solid #e8e4dc',borderRadius:6,padding:'1.25rem',cursor:'pointer'}}>
                    <div style={{fontSize:24,marginBottom:'0.5rem'}}>{item.icon}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1rem',color:'#1a2a1e',marginBottom:4}}>{item.title}</div>
                    <div style={{fontSize:'0.75rem',color:'#6a6a52',lineHeight:1.6}}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={s.card}>
              <div style={s.cardTitle}>How Google Sheets Admin Works</div>
              <div style={{fontSize:'0.85rem',color:'#4a3d2c',lineHeight:1.9}}>
                <p>Your website reads data from Google Sheets. To update anything:</p>
                <ol style={{paddingLeft:'1.25rem',marginTop:'0.75rem'}}>
                  <li>Open your Google Sheet (link above)</li>
                  <li>Edit any cell — price, name, description, stock</li>
                  <li>Site auto-updates within 60 seconds</li>
                  <li>No code changes needed</li>
                </ol>
                <div style={{marginTop:'1rem',padding:'0.75rem 1rem',background:'#f0f5f0',borderRadius:4,border:'1px solid rgba(74,112,85,0.2)'}}>
                  💡 <strong>Tip:</strong> Set <code>inStock = false</code> in the sheet to hide a product instantly from the site.
                </div>
              </div>
            </div>
          </>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div style={s.card}>
            <div style={s.cardTitle}>
              <span>Products ({products.length})</span>
              <div style={{display:'flex',gap:8}}>
                <button style={s.reloadBtn} onClick={()=>loadData('products')}>{loading?'Loading...':'↻ Reload'}</button>
                <button style={{...s.reloadBtn,background:'#185FA5'}} onClick={()=>window.open('https://docs.google.com/spreadsheets/d/1d4nT5kg6pEiQPeFsPk4cEQQgfXQJnBbLS7V03uWLTD4','_blank')}>Edit in Sheets ↗</button>
              </div>
            </div>
            {products.length === 0 ? (
              <div style={{textAlign:'center',padding:'3rem',color:'#7a9a80'}}>
                <div style={{fontSize:40,marginBottom:'0.75rem'}}>📦</div>
                <p>No products loaded yet.</p>
                <button style={{...s.reloadBtn,marginTop:'1rem'}} onClick={()=>loadData('products')}>Load from Sheets</button>
              </div>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>{['ID','Name','Category','Type','Price','Badge','In Stock'].map(h=><th key={h} style={s.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {products.map((p,i) => (
                    <tr key={i}>
                      <td style={s.td}>{p.id}</td>
                      <td style={{...s.td,fontFamily:"'Cormorant Garamond',serif",fontSize:'1rem'}}>{p.name}</td>
                      <td style={s.td}>{p.category}</td>
                      <td style={s.td}><span style={s.badge(p.type==='agarbatti'?'#4a7055':'#c9a84c')}>{p.type}</span></td>
                      <td style={{...s.td,fontWeight:500,color:'#4a7055'}}>₹{p.price}</td>
                      <td style={s.td}>{p.badge && <span style={s.badge('#185FA5')}>{p.badge}</span>}</td>
                      <td style={s.td}><span style={s.badge(p.inStock==='false'?'#e05a4a':'#4a7055')}>{p.inStock==='false'?'Out of Stock':'In Stock'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div style={{marginTop:'1rem',padding:'0.75rem 1rem',background:'#f0f5f0',borderRadius:4,fontSize:'0.8rem',color:'#4a3d2c'}}>
              ✏️ To edit products → click <strong>"Edit in Sheets"</strong> → change any value → site updates in 60 seconds
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div style={s.card}>
            <div style={s.cardTitle}>
              <span>Orders</span>
              <div style={{display:'flex',gap:8}}>
                <button style={s.reloadBtn} onClick={()=>loadData('orders')}>{loading?'Loading...':'↻ Reload'}</button>
              </div>
            </div>
            <div style={{padding:'2rem',textAlign:'center',color:'#6a6a52'}}>
              <div style={{fontSize:40,marginBottom:'1rem'}}>📧</div>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.2rem',marginBottom:'0.75rem',color:'#1a2a1e'}}>Orders come via Email</h3>
              <p style={{fontSize:'0.85rem',lineHeight:1.8,maxWidth:460,margin:'0 auto 1.5rem'}}>
                Every order placed on the website sends an email to <strong>manishksingh050@gmail.com</strong> via EmailJS. Check your Gmail inbox for all orders.
              </p>
              <div style={{background:'#f8f6f0',border:'1px solid #e8e4dc',borderRadius:6,padding:'1.25rem',textAlign:'left',maxWidth:460,margin:'0 auto'}}>
                <div style={{fontSize:'0.8rem',color:'#4a3d2c',lineHeight:1.8}}>
                  <strong>To track orders in Sheets:</strong><br/>
                  1. Create an "Orders" tab in your Google Sheet<br/>
                  2. Add columns: Order ID, Name, Phone, Email, Items, Total, Date<br/>
                  3. Manually add orders from your email<br/>
                  <br/>
                  <strong>Or upgrade to Google Forms:</strong><br/>
                  Connect Google Forms to Sheets to auto-log orders.
                </div>
              </div>
              <button style={{...s.reloadBtn,marginTop:'1.5rem',padding:'10px 24px'}} onClick={()=>window.open('https://mail.google.com','_blank')}>Open Gmail ↗</button>
            </div>
          </div>
        )}

        {/* CHARITY */}
        {tab === 'charity' && (
          <div style={s.card}>
            <div style={s.cardTitle}>
              <span>Charity Causes</span>
              <button style={{...s.reloadBtn,background:'#185FA5'}} onClick={()=>window.open('https://docs.google.com/spreadsheets/d/1d4nT5kg6pEiQPeFsPk4cEQQgfXQJnBbLS7V03uWLTD4','_blank')}>Edit in Sheets ↗</button>
            </div>
            <div style={{fontSize:'0.85rem',color:'#4a3d2c',lineHeight:1.9,marginBottom:'1.25rem'}}>
              To update charity causes, add a <strong>"Charity"</strong> tab in your Google Sheet with these columns:
            </div>
            <table style={s.table}>
              <thead><tr>{['Column','Example Value','What it does'].map(h=><th key={h} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>
                {[
                  ['id','1','Unique ID'],
                  ['title','Feed an Orphan','Cause title'],
                  ['description','Every ₹40 feeds...','Cause description'],
                  ['goal','50000','Target amount ₹'],
                  ['raised','32400','Amount raised so far ₹'],
                  ['minAmount','40','Minimum donation ₹'],
                  ['tag','Nutrition','Category tag'],
                  ['active','true','Show/hide cause'],
                ].map(([col,ex,desc],i) => (
                  <tr key={i}>
                    <td style={{...s.td,fontFamily:'monospace',color:'#185FA5'}}>{col}</td>
                    <td style={s.td}>{ex}</td>
                    <td style={{...s.td,color:'#6a6a52'}}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:'1rem',padding:'0.75rem 1rem',background:'#f0f5f0',borderRadius:4,fontSize:'0.8rem',color:'#4a3d2c'}}>
              💡 Update <strong>raised</strong> column regularly to show real progress to donors
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'settings' && (
          <>
            <div style={s.card}>
              <div style={s.cardTitle}>Site Settings</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}}>
                {[
                  { key:'announcement', label:'Announcement Bar Text', placeholder:'Free shipping on orders above ₹299!' },
                  { key:'whatsapp', label:'WhatsApp Number', placeholder:'9876543210' },
                  { key:'upiId', label:'UPI ID for Payments', placeholder:'hampar@upi' },
                  { key:'freeShipThreshold', label:'Free Shipping Above (₹)', placeholder:'299' },
                ].map(field => (
                  <div key={field.key} style={s.settingRow}>
                    <label style={s.settingLabel}>{field.label}</label>
                    <input
                      style={s.settingInput}
                      placeholder={field.placeholder}
                      value={siteSettings[field.key]}
                      onChange={e => setSiteSettings({...siteSettings,[field.key]:e.target.value})}
                    />
                  </div>
                ))}
              </div>
              <button style={s.saveBtn} onClick={()=>showToast('✓ Settings saved! Update these values in your code files too.')}>Save Settings</button>
              <div style={{marginTop:'1rem',padding:'0.75rem 1rem',background:'#fff9ec',borderRadius:4,fontSize:'0.8rem',color:'#6a5a2a',border:'1px solid #e8d8a0'}}>
                ⚠️ Currently settings are stored locally. To make them live, update the corresponding values in your code and redeploy via <code>git push</code>.
              </div>
            </div>

            <div style={s.card}>
              <div style={s.cardTitle}>Quick Links</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
                {[
                  { label:'Google Sheet', url:'https://docs.google.com/spreadsheets/d/1d4nT5kg6pEiQPeFsPk4cEQQgfXQJnBbLS7V03uWLTD4', icon:'📊' },
                  { label:'Vercel Dashboard', url:'https://vercel.com/dashboard', icon:'🚀' },
                  { label:'EmailJS Dashboard', url:'https://dashboard.emailjs.com', icon:'📧' },
                  { label:'Live Website', url:'https://hampar-spirituals.vercel.app', icon:'🌐' },
                  { label:'GitHub Repo', url:'https://github.com/manishksingh050-rgb/hampar-spirituals', icon:'💻' },
                  { label:'Gmail Orders', url:'https://mail.google.com', icon:'📬' },
                ].map((link,i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" style={{background:'#f8f6f0',border:'1px solid #e8e4dc',borderRadius:6,padding:'1rem',textDecoration:'none',display:'flex',alignItems:'center',gap:10}}>
                    <span style={{fontSize:20}}>{link.icon}</span>
                    <span style={{fontSize:'0.82rem',color:'#1a2a1e',fontWeight:500}}>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SHEETS GUIDE */}
        {tab === 'sheets' && (
          <div style={s.card}>
            <div style={s.cardTitle}>Google Sheets Setup Guide</div>
            <div style={{fontSize:'0.85rem',color:'#4a3d2c',lineHeight:1.9}}>
              <p style={{marginBottom:'1.25rem'}}>Your website reads from Google Sheets. Here's the complete column structure for each sheet tab:</p>

              {[
                { name:'Products Sheet (Tab: Sheet1)', color:'#4a7055', cols:[
                  ['id','1, 2, 3...','Unique number'],
                  ['name','Lavender Serenity','Product name'],
                  ['category','Agarbatti · Floral','Display category'],
                  ['type','agarbatti or dhupbatti','Product type'],
                  ['price','40','Selling price ₹'],
                  ['originalPrice','55','Crossed price (optional)'],
                  ['description','Hand-rolled on bamboo...','Short description'],
                  ['badge','New, Signature, Rare','Badge text (optional)'],
                  ['bg','#ede8d8','Card background color'],
                  ['inStock','true or false','Show/hide product'],
                  ['image','/images/lavender.jpg','Photo path (optional)'],
                ]},
              ].map(sheet => (
                <div key={sheet.name} style={{marginBottom:'1.5rem'}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.1rem',color:'#1a2a1e',marginBottom:'0.75rem',borderBottom:'2px solid'+sheet.color,paddingBottom:'0.5rem'}}>{sheet.name}</div>
                  <table style={s.table}>
                    <thead><tr>{['Column Name','Example','Description'].map(h=><th key={h} style={s.th}>{h}</th>)}</tr></thead>
                    <tbody>
                      {sheet.cols.map(([col,ex,desc],i) => (
                        <tr key={i}>
                          <td style={{...s.td,fontFamily:'monospace',color:'#185FA5',fontWeight:500}}>{col}</td>
                          <td style={s.td}>{ex}</td>
                          <td style={{...s.td,color:'#6a6a52'}}>{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}

              <div style={{padding:'1rem',background:'#f0f5f0',borderRadius:6,border:'1px solid rgba(74,112,85,0.2)'}}>
                <strong>Remember:</strong> After editing the sheet, wait 60 seconds for the site to auto-refresh. You can also add new product rows — they appear on the site automatically!
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={s.toast(!!toast)}>{toast}</div>
    </div>
  )
}
