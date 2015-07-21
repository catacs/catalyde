/*
 Práctica 3. Ejercicio 6b.
 Programa para sacar la cuenta de una comida en un pequeño bar,
 pero escribiendo a fichero.
*/

#define PVP_CHORIZO  1.50
#define PVP_TORTILLA 1.20
#define PVP_AGUA     0.50
#define PVP_COLA     0.60
#define PVP_TERCIO   0.75

#include <stdio.h>

int main()
{
    int n_chorizo, n_tortilla, n_agua, n_cola, n_tercio;
    float total, entrega, devolucion;
    FILE *F;
    char s;
    
    /* Entrada de datos */
    printf("Bocadillos de chorizo: "); scanf("%d", &n_chorizo);
    printf("Bocadillos de tortilla: "); scanf("%d", &n_tortilla);
    printf("Botellas de agua: "); scanf("%d", &n_agua);
    printf("Refrescos de cola: "); scanf("%d", &n_cola);
    printf("Tercios: "); scanf("%d", &n_tercio);

    /* Cálculo del total */
    total = PVP_CHORIZO * n_chorizo + PVP_TORTILLA * n_tortilla
     + PVP_AGUA * n_agua + PVP_COLA * n_cola + PVP_TERCIO * n_tercio;

    /* Salida de datos */
    printf("\nEn total son %.2f euros.\n", total);

    /* Añadido para que muestre la cuenta de forma más elegante */
    printf("\nEntregado: "); scanf("%f", &entrega);
    devolucion = entrega - total;

    F = fopen("cuenta.txt", "w"); /* Abrir el fichero para escritura */

    fprintf(F, " %2d ", n_chorizo);
    if ( n_chorizo == 1 )
       fprintf(F, "bocadillo ");
    else
       fprintf(F, "bocadillos");
    fprintf(F, " de chorizo a %5.2f euros son %6.2f euros\n",
     PVP_CHORIZO, PVP_CHORIZO * n_chorizo);

    /* Otra forma de hacerlo usando una variable char auxiliar */
    if ( n_tortilla == 1 )
       s = ' ';
    else
       s = 's';
    fprintf(F, " %2d bocadillo%c de tortilla a    %5.2f euros son %6.2f euros\n",
     n_tortilla, s, PVP_TORTILLA, PVP_TORTILLA * n_tortilla);

    if ( n_agua == 1 )
       s = ' ';
    else
       s = 's';
    fprintf(F, " %2d botella%c de agua a      %5.2f euros son %6.2f euros\n",
     n_agua, s, PVP_AGUA, PVP_AGUA * n_agua);

    if ( n_cola == 1 )
       s = ' ';
    else
       s = 's';
    fprintf(F, " %2d refresco%c de cola a     %5.2f euros son %6.2f euros\n",
     n_cola, s, PVP_COLA, PVP_COLA * n_cola);

    if ( n_tercio == 1 )
       s = ' ';
    else
       s = 's';
    fprintf(F, " %2d refresco%c de tercio a  %5.2f euros son %6.2f euros\n",
     n_tercio, s, PVP_TERCIO, PVP_TERCIO * n_tercio);

    fprintf(F, "%42c --------\n", ' ');
    fprintf(F, "%42s  %6.2f euros\n", "TOTAL:", total);
    fprintf(F, "%42s  %6.2f euros\n", "Entrega:", entrega);
    fprintf(F, "%42s  %6.2f euros\n\n", "Devolucion:", devolucion);

    fclose(F); /* Cerrar el fichero */

    return 0;
}
