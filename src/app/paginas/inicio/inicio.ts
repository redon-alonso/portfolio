import { Component, DestroyRef, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CONTACTO, FORMACION, PRINCIPIOS, PROYECTOS, SITIO, TRAYECTORIA } from '../../datos/perfil';
import { ARTICULOS } from '../../blog/generado/indice';
import { Seo } from '../../core/seo';
import { DatosEstructurados } from '../../core/datos-estructurados';
import { GramaticaPerfil } from '../../componentes/gramatica-perfil';
import { IlustracionPacking } from '../../componentes/ilustracion-packing';
import { ListaArticulos } from '../../componentes/lista-articulos';
import { Arista } from '../../componentes/arista';
import { LineaTiempo } from '../../componentes/linea-tiempo';

@Component({
  selector: 'app-inicio',
  imports: [NgOptimizedImage, RouterLink, GramaticaPerfil, IlustracionPacking, ListaArticulos, Arista, LineaTiempo],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export default class Inicio {
  protected readonly proyectos = PROYECTOS;
  /** «Transcriptor | MotorPacking | …»: los nombres como símbolos de la gramática. */
  protected readonly reglaProyectos = PROYECTOS.map((p) => p.nombre.replace(/\s+/g, '')).join(' | ');
  protected readonly principios = PRINCIPIOS;
  protected readonly trayectoria = TRAYECTORIA;
  protected readonly formacion = FORMACION;
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
