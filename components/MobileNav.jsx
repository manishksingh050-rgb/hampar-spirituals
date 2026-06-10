'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cartStore } from './cartStore'

export default function MobileNav({ activePage = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCartCount(cartStore.count())
    const onUpdate = () => setCartCount(cartStore.count())
    window.addEventListener('cartUpdated', onUpdate)
    return () => window.removeEventListener('cartUpdated', onUpdate)
  }, [])

  const links = [
    { label: 'Shop', href: '/#shop' },
    { label: 'Our Story', href: '/story' },
    { label: 'Purity', href: '/purity' },
    { label: 'Charity', href: '/charity' },
  ]

  return (
    <>
      <style>{`
        .hampar-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 2rem;
          background: #f4f1eb;
          border-bottom: 1px solid #ddd8cc;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .hampar-logo-wrap { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .hampar-logo-text { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 600; letter-spacing: 3px; color: #4a7055; line-height: 1; }
        .hampar-logo-sub { font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: #7a9a80; margin-top: 2px; }
        .hampar-nav-links { display: flex; gap: 1.5rem; list-style: none; }
        .hampar-nav-links a { font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase; color: #5a5a42; text-decoration: none; }
        .hampar-nav-links a.active { color: #4a7055; font-weight: 500; }
        .hampar-cart-btn {
          display: flex; align-items: center; gap: 6px;
          background: #4a7055; color: #f4f1eb;
          font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase;
          padding: 8px 18px; border: none; border-radius: 2px; cursor: pointer;
          text-decoration: none;
        }
        .hampar-badge {
          background: #c9a84c; color: #2a2a1e; font-size: 9px; font-weight: 700;
          width: 16px; height: 16px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .hampar-menu-btn {
          display: none; background: none; border: none; cursor: pointer; color: #2a2a1e; font-size: 22px;
        }
        .hampar-mobile-menu {
          display: none; flex-direction: column; background: #f4f1eb;
          border-bottom: 1px solid #ddd8cc; padding: 1rem 1.5rem; gap: 1rem;
        }
        .hampar-mobile-menu.open { display: flex; }
        .hampar-mobile-menu a {
          font-size: 0.85rem; letter-spacing: 1.5px; text-transform: uppercase;
          color: #5a5a42; text-decoration: none; padding: 0.5rem 0;
          border-bottom: 1px solid #edeae0;
        }
        .hampar-mobile-menu a.active { color: #4a7055; }

        @media (max-width: 768px) {
          .hampar-nav { padding: 0.75rem 1rem; }
          .hampar-nav-links { display: none; }
          .hampar-menu-btn { display: flex; align-items: center; }
          .hampar-cart-btn { padding: 7px 12px; font-size: 0.7rem; }
        }
      `}</style>

      <nav className="hampar-nav">
        <Link href="/" className="hampar-logo-wrap">
          <svg width="34" height="34" viewBox="0 0 80 80" fill="none">
            <rect x="18" y="38" width="44" height="28" rx="4" stroke="#2a2a1e" strokeWidth="2.5" fill="none"/>
            <path d="M26 38 Q28 24 40 22 Q52 24 54 38" stroke="#2a2a1e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <rect x="30" y="16" width="8" height="22" rx="4" stroke="#2a2a1e" strokeWidth="2" fill="none"/>
            <rect x="42" y="16" width="8" height="22" rx="4" stroke="#2a2a1e" strokeWidth="2" fill="none"/>
            <circle cx="32" cy="38" r="2.5" fill="#2a2a1e"/>
            <circle cx="48" cy="38" r="2.5" fill="#2a2a1e"/>
            <path d="M40 62 Q36 54 38 48 Q40 44 40 44 Q40 44 42 48 Q44 54 40 62Z" fill="#4a7055" opacity="0.8"/>
          </svg>
          <div>
            <div className="hampar-logo-text">HAMPAR</div>
            <div className="hampar-logo-sub">Spirituals</div>
          </div>
        </Link>

        <ul className="hampar-nav-links">
          {links.map(l => (
            <li key={l.label}>
              <Link href={l.href} className={activePage === l.label ? 'active' : ''}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Link href="/cart" className="hampar-cart-btn">
            🛍 Cart <span className="hampar-badge">{cartCount}</span>
          </Link>
          <button className="hampar-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <div className={`hampar-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <Link key={l.label} href={l.href} className={activePage === l.label ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}
