#include <stdio.h>
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
  return 0;
}

