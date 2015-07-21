
# T1. Introducción a la Informática

## Objetivos
1. Conocer los conceptos básicos y las funciones de un computador.
2. Conocer los elementos necesarios para el tratamiento automático de la información.
3. Conocer y comprender la codificación binaria.
4. Conocer los lenguajes de Programación.

## Contenidos
1. Conceptos Básicos.
2. Codificación de la Información.
3. Componentes Hardware.
4. Lenguajes de Programación.

---

# Conceptos Básicos

## Informática
- Es la abreviatura de **INFOR**mación y auto**MÁTICA**. En inglés se denomina *Computer Science*.
- Estudia el tratamiento automatizado de la información, incluyendo como aspectos más relevantes:
    * El diseño de ordenadores.
    * La programación de ordenadores.
    * El procesamiento de la información, destacando:
        * La resolución de problemas mediante algoritmos.
        * El estudio de los algoritmos en sí mismos.


---

Definiciones
============

## Informática: 
* Conjunto de conocimientos y técnicas que permiten recoger, almacenar, organizar, tratar y transmitir datos mediante ordenadores.
* Conjunto de ciencias, técnicas y/o actividades que se dedican al estudio, tratamiento, almacenamiento y transmisión de la información por medios automáticos.
## Información:
* Comunicación o adquisición de conocimientos que permiten ampliar o precisar los que se poseen sobre una materia determinada.
## Dato: 
* Representación de una información de manera adecuada para su tratamiento por un ordenador.

---

Tipos de información
====================

## Analógica:

La información de representa mediante una magnitud física de tipo
contínuo (voltaje, tamaño, intensidad, etc.). La cantidad de información
almacenada depende de la precisión, pues debemos de ser capaces de
diferenciar entre dos valores diferentes.

## Digital:

Se representa mediante algo que puede estar en un número finito de
estados. Por ejemplo, para guardar algo en binario hace falta que
podamos distinguir entre 2 estados (encendido o apagado, etc.).

---

Codificación de la información
==============================

La codificación es el proceso de representar símbolos o secuencias de un alfabeto mediante los símbolos o secuencias de otro.
Para que la información pueda ser tratada de manera automática mediante ordenadores, ésta debe estar representada de manera adecuada.
Se emplea el sistema [binario](http://es.wikipedia.org/wiki/Sistema_binario) o en base 2:

## ¿Qué es un bit?
- Un [bit](http://es.wikipedia.org/wiki/Bit) (**BI**nary digi**T**) es la unidad mínima de información.
- Puede representarse de forma numérica mediante los valores 0 y 1.
- Muy adecuado para ordenadores, puesto que la electrónica distingue muy fácilmente entre dos estados: paso/no paso de corriente,...

## Agrupaciones de bits
- Mediante la agrupación de bits es posible codificar más información.
- Con n bits pueden codificarse 2 elevado a n valores diferentes.
- La agrupación de 8 bits se llama [byte](http://es.wikipedia.org/wiki/Byte), permite codificar 256 valores distintos.

---

Codificación de la información
==============================

- A los informáticos les gustan mucho la potencias de dos. La cantidad  de información se suele medir en [multiplos 1024](http://es.wikipedia.org/wiki/Prefijo_binario) porque 1024 es 2 elevado a 10 y 1000 se parece al "kilo" del sistema internacional de medidas:

<center>
<FONT SIZE="+1">
<table class="infobox" style="text-align:center;"> 
<tr> 
<th colspan="5" style="background-color:#ccf;">Unidades básicas de información (en bytes)</th> 
</tr> 
<tr> 
<th colspan="3" style="background-color:#ddf;"><a href="http://es.wikipedia.org/wiki/Prefijos_del_Sistema_Internacional" title="Prefijos del Sistema Internacional">Prefijos del Sistema Internacional</a></th> 
<th colspan="2" style="background-color:#ddf;"><strong class="selflink">Prefijo binario</strong></th> 
</tr> 
<tr> 
<th style="background-color:#edf;">Múltiplo - (Símbolo)</th> 
<th style="background-color:#edf;">Estándar <a href="http://es.wikipedia.org/wiki/Sistema_Internacional_de_Unidades" title="Sistema Internacional de Unidades">SI</a></th> 
<th style="background-color:#edf;"><strong class="selflink">Binario</strong></th> 
<th style="background-color:#edf;">Múltiplo - (Símbolo)</th> 
<th style="background-color:#edf;">Valor</th> 
</tr> 
<tr> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Kilobyte" title="Kilobyte">kilobyte</a> (kB)</td> 
<td>10<sup>3</sup></td> 
<td>2<sup>10</sup></td> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Kibibyte" title="Kibibyte">kibibyte</a> (KiB)</td> 
<td>2<sup>10</sup></td> 
</tr> 
<tr> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Megabyte" title="Megabyte">megabyte</a> (MB)</td> 
<td>10<sup>6</sup></td> 
<td>2<sup>20</sup></td> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Mebibyte" title="Mebibyte">mebibyte</a> (MiB)</td> 
<td>2<sup>20</sup></td> 
</tr> 
<tr> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Gigabyte" title="Gigabyte">gigabyte</a> (GB)</td> 
<td>10<sup>9</sup></td> 
<td>2<sup>30</sup></td> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Gibibyte" title="Gibibyte">gibibyte</a> (GiB)</td> 
<td>2<sup>30</sup></td> 
</tr> 
<tr> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Terabyte" title="Terabyte">terabyte</a> (TB)</td> 
<td>10<sup>12</sup></td> 
<td>2<sup>40</sup></td> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Tebibyte" title="Tebibyte">tebibyte</a> (TiB)</td> 
<td>2<sup>40</sup></td> 
</tr> 
<tr> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Petabyte" title="Petabyte">petabyte</a> (PB)</td> 
<td>10<sup>15</sup></td> 
<td>2<sup>50</sup></td> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Pebibyte" title="Pebibyte">pebibyte</a> (PiB)</td> 
<td>2<sup>50</sup></td> 
</tr> 
<tr> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Exabyte" title="Exabyte">exabyte</a> (EB)</td> 
<td>10<sup>18</sup></td> 
<td>2<sup>60</sup></td> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Exbibyte" title="Exbibyte">exbibyte</a> (EiB)</td> 
<td>2<sup>60</sup></td> 
</tr> 
<tr> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Zettabyte" title="Zettabyte">zettabyte</a> (ZB)</td> 
<td>10<sup>21</sup></td> 
<td>2<sup>70</sup></td> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Zebibyte" title="Zebibyte">zebibyte</a> (ZiB)</td> 
<td>2<sup>70</sup></td> 
</tr> 
<tr> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Yottabyte" title="Yottabyte">yottabyte</a> (YB)</td> 
<td>10<sup>24</sup></td> 
<td>2<sup>80</sup></td> 
<td style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Yobibyte" title="Yobibyte">yobibyte</a> (YiB)</td> 
<td>2<sup>80</sup></td> 
</tr> 
<tr> 
<td colspan="5" style="background-color:#ddf;">Véase tambien: <a href="http://es.wikipedia.org/wiki/Nibble" title="Nibble">Nibble</a>&#160;· <a href="http://es.wikipedia.org/wiki/Byte" title="Byte">Byte</a>&#160;· <a href="http://es.wikipedia.org/wiki/Sistema_octal" title="Sistema octal">Octal</a><br /></td> 
</tr> 
</table> 
</FONT>
</center>

---

Nociones de binario
===================

## Entender estos chistes:
- Hay 10 clases de personas: las que saben binario y las que no.
- Desde que esos informáticos llevan los "100 montaditos" que solo tienen 4 tipos de bocata... ¡y el 1000 hojas sólo tiene 8 capas!
- ¿Cuántos perros tenía la peli de Disney? ...

## Ahora en serio, debéis ser capaces de:
- Convertir un número de binario a decimal y viceversa. Pincha [aquí](http://es.wikipedia.org/wiki/Sistema_binario#Conversi.C3.B3n_entre_binario_y_decimal)
- Saber cuántos bits hacen falta como mínimo para representar un rango de valores.
- Qué rango de valores enteros (con y sin signo) se pueden representar con n bits.
- Cuánto ocupa aproximadamente un documento, una foto, canción, película, etc.

---

Convertir
=========

## De binario a decimal
Sumar potencias de dos. [Enlace wikipedia](http://es.wikipedia.org/wiki/Sistema_binario#Binario_a_decimal)

## De decimal a binario
Dividir entre 2 de manera sucesiva. [Enlace wikipedia](http://es.wikipedia.org/wiki/Sistema_binario#Decimal_a_binario)

## Saber número de bits necesarios
La primera potencia de 2 mayor o igual que el número de cosas a discernir

## Cuánto ocupa algo
Razonar sobre el número de bits o de bytes necesarios. Ejemplos:

- ¿cuánto ocupa una imagen de 800x600 pixels en [**true color** o **color verdadero**](http://es.wikipedia.org/wiki/Color_verdadero)?
- ¿cuánto ocupa un documento de 200 páginas de 25 líneas a 80 columnas?

---

Componentes Hardware
====================

> *Recuerda que este tema es semipresencial, así que...*

## Debes estudiar:
- El pdf de introducción a la informática que os hemos dejado en poliformaT
- [La siguiente página de wikipedia](http://es.wikipedia.org/wiki/Computadoras) donde explica las distintas partes de una computadora:
    * Procesador o Unidad Unidad Central de Proceso (CPU)
    * Memoria
    * Dispositivos de entrada/salida
    * Buses o puertos de conexión
- [Arquitectura de Von Neumann](http://es.wikipedia.org/wiki/Arquitectura_de_von_Neumann)
- [La jerarquía de memoria](http://es.wikipedia.org/wiki/Jerarqu%C3%ADa_de_memoria)

---

Llenguajes de programación
==========================

- **Algoritmo** es una descripción precisa de cómo resolver un problema
- **Programa** conjunto de instrucciones en una secuencia determinada que nos permiten resolver un problema. Es la implementación de un algoritmo en un lenguaje de programación determinado.
- **Lenguaje de programación** 
Conjunto de reglas, símbolos y palabras especiales utilizados para construir un programa de forma que pueda ser entendido por el ordenador (quizás tras un proceso de traducción por parte de un [**compilador**](http://es.wikipedia.org/wiki/Compilador) o bien directamente gracias a un [**intérprete**](http://es.wikipedia.org/wiki/Int%C3%A9rprete_%28inform%C3%A1tica%29)). Hay un buen [puñado](http://en.wikipedia.org/wiki/List_of_programming_languages)!

#Los lenguajes de programación se clasifican en:
- **Lenguajes Máquina** Es aquél que entiende directamente el ordenador ya que sus instrucciones son secuencias binarias.
- **Lenguajes de Bajo Nivel o Ensambladores**. Compuesto por nemotécnicos de instrucciones de lenguaje máquina. Más fácil de utilizar que el anterior.
- **Lenguajes de Alto Nivel** Son los más utilizados. Mayor facilidad. Programas portables. Requiere traducción del código fuente.

---

¿Por qué vamos a estudiar C?
============================

---

¿Por qué C?
===========

- Uno de los más utilizados en ingeniería. Muchos microcontroladores y dispositivos de captura de datos se programan en C.
- Tus sistemas operativos favoritos (linux, mac osx, windows,...) están desarrollados en C.
- Es el núcleo de otros lenguajes como C++ y Objective-C (por ejemplo, aplicaciones mac/iPhone).
- Los conceptos básicos que aprendas de C te servirán para una gran familia de lenguajes como Java, Javascript (aplicaciones web), Matlab (algoritmos numéricos, etc.), etc.
- Aunque no lo creas, te va a servir tanto en la carrera de ingeniería mecánica como en muchos tipos de trabajo de tu campo.
- Aprende a programar te obliga a estructurar el pensamiento y planificar un diseño muy detallado, el mismo tipo de habilidades que necesitas para diseñar otros tipos de sistemas, máquinas, etc.




