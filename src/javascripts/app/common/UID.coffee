define () ->
  series = {}
  
  (key='global') ->  
    if typeof(series[key]) == 'undefined'
      series[key] = 0
    else
      series[key]++
    return series[key]