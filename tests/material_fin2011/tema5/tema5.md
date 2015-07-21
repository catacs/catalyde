
# T5 Estructuras de control para selección (`if` y `switch`)

---

# Recordemos el Temario

- *Tema 1 Introducción a la Informática (semipresencial)*
- *Tema 2 Tipos de datos, variables y constantes*
- *Tema 3 Operadores y Expresiones*
- *Tema 4 Funciones. Funciones de entrada y salida básica*
- **Tema 5 Estructuras de control para selección (`if` y `switch`)**
- *Tema 6 Estructuras de control para iteración (`while`, `do while` y `for`)*
- *Tema 7 Entrada y salida con ficheros*
- *Tema 8 Vectores y cadenas*
- *Tema 9 Matrices*

## Contenidos del tema 5

- **5.1** Secuencia de instrucciones
- **5.2** Sentencia condicional `if`
- **5.3** Sentencia condicional `switch`

---

# Secuencia de instrucciones

Conjunto de instrucciones encerrado entre llaves. 

	!c
	{
		instruccion1;
		instruccion2;
		...
		instruccionN;
	}

Las instrucciones se ejecutan en orden secuencial.

# Importante:

Aunque  C no lo exige, en esta asignatura **vamos a exigir** denotar con una tabulación adecuada el nivel de **indentación** de los bloques de instrucciones (conveniente para visualizar fácilmente la estructura del programa):

- Todas las instrucciones de un mismo bloque se indentan igual.
- Un bloque se indenta en función de su nivel, al entrar en un nuevo nivel se indenta un poco más.

---

# Sentencias condicionales

Instrucciones de control, selección o alternativas: Las instrucciones evalúan una expresión y, en función del resultado de la misma, se ejecuta un bloque de instrucciones u otro.

## if

Para ejecutar unas instrucciones sólo si se da una determinada condición.
Opcionalmente se pueden ejecutar otras instrucciones en caso de que la condición no se cumpla.

## switch

Para ejecutar grupos de instrucciones diferentes en función del resultado de una expresión que sea de tipo entero o caracter (no funciona con valores en coma flotante ni con cadenas).

---

# Sentencia condicional `if`

	!c
	if (condicion)
	  instruccion;
	
En su versión más simple, la sentencia `if` evalúa la condición y luego ejecuta la instrucción sólo cuando condición sea verdadera. En caso de tener varias instrucciones, es necesario utilizar un bloque de instrucciones:

	!c
	if (condicion) {
	  instruccion1;
	  ...
	  instruccionN;
	}

### Nota:

Los paréntesis en la condición son obligatorios:

	!c
	if a>5    /* INCORRECTO */
	  fprintf(stdout,"a es mayor que 5\n");

	if (a>5)    /* CORRECTO */
	  fprintf(stdout,"a es mayor que 5\n");

---

# Sentencia condicional `if`

Observa que, A PESAR DE LA TABULACIÓN, la siguiente secuencia:

	!c
	if (a>5)
	  fprintf(stdout,"a es mayor que 5\n");
	  a = a + 10;
	
es equivalente a:

	!c
	if (a>5)
	  fprintf(stdout,"a es mayor que 5\n");
	a = a + 10;

Sin llaves, dentro del `if` solamente va una instrucción.

### Nota:

No hay problema en crear bloques de instrucciones con una sola instrucción. Puedes poner siempre llaves y así te aseguras de que el programa está bien:

	!c
	if (condicion) {
	  instruccion;
	}

---

# Sentencia condicional `if`

### Nota:

Otro fallo muy típico es poner un punto y coma `;` al final de la condición, si escribes algo así:

	!c
	if (a>5); /* MAL MAL MAL MAL */
	  fprintf(stdout,"a es mayor que 5\n");
	
es equivalente a:

	!c
	if (a>5) {}
	fprintf(stdout,"a es mayor que 5\n");

Es decir, el `fprintf` esta **fuera** del `if` y, por tanto, el `if` no sirve **absolutamente para nada** :(

---

# Sentencia condicional `if` con `else`

La sentencia condicional `if` puede incluir (con el `else`) una `instruccion2` que se ejecutará cuando condición sea falsa.

	!c
	if (condicion)
	  instruccion1;
	else
	  instruccion2;

De nuevo, para agrupar varias instrucciones puedes utilizar bloques:

	!c
	if (condicion) {
	  instruccion; /* lo que se ejecuta */
	  instruccion; /* si condicion es cierto */
	} else {
	  instruccion; /* lo que se ejecuta */
	  instruccion; /* si condicion es falso */
	}
	
### Fíjate en la indentación de los dos bloques de instrucciones.	

---

# Anidamiento de condiciones

Es perfectamente normal y no hay ningún problema ne poner una instrucción `if` dentro del bloque de otra instrucción `if`. En general puedes poner un `if` donde puedas poner cualquier otra instrucción:

	!c
	if (condicion1) {
	  instruccion;
	  if (condicion2) {
	    instruccion;
	    instruccion;
	  } else {
	    instruccion;
	  }
	  instruccion;
	} else {
	  instruccion;
	  instruccion;
	}
	
En estos casos las llaves son importantes para evitar ambigüedades.	

---

# Anidamiento de condiciones

## Ejercicio de ejemplo: encontrar las raices de una ecuación de primer grado

	!c
	void mostrar_raices(float b, float c) {
	  /* muestra por pantalla las raices de b*x+c == 0 */
	  if (b == 0) { /* estamos en el caso c == 0 */
        if (c == 0) {
		  fprintf(stdout,"0 == 0 tiene infinitas soluciones\n");
		} else {
		  fprintf(stdout,"%f == 0 no tiene solucion\n",c);
		}       /* dividir entre b sin comprobar si vale 0 */
	  } else {  /* es peligroso, puede dar un error */
	    fprintf(stdout,"x = %f es la unica solucion\n",-c/b);
	  }
	}
	
### Ejercicio: completar para que sirva para las ecuaciones de segundo grado.	

---

# Encadenamiento de condiciones

Cuando tienes más de dos condiciones excluyentes, puedes hacer una secuencia de `else if` y, en ese caso, no hace falta ir incrementando la indentación:

	!c
	if      (condicion1) instruccion1;
	else if (condicion2) instruccion2;
	else if (condicion3) instruccion3;
	else                 instruccion4;

Pueden encadenarse tantos if como hagan falta, ejemplo:

	!c
	if      (nota< 5) fprintf(stdout,"SUSPENSO\n");
	else if (nota< 7) fprintf(stdout,"APROBADO\n");
	else if (nota< 9) fprintf(stdout,"NOTABLE\n");
	else if (nota<10) fprintf(stdout,"SOBRESALIENTE\n");
	else              fprintf(stdout,"MATRICULA\n");

---

# switch

	!c
	switch (expresion) {
		case constante1:
		  instrucciones1;
		  break;
		case constante2:
		  instrucciones2;
		  break;
		default:
		  instrucciones3;
	}
	
- `expresion` debe ser un valor entero o de tipo caracter (que, en el fondo es un pequeño entero)	
- En función del valor de `expresion`, el flujo de instrucciones se irá directamente al `case` correspondiente.
- Al llegar a un  `break`, el flujo salta justo fuera del bloque del `switch`.
- Las constantes que acompañan los `case`también deben ser de tipo entero (o carácter).
- Si el valor de `expresión` no coincide con la constante de ningún `case`, se entrará en la opción `default` (si aparece, ya que no es obligatoria).

---

# switch

	!c
	switch (mes) {
		case  1: fprintf(stdout,"enero\n"); break;
		case  2: fprintf(stdout,"febrero\n"); break;
		case  3: fprintf(stdout,"marzo\n"); break;
		case  4: fprintf(stdout,"abril\n"); break;
		case  5: fprintf(stdout,"mayo\n"); break;
		case  6: fprintf(stdout,"junio\n"); break;
		case  7: fprintf(stdout,"julio\n"); break;
		case  8: fprintf(stdout,"agosto\n"); break;
		case  9: fprintf(stdout,"septiembre\n"); break;
		case 10: fprintf(stdout,"octubre\n"); break;
		case 11: fprintf(stdout,"noviembre\n"); break;
		case 12: fprintf(stdout,"diciembre\n"); break;
		default: fprintf(stdout,"mes incorrecto\n");
	}

### Ejercicio

¿Cómo se podría hacer utilizando `if` y `else`?

---

# switch

## Ejercicio:

Mostrar la salida del siguiente código en función de si la variable a vale 1, 2, 3 ó 4. Nótese la importancia del break comentado.

	!c
	switch (a) {
	  case 1:
	   printf("a vale uno\n");
	   /* break; */
	  case 2:
	  case 3:
	   printf("a vale dos o tres\n");
	   break;
	  default:
	   printf("Ninguna de las anteriores\n");
	}

## Ejercicio:

Desarrollar código en C que muestre por pantalla el mensaje HOMBRE o MUJER en función del valor de la variable `c` (`'h'`, `'H'`, `'m'` o `'M'`).

