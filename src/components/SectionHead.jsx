import Reveal from './Reveal.jsx';

// Consistent section header: eyebrow label + big title with an italic accent word.
export default function SectionHead({ eyebrow, title, accent }) {
  return (
    <Reveal as="div" className="section__head">
      <span className="label">{eyebrow}</span>
      <h2 className="section-title">
        {title} <span className="accent">{accent}</span>
      </h2>
    </Reveal>
  );
}
