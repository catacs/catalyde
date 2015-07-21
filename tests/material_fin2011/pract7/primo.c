#include <stdio.h>

int es_primo(int numero) {
  int resultado = 1; /* asumo que es primo */
  int i = 2;
  while (i<numero) {
    if (numero % i == 0) {
      fprintf(stdout,"%d es divisible entre %d\n",numero,i);
      resultado = 0;
    }
    i = i+1;
  }
  return resultado;
}

int pedir_numero() {
  int a;
  fprintf(stdout,"Dime un numero: ");
  fscanf(stdin,"%d",&a);
  return a;
}

int main() {
  int num;
  num = pedir_numero();
  if (es_primo(num)) {
    fprintf(stdout,"El numero %d es primo\n",num);
  } else {
    fprintf(stdout,"El numero %d es compuesto\n",num);
  }
  return 0;
}
