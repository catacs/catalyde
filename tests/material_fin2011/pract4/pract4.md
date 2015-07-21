
# Práctica 4. Funciones

---

# Ejercicios de funciones

Completa el siguiente programa que calcula el área de un rectángulo:

	!c
	#include <stdio.h>
	#include <conio.h>
	float area_rectangulo(float base, float altura) {
      /* COMPLETAR */
	}
	float pedir_valor_float(char mensaje[]) {
	  float aux;
	  fprintf(stdout,mensaje);
	  fscanf(stdin,"%f",&aux);
	  return aux;
	}
	int main() {
	  float base, altura;
	  base   = pedir_valor_float("Introduce la base: ");
      /* COMPLETAR */
    }

Basándote en el ejercicio anterior, haz un programa (utilizando funciones) que pida la base y la altura de un rectángulo y que calcule su perímetro.

---

# Ejercicios de funciones


## Ejercicio

Haz una función que recibe estos datos:

- Hora
- Minutos
- Segundos

y que devuelve el número de segundos que hay entre las 00:00:00 y esa hora.

## Ejercicio

Utiliza el ejercicio anterior para hacer un programa que lea 2 instantes (hora, minuto, segundo) y que diga el número de segundos que hay entre ambos.

---

# Ejercicios de funciones

## Ejercicio

Haz una función que recibe los coeficientes `a`, `b` y `c` de una ecuación de segundo grado `f(x) = a*x*x+b*x+c`, así como el valor de la incógnita `x` y que calcule el valor de la ecuación en ese punto. Escribe un programa que pida los valores necesarios, llame a la función y muestre el resultado por pantalla.

---

# Probando la sentencia condicional `if`

La sentencia `if` la veremos en el próximo tema de teoría, pero como no es muy difícil, vamos a introducirla ahora para poder hacer ejercicios que hagan cosas más intersantes. Sirve para que tu programa haga o no una cosa determinada:

	!c
	if (condicion) {
	  instruccion; /* esta es la parte que */
	  ...          /* se ejecuta si la condicion */
	  instruccion; /* es cierta */
	} else {
	  instruccion; /* esta es la parte que */
	  ...          /* se ejecuta si la condicion */
	  instruccion; /* es falsa */
    }	  
	
## Ejemplo:

	!c
    if (edad >= 18) {
	  fprintf(stdout,"eres mayor de edad\n");
	} else {
	  fprintf(stdout,"eres menor de edad\n");
	}

---

# Probando la sentencia condicional `if`

## Ejercicio

Escribe un programa que pida la edad de una persona y diga si es mayor de edad o no. Utiliza una función llamada `pedir_edad` que pregunta al usuario por su edad y devuelve dicho valor (de tipo entero). 

## Ejercicio

Escribe un programa que pida un número entero y que nos diga si el número es par o impar. Para ello tienes que escribir una función llamada `es_par` que recibe un entero y que devuelve un 1 (que se interpreta como cierto en la condición de un `if`) si el número es par y que devuelva un 0 (se interpreta como falso) si el número es impar. Fíjate que una función que devuelve 1 o 0 de esa forma permite hacer algo así de simple:

	!c
	if (es_par(numero)) {
	  fprintf(stdout,"El número %d es par\n",numero);
	else {
	  fprintf(stdout,"El número %d es impar\n",numero);
	}

---

# Probando la sentencia condicional `if`

## Ejercicio

Haz una función que reciba un año como parámetro y que devuelva un 1 si el año es bisiesto y un 0 si el año no es bisiesto. Para ello tienes que utilizar operaciones aritméticas y lógicas. Un año es bisiesto si es divisible entre 4 pero no es divisible entre 100 salvo si es divisible entre 400.

## Ejercicio

Utiliza la función anterior para escribir un programa que pida al usuario un año y que diga si dicho año es bisiesto o no.

## Ejercicio

Haz una función llamada `maximo` que recibe 2 números enteros y que devuelve el mayor de ambos. Haz un programa para probar dicha función.

---

# Probando la sentencia condicional `if`

## Ejercicio

Utiliza la función anterior para hacer otra función llamada `maximo4` que recibe 4 números y devuelve el mayor de todos.

## Ejercicio

Una compañía telefónica cobra 40 céntimos por establecimiento de
llamada y 0.5 céntimos por segundo a partir del primer minuto. Escribe
una función que recibe el número de segundos de duración de la llamada
y que devuelva el precio (en euros) de dicha llamada. Por ejemplo, si
hacemos la llamada:

	!c
	tarifa(30)
	
devolvería 0.4, pero la llamada:


	!c
	tarifa(80)
	
devolvería 0.5


