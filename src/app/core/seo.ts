import { DOCUMENT, inject, Service } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITIO } from '../datos/perfil';

export interface DatosSeo {
  titulo: string;
  descripcion: string;
  ruta: string;
  tipo?: 'website' | 'article' | 'profile';
  imagen?: string;
  /** Para artículos: AAAA-MM-DD */
  publicado?: string;
}

@Service()
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  aplicar({ titulo, descripcion, ruta, tipo = 'website', imagen = '/og.png', publicado }: DatosSeo) {
    const url = new URL(ruta, SITIO.url).href;
    // Con la marca detrás si cabe en ~60 caracteres (lo que muestra Google); si no, solo el título.
    const conMarca = `${titulo} · ${SITIO.nombre}`;
    const completo = ruta === '/' || conMarca.length > 62 ? titulo : conMarca;

    this.title.setTitle(completo);
    this.meta.updateTag({ name: 'description', content: descripcion });
    this.meta.updateTag({ property: 'og:title', content: completo });
    this.meta.updateTag({ property: 'og:description', content: descripcion });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: tipo });
    this.meta.updateTag({ property: 'og:image', content: new URL(imagen, SITIO.url).href });
    this.meta.updateTag({ property: 'og:locale', content: SITIO.idioma });
    this.meta.updateTag({ property: 'og:site_name', content: SITIO.nombre });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    if (publicado) {
      this.meta.updateTag({ property: 'article:published_time', content: publicado });
    } else {
      this.meta.removeTag('property="article:published_time"');
    }
    this.meta.removeTag('name="robots"'); // la 404 pone noindex; ninguna otra página debe heredarlo
    this.canonical(url);
  }

  private canonical(url: string) {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }
}
