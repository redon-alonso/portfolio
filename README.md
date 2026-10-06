# Portfolio de Víctor Alonso Gómez

Portfolio y blog de desarrollos. Angular 22, prerenderizado a HTML estático (sin servidor), pensado para Vercel.

## Uso

```bash
npm install
npm start            # desarrollo en http://localhost:4200 (regenera el blog antes de arrancar)
npm run blog:watch   # en otra terminal: regenera el blog cada vez que guardas un .md
npm run build        # genera dist/portfolio/browser (HTML estático de todas las páginas)
npm run preview      # sirve la build para revisarla como en producción
```

## Escribir en el blog

1. Copia `content/blog/_plantilla.md` y renómbralo, por ejemplo `mi-articulo.md` → URL `/blog/mi-articulo`.
2. Rellena la cabecera (`titulo`, `descripcion`, `fecha` AAAA-MM-DD, `etiquetas`) y pon `borrador: false`.
3. Escribe en Markdown. Los bloques de código se resaltan en la build (` ```ts `, ` ```pseudo ` para el pseudocódigo de Transcriptor…).
4. `npm run build` (o publica): el artículo, `sitemap.xml` y `rss.xml` se generan solos.

Si falta un campo o la fecha está mal, la build se detiene y te dice qué archivo arreglar.

## Editar el contenido

Todo lo que no es del blog está en `src/app/datos/perfil.ts`: textos de trayectoria, formación, proyectos y principios.
Lo marcado como `PENDIENTE` se oculta en la web hasta que tenga valor:

- `SITIO.url` — dominio definitivo (canonical, sitemap, RSS, Open Graph).
- `CONTACTO.email` y `CONTACTO.linkedin` — aparecen en Contacto y en el pie cuando los rellenas.
- Motor Packing — `codigo`, `imagen` y `secciones` del caso de estudio.

## Publicar en Vercel

Importa el repositorio en Vercel; `vercel.json` ya indica el comando de build y la carpeta de salida.
Las rutas desconocidas muestran `404.html` (generada en `postbuild`).

## Estructura

```
content/blog/            artículos en Markdown
scripts/build-blog.mjs   Markdown → módulos TS + sitemap.xml + rss.xml
src/app/datos/perfil.ts  contenido del portfolio
src/app/core/            SEO (title, meta, canonical, Open Graph) y JSON-LD
src/app/componentes/     piezas reutilizables (gramática del héroe, aristas, línea de tiempo…)
src/app/paginas/         inicio, proyecto, blog, artículo y 404
```
