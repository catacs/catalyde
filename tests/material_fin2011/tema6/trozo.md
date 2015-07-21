
# Usos típicos de `while`

Hacer algo con todos los datos de un fichero (o sea, leerlo hasta el final).
Ej.: Hacer algo con todos los números enteros de un fichero:
	F = fopen("números.txt","r");
	while ( fscanf(F,"%d",&x) == 1 ) {
		algo usando x;
	}
	fclose(F);

Ej.: Hacer algo con todas las líneas de un fichero:
	F = fopen("líneas.txt","r");
	while ( fgets(linea,100,F) != NULL ) {
		algo usando linea;
	}
	fclose(F);
