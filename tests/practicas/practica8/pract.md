## Contar las vocales de una cadena

Vamos a realizar una función que cuente las vocales de una cadena y la vamos a probar con este programa:

```
#define TAM 200 
int main() {
  char cadena[TAM];
  printf("Escribe lo que te de la gana: ");
  fgets(cadena, TAM, stdin); /* lee hasta fin de linea */
  printf("Lo que has escrito tiene %d vocales,"
         " no te da verguenza?\n", contar_vocales(cadena));
  return 0;
}
```

Para realizar la función `contar_vocales` debes hacer primero la siguiente función que recibe un carácter y devuelve 0 si NO es vocal y 1 si lo es, usar un `switch` para ver si el caracter en cuestión es una vocal:

```
int es_vocal(char caracter) {
```

<!-- BEGINBLOCK { "b_tag": "cuerpo_funcion_es_vocal" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_contar_vocales" }]} -->
/* aqui va el codigo del cuerpo de la funcion */
<!-- ENDBLOCK -->

```
}
```

Escribe una función que recibe una cadena y que calcula el número de vocales que contiene dicha cadena:

```
int contar_vocales(char cadena[]) {
```

<!-- BEGINBLOCK { "b_tag": "cuerpo_funcion_contar_vocales" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "contar_vocales" }]}   -->
/* aqui va el codigo del cuerpo de la función contar vocales */
<!-- ENDBLOCK -->

```
}
```
    
Se aconseja recorrer la cadena letra a letra hasta fin de cadena como en este ejemplo:

```
#define MAX 80
int main() {
  int i; /* indice vector */
  char nombre[MAX];
  fprintf(stdout,"Dime tu nombre: ");
  fscanf(stdin,"%s",nombre);
  i=0;
  while (nombre[i] != '\0') { /* no es el final */
    fprintf(stdout,"%c\n",nombre[i]);
    i=i+1;
  }
  getch(); return 0;
}
```

## Determinar propiedades de vectores

Vamos a  realizar **funciones** que reciben vectores y devuelven valores de tipo cierto o falso con el convenio "0 es falso, 1 es cierto".

Para probar estos ejercicios utilizaremos la siguiente función auxiliar para leer un vector:

```
void pedir_vector_int(char nom[],int v[], int n) {
  int i;
  for (i=0; i<n; i=i+1) {
    fprintf(stdout,"Introduce %s[%d]: ",nom,i);
	fscanf(stdin,"%d",&v[i]);
  }
}
```

1. Escribe una función que recibe 2 vectores de enteros de talla `n` (dado como parámetro)  y nos dice si son **iguales** o no:

```
int iguales(int v1[], int v2[], int n) { ... }
```

<!-- BEGINBLOCK { "b_tag": "funcion_iguales" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_iguales" }]}   -->
/* aqui va la funcion iguales incluyendo la cabecera que has de copiar de arriba */
<!-- ENDBLOCK -->

Vamos probar esta función con este programa que debes completar:

```
#define N 5
int main() {
  int a[N], b[N];
  pedir_vector_int("a",a,N);
  pedir_vector_int("b",b,N);
```  
<!-- BEGINBLOCK { "b_tag": "condicional_iguales" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "iguales" }]}   -->
/* completar */
<!-- ENDBLOCK -->
```  
    printf("Los dos vectores son iguales\n");
  else
    printf("Los dos vectores son diferentes\n");
  return 0;
}
```

2. Escribe una función que recibe 1 vector de talla `n` (valor dado como parámetro) y nos dice si el vector contiene una **secuencia creciente** (no necesario que sea estrictamente).

<!-- BEGINBLOCK { "b_tag": "funcion_creciente" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_creciente" }]}   -->
/* aqui va la funcion creciente */
<!-- ENDBLOCK -->

Para probar esta función usaremos este programa:

```
#define N 5
int main() {
  int a[N];
  pedir_vector_int("a",a,N);
  if (creciente(a,N))
    printf("La secuencia es creciente\n");
  else
    printf("La secuencia no es creciente\n");
  return 0;
}
```

3. Escribe una función que recibe 1 vector de talla `n` (valor dado como parámetro) y nos dice si el vector contiene una **progresión aritmética**.

<!-- BEGINBLOCK { "b_tag": "funcion_progresion" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_progresion" }]}   -->
/* aqui va la funcion progresion_aritmetica */
<!-- ENDBLOCK -->

Para probar esta función debes escribir un programa (que puede utilizar la función `pedir_vector_int`):

<!-- BEGINBLOCK { "b_tag": "programa_progresion" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_progresion" }]}   -->
/* aqui va un programa entero */
<!-- ENDBLOCK -->


## ¿Cuánto ha llovido?

Escribe un programa que lee el fichero `lluvias.txt` que contiene un número indeterminado de líneas con la fecha y lo que ha llovido cada día:

    anyo mes dia litros_por_metro_cuadrado
    
Ejemplo (el 12 enero 2007 cayeron 20.4 litros por metro cuadrado):

    2007 1 12 20.4
    
Escribe un  programa que pida al usuario un año entre 2007 y 2011 (si no es correcto volverá a preguntarlo) y que, tras procesar el fichero `lluvias.txt` muestre por pantalla:

- Cuánto ha llovido en total a lo largo del año (en litros por metro cuadrado).
- El mes que más llovió ese año y cuánto llovió.
- El mes en que  llovió menos ese año y cuánto llovió.


<!-- BEGINBLOCK { "b_tag": "cuanto_ha_llovido" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_cuanto_ha_llovido" }]} -->
#include <stdio.h>
#define NOMFICHERO "lluvias.txt"
#define DESDE 2007
#define HASTA 2011

int main() {
 /* completa el programa */
 return 0;
}
<!-- ENDBLOCK -->

## ¿Qué año llovió más?

Utilizando el mismo fichero `lluvias.txt` del ejercicio anterior, ahora nos piden calcular **el total de lluvias para cada año entre 2007 y 2011** y luego que diga qué año llovió más.

Es decir, nos piden escribir un programa que lea el fichero `lluvias.txt` y que genere el fichero `poranyo.txt` con una línea por cada año entre 2007 y 2011 indicando, en cada línea, el año y el total de litros llovidos (por metro cuadrado) cada año. El programa también mostrará por pantalla el año que llovió más.


<!-- BEGINBLOCK { "b_tag": "anyo_llovio_mas" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_anyo_llovio_mas" },{"name" : "Ver Fichero", "action" : "run_ver_fichero" }]} -->
#include <stdio.h>
#define NOMFICHERO "lluvias.txt"
#define DESDE 2007
#define HASTA 2011

int main() {
 /* completa el programa */
 return 0;
}
<!-- ENDBLOCK -->

