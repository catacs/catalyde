/* ejercicio visto en clase:

   - escribe una funcion que indica si un numero entero empieza y
   termina con la misma cifra

   - escribe un programa para probar dicha funcion

*/

#include <stdio.h>
#include <conio.h>

/* funcion auxiliar, si por ejemplo le pasas el número 12345 te
   devuelve el numero 5 */
int ultima_cifra(int numero) {
  return numero%10;
}

/* funcion auxiliar, si por ejemplo le pasas el número 12345 te
   devuelve el numero 1 */
int primera_cifra(int numero) {
  while (numero > 9) { /* mientras tenga >1 cifra */
    numero = numero/10; /* le quitamos la cifra inferior */
  }
  return numero; /* devolvemos la ultima cifra */
}

/* la funcion que nos han pedido resulta bastante sencilla basandonos
   en las funciones auxiliares de arriba */
int iguales(int numero) {
  return primera_cifra(numero) == ultima_cifra(numero);
}

int main() {
  int num;
  fprintf(stdout,"Introduce un numero: ");
  fscanf(stdin,"%d",&num);
  if (iguales(num)) {
    fprintf(stdout,"La primera y la ultima cifra del "
	    "numero introducido coinciden\n");
  } else {
    fprintf(stdout,"La primera y la ultima cifra del "
	    "numero introducido NO coinciden\n");
  }
  getch();
  return 0;
}

