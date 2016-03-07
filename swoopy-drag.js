d3.swoopyDrag = function(){
  var x = d3.scale.linear()
  var y = d3.scale.linear()

  var annotations = []
  var annotationSel

  var dragable = false

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
    annotationSel = sel.dataAppend(annotations, 'g.annotation')
        .call(translate, function(d){ return [x(d.x), y(d.y)] })
    
    annotationSel.append('text')
        .call(translate, ƒ('textOffset'))
        .text(ƒ('text'))
        .call(textDrag)

    annotationSel.append('path')
        .attr('d', ƒ('path'))

    if (!dragable) return

    annotationSel.style('cursor', 'pointer')

    annotationSel.dataAppend(function(d){
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
      console.log(points)
      return points
    }, 'circle')
        .attr({r: 6, fill: 'rgba(0,0,0,0)', stroke: '#333', 'stroke-dasharray': '2 2'})
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
  rv.dragable = function(_x){
    if (typeof(_x) == 'undefined') return dragable
    dragable = _x
    return rv
  }

  return d3.rebind(rv, dispatch, 'on')


  function translate(sel, pos){
    sel.attr('transform', function(d){
      var posStr = typeof(pos) == 'function' ? pos(d) : pos
      return 'translate(' + posStr + ')' 
    }) 
  }
}