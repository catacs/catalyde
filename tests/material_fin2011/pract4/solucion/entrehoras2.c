#include <stdio.h>
#include <conio.h>

/* Enunciado: Utiliza el ejercicio anterior para hacer un programa que
   lea 2 instantes (hora, minuto, segundo) y que diga el número de
   segundos que hay entre ambos. */

int segundos_desde0(int hora, int minutos, int segundos) {
  return (hora*60+minutos)*60+segundos;
}

int pedir_entero(char mensaje[]) {
  int aux;
  fprintf(stdout,mensaje);
  fscanf(stdin,"%d",&aux);
  return aux;
}

int main() {
  /* definimos variables locales a main */
  int h1, m1, s1, h2, m2, s2, segundos_entre_ambos;

  /* pedimos la primera hora */
  h1 = pedir_entero("Instante inicial\nHora: ");
  m1 = pedir_entero("Minutos: ");
  s1 = pedir_entero("Segundos: ");

  /* pedimos la segunda hora */
  h2 = pedir_entero("Instante final\nHora: ");
  m2 = pedir_entero("Minutos: ");
  s2 = pedir_entero("Segundos: ");

  /* calculamos los segundos entre ambos */
  segundos_entre_ambos = segundos_desde0(h2,m2,s2) - segundos_desde0(h1,m1,s1);

  /* mostramos el resultado */
  fprintf(stdout,"Desde las %02d:%02d:%02d hasta las %02d:%02d:%02d han "
	  "transcurrido %d segundos\n",
	  h1, m1, s1, h2, m2, s2, segundos_entre_ambos);
  getch();
  return 0;
}

