/**
 * Il·lustració SVG d'una camper en un paisatge al capvespre.
 * Usat al Hero i a la pàgina de detall del model.
 * No depèn de cap imatge externa.
 */
export default function CamperIllustration({ className = "", ariaLabel = "Furgoneta camper en un paisatge" }) {
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="40%" stopColor="#7c2d12" />
          <stop offset="75%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#fbbf77" />
        </linearGradient>
        <linearGradient id="hero-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#1a1410" />
        </linearGradient>
        <radialGradient id="hero-sun-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Cel amb degradat de capvespre */}
      <rect width="800" height="420" fill="url(#hero-sky)" />

      {/* Resplendor al voltant del sol */}
      <circle cx="600" cy="320" r="180" fill="url(#hero-sun-glow)" />
      {/* Sol */}
      <circle cx="600" cy="320" r="55" fill="#fef3c7" />
      <circle cx="600" cy="320" r="45" fill="#fbbf77" opacity="0.7" />

      {/* Estrelles a la part superior */}
      <g fill="#fef3c7" opacity="0.9">
        <circle cx="80" cy="40" r="1.5" />
        <circle cx="180" cy="70" r="1" />
        <circle cx="260" cy="30" r="1.8" />
        <circle cx="380" cy="55" r="1" />
        <circle cx="450" cy="25" r="1.5" />
        <circle cx="540" cy="60" r="1" />
        <circle cx="700" cy="35" r="1.5" />
        <circle cx="120" cy="100" r="1" />
        <circle cx="320" cy="90" r="1.2" />
      </g>

      {/* Muntanyes llunyanes */}
      <path
        d="M0,400 L80,280 L160,340 L260,250 L360,310 L460,240 L560,290 L680,260 L800,310 L800,420 L0,420 Z"
        fill="#3d322a"
        opacity="0.8"
      />
      {/* Muntanyes mitjanes */}
      <path
        d="M0,420 L60,360 L150,400 L250,330 L340,380 L450,340 L560,390 L680,360 L800,380 L800,420 Z"
        fill="#1a1410"
        opacity="0.9"
      />

      {/* Reflexió del sol al terra (suau) */}
      <ellipse cx="600" cy="430" rx="120" ry="8" fill="#fbbf77" opacity="0.3" />

      {/* Terra */}
      <rect y="420" width="800" height="180" fill="url(#hero-ground)" />

      {/* Camí difuminat cap a l'horitzó */}
      <path
        d="M300,600 L380,440 L420,440 L500,600 Z"
        fill="#78350f"
        opacity="0.4"
      />

      {/* Furgoneta camper en primer pla */}
      <g transform="translate(240, 380)">
        {/* Ombra sota */}
        <ellipse cx="160" cy="135" rx="150" ry="10" fill="#000" opacity="0.5" />

        {/* Carrosseria principal */}
        <rect x="20" y="40" width="280" height="90" rx="10" fill="#f5ede0" />

        {/* Cabina inclinada */}
        <path d="M20,40 L20,80 L75,80 L100,40 Z" fill="#f5ede0" />

        {/* Sostre elevable (sostre alt) */}
        <rect x="90" y="15" width="160" height="30" rx="6" fill="#c2410c" />
        <rect x="95" y="20" width="150" height="5" rx="2" fill="#9a3412" />

        {/* Finestra cabina (parabrisa) */}
        <path d="M28,46 L28,77 L72,77 L92,46 Z" fill="#1e3a5f" opacity="0.85" />
        {/* Reflex parabrisa */}
        <path d="M35,50 L40,50 L55,72 L48,72 Z" fill="#fef3c7" opacity="0.3" />

        {/* Finestres laterals */}
        <rect x="110" y="50" width="55" height="35" rx="3" fill="#1e3a5f" opacity="0.85" />
        <rect x="170" y="50" width="55" height="35" rx="3" fill="#1e3a5f" opacity="0.85" />
        {/* Llum càlida a dins (efecte acollidor) */}
        <rect x="113" y="53" width="49" height="29" rx="2" fill="#fbbf77" opacity="0.4" />
        <rect x="173" y="53" width="49" height="29" rx="2" fill="#fbbf77" opacity="0.4" />

        {/* Porta lateral */}
        <rect x="232" y="50" width="60" height="60" rx="3" fill="#f5ede0" stroke="#c2410c" strokeWidth="1.5" />
        <circle cx="285" cy="80" r="2" fill="#c2410c" />

        {/* Línia decorativa */}
        <rect x="20" y="105" width="280" height="3" fill="#c2410c" opacity="0.7" />

        {/* Rodes */}
        <g>
          <circle cx="75" cy="130" r="18" fill="#1a1410" />
          <circle cx="75" cy="130" r="10" fill="#3d322a" />
          <circle cx="75" cy="130" r="4" fill="#1a1410" />
        </g>
        <g>
          <circle cx="240" cy="130" r="18" fill="#1a1410" />
          <circle cx="240" cy="130" r="10" fill="#3d322a" />
          <circle cx="240" cy="130" r="4" fill="#1a1410" />
        </g>

        {/* Llum davantera encesa */}
        <circle cx="25" cy="90" r="4" fill="#fef3c7" />
        <circle cx="25" cy="90" r="8" fill="#fef3c7" opacity="0.3" />

        {/* Tendal extern */}
        <path d="M300,55 L355,55 L355,57 L300,90 Z" fill="#84a83a" opacity="0.9" />
        <line x1="355" y1="57" x2="355" y2="135" stroke="#3d322a" strokeWidth="2" />
      </g>

      {/* Foguera petita */}
      <g transform="translate(560, 510)">
        <ellipse cx="0" cy="20" rx="25" ry="4" fill="#000" opacity="0.4" />
        <path d="M-12,15 L-5,5 L0,15 Z" fill="#3d322a" />
        <path d="M5,15 L12,5 L18,15 Z" fill="#3d322a" />
        <path d="M-8,12 L0,-5 L8,12 Z" fill="#ea580c" />
        <path d="M-4,10 L0,-2 L4,10 Z" fill="#fef3c7" />
      </g>

      {/* Arbre silueta al primer pla */}
      <g transform="translate(80, 430)">
        <rect x="-3" y="20" width="6" height="40" fill="#1a1410" />
        <circle cx="0" cy="0" r="30" fill="#1a1410" />
        <circle cx="-15" cy="10" r="20" fill="#1a1410" />
        <circle cx="15" cy="10" r="20" fill="#1a1410" />
      </g>
    </svg>
  );
}
