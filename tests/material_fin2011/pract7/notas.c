/* leer un fichero que tiene lineas asi:

  DNI nota1 nota2

*/


int main() {
  int dni,numnotas=0,aprobados=0;
  float nota1, nota2, final, sumanotas=0, minima=10, maxima=0,notamedia;
  FILE* fichleer; /* variable para representar fichero */
  FILE* fichescribir; /* variable para representar fichero */
  /* abrimos el fichero antes del bucle */
  fichleer     = fopen("notas.txt","r"); /* modo lectura */
  fichescribir = fopen("notas2.txt","w"); /* modo escritura */
  while (fscanf(fichleer,"%d%f%f",&dni,&nota1,&nota2) == 3) {
    /* el == 3 es porque fscanf lee 3 cosas: dni, nota1, nota2 */
    final = (nota1+nota2)/2;
    fprintf(fichescribir,"%d %f %f %f\n",dni,nota1,nota2,final);
    if (final >= 5) {
      aprobados = aprobados+1;
    }
    sumanotas = sumanotas+final;
    numnotas  = numnotas+1;
    if (final > maxima) {
      maxima = final;
    }
    if (final < minima) {
      minima = final;
    }
  }
  /* ya no vamos a leer mas datos, cerramos el fichero */
  fclose(fichleer);
  fclose(fichescribir);

  notamedia = sumanotas/numnotas;
  fprintf(stdout,"Hay %d notas, con %d aprobados\n"
	  "La nota minima es %f, la maxima es %f la media es %f\n",
	  numnotas,aprobados,minima,maxima,notamedia);
  getch();
  return 0;
}

