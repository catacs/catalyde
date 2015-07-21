#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

/* creamos la funcion tal que si la llamo asi:

   mostrar_menu(2.78);

   me muestra esto por pantalla:

   ----- Menu -----
   1 - Sumar
   2 - Restar
   3 - Multiplicar
   4 - Dividir
   5 - Salir
   Valor calculadora: 2.78
   Elije opcion:

   pide la opcion y la devuelve, con lo que la llamada tiene que estar
   en el contexto adecuado que utilice dicho valor. El contexto mas
   adecuado seria una asignacion como sigue:

   opcion = mostrar_menu(valor_pantalla);

   ya de paso hemos usado la variable valor_pantalla como argumento

   si con esto no has deducido el formato de la cabecera de la funcion
   debes preocuparte :(

*/

int mostrar_menu(float valor_pantalla) {
  /* declaramos una variable local para usarla en el fscanf */
  int opcion; 

  system("cls"); /* borra la pantalla */
  /* mostramos el menu, es IMPORTANTE que entiendas que no hay que
     poner comas al separar las distintas cadenas, puesto que en
     realidad es una sola cadena de texto separada en varias
     lineas. Recuerda que para el compilador de C es lo mismo escribir
     "hola" que poner "ho" "la" si en medio solamente hay espacios,
     tabuladores o enters */
  fprintf(stdout,
	  "----- Menu -----\n"
	  "1 - Sumar\n"
	  "2 - Restar\n"
	  "3 - Multiplicar\n"
	  "4 - Dividir\n"
	  "5 - Salir\n"
	  "Valor calculadora: %f\n"
	  "Elije opcion: ", valor_pantalla);
  fscanf(stdin,"%d",&opcion);
  return opcion;
}

/* constantes, las usaremos en el switch */
#define SUMAR       1
#define RESTAR      2
#define MULTIPLICAR 3
#define DIVIDIR     4
#define SALIR       5

int main() {
  float valor; /* el valor de la pantalla */
  int opcion; /* opcion elegida */

  valor = 0; /* valor inicial al enchufar la calculadora */
  do {
    opcion = mostrar_menu(valor);
    switch (opcion) {
    case SUMAR:
      fprintf(stdout,"Valor a sumar: ");
      fscanf(stdin,"%f",&operando);
      valor = valor + operando;
      break; /* importante no olvidar el break!!! */
    case RESTAR:
      fprintf(stdout,"Valor a restar: ");
      fscanf(stdin,"%f",&operando);
      valor = valor - operando;
      break; /* importante no olvidar el break!!! */
    case MULTIPLICAR:
      fprintf(stdout,"Valor a multiplicar: ");
      fscanf(stdin,"%f",&operando);
      valor = valor * operando;
      break; /* importante no olvidar el break!!! */
    case DIVIDIR:
      fprintf(stdout,"Valor con el que dividir: ");
      fscanf(stdin,"%f",&operando);
      if (operando == 0) {
	fprintf(stdout,"ERROR! no se puede dividir entre 0\nPulse una tecla\n");
	getch();
      } else {
	valor = valor / operando;
      }
      break; /* importante no olvidar el break!!! */
    case SALIR:
      /* en este caso no hacemos nada, pero ponemos la opcion para que no se vaya al default
      break; /* importante no olvidar el break!!! */
    default:
	fprintf(stdout,"ERROR! opcion incorrecta\nPulse una tecla\n");
	getch();
    } /* cierra el switch */
  } while (opcion != SALIR);
  return 0;
}



