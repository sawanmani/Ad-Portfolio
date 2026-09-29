// Cursor-direction helpers for the HUD radar (from skills/cursor-tracking-hud.md)

export function getDirection(el, x, y) {
  if (!el) return 'Center';
  const r = el.getBoundingClientRect();
  const dx = x - (r.left + r.width / 2);
  const dy = y - (r.top + r.height / 2);
  const dead = 60;
  const h = dx > dead ? 'Right' : dx < -dead ? 'Left' : '';
  const v = dy > dead ? 'Down' : dy < -dead ? 'Up' : '';
  return [v, h].filter(Boolean).join('-') || 'Center';
}

// Clamp a pointer offset into a radar circle of given radius.
export function dotPos(dx, dy, radius) {
  const d = Math.hypot(dx, dy) || 1;
  const k = Math.min(1, radius / d);
  return { x: dx * k, y: dy * k };
}
