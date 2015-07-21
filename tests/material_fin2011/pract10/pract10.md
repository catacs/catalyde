
# Práctica 10. Ejercicios de matrices

---

# Casa Rural

La cadena hotelera *Trullos con encanto* ha inaugurado una nueva casa rural y nos ha pedido automatizar el proceso de reservas. La casucha dispone de 10 habitaciones y el proceso de reservas solamente tiene en cuenta  los datos dentro de un mismo mes (de 30 días).

Escribe un programa que ofrezca el siguiente menú:

	TRULLOS CON ENCANTO
	-------------------
	1. Ver estado de todas las habitaciones
	2. Ver el estado de una habitacion
	3. Reservar habitacion
	4. Cancelar reserva
	5. Consultar los dias de mayor ocupacion
	6. Salir

---

# Casa Rural

A continuación veamos con detalle cada una de estas opciones:

**Opcion 1** Tenemos que mostrar en pantalla una línea por habitación que muestre la lista de días en que dicha habitación está disponible.

    Habitacion 1 libre dias: 2 5 7 10 15 16 17 18 26 27
    Habitacion 2 libre dias: 15 16 17 22 23 24
    ...	

**Opcion 2** Nos piden el número de la habitación (de 1 a 10), el día de llegada y el día de salida. El programa debe indicarnos si la habitación está disponible en dicho periodo (desde el día de entrada hasta el día de salida no incluído).

**Opcion 3** Nos piden el número de la habitación (de 1 a 10), el día de llegada y el de salida. El programa marcará ocupada la habitación desde el día de llegada hasta el día anterior a la partida. Si la habitación no estaba disponible en ese periodo, no se realizará la reserva y se increpará al usuario de manera apropiada.

**Opcion 4** Nos piden el número de la habitación (de 1 a 10), el día de llegada y el día de salida. El programa comprobará que la habitación estaba ocupada en ese periodo y, de ser así, la marcará como libre. En caso contrario, increpará al usuario de manera apropiada.

---

# Casa Rural

**Opcion 5** Nos mostrará por pantalla los días en que el número de habitaciones ocupadas sea el valor máximo de todo el mes (observa que pueden haber varios días que empatan en número de habitaciones ocupadas) así como el número máximo de habitaciones ocupadas. Opcionalmente, si dicho valor es menor que 3, la aplicación puede indicar el mensaje adicional `la crisis nos esta afectando, vamos a chapar`.

**Opcion 6** se limita a salir del bucle del menu.

Para realizar este programa, se aconseja definir las siguientes constantes:

    !c
	#define HABS 10
	#define DIAS 30
    #define LIBRE   0
	#define OCUPADA 1

y utilizar una matriz de enteros con `HABS` filas y `DIAS` columnas que contendrá valores `LIBRE` u `OCUPADA` indicando el estado de una habitación en un día concreto. 

---

# Casa Rural

También se aconseja utilizar las siguientes funciones:

- `menu` es una función que no recibe parámetros y que muestra el menu por pantalla, pide una opción y devuelve el valor de la opción introducida por el usuario.
- `inicializa` recibe la matriz y marca todas las posiciones como `LIBRE`.
- `comprueba` recibe la matriz, un número de habitación (de `0` a `HABS-1`), dos días (de `0` a `DIAS-1`) y un estado (`LIBRE` o bien `OCUPADA`). Esta función devuelve cierto (`1`) si la habitación tiene el estado que nos solicitan desde el día inicial hasta el día final (no incluído) y falso (`0`) en caso contrario.
- `asigna` recibe la matriz, un número de habitación, dos días y un estado (como la función `comprueba`) pero ahora nos limitamos a poner la habitación al estado que nos pasan en el rango de días recibido (desde el día de entrada hasta el de salida no incluído).

Esta lista de funciones es indicativa y te ayudará a realizar un programa más organizado, pero eres completamente libre de definir más funciones si lo consideras necesario.

---

# Casa Rural

El programa principal puede tener la siguiente estructura:

	!c
	/* inclusion de bibliotecas
	   definicion de constantes
	   funciones auxiliares */
	   
	int main() {
	 /* declaracion de variables locales, en particular
	    la matriz para guadar los datos del hotel */
	 /* inicializar la matriz */
	 do { /* bucle principal */
	  opcion = menu();
	  switch (opcion) {
	    /* tratar cada uno de los casos */
	  }
	 } while (opcion != SALIR); /* SALIR es constante, vale 6 */
	 return 0;
	}
	
---

# Casa Rural (opcional)

De manera opcional, puedes extender el programa anterior para que incluya 2 opciones adicionales:

	7. Leer datos de fichero
	8. Escribir datos en fichero

De manera que se pregunte al usuario por el nombre de un fichero y que escriba en él (o lea, según el caso) los valores de la matriz. De esta manera, será posible cerrar la aplicación y volverla a abrir posteriormente sin perder el estado de las reservas.

## Generando un cuaderno de bitácora

Otra posible ampliación del programa consiste en abrir un fichero al inicio del programa para que vaya guardando en él un informe o *log* de todo lo que va sucediendo. Es decir, las opciones que va introduciendo el usuario y lo que va ocurriendo en plan:

    Se realiza una reserva de la habitación 5 entre los dias 12 y 20
	Se cancela una reserva de la habitación 8 entre los dias 5 y 10
	...

---

# Ejercicios extra (y también para casa)

---

# Propiedades de una matriz

## Comprobar simétrica

Realiza un programa que pida al usuario los datos de una matriz cuadrada de talla N por N, siendo N una constante del programa (prueba con valores pequeños como 3 o 4). A continuación, el programa mostrará de nuevo la matriz por pantalla y nos dirá si dicha matriz es simétrica o no. Recuerda que una matriz `m`es simétrica cuando se queda igual si haces la traspuesta (alternativamente, si `m[i][j]` es igual a `m[j][i]` para todos los valores).

## Comprobar diagonal

Basándote en el programa anterior (se aconseja una función para leer una matriz de teclado, otra función para mostrarla por pantalla y una para determinar si la matriz es simétrica), haz una función que determine si una matriz es diagonal. Una matriz es diagonal cuando todos los elementos que no forman parte de la diagonal son iguales a cero.

---

# Propiedades de una matriz

## Comprobar triangular superior

Ahora que ya sabes por dónde van los tiros, haz una función que determine si una matriz es diagonal superior (es decir, que todos los elementos de la diagonal inferior son iguales a cero).



