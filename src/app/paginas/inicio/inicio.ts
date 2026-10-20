import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CIFRAS, CONTACTO, FORMACION, MARQUESINA, PRINCIPIOS, PROYECTOS, SITIO, TRAYECTORIA } from '../../datos/perfil';
import { ARTICULOS } from '../../blog/generado/indice';
import { Seo } from '../../core/seo';
import { DatosEstructurados } from '../../core/datos-estructurados';
import { TerminalDerivacion } from '../../componentes/terminal-derivacion';
import { IlustracionProyecto } from '../../componentes/ilustracion-proyecto';
import { ListaArticulos } from '../../componentes/lista-articulos';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, TerminalDerivacion, IlustracionProyecto, ListaArticulos],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export default class Inicio {
  protected readonly sitio = SITIO;
  protected readonly proyectos = PROYECTOS;
  /** «Transcriptor | MotorPacking | …»: los nombres como símbolos de la gramática. */
  protected readonly reglaProyectos = PROYECTOS.map((p) => p.nombre.replace(/\s+/g, '')).join(' | ');
  protected readonly cifras = CIFRAS;
  protected readonly marquesina = MARQUESINA;
  protected readonly principios = PRINCIPIOS;
  /** Cada paso del método tiene su tarjeta: acento, clara y oscura. */
  protected readonly estilosMetodo = ['paso-acento', 'paso-claro', 'paso-oscuro'];
  protected readonly fasesMetodo = ['modelo →', 'código →', 'producción ✓'];
  protected readonly grupos = [
    { nombre: 'experiencia*', etapas: TRAYECTORIA },
    { nombre: 'formación*', etapas: FORMACION },
  ];
  protected readonly contacto = CONTACTO;
  protected readonly ultimos = ARTICULOS.slice(0, 3);

  constructor() {
    inject(Seo).aplicar({
      titulo: 'Víctor Alonso Gómez · Desarrollador web y analista de sistemas',
      descripcion: SITIO.descripcion,
      ruta: '/',
      tipo: 'profile',
    });
    const ld = inject(DatosEstructurados);
    ld.poner(
      'inicio',
      {
        '@type': 'ProfilePage',
        url: SITIO.url,
        name: SITIO.nombre,
        mainEntity: ld.persona(),
      },
      inject(DestroyRef),
    );
  }
}
