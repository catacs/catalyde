#include <stdio.h>
#include <conio.h>

/* ENUNCIADO: Escribe un programa que pida un número entero y que nos
   diga si el número es par o impar. Para ello tienes que escribir una
   función llamada es_par que recibe un entero y que devuelve un 1
   (que se interpreta como cierto en la condición de un if) si el
   número es par y que devuelva un 0 (se interpreta como falso) si el
   número es impar. */

int pedir_entero() {
  int n;
  fprintf(stdout,"Introduce un numero entero: ");
  fscanf(stdin,"%d",&n);
  return n;
}

/* devuelve un valor en plan cierto/falso indicando si el valor que
   recibe como argumento es par */
int es_par(int x) {
  return (x % 2 == 0);
}

int main() {
  int valor;
  valor = pedir_entero();
  if (es_par(valor)) {
    fprintf(stdout,"El valor %d es par\n",valor);
  } else {
    fprintf(stdout,"El valor %d es impar\n",valor);
  }
  getch();
  return 0;
}

