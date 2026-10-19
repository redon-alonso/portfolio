---
titulo: La lógica de negocio es el centro del desarrollo web
descripcion: Por qué entender el negocio decide la tecnología, la base de datos y la arquitectura, y cuándo automatizar algo deja de compensar lo que cuesta.
fecha: 2026-10-19
etiquetas: [Arquitectura, Lógica de negocio, Análisis]
borrador: false
---

Un programa profesional no existe porque alguien quisiera usar una tecnología concreta. Existe porque hay un negocio con un problema: algo que cuesta tiempo, dinero o errores, y que alguien está dispuesto a pagar por dejar de sufrir. Esa es la **lógica de negocio**, y es la razón de ser de todo lo demás.

Por eso creo que la parte fundamental del trabajo no es escribir código, sino **escuchar, entender y descubrir** qué necesita ese negocio. El código viene después, y casi siempre es la parte fácil.

## Escuchar, entender, descubrir

Son tres cosas distintas, y cada una falla de una manera:

- **Escuchar** es dejar que te cuenten el problema con sus palabras, sin traducirlo demasiado pronto a tablas y rutas de una API.
- **Entender** es poder explicarlo de vuelta y que te digan «sí, eso es».
- **Descubrir** es encontrar lo que nadie te ha contado porque lo dan por hecho: la excepción que ocurre una vez al mes, el paso que se hace «siempre así» o la palabra que cada departamento usa con un significado distinto.

Un ejemplo que me encontré al hacer [Presupuestos PVC](/proyectos/presupuestos-pvc): en el sector se habla de «margen» cuando muchas veces se quiere decir **recargo**. Un recargo del 35 % sobre el coste no es un margen del 35 % sobre el precio. Si además se aplica una rebaja del 5 %, el recargo real queda en un 28,3 % y el margen, en un 22 %. Nadie lo pidió como requisito, pero era la diferencia entre una herramienta que pone precios y una que ayuda a no perder dinero. Eso no sale de la documentación de ninguna librería; sale de preguntar.

## Todo lo demás deriva de ahí

Cuando el problema está claro, muchas decisiones técnicas dejan de ser cuestión de gustos:

- **La tecnología.** Se elige por lo que el negocio necesita (quién la va a mantener, dónde se va a ejecutar, cuánto tiene que durar), no por lo que está de moda.
- **La forma de la base de datos.** Las entidades y las relaciones son las del dominio, y los índices responden a las preguntas que el negocio hace cada día. Si nadie va a pedir «todos los presupuestos de un cliente», no hace falta optimizar para ello.
- **La arquitectura.** Un **monolito** bien organizado es la respuesta correcta para un equipo pequeño con un dominio acotado. Una **arquitectura hexagonal** compensa cuando las reglas de negocio son complejas, cambian a menudo y conviene aislarlas de la base de datos y de la interfaz. Los **microservicios** resuelven sobre todo un problema de organización (muchos equipos que necesitan desplegar por separado) y lo pagan con complejidad operativa.

Ninguna de las tres es mejor en abstracto. Cada una es la consecuencia de algo que se entendió, o no, sobre el negocio.

En Presupuestos PVC, por ejemplo, el motor de cálculo es JavaScript puro y se comparte entre la interfaz y las funciones del servidor. No fue por elegancia: un precio tiene que ser el mismo lo pida la pantalla o lo pida otro sistema a través de la API, y la forma más barata de garantizarlo era que lo calculara el mismo código.

## Menos esfuerzo, más recompensa

Mi criterio para saber si algo está bien diseñado es sencillo: **cuanto menor es el esfuerzo y mayor la recompensa, mejor es el diseño.** El esfuerzo incluye construirlo, pero también mantenerlo, explicarlo y cambiarlo cuando el negocio cambie.

A veces un alarde técnico tiene sentido: demuestra capacidad de ejecución y hay contextos donde eso es justo lo que hay que demostrar. Pero la comprensión del problema se ve en el **equilibrio**, en saber qué no construir.

## ¿Hace falta convertir un Excel en un microservicio?

El Excel es probablemente el software de negocio más exitoso que existe. Si un proceso vive en una hoja de cálculo y funciona, la pregunta no es «cómo lo convierto en un sistema», sino **qué está fallando exactamente**:

- ¿Varias personas lo editan a la vez y se pisan?
- ¿Hay errores de fórmula que cuestan dinero?
- ¿Hace falta saber quién cambió qué y cuándo?
- ¿Otros sistemas necesitan esos datos?

Si la respuesta a todo es no, quizá lo que hace falta es validar dos columnas y proteger una hoja. Si alguna es sí, entonces hay un problema real que resolver, y su tamaño dice cuánta estructura merece: una aplicación sencilla, un módulo dentro de algo que ya existe o, en el caso extremo, un servicio propio.

## Lo que se hace a mano en segundos

Lo mismo pasa con las tareas pequeñas. Antes de construir una estructura para un cambio que alguien hace a mano en segundos, conviene echar una cuenta aproximada:

```
ahorro    = veces al año × tiempo que se ahorra + errores que se evitan
inversión = construirlo + mantenerlo + explicarlo
```

Si un cambio se hace dos veces al año y lleva treinta segundos, ningún panel de administración lo va a amortizar. Si se hace doscientas veces al día y un error cuesta un pedido, automatizarlo es casi una obligación. La mayoría de los casos caen en medio, y ahí es donde hay que pensar.

## Cuándo el trabajo humano es gasto y cuándo es criterio

El trabajo humano se percibe como **gasto** cuando es repetitivo, predecible y no requiere decidir nada: copiar datos de un sitio a otro, aplicar siempre la misma regla, revisar algo que una máquina revisaría mejor. Eso hay que automatizarlo sin dudar.

Pero hay otro tipo de trabajo que parece igual y no lo es: el que incluye **criterio**. Decidir si una rebaja compensa, si un caso es una excepción o si una regla sigue teniendo sentido. Cuando eso se automatiza del todo, la regla queda enterrada en el código, nadie recuerda por qué existe y el sistema la sigue aplicando aunque el negocio haya cambiado.

Por eso intento que la automatización llegue **hasta justo antes de la decisión**: que el sistema haga los cálculos, muestre las consecuencias y deje la decisión a quien tiene el contexto. En Presupuestos PVC la herramienta no decide el precio: enseña el margen real y cuánto se puede rebajar sin bajar del margen mínimo. El cálculo es automático; el criterio sigue siendo de quien vende.

Una buena abstracción quita el trabajo mecánico sin quitar la necesidad de pensar.

## Lo que me llevo

La tecnología cambia cada pocos años, pero la forma de trabajar no: entender primero qué problema tiene el negocio, construir lo mínimo que lo resuelva bien y dejar visible lo que necesita criterio. Es lo que más me gusta de este oficio y lo que intento aplicar en cada proyecto, desde una herramienta de presupuestos hasta un sistema que usan miles de personas.
