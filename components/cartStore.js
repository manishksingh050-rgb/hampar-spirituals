// Simple cart store using localStorage
// Works across all pages

export const cartStore = {
  get: () => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('hampar_cart') || '[]')
    } catch { return [] }
  },

  set: (items) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('hampar_cart', JSON.stringify(items))
    window.dispatchEvent(new Event('cartUpdated'))
  },

  add: (product) => {
    const cart = cartStore.get()
    const existing = cart.find(i => i.id === product.id)
    const updated = existing
      ? cart.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i)
      : [...cart, {...product, qty: 1}]
    cartStore.set(updated)
    return updated
  },

  remove: (id) => {
    const updated = cartStore.get().filter(i => i.id !== id)
    cartStore.set(updated)
    return updated
  },

  updateQty: (id, delta) => {
    const updated = cartStore.get().map(i =>
      i.id === id ? {...i, qty: Math.max(1, i.qty + delta)} : i
    )
    cartStore.set(updated)
    return updated
  },

  clear: () => {
    cartStore.set([])
  },

  count: () => cartStore.get().reduce((s, i) => s + i.qty, 0),
  total: () => cartStore.get().reduce((s, i) => s + i.price * i.qty, 0),
}
