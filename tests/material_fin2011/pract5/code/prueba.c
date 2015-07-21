#include <stdio.h>
int main() {
  fprintf(stdout,"%-4d euros\n",5);
  fprintf(stdout,"%-4d euros\n",50);
  fprintf(stdout,"%4d euros\n",5);
  fprintf(stdout,"%4d euros\n",50);
  fprintf(stdout,"%04d euros\n",5);
  fprintf(stdout,"%04d euros\n",50);
  return 0;
}


