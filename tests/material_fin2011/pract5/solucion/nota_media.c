#include <stdio.h>
#include <conio.h>

/* Para aprobar una asignatura se hacen 2 parciales y hace falta:
   
   - Sacar un compensable (nota mayor o igual a 4) en cada parcial.
   - Que la nota media sea mayor o igual a 5.

   Escribe una funcion que recibe las notas de los dos parciales y que
   devuelva la nota final (si esta aritmeticamente aprobado pero tiene
   algun no compensable, se le pone un 4).

*/

float calcula_nota_media(float parcial1, float parcial2) {
  /* declaramos una variable auxiliar y calculamos la media aritmetica */
  float media = (parcial1+parcial2)/2;
  /* si sale aprobado PERO le falta el compensable en algun parcial,
     le tenemos que poner un 4. Fijate en la combinacion de
     operaciones logicas mediante la y logica && y la o logica ||,
     esto tambien se puede resolver anidando if's, pero asi queda mas
     corto */
  if (media >= 5 && (parcial1 < 4 || parcial2 < 4)) {
    media = 4.0;
  }
  /* en cualquier caso devolvemos el valor calculado en la variable
     media */
  return media;
}

/* Escribe un programa que pida la nota de cada parcial y que utilice la
   función anterior para calcular la nota final. */

int main() {
  float parcial1, parcial2, nota_final;

  fprintf(stdout,"Introduce la nota del primer  parcial: ");
  fscanf(stdin,"%f",&parcial1);
  fprintf(stdout,"Introduce la nota del segundo parcial: ");
  fscanf(stdin,"%f",&parcial2);

  /* llamada a la funcion definida previamente */
  nota_final = calcula_nota_media(parcial1, parcial2);

  /* como ves, solamente hay un fprintf con el mensaje suspendido o
     aprobado en todo el programa. En particular, la funcion que
     calcula NI PIDE DATOS al usuario NI IMPRIME COSAS por pantalla */

  if (nota_final >= 5) {
    fprintf(stdout,"El alumno ha aprobado con un %.2f\n",nota_final);
  } else {
    fprintf(stdout,"El alumno ha suspendido con un %.2f\n",nota_final);
  }
  /* dejar tiempo para que el usuario lea el mensaje antes de cerrar */
  getch();
  /* esto hace falta a nivel sintactico */
  return 0;
}

