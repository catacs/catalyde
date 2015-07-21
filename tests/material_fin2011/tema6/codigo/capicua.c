#include <stdio.h>

int dalavuelta(int numero) {
  int resultado = 0;
  while (numero>0) {
    resultado = resultado*10 + numero%10;
    numero    = numero/10;
  }
  return resultado;
}

int es_capicua(int numero) {
  return numero == dalavuelta(numero);
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
  return 0;
}
