d3.swoopyDrag = function(){
  var x = d3.scale.linear()
  var y = d3.scale.linear()

  var annotations = []
  var annotationSel

  var draggable = false

  var dispatch = d3.dispatch('drag')

  var textDrag = d3.behavior.drag()
      .on('drag', function(d){
        var x = d3.event.x
        var y = d3.event.y
        d.textOffset = [x, y].map(Math.round)

        d3.select(this).call(translate, d.textOffset)

        dispatch.drag()
      })
      .origin(function(d){ return {x: d.textOffset[0], y: d.textOffset[1]} })

  var circleDrag = d3.behavior.drag()
      .on('drag', function(d){
        var x = d3.event.x
        var y = d3.event.y
        d.pos = [x, y].map(Math.round)

        var parentSel = d3.select(this.parentNode)

        var path = ''
        parentSel.selectAll('circle').each(function(d){
          path = path + '' + d.type  + d.pos 
        })

        parentSel.select('path').attr('d', path).datum().path = path
        d3.select(this).call(translate, d.pos)

        dispatch.drag()
      })
      .origin(function(d){ return {x: d.pos[0], y: d.pos[1]} })


  var rv = function(sel){
    annotationSel = sel.selectAll('g').data(annotations)
    annotationSel.exit().remove()
    annotationSel.enter().append('g')
    annotationSel.call(translate, function(d){ return [x(d), y(d)] })
    
    var textSel = annotationSel.append('text')
        .call(translate, ƒ('textOffset'))
        .text(ƒ('text'))

    annotationSel.append('path')
        .attr('d', ƒ('path'))

    if (!draggable) return

    annotationSel.style('cursor', 'pointer')
    textSel.call(textDrag)

    annotationSel.selectAll('circle').data(function(d){
      var points = []

      var i = 1
      var type = 'M'
      var commas = 0

      for (var j = 1; j < d.path.length; j++){
        var curChar = d.path[j]
        if (curChar == ',') commas++
        if (curChar == 'L' || curChar == 'C' || commas == 2){
          points.push({pos: d.path.slice(i, j).split(','), type: type})
          type = curChar
          i = j + 1
          commas = 0
        }
      }

      points.push({pos: d.path.slice(i, j).split(','), type: type})
      return points
    }).enter().append('circle')
        .attr({r: 8, fill: 'rgba(0,0,0,0)', stroke: '#333', 'stroke-dasharray': '2 2'})
        .call(translate, ƒ('pos'))
        .call(circleDrag)

    dispatch.drag()
  }


  rv.annotations = function(_x){
    if (typeof(_x) == 'undefined') return annotations
    annotations = _x
    return rv
  }
  rv.x = function(_x){
    if (typeof(_x) == 'undefined') return x
    x = _x
    return rv
  }
  rv.y = function(_x){
    if (typeof(_x) == 'undefined') return y
    y = _x
    return rv
  }
  rv.draggable = function(_x){
    if (typeof(_x) == 'undefined') return draggable
    draggable = _x
    return rv
  }

  return d3.rebind(rv, dispatch, 'on')

  //no jetpack dependency 
  function translate(sel, pos){
    sel.attr('transform', function(d){
      var posStr = typeof(pos) == 'function' ? pos(d) : pos
      return 'translate(' + posStr + ')' 
    }) 
  }

  function ƒ(str){ return function(d){ return d[str] } } 
}