export default function HamparLogo({ size = 40, color = '#4a7055' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="38" width="44" height="28" rx="4" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M26 38 Q28 24 40 22 Q52 24 54 38" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="30" y="16" width="8" height="22" rx="4" stroke={color} strokeWidth="2" fill="none" />
      <rect x="42" y="16" width="8" height="22" rx="4" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="32" cy="38" r="2.5" fill={color} />
      <circle cx="48" cy="38" r="2.5" fill={color} />
      {/* lotus leaf motif */}
      <path d="M40 62 Q36 54 38 48 Q40 44 40 44 Q40 44 42 48 Q44 54 40 62Z" fill={color} opacity="0.75" />
      <path d="M40 58 Q33 52 34 45 Q36 40 40 44" fill={color} opacity="0.45" />
      <path d="M40 58 Q47 52 46 45 Q44 40 40 44" fill={color} opacity="0.45" />
    </svg>
  )
}
