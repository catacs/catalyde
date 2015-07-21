#include <stdio.h>
float pedir_float() {
  float numero;
  fprintf(stdout,"Introduce un numero: ");
  fscanf(stdin,"%f",&numero);
  return numero;
}
int main() {
  float a,b;
  a = pedir_float();
  b = pedir_float();
  fprintf(stdout,"has dicho %f y luego %f\n",a,b);
  getch();
  return 0;
}
