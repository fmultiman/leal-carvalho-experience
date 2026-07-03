# Leal Carvalho — O canto que reúne
### Documento de conceito · protótipo experiencial

> Uma vida dedicada a cantar pela paz, pela água e pela cura do planeta.

---

## 1. Visão do conceito

Se o site do Zeque era **entrar numa floresta ritual**, este é **entrar num campo de paz, canto e comunhão**. O visitante não navega: ele faz uma **travessia** — nasce na fonte, atravessa o rio do tempo, senta na roda, olha o céu e volta à água.

A experiência se apoia em cinco eixos simbólicos:

| Eixo | Como aparece no site |
|---|---|
| **Água** | Canvas de superfície viva (hero e encerramento), título líquido com distorção SVG, reflexos sob as "janelas vivas", rolagem fluida (Lenis) |
| **Planeta / Cura** | Seção pinada com planeta que cresce durante o scroll, gradiente noite→verde-água |
| **Canto coletivo** | Seção O Círculo: fotos-satélite convergindo para a roda, partículas douradas (vagalumes) |
| **Reencontro** | Seção noturna violeta, ritmo desacelerado, poema em escada |
| **Cosmos / Raio** | Campo de estrelas com meteoros ocasionais, aurora em blur, título em gradiente cósmico |

**Frase-manifesto:** *O canto que reúne.*
**Frase do encerramento:** *Que o canto nos reúna.*
**Verso do Raio Cósmico** (colhido do próprio universo do Leal — o banner na foto de família): *Todo ser é uma estrela. Acenda a luz que é você.*

### Direção estética
Documentário poético + cinema contemplativo + editorial sofisticado. **Nada de** template de festival, portal religioso, geometria sagrada genérica ou cara de IA.

- **Paleta:** azul-noite d'água `#04101d`, turquesa mineral `#5fc6bf`, dourado solar `#d9a95f`, linho `#f4edde`, musgo `#93a884`, violeta profundo `#120e26` (Reencontro/Raio), terroso leve `#8a6a4f` (Círculo).
- **Tipografia** (via skill UI/UX Pro Max): **Cormorant Garamond** (serifada humana e literária — títulos, manifestos, itálicos poéticos) + **Raleway** (sans leve e discreta — UI, corpo, navegação).
- **Formas:** as molduras de mídia usam arco de portal/gota (border-radius alto no topo) — capela, nascente, porta d'água.

---

## 2. Seções do site (ordem da travessia)

| # | id | Seção | Experiência |
|---|---|---|---|
| 00 | `#preloader` | Abertura poética | "Antes da palavra, existe o canto." + linhas d'água pulsando |
| 01 | `#fonte` | **Hero — A Fonte** | **VÍDEO 1** em janela viva, título letra a letra, água em canvas, gota de scroll |
| 02 | `#cura` | Pela Cura do Planeta | Pinada: 3 frases se sucedem enquanto o planeta cresce (scrub) |
| 03 | `#agua` | Água: a fonte da vida | Título com distorção líquida (feTurbulence animado), ondas, single 2024 |
| 04 | `#rio` | Travessia — rio do tempo | Scroll horizontal pinado (desktop) / snap nativo (mobile): origem → Udiyana → discos → prêmio 2022 |
| 05 | `#reencontro` | Reencontro | Noturna, violeta, foto em prece de perfil, poema em escada |
| 06 | `#circulo` | **O Círculo** | **VÍDEO 2** ao centro; fotos das rodas convergem; vagalumes dourados |
| 07 | `#raio` | **Raio Cósmico** | **VÍDEO 3**; campo de estrelas + meteoros; título em gradiente cósmico |
| 08 | `#discografia` | Discografia | Grade das 6 capas, brilho líquido no hover (dados em `js/data.js`) |
| 09 | `#encontros` | Próximos encontros | Agenda em lista editorial (placeholders "em breve") + CTA e-mail |
| 10 | `#fim` | Encerramento | A água volta; "Que o canto nos reúna."; retorno à fonte |

---

## 3. Os 3 vídeos — plano de produção (Kling)

### Decisão estrutural: a "janela viva"
Todas as fotos disponíveis são **portrait**. Em vez de forçar outpainting para landscape (risco alto de deformar rosto, mãos e violão, e de cara de IA), o site usa **composição híbrida**: o vídeo portrait fica numa moldura central em arco ("janela viva") e o entorno landscape é construído em código — água, névoa, partículas, reflexos, profundidade. 

**Consequências práticas:**
1. Os vídeos podem ser gerados **direto das imagens portrait**, na proporção original (3:4 ou 9:16) — sem inventar corpo, violão ou cenário.
2. A identidade real do Leal é 100% preservada.
3. Enquanto os vídeos não existem, o poster (a própria foto) "respira" com um movimento Ken Burns lento — o site já funciona hoje.

### Onde colocar os arquivos
Basta salvar os MP4 em:

```
assets/video/fonte.mp4      → Vídeo 1 (hero)
assets/video/circulo.mp4    → Vídeo 2 (O Círculo)
assets/video/raio.mp4       → Vídeo 3 (Raio Cósmico)
```

O JS detecta automaticamente: se o arquivo existe, faz fade-in sobre o poster; se não, mantém a foto respirando. Vídeos devem ser **mudos, em loop, 5–10s**, movimento mínimo.

---

### 🎬 Vídeo 1 — A Fonte (`fonte.mp4`)
- **Papel narrativo:** abertura do universo; fonte, origem, paz, escuta.
- **Imagem-base escolhida:** `assets/img/leal-fonte.webp` (*"leal olhando o horizonte com o violao"*).
- **Por que funciona:** perfil contemplativo, violão bem visível e inteiro, luz de manhã estourada ao fundo (fácil de animar como bruma/luz), composição estável com margem à direita. O olhar para o horizonte já "pede" vento e respiração.
- **Movimentos seguros:** brisa no gorro/poncho, brilho da luz de fundo pulsando, folhagem desfocada ao fundo, micro movimento de respiração no tronco, leve push-in de câmera (≤5%).
- **Evitar:** mover dedos/mãos nas cordas (risco de deformação), mudar o rosto, girar a cabeça.

**Prompt base (Kling · image-to-video · 5s ou 10s · modo professional):**
> Cinematic contemplative portrait, an elderly Brazilian musician holding his acoustic guitar, gazing at the horizon in soft golden morning light. Gentle breeze moves the fabric of his knitted poncho, warm haze and bokeh foliage drift slowly in the background, soft light flares breathe. His body rises and falls with a calm, slow breath. Camera pushes in extremely slowly. Serene, meditative, documentary film look, natural film grain.
>
> **Negative:** deformed hands, moving fingers on strings, face distortion, extra limbs, fast motion, camera shake

---

### 🎬 Vídeo 2 — O Círculo (`circulo.mp4`)
- **Papel narrativo:** comunidade, roda, canto coletivo — o coração emocional.
- **Imagem-base escolhida:** `assets/img/leal-circulo.jpg` (*"leal e amigos"*).
- **Por que funciona:** Leal sorrindo ao centro com violão, cercado de músicos e pessoas — a roda **já existe na foto**, ninguém precisa ser inventado. Profundidade natural em camadas (primeiro plano, Leal, mata atrás).
- **Atenção:** é a imagem de menor resolução (480×854). Se o resultado vier mole/borrado, fazer upscale antes (Kling `image_to_image` ou outro upscaler) e regenerar.
- **Movimentos seguros:** balanço sutil dos corpos como quem canta junto, folhagem ao fundo, luz filtrando entre as folhas, leve órbita/parallax de câmera (≤4%).
- **Evitar:** bocas articulando palavras (sync falso), mãos tocando cordas, pessoas novas surgindo.

**Prompt base (Kling · image-to-video · 5s):**
> A joyful circle of musicians and friends gathered outdoors in lush tropical greenery, an elderly Black Brazilian singer at the center smiling with his guitar. Everyone sways very gently together as if singing in unison, dappled sunlight moves through the leaves, soft parallax as the camera drifts slowly sideways. Warm, human, documentary feeling of communion and shared song. Subtle motion only, natural film grain.
>
> **Negative:** lip sync, mouths talking, deformed faces, deformed hands, new people appearing, fast movement

---

### 🎬 Vídeo 3 — O Raio (`raio.mp4`)
- **Papel narrativo:** expansão cósmica com chão humano; clímax poético.
- **Imagem-base escolhida:** `assets/img/leal-raio.jpg` (*"leal em prece olhando pra cima"*).
- **Por que funciona:** mãos em prece sobre o violão, olhar erguido, túnel de árvores com luz atravessando — a foto já tem verticalidade espiritual e pontos de luz reais para animar (sem precisar inventar cosmos artificial).
- **Movimentos seguros:** raios de luz entre as folhas ganhando intensidade, partículas de poeira/pólen subindo em contraluz, folhagem em brisa lenta, leve tilt-up ou push-in de câmera, respiração calma.
- **Evitar:** relâmpagos literais, nebulosas coladas na foto, mudar a pose das mãos em prece.

**Prompt base (Kling · image-to-video · 5s ou 10s):**
> A serene elderly musician seated under a canopy of trees, hands in prayer resting over his guitar, gazing upward. Rays of golden-violet light intensify through the leaves, glowing dust particles float upward in the light beams like tiny stars, foliage sways in slow breeze. The camera tilts up almost imperceptibly. Mystical yet natural, contemplative, cosmic-organic atmosphere, cinematic film look.
>
> **Negative:** lightning bolts, cartoon cosmic effects, face distortion, hand deformation, pose change, oversaturation

---

### Se um dia quisermos versões landscape reais
Buscar/produzir fotos novas: Leal **de longe** à beira d'água (rio/lago, horizonte amplo), roda de canto vista **de cima ou de longe**, céu estrelado com fogueira. Enquadramentos abertos onde o corpo é pequeno no quadro são seguros para vídeo landscape; close portrait não é.

---

## 4. Materiais usados

- `info/bio.txt` → todo o texto do site deriva dela (trajetória, Udiyana Bandha, prêmio 2022, "canto coletivo", "abre espaços de presença").
- `info/imagens/` → hero, círculo, raio, reencontro (prece de perfil), travessia (agradecido, Udiyana), satélites do círculo (cantando com amigos, amigos à noite, festa, família).
- `info/capas/` → travessia + discografia (6 capas, renomeadas para web em `assets/covers/`).

**Placeholders declarados** (trocar quando houver material real):
- E-mail de contato: `contato@lealcarvalho.com.br` (em `#encontros` — CTA "Quero ser avisado").
- Links sociais do rodapé (`#`): Instagram, YouTube, Spotify.
- Agenda: três encontros "em breve".
- Streaming da discografia: preencher `url` em `js/data.js`.

## 5. Arquitetura do código

```
index.html          — as 10 estações + preloader + nav (sem build, abre direto)
css/base.css        — tokens (cores, fontes, ritmo), reset, botões, janela viva, preloader, nav
css/sections.css    — estilos por seção, na ordem da travessia
js/data.js          — discografia (fonte única; aceita url de streaming)
js/effects.js       — canvas: superfície d'água, vagalumes, estrelas (pausam fora da tela)
js/main.js          — preloader, Lenis, GSAP/ScrollTrigger, cenas, fallback de vídeo, menu
assets/img|covers|video
```

- **Bibliotecas por CDN:** GSAP 3.12 + ScrollTrigger, Lenis 1.1. Sem passo de build.
- **`prefers-reduced-motion`:** sem autoplay de vídeo, sem pin/scrub, canvas estático, tudo visível.
- **Sem GSAP (CDN off):** classe `no-gsap` garante conteúdo visível.
- **Mobile:** rio do tempo vira scroll horizontal nativo com snap; janela viva sobe para o topo do hero; satélites do círculo saem de cena.
