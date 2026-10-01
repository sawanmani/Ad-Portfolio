// Fun desi meme sounds via Web Audio — no external files needed.
// Boing for idle bob, funny grunt for straining, ta-da for completion.
let ctx = null;
let noiseBuf = null;

function ensureCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  if (!noiseBuf) {
    const len = Math.floor(ctx.sampleRate * 1);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  return ctx;
}

// Funny "boing" spring sound for idle bob
export function boing() {
  const c = ensureCtx();
  if (!c) return;
  const o = c.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(400, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(150, c.currentTime + 0.15);
  const g = c.createGain();
  g.gain.setValueAtTime(0.15, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
  o.connect(g);
  g.connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.21);
}

// Funny "grunt" for straining effort
export function grunt() {
  const c = ensureCtx();
  if (!c) return;
  const o = c.createOscillator();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(120, c.currentTime);
  o.frequency.linearRampToValueAtTime(80, c.currentTime + 0.12);
  const g = c.createGain();
  g.gain.setValueAtTime(0.12, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
  o.connect(g);
  g.connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.16);
}

// Metallic tooth "tick" while unzipping
export function zipTick() {
  const c = ensureCtx();
  if (!c) return;
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 2400 + Math.random() * 1100;
  bp.Q.value = 7;
  const g = c.createGain();
  g.gain.setValueAtTime(0.1, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.05);
  src.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  src.start();
  src.stop(c.currentTime + 0.06);
}

// Triumphant "ta-da" trumpet for completion
export function tada() {
  const c = ensureCtx();
  if (!c) return;
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const o = c.createOscillator();
    o.type = 'triangle';
    o.frequency.value = freq;
    const g = c.createGain();
    const start = c.currentTime + i * 0.08;
    g.gain.setValueAtTime(0.2, start);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
    o.connect(g);
    g.connect(c.destination);
    o.start(start);
    o.stop(start + 0.31);
  });
}
