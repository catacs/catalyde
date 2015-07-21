
void leer(int numeros[], float premios[]) {
  int i;
  FILE* fich;
  fich = fopen("premios.txt","r");
  for (i=0; i<N; i=i+1) {
    fscanf(fich,"%d%f",&numeros[i],&premios[i]);
  }
  fclose(fich);
}
