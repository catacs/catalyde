int es_primo(int numero) {
  int i;
  for (i=2; i<numero; i=i+1) {
    if (numero % i == 0) {
      return 0; /* 0 se interpreta como falso */
    }
  }
  return 1; /* 1 se interpreta como cierto */
}
