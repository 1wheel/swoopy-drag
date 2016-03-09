# swoopyDrag

swoopyDrag helps you hand place annotations onto d3 graphics. tktk Amanda Cox quotation

### [Demo/Documentation](http://1wheel.github.io/swoopy-drag/)

### API Reference

#### Example

    var swoopy = d3.swoopyDrag()
        .x(function(d){ return xScale(d.xVal) })
        .y(function(d){ return yScale(d.yVal) })
        .dragable(true)
        .annotations(annotations)

#### d3.swoopyDrag

Constructs a new swoopy arrow generator

#### swoopyDrag.x

Function called on each annotation to determine the `x` position. Think d3.svg.line().x

#### swoopyDrag.y

Function called on each annotation to determine the `y` position. Think d3.svg.line().y

#### swoopyDraw.dragable

Boolean. Pass true while adjusting annotations to enable draging and add control points to paths.

#### swoopyDrag.annotations

Array of objects representing  

var swoopy = d3.swoopyDrag()
    .dragable(true)
    .x(ƒ('x', c.x))
    .y(ƒ('y', c.y))
    .annotations(annotations)
    .on('drag', function(){
      annotationText.text(JSON.stringify(annotations, null, 2))
    })


### Responsive

Since each annotation's position is determined by scales, arrows and labels will still point to the correct position if the chart width changes. As the chart shrinks though, the annotations will start to overlap and cover up data points. To show fewer or differently positioned notes on mobile, you could create multiple annotation arrays for different screen sizes: 

    d3.swoopyDrag()
        .annotations(innerWidth < 800 ? mobileAnnotations : desktopAnnotations)

Alternatively if there's just one or two problematic annotations that only work above or below some sizes, you could add `maxWidth` and `minWidth` properties to the overlapping annotations and filter: 

    d3.swoopyDrag()
        .annotations(annotations.filter(function(d){
          return (typeof(d.minWidth) == 'undefined' || innerWidth > d.minWidth)
              && (typeof(d.maxWidth) == 'undefined' || innerWidth < d.maxWidth)
          }))

### Arrowheads

SVG has native support for arrowheads, but they can be a little fiddly to get working. First, we need to add a `marker` element to the page the describes the shape of the arrow:

    svg.append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '-10 -10 20 20')
        .attr('markerWidth', 20)
        .attr('markerHeight', 20)
        .attr('orient', 'auto')
      .append('polyline')
        .attr('points', '-6.75,-6.75 0,0 -6.75,6.75')

Next, we select create the 

    swoopySel = c.svg.append('g.annotations')
        .call(swoopy)
      .selectAll('path')
        .attr('marker-end', 'url(#arrow)')

MDN 

### Text wrap


### Examples

http://roadtolarissa.com/nba-win-loss/

http://roadtolarissa.com/nba-minutes/

### see also

https://github.com/bizweekgraphics/swoopyarrows

http://twitter.github.io/labella.js/

### todo
- [x] switch d3.svg.line style data
- [x] remove jetpack
- [ ] click to edit text
- [ ] incorperate tspans
- [ ] arrowhead repo??
- [ ] make gh-pages demo
