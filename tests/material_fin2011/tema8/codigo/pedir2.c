#include <stdio.h>
//#include <conio.h>

#define N 4

void pedir_vector(char nombre[], int v[N]) {
  int i;
  for (i=0; i<N; i=i+1) {
    fprintf(stdout,"Introduce %s[%d]: ",nombre,i);
    fscanf(stdin,"%d",&v[i]);
  }
}
void mostrar_vector(char nombre[], int v[N]) {
  int i;
  for (i=0; i<N; i=i+1) {
    fprintf(stdout,"%s[%d] = %d\n",nombre,i,v[i]);
  }
}

void mostrar_entero(int i) {
  fprintf(stdout,"el entero es %d\n",i);
}

int main() {
  int a[N];
  pedir_vector("a",a);
  mostrar_entero(a[0]);
  mostrar_vector("a",a);
  //  getch();
  return 0;
}

