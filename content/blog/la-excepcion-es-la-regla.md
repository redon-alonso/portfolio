---
titulo: La excepción es la regla
descripcion: Por qué los casos raros no son un detalle que se resuelve a mano, sino la parte del negocio que da propósito a un programa, y cómo convertir cada «pero» en una regla más.
fecha: 2026-10-21
etiquetas: [Lógica de negocio, Análisis, Diseño de software]
borrador: false
---

Cuando se estudia la lógica de un negocio aparecen siempre tres capas de trabajo:

- **El trabajo rutinario**, el que se repite cada día y define el estándar.
- **Las decisiones de los responsables**, el criterio que hay detrás de ese estándar.
- **El trabajo ocasional**, el que rompe las reglas establecidas.

Las dos primeras se dejan explicar con bastante facilidad. La tercera es la que decide si un programa sirve de verdad.

## El momento del «pero»

Al descubrir la lógica que hay detrás de las decisiones, todo parece coherente. Hasta que alguien dice **«pero»**.

Ahí la fórmula sencilla, elegante y limpia deja de bastar. El trabajo de días pasa a ser de semanas, el de semanas pasa a ser de meses y los tests unitarios se llenan de lógica anidada. Es fácil verlo como un estorbo, pero es justo al revés: en esos detalles está la diferencia entre **un programa que funciona y un programa que tiene un propósito**. Y ese propósito se construye con las excepciones y con sus propias reglas.

Que algo ocurra una vez al mes, o una vez al año, no justifica que se quede fuera del código.

## La lógica no entiende de probabilidades

Una regla de negocio no puede apostar a que un caso «casi nunca pasa». Tiene que tratar **cada registro y cada proceso como si fuera el excepcional** y resolverlo sin que el usuario tenga que hacer nada extraordinario.

De poco sirve un sistema automatizado si el usuario tiene que vigilar qué registros se saltan las normas para corregirlos a mano. Nadie aceptaría algo así. El software tiene que adaptarse al trabajo de quien lo usa, nunca al revés.

Por eso cada «pero» que aparece en una reunión, en realidad, hay que leerlo como un **«y también»**: también hay que tenerlo en cuenta.

## Lo que no cuentan los casos de uso

El cliente, el usuario o el superior tiende a subestimar la casuística. Calcula cuántas veces se usará cada opción y concluye que los casos raros no merecen esfuerzo. Pero ese cálculo no mide lo importante:

- **Un error que no se contiene se propaga en el tiempo.** Un dato mal resuelto hoy contamina los informes, los saldos y las decisiones de los meses siguientes.
- **Un proceso que no sabe qué hacer bloquea el flujo.** Si el caso raro detiene la cadena, deja de ser raro para todos los que esperan detrás.

Además, sin necesidad de calcular nada, siempre aparecen situaciones incómodas que hay que resolver. En sistemas operativos existe el **algoritmo del avestruz**: ignorar un problema porque se considera tan poco frecuente que no compensa tratarlo. Puede ser una decisión razonable para un fallo improbable y desconocido. No lo es para un caso **conocido y con una respuesta clara**: ese simplemente se implementa.

## Un camión más

Hace poco, después de discutir la estructura de un proceso de carga y aplicarlo, alguien comentó: «Esto está muy bien, porque además solo hay que calcular más de un camión una o dos veces al año». Ese caso no estaba contemplado.

Mi pregunta fue: **«¿Y cómo piensas aplicar el proceso ese día, si no está en la lógica interna?»**. La respuesta fue sincera: «No lo sé. Cuando llegue, separo el pedido y ya veré».

Al final, resolverlo fue sencillo:

- **Para quien lo usa**, desglosar la carga en dos camiones era una pestaña más.
- **Por dentro**, era una regla más en la lógica.
- **Para todos los usuarios**, pasó a ser un proceso controlado e igual para todos.

Lo importante no es la pestaña. Es que la congruencia ya no depende de cada persona: los datos son coherentes y **las decisiones las toma el programa, siempre de la misma forma**, en lugar de improvisarse cada vez de una manera distinta.

Lo mismo pasa en [Saturno](/proyectos/saturno), mi gestor de ausencias. Unas vacaciones interrumpidas, un anticipo de días que todavía no se han generado o una baja a mitad de unas vacaciones aprobadas son excepciones. Aun así, cada una tiene su propia regla y deja constancia de quién, por qué y hasta cuándo. Ninguna se resuelve corrigiendo el saldo a mano.

## Autonomía sin fricción

Esto no le quita autonomía al usuario: le quita **fricción**. Decidir sigue siendo cosa del criterio humano, y debe serlo. Pero cuando la ejecución es trivial, no tiene sentido dejar abiertas varias formas de resolver el mismo caso. Cada forma distinta es una fuente más de incoherencia en los datos.

La frontera es la misma de la que hablaba en [la entrada anterior](/blog/logica-de-negocio-en-el-centro): automatizar lo mecánico y dejar a la vista lo que necesita criterio.

## Lo que me llevo

Un programa no se debe juzgar por la complejidad de su caso principal, sino por **sus posibles incidencias y por cómo las resuelve dentro de su propia lógica**.

Cuanto más claro le quede al cliente que su criterio se dedica a su trabajo, y no a improvisar ante datos que no cuadran, un stock que falta o un caso que nadie previó, más fiable será el resultado y menos problemas tendrán quienes usan el programa.

La excepción no es el borde del problema. Muchas veces es el problema.
