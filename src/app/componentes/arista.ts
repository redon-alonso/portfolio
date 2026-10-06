import { Component, input } from '@angular/core';

/**
 * Arista curva entre secciones, como en un diagrama de flujo.
 * Se «dibuja» al hacer scroll donde hay soporte; si no, se ve completa.
 */
@Component({
  selector: 'app-arista',
  template: `
    <svg viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden="true" focusable="false" [class.espejo]="espejo()">
      <path class="trazo" d="M20 0 C 20 60, 180 40, 180 112" />
      <path class="punta" d="M172 104 L180 116 L188 104" />
    </svg>
  `,
  styles: `
    :host { display: block; width: min(100% - 2 * var(--e-3), var(--ancho)); height: clamp(4rem, 3rem + 4vw, 7rem); margin: var(--e-3) auto; }
    svg { width: 100%; height: 100%; overflow: visible; }
    .espejo { scale: -1 1; }
    path { fill: none; stroke: var(--c-linea); stroke-width: 1.5; vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
    .punta { stroke: var(--c-acento); }
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        svg { animation: dibuja linear both; animation-timeline: view(); animation-range: entry 20% cover 50%; }
      }
    }
    @keyframes dibuja { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 -10% 0); } }
  `,
})
export class Arista {
  readonly espejo = input(false);
}
