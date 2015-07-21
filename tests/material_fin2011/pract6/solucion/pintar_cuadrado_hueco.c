#include <stdio.h>
#include <conio.h>

/* el interes de este ejercicio es que veais como crear un bucle (en
   este caso for, pero con while es lo mismo) dentro de otro (lo que
   se llaman 2 bucles "anidados") y como hacen falta DOS VARIABLES
   DIFERENTES (en este caso, "i" y "j") para que esto funcione
   adecuadamente.

   La idea es que para pintar un cuadrado como en este ejemplo:

   pintar_cuadrado_relleno(3,'A',' ');
	
   AAA
   A A
   AAA

   hace falta imprimir "AAA\nAAA\nAAA\n", pero como no sabemos ni el
   caracter ni la longitud del lado, se tiene que hacer paso a paso
   imprimiendo un solo caracter cada vez.

   pintar_cuadrado_hueco(5,'A','.');
	
   AAAAA
   A...A
   A...A
   A...A
   AAAAA


*/

void pintar_cuadrado_relleno(int lado, char borde, char relleno) {
  int i,j;
  for (i=0; i<lado; i=i+1) {
    for (j=0; j<lado; j=j+1) {
      fprintf(stdout,"%c",relleno);
    }
    fprintf(stdout,"\n");
  }
}

/* otra forma es utilizar una funcion auxiliar como sigue */

void pintar_lado(int lado, char relleno) {
  int i;
  for (i=0; i<lado; i=i+1) {
    fprintf(stdout,"%c",relleno);
  }
  fprintf(stdout,"\n");
}

void pintar_cuadrado_version2(int lado, char relleno) {
  int i;
  for (i=0; i<lado; i=i+1) {
    pintar_lado(lado, relleno);
  }
}

int main() {
  /* declaracion de variables locales a main */
  int n;
  char c;

  /* solicitamos los datos al usuario. Aunque no lo piden, vamos a
     comprobar que el usuario da un valor >0 */
  do {
    fprintf(stdout,"De que lado quieres el cuadrado? ");
    fscanf(stdin,"%d",&n);
    if (n<=0)
      fprintf(stdout,"El lado debe ser un valor positivo\n");
  } while (n<=0);
  /* ahora solicitamos el caracter de relleno */
  fprintf(stdout,"Con que caracter quieres dibujar el cuadrado? ");
  fscanf(stdin,"\n%c",&c); /* el \n es porque leemos un caracter tras
			      haber leido algo previamente, se hace
			      porque el usuario ha pulsado enter y el
			      %c no esquiva el enter */

  /* llamamos a la funcion, al ser una funcion que no devuelve nada
     (pone void) solamente hay que poner la llamada tal cual: */
  pintar_cuadrado(n, c);

  /* puedes probar tambien: 
     pintar_cuadrado_version2(n, c);
  */
  
  getch();
  return 0;
}
