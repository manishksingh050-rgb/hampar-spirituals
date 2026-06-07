const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSivhbpd6RNc5YPFqTXVVJ0dBlFS_aIn76yxR_oj_sFkXQVEVNFYaWnCzenJX3_QxmfC2hSfJzfX_Y7/pub?gid=733134948&single=true&output=csv'

function parseCSV(text) {
  const lines = text.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
    const obj = {}
    headers.forEach((h, i) => obj[h] = values[i] || '')
    return {
      id: parseInt(obj.id) || Math.random(),
      name: obj.name || '',
      category: obj.category || '',
      type: obj.type || 'agarbatti',
      price: parseInt(obj.price) || 0,
      originalPrice: obj.originalPrice ? parseInt(obj.originalPrice) : null,
      description: obj.description || '',
      badge: obj.badge || '',
      bg: obj.bg || '#ede8d8',
      inStock: obj.inStock !== 'false',
    }
  }).filter(p => p.name)
}

export async function GET() {
  try {
    const res = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error('Sheet fetch failed')
    const text = await res.text()
    const products = parseCSV(text)
    return Response.json({ products, source: 'sheets', updatedAt: new Date().toISOString() })
  } catch (err) {
    // Fallback products if sheet is unavailable
    return Response.json({
      products: [
        { id:1, name:'Lavender Serenity', category:'Agarbatti · Floral', type:'agarbatti', price:40, originalPrice:null, description:'Hand-rolled on bamboo, charcoal-free. Pure lavender botanical fragrance.', badge:'Signature', bg:'#ede8d8', inStock:true },
        { id:2, name:'Sandalwood Sacred', category:'Dhupbatti · Woody', type:'dhupbatti', price:55, originalPrice:null, description:'Premium dhupbatti cones in hexagonal box. Deep chandan fragrance.', badge:'New', bg:'#e4edd8', inStock:true },
        { id:3, name:'Rose Divya', category:'Agarbatti · Floral', type:'agarbatti', price:40, originalPrice:null, description:'Temple-fresh rose petals — warm, devotional, timeless.', badge:'', bg:'#f0dcd8', inStock:true },
        { id:4, name:'Eucalyptus Clear', category:'Agarbatti · Fresh', type:'agarbatti', price:40, originalPrice:null, description:'Crisp & clearing — opens mind and sacred space.', badge:'', bg:'#d8edda', inStock:true },
        { id:5, name:'Champak Sacred', category:'Dhupbatti · Rare', type:'dhupbatti', price:55, originalPrice:null, description:'Ancient champak blossom — rare, an offering to the divine.', badge:'Rare', bg:'#ede8d0', inStock:true },
        { id:6, name:'Nargis Heritage', category:'Agarbatti · Classic', type:'agarbatti', price:40, originalPrice:null, description:'Timeless nargis fragrance — pure tradition in every stick.', badge:'', bg:'#dde0f0', inStock:true },
      ],
      source: 'fallback',
      updatedAt: new Date().toISOString()
    })
  }
}
