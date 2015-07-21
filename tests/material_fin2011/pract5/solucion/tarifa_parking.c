

/* Un parking tiene la siguiente tarifa:

   La primera hora cuesta a 10 céntimos el minuto.
   A partir de la primera hora, cuesta 5 céntimos el minuto.
   El precio mínimo es de 2 euros.
   El precio máximo es de 10 euros.

*/


/*  Escribe una función que recibe el número de minutos (enteros) y
    que devuelve el precio a pagar. */

/* es conveniente usar constantes */
#define PVP_MIN_PRIMERA_HORA 0.10
#define PVP_MIN_EXTRA_HORA   0.05
#define PVP_MINIMO 2.0
#define PVP_MAXIMO 2.0


float tarifa_parking(int minutos) {
  float pvp;
  /* 2 casos, el usuario ha estado como mucho 1 hora */
  if (minutos <= 60) {
    COMPLETAR
  } else {
    COMPLETAR, SOLAMENTE LOS MINUTOS QUE PASEN DE 60 SE CUENTAN A PVP_MIN_EXTRA_HORA
  }
  /* si el precio es inferior a 2 euros, que pague2 euros: */
  if ( COMPLETAR ) {
    pvp = PVP_MINIMO;
  }
  /* si el precio es mayor de 10 euros, que pague como mucho 10 euros: */
  if (pvp > PVP_MAXIMO) {
    COMPLETAR
  }
  return pvp;
}

/* Escribe un programa que pida el número de minutos estacionados y
   que muestre por pantalla la tarifa correspondiente. */
int main() {
  /* declaracion de variables */
  int minutos;
  /* lectura de datos */
  fprintf(stdout,"Cuantos minutos has estacionado? ");
  fscanf(stdin,"%d",&minutos);
  /* aqui la llamada a la funcion esta directamente como una expresion
     dentro del fprintf, otra opcion es guardarlo primero en una
     variable de tipo float */
  fprintf(stdout,"Tienes que pagar %.2f euros\n",
	  tarifa_parking(minutos));
  getch();
  return 0;
}

