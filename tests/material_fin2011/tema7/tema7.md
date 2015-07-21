
# T7 Entrada y salida con ficheros

---

# Recordemos el Temario

- *Tema 1 Introducción a la Informática (semipresencial)*
- *Tema 2 Tipos de datos, variables y constantes*
- *Tema 3 Operadores y Expresiones*
- *Tema 4 Funciones. Funciones de entrada y salida básica*
- *Tema 5 Estructuras de control para selección (`if` y `switch`)*
- *Tema 6 Estructuras de control para iteración (`while`, `do while` y `for`)*
- **Tema 7 Entrada y salida con ficheros**
- *Tema 8 Vectores y cadenas*
- *Tema 9 Matrices*

---

# Contenidos del tema 7

- **7.1** Concepto de fichero
- **7.2** Modos de apertura (lectura, escritura, añadir)
- **7.3** Lectura de un fichero
- **7.4** Escritura en un fichero
- **7.5** Añadir a un fichero

---

# Concepto de fichero

Todos tenemos una idea intuitiva de lo que es un fichero: tiene un nombre (que lleva una extensión como `.c`, `.txt`, etc.) tiene propiedades (permisos de lectura y de escritura), tiene un tamaño (el número de bytes que ocupa).

El concepto de fichero usado en C no solamente representa datos guardados en un dispositivo, también se pueden referir a dispositivos de entrada/salida, etc. En esta asignatura ya hemos estado utilizando esta noción de ficheros, puesto que:

- `stdout` es el fichero que representa la salida estándar (la pantalla del ordenador),
- `stdin` es el fichero que representa la entrada estándar (el teclado).

Es decir, todo lo que ya sabes de `fprintf` y de `fscanf` ya te sirve para ficheros ;)

## Nombre, carpetas y ruta

Los ficheros normalmente se organizan en carpetas/directorios, de modo que para referirnos a un fichero normalmente hay que dar una "ruta" que nos dice no solamente su nombre sino cómo acceder al fichero.

---

# Apertura y cierre de un fichero

Cuando un programa quiere manipular un fichero, en primer lugar tiene que **abrirlo**. Para abrir un fichero desde un programa en C se utiliza la función `fopen` (abreviatura de file open) que tiene esta cabecera:

	!c
	FILE* fopen(char ruta_del_fichero[], char modo_de_apertura[]);
	
La  ruta permite encontrar el fichero desde la carpeta donde está ejecutándose nuestro programa (basta con poner el nombre del fichero cuando éste se encuentra en la misma carpeta que nuestro programa). El modo de apertura es uno de los siguientes:

- `"r"` para abrirlo en modo **lectura** (**r**ead)
- `"w"` para abrirlo en modo **escritura** (**w**rite)
- `"a"` para abrirlo en modo **añadir** (**a**ñadir o **a**ppend)

El fichero abierto se representa en un programa en C mediante una variable de tipo `FILE*`

Para cerrar un fichero abierto hay que utilizar la función `fclose` (abreviatura de file close) como en los ejemplos que vienen a continuación.

---

# Modo lectura

Cuando abrimos un fichero en modo lectura, el fichero obviamente tiene que existir, en otro caso dará error. Si hay problemas al abrir el fichero (nos hemos equivocado con la ruta, no tenemos permiso,...), la función `fopen` nos devuelve un valor especial `NULL` para indicar que algo no ha ido bien, como muestra el siguiente ejemplo:

	!c
	#define NOMBRE_FICHERO "datos.txt"
	int main() {
	  FILE* fich; /* fich representa un fichero */
	  fich = fopen(NOMBRE_FICHERO, "r"); /* modo lectura */
	  if (fich == NULL) {
	    fprintf(stdout,"Error al abrir el fichero %s\n",
		        NOMBRE_FICHERO);
	  }
	  /* aqui continua el resto del programa */

Una vez abierto un fichero, podemos ir leyendo datos de manera **similar a como hemos leído cosas de teclado**. Utilizaremos la función `fscanf` que ya conoces. En lugar de leer de la entrada estandar (**st**an**d**ard **out**put, en inglés, abreviado `stdout`), leeremos el fichero representado en la **variable** `fich`. Jamás confundas la variable fichero con el nombre del fichero.

---

# Modo lectura

## Ejemplo lectura de teclado

Leer 2 números dados por el usuario desde **teclado** y mostrar un resultado por pantalla (suponemos que la función `area_rectangulo` ya está definida):

	!c
	int main() {
	  float base, altura; /* declaracion de variables */
	  
	  /* mensaje de cortesia */
	  fprintf(stdout,"Introduce la base y la altura: ");
	  
	  fscanf(stdin,"%f%f",&base,&altura); /* stdin es el teclado */
	  
	  /* procesar los datos y mostrar el resultado */
      fprintf(stdout,"El area de un rectangulo de base %f y "
	          "altura %f es %f\n",
	          base, altura, area_rectangulo(base,altura));
	  getch();
	  return 0;
	}
	
---

# Modo lectura

## Mismo ejemplo con lectura de fichero

El equivalente para leer los dos números de un fichero llamado `"datos.txt"`:

	!c
	int main() {
	  float base, altura;
	  FILE *fich; /* variable que representa fichero */

      /* OJO OJO OJO NNNNOOOO HAY MENSAJE DE CORTESIA */
	  
	  fich = fopen("datos.txt","r"); /* modo lectura */
	  fscanf(fich,"%f%f",&base,&altura); /* lectura del fichero */
	  /* cerramos el fichero cuando no tengamos que leer mas */
	  fclose(fich); 

	  /* procesar los datos y mostrar el resultado */
      fprintf(stdout,"El area de un rectangulo de base %f y "
	          "altura %f es %f\n",
	          base, altura, area_rectangulo(base,altura));
	  getch();
	  return 0;
	}

---

# Modo lectura

## Comparemos el uso de `fscanf` en cada caso:

	!c
	fscanf(stdin,"%f%f",&base,&altura); /* stdin es el teclado */
	
	fscanf(fich, "%f%f",&base,&altura); /* lectura del fichero */
	
Solamente cambia el primera argumento de `fscanf` que es de dónde leemos los datos. El resto es exactamente igual. Cada vez que se lee del fichero **se avanza dentro de él a medida que vamos leyendo los datos**.

## Lectura de muchos datos.

Imaginemos un fichero con 10 números enteros (da igual si están o no en la misma línea, el ordenador se salta espacios, tabuladores y cambios de línea cuando busca el siguiente número a leer): 

	10 1 20 32 45
	67 2 1 2 4

Y nos piden hacer un programa para calcular la suma de todos ellos.
¿Cómo lo resolverías si se leen los datos de teclado?


---

# Modo lectura

Lectura de `N` números introducidos por el teclado:

	!c
	#include <stdio.h>
	#include <conio.h>
	#define N 10
	int main() {
	  int i, numero, suma;
	  suma = 0; /* IMPORTANTE inicializar a 0 */
	  for (i=0; i<N; i=i+1) { /* repetir N veces */
	    fprintf(stdout,"Introduce un numero entero: ");
		fscanf(stdin,"%d",&numero);
		/* acumulamos numero en la variable suma */
		suma = suma + numero;
	  }
	  /* mostramos el resultado */
      fprintf(stdout,"La suma es %d\n",suma);
	  getch();
	  return 0;
	}
	
---

# Modo lectura

Lectura de `N` números de un fichero `"datos.txt"`

	!c
	#include <stdio.h>
	#include <conio.h>
	#define N 10
	int main() {
	  int i, numero, suma;
	  FILE* fich; /* variable para representar fichero */
	  suma = 0; /* IMPORTANTE inicializar a 0 */
	  /* abrimos el fichero antes del bucle */
	  fich = fopen("datos.txt","r"); /* modo lectura */
	  for (i=0; i<N; i=i+1) { /* repetir N veces */
		fscanf(fich,"%d",&numero);
		/* acumulamos numero en la variable suma */
		suma = suma + numero;
	  }
	  /* ya no vamos a leer mas datos, cerramos el fichero */
	  fclose(fich);
	  
      fprintf(stdout,"La suma es %d\n",suma);
	  getch();
	  return 0;
	}
	
---

# Modo lectura

Lectura de todos los números de un fichero `"datos.txt"`

¿Qué pasa si no sabemos cuántos números hay en el fichero?

## `fscanf` devuelve el número de cosas que ha leído

Hasta ahora hemos ignorado completamente el valor que devuelve `fscanf`. Veamos un ejemplo de lo que devuelve esta función:

	!c
	int a,b,c,cuantos;

	/* esto intenta leer 3 numeros enteros 
	y nos devuelve cuantos ha leido realmente */
	cuantos = fscanf(fichero,"%d%d%d",&a,&b,&c);
	/* si todo ha ido bien, la variable cuantos vale 3 */

	/* esto intenta leer 1 numero entero 
	y nos devuelve cuantos ha leido realmente */
	cuantos = fscanf(fichero,"%d",&a);
	/* si todo ha ido bien, la variable cuantos vale 1 */

---

# Modo lectura

Leer y sumar todos los números enteros de un fichero `"datos.txt"`, Desconocemos cuántos números contiene el fichero. Vamos a ir leyendo mientras `fscanf` no se "queje" diciendo que no ha podido leer otro número más:

	!c
	int main() {
	  int i, numero, suma=0;
	  FILE* fich; /* variable para representar fichero */
	  /* abrimos el fichero antes del bucle */
	  fich = fopen("datos.txt","r"); /* modo lectura */
	  while (fscanf(fich,"%d",&numero) == 1) {
        /* el == 1 es porque fscanf lee un solo valor,
           estamos leyendo de uno en uno */
		suma = suma + numero;
	  }
	  /* ya no vamos a leer mas datos, cerramos el fichero */
	  fclose(fich);
	  
      fprintf(stdout,"La suma es %d\n",suma);
	  getch();
	  return 0;
	}

---

# Modo lectura

## Función de entrada de datos `fgets`

	!c
	fgets(variable_cadena, tamanyo_maximo, entrada);
	
- Lee caracteres  de `entrada` y los almacena en `variable_cadena`.
- Lee hasta encontrar un salto de línea `'\n'` (tecla intro cuando lee de teclado o `stdin`).
- Se utiliza mucho para leer cadenas con espacios. Lo malo es que al leer incluye el `'\n'` en la cadena leída (se puede quitar luego).

---

# Modo lectura

## Función de entrada de datos `fgets`

### Ejemplo de lectura desde teclado:

	!c
    #include <stdio.h>
    #include <conio.h>
    #define TAM 90
    int main() {
      char frase[TAM]; /* variable cadena de caracteres */
      fprintf(stdout,"Escribe una linea: ");
	  fgets(frase,TAM,stdin);
	  fprintf(stdout,"has escrito: %s", frase);
	  getch();
	  return 0;
    }


---

# Modo lectura

## Función de entrada de datos `fgets`

### Ejemplo de lectura de un fichero:

Leer el nombre completo de una persona que está en la primera línea del fichero `nombre.txt`

	!c
    #include <stdio.h>
    #include <conio.h>
    #define TAM 90
    int main() {
      char nombre[TAM]; /* variable cadena de caracteres */
	  FILE* fich;
	  fich = fopen("nombre.txt","r");
	  fgets(nombre,TAM,fich);
	  fclose(fich);
	  fprintf(stdout,"Hola, te llamas %s", nombre);
	  getch();
	  return 0;
    }

---

# Apertura y cierre en modo escritura

A diferencia del modo lectura, es posible abrir un fichero que no existe:

- Si el fichero no existe, se crea (a menos que la carpeta no exista o no tengamos permisos de escritura, en cuyo caso dará error).
- Si el fichero existe, **SE BORRA SU CONTENIDO** así que ¡cuidado!

## Ejemplo: escribir el valor de una variable entera `a` en un fichero `"salida.txt"`

	!c
	FILE* fich;
	int a = 12345;
	
	fich = fopen("salida.txt","w"); /* modo escritura */
	fprintf(fich,"%d\n",a); /* fijate en que no ponemos stdout */

    /* lo cerramos cuando no tengamos nada mas que escribir */
	fclose(fich); 

---

# Ejercicio más complicado...

Un fichero `"notas.txt"` contiene 50 líneas con el DNI de un alumno y las notas de los 2 parciales como muestra este ejemplo:

	201050889   7.5   8
    ...
	
Nos piden escribir en otro fichero `"medias.txt"` el DNI de cada alumno y los 2 parciales junto con la nota media:

	201050889   7.5   8   7.75
    ...

### Esquema en *pseudocódigo:*

    declarar 2 variables de tipo fichero, y otras variables
    flectura = abrir fichero "notas.txt" en modo lectura
    fescritura = abrir fichero "medias.txt" en modo escritura
    repetir 50 veces {
      leer de flectura el DNI y las 2 notas
	  escribir en fescritura el DNI, las 2 notas y la media
    }
    cerrar ficheros

---

# Ejercicio más complicado...

	!c
	#include <stdio.h>
	#define N 50
	int main() {
	  int i,DNI;
	  float parcial1, parcial2, media;
	  FILE* flectura;
	  FILE* fescritura;
	  /* FILE* flectura, fescritura; estaria mal, el tipo es
	     FILE y el * lo lleva la variable, pero esto requiere
		 conceptos que no vamos a ver en la asignatura */
	  flectura   = fopen("notas.txt","r");
	  fescritura = fopen("medias.txt","w");
	  for (i=1; i<=N; i=i+1) {
	    fscanf(flectura,"%d%f%f",&DNI,&parcial1,&parcial2);
		media = (parcial1+parcial2)/2;
		fprintf(fescritura,"%d %f %f %f\n",
		        DNI,parcial1,parcial2,media);
      }
	  fclose(flectura);   /* IMPORTANTE NO OLVIDAR */
	  fclose(fescritura); /* CERRAR LOS FICHEROS   */
 	  /* PREGUNTA: por que no hay getch(); ? */
	  return 0;
	}

---

# Ejercicio de pintar un cuadrado

Vamos a modificar el ejercicio de pintar un cuadrado para que lo escriba a un fichero que se pasa como argumento:

	!c
	void pintar_cuadrado(FILE* fich, int lado, char relleno) {
	  int i,j;
	  for (i=1; i<=lado; i=i+1) {
        for (j=1; j<=lado; j=j+1) {
	      fprintf(fich,"%c",relleno);
	    }
	    fprintf(fich,"\n");
	  }
	}

# Ejercicio:

Haz un programa que pida al usuario el valor de un lado entre 1 y 20 (vuelve a pedir un valor si el introducido por el usuario es incorrecto) y que, a continuación, pinte un cuadrado de ese lado usando el asterisco como relleno (`'*'`). El programa pintará el cuadrado en pantalla y también en un fichero llamado `cuadrado.txt`.

---

# Añadir a un fichero

Si abres un fichero con modo `"a"`, se podrá utilizar exactamente igual que si lo hemos abierto en modo escritura:

- Podremos utilizar `fprintf` para escribir en el fichero.
- Si el fichero no existe, se crea.
- **PERO** si el fichero ya existe, **NO SE BORRA SU CONTENIDO** sino que éste se queda en el fichero y las escrituras añaden lo que escribimos al final del fichero.

---

# Añadir a un fichero

## Ejemplo

Un fichero `notas.txt` contiene el DNI y los 2 parciales de los alumnos, escribe un programa que añada una nueva entrada en el fichero.

	!c
	int main() {
	  FILE* fich;
	  int DNI;
	  float parcial1, parcial2;
	  fprintf(stdout,"Introduce el DNI: ");
	  fscanf(stdin,"%d",&DNI);
	  fprintf(stdout,"Introduce las notas de los dos parciales: ");
	  fscanf(stdin,"%f%f",&parcial1,&parcial2);
	  fich = fopen("notas.txt","a"); /* modo append */
      fprintf(fich,"%d %f %f\n",DNI,parcial1,parcial2);
	  fclose(fich); /* importante no olvidar cerrar el fichero */
      return 0;
	}

