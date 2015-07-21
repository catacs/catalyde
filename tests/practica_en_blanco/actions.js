module.exports = {

  "run1":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["p1.dust","codi.c"]],
      compiler: "clang",
      compileArgs: ["-o","codi","codi.c"],
      compileErrorHandler: "default",
      runCommand:"codi",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "run2":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["p2.dust","codi.c"]],
      compiler: "clang",
      compileArgs: ["-o","codi","codi.c"],
      compileErrorHandler: "default",
      runCommand:"codi",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "run3":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["p3.dust","codi.c"]],
      compiler: "clang",
      compileArgs: ["-o","codi","codi.c"],
      compileErrorHandler: "default",
      runCommand:"codi",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "run4":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["p4.dust","codi.c"]],
      compiler: "clang",
      compileArgs: ["-o","codi","codi.c"],
      compileErrorHandler: "default",
      runCommand:"codi",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
  "run5":  function(args,obj) {
    obj.compileAndRun(args,{
      files: [],
      templates: [["p5.dust","codi.c"]],
      compiler: "clang",
      compileArgs: ["-o","codi","codi.c"],
      compileErrorHandler: "default",
      runCommand:"codi",
      runErrorHandler: "default",
      interactive: true,
      handler: "terminal"
    });
  },
}
