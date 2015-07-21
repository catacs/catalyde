
# T8 Vectores y cadenas

---

# Recordemos el Temario

- *Tema 1 Introducción a la Informática (semipresencial)*
- *Tema 2 Tipos de datos, variables y constantes*
- *Tema 3 Operadores y Expresiones*
- *Tema 4 Funciones. Funciones de entrada y salida básica*
- *Tema 5 Estructuras de control para selección (`if` y `switch`)*
- *Tema 6 Estructuras de control para iteración (`while`, `do while` y `for`)*
- *Tema 7 Entrada y salida con ficheros*
- **Tema 8 Vectores y cadenas**
- *Tema 9 Matrices*

---

# Contenidos del tema 8

## Vectores.

- Declaración.
- Acceso a elementos.
- Operaciones.
- Vectores como parametros de funciones.

## Cadenas (vectores de caracteres).

- Declaración y acceso.
- Funciones estándar para cadenas
	
---

# Vectores

- Un vector es un conjunto de datos homogéneos (del mismo tipo), agrupados de manera contigua y de acceso aleatorio.
- El mejor símil es pensar que **es un casillero donde cada casilla es una variable**.
    - Cada casilla tiene un identificador que es un **índice** numérico: valores enteros consecutivos empezando con el cero. El índice sirve para indicar a qué casilla nos interesa acceder.
	- Acceso aleatorio significa que podemos acceder en cualquier momento a la componente (casilla del casillero) que nos dé la gana. La idea a conservar es **vector accedido con un índice representa una variable**
	- Homogéneo significa que **todas las casillas son variables del mismo tipo**
- Se pueden declarar vectores de cualquier tipo de datos: `int`, `float`, `char`, etc.
- Los vectores de tipo `char` se denominan **cadenas** de caracteres y las hemos venido utilizando desde hace tiempo.

---

# Declaración de vectores

## Para declarar un vector se debe indicar:
- El tipo de los elementos que lo forman.
- El nombre de la variable.
- **ENTRE CORCHETES** el tamaño o número de elementos del vector.

## Sintaxis: se declara como una variable, pero acompañada del tamaño entre corchetes.

	!c
	tipo nombre; /* variable normal */
	tipo nombre[numero_elementos]; /* vector */

### Ejemplo:

	!c
	float nota; /* una sola caja que contiene un float */
	float notas[5]; /* un casillero que contiene 5 cajas
	                   con un float cada una */

---

# Declaración de vectores

	!c
	float nota; /* una sola caja que contiene un float */
	float notas[5]; /* contiene 5 cajas con un float cada una */

<center><table border=1 cellpadding=5 cellspacing=0 style="text-align:center"><tr><td>nota</td></tr><tr><td>8.7</td></tr></table><br><table border=1 cellpadding=5 cellspacing=0 style="text-align:center"><tr><td>notas[0]</td><td>notas[1]</td><td>notas[2]</td><td>notas[3]</td><td>notas[4]</td></tr><tr><td>3.7</td><td>4.5</td><td>8.7</td><td>10</td><td>0.5</td></tr></table></center>

Nos proporciona las siguientes variables:

- `nota` es una variable como las que hemos venido utilizando hasta ahora
- `notas[0]` es una variable de tipo `float` igual que lo era `nota`
- `notas[1]` ídem, segunda casilla del vector
- `notas[2]` ídem, tercera casilla del vector
- `notas[3]` ídem, cuarta casilla del vector
- `notas[4]` ídem, quinta y última casilla

---

# Acceso a elementos de vectores

### Para la siguiente declaración de variables:

	!c
	#define N 100
	float v[N];
	
- Los índices para acceder a elementos el vector `v` van de `0` a `N-1`.
- Si accedes con un índice `<0` ó `>=N`  **está MAL**. El índice debe ser siempre una expresión entera comprendida entre `0` y `N-1`, siendo `N` el número de componentes (elementos) del vector.
- **¡¡ACCEDER CON ÍNDICE FUERA DE RANGO ESTA MAL!!** ya que modificas valores que no son del vector (otras variables, código) y el programa puede *petar* o dar resultados incorrectos.

### El tamaño debe ser un valor constante conocido por el compilador, no puede usarse una variable:

	!c
	int i;/* ESO QUE VIENE AHORA ESTA MAL, NO LO HAGAS: */
	fprintf(stdout,"Talla del vector: ");
	fscanf(stdin,"%d",&i);
	int alturas[i]; /* ERROR, ESTO NO ESTA PERMITIDO!!!! */

---

# Acceso a elementos de vectores

Es decir, para acceder a un elemento de un vector se debe especificar el nombre del vector y luego **entre corchetes** el índice (la posición) de dicho elemento dentro del vector. Un vector accedido mediante corchetes a una posición válida es, a todos los efectos, igual que una variable del tipo correspondiente. El siguiente ejemplo muestra cómo podemos utilizar `notas[0]` como si fuese una variable de tipo `float` cualquiera:


	!c
	int main() {
	 float notas[10]; /* es como tener 10 variables de tipo float,
	                     que son notas[0], notas[1], ... notas[9]
						 observa que termina en 9 pq empieza en 0 */
	 notas[0] = 9.5; /* estamos asignando un valor
                        a la primera casilla del vector */
	 fprintf(stdout,"La primera nota es %.2f\n",notas[0]);
	 getch();
	 return 0;
	}

---

# Acceso a elementos de vectores

Si usamos los vectores como en el ejemplo anterior usando `notas[0]`, etc. no parece haber **ninguna ventaja** con respecto a declarar variables normales.

- Lo útil es acceder a un vector usando variables de tipo `int` como índice.
- Recuerda que los índices válidos van de 0 al tamaño del vector **menos uno**.

### Ejemplo: pedir 10 valores enteros y volverlos a mostrar

	!c
	#define N 10
	int main() {
	  int i,v[N];
	  for (i=0; i<N; i=i+1) { /* IMPORTANTE: EMPEZAR EN 0 */
	    fprintf(stdout,"Dame v[%d]: ",i);
		fscanf(stdin,"%d",&v[i]);
	  }
	  for (i=0; i<N; i=i+1) { /* IMPORTANTE: i<N termina en N-1 */
	    fprintf(stdout,"v[%d] = %d\n",i,v[i]);
	  }
	  getch();
	  return 0;
	}

---

# Operaciones con vectores

### C no  permite realizar operaciones básicas con vectores completos, sino elemento a elemento (cada elemento es como una variable *"de las de toda la vida"*). En particular:

- Si quieres sumar 2 vectores `v1` y `v2` no puedes hacer `v1+v2`, has de sumarlos **elemento a elemento**.
- Si quieres comparar 2 vectores `v1` y `v2` no puedes hacer `v1==v2`, has de compararlos **elemento a elemento**. En ese caso recuerda que basta con que 2 elementos sean distintos para que los vectores sean distintos (esta operación es un ejercicio de prácticas).

## Ejercicio:

Escribe un programa que pida 2 vectores de dimension 3 y que diga si son iguales o no. También debe mostrar la suma de ambos por pantalla.

---

# Vectores y funciones

Los vectores se pueden pasar como argumentos a las funciones. A diferencia de otro tipo de valores se trata de un paso de valores **por referencia**.

## Existen 2 tipos de paso de parámetros:

- **Por valor:** en la llamada a la función cada argumento es una expresión que se evalúa y el resultado de dicha expresión se **copia** a la variable argumento declarada en la cabecera de la función. Cualquier cambio realizado a la variable dentro de la función **se efectúa sobre la COPIA**, así que **NO AFECTA** a la variable que has utilizado en la llamada de la función.
- **Por referencia:** en la llamada a la función, el argumento que se pasa por referencia es una variable que se pasa a la función. Cualquier cambio efectuado en dicha variable **PERMANECE** tras el retorno de la función.

### Los vectores se pasan *siempre por referencia*

¡¡¡OJO!!! no confundas un vector entero con una de las casillas de un vector. Veamos unos ejemplos aclaratorios:

---

# Vectores y funciones

## Ejemplo paso por valor:

A pesar de utilizarse vectores, la función recibe **variables de tipo int** y las recibe en un paso de parámetros **por valor**, es decir, el contenido se copia a las variables `a` y `b` de la función `suma`:

	!c
	int suma(int a, int b) { /* funcion chorra donde las haya */
	  return a+b;
	}
	
	int main() {
	 int v[10]; /* vector de 10 enteros */
     /* ... aquí vendría codigo para leer valores... */
	 v[0] = suma(v[1],v[2]);
	 /* resto del programa */
	}
	
### A PESAR DE HABER VECTORES EN LA LLAMADA DE `suma`, AL INDEXARSE CON `[ ]` SON VALORES DE TIPO `int`	

---

# Vectores y funciones

## Ejemplo paso por referencia:

	!c
	/* suma de 2 vectores de talla N en plan a=b+c,
	   LA FUNCION NO DEVUELVE NADA, modifica el valor de a */
	void suma_vectores(int a[], int b[], int c[], int N) {
      int i;
	  for (i=0; i<N; i=i+1) {
	     a[i] = b[i]+c[i];
	  }
	}
	#define N 10
	int main() {
	 int v1[N],v2[N],v3[N];
     /* ... aquí vendría codigo para leer valores... */
	 
	 /* suma v2 y v3, deja el resultado en v1
		OBSERVA QUE v1,... NO LLEVAN CORCHETES: */
	 suma_vectores(v1,v2,v3,N); 
	 
	 /* resto del programa */
	}

---

# Vectores y funciones

Hemos visto los vectores en estos 4 contextos:

1. Al declarar un vector como una variable en una función. En ese caso lleva corchetes y, en medio, el tamaño del vector.
2. Una vez declarado el vector, para utilizarlo accedemos a una de sus componentes que es como una variable del tipo correspondiente. Por ejemplo, un vector `int v[5];` lo utilizo indexando a cualquiera de sus 5 valores `int` que contiene. Para ello, decimos a qué componente queremos acceder y ponemos ese valor entre corchetes.
3. Cuando definimos una función y queremos que se le pase un vector como argumento, se declara el parámetro poniendo corchetes pero no le daremos un tamaño entre los corchetes (no se le da tamaño porque no se reserva crea un vector, se le pasa uno que ya existe, y a la función le basta saber dónde empieza el vector, si bien es su responsabilidad no acceder fuera del mismo).
4. Cuando llamamos a una función que espera recibir un vector, le pasamos el vector entero (todo, no una de sus componentes) y por eso **NO** se ponen corchetes, ya que los corchetes indican que nos interesa acceder a una de las componentes del mismo.

---

# Vectores y funciones

## RESUMEN: 

### ¿Cuándo poner corchetes en los vectores?

- Al declarar una variable de tipo vector, CON EL **TAMAÑO** DEL VECTOR ENTRE CORCHETES.
- Al acceder a una casilla del vector, CON EL **ÍNDICE** DE LA CASILLA ENTRE CORCHETES.
- Al declarar un parámetro de una función cuyo tipo sea un vector, si no se pone nada en medio sirve para cualquier tamaño.


### ¿Cuándo NO poner corchetes en los vectores?

- Al pasar un vector a una función que espera un vector.

---

# Vectores y funciones

## Los corchetes en los vectores

- Es la forma de saber que declaramos una variable de tipo vector:
    - Si es una variable local,  hace falta dar el tamaño y el ordenador reserva **espacio de memoria** para guardar todos los valores.
	- Si es un parámetro o argumento de una función (entre los paréntesis en la cabecera de la función) el tamaño es **opcional** y el ordenador no reserva espacio de memoria. Cuando llames a la función ya le pasarás la dirección de un vector para que la función trabaje con él.
  
- Una vez declarado un vector:
    - Si no ponemos corchetes nos referimos **al vector entero**.
	- Si usamos corchetes, el índice es un valor entre 0 y tamaño menos 1.

---

# Vectores y funciones

### Ejemplo: pedir 10 valores enteros y volverlos a mostrar

	!c
	#include <stdio.h>
	#include <conio.h>
	void pedir_vector(int v[], int n) {
	  int i;
	  for (i=0; i<n; i=i+1) {
	    fprintf(stdout,"Introduce v[%d]: ",i);
		fscanf(stdin,"%d",&v[i]);
	  }
	}
	void mostrar_vector(int v[], int n) {
	  int i;
	  for (i=0; i<n; i=i+1) {
	    fprintf(stdout,"v[%d] = %d\n",i,v[i]);
	  }
	}
	
### (Continúa)	

---

# Vectores y funciones

### Ejemplo: pedir 10 valores enteros y volverlos a mostrar (continuación)

	!c
	#define TAM 10
	int main() {
	  int a[TAM]; /* unico sitio de este programa
	               donde se declara un vector */
	  pedir_vector(a,TAM);
	  mostrar_vector(a,TAM);
	  getch();
	  return 0;
	}

---

# Vectores y funciones

### Analicemos la función `pedir_vector`:

	!c
	void pedir_vector(int v[], int n) {

- La función no devuelve nada (por el `void`) porque la función se limita a **modificar** el contenido del vector (poniendo los datos que introduzca el usuario por el teclado).
- El primero de sus parámetros es un vector (`int v[]`), observa que no hace falta dar el tamaño.
    - A la función le basta saber dónde empieza el vector, sus elementos están dispuestos de manera consecutiva.
	- De esta manera, la misma función nos sirve para vectores de tamaños diferentes.
	- Por otra parte, acceder de manera correcta (sin salirse) es **nuestra responsabilidad** :(
	- La solución es darle a la función el tamaño en otro parámetro.
- El segundo argumento es el tamaño del vector pasado como primer argumento.

---

# Vectores y funciones

### Analicemos cómo se llama a `pedir_vector`:

	!c
	#define TAM 10
	int main() {
	  int a[TAM]; /* unico sitio de este programa
	               donde se declara un vector */
	  pedir_vector(a,TAM);
	  /* continua */

- Siempre que llames a una función debe aparecer el nombre de la función seguido de paréntesis (aunque dentro de los paréntesis no haya nada, aunque ahora sí hay 2 parámetros).
- Como la función es de tipo `void`, la llamada a la función se pone sin más como una sentencia que termina en punto y coma.
- Recuerda que para pasarle un vector entero a una función se pone la variable vector **sin corchetes**. Usar corchetes en un vector, **excepto al declararlo**, sirve para acceder a una casilla concreta del vector (la que nos dice el índice que pasamos entre los corchetes).

---

# Vectores y funciones

### Ejemplo de la versatilidad de `pedir_vector`:

Darle el tamaño del vector a la función `pedir_vector` sirve para poder utilizar vectores de tamaños diferentes como muestra el siguiente ejemplo:

	!c
	#define N  5
	#define M 10
	int main() {
	  int v[N], w[M];
	  fprintf(stdout,"Introduce datos de un vector de talla %d\n",N);
	  pedir_vector(v,N);
	  fprintf(stdout,"Introduce datos de un vector de talla %d\n",M);
	  pedir_vector(w,M);
	  fprintf(stdout,"Has introducido los siguientes datos:\n");
	  mostrar_vector(v,N);
	  mostrar_vector(w,M);
	  getch();
	  return 0;
	}

---

# Vectores y funciones

### Otro ejemplo: pedir 2 vectores de talla 10  y mostrar la suma

	!c
	void suma_vectores(int a[], int b[], int c[], int n) {
      int i;
	  for (i=0; i<n; i=i+1) {
	     a[i] = b[i]+c[i];
	  }
	}
	#define TAM 10
	int main() {
	  int x[TAM],y[TAM],z[TAM];
	  fprintf(stdout,"Introduce el primer vector:\n");
	  pedir_vector(x,TAM);
	  fprintf(stdout,"Introduce el segundo vector:\n");
	  pedir_vector(y,TAM);
	  suma_vectores(z,x,y,TAM);
	  fprintf(stdout,"El vector suma es:\n");
	  mostrar_vector(z,TAM);
	  getch();
	  return 0;
	}

---

# Cadenas

Una cadena se representa como un vector de elementos de tipo `char`

El **problema** de esta representación es que necesitamos establecer un **tamaño máximo** a la hora de crear el vector, mientras que las cadenas que queremos guardar tienen, en general, diversas longitudes.

En las bibliotecas estándar de C se toma el siguiente convenio:

## El carácter `'\0'` indica el fin de la cadena

Y conocemos, de momento, las siguientes funciones que entienden lo que son este tipo de cadenas:

- `fprintf` para escribir a pantalla y a fichero
- `fscanf` para leer de teclado y de fichero
- `fgets` para leer una línea de teclado o de fichero
- `fopen` recibe el nombre (ruta) del fichero


---

# Cadenas

Por ejemplo, en el siguiente programa:

	!c
	#define MAX 80
	int main() {
	  char nom[MAX];
	  fprintf(stdout,"Dime tu nombre: ");
	  fscanf(stdin,"%s",nom);
	  fprintf(stdout,"Hola %s!\n",nom);
	  getch();
	  return 0;
	}

Si en el programa anterior alguien escribe `Juan` tendremos lo siguiente:

<center>
<table border=1 cellpadding=5 cellspacing=0 style="text-align:center">
<tr><td>nom[0]</td><td>nom[1]</td><td>nom[2]</td><td>nom[3]</td><td>nom[4]</td><td>nom[5]</td><td>...</td><td>nom[79]</td></tr>
<tr><td>'J'</td><td>'u'</td><td>'a'</td><td>'n'</td><td>'\\0'</td><td>?</td><td>...</td><td>?</td></tr>
</table>
</center>

Se ocupan las 5 (longitud de "Juan" **MAS UNO** para el `'\0'`) primeras casillas del vector, el resto (de la 5 a la 79) DA IGUAL lo que contenga (se suele decir que contienen *"basura"*).

---

# Cadenas

Podemos acceder a una cadena exactamente igual que con cualquier vector:

	!c
	#define MAX 80
	int main() {
	  int i; /* indice vector */
	  char nombre[MAX];
	  fprintf(stdout,"Dime tu nombre: ");
	  fscanf(stdin,"%s",nombre);
      i=0;
	  while (nombre[i] != '\0') { /* mientras no sea el final */
	    fprintf(stdout,"%c\n",nombre[i]);
		i=i+1;
	  }
	  getch();
	  return 0;
	}

Que en lugar de imprimir `Juan` imprime:

	J
	u
	a
	n

---

# Cadenas

También podemos realizar funciones que reciben una cadena, observa que en este ejemplo no le pasamos la longitud del vector porque suponemos que hay un `'\0'` antes de salirnos de los límites del vector (en otro caso petaría):

	!c
	int longitud(char cadena[]) {
	  int i=0;
	  while (cadena[i] != '\0') {
	   i=i+1;
	  }
	  return i;
	}
	
	#define MAX 80
	int main() {
	  char nombre[MAX];
	  fprintf(stdout,"Dime tu nombre: ");
	  fscanf(stdin,"%s",nombre);
	  fprintf(stdout,"Tu nombre tiene %d letras\n",
	          longitud(nombre));
	  getch();
	  return 0;
	}
	
---

# Cadenas

Le podemos pasar cadenas a funciones y usarlas:

	!c
	float pedir_numero(char mensajito[]) {
	  float aux;
	  fprintf(stdout,mensajito);
	  fscanf(stdin,"%f",&aux);
	  return aux;
	}
	int main() {
	  float ancho,alto;
	  ancho = pedir_numero("Introduce la anchura: ");
	  alto  = pedir_numero("Introduce la altura: ");
	  fprintf(stdout,"El area del rectangulo es %f\n",
	          area_rectangulo(ancho,alto));
	  getch();
	  return 0;
	}

En pantalla:

	Introduce la anchura: 10
	Introduce la altura: 20
	El area del rectangulo es 200

---

# Algunas funciones estándar para cadenas

Las siguientes funciones están definidas en la biblioteca `string.h`:

- `strlen` calcula la **longitud** de la cadena (como la función del ejemplo anterior),
- `strcpy` **copia** una cadena en otra (seria interesante hacer esto como un ejercicio),
- `strcmp` recibe 2 cadenas y las **compara** de manera lexicográfica/alfabética.

La siguientes funciones están en la misma biblioteca (`stdio.h`) que las ya conocidas `fprintf` y `fscanf`:

- `sprintf` actúa como `fprintf` pero escribe el resultado en una cadena (en lugar de en un fichero)
- `sscanf` actúa como `fscanf` pero recibe los datos de una cadena (en lugar de en un fichero)

---

# `strlen` longitud de la cadena

## Cabecera:

	!c
	int strlen(char cadena[]);

## Ejemplo:

	!c
	#include <stdio.h>
	#include <conio.h>
	#include <string.h>

    #define MAX 80
	
	int main() {
	  char nombre[MAX];
	  fprintf(stdout,"Dime tu nombre: ");
	  fscanf(stdin,"%s",nombre);
	  fprintf(stdout,"Tu nombre tiene %d letras\n",
	          strlen(nombre));
	  getch();
	  return 0;
	}

---

# `strcpy` copia una cadena en otra

## Cabecera:

	!c
	void strcpy(char destino[], char origen[]);

## Ejemplo:

	!c
	int main() {
	  char nombre[MAX],copia[MAX];
	  fprintf(stdout,"Dime tu nombre: ");
	  fscanf(stdin,"%s",nombre);
	  
	  /* copiamos el nombre,
	     primero el destino y luego el origen */
	  strcpy(copia,nombre);
	  
      /* ahora copia contiene lo mismo que nombre */
	  fprintf(stdout,"Hola %s!\n",copia);
	  getch();
	  return 0;
	}

---

# `strcmp` compara dos cadenas

## Cabecera:

	!c
	int strcmp(char una[], char otra[]);
	
## Devuelve:

- `0`  si ambas cadenas son **iguales**
- `<0` si la primera es **menor que** la segunda
- `>0` si la primera es **mayor que** la segunda

---

# `strcmp` compara dos cadenas

## Ejemplo:

**(Útil para realizar el ejercicio que veremos en prácticas)** Escribe un programa que pida a un usuario que escriba `piedra`, `papel` o `tijera`. A continuación debe borrar la pantalla. A continuación pide de nuevo que otro usuario rival escriba `piedra`, `papel` o `tijera`. Finalmente el programa debe decir quién ha ganado (o si ha habido empate). El siguiente ejemplo, mucho más sencillo, muestra cómo comparar 2 cadenas para ver si una es igual a otra:

    !c
	int main() {
	  char cadena[MAX];
	  fprintf(stdout,"Escribe una palabra: ");
	  fscanf(stdin,"%s",cadena);
	  if (strcmp(cadena,"tijera")==0) {
	    fprintf(stdout,"Has escrito tijera\n");
	  } else {
	    fprintf(stdout,"NO has escrito tijera\n");
	  }
	  getch();
	  return 0;
	}

---

# `sprintf` escribe en una cadena

`sprintf` lleva una `s` en lugar de una `f` porque escribe en una cadena (en inglés, *string*) en lugar de en un `f`ichero ;), el siguiente ejemplo muestra cómo se puede utilizar:

    !c
	int main() {
	  char cadena[MAX];
	  int i;
	  FILE *fich;
	  for (i=0; i<10 ; i=i+1) {
	    /* genero una cadena que pone
	       fichero0 o fichero1 ... */
	    sprintf(cadena,"fichero%d.txt",i); 
        fich = fopen(cadena,"w");
	    fprintf(fich,"hola, soy el contenido del fichero %d\n",i);
	    fclose(fich);
	  }
	  return 0;
	}

## ¿qué hace este programa?

---

# Algunos ejercicios resueltos utilizando vectores y cadenas

---

# Contar mayores que la media

Nos dicen que en el fichero `numeros.txt` hay un conjunto de números con decimales (`float`). No sabemos cuántos hay, pero sí que es menos de 100. Se pide calcular el número de elementos que son mayores que la media.

Vamos a crear un montón de funciones (se puede hacer sin funciones, incluso sin vectores (leyendo 2 veces), pero se trata de aprender, ¿no?):

- Lectura de los datos del fichero.
- Cálculo de la media de los elementos del vector.
- Contar número de elementos de un vector que son mayores que un umbral.


---

# Contar mayores que la media

## Lectura de datos del fichero:

	!c
	int leer(char nombrefichero[], float v[], int talla) {
	  FILE* fich;
	  int i = 0; /* para contar, empieza en 0 */
      fich = fopen(nombrefichero,"r"); /* abrimos en modo lectura */
	  /* mientras no se llene el vector Y pueda leer un valor */
	  while (i<talla && fscanf(fich,"%f",&v[i]) == 1) {
	   i = i+1; /* paso al siguiente indice */
	  }
	  fclose(fich);	/* no olvidemos cerrar el fichero */
	  return i; /* el numero de elementos que hemos leido */
	}

- Lee valores de un fichero hasta que se terminen los datos del fichero o se llene el vector (lo que ocurra primero).
- Devuelve el número de elementos del vector que tienen datos del fichero (no necesariamente la talla del vector, puede estar solamente medio lleno).

---

# Contar mayores que la media

## Cálculo de la media de los elementos del vector

	!c
	float calcular_media(float v[], int talla) {
	  float suma=0; /* IMPORTANTE: inicializar a 0 */
	  int i;
	  for (i=0; i<talla; i=i+1) {
	    suma = suma + v[i]; /* acumulamos v[i] en suma */
	  }
	  return suma/talla;
	}

### IMPORTANTE:

No hay ningún problema en pasarle como `talla` el número de elementos leídos por la función anterior aunque sea menor que la talla del vector

---

# Contar mayores que la media

## Contar el número de elementos mayores que un umbral

	!c
	int contar_mayor_umbral(float v[], int talla, float umbral) {
	  int i,contador=0; /* IMPORTANTE: inicializar a 0 */
	  for (i=0; i<talla; i=i+1) {
	    if (v[i] > umbral) {
		  contador = contador+1;
		}
	  }
	  return contador;
	}

---

# Contar mayores que la media

## ¡Y ahora lo juntamos todo!

	!c
	#include <stdio.h>
	#include <conio.h>
	#define N 100
	#define NOMFICHERO "numeros.txt"
	
	/* aqui ponemos las funciones anteriores */
	
	int main() {
	  float media,v[N];
	  int talla, resultado;
	  talla = leer(NOMFICHERO,v,N);
	  media = calcular_media(v,talla);
      resultado = contar_mayor_umbral(v,talla,media);
	  fprintf(stdout,"Hay %d numeros mayores que la media (%f)\n",
             resultado,media);
	  getch();
	  return 0;
	}

---

# Máximo de un vector

### Obtener el máximo de un vector de talla `n`

	!c
	int maximo(int v[], int n) {
		int i,max = v[0];
		for (i=1; i<n; i=i+1)
		  if (v[i] > max)
		    max = v[i];
	    return max;
	}

### Obtener *la posición del máximo* de un vector de talla `n`

	!c
	int pos_maximo(int v[], int n) {
		int i,max = v[0],posmax=0;
		for (i=1; i<n; i=i+1)
		  if (v[i] > max) {
		    max = v[i];
			posmax = i;
		  }
	    return posmax;
	}

---

# Determinar propiedades de vectores

Nos planteamos realizar **funciones** que:

- Reciben vectores.
- Devuelven valores de tipo booleano (cierto o falso)

Como ya sabes, en C se representan mediante valores enteros (`int`) con el convenio "0 es falso, 1 es cierto".

## Idea general:

En muchos de los casos la comprobación supone que una propiedad se debe cumplir para CADA elemento del vector. En ese caso:

- Basta con que un solo elemento no lo cumpla para que se pueda asegurar que no se cumple para el vector.
- **Pero** hay que llegar al final del vector para decir que sí se cumple.

---

# Determinar propiedades de vectores

## Iguales

Escribe una función que recibe 2 vectores de valores enteros (ambos de talla `n`, valor dado como parámetro)  y nos dice si son **iguales** o no.

### Ejemplo de lo que NO hay que hacer:

    !c
	#define TAM 4
	int main() {
	  int i,a[TAM],b[TAM];
	  fprintf(stdout,"Introduce el primer vector:\n");
	  pedir_vector(a,TAM);
	  fprintf(stdout,"Introduce el segundo vector:\n");
	  pedir_vector(b,TAM);
	  for (i=0; i<TAM; i=i+1)
	    if (a[i] == b[i])
		  fprintf(stdout,"Los vectores son iguales\n");
		else
		  fprintf(stdout,"Los vectores son diferentes\n");
      getch();
	  return 0;
	}

---

# Determinar propiedades de vectores

## Iguales

### Ejemplo de lo que NO hay que hacer:

¿Cuál es el fallo del programa anterior? Que podría sacar por pantalla algo así:

	Los vectores son iguales
	Los vectores son iguales
	Los vectores son iguales
	Los vectores son diferentes
	Los vectores son diferentes
	Los vectores son iguales
	Los vectores son diferentes
	
Lo que queremos es:

- Que el programa *no nos marée* con tropecientos mensajitos contradictorios.
- Claramente en el caso anterior los vectores son diferentes puesto que **basta con que 2 casillas tengan elementos diferentes** para considerar que los 2 vectores no son iguales.

---

# Determinar propiedades de vectores

## Iguales

La forma correcta es decir que no son iguales en cuanto vemos 2 elementos diferentes y decir que son iguales si llegamos al final sin haberlos encontrado. La siguiente función recibe 2 vectores y la talla (de ambos, debe de ser la misma). La función devuelve 1 (cierto) si son iguales y 0 (falso) si son diferentes:

    !c
	int iguales(int v1[], int v2[], int n) {
	  int i;
	  for (i=0; i<n; i=i+1)
	   if (v1[i] != v2[i])
	     return 0;
	  return 1;
	}
	
### ¡Recuerda!

El uso de paréntesis `{ }` es obligatorio si el bloque del `for`, `while`, `if` ... tiene más de una instrucción, pero es OPCIONAL si solamente lleva una instrucción. En este ejemplo solamente hay una instrucción dentro del `for` y solamente una dentro del `if`.	

---

# Determinar propiedades de vectores

## Iguales

Ahora con la función anterior resulta muy fácil realizar el programa principal:

    !c
	#define TAM 10
	int main() {
	  int i,a[TAM],b[TAM];
	  fprintf(stdout,"Introduce el primer vector:\n");
	  pedir_vector(a,TAM);
	  fprintf(stdout,"Introduce el segundo vector:\n");
	  pedir_vector(b,TAM);
	  if (iguales(a,b,TAM)) {
		  fprintf(stdout,"Los vectores son iguales\n");
	  } else {
		  fprintf(stdout,"Los vectores son diferentes\n");
	  }
      getch();
	  return 0;
	}

---

# Determinar propiedades de vectores

Además de ver si dos vectores son iguales, puedes plantearte estos otros *ejercicios*:

- Ver si el contenido de un vector de enteros forma una secuencia estrictamente creciente (ídem con decreciente o sin el "estrictamente").
- Ver si todos los elementos de un vector son iguales.
- Ver si el contenido de un vector de enteros forma una progresión aritmética.
- Ver si el contenido de un vector de enteros forma contiene valores de signos alternados (si un valor es positivo, el siguiente es negativo y viceversa).

---

# Generar histogramas

Sabiendo que un vector de talla `N` constituye un casillero con `N` casillas indexadas con índices de `0` a `N-1`, podemos utilizar los índices para representar elementos y las casillas para guardar información.

### EJERCICIO

Suponiendo que seas muy *muuuuy* afortunado, te habrá tocado la lotería tantas veces que ya "ni te acuerdas". Para organizarte un poco, en el fichero `meses.txt` has registrado los meses en los que te ha tocado a lo largo de los años junto a la cantidad recibida ese mes. El fichero (por tu bien, espero que no esté vacío) podría empezar así:

	3 1500.0
	6 800.0
	10 2000000.0
	...
	
donde se ve que en marzo (mes 3) te tocaron unos miserables 1500 euros, en junio unos penosos 800 euros y ¡ya era hora! en octubre unos bien merecidos aunque escasos 2 millones de euros, y así sucesivamente...

---

# Generar histogramas

Ahora quieres hacer un programa para calcular:

- El dinero total que has ganado cada mes (todos los meses de enero a lo largo de los años, los febrero, ... hasta diciembre).
- Número de veces que has ganado cada mes.

Para ello crearemos un vector de talla 12 (los 12 meses) de `float` para guadar en cada uno el total de lo ganado cada mes y otro de enteros para contar el número de veces que has ganado. Inicializamos a 0 los vectores:

	!c
	int main() {
	  float gano[12], cantidad;
	  int mes,veces_gano[12];
	  FILE* fich;
	  /* pongo a 0 todas las componentes del vector */
	  for (mes=0; mes<12; mes=mes+1) {
	    gano[mes]       = 0;
	    veces_gano[mes] = 0;
	  }

### (continúa)

---

# Generar histogramas

### (continuación)

	!c
	  /* abro el fichero en modo lectura */
	  fich = fopen("meses.txt","r");
	  
	  /* mientras pueda leer 2 valores */
	  while (fscanf(fich,"%d%f",&mes,&cantidad) == 2) {
	    if (mes < 1 || mes > 12)
		  fprintf(stdout,"Cuidadin! hay un mes erroneo: %d\n",mes);
        else { /* RESTAMOS 1 AL INDICE DEL MES */
		  gano[mes-1]       = gano[mes-1] + cantidad;
		  veces_gano[mes-1] = veces_gano[mes-1] + 1;
		}
	  }
	  /* ya hemos leido todos los datos del fichero,
	     vamos a cerrarlo */
	  fclose(fich);
	  
### (continúa)

---

# Generar histogramas

### (continuación)

    !c
	  /* mostramos los datos que nos han pedido calcular: */
	  for (mes=0; mes<12; mes=mes+1) {
	    fprintf(stdout,"Los meses %d gane %d veces la loteria "
		        "y en total me lleve %.2f euros de na\n",
				mes+1,veces_gano[mes],gano[mes]);
	  }
	  getch();  /* tomate tu tiempo para pulsar la tecla
	               que quita la pantalla  y deleitarte viendo
				   todo esa cantidad de dinero.
				   Que haces estudiando? Esta claro que en
				   el fondo te gusta el lenguaje C xD */
   	  return 0;
	}

---

# Contar vocales

Para contar las vocales (minúsculas, sin acentuar) de una cadena podemos hacer como sigue:

	!c
	/* IMPORTANTE: observa que las 5 vocales aparecen dentro
	   de comillas simples '', que sirven para denotar los LITERALES
	   de los valores de tipo char, estaria MAL no poner comillas
	   simples '' o ponerlas dobles "" */
	int es_vocal(char ch) {
	  return (ch == 'a' || ch == 'e' || ch == 'i' ||
	          ch == 'o' || ch == 'u');
	}
	
	int contar_vocales(char cadena[]) {
	  int i=0, vocales=0;
      while (cadena[i] != '\0') {
	    if (es_vocal(cadena[i])) {
		  vocales = vocales+1;
		}
		i=i+1;
	  }
	  return vocales;
	}

---

# Contar vocales

Podemos probar las funciones anteriores con este programa:

	!c
	#define TAM 200 
	int main() {
	  char cadena[TAM];
	  fprintf(stdout,"Escribe lo que te de la gana: ");
	  fgets(cadena, TAM, stdin); /* leemos hasta fin de linea */
      fprintf(stdout,"Lo que has escrito tiene %d vocales,"
	         " no te da verguenza?\n", contar_vocales(cadena));
	  getch();
	  return 0;
	}

---

# Quitar vocales

Este ejercicio es importante porque te enseña a poner un `'\0'` al final de una cadena que haya generado tu programa.

Nos piden hacer una función que **elimine** las vocales (minúsculas sin acentuar) de una cadena. Es decir, si la cadena contiene la frase:

	Hola, soy una cadena de texto.
	
Tras llamar a la función, la cadena quedará convertida en:

	Hl, sy n cdn d txt.

Para ello, vamos a ir recorrer la cadena de izquierda a derecha copiando los caracteres que no sean vocales (reutilizaremos la función del ejercicio anterior). Es decir, necesitamos 2 variables de tipo entero para utilizar como **índice del vector o cadena**, un índice para leer en la cadena y otro para escribir. Puede costar un pelín de entender al principio, lo importante es que escribimos siempre en casillas del vector en las que ya hemos leído (de otro modo, podría no funcionar).


---

# Quitar vocales

	!c
	void eliminar_vocales(char cadena[]) {
	  int indiceleer=0,indiceescribir=0;
	  /* mientras no encuentre el fin de la cadena */
      while (cadena[indiceleer] != '\0') {
	    /* recuerda que ! significa no */
	    if (!es_vocal(cadena[indiceleer])) {
		  /* copio el caracter hacia atras a la posicion
		     de escribir y luego avanzo */
		  cadena[indiceescribir] = cadena[indiceleer];
		  indiceescribir = indiceescribir+1;
		}
		/* en cualquier caso paso a leer el caracter siguiente */
		indiceleer = indiceleer+1;
	  }
	  /* MUY IMPORTANTE poner un '\0' al final, puesto que la cadena
	     en general se ha quedado mas corta que antes */
	  cadena[indiceescribir] = '\0';
	  /* puedo poner un return; pero es opcional porque la funcion
	     no devuelve nada (tipo void) y estamos al final */
	}

---

# Quitar vocales (sin parafernalia)

	!c
	void eliminar_vocales(char cadena[]) {
	  int indiceleer=0,indiceescribir=0;
      while (cadena[indiceleer] != '\0') {
	    if (!es_vocal(cadena[indiceleer])) {
		  cadena[indiceescribir] = cadena[indiceleer];
		  indiceescribir = indiceescribir+1;
		}
		indiceleer = indiceleer+1;
	  }
	  cadena[indiceescribir] = '\0';
	}
    #define TAM 100;
    int main() {
	  char frase[TAM];
	  fprintf(stdout,"Cuentame tu vida: ");
	  fgets(frase, TAM, stdin);
	  eliminar_vocales(frase); /* vocales fuera! */
	  fprintf(stdout,"N m gstn ls vcls:\n%s",frase);
	  getch();
	  return 0;
	}
