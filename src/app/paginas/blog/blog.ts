import { Component, DestroyRef, inject } from '@angular/core';
import { ARTICULOS } from '../../blog/generado/indice';
import { SITIO } from '../../datos/perfil';
import { Seo } from '../../core/seo';
import { DatosEstructurados } from '../../core/datos-estructurados';
import { ListaArticulos } from '../../componentes/lista-articulos';

@Component({
  selector: 'app-blog',
  imports: [ListaArticulos],
  template: `
    <section class="envoltorio">
      <header>
        <p class="regla">‹blog› ::= desarrollo+</p>
        <h1 class="titular">Blog de<br /><em>desarrollos</em></h1>
        <p class="intro">
          Lo que construyo y por qué: decisiones técnicas, algoritmos, lenguajes y lo que aprendo por el camino.
          También por <a href="/rss.xml">RSS</a>.
        </p>
      </header>
      <app-lista-articulos [articulos]="articulos" [conEtiquetas]="true" />
    </section>
  `,
  styles: `
    section { padding-top: 72px; }
    header { margin-bottom: 56px; }
    h1 { margin-top: 14px; }
    .intro { max-width: 52ch; margin-top: 28px; font-size: clamp(1.1875rem, 0.95rem + 0.8vw, 1.4375rem); line-height: 1.45; color: var(--text-2); }
    .intro a { color: var(--accent); text-decoration: underline; text-underline-offset: 0.2em; }
    @media (max-width: 40rem) { section { padding-top: 48px; } }
  `,
})
export default class Blog {
  protected readonly articulos = ARTICULOS;

  constructor() {
    inject(Seo).aplicar({
      titulo: 'Blog de desarrollos',
      descripcion:
        'Artículos de Víctor Alonso Gómez sobre lo que construye: algoritmos, lenguajes formales, decisiones técnicas y desarrollo web.',
      ruta: '/blog',
    });
    inject(DatosEstructurados).poner(
      'blog',
      {
        '@type': 'Blog',
        name: `Blog de ${SITIO.nombre}`,
        url: `${SITIO.url}/blog`,
        inLanguage: 'es',
        author: { '@type': 'Person', '@id': `${SITIO.url}/#persona`, name: SITIO.nombre },
        blogPost: ARTICULOS.map((a) => ({
          '@type': 'BlogPosting',
          headline: a.titulo,
          url: `${SITIO.url}/blog/${a.slug}`,
          datePublished: a.fecha,
        })),
      },
      inject(DestroyRef),
    );
  }
}
