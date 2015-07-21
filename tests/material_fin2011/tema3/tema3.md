
T3. Operadores y Expresiones
============================

---

# Recordemos el Temario

- *Tema 1 Introducción a la Informática (semipresencial)*
- *Tema 2 Tipos de datos, variables y constantes*
- **Tema 3 Operadores y Expresiones**
- *Tema 4 Funciones. Funciones de entrada y salida básica*
- *Tema 5 Estructuras de control para selección (`if` y `switch`)*
- *Tema 6 Estructuras de control para iteración (`while`, `do while` y `for`)*
- *Tema 7 Entrada y salida con ficheros*
- *Tema 8 Vectores y cadenas*
- *Tema 9 Matrices*

---

# Contenidos del tema 3

- 3.1. Conceptos básicos.
- 3.2. Operadores aritméticos.
- 3.3. Precedencia, asociatividad y orden de evaluación.
- 3.4. Operadores de relación y de igualdad.
- 3.5. Operadores lógicos.
- 3.6. Conversiones de tipos.

---

# Conceptos básicos

## Operador:
Símbolo que se asocia a una determinada operación básica que se realiza con los datos en algún punto del programa. 

## Propiedades que definen un operador:
- Notación (prefija, **infija**, postfija)
- Aridad o número de operandos que recibe (unarios, **binarios**,...)
- **Precedencia** o prioridad (mayor precedencia se ejecuta primero)
	- `a+b*c` se evalúa como `a+(b*c)` porque `*` tiene más prioridad que `+`
    - Los paréntesis permiten cambiar el orden de evaluación predeterminado.
- **Asociatividad** (izquierda a derecha, derecha a izquierda)
	- Ejemplo: `a+b+c+d` se evalúa `((a+b)+c)+d`

---

# Conceptos básicos

## Tipos de operadores:
- **Aritméticos:** Operandos y resultado de tipo numérico. 
    - Ejemplo: `(a+5)*3` *(donde `a` es variable o constante entera)*
- **Relacionales:** Operandos de cualquier tipo y resultado lógico.
    - Ejemplo: `10>=7`
- **Lógicos:** Los operandos y el resultado tienen valores lógicos (verdadero o falso).
    - Ejemplo: `(10>=7) || (a!=5)`
	
## Expresión:

Combinación de literales, variables, constantes, llamadas a función,
operadores y paréntesis que, tras ser evaluados, devuelven un valor.

---

# Operadores aritméticos

## Reglas de prioridad:
- El orden de prioridad de los operadores aritméticos es:
    - Primero: `*`, `/`, `%`  (tienen igual prioridad entre ellos).
    - Después: `+`, `-`  (tienen igual prioridad entre ellos).
- Dentro del mismo orden de prioridad se sigue la asociatividad de izquierda a derecha. Ejemplo: `a+b+c+d` se evalúa `((a+b)+c)+d`

- El resultado  depende del tipo de los operandos:
    - Si los operandos son enteros, el resultado es entero.
	- Si hay operandos de distinto tipo, el resultado es del tipo de mayor precisión. Ejemplo: al mezclar enteros y coma flotante, el resultado es en coma flotante. 
	
---

# Operadores aritméticos

## División entera y división con decimales:
Cuando el dividendo y el divisor son enteros, se realiza una **división entera**. Ejemplos:

- `10/3` da `3`
- `10.0/3.0` devuelve `3.3333333`
- Basta con que uno de los operandos no sea entero: `10/3.0` calcula `3.333333`

## El resto de la división entera `%`

El operador `%` solamente está definido para la división entera, en lugar del cociente devuelve el **resto de la división**:

- `11%3` devuelve `2`
- `20%2` devuelve `0`

Útil para ver si un número es múltiplo de otro. Ejemplo: saber si es par o impar.

---

# Operadores aritméticos

## Ejercicio

Calcular el valor que tomaría la variable `a` tras ejecutar cada una de las líneas del siguiente código:

    !c
    int a=1,b=5,c=2,d=3,e=6;
    a=a+b%d;
    a=d*b/2;		
    a=d*(b/2);
    a=d+b*c-e;	
    a=d+e*b/2;	
    a=(d+e)*b/2;

---

# Operadores de relación y de igualdad

Se utilizan para realizar comparaciones, devolviendo verdadero o falso.

- `>`  mayor que
- `>=` mayor o igual que
- `<`  menor que
- `<=` menor o igual que
- `==` igual a
- `!=` distinto de

## Reglas de prioridad:
- Tienen menos prioridad que los aritméticos.
- El orden de prioridad de los operadores de relación es:
    - Primero: `>`, `>=`, `<`, `<=`  (tienen igual prioridad entre ellos).
    - Después: `==`, `!=`  (tienen igual prioridad entre ellos).
- Para el mismo orden de prioridad, asociatividad de izquierda a derecha.

---

# Operadores de relación y de igualdad

## NO FUNCIONAN con las cadenas de caracteres

Veremos cómo comparar las cadenas en el tema 8 (función `strcmp`).

## ¡Cuidado!

La expresion `a<b<c` no calcula lo que usualmente haría en matemáticas. El ordenador realmente lo ve igual que `(a<b)<c` donde el valor `(a<b)` vale `0` si la expresión es falsa y `1` en caso de ser cierta.


## Ejercicio
Calcular el valor de las siguientes expresiones, sabiendo que `i=2`:

- `i < 2`
- `i <= 2`
- `i*3 >= (1+3)*i`
- `2+i != 1+i`

---

# Operadores lógicos

## Combinan valores lógicos y devuelven también valores lógicos.
- `&&` es la “Y” lógica. La expresión es cierta si ambos operandos son ciertos.
- `||` es la “O” lógica. La expresión es cierta si alguno de los operandos son ciertos.
- `!` es la negación. Devuelve lo contrario del operando.

## Reglas de prioridad:
- Primero: `!`
- Luego: `&&`
- Después: `||`

---

# Operadores lógicos

## Evaluación perezosa o en *cortocircuito*

- `falso && pepito` ya no evalúa `pepito`, porque seguro que ya es falso
- `cierto || juanito` ya no evalúa `juanito`, directamente es cierto

## Ejercicio

Calcular el valor de las siguientes expresiones, sabiendo que i=2:

- `(i<2) || (i>10)`
- `(i>=1) && (i<=20)`
- `!(i>1)`
- `(i>0) && !(10<i)`
- `(i<1) || (i*2>10) && (i<15)`

---

# Operadores de bits

- Manipulan los valores enteros a nivel de bit:
    - `&` es la 'Y' lógica **bit a bit**
    - `|` es la 'O' lógica **bit a bit**
    - `^` es la 'O exclusiva' lógica **bit a bit**
	
- **NO** te harán falta en esta asignatura. El interés de contarlos aquí es para que sepas que:
    - Si los usas por equivocación, que sepas que el compilador no te dará error, pero luego no hará lo que querías.
	- Para elevar al cuadrado **jamás** uses `^2`, esto hace **otra cosa** (cambiar un bit) y el compilador no se quejará.
	- Si sabes que existen, los podrás utilizar fuera de la asignatura, cuando te sean necesarios.

---

# Asignación

## La vimos ya en el tema anterior

¡Siempre! llevan una variable a la izquierda:

	!c
	variable = expresion;

Evalúa la expresión de la derecha y la asigna a la variable de la izquierda.

## ATENCIÓN

Fíjate que **no es lo mismo** la asignación `=` y la operación de comparación de igualdad `==`. El compilador no se quejará si te equivocas (puede darte un *warning* o advertencia, pero no un error).

## ATENCIÓN

Existen variantes de este operador que no usaremos en esta asignatura. Puede que en los libros veas cosas como `i++`, significa básicamente lo mismo que `i=i+1`

---

# Conversiones de tipos

- Si en las operaciones aritméticas se combinan operandos de distintos tipos, se trabaja con el tipo del operando con más precisión y se devuelve ese tipo.
- Si a una variable entera se le asigna un resultado real, la parte decimal se pierde (se trunca).

## Operador de conversión de tipo o "casting"

La sintaxis es `(tipo) expresión`

	!c
	int a=10,b=3,c;
	float d,e;
	c = a/b; // el resultado es 3
	d = a/b; // el resultado es 3.0
	e = a/(float)b; // resultado 3.3333333
	
### ¡Ojo!

`(int)3.5+7.5` es diferente de `(int)(3.5+7.5)`
	
