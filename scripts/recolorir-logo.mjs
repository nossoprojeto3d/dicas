// Recolore a logo dourada NP para a cor do Dicas (framboesa), preservando o relevo metálico:
// cada pixel vira um tom do degradê conforme a luminosidade original. Gera também os ícones.
// Uso (precisa do sharp; o do catálogo serve): node scripts/recolorir-logo.mjs <logo-dourada.png>
import sharp from 'sharp';

const [, , origem = 'scripts/logo-original-dourada.png'] = process.argv;
const PARADAS = [
  [0.0, [74, 10, 34]],     // sombra
  [0.45, [150, 24, 70]],   // tom médio
  [0.78, [194, 37, 92]],   // framboesa (acento #C2255C)
  [1.0, [255, 205, 222]],  // brilho
];

function tom(t){
  for(let i = 1; i < PARADAS.length; i++){
    const [p1, c1] = PARADAS[i];
    const [p0, c0] = PARADAS[i - 1];
    if(t <= p1){
      const k = (t - p0) / (p1 - p0);
      return c0.map((v, j) => Math.round(v + (c1[j] - v) * k));
    }
  }
  return PARADAS.at(-1)[1];
}

const { data, info } = await sharp(origem).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let min = 1, max = 0;
const lum = new Float32Array(info.width * info.height);
for(let i = 0, p = 0; i < data.length; i += 4, p++){
  const l = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
  lum[p] = l;
  if(data[i + 3] > 200){ min = Math.min(min, l); max = Math.max(max, l); }
}
for(let i = 0, p = 0; i < data.length; i += 4, p++){
  const t = Math.min(1, Math.max(0, (lum[p] - min) / (max - min)));
  const [r, g, b] = tom(t);
  data[i] = r; data[i + 1] = g; data[i + 2] = b;
}
const recolorida = sharp(data, { raw: info });
await recolorida.clone().png({ compressionLevel: 9 }).toFile('logo.png');
await recolorida.clone().resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 246, g: 244, b: 239, alpha: 1 } })
  .flatten({ background: { r: 246, g: 244, b: 239 } }).png().toFile('apple-touch-icon.png');
for (const n of [32, 64]) await recolorida.clone().resize(n, n, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`favicon-${n}.png`);
console.log('Logo recolorida:', info.width, 'x', info.height);
