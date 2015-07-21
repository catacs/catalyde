
# T6 Estructuras de control para iteración (`while`, `do while` y `for`)

---

# Recordemos el Temario

- *Tema 1 Introducción a la Informática (semipresencial)*
- *Tema 2 Tipos de datos, variables y constantes*
- *Tema 3 Operadores y Expresiones*
- *Tema 4 Funciones. Funciones de entrada y salida básica*
- *Tema 5 Estructuras de control para selección (`if` y `switch`)*
- **Tema 6 Estructuras de control para iteración (`while`, `do while` y `for`)**
- *Tema 7 Entrada y salida con ficheros*
- *Tema 8 Vectores y cadenas*
- *Tema 9 Matrices*

## Contenidos del tema 6

- **6.1** bucle `while`
- **6.2** bucle `for`
- **6.3** bucle `do while`

---

# Instrucciones de repetición (bucles)

En `C` se repetirán las instrucciones mientras se cumpla una determinada condición.

Se dividen en dos tipos:

- Las que comprueban la condición **antes** de ejecutar el cuerpo del bucle: `while` y `for`

> Si la condición no se cumple la primera vez, las instrucciones del bucle no se ejecutan ni siquiera una vez.

- Las que comprueban la condición **después** de ejecutar el cuerpo del bucle: `do while`

> Las instrucciones dentro del bucle se ejecutan siempre por lo menos una vez, ya que la condición se comprueba después.
	
	
---

# `while`

## Sintaxis

	!c
	while (condicion) {
	  instrucciones;
	}
	
- Mientras se cumpla la condición, ejecuta el bloque de instrucciones.
- Cuando no se cumpla la condición, se continúa con el programa.
- Si la condición es falsa la primera vez, las instrucciones del bucle no llegan a ejecutarse.
- Es importante que dentro del bucle se haga falsa la condición en algún momento (tras unas cuantas iteraciones). Si no, se producirá un “bucle infinito” (Ídem para for y do while).
- En un bucle infinito el ordenador se queda “colgado” ya que nunca sale del bucle.
- Si el bloque de instrucciones tiene una sola instrucción, podemos prescindir de las llaves, aunque tampoco molestan.

---

# `while`

## Ejemplo:

Mostrar por pantalla la tabla de multiplicar

	!c
	#include <stdio.h>
	#include <conio.h>
	void tabla_multiplicar(int d) {
	  int i=0;
	  while (i<=10) {
	    fprintf(stdout,"%2d x %2d = %3d\n",i,d,i*d);
		i = i+1;
	  }
	}
	int main() {
	  int n;
	  fprintf(stdout,"De qué valor quieres la tabla?");
	  fscanf(stdin,"%d",&n);
	  tabla_multiplicar(n);
	  getch();
	  return 0;
	}

---

# `for`

Se puede considerar una forma abreviada de hacer determinadas expresiones con bucles while

	!c
	for (inicializacion; condicion; actualizacion) {
		instrucciones;
	}
	
Es equivalente a:

	!c
	inicializacion;
	while (condicion) {
		instrucciones;
		actualizacion;
	}
	
Suele utilizarse para recorrer un rango de valores predefinido. Por ejemplo, para ir desde 100 hasta 200 de 2 en 2 haríamos:

	!c
	int i;
	for (i=100; i<=200; i=i+2) {
	  /* aquí ponemos el codigo que se ejecutara una vez para cada
	     valor de i desde 100 hasta 200 de 2 en 2, ejemplo: */
	  fprintf(stdout,"i = %d\n",i);
	}

---

# `for`

## Ejemplo:

Para mostrar por pantalla la tabla de multiplicar utilizando `for` en lugar de `while`, basta con modificar la función auxiliar de la manera siguiente:

	!c
	void tabla_multiplicar(int d) {
	  int i;
	  for (i=0; i<=10; i=i+1) {
	    fprintf(stdout,"%2d x %2d = %3d\n",i,d,i*d);
	  }
	}

---

# Ejercicio: cálculo de un sumatorio

### Calcula el sumatorio desde 1 hasta n de la función `f(x)=sin(x)*cos(x)`

Para calcular un sumatorio, utilizaremos una variable inicializada a cero (el neutro de la suma) donde iremos acumulando uno a uno los distintos sumandos, cada iteración de un bucle servirá para procesar un nuevo valor de i desde 1 hasta n:

	!c
	float sumatorio(int n) {
	  float acumula=0;
	  int i;
	  for (i=1; i<=n; i=i+1) {
	    acumula = acumula + sin(i) * cos(i);
	  }
	  return acumula;
	}

### Ejercicio:

Haz un programa que pida el valor de `n` y muestre el resultado del sumatorio por pantalla. Modifica la función anterior para que utilice `while` en lugar de `for`.

---

# Ejercicio:

Haz un programa que pida por teclado las notas de 10 alumnos. Tras pedir dichos valores, el programa deberá mostrar por pantalla los datos siguientes:

- Número de aprobados (nota >=5)
- La nota media.
- La mayor y la menor de todas las notas.

### Nota

Recuerda que una variable solamente contiene el último valor escrito en ella. Por lo que es necesario ir calculando cosas en el mismo bucle en el que vas pidiendo los datos al usuario. Para ello, se acoseja disponer de variables para:

- Contabilizar el número de aprobados
- La suma de todas las notas (para calcular la media)
- La mayor de todas las notas.
- La menor de todas las notas.

---

# `do while`

## Sintaxis

	!c
	do {
	  instrucciones;
	} while (condicion);
	
## Comportamiento:	

“Ejecutar instrucciones y volver a ejecutarlas una y otra vez mientras se cumpla la condición”.

**La primera vez las instrucciones del bucle siempre se ejecutan, independientemente del valor de la condición.**


### Uso típico:

Se suele utilizar para volver a pedir un dato cuando éste es incorrecto	

---

# `do while`

Compara este trozo de código:

	!c
	int i=2;
	while (i<0) {
	  fprintf("Wop!\n");
	  i=i+1;
	}

Con este otro:

	!c
	int i=2;
	do {
	  fprintf("Wop!\n");
	  i=i+1;
	} while (i<0);

¿cuántas veces se imprime `Wop` en cada caso?

---

# Usos típicos de `do while`

## Hacer algo hasta que se cumpla una condición:

	!c
	do {
		algo;
	} while ( no se cumple condición );

## Preguntar al usuario un dato en un rango dado:

	!c
	do {
		printf("Dame ...: "); scanf(...);
		if ( no cumple el rango )
			printf("ERROR ...\n");
	} while ( no cumple el rango );
	
---

# Usos típicos de `do while`

## Preguntar al usuario un dato en un rango dado:

	!c
	int pregunta_rango(int inferior, int superior) {
		int valor;
		do {
		    fprintf(stdout,"Introduce un valor entre %d y %d"
			       " (inclusive): ", inferior, superior);
			fscanf(stdin,"%d",&valor);
			if (valor < inferior || valor > superior)
			  fprintf(stdout,"El valor está fuera del rango\n");
		} while (valor < inferior || valor > superior);
		return valor;
	}

Si el usuario se equivoca y da un valor fuera del rango solicitado, el programa volverá a pedir el valor de nuevo tantas veces sea necesario.

### Ejercicio

Haz una función que pida al usuario una hora dada (hora, minutos y segundos). Si alguno de los tres valores está fuera de rango, se volverá a pedir dicho valor. La función devolverá el número de segundos desde las 00:00:00 hasta dicho instante.

