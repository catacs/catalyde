module.exports = {
  "run":  function(args,obj) {
    
    obj.compileAndRun(args,{
      files: ['test'],
      templates: [["p1.dust","program.c"]],
      compiler: "clang",
      compileArgs: ["-o","program","program.c"],
      compileErrorHandler: "default",
      runCommand:"program",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "compile":  function(args,obj) {
    obj.compile(args,{
      files: [],
      templates: [["p1.dust","program.c"]],
      compileCommand: "clang -o program program.c",
      errorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  }
}
