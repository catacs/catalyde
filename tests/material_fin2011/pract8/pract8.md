
# Práctica 8. Vectores

---

# Piedra, papel o tijera

Escribe un programa que:

1. Pida a un usuario que escriba `piedra`, `papel` o `tijera`. A continuación debe borrar la pantalla.
2. A continuación pide a otro usuario rival que escriba `piedra`, `papel` o `tijera`.
3. Finalmente, el programa debe determinar el ganador.

### Consejos:

- Puedes borrar la pantalla llamando a la función `system("cls");` (debes incluir la biblioteca `stdlib.h`).
- Escribe una función `pedir_opcion` que pida una cadena al usuario y que (utilizando `strcmp`) devuelva el código correspondiente a las constantes siguientes (si el usuario se equivoca debe "increparle" y volver a preguntar):

	    !c
		#define PIEDRA 0
		#define PAPEL  1
		#define TIJERA 2
		

---

# Piedra, papel o tijera (continuación)

- Para implementar la función `pedir_opcion` puedes utilizar la función `strcmp`, estudia los ejemplos de uso de esta función en los apuntes de teoría.

- Escribe la siguiente función que recibe la elección de cada usuario (utilizando los códigos de las constantes anteriores):

	    !c
		int quien_gana(int usu1, int usu2) { /* completar */ }
		
- La función debe devolver uno de estos valores:

	    !c
		#define GANA1   0
		#define GANA2   1
		#define EMPATAN 2
		


---

# Piedra, papel o tijera (continuación)

### Esquema propuesto:

	!c
    #include <stdio.h>
    #include <conio.h>
    #include <string.h>
    #include <stdlib.h>

    #define PIEDRA 0
    #define PAPEL  1
    #define TIJERA 2

    #define GANA1   0
    #define GANA2   1
    #define EMPATAN 2

    int pedir_opcion() {
       /* completar */ 
    }
    int quien_gana(int usu1, int usu2) {
       /* completar */ 
    }


---

# Piedra, papel o tijera (continuación)

### Esquema propuesto (continuación):

	!c
    int main() {
        int op1, op2;
        op1 = pedir_opcion(); system("cls");
        op2 = pedir_opcion(); system("cls");
        switch (quien_gana(op1,op2)) {
          case GANA1:
           fprintf(stdout,"Gana el primer usuario\n"); break;
          case GANA2:
           fprintf(stdout,"Gana el segundo usuario\n"); break;
          case EMPATAN:
           fprintf(stdout,"EMPATE AL CANTO!\n");
        }
        getch();
        return 0;
    }

### EJERCICIO extra: modifica el programa anterior para que repita todo el proceso mientras hayan empates.

---

# Contar vocales

Escribe una función que recibe una cadena y que calcula el número de vocales que contiene dicha cadena. El perfil de la función es como sigue:

	!c
	int contar_vocales(char cadena[]);
	
Y para probarlo puedes usar este programa:

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
	
Se aconseja recorrer la cadena letra a letra hasta fin de cadena y usar un `switch` para ver si el caracter en cuestión es una vocal.	

---

# Contar vocales (continuación)

Para realizar la función `contar_vocales` escribe primero la siguiente función que recibe un carácter y devuelve 0 si NO es vocal y 1 si sí lo es:

	!c
	int es_vocal(char caracter) { /* COMPLETAR */ }
	
Recuerda que una cadena es un vector de `char` que lleva el carácter `'\0'` para indicar el fin de la cadena como se muestra en este ejempo de teoría:

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

---

# Ejercicios adicionales (lo que no dé tiempo, para practicar en casa)

---

# Determinar propiedades de vectores

¡Ahora se han empeñado en que aprendamos a determinar algunas propiedades de los vectores! Para ello, nos planteamos realizar **funciones** que reciben vectores y devuelven valores de tipo booleano (cierto o falso) que, como ya sabes, en C se representan mediante valores enteros (`int`) con el convenio "0 es falso, 1 es cierto".

1. Escribe una función que recibe 2 vectores de valores enteros (ambos de talla `n`, valor dado como parámetro)  y nos dice si son **iguales** o no, la función tendrá el siguiente perfil:

	    !c
		int iguales(int v1[], int v2[], int n);

2. Escribe una función que recibe 1 vector de talla `n` (valor dado como parámetro) y nos dice si el vector contiene una **secuencia estrictamente creciente**.
3. Escribe una función que recibe 1 vector de talla `n` (valor dado como parámetro) y nos dice si el vector contiene una **progresión aritmética**.

---

# Determinar propiedades de vectores

Para realizar estos ejercicios, se aconseja utilizar la siguiente función auxiliar para leer un vector:

	!c
	void pedir_vector_int(int v[], int N) {
	  int i;
	  for (i=0; i<N; i=i+1) {
	    fprintf(stdout,"Introduce v[%d]: ",i);
		fscanf(stdin,"%d",&v[i]);
	  }
	}

---

# ¿Cuánto ha llovido?

Escribe un programa que recibe un fichero `lluvias.txt` que tiene información recopilada por un pluviómetro. En concreto, el fichero contiene un número indeterminado de líneas, cada una con los valores siguientes:

	anyo mes dia litros_por_metro_cuadrado
	
Por ejemplo, la primera línea del fichero podría ser:

	1990 1 12 20.4
	
indicando lo que ha llovido el 12 de enero de 1990.	
	
Escribe un  programa que pida al usuario un año entre 1990 y 2010 (el programa debe asegurarse de que el año introducido está en el rango correcto, en caso contrario volverá a preguntarlo) y que, tras procesar adecuadamente el fichero `lluvias.txt` muestre por pantalla:

- Cuánto ha llovido en total a lo largo del año (en litros por metro cuadrado).
- El mes que más llovió ese año y cuánto llovió.
- El mes en que  llovió menos ese año y cuánto llovió.

---

# ¿Qué año llovió más?

Utilizando el mismo fichero `lluvias.txt` del ejercicio anterior, ahora nos piden calcular:

### el total de lluvias para cada año entre 1990 y 2010.

Es decir, nos piden escribir un programa que lea el fichero `lluvias.txt` y que genere el fichero `poranyo.txt` con una línea por cada año entre 1990 y 2010 indicando, en cada línea, el año y el total de litros llovidos (por metro cuadrado) cada año.

