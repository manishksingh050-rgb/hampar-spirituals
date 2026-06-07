'use client'
import { useState } from 'react'
import HamparLogo from './HamparLogo'
import { useCart } from './CartContext'

export default function Navbar() {
  const { count, total, items } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#f4f1eb] border-b border-[#ddd8cc]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <HamparLogo size={38} color="#4a7055" />
          <div>
            <div className="font-serif text-[1.35rem] font-semibold tracking-[3px] text-[#4a7055] leading-none">
              HAMPAR
            </div>
            <div className="text-[9px] tracking-[2.5px] uppercase text-[#7a9a80] mt-0.5">
              Spirituals
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 list-none">
          {['Shop', 'Our Story', 'Purity', 'Blog'].map(link => (
            <li key={link}>
              <a
                href={link === 'Shop' ? '#shop' : '#'}
                className="text-[0.75rem] tracking-[1.5px] uppercase text-[#5a5a42] no-underline hover:text-[#4a7055] transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Cart + Mobile menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert(count > 0 ? `Cart: ${count} items · ₹${total}` : 'Your cart is empty')}
            className="flex items-center gap-2 bg-[#4a7055] text-[#f4f1eb] text-[0.72rem] tracking-[1.5px] uppercase px-4 py-2 rounded-sm hover:bg-[#3a5a42] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Cart
            {count > 0 && (
              <span className="bg-[#c9a84c] text-[#2a2a1e] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#5a5a42]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#edeae0] border-t border-[#ddd8cc] px-6 py-4 flex flex-col gap-4">
          {['Shop', 'Our Story', 'Purity', 'Blog'].map(link => (
            <a key={link} href={link === 'Shop' ? '#shop' : '#'} className="text-[0.82rem] tracking-[1.5px] uppercase text-[#5a5a42]" onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
