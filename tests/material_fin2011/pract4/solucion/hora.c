#include <stdio.h>
#include <conio.h>

/* funcion auxiliar, como nos pedian */
int segundos_desde0(int hora, int minutos, int segundos) {
  return (hora*60+minutos)*60+segundos;
}

int main() {
  /* definimos variables locales a main */
  int h, m, s;
  /* pedimos los datos al usuario */
  fprintf(stdout,"Hora: ");
  fscanf(stdin,"%d",&h);
  fprintf(stdout,"Minutos: ");
  fscanf(stdin,"%d",&m);
  fprintf(stdout,"Segundos: ");
  fscanf(stdin,"%d",&s);
  /* llamamos a la funcion que hemos definido dentro del fprintf que
     muestra el resultado, otra opcion seria llamar previamente y
     guardarlo en otra variable local */
  fprintf(stdout,"Desde las 00:00:00 hasta las %02d:%02d:%02d han "
	  "transcurrido %d segundos\n",
	  h, m, s, segundos_desde0(h,m,s));
  getch();
  return 0;
}

