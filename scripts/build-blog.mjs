#!/usr/bin/env node
// Convierte content/blog/*.md en módulos TypeScript que Angular prerenderiza,
// y genera public/sitemap.xml y public/rss.xml.
// Se ejecuta solo antes de `npm start` y `npm run build`; `npm run blog:watch` lo repite al guardar.
//
// Cada artículo es un .md con cabecera:
//   ---
//   titulo: Cómo hice X
//   descripcion: Una o dos frases para Google y para la lista del blog (120-160 caracteres).
//   fecha: 2026-10-06
//   etiquetas: [Angular, Algoritmos]
//   borrador: false
//   ---
// Los archivos que empiezan por "_" (como _plantilla.md) se ignoran.

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js/lib/common';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENIDO = join(raiz, 'content/blog');
const SALIDA = join(raiz, 'src/app/blog/generado');
const PUBLICO = join(raiz, 'public');

// --- Datos del sitio: se leen de perfil.ts para no duplicarlos ---
const perfil = readFileSync(join(raiz, 'src/app/datos/perfil.ts'), 'utf8');
const URL_SITIO = perfil.match(/url:\s*'([^']+)'/)[1].replace(/\/$/, '');
const NOMBRE = perfil.match(/nombre:\s*'([^']+)'/)[1];
const PROYECTOS = [...perfil.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

// --- Pseudocódigo (la gramática de Transcriptor) para resaltar bloques ```pseudo ---
hljs.registerLanguage('pseudo', () => ({
  case_insensitive: false,
  keywords: {
    keyword:
      'INICIO FIN SI ENTONCES SINO FIN_SI MIENTRAS HACER FIN_MIENTRAS PARA DESDE HASTA PASO FIN_PARA REPETIR HASTA_QUE FUNCION RETORNAR FIN_FUNCION LEER MOSTRAR Y O NO',
    literal: 'VERDADERO FALSO NULO',
    built_in: 'LONGITUD LISTA ENTERO ABS RAIZ MAX MIN ALEATORIO',
  },
  contains: [hljs.QUOTE_STRING_MODE, hljs.C_LINE_COMMENT_MODE, hljs.C_NUMBER_MODE],
}));

const slugTitulo = (t) =>
  t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function convertir(markdown) {
  const indice = [];
  const marked = new Marked(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'hljs language-',
      highlight(codigo, lang) {
        const lenguaje = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(codigo, { language: lenguaje }).value;
      },
    }),
    {
      renderer: {
        heading({ tokens, depth }) {
          const texto = this.parser.parseInline(tokens);
          const id = slugTitulo(texto.replace(/<[^>]+>/g, ''));
          if (depth === 2) indice.push({ id, texto: texto.replace(/<[^>]+>/g, '') });
          return `<h${depth} id="${id}">${texto}</h${depth}>\n`;
        },
        link({ href, title, tokens }) {
          const texto = this.parser.parseInline(tokens);
          const externo = /^https?:\/\//.test(href) && !href.startsWith(URL_SITIO);
          const t = title ? ` title="${title}"` : '';
          return externo
            ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${texto}</a>`
            : `<a href="${href}"${t}>${texto}</a>`;
        },
      },
    },
  );
  return { html: marked.parse(markdown), indice };
}

function fallo(archivo, msg) {
  console.error(`\n✗ content/blog/${archivo}: ${msg}\n`);
  process.exit(1);
}

// --- Leer y validar ---
mkdirSync(CONTENIDO, { recursive: true });
const articulos = [];
for (const archivo of readdirSync(CONTENIDO).filter((f) => f.endsWith('.md') && !f.startsWith('_'))) {
  const { data, content } = matter(readFileSync(join(CONTENIDO, archivo), 'utf8'));
  if (data.borrador) continue;
  const slug = basename(archivo, '.md');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fallo(archivo, 'el nombre del archivo debe ser-asi-en-minusculas-y-sin-tildes');
  if (!data.titulo) fallo(archivo, 'falta "titulo" en la cabecera');
  if (!data.descripcion) fallo(archivo, 'falta "descripcion" en la cabecera');
  const fecha = data.fecha instanceof Date ? data.fecha.toISOString().slice(0, 10) : String(data.fecha ?? '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) fallo(archivo, '"fecha" debe tener el formato AAAA-MM-DD');
  const { html, indice } = convertir(content);
  const palabras = content.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
  articulos.push({
    slug,
    titulo: String(data.titulo),
    descripcion: String(data.descripcion),
    fecha,
    etiquetas: Array.isArray(data.etiquetas) ? data.etiquetas.map(String) : [],
    minutos: Math.max(1, Math.round(palabras / 220)),
    indice,
    html,
  });
}
articulos.sort((a, b) => b.fecha.localeCompare(a.fecha));

// --- Módulos TypeScript ---
rmSync(SALIDA, { recursive: true, force: true });
mkdirSync(join(SALIDA, 'articulos'), { recursive: true });
const aviso = '// Archivo generado por scripts/build-blog.mjs a partir de content/blog. No lo edites a mano.\n';

for (const a of articulos) {
  writeFileSync(
    join(SALIDA, 'articulos', `${a.slug}.ts`),
    `${aviso}export default ${JSON.stringify({ html: a.html, indice: a.indice })};\n`,
  );
}

const metas = articulos.map(({ html, indice, ...meta }) => meta);
writeFileSync(
  join(SALIDA, 'indice.ts'),
  `${aviso}import type { ArticuloMeta, CuerpoArticulo } from '../modelo';

export const ARTICULOS: ArticuloMeta[] = ${JSON.stringify(metas, null, 2)};

export const CARGAR_ARTICULO: Record<string, () => Promise<CuerpoArticulo>> = {
${articulos.map((a) => `  '${a.slug}': () => import('./articulos/${a.slug}').then((m) => m.default),`).join('\n')}
};
`,
);

// --- sitemap.xml y rss.xml ---
const hoy = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: '/', mod: articulos[0]?.fecha ?? hoy },
  { loc: '/blog', mod: articulos[0]?.fecha ?? hoy },
  ...PROYECTOS.map((s) => ({ loc: `/proyectos/${s}`, mod: hoy })),
  ...articulos.map((a) => ({ loc: `/blog/${a.slug}`, mod: a.fecha })),
];
writeFileSync(
  join(PUBLICO, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${URL_SITIO}${u.loc}</loc><lastmod>${u.mod}</lastmod></url>`).join('\n')}
</urlset>
`,
);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
writeFileSync(
  join(PUBLICO, 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(`Blog de ${NOMBRE}`)}</title>
  <link>${URL_SITIO}/blog</link>
  <atom:link href="${URL_SITIO}/rss.xml" rel="self" type="application/rss+xml"/>
  <description>Desarrollos, algoritmos y decisiones técnicas.</description>
  <language>es</language>
${articulos
  .map(
    (a) => `  <item>
    <title>${esc(a.titulo)}</title>
    <link>${URL_SITIO}/blog/${a.slug}</link>
    <guid>${URL_SITIO}/blog/${a.slug}</guid>
    <pubDate>${new Date(a.fecha + 'T09:00:00Z').toUTCString()}</pubDate>
    <description>${esc(a.descripcion)}</description>
  </item>`,
  )
  .join('\n')}
</channel>
</rss>
`,
);

console.log(`✓ blog: ${articulos.length} artículo(s) → src/app/blog/generado, sitemap.xml y rss.xml`);
