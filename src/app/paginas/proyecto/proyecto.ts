import { Component, computed, DestroyRef, effect, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PROYECTOS, SITIO } from '../../datos/perfil';
import { Seo } from '../../core/seo';
import { DatosEstructurados } from '../../core/datos-estructurados';
import { IlustracionPacking } from '../../componentes/ilustracion-packing';
import NoEncontrada from '../no-encontrada/no-encontrada';

@Component({
  selector: 'app-proyecto',
  imports: [NgOptimizedImage, RouterLink, IlustracionPacking, NoEncontrada],
  templateUrl: './proyecto.html',
  styleUrl: './proyecto.css',
})
export default class Proyecto {
  readonly slug = input.required<string>();
  protected readonly proyecto = computed(() => PROYECTOS.find((p) => p.slug === this.slug()));
  protected readonly otro = computed(() => PROYECTOS.find((p) => p.slug !== this.slug()));

  constructor() {
    const seo = inject(Seo);
    const ld = inject(DatosEstructurados);
    const destroyRef = inject(DestroyRef);
    effect(() => {
      const p = this.proyecto();
      if (!p) return;
      seo.aplicar({ titulo: `${p.nombre}: caso de estudio`, descripcion: p.resumen, ruta: `/proyectos/${p.slug}` });
      ld.poner(
        'proyecto',
        {
          '@type': 'SoftwareApplication',
          name: p.nombre,
          description: p.resumen,
          url: p.demo,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web',
          author: { '@id': `${SITIO.url}/#persona`, '@type': 'Person', name: SITIO.nombre },
          ...(p.codigo ? { sameAs: [p.codigo] } : {}),
        },
        destroyRef,
      );
    });
  }
}
