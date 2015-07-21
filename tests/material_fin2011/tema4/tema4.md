
# T4. Funciones. Funciones de entrada y salida básica

---

# Recordemos el Temario

- *Tema 1 Introducción a la Informática (semipresencial)*
- *Tema 2 Tipos de datos, variables y constantes*
- *Tema 3 Operadores y Expresiones*
- **Tema 4 Funciones. Funciones de entrada y salida básica**
- *Tema 5 Estructuras de control para selección (`if` y `switch`)*
- *Tema 6 Estructuras de control para iteración (`while`, `do while` y `for`)*
- *Tema 7 Entrada y salida con ficheros*
- *Tema 8 Vectores y cadenas*
- *Tema 9 Matrices*

---

# Contenidos del tema 4

1. ¿Qué es una función?
2. Cabecera de una función
3. Llamada a una función.
4. Definición de funciones.
5. Funcionamiento del paso de parámetros.
6. Devolución de resultados.
7. Funciones de E/S básica

---

# ¿Qué es una función?

## Función:

Secuencia de instrucciones agrupadas bajo un mismo nombre que realizan una tarea determinada.

## Ventajas: 

- La función se ejecutará tantas veces como se la llame mediante su nombre.
- Facilita la reutilización de código, aumentando la productividad del programador.
- Descomposición de un problema en subproblemas más sencillos:
    - Se disminuye la complejidad del problema.
- El uso de funciones mejora la estructura del programa:
    - Programa más legible y entendible.

---

# La cabecera de una función

Es imprescindible saber interpretar la cabecera de una función para saber cómo utilizar la función correctamente.

Por ejemplo, en el manual de muchas *bibliotecas estándar* puedes encontrar descripciones como en [este ejemplo](http://www.opengroup.org/sud/sud1/xsh/pow.htm):

	pow - compute a value raised to the power of another value

	SYNOPSIS

	#include <math.h>
	double pow(double x, double y);

## Sintaxis

La cabecera tiene este formato:

    tipo_retorno nombre_funcion(tipo_argumento1 nombre_argumento1,
                                tipo_argumento2 nombre_argumento2,
								...
								tipo_argumentoN nombre_argumentoN);

---

# La cabecera de una función

## Sintácticamente

    !c
	double pow(double x, double y);
	
- cada llamada a esta función **devuelve** un valor de tipo `double`.
- `pow` es el nombre de la función,  debe de ser un **identificador válido**
- entre paréntesis tenemos los argumentos o parámetros. Al llamar a la función hemos de pasarle dos valores de tipo `double`. Los nombres de los parámetros (`x` e `y`) no son importantes en la cabecera, sirven solamente para poder referirnos a estos valores dentro del cuerpo de la función.

Es decir, sintácticamente la cabecera le dice al compilador **cómo utilizar la función** lo que recibe y lo que devuelve. Con eso sabe si una función se está utilizando correctamente.

## Semánticamente

La cabecera **NO** nos indica lo que hace la función.

---

# La cabecera de una función

## ¿Y si una función no recibe nada?

En ese caso no se pone nada entre los paréntesis, pero sigue siendo necesario usar los paréntesis para distinguir sintácticamente las funciones de las variables.

### Ejemplo:

	!c
	int mi_funcion(); /* no recibe nada, devuelve un entero */

## ¿Y si una función no devuelve nada?

En ese caso se utiliza el tipo de datos `void` que no se puede usar para declarar variables.

### Ejemplo:

	!c
	void funcion(int a, int b); /* recibe 2 enteros,
	                               no devuelve nada */

---

# Llamada a una función

Una función se llama poniendo su nombre seguido de paréntesis que
contienen los argumentos necesarios en el orden adecuado.

Una llamada a una función se puede utilizar en cualquier expresión
exactamente de la misma manera que un valor del tipo que devuelve
dicha función:

### Ejemplo:

	!c
	float a;
	a = 2.5+25.0; /* expresion con valores en coma flotante */
	a = 2.5+pow(5.0, 2.0); /* pow devuelve un double, la puedes
	         utilizar donde puedas usar ese tipo de valores */

Si una función devuelve `void`, no se pone en ninguna expresión, simplemente se llama como una instrucción más. Normalmente el interés de estas funciones es porque realizan lo que se llama un **efecto lateral** como imprimir en pantalla, etc.

También puedes llamar a una función que devuelve algo e ignorar el resultado:

	!c
	pow(2.0,3.0); /* bastante inutil, PERO VALIDO, calcular
 	                  una potencia y no usarla para nada */


---

# Definición de funciones

La definición de una función consta de:

- **Cabecera** es lo que hemos visto en las transparencias anteriores.
- **Cuerpo** es lel bloque de instrucciones que se ejecutan cuando se llame a la función.

## Sintaxis:

	!c
	tipo nombre(parametros) {
	   /* declaracion de variables locales */
       /* instrucciones */
       return exprexion; /* return; si la funcion devuelve void */
    }

### Ejemplo:

	!c
	float area_circulo(float radio) {
	    return PI * radio * radio;
	}

---

# Definición de funciones

## Devolución de resultados

- Una función puede devolver un valor como resultado. El valor devuelto será del tipo indicado en la cabecera de la función.
    - Si el tipo especificado es `void`, la función no devolverá nada
    - Si el tipo especificado no es `void`, la función deberá obligatoriamente devolver un valor de retorno del tipo especificado.
- La instrucción para devolver el valor de retorno es:

	    !c
	    return valor;
	
- Si no se devuelve ningún valor **no es necesario que aparezca `return`**, aunque puede usarse para evitar que se sigan ejecutando instrucciones de la función:

	    !c
	    return;

---

# Paso de parámetros

- Los parámetros o argumentos son como las variables locales de la función pero contienen los valores que se le pasan a la función cuando ésta se llama o invoca.
- El nombre de los parámetros no es importante cuando llamamos a la función, solamente sirve para relacionar el nombre de los argumentos con el uso que se le da en el cuerpo de la función.

### El nombre de los parametros no es importante para quien la llama:

	!c
	float area_circulo(float radio) {
	    return PI * radio * radio;
	}
	float area_circulo(float r) { /* igual a la de arriba */
		return PI * r * r;
	}

---

# Paso de parámetros

Existen 2 tipos de paso de parámetros:

- **Por valor:** en la llamada a la función cada argumento es una expresión que se evalúa y el resultado de dicha expresión se **copia** a la variable argumento declarada en la cabecera de la función. Cualquier cambio realizado a la variable dentro de la función **se efectúa sobre la COPIA**, así que **NO AFECTA** a la variable que has utilizado en la llamada de la función.
- **Por referencia:** en la llamada a la función, el argumento que se pasa por referencia es una variable que se pasa a la función. Cualquier cambio efectuado en dicha variable **PERMANECE** tras el retorno de la función.

Volveremos a estos conceptos en el tema 8 cuando hablemos de **vectores** (que se pasan por referencia). Exceptuando vectores (las cadenas y matrices son casos particulares), en C los valores se pasan por valor.

---

# Paso de parámetros por valor

Para entender lo que hace este programa hay que saber que la variable `a` de `funcion` no es la misma que la variable `a` de `main` (es como dos personas que se llaman Pepe, uno que vive en Madrid y otro en Singapur, aunque se llaman igual no son el mismo).

    !c
    #include <stdio.h>
    #include <conio.h>
    int funcion(int a) {
        fprintf(stdout,"a vale: %d\n",a);
        a = a+1000;
        fprintf(stdout,"a vale: %d\n",a);
        return a;
    }
    int main() {
        int a = 10;
        fprintf(stdout,"estoy en main, a vale: %d\n",a);
        fprintf(stdout,"la funcion devuelve: %d\n",funcion(a));
		fprintf(stdout,"estoy en main, a vale: %d\n",a);    
		getch();
		return 0;
	}
	
---

# Ejemplos

	!c
	#include <stdio.h>
	#include <conio.h>

	int suma(int a, int b) {
	  return a+b;
    }

	int main() {
	  int x,y;
	  fprintf(stdout,"Escribe dos numeros: ");
	  fscanf(stdin,"%d%d",&x,&y);
	  fprintf(stdout,"La suma de los numeros es: %d\n", suma(x,y));
	  getch();
	  return 0;
    }

---

# Ejemplos

	!c
	#include <stdio.h>
	#include <conio.h>

	float pedir_numero() {
	  float n;
	  fprintf(stdout,"Introduce un numero: ");
	  fscanf(stdin,"%f",&n);
	  return n;
    }
	
	float area_circulo(float radio) {
	    return PI * radio * radio;
	}
	
	int main() {
	  float r;
	  r = pedir_numero();
	  fprintf(stdout,"El area de un circulo de radio %f es %f\n",
	          r, area_circulo(r));
	  getch();
	  return 0;
    }

---	

# Funciones de entrada y salida básicas

---


# Función de salida de datos `fprintf`

	!c
	fprintf(salida, cadena_control, resto_argumentos);
	
- `salida`  es por dónde se muestran los datos, de momento utilizaremos `stdout` que representa la pantalla del ordenador.
- `cadena_control` es una cadena con dos clases de elementos:
    - Caracteres normales que se imprimirán por pantalla directamente.
    - Caracteres especiales de formato que definen el modo en que se visualizarán los argumentos. Siempre empiezan con el carácter `%`. Exceptuando la combinación `%%`, hay un argumento extra por cada caracter de formato.
- `resto_argumentos`
    - Es una lista de cero o más elementos separados por comas.
	- Para cada argumento deberá haber una secuencia especificando el formato deseado en la `cadena_control`.

### Ejemplo:	
	!c
	fprintf(stdout,"%d %d %s\n", entero1, entero2, cadena);

---

# Función de salida de datos `fprintf`

## Cadena de control `%X`

`X` : Letra que indica el tipo de dato que se quiere mostrar

- `c` Carácter
- `s` Cadena de caracteres
- `d` Número entero
- `i` Número entero
- `f` Número real en notación de punto fijo
- `e` Número real en notación científica
- `g` Real en punto fijo o científica, según convenga

### ¡Ojo! Para imprimir `%` escribiremos `%%` en la cadena de formato.

	!c
	fprintf(stdout,"El precio con un 20%% de descuento es %f\n",
	        precio*0.8);
	
---

# Función de salida de datos `fprintf`

## Cadena de control completa `%-+0n.mX`

Lo mínimo a poner sería `%X`. Lo demás es opcional, útil para mostrar los resultados tabulados o para indicar la precisión de los valores numéricos:

-	`-` : Alinear a la izquierda
-	`+` : Incluir siempre el signo (+ ó -)
-	`0` : Alinear rellenando con ceros en lugar de espacios
-	`n` : Valor entero que indica el mínimo número de caracteres (totales) a mostrar
-	`.m` : `m` es un valor entero que indica el número de dígitos decimales a mostrar

### Algunas opciones sólo funcionan con algunos tipos de datos

- `+` y `0` son para valores numéricos.
- `.m` es para valores en coma flotante.

---

# Función de entrada de datos `fscanf`

	!c
	fscanf(entrada, cadena_control, resto_argumentos);

- Similar a `fprintf`, pero en sentido inverso.
- Lee datos por `entrada`. Pondremos `stdin` para referirnos al teclado.
- En la `cadena_control` solamente deben aparecer caracteres de control.

### El formato de la cadena de control es: `%X`

- `%c` para leer un caracter, **a veces** usaremos `\\n%c`
    - El **problema** de la lectura de caracteres es el buffer que suele guardar el salto de línea de la lectura anterior, `\n` antes de `%c` *se come el `\\n`*
- `%s` para leer una cadena de caracteres
    - **es la única que NO lleva '`&`' **
    - **No lo usaremos para leer cadenas que contengan espacios.**
- `%d` para leer un entero
- `%f` para leer un valor de tipo `float`

**No** se indican datos de precisión, alineación, etc.

---

# Función de entrada de datos `fscanf`

- En `resto_argumentos` diremos en qué variables deseamos que se guarden los valores
- Las variables han de ir precedidas por el símbolo `&` **excepto las cadenas de caracteres**
- El símbolo `&` está relacionado con conceptos (*punteros*) que **no vamos a ver en esta asignatura** (salvo en el `fscanf`). Intuitivamente, es la forma de decirle a la función `fscanf` que le damos acceso a la variable para que escriba en ella en lugar de pasarle los valores contenidos en dicha variable.
- Al leer,  utiliza como delimitadores los espacios en blanco y saltos de línea **excepto al leer caracteres individuales con `%c`**.

## Ejemplo:

	!c
	int a,b;
	char letra, cadena[80];
	fprintf(stdout,"Introduzca 2 enteros, una letra y una cadena:");
	fscanf (stdin, "%d%d%c%s",&a,&b,&letra,cadena);

---

# Función de entrada de datos `fgets`

	!c
	fgets(variable_cadena, tamanyo_maximo_leido, entrada);
	
- Lee caracteres  de `entrada` y los almacena en `variable_cadena`.
- Lee hasta encontrar un salto de línea `'\n'` (tecla intro cuando lee de teclado o `stdin`).
- Se utiliza para leer cadenas con espacios, pero al leer incluye el `'\n'` en la cadena leída (se puede quitar luego, lo sabremos hacer en el tema 8).

### Ejemplo:

	!c
    #include <stdio.h>
    #include <conio.h>
    #define TAM 90
    int main() {
      char frase[TAM]; /* variable cadena de caracteres */
      fprintf(stdout,"Escribe una linea: ");
	  fgets(frase,TAM,stdin); /* fscanf(stdin,"%s",frase); */
	  fprintf(stdout,"has escrito: %s", frase);
	  getch();
	  return 0;
    }


