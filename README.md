# HAMPAR Spirituals — Next.js Website

Premium incense brand website built with Next.js 14 (App Router).

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
hampar-spirituals/
├── app/
│   ├── layout.jsx        # Root layout + metadata
│   ├── page.jsx          # Homepage (hero, shop, story, reviews)
│   ├── page.module.css   # Page styles
│   └── globals.css       # Global CSS variables & fonts
├── components/
│   ├── Navbar.jsx        # Sticky nav with cart button
│   ├── Navbar.module.css
│   ├── ProductCard.jsx   # Reusable product card (hero + grid)
│   ├── ProductCard.module.css
│   ├── CartDrawer.jsx    # Slide-in cart with totals
│   ├── CartDrawer.module.css
│   ├── Toast.jsx         # Add-to-cart notification
│   ├── Toast.module.css
│   └── Logo.jsx          # HAMPAR SVG logo
├── next.config.js
└── package.json
```

## Brand Colors (CSS Variables)
- `--green: #4a7055` — primary brand green
- `--cream: #f4f1eb` — background
- `--gold: #c9a84c` — accent
- `--text: #2a2a1e` — body text

## Add New Products
Edit the `PRODUCTS` array in `app/page.jsx`:
```js
{
  id: 7,
  name: 'New Fragrance',
  type: 'agarbatti',           // or 'dhupbatti'
  category: 'Agarbatti · Floral',
  badge: 'New',               // optional
  description: '...',
  price: 40,
  bg: '#e8edd8',              // card background color
}
```

## Deploy to Vercel (Free)
```bash
npm install -g vercel
vercel
```
