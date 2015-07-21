#include <stdio.h>

int es_vocal(char ch) {
  fprintf(stdout,"es_vocal(%c)\n",ch);
  return (ch == 'a' || ch == 'e' || ch == 'i' ||
          ch == 'o' || ch == 'u');
}

int contar_vocales(char cadena[]) {
  int i, vocales=0;
  for (i=0;cadena[i] != '\0';i=i+1) {
    if (es_vocal(cadena[i])) {
      vocales = vocales+1;
    }
  }
  return vocales;
}

#define TAM 200 
int main() {
  char cadena[TAM];
  fprintf(stdout,"Escribe lo que te de la gana: ");
  fgets(cadena, TAM, stdin); /* leemos hasta fin de linea */
  fprintf(stdout,"Lo que has escrito tiene %d vocales,"
         " no te da verguenza?\n", contar_vocales(cadena));
  //  getch();
  return 0;
}

