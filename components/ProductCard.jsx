'use client'
import { useState } from 'react'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, onAdd, hero = false }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAdd(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className={`${styles.card} ${hero ? styles.hero : ''}`}>
      <div className={styles.imgWrap} style={{ background: product.bg }}>
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        <ProductIllustration type={product.type} />
      </div>
      <div className={styles.body}>
        <div className={styles.cat}>{product.category}</div>
        <h3 className={styles.name}>{product.name}</h3>
        {hero && (
          <div className={styles.meta}>
            {product.meta?.map((m, i) => (
              <div key={i} className={styles.metaItem}>
                <span>{m.label}</span>
                {m.value}
              </div>
            ))}
          </div>
        )}
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.footer}>
          <div>
            {product.originalPrice && (
              <div className={styles.originalPrice}>₹{product.originalPrice}</div>
            )}
            <div className={styles.price}>₹{product.price}</div>
          </div>
          <button
            className={`${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductIllustration({ type }) {
  if (type === 'agarbatti') {
    return (
      <svg width="120" height="160" viewBox="0 0 120 160" style={{ opacity: 0.9 }}>
        <line x1="58" y1="15" x2="58" y2="125" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.45" />
        <line x1="62" y1="15" x2="62" y2="125" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.45" />
        <circle cx="60" cy="13" r="5" fill="#c9a84c" opacity="0.9" />
        <path d="M60 18 Q44 34 37 54 Q30 72 40 82 Q50 90 60 76" fill="none" stroke="#4a7055" strokeWidth="1.4" opacity="0.7" />
        <ellipse cx="35" cy="58" rx="13" ry="8" fill="#6a9a6a" opacity="0.6" transform="rotate(-25 35 58)" />
        <path d="M60 18 Q76 34 83 54 Q90 72 80 82 Q70 90 60 76" fill="none" stroke="#4a7055" strokeWidth="1.4" opacity="0.7" />
        <ellipse cx="85" cy="58" rx="13" ry="8" fill="#6a9a6a" opacity="0.6" transform="rotate(25 85 58)" />
        <ellipse cx="44" cy="84" rx="9" ry="13" fill="#c4889a" opacity="0.65" transform="rotate(-10 44 84)" />
        <ellipse cx="60" cy="80" rx="8" ry="12" fill="#b87888" opacity="0.5" transform="rotate(4 60 80)" />
        <ellipse cx="76" cy="84" rx="9" ry="13" fill="#c4889a" opacity="0.65" transform="rotate(10 76 84)" />
        <rect x="52" y="120" width="16" height="32" rx="3" fill="#8a7355" opacity="0.45" />
      </svg>
    )
  }
  return (
    <svg width="120" height="160" viewBox="0 0 120 160">
      <polygon points="60,10 110,38 110,94 60,122 10,94 10,38" fill="#7a9a80" opacity="0.2" stroke="#4a7055" strokeWidth="1.5" />
      <polygon points="60,24 96,44 96,84 60,104 24,84 24,44" fill="#4a7055" opacity="0.1" stroke="#4a7055" strokeWidth="0.8" />
      <text x="60" y="68" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="10" fill="#2a2a1e" letterSpacing="2" opacity="0.8">HAMPAR</text>
      <text x="60" y="81" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="7" fill="#4a7055" letterSpacing="1.5" opacity="0.9">DHUPBATTI</text>
      <path d="M36 56 Q40 44 52 50 Q46 36 60 30 Q74 36 68 50 Q80 44 84 56 Q68 66 60 63 Q52 66 36 56Z" fill="#a8c89a" opacity="0.4" />
    </svg>
  )
}
