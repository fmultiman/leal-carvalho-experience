/* ═══════════════════════════════════════════════════════════════
   LEAL CARVALHO — O canto que reúne
   main.js · orquestração da travessia
   preloader → lenis → gsap/scrolltrigger → seções → vídeos
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const HAS_GSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const MOBILE = window.matchMedia("(max-width: 899px)").matches;

  if (REDUCED) document.body.classList.add("reduced-motion");
  if (!HAS_GSAP) document.body.classList.add("no-gsap");

  /* ── DISCOGRAFIA · monta a grade a partir de data.js ───────── */
  function buildDiscos() {
    const grid = document.getElementById("discos-grid");
    if (!grid || !window.LEAL_DISCOS) return;
    grid.innerHTML = window.LEAL_DISCOS.map((d) => {
      const tag = d.url ? `a href="${d.url}" target="_blank" rel="noopener"` : "div";
      const tagClose = d.url ? "a" : "div";
      return `
      <${tag} class="disco reveal">
        <div class="disco__cover">
          <img src="${d.capa}" alt="Capa de ${d.titulo} (${d.ano})" loading="lazy">
        </div>
        <div class="disco__meta">
          <h3 class="disco__title">${d.titulo}</h3>
          <p class="disco__info"><strong>${d.ano}</strong>${d.tipo}</p>
        </div>
      </${tagClose}>`;
    }).join("");
  }

  /* ── VÍDEOS · liga se existir, senão respira o poster ──────── */
  function setupVideos() {
    document.querySelectorAll(".media-window").forEach((win) => {
      const video = win.querySelector("video");
      if (!video) return;

      if (REDUCED) {                      // sem autoplay em movimento reduzido
        video.remove();
        return;
      }
      const fail = () => win.classList.add("no-video");
      const ok = () => {
        win.classList.remove("no-video");
        win.classList.add("has-video");
        video.play().catch(() => {});
      };
      video.addEventListener("canplay", ok, { once: true });
      video.addEventListener("error", fail, { once: true });
      const source = video.querySelector("source");
      if (source) source.addEventListener("error", fail, { once: true });
      // enquanto o vídeo não chega (ou não existe), o poster respira
      win.classList.add("no-video");
    });
  }

  /* ── MENU OVERLAY ──────────────────────────────────────────── */
  function setupMenu() {
    const overlay = document.getElementById("menu-overlay");
    const open = document.getElementById("menu-open");
    const close = document.getElementById("menu-close");
    if (!overlay || !open || !close) return;

    const setOpen = (state) => {
      overlay.classList.toggle("is-open", state);
      overlay.setAttribute("aria-hidden", String(!state));
      document.body.style.overflow = state ? "hidden" : "";
    };
    open.addEventListener("click", () => setOpen(true));
    close.addEventListener("click", () => setOpen(false));
    overlay.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ── TOPBAR · fundo ao rolar + link ativo ──────────────────── */
  function setupTopbar() {
    const bar = document.getElementById("topbar");
    if (!bar) return;
    const onScroll = () => bar.classList.toggle("is-scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const links = [...bar.querySelectorAll(".topbar__nav a")];
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const link = map.get(en.target.id);
        if (link && en.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    map.forEach((_, id) => {
      const sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }

  /* ── PRELOADER · entrada poética ───────────────────────────── */
  function runPreloader(done) {
    const pre = document.getElementById("preloader");
    if (!pre) { done(); return; }
    if (REDUCED) {
      pre.classList.add("is-done");
      done();
      return;
    }
    requestAnimationFrame(() => pre.classList.add("is-ready"));
    setTimeout(() => {
      pre.classList.add("is-done");
      done();
    }, 2600);
  }

  /* ── LENIS · rolagem líquida ───────────────────────────────── */
  function setupLenis() {
    if (REDUCED || typeof window.Lenis === "undefined") return null;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    if (HAS_GSAP) lenis.on("scroll", ScrollTrigger.update);

    // âncoras passam pelo lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: 0, duration: 1.6 });
      });
    });
    return lenis;
  }

  /* ── GSAP · cenas da travessia ─────────────────────────────── */
  function setupScenes() {
    if (!HAS_GSAP || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    // no mobile, o colapso da barra de endereço dispara um "resize" que faz o
    // ScrollTrigger recalcular no meio de uma seção pinada (o pin "pisca" e
    // reaparece deslocado); isso evita recalcular por causa desse resize.
    ScrollTrigger.config({ ignoreMobileResize: true });

    /* reveals genéricos */
    document.querySelectorAll(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
    });

    /* hero: título letra a letra + parallax da janela */
    const titleLines = document.querySelectorAll(".hero__title-line");
    titleLines.forEach((line, i) => {
      const text = line.textContent;
      line.innerHTML = [...text].map((ch) =>
        ch === " " ? " " : `<span class="word" style="display:inline-block">${ch}</span>`
      ).join("");
      gsap.from(line.querySelectorAll(".word"), {
        yPercent: 108,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.045,
        delay: 0.15 + i * 0.18,
      });
    });
    gsap.to(".hero__media", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero__glow", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    /* cura: sequência de frases + planeta que cresce (pinned) */
    const curaLines = gsap.utils.toArray(".cura__line");
    if (curaLines.length) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cura__pin",
          start: "top top",
          end: "+=2600",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(".cura__planet-core", { scale: 0.55, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 3 }, 0)
        .fromTo(".cura__planet-ring", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 3 }, 0);
      curaLines.forEach((line, i) => {
        const at = i * 1.05 + 0.2;
        tl.fromTo(line, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55 }, at);
        if (i < curaLines.length - 1) {
          tl.to(line, { opacity: 0, y: -30, duration: 0.45 }, at + 0.75);
        }
      });
      tl.to({}, { duration: 0.4 });   // respiro final com o título em cena
    }

    /* água: título líquido ondula + palavras entram */
    const turb = document.getElementById("liquid-turb");
    if (turb) {
      let liquidActive = false;
      gsap.ticker.add((time) => {
        if (!liquidActive) return;
        const f1 = 0.011 + Math.sin(time * 0.5) * 0.004;
        const f2 = 0.038 + Math.cos(time * 0.35) * 0.008;
        turb.setAttribute("baseFrequency", `${f1.toFixed(4)} ${f2.toFixed(4)}`);
      });
      ScrollTrigger.create({
        trigger: ".agua",
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => { liquidActive = self.isActive; },
      });
    }
    gsap.from(".agua__words li", {
      opacity: 0,
      y: 18,
      stagger: 0.12,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: ".agua__words", start: "top 85%" },
    });
    gsap.fromTo(".agua__title", { scale: 0.94 }, {
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: ".agua", start: "top bottom", end: "center center", scrub: true },
    });

    /* rio do tempo: horizontal pinado (desktop) */
    if (!MOBILE) {
      const track = document.getElementById("rio-track");
      if (track) {
        const getDist = () => track.scrollWidth - window.innerWidth;
        const rioTween = gsap.to(track, {
          x: () => -getDist(),
          ease: "none",
          scrollTrigger: {
            trigger: ".rio__pin",
            start: "top top",
            end: () => "+=" + getDist(),
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray(".rio-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0.25,
            y: 34,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              containerAnimation: rioTween,
              start: "left 92%",
            },
          });
        });
      }
    }

    /* círculo: fotos-satélite convergem para a roda */
    const sats = gsap.utils.toArray(".circulo__sat");
    if (sats.length) {
      gsap.to(sats, {
        opacity: 0.92,
        stagger: 0.25,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".circulo__stage", start: "top 70%" },
      });
      sats.forEach((sat, i) => {
        gsap.to(sat, {
          y: (i % 2 ? -1 : 1) * 18,
          ease: "none",
          scrollTrigger: { trigger: ".circulo", start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });
    }

    /* raio: media flutua e o título ganha brilho ao entrar */
    gsap.from(".raio__media", {
      y: 70,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: { trigger: ".raio__media", start: "top 85%" },
    });
    gsap.to(".raio__media", {
      y: -26,
      ease: "none",
      scrollTrigger: { trigger: ".raio", start: "top bottom", end: "bottom top", scrub: 1 },
    });

    /* fim: a frase final usa o reveal genérico (evita tween duplicado) */
  }

  /* ── INÍCIO ────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    buildDiscos();
    setupVideos();
    setupMenu();
    setupTopbar();
    setupLenis();

    runPreloader(() => {
      document.body.classList.add("is-loaded");
      setupScenes();
      if (HAS_GSAP && !REDUCED) {
        ScrollTrigger.refresh();
        // fontes e imagens que terminam de carregar depois do preloader podem
        // mudar a altura das seções acima da Cura; um refresh tardio evita que
        // o pin fique com posição desatualizada.
        window.addEventListener("load", () => ScrollTrigger.refresh());
        setTimeout(() => ScrollTrigger.refresh(), 1200);
      }
    });
  });
})();
