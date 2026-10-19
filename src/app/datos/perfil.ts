// Todo el contenido del portfolio que no es del blog vive aquí.
// Lo marcado con PENDIENTE no se muestra en la web hasta que tenga valor.

export const SITIO = {
  nombre: 'Víctor Alonso Gómez',
  // PENDIENTE: cambia por el dominio definitivo (se usa en canonical, sitemap, RSS y Open Graph).
  url: 'https://victor-alonso.vercel.app',
  idioma: 'es_ES',
  descripcion:
    'Desarrollador web con cabeza de analista: lenguajes formales, análisis de sistemas y problemas complejos. Proyectos, trayectoria y blog de desarrollos.',
} as const;

export interface Enlace {
  etiqueta: string;
  url: string;
}

export const CONTACTO = {
  github: 'https://github.com/redon-alonso',
  email: null as string | null, // PENDIENTE: 'tu@correo.com'
  linkedin: null as string | null, // PENDIENTE: 'https://www.linkedin.com/in/...'
};

export interface Etapa {
  periodo: string;
  puesto: string;
  lugar: string;
  detalle: string;
}

export const TRAYECTORIA: Etapa[] = [
  {
    periodo: '2026 — hoy',
    puesto: 'Transformación tecnológica y desarrollo interno',
    lugar: 'Gran empresa',
    detalle:
      'Empiezo un proyecto nuevo con un doble papel: impulsar el cambio tecnológico desde dentro y desarrollar las herramientas que lo hacen posible.',
  },
  {
    periodo: '3 años',
    puesto: 'Desarrollador web',
    lugar: 'Adding Technology',
    detalle:
      'Desarrollo en producción para un cliente único: la mayor aseguradora de España. Código que se usa todos los días, con las exigencias de estabilidad, mantenimiento y coordinación que eso implica.',
  },
];

export const FORMACION: Etapa[] = [
  {
    periodo: 'Mientras trabajaba',
    puesto: 'Desarrollo de Aplicaciones Web (DAW)',
    lugar: 'Florida Universitària',
    detalle: 'Ciclo superior compaginado con el trabajo en producción.',
  },
  {
    periodo: 'Hasta 5.º curso',
    puesto: 'Ingeniería Informática',
    lugar: 'Universitat de València',
    detalle:
      'Donde descubrí lo que más me gusta: los lenguajes formales, el análisis de sistemas y los problemas difíciles, por encima del análisis de datos o del desarrollo por sí mismo.',
  },
];

export interface Proyecto {
  slug: string;
  nombre: string;
  resumen: string;
  problema: string;
  etiquetas: string[];
  demo: string;
  codigo: string | null;
  imagen: { src: string; ancho: number; alto: number; alt: string } | null;
  aviso?: string;
  /** Secciones del caso de estudio. Si está vacío, la página indica que está en preparación. */
  secciones: { titulo: string; parrafos: string[]; lista?: string[] }[];
}

export const PROYECTOS: Proyecto[] = [
  {
    slug: 'transcriptor',
    nombre: 'Transcriptor',
    resumen:
      'Convierte pseudocódigo en diagramas de flujo y calcula el coste del algoritmo —T(n), O, Ω y Θ— para comparar enfoques antes de escribir una línea de código real.',
    problema:
      'Aprender algoritmos suele ser leer código y fiarse de que «esto es O(n²)». Transcriptor lo enseña: dibuja el flujo, cuenta cuántas veces se ejecuta cada línea y deduce el coste de forma simbólica.',
    etiquetas: ['Lenguajes formales', 'Analizador propio', 'Análisis de costes', 'Vue 3', 'Seguridad'],
    demo: 'https://diagramas-inky.vercel.app/',
    codigo: 'https://github.com/redon-alonso/diagramas',
    imagen: {
      src: '/img/transcriptor.png',
      ancho: 1440,
      alto: 900,
      alt: 'Transcriptor: editor de pseudocódigo a la izquierda, diagrama de flujo en el centro y análisis de coste Θ(n) a la derecha',
    },
    secciones: [
      {
        titulo: 'Un lenguaje con su propia gramática',
        parrafos: [
          'El pseudocódigo no es texto libre: tiene una gramática definida (INICIO/FIN, SI, MIENTRAS, PARA, REPETIR…HASTA_QUE, listas, funciones con recursión). Un analizador léxico y sintáctico propios construyen el árbol y señalan los errores en su línea, con mensajes como «aquí falta FIN_PARA».',
          'No hay eval ni new Function: el código del usuario se interpreta con un intérprete escrito a mano, paso a paso, mostrando variables, listas, pila de llamadas y pantalla.',
        ],
      },
      {
        titulo: 'Coste simbólico, no solo medido',
        parrafos: [
          'El análisis calcula T(n) exacto cuando es posible: sumatorios de bucles anidados con polinomios racionales y fórmulas de Faulhaber, bucles que multiplican o dividen (logaritmos) y simulación cuando los límites son fijos.',
          'Para funciones recursivas resuelve recurrencias: restar el tamaño (lineal o exponencial, como Fibonacci ≈ 1,618ⁿ) o dividirlo con el teorema maestro. Después compara lo previsto con las operaciones medidas al ejecutar.',
        ],
        lista: [
          'Taller: un diagrama por función, editor con resaltado y recuento de ejecuciones por línea.',
          'Coste: O / Ω / Θ, desglose por línea y semáforo de viabilidad según el tamaño de la entrada.',
          'Comparar: hasta seis algoritmos en la misma gráfica.',
        ],
      },
      {
        titulo: 'Seguro por diseño',
        parrafos: [
          'Funciona solo en el navegador: sin servidor, sin base de datos y sin peticiones de red. Una CSP estricta (script-src \'self\', connect-src \'none\', Trusted Types) lo garantiza, y todo lo que se lee de localStorage o de un fichero importado se valida antes de usarse.',
          'Los bucles infinitos se detectan antes de ejecutar y durante la ejecución (estados repetidos), y las ejecuciones largas se hacen por tramos para que la página nunca se congele.',
        ],
      },
      {
        titulo: 'Cómo está construido',
        parrafos: [
          'La lógica (lexer, parser, coste, maquetación del diagrama, intérprete) es JavaScript puro sin dependencias de interfaz y está probada con node:test. La interfaz es Vue 3 con <script setup>; la única dependencia de producción es vue.',
        ],
      },
    ],
  },
  {
    slug: 'motor-packing',
    nombre: 'Motor Packing',
    resumen:
      'Calcula cómo cargar los palets en un camión respetando el orden de entrega, la física de la carga y el reparto de peso por ejes, y lo enseña en 3D.',
    problema:
      'Cargar bien un camión no es solo que quepa: lo que se entrega primero tiene que quedar junto a la puerta, hay palets que no se pueden girar ni apilar, y el peso tiene que repartirse entre los ejes sin pasar la masa máxima autorizada.',
    etiquetas: ['Optimización 3D', 'Heurística Extreme Points', 'Three.js', 'Vue 3', 'Node + PostgreSQL', 'Seguridad'],
    demo: 'https://magic-packing.vercel.app/',
    codigo: null, // El repositorio (redon-alonso/MagicPacking) es privado: sin enlace público.
    imagen: null, // PENDIENTE: captura de la vista 3D (la demo pide inicio de sesión). Hasta entonces, ilustración.
    aviso: 'La demo requiere usuario y contraseña y el código es privado; puedo enseñarlo en una entrevista.',
    secciones: [
      {
        titulo: 'Tres restricciones que mandan',
        parrafos: [
          'El algoritmo no busca solo meter el máximo: tiene que obedecer cómo se trabaja de verdad en el muelle de carga. Por eso parte de tres reglas de negocio y todo lo demás se subordina a ellas.',
        ],
        lista: [
          'LIFO por orden de entrega: lo que se entrega último se carga primero, junto a la cabina; lo que se entrega primero queda junto a la puerta.',
          'Física del PVC: la dimensión mayor de cada palet va siempre paralela al largo del camión. Girarlo 90° está prohibido, así que no se evalúa.',
          'Reparto de peso: se calcula el centro de masa de la carga y el peso por eje (2 o 3 ejes) con los porcentajes que el negocio ya usa en báscula sobre la tara y la carga útil, avisando si se supera la MMA.',
        ],
      },
      {
        titulo: 'Puntos extremos, simplificados a propósito',
        parrafos: [
          'La colocación usa una heurística de tipo Extreme Points. Como la segunda restricción fija la orientación de cada palet, el problema se reduce a decidir dónde va, no cómo: cada palet colocado genera tres nuevos puntos de anclaje (a su derecha, detrás y encima) y el siguiente prueba los candidatos del más cercano a la cabina al más lejano, el suelo antes que el apilado y de izquierda a derecha.',
          'Apilar tiene sus propias reglas: el palet de abajo tiene que ser apilable, soportar el peso del de arriba y ofrecer una superficie que lo contenga entero. Entre palets del mismo nivel se respeta una separación mínima de 5 cm, y dentro de cada pedido se colocan primero las bases más grandes y pesadas para dar apoyo estable. Lo que no cabe no se esconde: se devuelve como no colocado.',
        ],
      },
      {
        titulo: 'Del cálculo al camión',
        parrafos: [
          'Alrededor del motor hay una aplicación completa. Los palets son un catálogo de tipos reutilizables; una carga elige camión, suma pedidos con su orden de entrega y calcula. El resultado se ve en 3D con Three.js, con un color por pedido, y se puede ajustar a mano arrastrando palets: al soltar se guarda y se recalcula el centro de masa. Al final, un informe en PDF.',
          'Hay tres roles —administrador, usuario y chófer— con permisos por ruta y verbo. El chófer informa del estado logístico de su carga (asignada, recibida, cargada, en trayecto, descargada, terminada) y un camión en ruta no se puede asignar a otra carga a la vez.',
        ],
      },
      {
        titulo: 'Seguridad y despliegue',
        parrafos: [
          'API en Node con Express 5 y PostgreSQL, con migraciones SQL versionadas y validación de cada entrada con esquemas. Contraseñas con bcrypt y sesiones con JWT; tras una auditoría de seguridad añadí bloqueo de cuenta después de tres intentos fallidos. La aplicación se conecta a la base de datos con un rol de privilegio mínimo, separado del que aplica las migraciones, y CORS solo acepta el dominio de producción.',
          'En producción, la base de datos está en Neon, la API en Render como contenedor Docker y el cliente en Vercel; en local, los tres servicios se levantan con Docker Compose.',
        ],
      },
      {
        titulo: 'Lo siguiente',
        parrafos: [
          'La heurística respeta las tres restricciones, pero quiero afinarla con cargas reales: la prioridad entre llenar suelo y apilar y el orden dentro de un mismo pedido. El reparto por ejes será exacto cuando cada camión tenga la distancia entre ejes, y la vista 3D cargará Three.js bajo demanda para aligerar la primera carga.',
        ],
      },
    ],
  },
  {
    slug: 'presupuestos-pvc',
    nombre: 'Presupuestos PVC',
    resumen:
      'Presupuesta ventanas de PVC a medida desde el despiece real: de las medidas al material, del material al coste y del coste al precio, con el margen a la vista.',
    problema:
      'En carpintería de PVC el precio de una ventana sale de su despiece: metros de perfil y refuerzo, metros cuadrados de vidrio, herrajes y horas de taller. Hacerlo a mano es lento, y al negociar una rebaja es fácil quedarse sin margen sin darse cuenta.',
    etiquetas: ['Modelado de negocio', 'Motor de cálculo', 'Vue 3', 'Serverless', 'Tests'],
    demo: 'https://budgeter200.vercel.app/#/presupuesto/demo',
    codigo: 'https://github.com/redon-alonso/budgeter200',
    imagen: {
      src: '/img/presupuestos-pvc.png',
      ancho: 1440,
      alto: 900,
      alt: 'Presupuestos PVC: configurador de una ventana oscilobatiente con su dibujo a escala, coste y precio por unidad, y panel de rentabilidad con beneficio, rebaja y margen',
    },
    secciones: [
      {
        titulo: 'Del despiece al precio',
        parrafos: [
          'Cada ventana se calcula como en el taller. A partir del ancho, el alto y la serie elegida, el motor obtiene la geometría: el marco y su refuerzo de acero salen del perímetro; las hojas, de la luz entre marcos más el solape (en una corredera, además, las hojas se cruzan en el centro); y el vidrio, de la hoja menos la vista del perfil y las holguras.',
          'Sobre esa geometría se aplica la realidad del oficio: merma de corte por artículo, un mínimo facturable por paño de vidrio, el suplemento de color solo sobre el perfil y la mano de obra como horas fijas por tipología más horas por metro cuadrado. Las medidas imposibles devuelven un error claro, y una línea errónea no tumba el presupuesto entero.',
        ],
      },
      {
        titulo: 'Recargo no es margen',
        parrafos: [
          'El error más caro al presupuestar es confundir el beneficio sobre el coste con el margen sobre la venta: un 25 % de recargo es solo un 20 % de margen. La aplicación separa los dos conceptos y enseña ambos a la vez, junto al beneficio en euros.',
          'Con un recargo del 35 % y una rebaja del 5 %, el recargo real baja al 28,3 % y el margen queda en el 22 %. Despejando la cadena de precio, la herramienta calcula la rebaja máxima que se puede conceder sin bajar del margen mínimo —un 12,9 % para no bajar del 15 %— y simula qué pasa si el cliente pide un precio concreto.',
        ],
        lista: [
          'Configurador con dibujo de la ventana a escala y despiece por partidas.',
          'Catálogo editable con importación desde CSV o Excel en formato español (1.234,56 y separador «;»).',
          'Versiones del presupuesto, IVA general, reducido de reforma o exento, y PDF listo para el cliente.',
        ],
      },
      {
        titulo: 'Un motor, dos sitios',
        parrafos: [
          'El cálculo es JavaScript puro, sin dependencias de interfaz. La misma lógica funciona en el navegador y en funciones serverless de Vercel (GET /api/catalogo y POST /api/calcular), así que la API y la pantalla dan exactamente el mismo resultado. La API valida cada entrada: rangos de porcentajes, tamaño máximo del presupuesto y códigos de error distintos para una petición mal formada y para unas medidas imposibles.',
          'Catorce tests con node:test cubren la geometría, la merma, el color, la corredera, la cadena de precio, la rebaja máxima, la importación de CSV y la propia API.',
        ],
      },
      {
        titulo: 'Lo siguiente',
        parrafos: [
          'Es una demo: los precios y presupuestos se guardan en el navegador de cada usuario. Para que un equipo comparta datos, el siguiente paso es sustituir ese guardado por una API con base de datos, sin tocar el motor de cálculo.',
        ],
      },
    ],
  },
];

export interface Principio {
  titulo: string;
  texto: string;
}

export const PRINCIPIOS: Principio[] = [
  {
    titulo: 'Primero el modelo',
    texto:
      'Antes de escribir código, entender qué forma tiene el problema: sus reglas, sus casos límite y qué es imposible. Un buen modelo hace que el código sea casi obvio.',
  },
  {
    titulo: 'Producción enseña',
    texto:
      'Tres años manteniendo software que usa una aseguradora a diario: lo importante no es que funcione en mi máquina, sino que siga funcionando, se pueda cambiar y otros lo entiendan.',
  },
  {
    titulo: 'Límites desde el diseño',
    texto:
      'Validar lo que entra, acotar lo que puede crecer y no confiar en lo que no controlo. La seguridad y la robustez se diseñan, no se añaden al final.',
  },
];
