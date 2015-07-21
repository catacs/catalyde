#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void ocultar(char secreta[100], char oculta[100]) {
  int i;
  int longitud = strlen(secreta);
  for (i=0;i<longitud;++i)
    oculta[i] = '*';
  oculta[longitud] = '\0';
}

void borrar_pantalla() {
  int i;
  for (i=0;i<30;++i) printf("\n");
}

char pedir_letra() {
  char letra[10];
  printf("Escribe una letra:");
  scanf("%s",letra);
  return letra[0];
}

int desocultar(char secreta[100], char oculta[100], char letra) {
  int ha_quitado = 0;
  int i;
  int longitud = strlen(oculta);
  for (i=0;i<longitud;++i)
    if (oculta[i] == '*' && secreta[i] == letra) {
      oculta[i] = letra;
      ha_quitado = ha_quitado + 1;
    }
  return ha_quitado;
}

int main() {
  char secreta[100];
  char oculta[100];
  char letra;
  int intentos=5;
  int asteriscos;
  int quitadas;
  printf("hola somos Mariana Nicolas y Salva\n");
  printf("Introduce la palabra para adivinar: ");
  scanf("%s",secreta);
  borrar_pantalla();
  ocultar(secreta,oculta);
  asteriscos = strlen(secreta);
  while (intentos > 0) {
    printf("\nJuego del Ahorcado, te quedan %d intentos\n",intentos);
    printf("La palabra oculta es %s\n",oculta);
    letra = pedir_letra();
    quitadas = desocultar(secreta,oculta,letra);
    asteriscos = asteriscos - quitadas;
    if (quitadas == 0)
      intentos = intentos-1;
    if (asteriscos == 0) {
      printf("ENHORABUENA, GANASTE!!!!! la palabra correcta era %s\n",secreta);
      exit(0);
    }
  }
  printf("ERES UN PERDEDOR!!!!!!!! la palabra secreta era %s\n",secreta);
  return 0;
}
