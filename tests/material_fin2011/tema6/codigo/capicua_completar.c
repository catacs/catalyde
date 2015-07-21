#include <stdio.h>
#include <conio.h>

int es_capicua(int numero) {
  /* COMPLETAR, puedes resolver este ejercicio de muchas formas. Por
     ejemplo, puedes darle la vuelta al numero y ver si se queda
     igual. Por ejemplo, si te pasan el numero 123 y le das la vuelta,
     se quedara 321 que es diferente. Si le das la vuelta a 34543 se
     quedara igual y, por tanto, quedara claro que es capicua */
}

int main() {
  int num;
  fprintf(stdout,"Dime un numero: ");
  fscanf(stdin,"%d",&num);
  if (es_capicua(num)) {
    fprintf(stdout,"El numero %d es capicua\n",num);
  } else {
    fprintf(stdout,"El numero %d NO es capicua\n",num);
  }
  getch();
  return 0;
}

