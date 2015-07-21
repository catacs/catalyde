#include <stdio.h>
//#include <conio.h>

/* el interes de este ejercicio es que veais como crear un bucle (en
   este caso for, pero con while es lo mismo) dentro de otro (lo que
   se llaman 2 bucles "anidados") y como hacen falta DOS VARIABLES
   DIFERENTES (en este caso, "i" y "j") para que esto funcione
   adecuadamente.

   La idea es que para pintar un rombo como en este ejemplo:

   pintar_rombo(5,'A');
	
      A
     AAA
    AAAAA
     AAA
      A

   pintar_rombo(7,'A');
	
   xxxA\n
   xxAAA\n
   xAAAAA\n
   AAAAAAA\n

   xAAAAA\n
   xxAAA\n
   xxxA\n


*/

void pintar_rombo(int lado, char relleno) {
  int i,j,espais;
  for (i=1; i<=lado; i=i+2) {
    espais = (lado-i)/2;
    for (j=0; j<espais; j=j+1) {
      fprintf(stdout," ");
    }
    for (j=0; j<i; j=j+1) {
      fprintf(stdout,"%c",relleno);
    }
    fprintf(stdout,"\n");
  }
  for (i=lado-2; i>0; i=i-2) {
    espais = (lado-i)/2;
    for (j=0; j<espais; j=j+1) {
      fprintf(stdout," ");
    }
    for (j=0; j<i; j=j+1) {
      fprintf(stdout,"%c",relleno);
    }
    fprintf(stdout,"\n");
  }
}

int main() {
  /* declaracion de variables locales a main */
  int n;
  char c;

  /* solicitamos los datos al usuario. Aunque no lo piden, vamos a
     comprobar que el usuario da un valor >0 */
  do {
    fprintf(stdout,"De que lado (impar) quieres el rombo? ");
    fscanf(stdin,"%d",&n);
    if (n<=0 || n%2==0)
      fprintf(stdout,"El lado debe ser un valor impar positivo\n");
  } while (n<=0 || n%2==0);
  /* ahora solicitamos el caracter de relleno */
  fprintf(stdout,"Con que caracter quieres dibujar el rombo? ");
  fscanf(stdin,"\n%c",&c); /* el \n es porque leemos un caracter tras
			      haber leido algo previamente, se hace
			      porque el usuario ha pulsado enter y el
			      %c no esquiva el enter */

  /* llamamos a la funcion, al ser una funcion que no devuelve nada
     (pone void) solamente hay que poner la llamada tal cual: */
  pintar_rombo(n, c);

  /* puedes probar tambien: 
     pintar_rombo_version2(n, c);
  */
  
  //  getch();
  return 0;
}
