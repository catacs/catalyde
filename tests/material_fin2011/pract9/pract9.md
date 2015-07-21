
# Práctica 9. Más ejercicios de cadenas y de vectores

---

# Datos de venta de una tienda

El fichero `ventas.txt` contiene los códigos de productos que se han vendido. Cada código es un número del 0 al 99. Para hacer pruebas, puedes crear un fichero `ventas.txt` como en el siguiente ejemplo:

	10 10 10 5 5 10 5 3 3 3 5 4 3 3 3 4
	4 5 10 10 7 20 20 45 80 45 80 4

En el que se han vendido un total de 28 productos, 8 de ellos diferentes (3,4,5,7,10,20,45,80). Los que más se han vendido se han vendido 6 veces (el 10,...). Nos piden realizar un programa que lea el fichero y calcule:

- El número de productos que se han vendido de cada tipo.
- Cuántas cosas se han vendido (28 en el ejemplo).
- Cuántos productos **diferentes** se han vendido (el mismo producto vendido más de una vez solo cuenta por uno, 8 en el ejemplo).
- ¿Cuál es el código del producto que se ha vendido más veces? Si hay varios productos que empatan, hay que listarlos todos.

---

# Datos de venta de una tienda

La dificultad de este ejercicio está en que:

- Hay que leer valores de un fichero pero no sabemos cuántos valores contiene. Para ello recuerda que la solución es aprovechar que la función `fscanf` te devuelve el número de cosas que ha conseguido leer.
- Hay que calcular una especie de *histograma*: el número de productos vendidos de cada tipo. Para ello se aconseja utilizar un vector de talla 100 para que cada casilla del vector almacene el número de productos asociados a cada código. En ese caso, **el código se utiliza como índice del vector**.
- Para listar todos los productos que se han vendido más veces, hay que realizar **dos pasadas** por el vector:
    - La primera para calcular el máximo número de elementos vendidos de un mismo código (el máximo del vector, vaya).
	- Buscar los códigos cuyo número de veces vendidos coincida con el máximo calculado previamente.

---

# Contar capicúas

Un fanático de los juegos de palabras quiere que contemos el número de palabras capicúa contenidas en un fichero y además las mostremos por pantalla. Para ello nos piden:

- Escribir una función llamada `es_capicua` que recibe una cadena de caracteres y nos dice si dicha cadena es capicúa. Para ello hay que verificar que la primera letra coincide con la última, la segunda con la penúltima y así sucesivamente hasta llegar a la mitad de la cadena.

- Escribe un programa que lea las palabras de un fichero (recuerda que `fscanf` con `%s` lee palabras) y que utilice la función anterior para determinar si las palabras en cuestión son o no capicúa.

- Puedes crear un fichero de prueba `prueba.txt` con el siguiente contenido:

        hola anna , ojo que la erre y la ene son consonantes
        y ese oso no es de otto pero tiene un ala y un radar

---

# Contar capicúas

Te proponemos abordarlo **por etapas** de menor a mayor dificultad:

1. Leer, una por una, todas las palabras del fichero `prueba.txt`. Recuerda que no sabemos el número de palabras que contiene, para ello puedes hacer:

	    !c
		char palabra[MAX];
		FILE* fich = fopen("prueba.txt","r");
		while (fscanf(fich,"%s",palabra) == 1) {
          if (es_capicua(palabra)) {
	        fprintf(stdout,"%s\n",palabra);
	      }
	    }

2. Para ver que una palabra es capicúa te aconsejamos utilizar dos índices enteros `i` y `j` de modo que `i` sea el índice de la primera letra de la palabra, mientras que `j` vale la posición de la última letra. Vas mirando si la cadena vale igual en esas posiciones, y en ese caso vas acercando las posiciones de `i` y de `j` hasta que se encuentren (si encuentras antes un caso donde no serán capicúas, si se llegan a cruzar sí lo son).

---

# Palíndromos

El mismo fanático de los juegos de palabras va de mal en peor y ahora quiere que veamos si una cadena introducida por el usuario (usando `fgets`) es un palíndromo (se puede leer igual de izquierda a derecha y de derecha a izquierda). Para ello, puedes basarte en la función `es_capicua` del ejercicio anterior, pero primero habrás de crear otra función llamada `quita_espacios` que copia en una cadena el contenido de otra eliminando los espacios en blanco.

Por ejemplo, si en este programa:

	!c
	#define TAM 100
	int main() {
	 char antes[TAM],despues[TAM];
	 ...
	 quita_espacios(antes,despues);
	 ...
	 
La variable `antes` contiene la cadena `"dabale arroz a la zorra el abad"`, tras ejecutar la función la variable `despues` contendrá la cadena 
`"dabalearrozalazorraelabad"`. Para ello has de recorrer la primera cadena copiando en la segunda lo que no sean espacios. Es IMPORTANTE poner un `'\0'` al final en la cadena de destino.

---

# EJERCICIOS OPCIONALES PARA CASA

---

# Muchas piedras, papeles y tijeras

Un par de fanáticos del juego "Piedra, papel y tijera" han anotado en el fichero `jugadas.txt` el resultado de todos sus encuentros. Cada línea del fichero lleva la fecha puesta en formato "año mes día opcionA opciónB" como muestra el siguiente ejemplo:

	2010 2 12 piedra tijera
	2010 2 20 piedra papel
	...
	
Ahora a nuestros amigos les gustaría sacar una estadística del número de veces que han empatado y que ha ganado cada uno de ellos en función del mes del año (el fanatismo es lo que tiene). La idea es que muestre, para cada uno de los 12 meses del año, el número de veces que gana A, que gana B y que empatan. Es decir, la salida ha de ser como en este ejemplo:

	Mes  1: A gana 2 veces, B gana 5 veces, empatan 7 veces.
	Mes  2: A gana 4 veces, B gana 1 veces, empatan 4 veces.
	...
	Mes 12: A gana 3 veces, B gana 0 veces, empatan 5 veces.

---

# Muchas piedras, papeles y tijeras

Para realizar este ejercicio te recomendamos lo siguiente:

- Utiliza las funciones del ejercicio de "piedra, papel y tijera" que hiciste en la práctica anterior. Hay una solución colgada en poliformaT.
- Utiliza vectores de enteros de talla 12 para contar el número de veces que gana cada uno o que empatan en cada mes.
- RECUERDA que un vector de talla 12 tiene índices de 0 al 11, mientras que en el fichero los meses aparecen numerados de 1 al 12, así que has de desplazar esos valores de manera adecuada (¡esto pasa en muchos ejercicios!).

