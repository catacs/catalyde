#include <stdio.h>
#include <string.h>

#define C 10 /* numero de productos */

void leer_precios(float precios[C]) {
  FILE* fich;
  int i;
  fich = fopen("precios.txt","r");
  for (i=0; i<C; i=i+1) {
    fscanf(fich,"%f",&precios[i]);
  }
  fclose(fich);
}

void poner_a_cero(float gano[12][2]) {
  int mes,tarifa;
  for (mes=0; mes<12; mes=mes+1) {
    for (tarifa=0; tarifa<2; tarifa=tarifa+1) {
      gano[mes][tarifa] = 0;
    }
  }
}

void procesar_albaran(float precios[C],float gano[12][2]) {
  FILE* fich;
  int codigo,unidades,mes,columna;
  char tipo[20];
  fich = fopen("albaran.txt","r");
  while (fscanf(fich,"%d%d%d%s",&codigo,&unidades,&mes,tipo) == 4) {
    if (strcmp(tipo,"enA")==0) {
      columna = 0;
    } else {
      columna = 1;
    }
    gano[mes-1][columna] = gano[mes-1][columna] + precios[codigo]*unidades;
  }
  fclose(fich);  
}

void mostrar_resultado(float gano[12][2]) {
  int mes;
  fprintf(stdout,
	  "MES |enA    |enB    |total\n"
	  "----+-------+-------+-------\n");
  for (mes=0; mes<12; mes=mes+1) {
    fprintf(stdout,"  %2d|%7.2f|%7.2f|%7.2f\n",
	    mes+1, gano[mes][0], gano[mes][1],
	    gano[mes][0]+gano[mes][1]);
  }
}

int main() {
  float precios[C];
  float gano[12][2]; /* los 12 meses y las 2 modalidades */

  leer_precios(precios);
  poner_a_cero(gano);
  procesar_albaran(precios,gano);
  mostrar_resultado(gano);
  return 0;
}
