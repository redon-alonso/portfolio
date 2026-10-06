import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./paginas/inicio/inicio') },
  { path: 'proyectos/:slug', loadComponent: () => import('./paginas/proyecto/proyecto') },
  { path: 'blog', loadComponent: () => import('./paginas/blog/blog') },
  { path: 'blog/:slug', loadComponent: () => import('./paginas/articulo/articulo') },
  { path: '404', loadComponent: () => import('./paginas/no-encontrada/no-encontrada') },
  { path: '**', loadComponent: () => import('./paginas/no-encontrada/no-encontrada') },
];
