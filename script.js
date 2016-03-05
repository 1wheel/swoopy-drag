var annotations = [
  {
    x: 4.4,
    y: 5.7,
    path: 'M-5,-5L-20,-20',
    text: 'Green Flower',
    textOffset: [-60, -30]
  },
  {
    "x": 3.8,
    "y": 7.7,
    "path": "M-71,-45C-72,4,-48,11,-15,2",
    "text": "Red Flower",
    "textOffset": [-139,-44]
  }
]

var annotationText = d3.select('body').append('pre')
    .style('margin-top', '300px')



d3.tsv('data.tsv', function(data){
  c = d3.conventions({parentSel: d3.select('#graph')})

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
      .annotations(annotations)
      .x(c.x)
      .y(c.y)

  c.svg.append('g').call(swoopy)

})



