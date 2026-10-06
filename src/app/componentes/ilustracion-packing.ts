import { Component } from '@angular/core';

/** Ilustración decorativa: corte lateral de un remolque con bultos colocados. */
@Component({
  selector: 'app-ilustracion-packing',
  template: `
    <svg viewBox="0 0 480 300" role="img" aria-label="Esquema de un remolque con palets colocados: lo que se entrega primero queda junto a la puerta y lo último junto a la cabina">
      <defs>
        <pattern id="rejilla" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" class="rejilla" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="480" height="300" fill="url(#rejilla)" />
      <!-- remolque -->
      <rect x="40" y="60" width="330" height="170" rx="6" class="caja-remolque" />
      <!-- cabina -->
      <path d="M370 120h46c10 0 18 6 22 15l18 40v55H370z" class="cabina" />
      <path d="M386 132h30l14 32h-44z" class="ventana" />
      <!-- bultos -->
      <g class="bultos">
        <rect x="50" y="150" width="96" height="70" rx="3" class="b1" />
        <rect x="50" y="96" width="60" height="50" rx="3" class="b2" />
        <rect x="114" y="110" width="32" height="36" rx="3" class="b3" />
        <rect x="150" y="130" width="70" height="90" rx="3" class="b2" />
        <rect x="150" y="70" width="70" height="56" rx="3" class="b1" />
        <rect x="224" y="176" width="82" height="44" rx="3" class="b3" />
        <rect x="224" y="112" width="52" height="60" rx="3" class="b1" />
        <rect x="280" y="140" width="80" height="32" rx="3" class="b2" />
        <rect x="310" y="176" width="50" height="44" rx="3" class="b1" />
        <rect x="280" y="96" width="40" height="40" rx="3" class="b3 hueco" />
      </g>
      <!-- ruedas -->
      <g class="ruedas">
        <circle cx="96" cy="240" r="20" /><circle cx="146" cy="240" r="20" />
        <circle cx="320" cy="240" r="20" /><circle cx="420" cy="240" r="20" />
      </g>
      <path d="M40 270H460" class="suelo" />
      <text x="40" y="40" class="cota">puerta · 1.ª entrega</text>
      <text x="370" y="40" class="cota" text-anchor="end">cabina · última</text>
      <path d="M44 50H366" class="flecha" />
      <path d="M52 45L44 50L52 55M358 45L366 50L358 55" class="flecha" />
    </svg>
  `,
  styles: `
    svg { width: 100%; height: auto; }
    .rejilla { fill: none; stroke: var(--c-linea); stroke-width: 0.6; }
    .caja-remolque { fill: var(--c-papel); stroke: var(--c-tinta); stroke-width: 2; }
    .cabina { fill: var(--c-tinta); }
    .ventana { fill: var(--c-cobalto-suave); }
    .bultos rect { stroke: var(--c-tinta); stroke-width: 1.5; }
    .b1 { fill: var(--c-acento-suave); }
    .b2 { fill: var(--c-cobalto-suave); }
    .b3 { fill: color-mix(in oklch, var(--c-acento) 55%, var(--c-papel)); }
    .hueco { fill: none; stroke-dasharray: 4 4; stroke: var(--c-acento) !important; }
    .ruedas circle { fill: var(--c-tinta); stroke: var(--c-fondo); stroke-width: 6; }
    .suelo { stroke: var(--c-linea); stroke-width: 2; }
    .cota { font-family: var(--f-mono); font-size: 13px; fill: var(--c-suave); }
    .flecha { fill: none; stroke: var(--c-acento); stroke-width: 1.5; }
    @media (prefers-reduced-motion: no-preference) {
      .hueco { animation: busca 3.2s var(--ease) infinite alternate; }
    }
    @keyframes busca { from { translate: 0 0; } to { translate: -2px 8px; } }
  `,
})
export class IlustracionPacking {}
