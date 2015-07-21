#include <stdio.h> /* para usar fprintf */
int main() {
  float v = 1.23456e12;
  fprintf(stdout,"%f\n",v);
  fprintf(stdout,"%g\n",v);
  fprintf(stdout,"%e\n",v);
  v = 1.23;
  fprintf(stdout,"%f\n",v);
  fprintf(stdout,"%e\n",v);
  fprintf(stdout,"%g\n",v);
  return 0;
}

