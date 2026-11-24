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

Como no es un enemigo visible, es fácil pasarlo por alto. Y lo peor de no tenerlo presente desde el principio es el momento en que aparece. Cuanto más tarde se descubre, más caro sale: con el desarrollo terminado y la entrega encima, cualquier cambio en la base de datos o en la forma de consultar afecta a todo lo que ya está construido.

Por eso lo mejor es tener al enemigo cerca: **comprobar desde el principio el volumen que va a mover el cambio**. Cuando ya sabes que la solución puede con él, trabajas con la tranquilidad de que ese problema, al menos, no aparecerá cuando todo parezca terminado.

## Un millón de registros de diferencia

Lo aprendí de la manera directa. Justo antes de dar por válido un evolutivo, con el frontal refinado y el backend funcionando, una compañera y amiga me preguntó:

—¿Has probado las consultas con los datos de producción?

—No —le dije—, pero en desarrollo van bien.

Entonces me explicó la diferencia entre los registros de un entorno y los del otro: **del orden de un millón**. Y el problema demostró ser enorme. La consulta se bloqueaba, los cambios no llegaban a crearse y nada de aquello iba a salir adelante en producción.

La solución no fue rehacerlo todo. Replanteamos la consulta para no sobrecargar la búsqueda y ajustamos el índice, tocando lo mínimo posible para que el proyecto saliera adelante. Y gracias a ese cambio, la solución pasó a poder trabajar con **decenas de millones de registros**: ya no solo funcionaba con el volumen de hoy, sino que tenía margen para crecer.

## Cómo comprobarlo a tiempo

Desde entonces, antes de dar por buena una solución que toca datos, me hago unas cuantas preguntas:

- **¿Cuántos registros hay en producción?** No en desarrollo ni en preproducción: en producción. Y ¿cuánto crecen al mes?
- **¿Qué hace la consulta por dentro?** El plan de ejecución (`EXPLAIN` en la mayoría de bases de datos) dice si usa un índice o recorre la tabla entera. Con mil filas no se nota; con un millón, sí.
- **¿Se ha probado con un volumen parecido al real?** Si no se pueden usar datos de producción, se pueden generar datos de prueba con el mismo orden de magnitud.
- **¿Qué pasa cuando falla?** Una consulta lenta que bloquea tablas no solo es lenta: puede detener el trabajo de todos los que usan esas tablas a la vez.

Ninguna de estas preguntas lleva más de unos minutos. Contestarlas al principio cuesta muy poco; descubrir la respuesta en producción cuesta mucho.

## Saber y sufrir

Saber algo y sufrirlo son dos cosas muy distintas. Se puede leer mucho sobre la importancia del volumen de datos y no haber visto nunca un error tan claro como **un elefante en una cacharrería**. Pero cuando el elefante te ha embestido alguna vez, lo buscas en cada proyecto, aunque solo sea un ratón.
