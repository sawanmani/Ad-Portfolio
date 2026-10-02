// "Cyber Dev" — rendering the highly detailed transparent png character
// Swaps image source based on calm vs strain states and stretches on drag.
export default function ZipCharacter({ straining = false }) {
  const imgSrc = straining 
    ? '/images/zipchar_strain.png' 
    : '/images/zipchar_calm.png';

  return (
    <div 
      className={`zipchar-img-wrapper${straining ? ' zipchar-img-wrapper--strain' : ''}`}
      style={{ 
        transform: straining ? 'scaleY(1.08) scaleX(0.95)' : 'translateX(-12px)', 
        transformOrigin: 'top center', 
        transition: 'transform 0.2s ease' 
      }}
    >
      <img
        src={imgSrc}
        alt={straining ? "Cyber Dev straining to pull zipper" : "Cyber Dev holding zipper"}
        className="zipchar-img"
        draggable="false"
      />
    </div>
  );
}
