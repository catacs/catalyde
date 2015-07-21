#include <stdio.h>
#include <conio.h>

/* Escribe un programa que pida el día, mes y año de nacimiento de una
   persona y que diga si podrá votar o no (respecto a que sea mayor de
   edad) el próximo 20 de noviembre. */

#define ANYO_VOTAR 2011
#define MES_VOTAR    11
#define DIA_VOTAR    20

/* recibe la fecha de nacimiento y nos dice si la persona es mayor de
   edad en la fecha de votar */
int puede_votar(int anyo_nacimiento,
		int mes_nacimiento,
		int dia_nacimiento) {
  /* COMPLETAR, SOLAMENTE HAY QUE DEVOLVER UN VALOR DE TIPO CIERTO O
     FALSO, NO HAY QUE IMPRIMIR NADA EN ESTA PARTE */
  if (anyo_nacimiento < ANYO_VOTAR-18)
    return 1; /* puede votar */
  if (anyo_nacimiento > ANYO_VOTAR-18)
    return 0; /* no puede */
  /* si estas aqui, seguro que ha nacido en ANYO_VOTAR-18 */
  if (mes_nacimiento < MES_VOTAR)
    return 1; /* puede votar */
  if (mes_nacimiento > MES_VOTAR)
    return 0; /* no puede votar */
  /* si estas aqui, seguro que ha nacido en ANYO_VOTAR-18 y en MES_VOTAR */
  /* return (dia_nacimiento <= DIA_VOTAR); */
  if (dia_nacimiento <= DIA_VOTAR)
    return 1;
  else
    return 0;
}

int main() {
  int anyo,mes,dia;
  fprintf(stdout,"Introduce el anyo, mes (1 a 12) y dia de nacimiento,\n"
	  "separados por espacios: ");
  fscanf(stdin,"%d%d%d",&anyo,&mes,&dia);
  if (puede_votar(anyo,mes,dia)) {
    fprintf(stdout,"Puedes votar\n");
  } else {
    fprintf(stdout,"Todavia no puedes votar\n");
  }
  getch();
  return 0;
}

