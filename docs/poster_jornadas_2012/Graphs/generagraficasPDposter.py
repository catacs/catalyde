# MLP preselection, 'vip2007' engine, Pendigits, 'tb6'/'t6f'
tb6_full_protoype_set_size = 5995
mlp_vip2007_tb6_t6f_error_rates_from_mlp = {
  1: 0.0146764509673115,
  2: 0.00333555703802535,
  3: 0.000667111407605114,
  4: 0,
  5: 0,
}
mlp_vip2007_tb6_t6f_error_rates = {
  1: 0.0146764509673115,
  2: 0.00533689126084058,
  3: 0.00266844563042024,
  4: 0.00266844563042024,
  5: 0.00266844563042024,
}
mlp_vip2007_tb6_t6f_ms_per_glyph = {
  1: 0.842561707805203,
  2: 9.12808539026017,
  3: 11.8652434956638,
  4: 14.530353569046,
  5: 17.0733822548366,
}

# -----------------------------------------------------------

mlp_rates = mlp_vip2007_tb6_t6f_error_rates_from_mlp
rates     = mlp_vip2007_tb6_t6f_error_rates
times     = mlp_vip2007_tb6_t6f_ms_per_glyph
corpus    = "Pendigits"

from pyx import *

min_c = 0.5; max_c = 5.5; best_c = 3
ticks_c = graph.axis.parter.linear([1])

min_r = 0.0; max_r = 2.0
ticks_r = graph.axis.parter.linear([0.5,0.1])

min_t = 0.0; max_t = 20.0
ticks_t = graph.axis.parter.linear([5,1])
    
# -----------------------------------------------------------

text.set(mode="latex", lfs="12pt", texmessagesdocclass=[text.texmessage.ignore])

ancho_graficas = 12.0
aureo = 0.618
margen = 0.7

simbolos = (graph.style.symbol.plus, graph.style.symbol.cross,
            graph.style.symbol.square, graph.style.symbol.triangle,
            graph.style.symbol.diamond, graph.style.symbol.circle)
ns = len(simbolos)

lineas = (style.linestyle.solid, style.linestyle.dotted,
          style.linestyle.dashed, style.linestyle.dashdotted)
nl = len(lineas)

mismos_decimales_y_mas = graph.axis.texter.decimal(labelattrs=[],
                                                   prefix="\sffamily",
                                                   equalprecision=True)

# -----------------------------------------------------------

def mlp_vip():

    g = graph.graphxy(width=ancho_graficas,
                      x=graph.axis.lin(min=min_c, max=max_c,
                                       title=r"\Large\sffamily Number of candidate classes",
                                       parter=ticks_c,
                                       texter=mismos_decimales_y_mas),
                      y=graph.axis.lin(min=min_r, max=max_r,
                                       title=r"\Large\sffamily Error rate (\%)",
                                       parter=ticks_r,
                                       texter=mismos_decimales_y_mas),
                      y2=graph.axis.lin(min=min_t, max=max_t,
                                        title=r"\Large\sffamily Time {\large (ms/glyph)}",
                                        parter=ticks_t,
                                       texter=mismos_decimales_y_mas),
                      key=graph.key.key(pos=None, hpos=0.05, vpos=1))
    
    i = 0
    g.plot(graph.data.list([[d, 100*rates[d]]
                            for d in sorted(rates)],
           x=1, y=2, title=r"\sffamily Total error"),
           [graph.style.symbol(simbolos[i%ns],0.1),
            graph.style.line([lineas[i%nl]])])
    i += 1
    g.plot(graph.data.list([[d, 100*mlp_rates[d]]
                            for d in sorted(mlp_rates)],
           x=1, y=2, title=r"\sffamily Error due to MLP"),
           [graph.style.symbol(simbolos[i%ns],0.1),
            graph.style.line([lineas[i%nl]])])
    i += 1
    g.plot(graph.data.list([[d, times[d]]
                            for d in sorted(times)],
           x=1, y2=2, title=r"\sffamily Classification time"),
           [graph.style.line([lineas[i%nl]])])
    i += 1

    g.text(ancho_graficas/2, ancho_graficas*aureo+margen,
           r"\Large\sffamily %s"%corpus,
           [text.halign.boxcenter])
    
    g.finish()
    d = best_c
    (xpos,ypos) = g.pos(d, 100*rates[d])
    g.stroke(path.circle(xpos, ypos, 0.1),[deco.filled([color.rgb.red])])
    
    g.writePDFfile("mlp_vip_"+corpus+"_poster")

# -----------------------------------------------------------

mlp_vip()
