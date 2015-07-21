
# Práctica 5. Estructuras de control para selección (`if` y `switch`)

---

# Ejercicio

Para aprobar una asignatura (tranquilo/a, no en ésta) se hacen 2 parciales y hace falta:

- Sacar un compensable (nota mayor o igual a 4) en cada parcial.
- Que la nota media sea mayor o igual a 5.

Escribe una **función** que recibe las notas de los dos parciales (valores de tipo `float`) y que devuelva la nota final (si está aritméticamente aprobado pero tiene algún no compensable, se le pone un 4).

Escribe un programa que pida la nota de cada parcial y que utilice la
función anterior para calcular la nota final. Además, el programa dirá si el alumno está aprobado o suspendido como se muestra en este ejemplo:

	Introduce la nota del primer  parcial: 4.5
	Introduce la nota del segundo parcial: 7
	El alumno ha aprobado con un 5.75

---

# Ejercicio

Un parking tiene la siguiente tarifa:

- La primera hora cuesta a 10 céntimos el minuto.
- A partir de la primera hora, cuesta 5 céntimos el minuto.
- El precio mínimo es de 2 euros.
- El precio máximo es de 10 euros.

Escribe una función que recibe el número de minutos (enteros) y que devuelve el precio a pagar.

Escribe un programa que pida el número de minutos estacionados y que muestre por pantalla la tarifa correspondiente.

---

# Ejercicio (usando `switch`)

Escribe un programa que pida dos números en coma flotante y que luego muestre por pantalla el siguiente menu:

	1) sumar
	2) restar
	3) multiplicar
	4) dividir

A continuación, el programa debe mostrar por pantalla el resultado de la operación realizada con los dos datos que se han introducido previamente. Si la operación solicitada es la división y el segundo operando es cero, el programa deberá evitar realizar la división y mostrará un mensaje de error.

---

# Ejercicio (usando `switch`)

Escribe un programa que pida al usuario un mes y un año. A continuación, el programa deberá mostrar por pantalla el número de días de dicho mes. En caso de tratarse de febrero, el sistema deberá comprobar si el año es bisiesto usando la función del ejercicio correspondiente de la práctica anterior que repetimos aquí por completitud:

> Un año es bisiesto si es divisible entre 4 pero no es divisible entre 100 salvo si es divisible entre 400.

Por tanto, para concretar:

- Escribe la función bisiesto (devuelve 1 si es bisiesto y 0 si no lo es).
- Escribe otra función que recibe el año y el mes (enteros) y devuelve el número de días (entero).
- Escribe un programa principal (función `main`) que pide al usuario que introduzca el mes (un valor entre 1 y 12) y el año y que devuelva el número de días de dicho mes.

---

# Ejercicios extra (deberes para casa)

---

# Ejercicio

Escribe un programa que pida los coeficientes `a`,`b` y `c` de una ecuación de segundo grado `a*x*x+b*x+c` y que muestre por pantalla las raices reales (si las tiene) o que indique que no las tiene. Para ello, como *pista* ofrecemos la solución para una ecuación de primer grado (que es un caso particular de la de segundo grado):

	!c
	void mostrar_raices(float b, float c) {
	  /* muestra por pantalla las raices de b*x+c == 0 */
	  if (b == 0) { /* estamos en el caso c == 0 */
        if (c == 0) {
		  fprintf(stdout,"0 == 0 tiene infinitas soluciones\n");
		} else {
		  fprintf(stdout,"%f == 0 no tiene solucion\n",c);
		}       /* dividir entre b sin comprobar si vale 0 */
	  } else {  /* es peligroso, puede dar un error */
	    fprintf(stdout,"x = %f es la unica solucion\n",-c/b);
	  }
	}


---

# Ejercicios

## Comprobar mayoría de edad

Escribe un programa que pida el día, mes y año de nacimiento de una persona y que diga si podrá votar o no (respecto a que sea mayor de edad) el próximo 20 de noviembre.

## Capicúa (de 4 cifras)

Escribe un programa que pida un número de 4 cifras (entre 1000 y 9999) y que diga si el número es o no capicúa. El número es capicua cuando la primera y la última cifra coinciden, así como la segunda y la tercera. Por ejemplo, 1221 es capicúa, 2332 también lo es, pero 1234 no lo es.

## Hora correcta

Escribe un programa que recibe una hora (formato 24h) y minutos. A continuación, el programa debe mostrar por pantalla si la hora es correcta o no. Por ejemplo, las quince y cien no es correcta.
