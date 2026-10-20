import { Component, computed, DestroyRef, effect, inject, input, resource } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ARTICULOS, CARGAR_ARTICULO } from '../../blog/generado/indice';
import { fechaLarga } from '../../blog/fecha';
import { SITIO } from '../../datos/perfil';
import { Seo } from '../../core/seo';
import { DatosEstructurados } from '../../core/datos-estructurados';
import NoEncontrada from '../no-encontrada/no-encontrada';

@Component({
  selector: 'app-articulo',
  imports: [RouterLink, NoEncontrada],
  templateUrl: './articulo.html',
  styleUrl: './articulo.css',
})
export default class Articulo {
  readonly slug = input.required<string>();

  protected readonly posicion = computed(() => ARTICULOS.findIndex((a) => a.slug === this.slug()));
  protected readonly meta = computed(() => ARTICULOS[this.posicion()]);
  /** La lista está ordenada de más nuevo a más antiguo. */
  protected readonly anterior = computed(() => ARTICULOS[this.posicion() + 1]);
  protected readonly siguiente = computed(() => (this.posicion() > 0 ? ARTICULOS[this.posicion() - 1] : undefined));
  /** El titular va en dos pesos: la última palabra, en cursiva ligera. */
  protected readonly titulo = computed(() => {
    const palabras = (this.meta()?.titulo ?? '').split(' ');
    return { inicio: palabras.slice(0, -1).join(' '), final: palabras.at(-1) ?? '' };
  });

  private readonly sanitizer = inject(DomSanitizer);

  // El HTML sale de scripts/build-blog.mjs a partir de los .md de este repositorio: es tan de confianza
  // como el propio código. Se marca como seguro para conservar los id de los títulos (el índice los usa),
  // que el saneador de Angular quitaría. Si algún día los artículos vienen de fuera, hay que sanearlos.
  protected readonly cuerpo = resource({
    params: () => this.slug(),
    loader: async ({ params }): Promise<{ html: SafeHtml; indice: { id: string; texto: string }[] } | undefined> => {
      const c = await CARGAR_ARTICULO[params]?.();
      return c && { html: this.sanitizer.bypassSecurityTrustHtml(c.html), indice: c.indice };
    },
  });

  protected readonly fecha = fechaLarga;

  constructor() {
    const seo = inject(Seo);
    const ld = inject(DatosEstructurados);
    const destroyRef = inject(DestroyRef);
    effect(() => {
      const a = this.meta();
      if (!a) return;
      const url = `${SITIO.url}/blog/${a.slug}`;
      seo.aplicar({ titulo: a.titulo, descripcion: a.descripcion, ruta: `/blog/${a.slug}`, tipo: 'article', publicado: a.fecha });
      ld.poner(
        'articulo',
        {
          '@type': 'BlogPosting',
          headline: a.titulo,
          description: a.descripcion,
          datePublished: a.fecha,
          inLanguage: 'es',
          keywords: a.etiquetas.join(', '),
          url,
          mainEntityOfPage: url,
          author: { '@type': 'Person', '@id': `${SITIO.url}/#persona`, name: SITIO.nombre, url: SITIO.url },
          image: `${SITIO.url}/og.png`,
        },
        destroyRef,
      );
    });
  }
}
