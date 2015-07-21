/* crear un fichero llamado "tabla.txt" y guardar en el la tabla
de multiplicar que diga el usuario */

#include <stdio.h>

int main() {
  int i,n;
  FILE* fich;
  fprintf(stdout,"Dime de que numero quieres la tabla: ");
  fscanf(stdin,"%d",&n);

  fich = fopen("tabla.txt","a");
  for (i=0; i<=10; i=i+1) {
    fprintf(fich,"%2d x %2d = %3d\n",i,n,i*n);
  }
  fclose(fich);
  return 0;
}
