module.exports = {

  "run_contar_vocales":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["contar_vocales.dust","contar.c"]],
      compiler: "clang",
      compileArgs: ["-o","contar","contar.c"],
      compileErrorHandler: "default",
      runCommand:"contar",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "run_iguales":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["iguales.dust","iguales.c"]],
      compiler: "clang",
      compileArgs: ["-o","iguales","iguales.c"],
      compileErrorHandler: "default",
      runCommand:"iguales",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "run_creciente":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["creciente.dust","creciente.c"]],
      compiler: "clang",
      compileArgs: ["-o","creciente","creciente.c"],
      compileErrorHandler: "default",
      runCommand:"creciente",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "run_progresion":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["progresion.dust","progresion.c"]],
      compiler: "clang",
      compileArgs: ["-o","progresion","progresion.c"],
      compileErrorHandler: "default",
      runCommand:"progresion",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "run_cuanto_ha_llovido":  function(args,obj) {
    obj.compileAndRun(args,{
      files: ["lluvias.txt"],
      templates: [["llovido.dust","llovido.c"]],
      compiler: "clang",
      compileArgs: ["-o","llovido","llovido.c"],
      compileErrorHandler: "default",
      runCommand:"llovido",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "run_anyo_llovio_mas":  function(args,obj) {
    obj.compileAndRun(args,{
      files: ["lluvias.txt"],
      templates: [["llovio_mas.dust","llovio_mas.c"]],
      compiler: "clang",
      compileArgs: ["-o","llovio_mas","llovio_mas.c"],
      compileErrorHandler: "default",
      runCommand:"llovio_mas",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },

  "run_ver_fichero":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["ver_fichero.dust","ver_fichero.c"]],
      compiler: "clang",
      compileArgs: ["-o","ver_fichero","ver_fichero.c"],
      compileErrorHandler: "default",
      runCommand:"ver_fichero",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  }


}
