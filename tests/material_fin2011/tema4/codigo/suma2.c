#include <stdio.h>

int suma(int a, int b) {
  return a+b;
}

int main() {
  int x,y,z;
  fprintf(stdout,"Escribe dos numeros: ");
  fscanf(stdin,"%d%d",&x,&y);
  z = suma(x,y);
  fprintf(stdout,"La suma de los numeros es: %d\n",z);
  return 0;
}

