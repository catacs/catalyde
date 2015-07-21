#include <stdio.h>

int es_vocal(char ch) {
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
  int contador=0,vocalestotal=0,vocaleslinea;
  FILE* fich;
  fich = fopen("datos.txt","r");
  if (fich == NULL) {
    fprintf(stdout,"error al abrir el fichero\n");
  } else {
    while (fgets(cadena,TAM,fich)) {
      vocaleslinea = contar_vocales(cadena);
      fprintf(stdout,"Leo una linea con %d vocales: %s",vocaleslinea,cadena);
      vocalestotal = vocalestotal + vocaleslinea;
      contador=contador+1;
    }
    fclose(fich);
    fprintf(stdout,"El fichero tiene %d lineas y %d vocales\n",contador,vocalestotal);
  }
  return 0;
}

