---
titulo: En local funciona
descripcion: Por qué una solución que pasa todas las pruebas puede romperse en producción por el volumen de datos, y cómo comprobarlo antes de que sea tarde.
fecha: 2026-11-24
etiquetas: [Rendimiento, Bases de datos, Producción]
borrador: false
---

Una de las peores pesadillas de cualquier desarrollador empieza con una buena noticia. Llevas semanas trabajando con datos acotados, en un entorno conocido y seguro. Pasas todas las pruebas, la lógica de negocio está bien resuelta y preproducción da el visto bueno. Sientes que has cumplido.

Y en producción, **el volumen lo rompe todo**.

Lo has hecho todo bien: la solución responde a la necesidad, la funcionalidad es eficiente y el evolutivo tiene luz verde. Solo faltó un pequeño gran detalle: comprobar si la solución aguantaba el volumen real del negocio.

## El enemigo que no se ve

No pasa siempre. Muchas veces el entorno acotado es una ventaja: quita fricción y te deja centrarte en lo importante sin que miles de registros se interpongan. El problema llega cuando el registro deja de ser un número y **empieza a pesar**: cuando ya no es «una fila más», sino una de millones que la consulta tiene que recorrer.

Y preproducción no siempre avisa. Si sus datos tampoco se parecen a los reales, su visto bueno da una **falsa seguridad**: confirma que la solución funciona, pero no que funcione con el volumen de verdad. El problema entonces no es solo de quien desarrolla, sino del proceso.

Como no es un enemigo visible, es fácil pasarlo por alto. Y lo peor de no tenerlo presente desde el principio es el momento en que aparece. Cuanto más tarde se descubre, más caro sale: con el desarrollo terminado y la entrega encima, cualquier cambio en la base de datos o en la forma de consultar afecta a todo lo que ya está construido.

Por eso lo mejor es tener al enemigo cerca: **comprobar desde el principio el volumen que va a mover el cambio**. Cuando ya sabes que la solución puede con él, trabajas con la tranquilidad de que ese problema, al menos, no aparecerá cuando todo parezca terminado.

## Un millón de veces más

Lo aprendí de la manera directa. Justo antes de dar por válido un evolutivo, con el frontal refinado y el backend funcionando, una compañera y amiga me preguntó:

—¿Has probado las consultas con los datos de producción?

—No —le dije—, pero en desarrollo van bien.

Entonces me explicó la diferencia. Yo había trabajado con **45 registros**; en producción había **48 millones**. No era un millón de registros más: era **un millón de veces más**.

Y el problema demostró ser enorme. La primera consulta tardaba más de un minuto y medio, que era justo el tiempo máximo que se le permitía a la búsqueda antes de cortarla. La consulta se bloqueaba, los cambios no llegaban a crearse y nada de aquello iba a salir adelante en producción.

La solución no fue rehacerlo todo. Replanteamos la consulta para no sobrecargar la búsqueda y ajustamos el índice, tocando lo mínimo posible para que el proyecto saliera adelante. El trabajo estuvo en separar lo que la consulta hacía de una sola vez, pero el resultado compensó: la consulta pasó de cortarse por superar el minuto y medio a terminar en **unos once segundos**. Y gracias a ese cambio, la solución pasó a poder trabajar con **decenas de millones de registros**: ya no solo funcionaba con el volumen de hoy, sino que tenía margen para crecer.

Lo que me salvó fue una pregunta de alguien con más contexto. «¿Lo has probado con datos reales?» cuesta un segundo en una revisión y puede ahorrar semanas. Desde entonces me la hago yo antes de dar nada por terminado.

## Cómo comprobarlo a tiempo

Desde entonces, antes de dar por buena una solución que toca datos, me hago unas cuantas preguntas:

- **¿Cuántos registros hay en producción?** No en desarrollo ni en preproducción: en producción. Y ¿cuánto crecen al mes?
- **¿Qué hace la consulta por dentro?** El plan de ejecución (`EXPLAIN` en la mayoría de bases de datos) dice si usa un índice o recorre la tabla entera. Con mil filas no se nota; con un millón, sí.
- **¿Se ha probado con un volumen parecido al real?** Si no se pueden usar datos de producción, se pueden generar datos de prueba con el mismo orden de magnitud.
- **¿Qué pasa cuando falla?** Una consulta lenta que bloquea tablas no solo es lenta: puede detener el trabajo de todos los que usan esas tablas a la vez.

Ninguna de estas preguntas lleva más de unos minutos. Contestarlas al principio cuesta muy poco; descubrir la respuesta en producción cuesta mucho.

Esto no significa preparar cada solución para miles de millones de registros. Diseñar para un volumen imaginario es sobreingeniería, y va contra la idea de [menos esfuerzo y más recompensa](/blog/logica-de-negocio-en-el-centro#menos-esfuerzo-mas-recompensa). Se trata de **conocer el volumen real** y cómo crece. Si son mil registros y apenas aumentan, no hace falta optimizar nada; si son cuarenta y ocho millones, hay que saberlo antes de escribir la consulta.

Y ese dato no está en el código: es parte de la lógica de negocio. Igual que se pregunta qué hace un proceso y cuáles son [sus excepciones](/blog/la-excepcion-es-la-regla), hay que preguntar **cuánto mueve**. Es una pregunta más de la fase de escuchar, entender y descubrir.

## Saber y sufrir

Saber algo y sufrirlo son dos cosas muy distintas. Se puede leer mucho sobre la importancia del volumen de datos y no haber visto nunca un error tan claro como **un elefante en una cacharrería**. Pero cuando el elefante te ha embestido alguna vez, lo buscas en cada proyecto, aunque solo sea un ratón.
