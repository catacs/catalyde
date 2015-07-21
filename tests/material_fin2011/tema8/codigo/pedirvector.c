#include <stdio.h>
//#include <conio.h>
void pedir_vector(char nombre[], int v[], int n) {
  int i;
  for (i=0; i<n; i=i+1) {
    fprintf(stdout,"Introduce %s[%d]: ",nombre,i);
    fscanf(stdin,"%d",&v[i]);
  }
}
void mostrar_vector(char nombre[], int v[], int n) {
  int i;
  for (i=0; i<n; i=i+1) {
    fprintf(stdout,"%s[%d] = %d\n",nombre,i,v[i]);
  }
}

#define TAM1 4
#define TAM2 7
int main() {
  int a[TAM1];
  int b[TAM2];
  pedir_vector("a",a,TAM1);
  pedir_vector("b",b,TAM2);
  mostrar_vector("a",a,TAM1);
  mostrar_vector("b",b,TAM2);
  //  getch();
  return 0;
}

