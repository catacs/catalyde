#include <stdio.h>
int main() {
  fprintf(stdout,"unsigned char ocupa %lu bytes\n", sizeof(unsigned char));
  fprintf(stdout,"char ocupa %lu bytes\n", sizeof(char));
  fprintf(stdout,"unsigned int ocupa %lu bytes\n", sizeof(unsigned int));
  fprintf(stdout,"int ocupa %lu bytes\n", sizeof(int));
  return 0;
}
