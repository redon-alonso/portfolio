import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROYECTOS } from './datos/perfil';
import { ARTICULOS } from './blog/generado/indice';

// Todo se genera como HTML estático en la build (outputMode: "static").
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'proyectos/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROYECTOS.map((p) => ({ slug: p.slug })),
  },
  { path: 'blog', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => ARTICULOS.map((a) => ({ slug: a.slug })),
  },
  // /404 se prerenderiza y postbuild la copia a 404.html, que Vercel sirve para cualquier ruta desconocida.
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
