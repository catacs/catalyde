#include <stdio.h>
#include <conio.h>

/* Escribe un programa que pida al usuario un mes y un año. A
   continuación, el programa deberá mostrar por pantalla el número de
   días de dicho mes. En caso de tratarse de febrero, el sistema
   deberá comprobar si el año es bisiesto usando la función del
   ejercicio correspondiente de la práctica anterior que repetimos
   aquí por completitud
*/

/* funcion auxiliar para que veas con un ejemplo que desde una funcion
   puedes llamar a otras funciones auxiliares. Esta funcion nos dice
   si x es divisible entre y */
int divisible(int x, int y) {
  return x % y == 0;
}

int es_bisiesto(int anyo) {
  /* Un año es bisiesto si es divisible entre 4 pero no es divisible
     entre 100 salvo si es divisible entre 400 */
  return (divisible(anyo,4) && !divisible(anyo,100)) || divisible(anyo,400);
}

/* recibe un anyo y un mes (valor entre 1 y 12, asumimos que es
   correcto) y devuelve el numero de dias de dicho mes */
int dias_mes(int anyo, int mes) {
  int dias;
  switch (mes) {
  case 2:
    if (es_bisiesto(anyo))
      dias = 29;
    else
      dias = 28;
    break;
  case 4:
  case 6:
  case 9:
  case 11:
    dias = 30;
    break;
  default:
    dias = 31;
  }
  return dias;
}

int main() {
  int anyo,mes;
  fprintf(stdout,"Anyo: ");
  fscanf(stdin,"%d",&anyo);
  fprintf(stdout,"Mes: ");
  fscanf(stdin,"%d",&mes);
  fprintf(stdout,"Ese mes tiene %d dias\n",dias_mes(anyo,mes));
  getch();
  return 0;
}

