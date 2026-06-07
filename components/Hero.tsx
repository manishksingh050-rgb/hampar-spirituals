export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 bg-[#edeae0] min-h-[460px]">
      {/* Text */}
      <div className="flex flex-col justify-center px-8 md:px-12 py-14 border-b md:border-b-0 md:border-r border-[#ddd8cc]">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-6 h-px bg-[#7a9a80]" />
          <span className="text-[9px] tracking-[3px] uppercase text-[#7a9a80]">Temple-grade · Jhansi, India</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-[1.15] text-[#2a2a1e] mb-4">
          Sacred fragrance,<br />
          <em className="italic text-[#4a7055]">purely crafted</em><br />
          for your ritual
        </h1>
        <p className="text-[0.88rem] text-[#6a6a52] leading-[1.85] max-w-sm mb-8">
          HAMPAR Spirituals brings you charcoal-free agarbatti and dhupbatti — hand-crafted from the finest botanicals. Every stick, every cone: an offering worthy of your sacred space.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#shop"
            className="bg-[#4a7055] text-[#f4f1eb] text-[0.75rem] tracking-[1.5px] uppercase px-7 py-3 rounded-sm hover:bg-[#3a5a42] transition-colors"
          >
            Shop Now
          </a>
          <a
            href="#story"
            className="text-[#2a2a1e] text-[0.75rem] tracking-[1.5px] uppercase px-7 py-3 rounded-sm border border-[#2a2a1e] hover:bg-[#2a2a1e] hover:text-[#f4f1eb] transition-colors"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Illustration */}
      <div className="flex items-center justify-center bg-[#e2ddd0] p-6 min-h-[320px]">
        <svg width="100%" height="400" viewBox="0 0 380 400" xmlns="http://www.w3.org/2000/svg">
          {/* Agarbatti triangular pack */}
          <g transform="translate(50,210)">
            <polygon points="0,0 190,0 210,34 -20,34" fill="#c9a84c" opacity="0.72" />
            <polygon points="0,0 -20,34 -20,88 0,56" fill="#a88832" opacity="0.85" />
            <polygon points="190,0 210,34 210,88 190,56" fill="#b89a42" opacity="0.6" />
            <polygon points="0,0 190,0 190,56 0,56" fill="#dfc878" opacity="0.4" />
            <text x="55" y="28" fontFamily="'Cormorant Garamond',serif" fontSize="11" fill="#2a1e08" letterSpacing="2">HAMPAR</text>
            <text x="42" y="41" fontFamily="'DM Sans',sans-serif" fontSize="6.5" fill="#5c4a1a" letterSpacing="1.5">AGARBATTI · LAVENDER</text>
          </g>
          {/* Incense sticks */}
          <g transform="translate(120,30)">
            <line x1="25" y1="0" x2="25" y2="185" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.45" />
            <line x1="29" y1="0" x2="29" y2="185" stroke="#5c4a2a" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.45" />
            <circle cx="27" cy="0" r="4" fill="#c9a84c" opacity="0.9" />
            <path d="M27 8 Q14 22 9 40 Q4 56 14 64 Q22 70 27 58" fill="none" stroke="#4a7055" strokeWidth="1.3" opacity="0.7" />
            <ellipse cx="8" cy="46" rx="11" ry="7" fill="#6a9a6a" opacity="0.6" transform="rotate(-22,8,46)" />
            <path d="M27 8 Q40 22 45 40 Q50 56 40 64 Q32 70 27 58" fill="none" stroke="#4a7055" strokeWidth="1.3" opacity="0.7" />
            <ellipse cx="46" cy="46" rx="11" ry="7" fill="#6a9a6a" opacity="0.6" transform="rotate(22,46,46)" />
            <ellipse cx="19" cy="66" rx="7" ry="11" fill="#c4889a" opacity="0.65" transform="rotate(-10,19,66)" />
            <ellipse cx="27" cy="63" rx="6" ry="10" fill="#b87888" opacity="0.5" />
            <ellipse cx="35" cy="66" rx="7" ry="11" fill="#c4889a" opacity="0.65" transform="rotate(10,35,66)" />
          </g>
          {/* Hexagonal dhupbatti box */}
          <g transform="translate(240,100)">
            <polygon points="50,0 100,28 100,85 50,114 0,85 0,28" fill="#7a9a80" opacity="0.22" stroke="#4a7055" strokeWidth="1.5" />
            <polygon points="50,14 86,35 86,79 50,100 14,79 14,35" fill="#4a7055" opacity="0.1" stroke="#4a7055" strokeWidth="0.7" />
            <text x="50" y="60" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="10" fill="#2a2a1e" letterSpacing="2" opacity="0.85">HAMPAR</text>
            <text x="50" y="74" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="6.5" fill="#4a7055" letterSpacing="1.5" opacity="0.9">DHUPBATTI</text>
          </g>
          <text x="190" y="385" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="10" fill="#7a9a80" letterSpacing="3" fontStyle="italic">
            pure · sacred · handcrafted
          </text>
        </svg>
      </div>
    </section>
  )
}
