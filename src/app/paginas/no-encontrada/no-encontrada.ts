import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';

@Component({
  selector: 'app-no-encontrada',
  imports: [RouterLink],
  template: `
    <section class="envoltorio">
      <p class="regla">error ::= ruta <span class="tachado">válida</span></p>
      <h1 class="titular">Esta página no está en la <em>gramática</em><span class="cursor" aria-hidden="true">_</span></h1>
      <p class="texto">La dirección no corresponde a ninguna página. Puede que el enlace esté mal o que el contenido se haya movido.</p>
      <p class="acciones">
        <a class="boton acento grande" routerLink="/">Ir al inicio</a>
        <a class="boton grande" routerLink="/blog">Ver el blog</a>
      </p>
    </section>
  `,
  styles: `
    section { padding-top: 96px; }
    h1 { max-width: 14ch; margin-top: 14px; }
    .texto { max-width: 50ch; margin-top: 28px; font-size: 1.1875rem; color: var(--text-2); }
    .acciones { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
    .tachado { text-decoration: line-through 2px; }
    .cursor { color: var(--accent); animation: parpadeo 1s steps(1) infinite; }
    @keyframes parpadeo { 50% { opacity: 0; } }
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
