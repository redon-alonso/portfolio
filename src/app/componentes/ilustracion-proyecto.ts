import { Component, input } from '@angular/core';

/**
 * Ilustración esquemática de cada proyecto (decorativa).
 * Los colores van en clases y no en atributos: `stroke="var(--accent)"` no es válido como atributo de presentación.
 */
@Component({
  selector: 'app-ilustracion-proyecto',
  host: { 'aria-hidden': 'true' },
  template: `
    @switch (slug()) {
      @case ('transcriptor') {
        <svg viewBox="0 0 420 320" class="ancha" focusable="false">
          <g class="mono texto-tenue">
            <text x="0" y="22">para i ← 1 hasta n</text>
            <text x="16" y="44">para j ← i hasta n</text>
            <text x="32" y="66">s ← s + a[j]</text>
            <text x="0" y="88">fin</text>
          </g>
          <path class="tenue" d="M150 50 L190 50" />
          <rect class="tinta" x="200" y="10" width="120" height="34" rx="17" />
          <text class="mono texto-tinta" x="260" y="32" text-anchor="middle">inicio</text>
          <path class="tenue" d="M260 44 V70" />
          <polygon class="acento" points="260,70 312,100 260,130 208,100" />
          <text class="mono texto-acento" x="260" y="104" text-anchor="middle">i ≤ n</text>
          <path class="tenue" d="M260 130 V156" />
          <rect class="tinta" x="205" y="156" width="110" height="36" rx="6" />
          <text class="mono texto-tinta" x="260" y="179" text-anchor="middle">s ← s + a[j]</text>
          <path class="tenue" d="M315 174 H350 V100 H312" />
          <path class="tenue" d="M260 192 V218" />
          <rect class="tinta" x="200" y="218" width="120" height="34" rx="17" />
          <text class="mono texto-tinta" x="260" y="240" text-anchor="middle">fin</text>
          <rect class="relleno-acento" x="0" y="232" width="150" height="76" rx="12" />
          <text class="mono texto-fondo" x="14" y="258" font-size="11">T(n) = n(n+1)/2</text>
          <text class="texto-fondo" x="14" y="290" font-size="26" font-weight="700">Θ(n²)</text>
        </svg>
      }
      @case ('motor-packing') {
        <svg viewBox="0 0 360 200" focusable="false">
          <path class="borde" d="M20 150 L180 70 L340 150 L180 190 Z" />
          <g class="tinta caja">
            <path d="M120 120 L160 100 L200 120 L160 140 Z" />
            <path d="M120 120 V150 L160 170 V140 Z" />
            <path d="M160 140 V170 L200 150 V120 Z" />
          </g>
          <g class="acento caja">
            <path d="M170 95 L210 75 L250 95 L210 115 Z" />
            <path d="M170 95 V125 L210 145 V115 Z" />
            <path d="M210 115 V145 L250 125 V95 Z" />
          </g>
          <g class="tinta caja">
            <path d="M120 90 L160 70 L200 90 L160 110 Z" />
            <path d="M120 90 V120 L160 140 V110 Z" opacity="0.5" />
          </g>
          <g class="mono texto-tenue" font-size="11">
            <text x="24" y="40">puerta · 1.ª entrega</text>
            <text x="246" y="40">cabina · última</text>
          </g>
        </svg>
      }
      @case ('presupuestos-pvc') {
        <svg viewBox="0 0 360 210" focusable="false">
          <rect class="tinta grueso" x="70" y="20" width="130" height="160" />
          <rect class="tinta fino" x="84" y="34" width="102" height="132" />
          <path class="acento fino" d="M84 166 L186 100 L84 34" stroke-dasharray="5 4" />
          <path class="tenue fino" d="M84 34 L135 166 L186 34" stroke-dasharray="3 4" />
          <path class="tenue fino" d="M70 192 H200" />
          <text class="mono texto-tenue" x="135" y="206" text-anchor="middle" font-size="10">1200 mm</text>
          <g class="mono" font-size="11">
            <text class="texto-tenue" x="226" y="60">coste</text>
            <text class="texto-tinta" x="226" y="78">412,00 €</text>
            <text class="texto-tenue" x="226" y="108">precio</text>
            <text class="texto-tinta" x="226" y="126">528,39 €</text>
            <text class="texto-tenue" x="226" y="156">margen · 22 %</text>
          </g>
          <rect class="relleno-linea" x="226" y="164" width="110" height="8" rx="4" />
          <rect class="relleno-acento" x="226" y="164" width="24" height="8" rx="4" />
        </svg>
      }
      @case ('saturno') {
        <svg viewBox="0 0 360 200" focusable="false">
          <text class="mono texto-tenue" x="10" y="22" font-size="11">septiembre · ciclo 26/27</text>
          @for (d of dias; track $index) {
            <rect [attr.x]="d.x" [attr.y]="d.y" width="26" height="20" rx="4" [class]="d.clase" />
          }
          <circle class="tinta" cx="296" cy="64" r="20" />
          <ellipse class="acento" cx="296" cy="64" rx="42" ry="9" transform="rotate(-18 296 64)" />
          <g class="mono" font-size="11">
            <text class="texto-tenue" x="250" y="124">saldo</text>
            <text class="texto-tinta" x="250" y="142">25,89 días</text>
            <text class="texto-tenue" x="250" y="172">disfrutable · 25</text>
          </g>
        </svg>
      }
    }
  `,
  styles: `
    :host { display: flex; align-items: center; justify-content: center; width: 100%; }
    /* El tamaño va en el svg (heredado) para que los atributos font-size de cada texto lo puedan cambiar */
    svg { width: 100%; max-width: 400px; overflow: visible; font-size: 12px; }
    svg.ancha { max-width: 460px; }
    text { font-family: var(--f-mono); }
    text[font-weight] { font-family: var(--f-texto); }
    path, rect, polygon, circle, ellipse { fill: none; stroke-width: 1.5; }
    .dia { stroke: var(--line-strong); stroke-width: 1; }
    .finde { fill: var(--line-soft); stroke: none; }
    .pendiente { stroke: var(--accent); stroke-width: 1.2; stroke-dasharray: 3 3; }
    .tinta { stroke: var(--text); }
    .acento { stroke: var(--accent); }
    .tenue { stroke: var(--line-hover); }
    .borde { stroke: var(--line-strong); }
    .caja path { fill: var(--surface-2); }
    .grueso { stroke-width: 2; }
    .fino { stroke-width: 1.2; }
    .relleno-acento { fill: var(--accent); stroke: none; }
    .relleno-linea { fill: var(--line); stroke: none; }
    .texto-tinta { fill: var(--text); }
    .texto-tenue { fill: var(--muted); }
    .texto-acento { fill: var(--accent); }
    .texto-fondo { fill: var(--bg); }
  `,
})
export class IlustracionProyecto {
  readonly slug = input.required<string>();

  /** Saturno: cinco semanas de lunes a domingo, con una semana de vacaciones aprobada y un día pendiente. */
  protected readonly dias = Array.from({ length: 35 }, (_, d) => ({
    x: 10 + (d % 7) * 30,
    y: 36 + Math.floor(d / 7) * 26,
    clase: d >= 14 && d <= 18 ? 'relleno-acento' : d % 7 >= 5 ? 'finde' : d === 24 ? 'pendiente' : 'dia',
  }));
}
