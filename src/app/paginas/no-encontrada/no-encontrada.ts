import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';

@Component({
  selector: 'app-no-encontrada',
  imports: [RouterLink],
  template: `
    <section class="envoltorio">
      <p class="regla"><b>error</b> ::= ruta <span class="tachado">válida</span></p>
      <h1>Esta página no está en la gramática.</h1>
      <p>La dirección no corresponde a ninguna página. Puede que el enlace esté mal o que el contenido se haya movido.</p>
      <p class="acciones">
        <a class="boton" routerLink="/">Ir al inicio</a>
        <a class="boton secundario" routerLink="/blog">Ver el blog</a>
      </p>
    </section>
  `,
  styles: `
    section { padding-block: var(--e-5); }
    h1 { margin-top: var(--e-2); font-size: var(--t-4); max-width: 14ch; }
    p:not(.regla) { margin-top: var(--e-3); color: var(--c-suave); max-width: 50ch; }
    .acciones { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .tachado { text-decoration: line-through var(--c-acento) 2px; }
  `,
})
export default class NoEncontrada {
  constructor() {
    inject(Seo).aplicar({
      titulo: 'Página no encontrada',
      descripcion: 'La dirección no corresponde a ninguna página del portfolio de Víctor Alonso Gómez.',
      ruta: '/404',
    });
    inject(Meta).updateTag({ name: 'robots', content: 'noindex' });
  }
}
