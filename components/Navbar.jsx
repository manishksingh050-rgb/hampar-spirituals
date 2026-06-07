'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import styles from './Navbar.module.css';

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logoWrap}>
        <Logo size={36} />
        <div>
          <div className={styles.logoText}>HAMPAR</div>
          <div className={styles.logoSub}>Spirituals</div>
        </div>
      </Link>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/story">Our Story</Link></li>
        <li><Link href="/purity">Purity Promise</Link></li>
        <li><Link href="/blog">Journal</Link></li>
      </ul>

      <div className={styles.navRight}>
        <button className={styles.iconBtn} aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>

        {/* This now links straight to your cart page folder! */}
        <Link href="/cart" className={styles.cartBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Cart
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>

        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}