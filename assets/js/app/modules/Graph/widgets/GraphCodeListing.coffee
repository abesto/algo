define ['app/common/widgets/CodeListing'], (CL) ->
  class GraphCodeListing extends CL
    constructor: (@$container, @graph) ->
      super
      @$graph = $ @graph
      @$graph.bind 'colored-node', (event, model, color, varname) => @colorVariable(varname, color)
      @$graph.bind 'uncolored-node', (event, model, varname) => @uncolorVariable(varname)
      @$graph.bind 'colored-edge', (event, model, color, varname) => @colorVariable(varname, color)
      @$graph.bind 'uncolored-edge', (event, model, varname) => @uncolorVariable(varname)