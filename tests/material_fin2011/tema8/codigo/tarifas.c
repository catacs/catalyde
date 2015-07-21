/* 

ENUNCIADO:

Escribe un programa que lea un fichero llamado "llamadas.txt" que contiene un numero desconocido de lineas. Cada linea contiene un numero de telefono, una duracion en segundos y una palabra describiendo el tipo de tarifa. Hay 2 tipos de tarifa:

 - caro es a 2 centimos de euro el segundo
 - barato es a 1 centimo de euro el segundo
 - cualquier tarifa distinta de estas sera considerada un error y penalizada a un coste de 100 euros el segundo (toma ya!)

El programa debe procesar el fichero y mostrar por pantalla:

 - numero total de llamadas
 - coste total de las llamadas
 - el coste de la llamada mas cara y el numero de telefono culpable

*/

#include <stdio.h>
#include <string.h>
#include <conio.h>

float coste_llamada(int duracion, char tarifa[]) {
  float pvp_segundo;
  if (strcmp(tarifa,"barato") == 0) {
    pvp_segundo = 0.01;
  } else if (strcmp(tarifa,"caro") == 0) { 
    pvp_segundo = 0.02;
  } else {
    fprintf(stdout,"OJITO! la tarifa %s no la conozco, te la cobro a 100 euros segundo\n",tarifa);
    pvp_segundo = 100.0;
  }
  fprintf(stdout,"tarifa %s a %.2f euros/segundos %d\n",tarifa,pvp_segundo,duracion);
  return pvp_segundo * duracion;
}

int main() {
  int numero,duracion,llamadas=0;
  int numero_caro;
  float coste_maximo=0,coste_llama;
  float coste=0;
  char tarifa[100];
  FILE* fich;
  fich = fopen("llamadas.txt","r");
  while (fscanf(fich,"%d%d%s",&numero,&duracion,tarifa)==3)  {
    fprintf(stdout,"Has llamado al numero %d con tarifa %s durante %d segundos\n",
	    numero,tarifa,duracion);
    llamadas = llamadas+1;
    coste_llama = coste_llamada(duracion,tarifa);
    coste = coste + coste_llama;
    if (coste_llama > coste_maximo) {
      coste_maximo = coste_llama;
      numero_caro  = numero;
    }
  }
  fprintf(stdout,"Has realizado %d llamadas y en total te has gastado %.2f euros\n",
	  llamadas,coste);
  fprintf(stdout,"La lamada mas cara te ha costado %.2f euros, ha sido al numero %d\n",
	  coste_maximo, numero_caro);
  fclose(fich);
  getch();
  return 0;
}
