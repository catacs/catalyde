
# T9 Vectores multidimensionales (Matrices)

---

# Recordemos el Temario

- *Tema 1 Introducción a la Informática (semipresencial)*
- *Tema 2 Tipos de datos, variables y constantes*
- *Tema 3 Operadores y Expresiones*
- *Tema 4 Funciones. Funciones de entrada y salida básica*
- *Tema 5 Estructuras de control para selección (`if` y `switch`)*
- *Tema 6 Estructuras de control para iteración (`while`, `do while` y `for`)*
- *Tema 7 Entrada y salida con ficheros*
- *Tema 8 Vectores y cadenas*
- **Tema 9 Matrices**

---

# Vectores multidimensionales

Cuando declaras un vector puedes indicar que tenga varias dimensiones. Este ejemplo muestra cómo declarar un vector `v` que tiene una sola dimesnión (con 3 componentes), seguido de una matriz `m` que tiene 2 filas y 4 columnas:

	!c
	int v[3];
	int m[2][4];
	
Es decir, una matriz es un vector con 2 dimensiones. El ejemplo anterior se puede visualizar de la manera siguiente:

<center><table border=1 cellpadding=5 cellspacing=0 style="text-align:center">
<tr><td>v[0]</td><td>v[1]</td><td>v[2]</td></tr><tr><td>1</td><td>8</td><td>12</td></tr>
</table></center>

<center><table border=1 cellpadding=5 cellspacing=0 style="text-align:center">
<tr><td>m[0][0]</td><td>m[0][1]</td><td>m[0][2]</td><td>m[0][3]</td></tr><tr><td>1</td><td>2</td><td>7</td><td>4</td></tr>
<tr><td>m[1][0]</td><td>m[1][1]</td><td>m[1][2]</td><td>m[1][3]</td></tr><tr><td>0</td><td>3</td><td>0</td><td>5</td></tr>
</table></center>

---

# Vectores multidimensionales

Cuando declaras un vector multidimensional, puedes poner tantas dimensiones como te haga falta poniendo entre corchetes el número de filas de cada dimensión:

	!c
	#define TURNOS  8
	#define DIAS    7
	#define PISTAS 15
	#define LIBRE   0
	#define OCUPADA 1	
	int reservas[DIAS][PISTAS][TURNOS];
	
En el  vector `reservas`  queremos apuntar (usando `LIBRE` y `OCUPADA`) las reservas de  `15` pistas de tenis a lo largo de una  semana, sabiendo que cada día hay 8 turnos. `reservas` contiene `DIAS*PISTAS*TURNOS` (840) casillas, cada una es una variable `int`. Si accedo a la matriz utilizando las variables enteras `d` `p` y `t`:

	!c
	fprintf(stdout,"Elije un dia, pista y turno: ");
	fscanf(stdin,"%d%d%d",&d,&p,&t);
	if (reservas[d][p][t] == OCUPADA)
	  fprintf(stdout,"Mala suerte, esa pista ya esta reservada\n");
	else
	  reservas[d][p][t] = OCUPADA; /* reservamos */


---

# Vectores multidimensionales

Tendría que asegurarme de que cada índice está en el rango correcto. Es decir, habiendo declarado:

	!c
	int reservas[DIAS][PISTAS][TURNOS];


Cuando accedo a `reservas[d][p][t]` tengo que estar seguro de que:

- `d` está entre `0` y `DIAS-1`
- `p` está entre `0` y `PISTAS-1`
- `t` está entre `0` y `TURNOS-1`

En tal caso, `reservas[d][p][t]` es, a todos los efectos, una variable de tipo `int` que puedo acceder para consultar su valor o que puedo modificar mediante una asignación, pasándolo (con `&`) a un `fscanf`, etc. En ese sentido, el ejemplo anterior es poco robusto (e incómodo para un usuario que tiene que numerar las cosas desde 0, si da un valor incorrecto el programa no lo comprueba). Nos sirve de ejemplo para ver los índices válidos al acceder al vector.

---

# Matrices

## Ejemplo: declarar una matriz, pedir al usuario que introduzca los valores y volver a mostrar la matriz

	!c
	#define FILAS 2
	#define COLUMNAS 3
	
	int main() {
	  /* declarar la matriz y otras variables */
	  float m[FILAS][COLUMNAS];
	  int i,j;
	  
	  /* pedir la matriz */
      for (i=0; i<FILAS; i=i+1) { /* para cada fila */
        for (j=0; j<COLUMNAS; j=j+1) { /* para cada columna */
		  fprintf(stdout,"Introduce m[%d][%d]: ",i,j);
		  fscanf(stdin,"%f",&m[i][j]);
		}
	  }
	  
(continúa)

---

# Matrices

(continuación)

	!c
	  /* ahora volvemos a mostrar la matriz: */
      for (i=0; i<FILAS; i=i+1) {
        for (j=0; j<COLUMNAS; j=j+1) {
		  fprintf(stdout,"%f ",m[i][j]);
		}
		fprintf(stdout,"\n");
	  }
	  getch();
	  return 0;
	}
	  
Esta forma de mostrar la matriz pone cada fila en una línea de la pantalla (cambia de línea al final de cada fila) mostrando algo como sigue:

    !c
	2.5 3.4 1.2
	4.5 4.1 7.8

---

# Matrices y funciones

Imaginemos que queremos crear una función para pedir los datos y otra para mostrarlos. Al igual que con los vectores unidimensionales, el paso de parámetros es **por referencia**, con lo que los cambios efectuados en una función permanecen tras la llamada a la misma. Para pasar una matriz o un vector multidimensional a una función hay que

### especificar el tamaño de cada dimensión excepto (opcionalmente) la primera (en este ejemplo se especifican todas):

	!c
	#define FILAS 2
	#define COLUMNAS 3
	void pedir_matriz(float m[FILAS][COLUMNAS]) {
	  int i,j;
      for (i=0; i<FILAS; i=i+1) { /* para cada fila */
        for (j=0; j<COLUMNAS; j=j+1) { /* para cada columna */
		  fprintf(stdout,"Introduce m[%d][%d]: ",i,j);
		  fscanf(stdin,"%f",&m[i][j]);
		}
	  }
	}

---

# Matrices y funciones

	!c
    void mostrar_matriz(float m[FILAS][COLUMNAS]) {
	  int i,j;
      for (i=0; i<FILAS; i=i+1) {
        for (j=0; j<COLUMNAS; j=j+1) {
		  fprintf(stdout,"%f ",m[i][j]);
		}
		fprintf(stdout,"\n");
	  }
	}
	
	int main() {
	  float m[FILAS][columnas]; /* declarar la matriz */
	  pedir_matriz(m);          /* pedir los datos    */
	  mostrar_matriz(m);        /* mostrar los datos  */
	  getch();
	  return 0;
	}

---

# Matrices y funciones

Si recuerdas, cuando pasábamos vectores a las funciones, no hacía falta poner el tamaño en la definición de los parámetros:

    !c
	void pedir_vector(int v[], int n) {
	  int i;
	  for (i=0; i<n; i=i+1) {
	    fprintf(stdout,"Introduce v[%d]: ",i);
		fscanf(stdin,"%d",&v[i]);
	  }
	}
	
Ahora hemos dicho que hay que

### especificar el tamaño de cada dimensión excepto (opcionalmente) la primera

**Nota**: Eso es **perfectamente compatible** con el uso que se hace en vectores de una dimensión (la primera es la única).

---

# Matrices y funciones

Eso quiere decir que también podemos hacer lo siguiente:

	!c
	void pedir_matriz(float m[][COLUMNAS]) {
	  int i,j;
      for (i=0; i<FILAS; i=i+1) { /* para cada fila */
        for (j=0; j<COLUMNAS; j=j+1) { /* para cada columna */
		  fprintf(stdout,"Introduce m[%d][%d]: ",i,j);
		  fscanf(stdin,"%f",&m[i][j]);
		}
	  }
	}
	
---

# Matrices y funciones

Es decir, podríamos utilizar la misma función para matrices con un número variable de filas, pero el número de columnas ha de ser un valor conocido en tiempo de compilación (cuando estás escribiendo el programa):

	!c
	#define COLUMNAS 3
	void pedir_matriz(float m[][COLUMNAS], int filas) {
	  int i,j;
      for (i=0; i<filas; i=i+1) { /* para cada fila */
        for (j=0; j<COLUMNAS; j=j+1) { /* para cada columna */
		  fprintf(stdout,"Introduce m[%d][%d]: ",i,j);
		  fscanf(stdin,"%f",&m[i][j]);
		}
	  }
	}
	#define FILASX  5
	#define FILASY 15
	int main() {
	  float matX[FILASX][COLUMNAS], maxY[FILASY][COLUMNAS];
	  pedir_matriz(matX, FILASX);
	  pedir_matriz(matY, FILASY);
      ...
	}  
	
---

# Ejercicio de matrices y funciones

Pedir 2 matrices cuadradas de talla 5x5 y mostrar la suma por pantalla. Vamos a crear funciones para:

1. Pedir una matriz de NxN
2. Sumar dos matrices NxN
3. Mostrar una matriz de talla NxN

Veamos:

	!c
	#define N 5
	void pedir_matriz(char nombrematriz[], float m[N][N]) {
	  int i,j;
      for (i=0; i<N; i=i+1) { /* para cada fila */
        for (j=0; j<N; j=j+1) { /* para cada columna */
		  fprintf(stdout,"Introduce %s[%d][%d]: ",nombrematriz,i,j);
		  fscanf(stdin,"%f",&m[i][j]);
		}
	  }
	}
	
---

# Ejercicio de matrices y funciones

### Sumar dos matrices cuadradas de talla NxN

	!c
	/* hacemos x = y+z; */
	void sumar_matrices(float x[N][N], float y[N][N], float z[N][N]) {
	  int i,j;
      for (i=0; i<N; i=i+1) { /* para cada fila */
        for (j=0; j<N; j=j+1) { /* para cada columna */
		  x[i][j] = y[i][j]+z[i][j];
		}
	  }
	}
	void mostrar_matriz(float m[N][N]) {
	  int i,j;
      for (i=0; i<N; i=i+1) { /* para cada fila */
        for (j=0; j<N; j=j+1) { /* para cada columna */
		  fprintf(stdout,"%f ",m[i][j]);
		}
		fprintf(stdout,"\n");
	  }
	}


---

# Ejercicio de matrices y funciones

El programa principal queda así:

	!c
	int main() {
	  float A[N][N], B[N][N], C[N][N];
	  pedir_matriz("A",A);
	  pedir_matriz("B",B);
	  sumar_matrices(C,A,B); /* hace C = A+B */
	  mostrar_matriz(C);
	  getch();
	  return 0;
	}

Donde se pueden ver claramente algunas ventajas de utilizar funciones:

- Utilizamos la misma función `pedir_matriz` para leer las dos matrices `A` y `B`
- El programa principal queda más compacto y fácil de entender.

Observa que hemos añadido un argumento de tipo `char nombre[]` en la función `pedir_matriz` para pasar el nombre de la matriz y así poder usarla en el mensaje de cortesía que recibe el usuario.

---

# Resumen de conceptos

Una matriz es un caso particular de un vector multidimensional. Se declara igual que un vector normal pero añadiendo tantos corchetes (con el número de elementos en esa dimensión) como sean necesarios en plan:

    !c
	tipo_casilla nombre_vector[D1][D2][D3];
		
Al pasar una matriz a una función se hace por *referencia*. Al definir la cabecera de la función has de poner el número de elementos de cada dimensión excepto, opcionalmente, la primera. Estos dos ejemplos son correctos:

    !c
	int funcionA(int m[10][20]) { ... }
	int funcionB(int m[][20]) { ... }
		
Ambas funciones requiren que pasemos una matriz con 20 columnas, pero la segunda deja claro que el número de filas puede ser diferente cada vez. Acceder dentro del rango de la matriz (no salirnos) es nuestra responsabilidad. Puedes poner las filas si sabes cuántas al escribir el programa. Si quieres usar la misma función para diversas matrices que tengan el mismo número de columnas, usa la segunda forma (y  otro parámetro en la función que sea el número de filas).

---

# Matriz = vector de vectores

Una matriz se puede ver como un vector de vectores. Por ejemplo:

    !c
	int m[10][20];
	
se puede considerar un vector de 10 elementos: `m[0]`,`m[1]`,...,`m[9]`. Cada uno sería, a su vez, un vector de 20 elementos, como muestra este ejemplo:

	!c
	void pedir_vector(int v[], int n) {
	  int i;
	  for (i=0; i<n; i=i+1) {
	    fprintf(stdout,"Introduce el %d-esimo valor: ",i+1);
		fscanf(stdin,"%d",&v[i]);
	  }
	}
	#define FILAS 10
	#define COLUMNAS 20
	int main() {
	  int m[FILAS][COLUMNAS],i;
	  for (i=0; i<FILAS; i=i+1) {
	    printf("Introduce la fila %d-esima de la matriz:\n",i+1);
	    pedir_vector(m[i],COLUMNAS);
	  }
	  ...
	}

---

# Matrices de caracteres

Una matriz de caracteres no es más que una matriz donde cada casilla es de tipo `char`.

Una de las utilidades de este tipo de matrices viene del hecho de que una matriz también se puede ver como un vector de vectores. Es decir, la siguiente matriz de caracteres `m`:

	!c
	#define MAX 100
	#define N   200
	int main() {
	  char m[N][MAX];
	  ...
	}

se puede como una matriz con `N` filas y `MAX` columnas, pero también se puede ver como un vector de talla `N` donde cada elemento es una cadena de caracteres de talla máxima `MAX`, lo cual es muy útil porque tenemos tropecientas funciones para leer, escribir y manipular cadenas de caracteres. El siguiente ejemplo ilustra la utilidad de poder usar una matriz de `char` como un vector de cadenas:

---

# Matrices de caracteres

## Ejercicio

Leer el nombre y la edad de 200 personas. A continuación, mostrar las personas cuya edad sea superior (estricto) a la media:

	!c
	#include <stdio.h>
	#include <conio.h>
	#include <string.h>

    float calcula_media(int v[], int talla) {
	  int i;
	  float suma=0;
	  for (i=0; i<talla; i=i+1)
	    suma = suma + v[i];
	  return suma/talla;
	}

	#define MAX 100 /* longitud del nombre mas largo + 1 */
	#define N   200 /* numero de personas */

(continúa)

---

# Matrices de caracteres

(continuación)

	!c
	int main() {
	  char dummy,nombres[N][MAX]; /* N cadenas de talla maxima MAX */
	  int edades[N]; /* vector tambien de talla N */
	  float media;
	  int i;
	  for (i=0; i<N; i=i+1) {
	    fprintf(stdout,"Edad y nombre (en una misma linea): ");
		fscanf(stdin,"%d%c",&edades[i],&dummy); /* lee espacio */
		fgets(nombres[i],MAX,stdin); /* lee hasta final de linea */
	  }
	  media = calcula_media(edades,N);
      fprintf(stdout,"Listado de personas con edad "
	          "superior a la media:\n");
	  for (i=0; i<N; i=i+1) {
	    if (edades[i] > media) {
		  fprintf(stdout,"%s",nombres[i]);
		}
	  }
	  getch();
	  return 0;
	}

---

# Ejercicios resueltos de matrices

---

# Centrar un texto de N líneas

El objetivo es pedir al usuario que introduzca N líneas de texto y luego mostrarlas centradas en pantalla. Salvo la parte de centrar una línea, este ejercicio es muy similar a uno ya visto. 

### Centrar una línea

Basta con imprimir a su izquiera tantos espacios como sea necesario (la mitad de la diferencia entre el ancho de la pantalla y el ancho de la cadena):

	!c
	#include <stdio.h>
	#include <conio.h>
	#include <string.h>
	#define ANCHOPANTALLA 80
	void centrar(char cadena[]) {
	  int i,tabulacion;
	  tabulacion = (ANCHOPANTALLA - strlen(cadena))/2;
	  for (i=0; i<tabulacion; i=i+1)
	    fprintf(stdout," ");
      /* la cadena ya lleva un \n al final */
      fprintf(stdout,"%s",cadena);
	}

---

# Centrar un texto de N líneas

Con la función `centrar` y con un bizcocho tenemos el siguiente programa que va como una moto:

	!c
	#define N 4 /* el número de líneas */
	#define MAX 80 /* longitud máxima de cada línea */
	
	int main() {
	  char cadenas[N][MAX]; /* N cadenas, cada una de talla MAX */
	  int i; /* para contar */
	  
	  for (i=0; i<N; i=i+1) {
	    fprintf(stdout,"Dispara una linea: ");
		fgets(cadenas[i],MAX,stdin);
	  }
      fprintf(stdout,"Mira como hago poesia:\n\n");
	  for (i=0; i<N; i=i+1) {
		centrar(cadenas[i]);
	  }
	  getch();
	  return 0;
	}

---

# Centrar un texto de N líneas

## Veamos cómo funciona:

    Dispara una linea: el perro de san roque
    Dispara una linea: no tiene rabo
    Dispara una linea: porque ramon rodriguez
    Dispara una linea: se lo ha robado
    Mira como hago poesia:
	
                             el perro de san roque
                                 no tiene rabo
                            porque ramon rodriguez
                                se lo ha robado

---

# Detector de empollones

El centro dispone de un fichero `notas.txt` con las notas de todos los A alumnos de una clase que tiene 10 asignaturas o materias. El fichero contiene A líneas, cada línea contiene el DNI de un alumno seguido de las N=10 notas de este alumno:

	DNI nota1 nota2 nota3 .... nota10
	...

Nos piden un programa detector de empollones que lea el fichero y muestre por pantalla los DNIs de los alumnos que hayan sacado la nota más alta en alguna de las materias.

Vamos a ver cómo representar esos datos en la memoria del ordenador, proponemos utilizar:

- Un vector de talla A con los DNIs de cada alumno.
- Una matriz con A filas y N columnas con las notas.

El mismo índice que se utiliza para acceder al DNI de un alumno en el vector `DNIs` también nos sirve para acceder a las notas del mismo alumno en la matriz `notas`

---

# Detector de empollones

# Pseudocódigo

Como de costumbre, vamos a plantear el *pseudocódigo* o *algoritmo* que resuelve este problema:

1. Leer del fichero el vector `DNIs` y la matriz `notas` como sigue:
	- Abrir fichero
    - Para cada alumno
	    - Leer dni
		- Leer N notas
	- Cerrar fichero
2. Calcular en un vector de talla N el máximo de cada columna
3. Para cada alumno
    - Si alguna de sus notas coincide con la máxima en esa materia:
	    - Mostramos el DNI
	
---

# Detector de empollones

	!c
	#include <stdio.h>
	#include <conio.h>
	#define A 50 /* numero de alumnos */
	#define N 10 /* numero de notas de cada alumno */
	
	void leer_notas(char nomfichero[], int DNIs[A], float notas[A][N]) {
	  int al,no; /* indices alumno y nota */
	  FILE* fich = fopen(nomfichero,"r"); /* modo lectura */
	  for (al=0; alum<A; alum=alum+1) { /* para cada alumno */
	    fscanf(fich,"%d",&DNIs[al]); /* leemos DNI */		
	    for (no=0; no<N; no=no+1) { /* para cada nota */
		  fscanf(fich,"%f",&notas[al][no]);
		}
	  }
	  fclose(fich); /* cerramos el fichero */
	  return; /* no devuelve nada */
	}

(continúa)

---

# Detector de empollones
	
(continuación)

	!c
	void calcula_maximos(float notas[A][N], float maxNota[N]) {
	  int al,no; /* indices alumno y nota */
	  for (no=0; no<N; no=no+1) { /* para cada nota */
	    /* ponemos la nota del 1er alumno en esa asignatura */
	    maxNota[no] = notas[0][no];
		/* y vemos si el resto de alumnos (por eso empieza en 1)
	    tienen una nota mas alta */
	    for (al=1; alum<A; alum=alum+1) {
		  if (notas[al][no]>maxNota[no]) { /* si mejora lo que */
		    maxNota[no]=notas[al][no];     /* tenia, lo cambio  */
		  }
		}
	  }
	  /* return; es opcional cuando devuelve void */
	}

(continúa)

---

# Detector de empollones
	
(continuación)

	!c
	/* devuelve cierto (un 1) si el alumno es un empollon
	   y falso (un 0) en caso contrario */
	int es_empollon(int alumno,
	                float notas[A][N], float maxNota[N]) {
	  for (no=0; no<N; no=no+1) { /* para cada nota */
	    if (notas[alumno][no] == maxNota[no]) {
		  return 1; /* le han pillado! */
		} /* aqui poner else return 0; ESTARIA MUY MAL,
		     es MUY IMPORTANTE que entiendas por que' */
	  } /* se cierra el for */
      /* solamente al terminar de ver todas las notas y no
         haber encontrado una que lo delate, sabemos que
	     podemos contestar que no lo es */
	  return 0;
	} /* cierra la funcion es_empollon */

(continúa)

---

# Detector de empollones
	
(continuación)

	!c
	int main() {
	  /* declaramos las variables (vectores y matrices) */
      int DNIs[A],alumno;
	  float notas[A][N], maxNota[N];

      /* leemos las notas */
	  leer_notas("notas.txt", DNIs, notas);

      /* calculamos la maxima nota de cada asignatura */
      calcula_maximos(notas, maxNota); 
	  
	  /* listamos los empollones */
	  fprintf(stdout,"Lista de los empollones de la clase:\n");
	  for (alumno=0; alumno<A; alumno=alumno+1)
	    if (es_empollon(alumno,notas,maxNota))
		  fprintf(stdout,"DNI = %d\n",DNIs[alumno]);
	  getch();
	  return 0;
	}
