---
titulo: Calcular el coste de un algoritmo sin ejecutarlo
descripcion: Cómo Transcriptor deduce T(n) y la complejidad de un pseudocódigo con sumatorios, logaritmos y recurrencias, y por qué luego lo compara con lo que mide al ejecutarlo.
fecha: 2026-10-06
etiquetas: [Algoritmos, Lenguajes formales, Transcriptor]
borrador: false
---

Cuando se aprende algoritmia, la complejidad suele llegar como un dato: «la búsqueda binaria es O(log n)», «este doble bucle es O(n²)». Se memoriza, pero no se ve. Con [Transcriptor](https://diagramas-inky.vercel.app/) quería lo contrario: escribir un pseudocódigo y que la herramienta **dedujera** su coste, línea a línea, y lo enseñara.

## Contar antes de medir

El punto de partida es sencillo: el coste de un algoritmo es la suma de cuántas veces se ejecuta cada instrucción. Para este programa:

```pseudo
INICIO
    LEER n
    suma = 0
    PARA i DESDE 1 HASTA n HACER
        suma = suma + i
    FIN_PARA
    MOSTRAR "La suma es", suma
FIN
```

`LEER`, la asignación inicial y `MOSTRAR` se ejecutan una vez; el cuerpo del bucle, `n` veces; y la comprobación del `PARA`, `n + 1` (la última es la que sale). Sumando las operaciones de cada línea sale una expresión exacta, en este caso **T(n) = 5n + 6**, y de ahí la clase: **Θ(n)**.

Para hacer esto no basta con leer el texto: hace falta el **árbol sintáctico**. El pseudocódigo tiene una gramática propia, así que primero un analizador léxico lo trocea en palabras clave, identificadores y operadores, y después un analizador sintáctico construye el árbol y marca los errores en su línea («aquí falta FIN_PARA»). El cálculo de coste recorre ese árbol.

## Bucles anidados: sumatorios

El caso interesante aparece cuando el límite de un bucle depende de otro:

```pseudo
PARA i DESDE 1 HASTA n HACER
    PARA j DESDE 1 HASTA i HACER
        MOSTRAR i, j
    FIN_PARA
FIN_PARA
```

El cuerpo interior se ejecuta `i` veces para cada `i`, así que el total es un sumatorio:

```
Σ (i = 1..n) i  =  n(n + 1) / 2
```

Para resolverlo de forma general, el coste se representa como un **polinomio racional en n**, y los sumatorios de potencias se cierran con las fórmulas de Faulhaber (Σi, Σi², Σi³…). Así un triple bucle triangular da su polinomio exacto, no solo «es cúbico».

## Bucles que multiplican: logaritmos

No todos los bucles avanzan de uno en uno:

```pseudo
i = 1
MIENTRAS i <= n HACER
    i = i * 2
FIN_MIENTRAS
```

Aquí `i` se duplica en cada vuelta, así que el bucle se repite ⌊log₂ n⌋ + 1 veces. Reconocer el patrón (la variable de control se multiplica o se divide por una constante) permite introducir el logaritmo en la expresión en lugar de rendirse.

Cuando los límites son constantes o el patrón no encaja en ninguna regla, queda una salida honesta: **simular** esas vueltas y contar.

## Recursión: recurrencias

Con funciones recursivas, el coste se define en función de sí mismo. Dos familias cubren la mayoría de los casos que aparecen al aprender:

- **Restar el tamaño.** `T(n) = T(n − 1) + c` es lineal; `T(n) = T(n − 1) + T(n − 2) + c` (el Fibonacci ingenuo) crece como φⁿ ≈ 1,618ⁿ, exponencial.
- **Dividir el tamaño.** `T(n) = a·T(n / b) + f(n)` se resuelve con el **teorema maestro**: la búsqueda binaria, `T(n) = T(n/2) + c`, da log n; la ordenación por mezcla, `T(n) = 2T(n/2) + n`, da n log n.

Detectar a cuál pertenece una función es, otra vez, un problema de leer bien el árbol: cuántas llamadas recursivas hay en cada rama y con qué argumento.

## Y luego, medir

La parte que más me gusta es cerrar el círculo. Transcriptor tiene también un **intérprete paso a paso** (sin `eval`: el mismo árbol se ejecuta nodo a nodo), así que puede contar las operaciones reales de una ejecución y compararlas con la previsión. Si la fórmula dice 5006 operaciones para n = 1000 y el contador dice 5006, el modelo es correcto; si no coincide, hay algo que aprender.

Además, el coste se traduce a algo tangible: con un tamaño de entrada y una velocidad supuesta, cuánto tardaría, con un semáforo de viabilidad. Θ(n²) deja de ser una letra y pasa a ser «con un millón de datos, esto no termina hoy».

## Lo que me llevo

Este proyecto junta lo que más me gusta de la informática: una **gramática** que define qué es un programa válido, un **modelo** que permite razonar sobre él sin ejecutarlo y una **comprobación** empírica que dice si el modelo es bueno. Es la misma forma de pensar que aplico cuando analizo un sistema real: primero entender su forma, luego construir.

Puedes probarlo en [diagramas-inky.vercel.app](https://diagramas-inky.vercel.app/) y ver el código en [GitHub](https://github.com/redon-alonso/diagramas).
