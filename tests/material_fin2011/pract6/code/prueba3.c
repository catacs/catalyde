#include <stdio.h>
#define N 80 /* longitud maxima */
int main() {
  char nombre1[N], nombre2[N];
  int  edad1, edad2;
  fprintf(stdout,"Nombre y edad: ");
  fscanf(stdin,"%s%d",nombre1,&edad1);
  fprintf(stdout,"Nombre y edad: ");
  fscanf(stdin,"%s%d",nombre2,&edad2);
  fprintf(stdout,"- %8s tiene %2d años\n",nombre1,edad1);
  fprintf(stdout,"- %8s tiene %2d años\n",nombre2,edad2);
  return 0;
}

