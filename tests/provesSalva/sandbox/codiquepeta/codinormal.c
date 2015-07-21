#include <stdio.h>

int main() {
  int i,num;
  for (i=0; i<5; ++i) {
    printf("di un numero: ");
    scanf("%d",&num);
    printf("has dicho %d\n",num);
  }
  return 0;
}
