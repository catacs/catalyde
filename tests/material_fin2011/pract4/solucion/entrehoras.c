#include <stdio.h>
#include <conio.h>

/* Enunciado: Utiliza el ejercicio anterior para hacer un programa que
   lea 2 instantes (hora, minuto, segundo) y que diga el número de
   segundos que hay entre ambos. */


int segundos_desde0(int hora, int minutos, int segundos) {
  return (hora*60+minutos)*60+segundos;
}

int main() {
  /* definimos variables locales a main */
  int h1, m1, s1;
  int h2, m2, s2;
  int segundos_entre_ambos;

  /* pedimos la primera hora */
  fprintf(stdout,"Instante inicial\nHora: ");
  fscanf(stdin,"%d",&h1);
  fprintf(stdout,"Minutos: ");
  fscanf(stdin,"%d",&m1);
  fprintf(stdout,"Segundos: ");
  fscanf(stdin,"%d",&s1);

  /* pedimos la segunda hora */
  fprintf(stdout,"Instante final\nHora: ");
  fscanf(stdin,"%d",&h1);
  fprintf(stdout,"Minutos: ");
  fscanf(stdin,"%d",&m1);
  fprintf(stdout,"Segundos: ");
  fscanf(stdin,"%d",&s1);

  /* calculamos los segundos entre ambos */
  segundos_entre_ambos = segundos_desde0(h2,m2,s2) - segundos_desde0(h1,m1,s1);

  /* mostramos el resultado */
  fprintf(stdout,"Desde las %02d:%02d:%02d hasta las %02d:%02d:%02d han "
	  "transcurrido %d segundos\n",
	  h1, m1, s1, h2, m2, s2, segundos_entre_ambos);
  getch();
  return 0;
}

