
/* Escribe un programa que pida N números enteros al usuario (siendo N
   una constante definida con `#define`) y que, a continuación, diga
   cuántos de los números introducidos eran pares y cuántos eran
   impares. Para ello, se aconseja utilizar las siguientes funciones:
*/

int pedir_entero() {
  int a;
  fprintf(stdout,"Introduce un numero entero: ");
  fscanf(stdin,"%d",&a);
  return a;
}

/* recibe un entero y nos dice si es par o no */
int es_par(int n) {
  return n % 2 == 0;
}

/* Contar cosas es realmente sencillo, basta con tener una variable
   (*importante que esté incializada a cero*) que se incrementa (en
   plan `contador=contador+1;`) por cada cosa que quieras
   contabilizar.

   El esquema en pseudo-codigo de nuestro programa seria mas o menos
   asi:

   #define N 10
   contador=0;
   repetir N veces {
     numero = pedir_entero();
     si el numero es par {
       contador = contador+1;
     }
   }
   mostrar el resultado del contador

*/

#define N 10
int main() {
  /* declarar las variables */
  int i,num,cuantos_pares=0;

  for (i=1; i<=N; i=i+1) { /* repetir N veces */
    num = pedir_entero();
    if (es_par(num)) {
      cuantos_pares = cuantos_pares+1;
    } /* cierra el if */
  } /* cierra el bucle for */

  /* mostrar el resultado */
  fprintf(stdout,"Hay %d numeros pares y %d impares\n",
	  cuantos_pares, N-cuantos_pares);

  getch();
  return 0;
}


	  
