/* Escribe un programa que pida un valor entero N y que muestre por
   pantalla un mensaje sobre el número de elefantes que se balanceaban
   sobre la cuerda de una araña desde 1 hasta N. Por ejemplo:

   Cuantos elefantes hay al final? 4
   1 elefantes se balanceaban sobre la cuerda de una araña
   2 elefantes se balanceaban sobre la cuerda de una araña
   3 elefantes se balanceaban sobre la cuerda de una araña
   4 elefantes se balanceaban sobre la cuerda de una araña
*/

#include <stdio.h>
#include <conio.h>

int main() {
  int i, n; /* variable para el for, otra para saber cuantos
	       elefantes */
  fprintf(stdout,"Cuantos elefantes hay al final? ");
  fscanf(stdin,"%d",&n);
  i=1;
  while (i<=n) {
    fprintf(stdout,"%d elefantes se balanceaban sobre la "
	    "cuerda de una aranya\n",i);
    i=i+1;
  }
  getch();
  return 0;
}

