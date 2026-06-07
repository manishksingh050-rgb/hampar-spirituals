'use client'
import styles from './CartDrawer.module.css'

export default function CartDrawer({ items, onClose, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2>Your Cart</h2>
          <button onClick={onClose} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
            <p className={styles.emptyNote}>Add some sacred fragrance to begin.</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemMeta}>Qty: {item.qty} · ₹{item.price} each</div>
                  </div>
                  <div className={styles.itemRight}>
                    <div className={styles.itemTotal}>₹{item.price * item.qty}</div>
                    <button className={styles.removeBtn} onClick={() => onRemove(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalAmount}>₹{total}</span>
              </div>
              <button className={styles.checkoutBtn}>Proceed to Checkout</button>
              <p className={styles.shippingNote}>
                {total >= 299 ? '✓ Free shipping applied' : `₹${299 - total} more for free shipping`}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
