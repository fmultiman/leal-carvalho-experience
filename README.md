# Leal Carvalho — O canto que reúne

Protótipo de landing page imersiva e experiencial para o artista **Leal Carvalho**:
uma travessia em scroll por água, canto coletivo, cura do planeta, reencontro e cosmos.

## Rodar localmente

Não há build. Qualquer servidor estático serve:

```bash
npx serve .
# ou
python -m http.server 8080
```

Abrir `http://localhost:8080` (abrir o `index.html` direto do disco também funciona,
mas um servidor evita restrições de autoplay/CORS).

## Vídeos

O site espera três vídeos (mudos, em loop, 5–10s) em:

```
assets/video/fonte.mp4     — hero (A Fonte)
assets/video/circulo.mp4   — seção O Círculo
assets/video/raio.mp4      — seção Raio Cósmico
```

Enquanto eles não existem, as fotos-base "respiram" (Ken Burns) automaticamente.
Plano completo de produção, imagens-base e prompts para o Kling:
**[docs/leal-site-concept.md](docs/leal-site-concept.md)**.

## Estrutura

```
index.html          seções da travessia
css/base.css        design tokens + componentes
css/sections.css    estilos por seção
js/data.js          discografia (editável)
js/effects.js       atmosferas em canvas
js/main.js          scroll storytelling (GSAP + Lenis)
docs/               conceito e plano dos vídeos
```

## Acessibilidade e performance

- `prefers-reduced-motion` respeitado (sem autoplay, sem pin, canvas estático);
- canvases pausam fora da viewport e limitam DPR;
- imagens abaixo da dobra com `loading="lazy"`;
- funciona sem GSAP/CDN (conteúdo permanece visível).
