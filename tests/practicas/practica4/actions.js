module.exports = {

  "run_area":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["area_rectangulo.dust","area.c"]],
      compiler: "clang",
      compileArgs: ["-o","area","area.c"],
      compileErrorHandler: "default",
      runCommand:"area",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "check_area":  function(args,obj) {
    // COMPLETAR
  },

  "run_perimetro":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["perimetro.dust","perimetro.c"]],
      compiler: "clang",
      compileArgs: ["-o","perimetro","perimetro.c"],
      compileErrorHandler: "default",
      runCommand:"perimetro",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "check_perimetro":  function(args,obj) {
    // COMPLETAR
  },

  "run_leer_numero":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["leer_numero.dust","leer_numero.c"]],
      compiler: "clang",
      compileArgs: ["-o","leer_numero","leer_numero.c"],
      compileErrorHandler: "default",
      runCommand:"leer_numero",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "run_volumen":  function(args,obj) {
    obj.compileAndRun(args,{
      files: ['test'],
      templates: [["volumen_cilindro.dust","volumen.c"]],
      compiler: "clang",
      compileArgs: ["-o","volumen","volumen.c"],
      compileErrorHandler: "default",
      runCommand:"volumen",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "check_volumen":  function(args,obj) {
    // COMPLETAR
  },

  "run_segundos_dia":  function(args,obj) {
    obj.compileAndRun(args,{
      files: ['test'],
      templates: [["segundos_dia.dust","segundos_dia.c"]],
      compiler: "clang",
      compileArgs: ["-o","segundos_dia","segundos_dia.c"],
      compileErrorHandler: "default",
      runCommand:"segundos_dia",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "check_segundos_dia":  function(args,obj) {
    // COMPLETAR
  },

  "run_intervalo":  function(args,obj) {
    obj.compileAndRun(args,{
      files: ['test'],
      templates: [["intervalo.dust","intervalo.c"]],
      compiler: "clang",
      compileArgs: ["-o","intervalo","intervalo.c"],
      compileErrorHandler: "default",
      runCommand:"intervalo",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "check_intervalo":  function(args,obj) {
    // COMPLETAR
  }

}
