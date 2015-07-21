#include <stdio.h>
/*#include <conio.h>*/

float pedir_valor_float() {
  float aux;
  fprintf(stdout,"Dame un numero: ");
  fscanf(stdin,"%f",&aux);
  return aux;
}

float evaluar(float coeficiente1, float coeficiente2,
	      float coeficiente3, float coeficiente4) {
  return coeficiente1*coeficiente4*coeficiente4+coeficiente2*coeficiente4+coeficiente3;
}

int main() {
  float a,b,c,x,solucion;
  fprintf(stdout,"Evaluacion del polinomio f(x) = a*x*x+b*x+c\n");
  a = pedir_valor_float();
  b = pedir_valor_float();
  c = pedir_valor_float();
  x = pedir_valor_float();
  solucion = evaluar(a,b,c,x);
  fprintf(stdout,"El resultado es %f\n", solucion);
  /*  getch();*/
  return 0;
}

