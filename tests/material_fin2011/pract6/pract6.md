
# Práctica 6. Estructuras de control (`while`, `do while` y `for`)

---

# Elefantes

Escribe un programa que pida un valor entero N y que muestre por pantalla un mensaje sobre el número de elefantes que se balanceaban sobre la cuerda de una araña desde 1 hasta N. Por ejemplo:

	Cuantos elefantes hay al final? 4
	1 elefantes se balanceaban sobre la cuerda de una araña
	2 elefantes se balanceaban sobre la cuerda de una araña
	3 elefantes se balanceaban sobre la cuerda de una araña
	4 elefantes se balanceaban sobre la cuerda de una araña

**Nota:** Por simplicidad, no es necesario que el programa escriba `elefante` en singular para el caso de un solo elefante.

## Actividades:

1. Resuelve el problema utilizando un bucle `while`
2. Modifica el programa para utilizar un bucle `for` en lugar de `while`

---

# Contar pares

Escribe un programa que pida N números enteros al usuario (siendo N una constante definida con `#define`) y que, a continuación, diga cuántos de los números introducidos eran pares y cuántos eran impares. Para ello, se aconseja utilizar las siguientes funciones:

	!c
	int pedir_entero() {
	  int a;
	  fprintf(stdout,"Introduce un numero entero: ");
	  fscanf(stdin,"%d",&a);
	  return a;
	}
	
	/* recibe un entero y nos dice si es par o no */
	int es_par(int n) {
	  return n % 2 == 0;
	}
	
**Recuerda:** contar cosas es realmente sencillo, basta con tener una variable (*importante que esté incializada a cero*) que se incrementa (en plan `contador=contador+1;`) por cada cosa que quieras contabilizar.

---

# Pintar cuadrados

Escribe una función llamada `pintar_cuadrado` que recibe el lado de un cuadrado (un número entero) y un caracter con el que pintar el cuadrado. La función no devuelve nada pero muestra por pantalla un cuadrado como se muestra en el siguiente ejemplo con la llamada y lo que mostraría por pantalla:

	!c
	pintar_cuadrado(3,'A');
	
	AAA
	AAA
	AAA
	
	pintar_cuadrado(5,'*');
	
	*****
	*****
	*****
	*****
	*****
	
La cabecera de la función sería:

	!c
	void pintar_cuadrado(int lado, char relleno) {
	
---

# Pintar cuadrados

Se aconseja plantearse primero algo más sencillo: una función llamada `pintar_linea` que se comporta como en estos ejemplos:

	!c
	pintar_linea(4,'*');
	
	****
	
	pintar_linea(7,'A');

	AAAAAAA

Puedes utilizar un bucle para pintar un solo caracter en cada iteración y, tras el bucle, imprimir un cambio de línea.

¡Con la ayuda de la función `pintar_linea` la función `pintar_cuadrado` es casi inmediata!

---

# Otra vez la calculadora

Escribe un programa que simule una calculadora. El programa mostrará el valor asociado a la pantalla de una calculadora convencional y, a continuación, pedirá al usuario elegir una de las opciones, como muestra este ejemplo:

	----- Menu -----
	1 - Sumar
	2 - Restar
	3 - Multiplicar
	4 - Dividir
	5 - Salir
	Valor calculadora: 2.5
	Elije opcion:
	
Utiliza `#define SUMAR 1` y similares para que el programa resulte más legible.	
	
La opción `5 - Salir` termina el programa. El resto de opciones pedirán un número y luego lo utilizarán para actualizar el valor de la pantalla, como muestra la continuación del mismo ejemplo:

	Elije opcion: 1
	Numero a sumar: 10
	
---

# Otra vez la calculadora

De modo que, tras pedir el valor `10`, volverá a mostrar el menu con el valor de pantalla actualizado:

	----- Menu -----
	1 - Sumar
	2 - Restar
	3 - Multiplicar
	4 - Dividir
	5 - Salir
	Valor calculadora: 12.5
	Elije opcion:
	
Para ello, se pide realizar una función con la siguiente cabecera:

	int mostrar_menu(float valor_pantalla) {
	
que muestra el valor de la pantalla y el menu, pide la opción al usuario y la devuelve para que la utilice la función principal `main`.

También se aconseja utilizar un bucle  `while` o `do while` con una condición asociada a la variable `opcion` para que el programa repita todo el proceso mientras la opción elegida sea distinta de `SALIR`.


---

# ¿Quién ha ganado?

Se ha realizado una carrera en la que han participado N corredores. N es una constante definida al principio del programa (prueba con 4, aunque el programa debe funcionar para cualquier valor N>0).

Para cada corredor vamos a preguntar por su dorsal (un valor entero) y por el tiempo en segundos.

Tras pedir esos datos, el programa deberá mostrar por pantalla la dorsal del atleta ganador.

Se aconseja proceder por etapas y diseñar un esquema o algoritmo en pseudo-código antes de pasar a codificar el programa en C. Si no tienes claro cómo resolverlo, una buena estrategia consiste en plantearte problemas algo más sencillos:

 - ¿Sabrías hacer un programa que se limitara a pedir la dorsal y el tiempo de los N participantes?
 - ¿Sabrías pedir N valores y conseguir calcular el mínimo de todos en una variable?
 - ¿Y podrías guardarte la dorsal asociada al valor asociado a dicho mínimo?


---

# Números primos

### Ejercicio

Escribe una función que recibe un número entero y que nos devuelve un 1 (valor cierto) si el número es primo o un 0 (valor falso) si el número no es primo. La función debe probar si el número es divisible (utilizando el operador `%`) entre algún valor inferior y, en tal caso, devolver inmediatamente un falso (un 0). Si no encuentra ningún divisor, finalmente devolverá cierto (un 1). Recuerda que si pones un `return` en un `if`, la función termina en cuanto alcanza el `return` y devuelve el valor correspondiente.

### Ejercicio

Basándote en la función anterior, escribe un programa que pida un número entero y que indique por pantalla si el número es primo o compuesto.

### Ejercicio

Escribe un programa que pide un número entero positivo N y que muestre
por pantalla los N primeros números primos.

