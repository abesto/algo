define ['app/common/widgets/CodeListing'], (CL) ->
  class GraphCodeListing extends CL
    constructor: (@$container, codeUri, @graph) ->
      super
      @$graph = $ @graph
      @$graph.bind 'colored-node', (event, model, color, varname) => @colorVariable(varname, color)
      @$graph.bind 'uncolored-node', (event, model, varname) => @uncolorVariable(varname)