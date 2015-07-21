/* --------------- EJERCICIO DEL HOTEL --------------- */  

/* --------------- INCLUSION DE BIBLIOTECAS --------------- */  
#include <stdio.h>
#include <conio.h>
#include <stdlib.h>

/* --------------- DECLARACION DE CONSTANTES --------------- */  
#define FALSO  0
#define CIERTO 1

#define HABS 10
#define DIAS 30

#define LIBRE   0
#define OCUPADA 1

#define VER_TODAS 1
#define VER_UNA   2
#define RESERVAR  3
#define CANCELAR  4
#define CONSULTAR 5
#define SALIR     6

/* --------------- FUNCIONES AUXILIARES --------------- */  

/* se limita a mostrar el menu, a pedir la opcion y a devolverla */
int menu() {
  int opcion;
  fprintf(stdout,
	  "TRULLOS CON ENCANTO\n"
	  "------------------\n"
	  " 1. Ver estado de todas las habitaciones\n"
	  " 2. Ver el estado de una habitacion\n"
	  " 3. Reservar habitacion\n"
	  " 4. Cancelar reserva\n"
	  " 5. Consultar los dias de mayor ocupacion\n"
	  " 6. Salir\nOpcion: ");
  fscanf(stdin,"%d",&opcion);
  return opcion;
}

/* pone a LIBRE todas las habitaciones todos los dias */
void inicializa(int hotel[HABS][DIAS]) {
  int habitacion,dia;
  for (habitacion=0; habitacion<HABS; habitacion=habitacion+1)
    for (dia=0; dia<DIAS; dia=dia+1)
      hotel[habitacion][dia] = LIBRE;
}

/* recibe la matriz, un numero de habitacion (de 0 a HABS-1), dos dias
   (de 0 a DIAS-1) y un estado (LIBRE o bien OCUPADA). Esta funcion
   devuelve cierto (1) si la habitacion tiene el estado que nos
   solicitan desde el dia inicial hasta el dia final (no incluido) y
   falso (0) en caso contrario.
*/
int comprueba(int hotel[HABS][DIAS], int habitacion,
	      int llegada, int partida, int estado) {
  int dia;
  for (dia=llegada; dia<partida; dia=dia+1)
    if (hotel[habitacion][dia] != estado)
      return FALSO;
  return CIERTO;
}

/* recibe la matriz, un numero de habitacion, dos dias y un estado
   (como la funcion comprueba) pero ahora nos limitamos a poner la
   habitacion al estado que nos pasan en el rango de dias recibido
   (desde el dia de entrada hasta el de salida no incluido). */
void asigna(int hotel[HABS][DIAS], int habitacion,
	    int llegada, int partida, int estado) {
  int dia;
  for (dia=llegada; dia<partida; dia=dia+1)
    hotel[habitacion][dia] = estado;
}

int pedir_con_rango(char descripcion[], int inferior, int superior) {
  int valor;
  do {
    fprintf(stdout,"Introduzca %s (entre %d y %d): ",
	    descripcion,inferior,superior);
    fscanf(stdin,"%d",&valor);
    if (valor < inferior || valor > superior) {
      fprintf(stdout,"Cazurro! el valor introducido"
	      " esta fuera de rango.\n");
    }
  } while (valor < inferior || valor > superior);
  return valor;
}

/* muestra, para cada habitacion, los dias en que esta disponible */
void mostrar_estado_hotel(int hotel[HABS][DIAS]) {
  int habitacion,dia;
  for (habitacion=0; habitacion<HABS; habitacion=habitacion+1) {
    if (comprueba(hotel,habitacion,0,DIAS,LIBRE)) {
      /* sumamos 1 porque para el usuario las cosas empiezan en 1, pero
	 en C los vectores se indexan desde 0 */
      fprintf(stdout,"Habitacion %2d libre todo el mes",habitacion+1);
    } else if (comprueba(hotel,habitacion,0,DIAS,OCUPADA)) {
      fprintf(stdout,"Habitacion %2d ocupada todo el mes",habitacion+1);
    } else {
      fprintf(stdout,"Habitacion %2d libre los dias:",habitacion+1);
      for (dia=0; dia<DIAS; dia=dia+1)
	if (hotel[habitacion][dia] == LIBRE)
	  /* sumamos 1 porque para el usuario las cosas empiezan en 1, pero
	     en C los vectores se indexan desde 0 */
	  fprintf(stdout," %d",dia+1);
    }
    fprintf(stdout,"\n");
  }
}

/* pedimos un numero de habitacion, dia de llegada y de salida,
   indicamos si la habitacion esta disponible en ese periodo de
   tiempo */
void ver_estado_habitacion(int hotel[HABS][DIAS]) {
  int habitacion,llegada,partida;
  /* restamos 1 porque en C se indexa desde 0 */
  habitacion = pedir_con_rango("la habitacion",1,HABS)-1;
  llegada    = pedir_con_rango("el dia de llegada",1,DIAS)-1;
  partida    = pedir_con_rango("el dia de partida",llegada+2,DIAS+1)-1;
  if (comprueba(hotel, habitacion, llegada, partida, LIBRE))
    fprintf(stdout,"La habitación está disponible esos dias\n");
  else
    fprintf(stdout,"La habitación está no está disponible en ese periodo\n");
}

void reservar_habitacion(int hotel[HABS][DIAS]) {
  int habitacion,llegada,partida;
  /* restamos 1 porque en C se indexa desde 0 */
  habitacion = pedir_con_rango("la habitacion",1,HABS)-1;
  llegada    = pedir_con_rango("el dia de llegada",1,DIAS)-1;
  partida    = pedir_con_rango("el dia de partida",llegada+2,DIAS+1)-1;
  if (comprueba(hotel, habitacion, llegada, partida, LIBRE))
    asigna(hotel,habitacion,llegada,partida,OCUPADA);
  else
    fprintf(stdout,"No es posible realizar la reserva\n");
}

/* observa como se parece a RESERVAR */
void cancelar_reserva(int hotel[HABS][DIAS]) {
  int habitacion,llegada,partida;
  habitacion = pedir_con_rango("la habitacion",1,HABS)-1;
  llegada    = pedir_con_rango("el dia de llegada",1,DIAS)-1;
  partida    = pedir_con_rango("el dia de partida",llegada+2,DIAS+1)-1;
  /* restamos 1 porque en C se indexa desde 0 */
  if (comprueba(hotel, habitacion, llegada, partida, OCUPADA))
    asigna(hotel,habitacion,llegada,partida,LIBRE);
  else
    fprintf(stdout,"Que narices quieres cancelar?\n");
}

void mayor_ocupacion(int hotel[HABS][DIAS]) {
  /* en este vector calculamos la ocupacion de cada dia */
  int ocupacion[DIAS];
  int habitacion,dia,maximo;
  for (dia=0; dia<DIAS; dia=dia+1) {   /* para cada dia */
    ocupacion[dia] = 0; /* un sumatorio siempre debe inicializarse a 0 */
    for (habitacion=0; habitacion<HABS; habitacion=habitacion+1) {
      /* podemos sumar el valor guardado en la matriz pq LIBRE es 0 y OCUPADA es 1 */
      ocupacion[dia] = ocupacion[dia] + hotel[habitacion][dia];
    }
  }
  /* llegados a este punto, tenemos la ocupacion de cada dia del mes */

  /* ahora calculamos la mayor ocupacion, tambien se podria haber
     calculado en el bucle anterior, pero igual asi queda mas
     claro: */
  maximo = ocupacion[0]; /* inicializamos con la del 1er dia */
  for (dia=1; dia<DIAS; dia=dia+1) /* para cada dia desde el 2o */
    if (ocupacion[dia] > maximo)
      maximo = ocupacion[dia];

  /* ahora mostramos por pantalla los dias de mayor ocupacion (puede
     haber mas de un dia asi) */
  fprintf(stdout,"Dias de mayor ocupacion (%d habitaciones ocupadas): ",maximo);
  for (dia=0; dia<DIAS; dia=dia+1)
    if (ocupacion[dia] == maximo)
      /* sumamos 1 porque para el usuario las cosas empiezan en 1, pero
	 en C los vectores se indexan desde 0 */
      fprintf(stdout," %d",dia+1);
  fprintf(stdout,"\n");

  /* si no hay apenas ocupacion, increpamos al personal */
  if (maximo <= 3)
    fprintf(stdout,"la crisis nos esta afectando, vamos a chapar!!!\n");

}

/* --------------- programa principal --------------- */  
int main() {
  int hotel[HABS][DIAS],opcion;
  inicializa(hotel);
  do { /* bucle principal */
    system("cls");
    opcion = menu();
    switch (opcion) {
    case VER_TODAS: mostrar_estado_hotel(hotel);  break;
    case VER_UNA  : ver_estado_habitacion(hotel); break;
    case RESERVAR : reservar_habitacion(hotel);   break;
    case CANCELAR : cancelar_reserva(hotel);      break;
    case CONSULTAR: mayor_ocupacion(hotel);       break;
    case SALIR    : fprintf(stdout,"Taluego!\n"); break;
    default       : fprintf(stdout,"Opcion incorrecta! Te aclaras?\n");
    }
    fprintf(stdout,"Pulse una tecla para continuar\n"); getch();
  } while (opcion != SALIR);
  return 0;
}

