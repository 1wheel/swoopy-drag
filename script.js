var annotations = [
  {
    "x": 4.4,
    "y": 5.7,
    "path": "M-49,-61L-18,-22",
    "text": "Green Flower",
    "textOffset": [
      -85,
      -77
    ]
  },
  {
    "x": 3.8,
    "y": 7.7,
    "path": "M-103,-50C-116,-12,-46,25,-8,-16",
    "text": "Red Flower",
    "textOffset": [
      -100,
      -57
    ]
  }
]


var annotationText = d3.select('body').append('pre')
    .style('margin-top', '200px')



d3.tsv('data.tsv', function(data){
  c = d3.conventions({parentSel: d3.select('#graph'), width: 600})

  c.x.domain(d3.extent(data, ƒ('sepalWidth')) ).nice()
  c.y.domain(d3.extent(data, ƒ('sepalLength'))).nice()
  c.drawAxis()

  c.svg.dataAppend(data, 'circle')
      .attr('cx', ƒ('sepalWidth', c.x))
      .attr('cy', ƒ('sepalLength',c.y))
      .attr('fill', ƒ('species', c.color))
      .attr({r: 5, stroke: '#000'})
      .call(d3.attachTooltip)

  var legend = c.svg.dataAppend(c.color.domain(), 'g.legend')
      .translate(function(d, i){ return [0, i*20] })

  legend.append('rect')
      .attr({x: c.width - 18, width: 18, height: 18})
      .style('fill', c.color)

  legend.append('text')
      .attr({x: c.width - 24, y: 9, dy: '.33em', 'text-anchor': 'end'})
      .text(ƒ())


  swoopy = d3.swoopyDrag()
      .dragable(true)
      .x(ƒ('x', c.x))
      .y(ƒ('y', c.y))
      .annotations(annotations)
      .on('drag', function(){
        annotationText.text(JSON.stringify(annotations, null, 2))
      })

  swoopySel = c.svg.append('g.annotations')
      .call(swoopy)

  swoopySel.selectAll('path')
      .attr('marker-end', 'url(#arrow)')

  swoopySel.selectAll('text')
      .each(function(d){
        d3.select(this)
            .text('')
            .tspans(d.text.split(' '))
      })

  c.svg.append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '-10 -10 20 20')
      .attr('markerWidth', 20)
      .attr('markerHeight', 20)
      .attr('orient', 'auto')
    .append('polyline')
      .attr('points', '-6.75,-6.75 0,0 -6.75,6.75')

  // c.svg.append('marker')
  //     .attr('id', 'arrow')
  //     .attr('viewBox', '-10 -10 20 20')
  //     // .attr('refX', 0)
  //     // .attr('refY', 0)
  //     .attr('markerWidth', 20)
  //     .attr('markerHeight', 20)
  //     // .attr('stroke-width', 1)
  //     .attr('orient', 'auto')
  //   .append('polyline')
  //     // .attr('stroke-linejoin', 'bevel')
  //     .attr('points', '-6.75,-6.75 0,0 -6.75,6.75');

})



