// Generates the four profile header SVGs. Run from the repo root: node scripts/headers.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const F = 'font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"';
const themes = {
  dark: { bg: '#111214', border: '#111214', p: '#6e7681', n: '#f0f0ee', s: '#a0a4a8', a: '#f5b14c', kf: '#1c1e21', ks: '#2c2f33' },
  light: { bg: '#f6f7f8', border: '#d0d7de', p: '#6e7781', n: '#1f2328', s: '#57606a', a: '#b8740f', kf: '#eaeef2', ks: '#d0d7de' },
};

function header(t, anim) {
  const keys = [];
  let k = 0;
  for (const ox of [700, 960]) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const y = 92 + r * 46 + [8, 4, 0, 4, 10][c];
        const d = ((k++ * 0.37) % 5.5).toFixed(2);
        const a = anim
          ? `<animate attributeName="fill" values="${t.a};${t.a};${t.kf};${t.kf}" keyTimes="0;0.06;0.14;1" dur="5.5s" begin="${d}s" repeatCount="indefinite"/>` +
            `<animate attributeName="stroke" values="${t.a};${t.a};${t.ks};${t.ks}" keyTimes="0;0.06;0.14;1" dur="5.5s" begin="${d}s" repeatCount="indefinite"/>`
          : '';
        keys.push(`<rect x="${ox + c * 46}" y="${y}" width="40" height="40" rx="6" fill="${t.kf}" stroke="${t.ks}" stroke-width="1.5">${a}</rect>`);
      }
    }
  }
  const blink = anim ? '<animate attributeName="opacity" values="1;0" calcMode="discrete" dur="1.1s" repeatCount="indefinite"/>' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="1200" height="300" role="img" aria-label="Wolffyx">
<rect width="1200" height="300" rx="16" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
<text x="72" y="96" ${F} font-size="20" fill="${t.p}">~/wolffyx $ whoami</text>
<text x="68" y="172" ${F} font-size="76" font-weight="700" letter-spacing="-2" fill="${t.n}">Wolffyx</text>
<text x="72" y="216" ${F} font-size="22" fill="${t.s}">full-stack typescript <tspan fill="${t.a}">/</tspan> firmware <tspan fill="${t.a}">/</tspan> hardware</text>
<rect x="72" y="236" width="12" height="22" fill="${t.a}">${blink}</rect>
${keys.join('\n')}
</svg>
`;
}

mkdirSync('assets', { recursive: true });
for (const [name, t] of Object.entries(themes)) {
  writeFileSync(`assets/header-${name}.svg`, header(t, true));
  writeFileSync(`assets/header-${name}-static.svg`, header(t, false));
}
console.log('Wrote assets/header-{dark,light}[-static].svg');
