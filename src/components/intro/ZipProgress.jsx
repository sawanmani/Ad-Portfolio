// Animated SVG progress ring that wraps around the zip slider.
// Fills as the user drags the zipper down (0→1).
import { useTransform } from 'motion/react';

// Rounded-rect perimeter for the ring (approx match the slider shape)
const PERIM = 210; // stroke-dasharray total

export default function ZipProgress({ progress }) {
  // dashoffset: PERIM → 0 as progress goes 0 → 1
  const offset = useTransform(progress, (v) => PERIM * (1 - v));

  return (
    <svg
      className="zip-progress"
      viewBox="0 0 68 80"
      aria-hidden="true"
      focusable="false"
    >
      {/* Background track */}
      <rect
        className="zip-progress__ring"
        x="4" y="4" width="60" height="72"
        rx="18" ry="18"
      />
      {/* Filled arc */}
      <rect
        className="zip-progress__fill"
        x="4" y="4" width="60" height="72"
        rx="18" ry="18"
        strokeDasharray={PERIM}
        strokeDashoffset={offset.get !== undefined ? undefined : PERIM}
        style={{ strokeDashoffset: offset }}
      />
    </svg>
  );
}
