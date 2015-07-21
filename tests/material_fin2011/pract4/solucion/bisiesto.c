#include <stdio.h>
#include <conio.h>

/* ENUNCIADO: Haz una función que reciba un año como parámetro y que
   devuelva un 1 si el año es bisiesto y un 0 si el año no es
   bisiesto. Para ello tienes que utilizar operaciones aritméticas y
   lógicas. Un año es bisiesto si es divisible entre 4 pero no es
   divisible entre 100 salvo si es divisible entre 400. */

#define CIERTO 1
#define FALSO  0

/* devuelve un valor en plan cierto/falso indicando si el anyo que
   recibe como argumento es bisiesto */
int es_bisiesto(int anyo) {
  if (anyo % 4 != 0) return FALSO;
  /* llegados a este punto, el anyo es divisible entre 4 */
  if (anyo % 400 == 0) return CIERTO;
  /* llegados a este punto, anyo es divisible entre 4 y no lo es entre 400 */
  return (anyo % 100 != 0); /* solo queda que NO sea divisible entre 100 */
}

/* version alternativa, hay muchas mas forma de escribirlo... */
int es_bisiesto2(int anyo) {
  return ((anyo % 4 == 0) && (anyo % 100 != 0)) || (anyo % 400 == 0);
}

int main() {
  int anyo;
  fprintf(stdout,"Introduce un anyo: ");
  fscanf(stdin,"%d", &anyo);
  if (es_bisiesto(anyo)) {
    fprintf(stdout,"El anyo %d es bisiesto\n",anyo);
  } else {
    fprintf(stdout,"El anyo %d no es bisiesto\n",anyo);
  }
  getch();
  return 0;
}

