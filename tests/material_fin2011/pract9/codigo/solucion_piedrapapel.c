#include <stdio.h>
#include <conio.h>
#include <stdlib.h>
#include <string.h>

#define PIEDRA 0
#define PAPEL  1
#define TIJERA 2

#define GANA1   0
#define GANA2   1
#define EMPATAN 2

#define MAX 100
#define INCORRECTA -1

int pedir_opcion() {
  char cadena[MAX];
  int opcion;
  do {
    fprintf(stdout,"Escribe piedra, papel o tijera: ");
    fscanf(stdin,"%s",cadena);
    if (strcmp(cadena,"piedra")==0) {
      opcion = PIEDRA;
    } else if (strcmp(cadena,"papel")==0) {
      opcion = PAPEL;
    } else if (strcmp(cadena,"tijera")==0) {
      opcion = TIJERA;
    } else {
      opcion = INCORRECTA;
    }
    if (opcion == INCORRECTA) {
      fprintf(stdout,"No eres colaborativo,"
	      " vuelve a intentarlo!\n");
    }
  } while (opcion == INCORRECTA);                                 
  return opcion;
}

int quien_gana(int usu1, int usu2) {
  /* caso facil: si eligen lo mismo empatan */
  if (usu1 == usu2)
    return EMPATAN; 

  /* los 3 casos en que gana el primero, fijate en como se combina la
     Y logica && con la O logica || */
  if ((usu1 == PIEDRA && usu2 == TIJERA) ||
      (usu1 == PAPEL  && usu2 == PIEDRA) ||
      (usu1 == TIJERA && usu2 == PAPEL))
    return GANA1;
  
  /* por descarte, gana el segundo */
  return GANA2;
}

int main() {
  int op1, op2;
  op1 = pedir_opcion(); system("cls");
  op2 = pedir_opcion(); system("cls");
  switch (quien_gana(op1,op2)) {
  case GANA1:
    fprintf(stdout,"Gana el primer usuario\n");  break;
  case GANA2:
    fprintf(stdout,"Gana el segundo usuario\n"); break;
  case EMPATAN:
    fprintf(stdout,"EMPATE AL CANTO!\n");
  }
  getch();
  return 0;
}

