import { DestroyRef, DOCUMENT, inject, Service } from '@angular/core';
import { CONTACTO, SITIO } from '../datos/perfil';

@Service()
export class DatosEstructurados {
  private readonly doc = inject(DOCUMENT);

  /** Inserta (o reemplaza) un bloque JSON-LD y lo quita cuando se destruye la página que lo pidió. */
  poner(id: string, datos: Record<string, unknown>, destroyRef?: DestroyRef) {
    let s = this.doc.head.querySelector<HTMLScriptElement>(`script[data-ld="${id}"]`);
    if (!s) {
      s = this.doc.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-ld', id);
      this.doc.head.appendChild(s);
    }
    // textContent + escapar "<": un dato con "</script>" no puede romper la página.
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', ...datos }).replace(/</g, '\\u003c');
    destroyRef?.onDestroy(() => this.doc.head.querySelector(`script[data-ld="${id}"]`)?.remove());
  }

  persona() {
    return {
      '@type': 'Person',
      '@id': `${SITIO.url}/#persona`,
      name: SITIO.nombre,
      url: SITIO.url,
      jobTitle: 'Desarrollador web',
      knowsAbout: ['Desarrollo web', 'Lenguajes formales', 'Análisis de sistemas', 'Algoritmos', 'Angular', 'Vue'],
      alumniOf: [
        { '@type': 'EducationalOrganization', name: 'Universitat de València' },
        { '@type': 'EducationalOrganization', name: 'Florida Universitària' },
      ],
      sameAs: [CONTACTO.github, CONTACTO.linkedin].filter(Boolean),
    };
  }
}
