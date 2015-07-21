
# Práctica 7. Ficheros

---

# Elefantes y otros animales

Escribe un programa que pida los siguientes datos:

- Nombre de un animal (nombre no compuesto, sin espacios en blanco de por medio).
- Un entero tope N.
- El nombre de un fichero.

A continuación, el programa debe escribir en dicho fichero (si ya existía, se pierde su contenido anterior) un mensaje explicando que un número de  esos animales en cuestión (desde 1 hasta N) se balancean en una telaraña. Ejemplo de uso:

	Introduce el nombre de un animal: lagartija
	Valor tope: 4
	Fichero: prueba.txt
	
Tras ejecutar el programa, el contenido del fichero `prueba.txt` sería como sigue:

	1 lagartija se balanceaba sobre la tela de una araña
	2 lagartija se balanceaba sobre la tela de una araña
	3 lagartija se balanceaba sobre la tela de una araña
	4 lagartija se balanceaba sobre la tela de una araña

---

# Adivinanza

Escribe un programa que lee un fichero llamado `ocultos.txt` que contiene números enteros que deben estar entre 1 y 100.
Para cada número, el programa debe pedir al usuario que lo adivine. Para ello, el programa pide que el usuario introduzca un número entre 1 y 100, contestando según corresponda uno de estos tres mensajes:

- Has acertado!
- El número oculto es menor.
- El número oculto es mayor.

Tras finalizar la pregunta de todos los números, el programa mostrará el siguiente ranking:

- Mayor número de intentos al adivinar un número.
- Menor número de intentos al adivinar un número.
- Número medio de intentos (ojo, puede tener decimales) al adivinar los números.

---

# Adivinanza (continúa)

Se aconseja crear una función con la siguiente cabecera:

	!c
	int adivina(int oculto) {

que recibe el número a  adivinar y devuelve el número de intentos. Por ejemplo, con la llamada `adivina(23)` y el  siguiente escenario:

	Intento 1, propon un valor entre 1 y 100: 50
	El numero oculto es menor.
	Intento 2, propon un valor entre 1 y 100: 25
	El numero oculto es menor.
	Intento 3, propon un valor entre 1 y 100: 12
	El numero oculto es mayor.
	Intento 4, propon un valor entre 1 y 100: 20
	El numero oculto es mayor.
	Intento 5, propon un valor entre 1 y 100: 23
	Has acertado, pero no busques empleo de adivino.
	
se devuelve el valor `5`. El mensaje de acertado puede depender del número de aciertos (hasta 2 `"eres un crack, compra un boleto de loteria"`, 3 o 4 `"no esta mal"`, más de 5 `"no busques empleo de adivino"`).

---

# EJERCICIOS PARA PRACTICAR EN CASA

---

# Estadísticas de notas

Escribe un programa que lea un fichero `notas.txt` que contiene un montón de notas (valores que pueden tener decimales) y que muestre por pantalla:

- Número de notas
- Número de aprobados
- Nota media
- Nota mínima
- Nota máxima

## Opcional:

Modifica el programa anterior para que además indique el número de personas que tienen una nota superior a la media. Para ello, sabiendo lo que sabes hasta ahora  (esto se podrá hacer de otra forma cuando veamos el tema de vectores) es necesario leer el fichero 2 veces: la primera para calcular la media y la segunda para comparar cada nota con la nota media.

---

# ¿Tu ordenador es adivino?

Piensa un número entre 1 y 100. Luego el programa te propone
un número y debes de contestar al siguiente menu hasta
que el ordenador acierte:

	Intento num 2. Creo que has pensado el 25, dime si:
	1 - He acertado
	2 - El numero que has pensado es menor
	3 - El numero que has pensado es mayor
	
Debes implementar el programa que se comporte así. Te proponemos que el ordenador siga esta estrategia más simple que el mecanismo de un botijo:

- El programa debe tener en 2 variables `inf` y `sup` (inicialmente 1 y 100).
- El programa siempre propone el valor medio entre `inf` y `sup` (la media pero con division entera), una modificación es un valor aletorio entre `inf` y `sup` (ver página siguiente).
- Si no ha acertado, saber si es menor o mayor ha de servir para actualizar la variable correspondiente del rango.

El programa deberá guardar en un fichero `log.txt`  el número adivinado junto al número de intentos (los 2 valores en cada línea). El fichero debe de abrirse en modo **añadir** para no perder los datos de jugadas anteriores.

---

# Mejorando los programas anteriores

Vamos a ver cómo puedes hacer que tu programa genere valores [pseudoaleatorios](http://es.wikipedia.org/wiki/N%C3%BAmero_pseudoaleatorio) para que él mismo piense unos cuantos números y los escriba en un fichero. Para ello, hay que incluir las siguientes bibliotecas:

	!c
	#include <stdlib.h>
    #include <time.h>
	
Al inicio del `main` debes realizar la siguiente llamada:

	!c
	srand(time(NULL));
	
Y luego para obtener un valor entero entre un valor inferior y otro superior hay que utilizar la función `rand()` que devuelve un número entero entre `0` y la constante `RAND_MAX`, aunque es mucho más práctico utilizar la siguiente función que hace uso de dicha función (para un generador más elaborado consulta [esta página](http://www.thinkage.ca/english/gcos/expl/c/lib/rand.html)):

	!c
	int elegir(int inferior, int superior) {
	  return inferior + rand() % (1+superior-inferior);
	}

---

# Contar primos

Escribe un programa que:

- Lee un fichero `numeros.txt` que debemos asumir que contiene únicamente números enteros.
- Muestra por pantalla los números de dicho fichero indicando si son primos o compuestos.
- Al finalizar, nos dice el número total de números primos contenidos en dicho fichero.

Como ayuda, puedes utilizar tal cual la siguiente función (mejorable) que recibe un número y nos devuelve cierto o falso dependiendo de si el número es primo o no:

	!c
	int es_primo(int numero) {
	  int i;
	  for (i=2; i<numero; i=i+1) {
        if (numero % i == 0) {
          return 0; /* 0 se interpreta como falso */
	    }
      }
      return 1; /* 1 se interpreta como cierto */
    }
	
---

# Escribir primos

Escribe un programa que pida un valor entero N y el nombre de un fichero. A continuación, el programa debe escribir en dicho fichero (si ya existía, se pierde su contenido anterior) los N primeros números primos.

---

# Listar positivos y negativos

Implementar un programa que saque por pantalla todos los números enteros almacenados en un fichero. Deben mostrarse primero los números positivos y posteriormente los negativos. El nombre del fichero se le preguntará al usuario.

Para poder probarlo habrá que crear previamente un archivo de texto con números enteros. Hágase con cualquier editor de textos (ej.: el propio devcpp o con el bloc de notas).

### Ejemplo de ejecución:

	Nombre del fichero: numeros.txt
	Los números positivos del fichero son: 7 12 8 127 44.
	Los números negativos del fichero son: -5 -17.
	
## Parecido

Modifica el programa anterior para que saque por un lado los números pares y por otro los números impares.

---

# Contar vocales

Escribe un programa que cuente el número de ocurrencias de las distintas vocales en un fichero. Es decir, el programa debe preguntar el nombre de un fichero, tras leerlo el programa mostrará en pantalla algo como en el siguiente ejemplo:

	El fichero tiene:
	120 'a'
	131 'e'
	 42 'i'
	 37 'o'
	 23 'u'

Para ello, te aconsejamos leer el fichero carácter por carácter usando `fscanf` con `%c`. También te aconsejamos utilizar `switch`.

---

# Copiar fichero

Escribe un programa que copie un fichero en otro yendo letra a letra. Es decir, hay que abrir el fichero origen en modo lectura y el destino en modo escritura. Mientras se pueda leer un carácter del primero, se copiará en el segundo. No es la forma más eficiente de copiar un fichero pero funciona.

