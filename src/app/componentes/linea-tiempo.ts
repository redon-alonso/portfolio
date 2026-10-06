import { Component, input } from '@angular/core';
import { Etapa } from '../datos/perfil';

@Component({
  selector: 'app-linea-tiempo',
  template: `
    <ol role="list">
      @for (e of etapas(); track e.puesto; let primero = $first) {
        <li class="revela" [class.actual]="primero">
          <svg class="nodo" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            <path d="M89.6 49.3C90.4 60.6 81.6 76.4 71.5 82.7C61.3 89.1 38.8 93.3 28.8 87.2C18.8 81.1 11.4 58.4 11.3 46.2C11.2 34 19.2 19.2 28.5 14C37.7 8.7 56.4 9 66.6 14.9C76.8 20.8 88.8 38 89.6 49.3Z" />
          </svg>
          <p class="periodo">{{ e.periodo }}</p>
          <h4>{{ e.puesto }}</h4>
          <p class="lugar">{{ e.lugar }}</p>
          <p class="detalle">{{ e.detalle }}</p>
        </li>
      }
    </ol>
  `,
  styles: `
    ol { list-style: none; padding: 0; }
    li { position: relative; padding: 0 0 var(--e-3) 2.2rem; }
    li::before {
      content: '';
      position: absolute;
      left: 0.55rem;
      top: 1.3rem;
      bottom: 0.2rem;
      border-left: 1.5px dashed var(--c-linea);
    }
    li:last-child::before { display: none; }
    .nodo { position: absolute; left: 0; top: 0.2rem; width: 1.15rem; fill: var(--c-fondo); stroke: var(--c-tinta); stroke-width: 9; }
    .actual .nodo { fill: var(--c-acento); stroke: var(--c-acento); }
    .periodo { font-family: var(--f-mono); font-size: var(--t--1); color: var(--c-suave); }
    h4 { margin-top: 0.25rem; font-family: var(--f-display); font-weight: 400; font-size: var(--t-2); line-height: 1.1; }
    .lugar { margin-top: 0.2rem; font-weight: 600; }
    .detalle { margin-top: 0.5rem; color: var(--c-suave); max-width: 52ch; }
  `,
})
export class LineaTiempo {
  readonly etapas = input.required<Etapa[]>();
}
