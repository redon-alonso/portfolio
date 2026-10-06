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
        <p class="regla"><b>‹blog›</b> ::= desarrollo+</p>
        <h1>Blog de desarrollos</h1>
        <p class="intro">
          Lo que construyo y por qué: decisiones técnicas, algoritmos, lenguajes y lo que aprendo por el camino.
          También por <a href="/rss.xml">RSS</a>.
        </p>
      </header>
      <app-lista-articulos [articulos]="articulos" />
    </section>
  `,
  styles: `
    section { padding-top: var(--e-4); }
    header { margin-bottom: var(--e-4); }
    h1 { margin-top: var(--e-2); font-size: var(--t-4); letter-spacing: -0.03em; }
    .intro { margin-top: var(--e-3); max-width: 52ch; font-size: var(--t-1); line-height: 1.45; color: var(--c-suave); }
    .intro a { color: var(--c-acento); }
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
