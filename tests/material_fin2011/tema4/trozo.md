
# Definición de funciones

Los parámetros y las variables locales de una llamada a una función son independientes de los parámetros y variables locales de las llamadas a la misma o a otras funciones.

### Ejercicio, realiza una traza de este programa:

	!c
	void f(float a, float b) {
	    fprintf(stdout,"%f %f\n",a,b);
	}
	void g(float a, float b) {
	    f(a,b);
		a = a+5.0; b = b+10.0;
		f(b,a);
	}
	int main() {
	    float a=1.5, b=2.5;
		f(a,b);
		f(b,a);
		g(a,b);
		f(a,b);
	}

---

### Ejemplo

Misma cabecera, comportamiento diferente (no puedes definirlas a la vez):

	!c
	int jarl(int a, int b) { return a+b; }
	int jarl(int a, int b) { return a*b; }

#  Conceptos previos de E/S

- Todo programa de ordenador necesita interactuar con el exterior para obtener los datos que ha de procesar y presentar los resultados obtenidos.
- La entrada y la salida de datos tiene lugar gracias a los dispositivos correspondientes.
- Estos dispositivos de E/S son gestionados por el Sistema Operativo.
- Para que un programa pueda acceder a los dispositivos de E/S, el Sistema Operativo proporciona una serie de funciones. 

---

#  Conceptos previos de E/S

- **Funciones de E/S:** transportan datos. 
    - **Funciones de Entrada:** Introducen información en el ordenador.
    - **Funciones de Salida:** Extraen información desde el ordenador. 
- No forman parte de la definición del lenguaje C.
- El lenguaje C va acompañado de una librería (biblioteca) estándar disponible en todos los compiladores, que se encarga de traducir las peticiones de entrada/salida en las correspondientes llamadas a funciones del S.O. Su cabecera se encuentra en stdio.h
- Utilizando esta librería, el programador de C puede realizar operaciones de E/S de manera independiente del S.O., permitiendo así que los programas sean portables.

---

# Función de salida de datos `fprintf`

	!c
	fprintf(salida, cadena_control, resto_argumentos);

- Muestra por `salida`  datos de diferentes tipos según se especifique.
- `cadena_control` es una cadena de caracteres que tiene dos clases de elementos:
    - Caracteres normales que se imprimirán por pantalla directamente.
    - Caracteres especiales de formato que definen el modo en que se visualizarán los argumentos. Siempre empiezan con el carácter `%`.
- `resto_argumentos`
    - Es una lista de cero o más elementos separados por comas.
	- Para cada argumento deberá haber una secuencia especificando el formato deseado en control.

---

# `%-+0n.mX`

## Lo mínimo a poner sería `%X`. Lo demás es opcional

-	`-` : Alinear a la izquierda
-	`+` : Incluir siempre el signo (+ ó -)
-	`0` : Alinear rellenando con ceros en lugar de espacios
-	`n` : Valor entero que indica el mínimo número de caracteres a mostrar
-	`.m` : `m` es un valor entero que indica el número de dígitos decimales a mostrar

##	`X` : Letra(s) que indica(n) el tipo de dato que se quiere mostrar

- `c`: Carácter
- `s`: Cadena de caracteres
- `d`: Número entero
- `i`: Número entero
- `f`: Número real en notación de punto fijo
- `e`: Número real en notación científica
- `g`: Real en punto fijo o científica, según convenga
	
---

# Función de entrada de datos `fscanf`

	!c
	fscanf(entrada, cadena_control, resto_de_argumentos);

- Lee datos por teclado del tipo indicado.
- Similar a `fprintf`, pero en sentido inverso.
- En la `cadena_control` solamente deben aparecer caracteres de control.
- En `resto_de_argumentos` diremos en qué variables deseamos que se guarden los valores:
    - Las variables han de ir precedidas por el símbolo `&` (**excepto las cadenas de caracteres**), que es la forma de indicar en C que van a ser modificadas.
- El formato de la cadena de control es: %X
- No se indican datos de precisión, alineación, etc.
- Toma como delimitador los espacios en blanco y saltos de línea.
- No lo usaremos para leer cadenas que contengan espacios.

## Formato:
 
- `\n%c` para leer un caracter
- `%s` para leer una cadena de caracteres
- `%d` para leer un entero
- `%f` para leer un valor de tipo `float`

---


- Se lee, que se almacena en cadena.
- Se alcanza el fin de fichero.
	Si no se ha leído ningún carácter, fgets devuelve NULL.
Se han leído tamaño-1 caracteres, de forma que tras añadir el carácter fin de cadena nunca se supera tamaño. (En este caso no se guarda el '\n')

Es como gets; pero lee de fichero, indica el tamaño de la variable y sí que guarda el '\n' en cadena.


---

include <stdio.h>

/* Declaración y definición de saluda */
void saluda(char nombre[])
{
  printf("Hola, %s.\n", nombre);
}

int main()
{ /* Invocación del procedimiento saluda */
  saluda("Juan");
  saluda("Luisa");
  return 0;
}

---

---

---

---

---

---

---

---

---
