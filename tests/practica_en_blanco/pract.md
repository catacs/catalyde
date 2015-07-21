## Jodiendo al sandbox parte 1

Escribe un programa que intente joder al sandbox:

<!-- BEGINBLOCK { "b_tag": "codi1" ,  "type" : "code", "checkbutton": "false", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run1" }]} -->
#include <stdio.h>
#include <stdlib.h>
int main() {
    FILE *fp;
    char ch;
    fp = fopen("/etc/passwd","r");
    while( (ch = fgetc(fp)) != EOF) {
        printf("%c",ch);
    }
    return 0;
}
<!-- ENDBLOCK -->

## Jodiendo al sandbox parte 2

Escribe un programa que intente joder al sandbox:

<!-- BEGINBLOCK { "b_tag": "codi2" ,  "type" : "code", "checkbutton": "false", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run2" }]} -->
#include <unistd.h>
#include <stdio.h>
#include <errno.h>

int main() {
  char cwd[1024];
  if (getcwd(cwd, sizeof(cwd)) != NULL)
    fprintf(stdout, "Current working dir: %s\n", cwd);
  else
    perror("getcwd() error");
  return 0;
}
<!-- ENDBLOCK -->

## Jodiendo al sandbox parte 3

Escribe un programa que intente joder al sandbox:

<!-- BEGINBLOCK { "b_tag": "codi3" ,  "type" : "code", "checkbutton": "false", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run3" }]} -->
#include <stdio.h>
#include <stdlib.h>
int main() {
	FILE *fd = fopen("hola.txt","w");
	if (fd == NULL)
		printf("Error al abrir fichero en modo escritura\n");
    else {
      fprintf(fd,"Hola mundo!\n");
	  fclose(fd);
	}
    return 0;
}
<!-- ENDBLOCK -->

## Jodiendo al sandbox parte 4

Escribe un programa que intente joder al sandbox:

<!-- BEGINBLOCK { "b_tag": "codi4" ,  "type" : "code", "checkbutton": "false", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run4" }]} -->
#include <stdio.h>
#include <stdlib.h>
int main() {
    int i=0;
    printf("Bucle infinito:\n");
	for (i=0; i>=0; i++) {
	  if (i>1000000000)
	    i=0;
	}
    return 0;
}
<!-- ENDBLOCK -->

## Jodiendo al sandbox parte 5

Escribe un programa que intente joder al sandbox:

<!-- BEGINBLOCK { "b_tag": "codi5" ,  "type" : "code", "checkbutton": "false", "editable" : "true" , "buttons": [{"name" : "Ejecutar", "action" : "run5" }]}   -->
#include <stdio.h>
#include <stdlib.h>
int main() {
    printf("Hola mundo 5\n");
    return 0;
}
<!-- ENDBLOCK -->

