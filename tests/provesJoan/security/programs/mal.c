#include<stdio.h>
#include<stdlib.h>

int main() {

	FILE *fp;

	fp = fopen("/etc/passwd","r");

        char ch;
	while( (ch = fgetc(fp)) != EOF) {
		printf("%c",ch);

	}
	return 0;
}
