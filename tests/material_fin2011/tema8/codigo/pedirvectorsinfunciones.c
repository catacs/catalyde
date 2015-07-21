#include <stdio.h>
//#include <conio.h>


#define TAM 10
int main() {
  int i;
  int v[TAM]; /* unico sitio de este programa
               donde se declara un vector */
  for (i=0; i<TAM; i=i+1) {
    fprintf(stdout,"Introduce v[%d]: ",i);
    fscanf(stdin,"%d",&v[i]);
  }
  for (i=0; i<TAM; i=i+1) {
    fprintf(stdout,"v[%d] = %d\n",i,v[i]);
  }
  //  getch();
  return 0;
}

