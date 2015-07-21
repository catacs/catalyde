#include <stdio.h>
#include <conio.h>

/* ENUNCIADO: Escribe un programa que pida la edad de una persona y
   diga si es mayor de edad o no. Utiliza una función llamada
   pedir_edad que pregunta al usuario por su edad y devuelve dicho
   valor (de tipo entero). */

int pedir_edad() {
  int edad;
  fprintf(stdout,"Introduce tu edad: ");
  fscanf(stdin,"%d",&edad);
  return edad;
}

int main() {
  int edad;
  edad = pedir_edad();
  if (edad >= 18) {
    fprintf(stdout,"Ya eres mayor de edad\n");    
  } else {
    fprintf(stdout,"Todavía eres menor de edad\n");    
  }
  getch();
  return 0;
}

