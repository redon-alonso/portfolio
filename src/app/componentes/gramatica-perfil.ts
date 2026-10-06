import { Component } from '@angular/core';

// Formas generadas con angular-paginas-modernas/scripts/blob.mjs --seed 11 --points 7 --variance 0.2 --size 600 --frames 3.
// Semilla fija: el servidor y el navegador pintan exactamente lo mismo.
const F1 =
  'M541.4 300.6C540.8 365.9 499.9 456.3 447.7 494.7C395.4 533 286.9 542.4 227.8 530.8C168.8 519.2 116.5 481.3 93.3 424.8C70 368.3 63.7 254.2 88.5 191.8C113.2 129.3 181.3 65 241.8 50.2C302.3 35.4 401.3 61.5 451.2 103.2C501.2 145 542 235.4 541.4 300.6Z';
const F2 =
  'M533.1 322.5C536.7 387.3 517.4 445.2 465.8 478.1C414.2 510.9 289.8 529.9 223.4 519.6C157.1 509.3 87.5 469.4 67.7 416.3C47.9 363.1 74.5 257.4 104.4 200.7C134.3 144 190.3 94.8 247 76.2C303.6 57.6 396.6 48 444.3 89.1C492 130.1 529.6 257.7 533.1 322.5Z';
const F3 =
  'M532 274.7C529.7 337.7 488 463.4 437.5 505.2C386.9 547 288.4 537.9 228.5 525.3C168.5 512.6 98.1 484.5 77.7 429.4C57.4 374.2 80.9 252.6 106.4 194.1C131.9 135.7 173.3 89.9 230.7 78.8C288.2 67.6 401.2 94.4 451.4 127.1C501.6 159.7 534.3 211.6 532 274.7Z';

@Component({
  selector: 'app-gramatica-perfil',
  template: `
    <figure>
      <svg class="forma animada" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
        <path [attr.d]="f1">
          <animate attributeName="d" dur="14s" repeatCount="indefinite" calcMode="spline"
            keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1" [attr.values]="valores" />
        </path>
      </svg>
      <svg class="forma estatica" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
        <path [attr.d]="f1" />
      </svg>

      <div class="tarjeta">
        <p class="cabeza" aria-hidden="true"><span></span><span></span><span></span> perfil.bnf</p>
        <pre><code><span class="nt">perfil</span>        <span class="op">::=</span> <span class="nt">analista</span> <span class="t">"·"</span> <span class="nt">desarrollador</span>

<span class="nt">analista</span>      <span class="op">::=</span> <span class="t">"lenguajes formales"</span>
              <span class="op">|</span> <span class="t">"análisis de sistemas"</span>
              <span class="op">|</span> <span class="t">"problemas complejos"</span>

<span class="nt">desarrollador</span> <span class="op">::=</span> <span class="t">producción</span><span class="c">{{ '{' }}3 años{{ '}' }}</span> <span class="op">→</span> <span class="t">transformación</span>

<span class="nt">proyectos</span>     <span class="op">::=</span> <span class="t">Transcriptor</span> <span class="op">|</span> <span class="t">MotorPacking</span><span class="cursor"></span></code></pre>
      </div>
      <figcaption class="solo-lectores">
        Mi perfil escrito como una gramática: analista de lenguajes formales, sistemas y problemas complejos, y desarrollador con tres
        años en producción que ahora trabaja en transformación tecnológica.
      </figcaption>
    </figure>
  `,
  styles: `
    figure { position: relative; display: grid; place-items: center; aspect-ratio: 1; padding: clamp(1rem, 5vw, 3.5rem); }
    .forma { position: absolute; inset: 0; width: 100%; height: 100%; fill: var(--c-acento-suave); }
    .estatica { display: none; }
    @media (prefers-reduced-motion: reduce) {
      .animada { display: none; }
      .estatica { display: block; }
    }
    .tarjeta {
      position: relative;
      width: min(100%, 31rem);
      border-radius: var(--radio);
      background: var(--c-codigo);
      color: var(--c-codigo-texto);
      border: 1px solid oklch(100% 0 0 / 0.1);
      box-shadow: var(--sombra);
      rotate: -1.5deg;
      overflow: hidden;
    }
    .cabeza {
      display: flex; align-items: center; gap: 0.35rem;
      padding: 0.6rem 0.9rem;
      border-bottom: 1px solid oklch(100% 0 0 / 0.08);
      font-family: var(--f-mono); font-size: 0.72rem; color: oklch(70% 0.02 268);
    }
    .cabeza span { width: 0.55rem; height: 0.55rem; border-radius: 50%; background: oklch(45% 0.03 268); }
    .cabeza span:first-child { background: oklch(66% 0.17 33); }
    pre { margin: 0; padding: 1rem 1.1rem 1.2rem; overflow-x: auto; font-size: clamp(0.66rem, 0.6rem + 0.3vw, 0.82rem); line-height: 1.7; }
    .nt { color: oklch(80% 0.12 255); }
    .op { color: oklch(66% 0.02 268); }
    .t { color: oklch(84% 0.1 75); }
    .c { color: oklch(76% 0.14 35); }
    .cursor { display: inline-block; width: 0.55em; height: 1.1em; margin-left: 0.15em; vertical-align: -0.2em; background: var(--c-acento); }
    @media (prefers-reduced-motion: no-preference) {
      .cursor { animation: parpadeo 1.1s steps(1) infinite; }
    }
    @keyframes parpadeo { 50% { opacity: 0; } }
  `,
})
export class GramaticaPerfil {
  protected readonly f1 = F1;
  protected readonly valores = [F1, F2, F3, F1].join(';');
}
