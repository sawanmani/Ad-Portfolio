// "Chotu Bhai" — desi meme character hanging on the zipper.
// Idle: bored, one eyebrow raised, "bhai khol de na" vibe.
// Straining: tongue out, crazy eyes, legs split, sweat — "AREY BHEEEEDDD!!!"
export default function ZipCharacter({ straining = false }) {
  return (
    <svg
      className={`zipchar${straining ? ' zipchar--strain' : ''}`}
      viewBox="0 0 140 170"
      width="120"
      height="146"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="zc-hoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#5b21b6" />
        </linearGradient>
        <linearGradient id="zc-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* arms reaching up to grip the slider */}
      <g stroke="url(#zc-hoodie)" strokeWidth="11" strokeLinecap="round" fill="none">
        <path d="M52 78 C46 52 50 26 58 10" />
        <path d="M88 78 C94 52 90 26 82 10" />
      </g>
      {/* hands gripping */}
      <circle cx="58" cy="9" r="8" fill="url(#zc-skin)" />
      <circle cx="82" cy="9" r="8" fill="url(#zc-skin)" />

      {/* legs: calm (together) vs straining (split wide) */}
      <g className="zipchar__legs-calm" stroke="url(#zc-hoodie)" strokeWidth="12" strokeLinecap="round" fill="none">
        <path d="M60 122 C58 138 56 148 54 156" />
        <path d="M80 122 C82 138 84 148 86 156" />
      </g>
      <g className="zipchar__legs-strain" stroke="url(#zc-hoodie)" strokeWidth="12" strokeLinecap="round" fill="none">
        <path d="M60 122 C40 132 24 140 12 146" />
        <path d="M80 122 C100 132 116 140 128 146" />
      </g>
      {/* feet */}
      <g className="zipchar__legs-calm" fill="#1e1b2e">
        <ellipse cx="52" cy="159" rx="9" ry="6" />
        <ellipse cx="88" cy="159" rx="9" ry="6" />
      </g>
      <g className="zipchar__legs-strain" fill="#1e1b2e">
        <ellipse cx="10" cy="148" rx="9" ry="6" transform="rotate(-24 10 148)" />
        <ellipse cx="130" cy="148" rx="9" ry="6" transform="rotate(24 130 148)" />
      </g>

      {/* body (oversized hoodie) */}
      <ellipse cx="70" cy="100" rx="28" ry="30" fill="url(#zc-hoodie)" />
      {/* hoodie pocket */}
      <path d="M54 108 q16 10 32 0" stroke="#3b0764" strokeWidth="3" fill="none" opacity="0.5" />

      {/* head */}
      <circle cx="70" cy="52" r="30" fill="url(#zc-skin)" />
      {/* backwards cap */}
      <path d="M42 42 q28 -18 56 0 l-4 8 q-24 -12 -48 0z" fill="#ef4444" />
      <path d="M42 42 q-8 4 -6 12 l8 -2z" fill="#dc2626" /> {/* cap brim */}

      {/* CALM face: bored, one eyebrow raised */}
      <g className="zipchar__face-calm">
        <ellipse cx="60" cy="52" rx="4" ry="5.5" fill="#1e1b2e" />
        <ellipse cx="80" cy="52" rx="4" ry="5.5" fill="#1e1b2e" />
        {/* one eyebrow raised */}
        <path d="M52 42 l10 -3" stroke="#1e1b2e" strokeWidth="3" strokeLinecap="round" />
        <path d="M78 40 l10 2" stroke="#1e1b2e" strokeWidth="3" strokeLinecap="round" />
        {/* slight smirk */}
        <path d="M62 66 q8 4 16 0" stroke="#1e1b2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* STRAIN face: tongue out, crazy eyes, sweat */}
      <g className="zipchar__face-strain">
        {/* wide asymmetric eyes */}
        <circle cx="58" cy="48" r="9" fill="#fff" />
        <circle cx="82" cy="50" r="7" fill="#fff" />
        <circle cx="59" cy="49" r="3.5" fill="#1e1b2e" />
        <circle cx="81" cy="51" r="2.5" fill="#1e1b2e" />
        {/* angry eyebrows */}
        <path d="M48 36 l14 6" stroke="#1e1b2e" strokeWidth="4" strokeLinecap="round" />
        <path d="M92 36 l-14 6" stroke="#1e1b2e" strokeWidth="4" strokeLinecap="round" />
        {/* tongue out */}
        <ellipse cx="70" cy="72" rx="8" ry="6" fill="#ec4899" />
        <path d="M62 66 q8 8 16 0" stroke="#1e1b2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* sweat drops */}
        <path d="M38 38 q-5 10 0 13 q6 -3 0 -13z" fill="#7dd3fc" />
        <path d="M104 34 q-5 10 0 13 q6 -3 0 -13z" fill="#7dd3fc" />
        {/* vein on forehead */}
        <path d="M68 32 l-3 4 M72 32 l3 4 M67 36 l6 0" stroke="#ef4444" strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}
