#include <stdio.h>
#include <conio.h>

int es_primo(int numero) {
  /* intento ver si numero es divisible entre 2,3,.... hasta numero-1,
     seria mas eficiente hasta la raiz cuadrada de numero pero
     bueno... */
  int i; /* variable local auxiliar para ir probando */
  for (i=2; i<numero; i=i+1) {
    /* COMPLETAR: si numero es divisible entre i puedo devolver
       directamente el valor falso (cero) */
  }
  return /* COMPLETAR */
}

int pedir_numero() {
  int a;
  fprintf(stdout,"Dime un numero: ");
  fscanf(stdin,"%d",&a);
  return a;
}

int main() {
  int num;
  num = pedir_numero();
  if (es_primo(num)) {
    fprintf(stdout,"El numero %d es primo\n",num);
  } else {
    fprintf(stdout,"El numero %d es compuesto\n",num);
  }
  getch();
  return 0;
}
