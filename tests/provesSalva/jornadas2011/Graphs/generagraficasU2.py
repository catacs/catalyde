# MLP preselection, 'vip2007' engine, UJIpenchars2, 'twv'/'val'
twv_full_protoype_set_size = 3596
mlp_vip2007_twv_val_error_rates_from_mlp = {
  1: 0.128299120234604,
  2: 0.0659824046920822,
  3: 0.0439882697947214,
  4: 0.0293255131964809,
  5: 0.0234604105571847,
  6: 0.0190615835777126,
  7: 0.0153958944281525,
  8: 0.0146627565982405,
  9: 0.0131964809384164,
  10: 0.00879765395894427,
  11: 0.00879765395894427,
  12: 0.00879765395894427,
  13: 0.00659824046920821,
  14: 0.00513196480938416,
  15: 0.00513196480938416,
}
mlp_vip2007_twv_val_error_rates = {
  1: 0.128299120234604,
  2: 0.0997067448680352,
  3: 0.093108504398827,
  4: 0.0887096774193549,
  5: 0.0894428152492669,
  6: 0.0894428152492669,
  7: 0.0872434017595308,
  8: 0.0887096774193549,
  9: 0.0872434017595308,
  10: 0.0843108504398827,
  11: 0.0850439882697948,
  12: 0.0850439882697948,
  13: 0.0857771260997068,
  14: 0.0865102639296188,
  15: 0.0865102639296188,
}
mlp_vip2007_twv_val_ms_per_glyph = {
  1: 1.00513196480938,
  2: 4.52932551319648,
  3: 5.16715542521994,
  4: 5.80571847507331,
  5: 6.43841642228739,
  6: 7.10043988269795,
  7: 7.67741935483871,
  8: 8.26759530791789,
  9: 8.82844574780059,
  10: 9.42888563049853,
  11: 9.95967741935484,
  12: 10.4934017595308,
  13: 11.0520527859238,
  14: 11.5527859237537,
  15: 12.0571847507331,
}

# -----------------------------------------------------------

mlp_rates = mlp_vip2007_twv_val_error_rates_from_mlp
rates     = mlp_vip2007_twv_val_error_rates
times     = mlp_vip2007_twv_val_ms_per_glyph
corpus    = "UJIpenchars2"

from pyx import *

min_c = 0.5; max_c = 15.5
ticks_c = graph.axis.parter.linear([1])

min_r = 0.0; max_r = 15.0
ticks_r = graph.axis.parter.linear([5,1])

min_t = 0.0; max_t = 15.0
ticks_t = graph.axis.parter.linear([5,1])
    
# -----------------------------------------------------------

text.set(lfs="12pt")

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

mismos_decimales = graph.axis.texter.decimal(equalprecision=True)

# -----------------------------------------------------------

def mlp_vip():

    g = graph.graphxy(width=ancho_graficas,
                      x=graph.axis.lin(min=min_c, max=max_c,
                                       title=r"\large Number of candidate classes, $c$",
                                       parter=ticks_c),
                      y=graph.axis.lin(min=min_r, max=max_r,
                                       title=r"\large Error rate (\%)",
                                       parter=ticks_r),
                      y2=graph.axis.lin(min=min_t, max=max_t,
                                        title=r"\large Time (ms/glyph)",
                                        parter=ticks_t),
                      key=graph.key.key(pos=None, hpos=0.05, vpos=1))
    
    i = 0
    g.plot(graph.data.list([[d, 100*rates[d]]
                            for d in sorted(rates)],
           x=1, y=2, title=r"\small Total error"),
           [graph.style.symbol(simbolos[i%ns],0.1),
            graph.style.line([lineas[i%nl]])])
    i += 1
    g.plot(graph.data.list([[d, 100*mlp_rates[d]]
                            for d in sorted(mlp_rates)],
           x=1, y=2, title=r"\small Error due to MLP"),
           [graph.style.symbol(simbolos[i%ns],0.1),
            graph.style.line([lineas[i%nl]])])
    i += 1
    g.plot(graph.data.list([[d, times[d]]
                            for d in sorted(times)],
           x=1, y2=2, title=r"\small Classification time"),
           [graph.style.line([lineas[i%nl]])])
    i += 1
    
    g.text(ancho_graficas/2, ancho_graficas*aureo+margen,
           r"\large Validation on %s combining MLP and VIP engine"%corpus,
           [text.halign.boxcenter])
    
    g.writePDFfile("mlp_vip_"+corpus)

# -----------------------------------------------------------

mlp_vip()
