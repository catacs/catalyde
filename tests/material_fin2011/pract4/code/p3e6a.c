/*
 Práctica 3. Ejercicio 6a.
 Programa para sacar la cuenta de una comida en un pequeño bar
 en un formato más elegante.
*/

#define PVP_CHORIZO 1.10
#define PVP_ATUN    1.40
#define PVP_AGUA    0.50
#define PVP_COLA    0.75
#define PVP_NARANJA 0.70

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n_chorizo, n_atun, n_agua, n_cola, n_naranja;
    float total, entrega, devolucion;
    char s;
    
    /* Entrada de datos */
    printf("Bocadillos de chorizo: "); scanf("%d", &n_chorizo);
    printf("Bocadillos de atun: "); scanf("%d", &n_atun);
    printf("Botellas de agua: "); scanf("%d", &n_agua);
    printf("Refrescos de cola: "); scanf("%d", &n_cola);
    printf("Refrescos de naranja: "); scanf("%d", &n_naranja);

    /* Cálculo del total */
    total = PVP_CHORIZO * n_chorizo + PVP_ATUN * n_atun
     + PVP_AGUA * n_agua + PVP_COLA * n_cola + PVP_NARANJA * n_naranja;

    /* Salida de datos */
    printf("\nEn total son %.2f euros.\n", total);

    /* Añadido para que muestre la cuenta de forma más elegante */
    printf("\nEntregado: "); scanf("%f", &entrega);
    devolucion = entrega - total;

    system("cls");

    printf(" %2d ", n_chorizo);
    if ( n_chorizo == 1 )
       printf("bocadillo ");
    else
       printf("bocadillos");
    printf(" de chorizo a %5.2f euros son %6.2f euros\n",
     PVP_CHORIZO, PVP_CHORIZO * n_chorizo);

    /* Otra forma de hacerlo usando una variable char auxiliar */
    if ( n_atun == 1 )
       s = ' ';
    else
       s = 's';
    printf(" %2d bocadillo%c de atun a    %5.2f euros son %6.2f euros\n",
     n_atun, s, PVP_ATUN, PVP_ATUN * n_atun);

    if ( n_agua == 1 )
       s = ' ';
    else
       s = 's';
    printf(" %2d botella%c de agua a      %5.2f euros son %6.2f euros\n",
     n_agua, s, PVP_AGUA, PVP_AGUA * n_agua);

    if ( n_cola == 1 )
       s = ' ';
    else
       s = 's';
    printf(" %2d refresco%c de cola a     %5.2f euros son %6.2f euros\n",
     n_cola, s, PVP_COLA, PVP_COLA * n_cola);

    if ( n_naranja == 1 )
       s = ' ';
    else
       s = 's';
    printf(" %2d refresco%c de naranja a  %5.2f euros son %6.2f euros\n",
     n_naranja, s, PVP_NARANJA, PVP_NARANJA * n_naranja);

    printf("%42c --------\n", ' ');
    printf("%42s  %6.2f euros\n", "TOTAL:", total);
    printf("%42s  %6.2f euros\n", "Entrega:", entrega);
    printf("%42s  %6.2f euros\n\n", "Devolucion:", devolucion);

    system("pause");

    return 0;
}
