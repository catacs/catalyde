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

int pedir_opcion() {
  /* completar */ 
}

int quien_gana(int usu1, int usu2) {
  /* completar */ 
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
