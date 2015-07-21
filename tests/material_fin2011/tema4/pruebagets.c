#include <stdio.h>
#include <conio.h>
#define TAM 90
int main() {
  char frase[TAM];
  fprintf(stdout,"Escribe una linea: ");
  fgets(frase,TAM,stdin);
  fprintf(stdout,"has escrito: %s", frase);
  getch();
  return 0;
}

