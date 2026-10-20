import { Component, computed, DestroyRef, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROYECTOS, SITIO } from '../../datos/perfil';
import { Seo } from '../../core/seo';
import { DatosEstructurados } from '../../core/datos-estructurados';
import { IlustracionProyecto } from '../../componentes/ilustracion-proyecto';
import NoEncontrada from '../no-encontrada/no-encontrada';

@Component({
  selector: 'app-proyecto',
  imports: [RouterLink, IlustracionProyecto, NoEncontrada],
  templateUrl: './proyecto.html',
  styleUrl: './proyecto.css',
})
export default class Proyecto {
  readonly slug = input.required<string>();
  protected readonly indice = computed(() => PROYECTOS.findIndex((p) => p.slug === this.slug()));
  protected readonly proyecto = computed(() => PROYECTOS[this.indice()]);
  /** El siguiente de la lista; después del último vuelve al primero. */
  protected readonly otro = computed(() => PROYECTOS[(this.indice() + 1) % PROYECTOS.length]);
  /** «Motor Packing» → «MotorPacking», como símbolo de la gramática. */
  protected readonly simbolo = computed(() => this.proyecto()?.nombre.replace(/\s+/g, ''));

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
