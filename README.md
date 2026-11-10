# Dicas Nosso Projeto 3D

Biblioteca da série #dicasnossoprojeto3d, publicada pelo GitHub Pages.

- `dicas.json`: todas as dicas (número, título, tema, gancho do reel, ajustes, por quê)
- `index.html`: a página

## Identidade

Cada projeto da casa tem a sua cor; a do Dicas é **framboesa** (`--accent` #C2255C no claro, #FF5C8D no escuro, com o marca-texto rosa-claro). A logo NP fica na mesma cor:

- `node scripts/recolorir-logo.mjs scripts/logo-original-dourada.png` gera `logo.png`, `favicon-32.png`, `favicon-64.png` e `apple-touch-icon.png` (precisa do `sharp`; dá para usar o do catálogo).
- `scripts/og-image.html` é a fonte da prévia do WhatsApp (`og-image.jpg`, 1200×630). Trocou a imagem: aumente o `?v=` do `og:image` no `index.html`.
