import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticuloMeta } from '../blog/modelo';
import { fechaLarga } from '../blog/fecha';

@Component({
  selector: 'app-lista-articulos',
  imports: [RouterLink],
  template: `
    @if (articulos().length) {
      <ol class="lista" role="list">
        @for (a of articulos(); track a.slug) {
          <li class="articulo revela">
            <time [attr.datetime]="a.fecha">{{ fecha(a.fecha) }}</time>
            <div>
              <h3><a [routerLink]="['/blog', a.slug]">{{ a.titulo }}</a></h3>
              <p>{{ a.descripcion }}</p>
              <p class="meta">
                {{ a.minutos }} min de lectura
                @for (e of a.etiquetas; track e) {
                  <span class="chip">{{ e }}</span>
                }
              </p>
            </div>
          </li>
        }
      </ol>
    } @else {
      <p class="vacio">Pronto habrá artículos aquí.</p>
    }
  `,
  styles: `
    .lista { list-style: none; padding: 0; border-top: 1px solid var(--c-linea); }
    .articulo {
      display: grid;
      grid-template-columns: 11rem 1fr;
      gap: var(--e-1) var(--e-3);
      padding-block: var(--e-3);
      border-bottom: 1px solid var(--c-linea);
      position: relative;
    }
    time { font-family: var(--f-mono); font-size: var(--t--1); color: var(--c-suave); padding-top: 0.5rem; }
    h3 { font-size: var(--t-2); }
    h3 a { text-decoration: none; }
    /* Toda la fila es clicable sin anidar enlaces */
    h3 a::after { content: ''; position: absolute; inset: 0; }
    .articulo:hover h3 a { color: var(--c-acento); }
    p { margin-top: 0.5rem; color: var(--c-suave); max-width: 62ch; }
    .meta { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; font-size: var(--t--1); }
    .vacio { color: var(--c-suave); }
    @media (max-width: 40rem) {
      .articulo { grid-template-columns: 1fr; }
      time { padding-top: 0; }
    }
  `,
})
export class ListaArticulos {
  readonly articulos = input.required<ArticuloMeta[]>();
  protected readonly fecha = fechaLarga;
}
