#include <stdio.h>
#include <conio.h>

/* Enunciado: 

   Haz una función llamada maximo que recibe 2 números enteros y que
   devuelve el mayor de ambos. Haz un programa para probar dicha función.

   Utiliza la función anterior para hacer otra función llamada maximo4
   que recibe 4 números y devuelve el mayor de todos.

 */

int pedir_entero(char mensaje[]) {
  int aux;
  fprintf(stdout,mensaje);
  fscanf(stdin,"%d",&aux);
  return aux;
}

int maximo2(int a, int b) {
  int max;
  if (a > b)
    max = a;
  else
    max = b;
  return max;
}

/* forma equivalente de definir maximo2, la dejamos comentada
int maximo2(int a, int b) {
  if (a > b)
    return a;
  else
    return b;
}
*/

int maximo4(int a, int b, int c, int d) {
  return maximo2(maximo2(a,b), maximo2(c,d));
}

int main() {
  int a,b,c,d;
  fprintf(stdout,"Maximo de 4 valores\n");
  a = pedir_entero("Primero: ");
  b = pedir_entero("Segundo: ");
  c = pedir_entero("Tercero: ");
  d = pedir_entero("Cuarto : ");
  fprintf(stdout,"El mayor de los 4 valores es %d\n",maximo4(a,b,c,d));
  getch();
  return 0;
}

