#include <stdio.h>

#define TAM 200 

void mostrar_cadena(char cadena[TAM]) {
  int i;
  fprintf(stdout,"Has escrito: ");
  for (i=0;i<TAM;i=i+1) {
    fprintf(stdout,"%c",cadena[i]);
  }
}

int main() {
  char cadena[TAM];
  fprintf(stdout,"Escribe lo que te de la gana: ");
  fgets(cadena, TAM, stdin); /* leemos hasta fin de linea */
  mostrar_cadena(cadena);
  fprintf(stdout,"Escribe lo que te de la gana: ");
  fgets(cadena, TAM, stdin); /* leemos hasta fin de linea */
  mostrar_cadena(cadena);
  //  getch();
  return 0;
}

