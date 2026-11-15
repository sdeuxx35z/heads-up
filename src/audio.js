// All sound is synthesised, no files to load.
export class Audio {
  constructor() {
    this.ctx = null;
    this.volume = 0.8;
    this.ticks = true;
  }

  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    this.ctx = new C();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    this.master.connect(this.ctx.destination);
    this.noise = this.makeNoise();
    this.crowd();
  }

  setVolume(v) {
    this.volume = v;
    if (this.master) this.master.gain.value = v;
  }

  makeNoise() {
    const len = this.ctx.sampleRate * 2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0526;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2;
    }
    return buf;
  }

  src() {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    s.loop = true;
    return s;
  }

  crowd() {
    const c = this.ctx;
    const s = this.src();
    const bp = c.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 700; bp.Q.value = 0.6;
    this.crowdGain = c.createGain();
    this.crowdGain.gain.value = 0.22;
    // slow swells so the stadium breathes
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.09;
    const lfoGain = c.createGain();
    lfoGain.gain.value = 0.06;
    lfo.connect(lfoGain).connect(this.crowdGain.gain);
    s.connect(bp).connect(this.crowdGain).connect(this.master);
    s.start(); lfo.start();
  }

  swell(amount, dur = 2.2, freq = 900) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    const s = this.src();
    const bp = c.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 0.8;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(amount, t + 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(bp).connect(g).connect(this.master);
    s.start(t); s.stop(t + dur + 0.1);
  }

  cheer(k = 0.5) { this.swell(0.25 + k * 0.6, 1.6 + k * 1.8, 1000); }
  groan() { this.swell(0.35, 1.4, 380); }

  kick(power = 0.8) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.12);
    const g = c.createGain();
    g.gain.setValueAtTime(0.5 * power, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.2);
    const n = this.src();
    const hp = c.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 1800;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.25 * power, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    n.connect(hp).connect(ng).connect(this.master);
    n.start(t); n.stop(t + 0.08);
  }

  touch() { this.kick(0.35); }

  tick() {
    if (!this.ctx || !this.ticks) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator();
    o.type = 'triangle'; o.frequency.value = 1320;
    const g = c.createGain();
    g.gain.setValueAtTime(0.07, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.09);
  }

  ui() {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator();
    o.type = 'sine'; o.frequency.setValueAtTime(660, t); o.frequency.exponentialRampToValueAtTime(990, t + 0.05);
    const g = c.createGain();
    g.gain.setValueAtTime(0.08, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.1);
  }

  whistle(long = false) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime, dur = long ? 0.9 : 0.35;
    const o = c.createOscillator();
    o.type = 'sine'; o.frequency.value = 2900;
    const vib = c.createOscillator();
    vib.frequency.value = 28;
    const vg = c.createGain();
    vg.gain.value = 120;
    vib.connect(vg).connect(o.frequency);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.03);
    g.gain.setValueAtTime(0.12, t + dur - 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t); vib.start(t); o.stop(t + dur); vib.stop(t + dur);
  }
}
