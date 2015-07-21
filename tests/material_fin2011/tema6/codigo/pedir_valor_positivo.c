#include <stdio.h>
#include <conio.h>

int pedir_valor_positivo() {
  int valor;
  do {
    fprintf(stdout,"Introduce un valor entero positivo: ");
    fscanf(stdin,"%d",&valor);
    if (valor <= 0)
      fprintf(stdout,"No te has enterado, he dicho positivo, vuelve a intentarlo\n");
  } while (valor <= 0); /* la condicion del do while es la de volver a repetir!!! */
  return valor;
}

/* devuelve el maximo de los dos valores que recibe */
int maximo(int x, int y) {
  if (x>y) {
    return x;
  } else {
    return y;
  }
}

/* otra forma de implementar maximo es asi:

int maximo(int x, int y) {
  int max;
  if (x>y) {
    max = x;
  } else {
    max = y;
  }
  return max;
}

*/

int main() {
  int a,b;
  fprintf(stdout,"Introduce 2 valores positivos y te mostrare el mayor de los dos\n");
  a = pedir_valor_positivo();
  b = pedir_valor_positivo();
  fprintf(stdout,"El mayor entre %d y %d es %d\n",a,b,maximo(a,b));
  getch();
  return 0;
}

