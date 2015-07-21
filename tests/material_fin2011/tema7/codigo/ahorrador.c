#include <stdio.h>
#include <conio.h>

/* escribe un programa que lee un fichero "datos.txt" con lineas que
   tienen el siguiente formato:

   nombre gana gasta

   donde el nombre no lleva espacios y tanto gana como gasta con
   valores numericos (posiblemente con decimales)

   el objetivo del programa es mostrar por pantalla, y también
   escribir en un fichero "ahorradores.txt" los datos de aquellas
   personas que ahorran (ganan estrictamente mas de lo que gastan)
   indicando el nombre de la persona y la cantidad que ahorra */

#define MAXLONG 100 /* cota superior nombre mas largo */
#define nombre_fichero_origen "datos.txt"
#define nombre_fichero_destino "ahorradores.txt"

int main() {
  /* declaracion de variables locales */
  char nombre[MAXLONG];
  float gana, gasta, ahorra;
  FILE* fich_origen;
  FILE* fich_destino;

  /* abrimos los ficheros */
  fich_origen  = fopen(nombre_fichero_origen, "r"); /* modo lectura */
  fich_destino = fopen(nombre_fichero_destino,"w"); /* modo escritura */

  /* mientras consiga leer lo que le pido (3 cosas) */
  while (fscanf(fich_origen,"%s%f%f",nombre,&gana,&gasta) == 3) {
    /* procesar la linea leida */
    ahorra = gana-gasta;
    if (ahorra > 0) {
      fprintf(stdout,      "%s ahorra %.2f euros\n",nombre,ahorra);
      fprintf(fich_destino,"%s ahorra %.2f euros\n",nombre,ahorra);
    }
  }

  /* cerrar los ficheros */
  fclose(fich_origen);
  fclose(fich_destino);

  getch();
  return 0;
}


