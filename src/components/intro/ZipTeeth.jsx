// A vertical run of interlocking metal teeth for the closed zipper.
// Alternate teeth anchor left / right so their rounded ends mesh at the seam.
const TEETH = 150;

export default function ZipTeeth() {
  return (
    <div className="zip-teeth-inner">
      {Array.from({ length: TEETH }).map((_, i) => (
        <span key={i} className={`zip-tooth ${i % 2 ? 'zip-tooth--r' : 'zip-tooth--l'}`} />
      ))}
    </div>
  );
}
