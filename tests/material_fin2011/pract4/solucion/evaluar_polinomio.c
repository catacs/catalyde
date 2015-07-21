#include <stdio.h>
#include <conio.h>

float pedir_valor_float(char mensaje[]) {
  float aux;
  fprintf(stdout,mensaje);
  fscanf(stdin,"%f",&aux);
  return aux;
}

float evaluar(float a, float b, float c, float x) {
  return a*x*x+b*x+c;
}

int main() {
  float a,b,c,x;
  fprintf(stdout,"Evaluacion del polinomio f(x) = a*x*x+b*x+c\n");
  a = pedir_valor_float("Introduce el valor de a: ");
  b = pedir_valor_float("Introduce el valor de b: ");
  c = pedir_valor_float("Introduce el valor de c: ");
  x = pedir_valor_float("Introduce el valor de x: ");
  fprintf(stdout,"El resultado es %f\n", evaluar(a,b,c,x));
  getch();
  return 0;
}

