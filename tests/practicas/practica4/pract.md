## Ejercicio sencillo para completar

Completa el siguiente programa que calcula el área de un rectángulo. Para ello debes:

- Escribir una función llamada `area_rectangulo` para que se pueda utilizar en el programa principal (observa cómo se realiza la llamada a la función).
- Completar el programa principal para que pida la altura.

```
#include <stdio.h>
```
    
<!-- BEGINBLOCK { "b_tag": "funcion_area_rectangulo" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_area" }]}   -->
/* aqui va el codigo de la función area_rectangulo */
<!-- ENDBLOCK -->

```
int main() {
  float base, altura, area;
  fprintf(stdout,"Introduce la base: ");
  fscanf(stdin,"%f",&base);
```
      
<!-- BEGINBLOCK { "b_tag": "pedir_altura" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_area" }]}   -->
/* aqui va el codigo que pide la altura */
<!-- ENDBLOCK -->
      
```
  area = area_rectangulo(base,altura);
  fprintf(stdout,"El area es: %f\n",area);
  return 0;
}
```

## Perímetro

Basándonos en el ejercicio anterior, vamos a realizar un programa que pida la base y la altura de un rectángulo y que calcule su perímetro. En este caso solamente has de completar una función llamada `perimetro_rectangulo` que recibe la base y la altura:

<!-- BEGINBLOCK { "b_tag": "funcion_perimetro_rectangulo" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_perimetro" }]}   -->
/* escribir aquí la función perimetro_rectangulo */
<!-- ENDBLOCK -->

## Función para leer un número

Prueba el siguiente programa:

<!-- BEGINBLOCK { "b_tag": "programa_prueba_leer_numero",  "type" : "code", "editable" : "false" , "buttons": [{"name" : "Ejecutar", "action" : "run_leer_numero" }]} -->
#include <stdio.h>
float pedir_float() {
  float numero;
  fprintf(stdout,"Introduce un numero: ");
  fscanf(stdin,"%f",&numero);
  return numero;
}

int main() {
  float a,b;
  a = pedir_float();
  b = pedir_float();
  fprintf(stdout,"has dicho %f y luego %f\n",a,b);
  getch();
  return 0;
}
<!-- ENDBLOCK -->

Como has podido observar, la función permite que tengas que escribir la funcionalidad una sola vez y luego utilizarlo tantas veces como necesites.

## Area de un cilindro

Completa el siguiente programa:

```
#include <stdio.h>
#define PI 3.141592

/* entre parentesis un argumento: pasamos una cadena */
float pedir_float(char mensaje[]) {
  float numero;
  fprintf(stdout,"Introduce %s: ",mensaje);
  fscanf(stdin,"%f",&numero);
  return numero;
}

float volumen_cilindro(float r, float a) {
```

<!-- BEGINBLOCK { "b_tag": "cuerpo_funcion_volumen_cilindro",  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_volumen"}]} -->
/* COMPLETAR */
<!-- ENDBLOCK -->

```
}
int main() {
  float r,a,v;
  r = pedir_float("el radio del cilindro");
  a = pedir_float("la altura del cilindro");
  v = volumen_cilindro(r,a); /* anyadir arriba */
  fprintf(stdout,"El volumen de un cilindro de radio %f "
          "y altura %f es %f\n",r,a,v);
  getch();
  return 0;
}
```

## Pedir la hora y calcular los segundos

**Ejercicio** Vamos a crear una función para volver a resolver el ejercicio de las horas de la práctica anterior. Haz una función que recibe estos datos:

- Hora
- Minutos
- Segundos

y que devuelve el número de segundos que hay entre las 00:00:00 y esa hora. La cabecera de dicha función podría ser así:

```
int segundos_dia(int hora, int minutos, int segundos) {
  int resultado;
```

<!-- BEGINBLOCK { "b_tag": "cuerpo_funcion_segundos_dia",  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_segundos_dia"}]} -->
/* COMPLETAR */
<!-- ENDBLOCK -->

```
  return resultado;
}
```

Para realizar el programa principal te aconsejamos basarte en la función:

```
float pedir_float(char mensaje[]) {
  float numero;
  fprintf(stdout,"Introduce %s: ",mensaje);
  fscanf(stdin,"%f",&numero);
  return numero;
}
```

y crear una similar llamada `pedir_int` que debes escribir a continuación:

<!-- BEGINBLOCK { "b_tag": "funcion_pedir_int",  "type" : "code", "editable" : "true" ,"checkbutton": "true", "buttons": [{"name" : "Ejecutar", "action" : "run_segundos_dia"}]} -->
/* COMPLETAR */
<!-- ENDBLOCK -->

Con lo que el programa principal quedaría así:

```
int main() {
  int total, h, m, s;
  h = pedir_int("la hora");
  m = pedir_int("los minutos");
  s = pedir_int("los segundos");
  total = segundos_dia(h,m,s);
  fprintf(stdout,"%d segundos desde 00:00:00\n",total);
  return 0;
}
```

## Segundos en un intervalo

Utiliza el ejercicio anterior para hacer un programa que lea 2
instantes (hora, minuto, segundo) y que diga el número de segundos que
hay entre ambos. Solamente has de escribir el programa principal y
utilizar las funciones `pedir_int` y `segundos_dia` del ejercicio
anterior:

<!-- BEGINBLOCK { "b_tag": "programa_intervalo" ,  "type" : "code", "checkbutton": "true", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run_intervalo" }]} -->
int main() {
  /* COMPLETAR */
  return 0;
}
<!-- ENDBLOCK -->

