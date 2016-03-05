d3.swoopyDrag = function(){
  var x = d3.scale.linear()
  var y = d3.scale.linear()

  var annotations = []
  var annotationSel

  var textDrag = d3.behavior.drag()
      .on('drag', function(d){
        var pos = d3.mouse(this.parentNode)
        var x = pos[0] 
        var y = pos[1] 
        var offset = [x, y].map(Math.round)

        console.log("sdfsdf")

        d3.select(this).translate(offset)
        d3.select(this).datum().textOffset = offset

        update()
      })
      .origin(function(d){
        return d.textOffset
        return {x: d.textOffset[0], y: d.textOffset[1]}
      })


  var circleDrag = d3.behavior.drag()
      .on('drag', function(d){
        var pos = d3.mouse(this.parentNode)
        var x = pos[0] 
        var y = pos[1] 
        var offset = [x, y].map(Math.round)

        var parentSel = d3.select(this.parentNode)

        var circles = parentSel.selectAll('circle').data()
        var path = ''
        circles.forEach(function(d){
          path = path + '    ' + d.type + d.pos 
        })

        console.log(path)

        parentSel.select('path').attr('d', path).datum().path = path
        d3.select(this).translate(offset).datum().pos = offset

        update()
      })
      // .origin(function(d){
      //   return d.textOffset
      //   return {x: d.textOffset[0], y: d.textOffset[1]}
      // })


  var rv = function(sel){
    annotationSel = sel.dataAppend(annotations, 'g.annotation')
        .translate(function(d){ return [x(d.x), y(d.y)] })
    
    annotationSel.append('text')
        .translate(ƒ('textOffset'))
        .text(ƒ('text'))
        .call(textDrag)

    annotationSel.append('path')
        .attr('d', ƒ('path'))

    annotationSel.dataAppend(function(d){
      var points = []

      console.log(d.path)

      var i = 1
      var type = 'M'
      var commas = 0

      for (var j = 1; j < d.path.length; j++){
        var curChar = d.path[j]
        if (curChar == ',') commas++
        // if (curChar == ',') debugger
        if (curChar == 'L' || curChar == 'C' || commas == 2){
          console.log(type, d.path.slice(i, j), commas)



          points.push({pos: d.path.slice(i, j), type: type})
          type = curChar
          i = j + 1
          commas = 0

        }
      }

      points.push({pos: d.path.slice(i, j), type: type})

      console.log(points)
      return points
    }, 'circle')
        .attr('r', 3)
        .translate(ƒ('pos'))
        .call(circleDrag)

    update()
  }


  function update(){
    annotationText.text(JSON.stringify(annotations, null, 2))
  }

  rv.annotations = function(_x){
    if (!_x) return annotations
    annotations = _x
    return rv
  }
  rv.x = function(_x){
    if (!_x) return x
    x = _x
    return rv
  }
  rv.y = function(_x){
    if (!_x) return y
    y = _x
    return rv
  }

  return rv
}