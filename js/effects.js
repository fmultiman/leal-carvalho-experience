/* ═══════════════════════════════════════════════════════════════
   LEAL CARVALHO — O canto que reúne
   effects.js · atmosferas em canvas: água, vagalumes, estrelas
   Cada efeito pausa quando sai da tela e respeita reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

  /* infraestrutura comum: resize + play/pause por visibilidade */
  function setupCanvas(canvas, draw) {
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf = null, t = 0, visible = false;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function frame() {
      t += 1;
      draw(ctx, w, h, t);
      if (visible && !REDUCED) raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      cancelAnimationFrame(raf);
      raf = null;
      if (visible && !REDUCED) raf = requestAnimationFrame(frame);
    }, { rootMargin: "80px" });

    resize();
    window.addEventListener("resize", () => { resize(); if (REDUCED) draw(ctx, w, h, 0); });
    io.observe(canvas);
    if (REDUCED) draw(ctx, w, h, 0);   // um quadro estático
  }

  /* ── ÁGUA · superfície viva de linhas-onda ─────────────────── */
  function waterSurface(canvas, hue) {
    const LINES = 26;
    setupCanvas(canvas, (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.006;
      for (let i = 0; i < LINES; i++) {
        const p = i / (LINES - 1);             // 0 topo → 1 base
        const y0 = h * (0.12 + p * 0.85);
        const amp = 3 + p * 10;
        const alpha = 0.04 + p * 0.13;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 14) {
          const y = y0
            + Math.sin(x * 0.008 + time + i * 0.55) * amp
            + Math.sin(x * 0.021 - time * 1.4 + i) * amp * 0.4;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${hue}, 46%, ${58 + p * 12}%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  }

  /* ── VAGALUMES · partículas douradas da roda ───────────────── */
  function fireflies(canvas) {
    const N = 42;
    let dots = null;
    setupCanvas(canvas, (ctx, w, h, t) => {
      if (!dots) {
        dots = Array.from({ length: N }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.8 + Math.random() * 2.1,
          vx: (Math.random() - 0.5) * 0.24,
          vy: -0.06 - Math.random() * 0.22,
          ph: Math.random() * Math.PI * 2,
          warm: Math.random() > 0.35,
        }));
      }
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx + Math.sin(t * 0.008 + d.ph) * 0.14;
        d.y += d.vy;
        if (d.y < -8) { d.y = h + 8; d.x = Math.random() * w; }
        if (d.x < -8) d.x = w + 8;
        if (d.x > w + 8) d.x = -8;
        const pulse = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.02 + d.ph * 3));
        const color = d.warm ? "217, 169, 95" : "236, 210, 164";
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 5);
        grad.addColorStop(0, `rgba(${color}, ${0.5 * pulse})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  /* ── ESTRELAS · céu do Raio Cósmico ────────────────────────── */
  function starfield(canvas) {
    const N = 130;
    let stars = null, meteor = null;
    setupCanvas(canvas, (ctx, w, h, t) => {
      if (!stars) {
        stars = Array.from({ length: N }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + Math.random() * 1.3,
          ph: Math.random() * Math.PI * 2,
          sp: 0.2 + Math.random() * 0.8,
          violet: Math.random() > 0.75,
        }));
      }
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 0.014 * s.sp + s.ph));
        ctx.fillStyle = s.violet
          ? `rgba(160, 140, 220, ${0.75 * tw})`
          : `rgba(244, 237, 222, ${0.7 * tw})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      /* de tempos em tempos, um raio cruza o céu */
      if (!meteor && Math.random() < 0.0035) {
        meteor = { x: Math.random() * w * 0.7 + w * 0.15, y: Math.random() * h * 0.3, life: 1 };
      }
      if (meteor) {
        meteor.x += 7;
        meteor.y += 3.4;
        meteor.life -= 0.02;
        if (meteor.life <= 0) { meteor = null; }
        else {
          const g = ctx.createLinearGradient(meteor.x - 90, meteor.y - 44, meteor.x, meteor.y);
          g.addColorStop(0, "rgba(154, 219, 213, 0)");
          g.addColorStop(1, `rgba(244, 237, 222, ${0.75 * meteor.life})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(meteor.x - 90, meteor.y - 44);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.stroke();
        }
      }
    });
  }

  /* ── liga cada atmosfera ao seu lugar ──────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    const heroWater = document.getElementById("water-hero");
    const aguaWaves = document.getElementById("water-agua");
    const fimWater = document.getElementById("water-fim");
    const circuloDots = document.getElementById("particles-circulo");
    const raioStars = document.getElementById("stars-raio");

    if (heroWater) waterSurface(heroWater, 176);
    if (aguaWaves) waterSurface(aguaWaves, 182);
    if (fimWater) waterSurface(fimWater, 176);
    if (circuloDots) fireflies(circuloDots);
    if (raioStars) starfield(raioStars);
  });
})();
