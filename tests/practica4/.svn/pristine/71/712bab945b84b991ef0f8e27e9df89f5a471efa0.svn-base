module.exports = {
  /* args = socket emitter
   */
  "run_area":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p1.dust","program.c"],["p2.dust","program2.c"]],
      compileCommand: "clang -o program program.c",
      errorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "check_area":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p2.dust","program.c"],["p4.dust","program.h"]],
      compiler: "clang",
      compilerArgs = [ "-o","program","program.c" ],
      errorHandler: "default",
      interactive: true,
      programHandler: "terminal"
    });
  },
  "run_perimetro":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p1.dust","program.c"],["p2.dust","program2.c"]],
      compileCommand: "clang -o program program.c",
      errorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "check_perimetro":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p2.dust","program.c"],["p4.dust","program.h"]],
      compiler: "clang",
      compilerArgs = [ "-o","program","program.c" ],
      errorHandler: "default",
      interactive: true,
      programHandler: "terminal"
    });
  },
  "run_leer_numero":  function(args,obj) {
    obj.compileAndRun(args,{
      content = ["datos.txt"],
      templates = [["p3.dust","program.c"]],
      compileCommand: "clang -o program program.c",
      execCommand: "program datos.txt",
      errorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "run_volumen":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p1.dust","program.c"],["p2.dust","program2.c"]],
      compileCommand: "clang -o program program.c",
      errorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "check_volumen":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p2.dust","program.c"],["p4.dust","program.h"]],
      compiler: "clang",
      compilerArgs = [ "-o","program","program.c" ],
      errorHandler: "default",
      interactive: true,
      programHandler: "terminal"
    });
  },
  "run_segundos_dia":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p1.dust","program.c"],["p2.dust","program2.c"]],
      compileCommand: "clang -o program program.c",
      errorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "check_segundos_dia":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p2.dust","program.c"],["p4.dust","program.h"]],
      compiler: "clang",
      compilerArgs = [ "-o","program","program.c" ],
      errorHandler: "default",
      interactive: true,
      programHandler: "terminal"
    });
  },
  "run_intervalo":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p1.dust","program.c"],["p2.dust","program2.c"]],
      compileCommand: "clang -o program program.c",
      errorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "check_intervalo":  function(args,obj) {
    obj.compileAndRun(args,{
      content = [],
      templates = [["p2.dust","program.c"],["p4.dust","program.h"]],
      compiler: "clang",
      compilerArgs = [ "-o","program","program.c" ],
      errorHandler: "default",
      interactive: true,
      programHandler: "terminal"
    });
  }
}
