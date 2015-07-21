
# Práctica 3. Expresiones

---

# Objetivos
- Familiarizarte con el uso de expresiones
- Seguir familiarizándote con la estructura básica de un programa
- Aprender algo más de
    - `fprintf` para mostrar resultados (por ahora, por pantalla)
    - `fscanf` para leer datos (por ahora, de teclado)

---

# Estructura básica de un programa en `C`

    !c
    #include ... /* inclusión de bibliotecas */
    #define  ... /* definición de constantes */

    funciones /* definición de funciones */

## La función `main`
- Cuando se ejecuta un programa, se llama a la función `main`
-  Sin `main` el compilador **no genera un ejecutable** (aunque puedes compilar tus propias **bibliotecas de funciones** para incluirlas en otros programas, en ese caso no hace falta la función `main`)
- Cuando la función `main` finaliza, el programa termina

---

# Estructura básica de un programa en `C`

    !c
    #include ... /* inclusión de bibliotecas */
    #define  ... /* definición de constantes */

    /* aquí podremos añadir funciones auxiliares */

    int main() { /* pero main siempre tiene que estar */
	  tipodato variable=valor_inicial; /* variables locales */
	  ...	                           /* variables locales */
      instruccion1; /* instrucciones */
      instruccion2;
      ...
      getch(); /* normalmente, para dar
                  tiempo a ver la salida */
      return 0;
    }

## Atención

- Las instrucciones terminan siempre con punto y coma `;`
- Exceptuando `#include` y `#define`

---

# Función de salida de datos `fprintf`

	!c
	fprintf(salida, cadena_control, resto_argumentos);
	
- `salida`  es por dónde se muestran los datos, de momento utilizaremos `stdout` que representa la pantalla del ordenador.
- `cadena_control` es una cadena con dos clases de elementos:
    - Caracteres normales que se imprimirán por pantalla directamente.
    - Caracteres especiales de formato que definen el modo en que se visualizarán los argumentos. Siempre empiezan con el carácter `%`. Exceptuando la combinación `%%`, hay un argumento extra por cada caracter de formato.
- `resto_argumentos`
    - Es una lista de cero o más elementos separados por comas.
	- Para cada argumento deberá haber una secuencia especificando el formato deseado en la `cadena_control`.

### Ejemplo:	
	!c
	fprintf(stdout,"%d %d %s\n", entero1, entero2, cadena);

---

# Función de salida de datos `fprintf`

## Cadena de control `%X`

`X` : Letra que indica el tipo de dato que se quiere mostrar

- `c` Carácter
- `s` Cadena de caracteres
- `d` Número entero
- `i` Número entero
- `f` Número real en notación de punto fijo
- `e` Número real en notación científica
- `g` Real en punto fijo o científica, según convenga

### ¡Ojo! Para imprimir `%` escribiremos `%%` en la cadena de formato.

	!c
	fprintf(stdout,"El precio con un 20%% de descuento es %f\n",
	        precio*0.8);
	
---

# Función de salida de datos `fprintf`

## Ejercicio:

### Prueba este programa y analiza el resultado

	!c
    #include <stdio.h> /* para usar fprintf */
    #include <conio.h> /* para usar getch */
    int main() {
	  float v = 1.23456e12;
	  fprintf(stdout,"%f\n",v);
	  fprintf(stdout,"%e\n",v);
	  fprintf(stdout,"%g\n",v);
	  v = 1.23;
	  fprintf(stdout,"%f\n",v);
	  fprintf(stdout,"%e\n",v);
	  fprintf(stdout,"%g\n",v);
      getch();
      return 0;
    }

---

# Función de salida de datos `fprintf`

## Cadena de control completa `%-+0n.mX`

Lo mínimo a poner sería `%X`. Lo demás es opcional, útil para mostrar los resultados tabulados o para indicar la precisión de los valores numéricos:

-	`-` : Alinear a la izquierda
-	`+` : Incluir siempre el signo (+ ó -)
-	`0` : Alinear rellenando con ceros en lugar de espacios
-	`n` : Valor entero que indica el mínimo número de caracteres (totales) a mostrar
-	`.m` : `m` es un valor entero que indica el número de dígitos decimales a mostrar

### Algunas opciones sólo funcionan con algunos tipos de datos

- `+` y `0` son para valores numéricos.
- `.m` es para valores en coma flotante.

---

# Función de salida de datos `fprintf`

### Prueba este programa y analiza el resultado:

	!c
    #include <stdio.h>
    #include <conio.h>
    int main() {
	  fprintf(stdout,"%-4d euros\n",5);
	  fprintf(stdout,"%-4d euros\n",50);
	  fprintf(stdout,"%4d euros\n",5);
	  fprintf(stdout,"%4d euros\n",50);
	  fprintf(stdout,"%04d euros\n",5);
	  fprintf(stdout,"%04d euros\n",50);
      getch();
      return 0;
    }

### Salida:

	5    euros
	50   euros
	   5 euros
      50 euros
    0005 euros
    0050 euros

---

# Función de salida de datos `fprintf`

	!c
    #include <stdio.h>
    #include <conio.h>
	#define N 80 /* longitud maxima */
    int main() {
	  char nombre1[N], nombre2[N];
	  int  edad1, edad2;
	  fprintf(stdout,"Nombre y edad: ");
	  fscanf(stdin,"%s%d",nombre1,&edad1);
	  fprintf(stdout,"Nombre y edad: ");
	  fscanf(stdin,"%s%d",nombre2,&edad2);
	  fprintf(stdout,"- %8s tiene %2d años\n",nombre1,edad1);
	  fprintf(stdout,"- %8s tiene %2d años\n",nombre2,edad2);
      getch();
      return 0;
    }
	
### Ejemplo:

    Nombre y edad: Juan 12
    Nombre y edad: Perico 8
    -     Juan tiene 12 años
    -   Perico tiene  8 años

---

# Función de entrada de datos `fscanf`

	!c
	fscanf(entrada, cadena_control, resto_argumentos);

- Similar a `fprintf`, pero en sentido inverso.
- Lee datos por `entrada`. Pondremos `stdin` para referirnos al teclado.
- En la `cadena_control` solamente deben aparecer caracteres de control.

### El formato de la cadena de control es: `%X`

- `%c` para leer un caracter, **a veces** usaremos `\\n%c`
    - El **problema** de la lectura de caracteres es el buffer que suele guardar el salto de línea de la lectura anterior, `\n` antes de `%c` *se come el `\\n`*
- `%s` para leer una cadena de caracteres
    - **es la única que NO lleva '`&`' **
    - **No lo usaremos para leer cadenas que contengan espacios.**
- `%d` para leer un entero
- `%f` para leer un valor de tipo `float`

### **No** se indican datos de precisión, alineación, etc.

---

# Función de entrada de datos `fscanf`

- En `resto_argumentos` diremos en qué variables deseamos que se guarden los valores
- Las variables han de ir precedidas por el símbolo `&` **excepto las cadenas de caracteres**
- El símbolo `&` está relacionado con conceptos (*punteros*) que **no vamos a ver en esta asignatura** (salvo en el `fscanf`). Intuitivamente, es la forma de decirle a la función `fscanf` que le damos acceso a la variable para que escriba en ella en lugar de pasarle los valores contenidos en dicha variable.
- Al leer,  utiliza como delimitadores los espacios en blanco y saltos de línea **excepto al leer caracteres individuales con `%c`**.

## Ejemplo:

	!c
	int a,b;
	char letra, cadena[80];
	fprintf(stdout,"Introduzca 2 enteros, una letra y una cadena:");
	fscanf (stdin, "%d%d%c%s",&a,&b,&letra,cadena);

---

# Función de entrada de datos `fscanf`

## `%s` lee una cadena hasta un separador

Prueba este programa, introduce un nombre compuesto (Juan Carlos, María Elena) ¿qué ocurre?

	!c
    #include <stdio.h>
    #include <conio.h>
	#define N 80 /* longitud maxima */
    int main() {
	  char nombre[N];
	  fprintf(stdout,"Nombre: ");
	  fscanf(stdin,"%s",nombre1);
	  fprintf(stdout,"Hola %s!\n\n",nombre2);
      getch();
      return 0;
    }
	
## Para leer una línea entera

Utilizaremos otra función (`fgets`) que ya veremos en el tema 4, pero de momento no.

---

# EJERCICIOS DE OPERADORES Y EXPRESIONES

---

# Expresiones aritméticas

## Ejercicio

Implementar un programa para el cálculo del cociente y el resto de la división
de dos números **enteros** que se pedirán al usuario por teclado.

## Ejercicio

Escribe un programa que lea un número entero y que muestre las 2 últimas cifras de dicho número *(pista: tiene que ver con divisiones y restos)*.

## Ejercicio

- Escribe un programa que lea una hora, minutos y segundos y que nos diga el número de segundos transcurridos desde las `00:00:00` hasta la hora introducida por el usuario.
- Escribe un programa que lea el número de segundos transcurridos desde las `00:00:00` y muestre esa hora en el formato `HH:MM:SS`.


---

# Ejercicio (bar)

Escribir un programa que permita calcular el coste de
las consumiciones realizadas en un pequeño bar.
El programa deberá pedir el número de unidades de cada producto
que se han dispensado y calcular el precio total, utilizando
para ello la siguiente tabla de precios:

- bocata de chorizo -> 1.50 euros
- bocata de tortilla -> 1.20 euros
- botella de agua mineral -> 0.50 euros
- lata de coca-cola -> 0.60 euros
- tercio de cerveza -> 0.75 euros

Para ello se aconseja definir las siguientes constantes:

	!c
    #define PVP_CHORIZO  1.50
    #define PVP_TORTILLA 1.20
    #define PVP_AGUA     0.50
    #define PVP_COLA     0.60
    #define PVP_TERCIO   0.75


---

# Ejercicio (bar, continuación)

A continuación, has de mostrar algo similar a este ejemplo:

	Bocadillos de chorizo: 1
	Bocadillos de tortilla: 2
	Botellas de agua: 3
	Refrescos de cola: 2
	Tercios: 3

	En total son 8.85 euros
	Entrega: 10
	Devolución: 1.15 euros
	
(donde el usuario introdujo los valores 1, 2, 3, 2, 3 y finalmente 10)

### Plantéalo por etapas:

- ¿Cuántas variables necesitas?
- Pide el número de valores de cada producto
- ¿Cómo calcular el precio total?
- ¿Cómo se imprime el total o la devolución con solamente 2 decimales? (recuerda los formatos)

---

# Ejercicio (ficha alumno)

Escribe un programa que pida los siguientes datos de un alumno:

- Nombre (si es compuesto, que se separe con `-`)
- Primer apellido
- Segundo apellido
- Edad (un entero)
- Sexo (H/M)
- Créditos matriculados

Tras pedir esos datos, el programa debe mostrar por pantalla todos los datos previamente introducidos por teclado.

---

# Ejercicios extra

## Ejercicio

Escribe un programa que lea:

- una hora, minutos y segundos inicial
- a continuación leerá otra hora, minutos y segundos final

Con esos datos debe calcular y mostrar por pantalla el número de segundos transcurrido entre ambos momentos.

## Ejercicio

Escribe un programa que lea un número entero entre 0 y 255 y que
muestre por pantalla el mismo número convertido en binario. Para ello, puedes calcular el módulo al dividir entre 2 y dividir el número entre 2, un máximo de 8 veces.

