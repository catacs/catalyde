#include <stdio.h>
#include <conio.h>

float area_rectangulo(float base, float altura) {
  return base*altura;
}

float perimetro_rectangulo(float base, float altura) {
  return 2*(base+altura);
}

float pedir_valor_float(char mensaje[]) {
  float aux;
  fprintf(stdout,mensaje);
  fscanf(stdin,"%f",&aux);
  return aux;
}

int main() {
  float base, altura;
  base   = pedir_valor_float("Introduce la base: ");
  altura = pedir_valor_float("Introduce la altura: ");
  fprintf(stdout,"El area de un rectangulo de base %f y altura %f es %f\n"
	  "El perimetro del mismo rectangulo es %f\n",
	  base, altura,
	  area_rectangulo(base, altura),
	  perimetro_rectangulo(base,altura));
  getch();
  return 0;
}

