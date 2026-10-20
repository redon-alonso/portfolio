import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticuloMeta } from '../blog/modelo';
import { fechaCorta } from '../blog/fecha';

@Component({
  selector: 'app-lista-articulos',
  imports: [RouterLink],
  template: `
    @if (articulos().length) {
      <ol class="lista" role="list">
        @for (a of articulos(); track a.slug) {
          <li class="revela">
            <a class="fila" [routerLink]="['/blog', a.slug]">
              <span class="datos">
                <time [attr.datetime]="a.fecha">{{ fecha(a.fecha) }}</time> · {{ a.minutos }} min
              </span>
              <div class="texto">
                <h3>{{ a.titulo }}</h3>
                <p class="descripcion">{{ a.descripcion }}</p>
                @if (conEtiquetas()) {
                  <span class="chips">
                    @for (e of a.etiquetas; track e) { <span class="chip">{{ e }}</span> }
                  </span>
                }
              </div>
              <span class="flecha" aria-hidden="true">↗</span>
            </a>
          </li>
        }
      </ol>
    } @else {
      <p class="vacio">Pronto habrá artículos aquí.</p>
    }
  `,
  styles: `
    .lista { padding: 0; list-style: none; border-top: 1px solid var(--line); }
    li { border-bottom: 1px solid var(--line); }
    .fila {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px 32px;
      padding: 32px 8px;
      transition: padding-left 0.3s, background-color 0.3s;
    }
    .fila:hover { padding-left: 20px; background: #15171c; color: var(--text); }
    .datos { flex: 0 0 150px; font-family: var(--f-mono); font-size: 0.8125rem; color: var(--muted); }
    .texto { flex: 1 1 400px; min-width: 0; }
    h3 { font-size: clamp(1.5rem, 1rem + 1.6vw, 2.25rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.15; }
    .descripcion { display: block; margin-top: 8px; max-width: 70ch; font-size: 1rem; line-height: 1.5; color: var(--muted); }
    .texto .chips { margin-top: 14px; }
    .flecha { font-size: 2rem; line-height: 1; color: var(--accent); transition: transform 0.3s var(--ease); }
    .fila:hover .flecha { transform: translate(4px, -4px); }
    .vacio { color: var(--muted); }
    @media (max-width: 40rem) {
      .fila { gap: 10px; padding-block: 26px; }
      .flecha { display: none; }
    }
  `,
})
export class ListaArticulos {
  readonly articulos = input.required<ArticuloMeta[]>();
  readonly conEtiquetas = input(false);
  protected readonly fecha = fechaCorta;
}
