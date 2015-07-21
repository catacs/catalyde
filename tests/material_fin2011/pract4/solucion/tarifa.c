#include <stdio.h>
#include <conio.h>

/* ENUNCIADO
   
   Una compañía telefónica cobra 40 céntimos por establecimiento de
   llamada y 0.5 céntimos por segundo a partir del primer
   minuto. Escribe una función que recibe el número de segundos de
   duración de la llamada y que devuelva el precio (en euros) de dicha
   llamada
*/

/* fijate en que la funcion recibe un entero (porque asume un numero
   entero de segundos) pero devuelve un float porque el precio es en
   euros y necesita una precision de centimos */
#define PVP_ESTABLECIMIENTO 0.40
#define PVP_SEGUNDO         0.005
float tarifa(int segundos) {
  float pvp = PVP_ESTABLECIMIENTO;
  if (segundos > 60) {
    pvp = pvp + (segundos - 60)*PVP_SEGUNDO;
  }
  return pvp;
}

int main() {
  int sec;
  fprintf(stdout,"Bienvenidos a la telefonia del (te has) pasado\n"
	  "Cuandos segundos has estado parloteando? ");
  fscanf(stdin,"%d",&sec);
  fprintf(stdout,"El coste de hablar %d segundos es %.2f euros\n",
	  sec, tarifa(sec));
  getch();
  return 0;
}

