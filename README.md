# swoopyDrag

> The annotation layer is the most important thing we do

*- Amanda Cox -*

### [Demo/Documentation](http://1wheel.github.io/swoopy-drag/)

swoopyDrag helps you hand place annotations on d3 graphics. It takes an array of objects representing annotations:

    var annotations = [
      { "xVal": 4.4,
        "yVal": 5.7,
        "path": "M-49,-61L-18,-22",
        "text": "Green Flower",
        "textOffset": [-85, -77] },
      { "xVal": 3.8,
        "yVal": 7.7,
        "path": "M-103,-50C-116,-12,-46,25,-8,-16",
        "text": "Red Flower",
        "textOffset": [-100, -57] }
    ]

and turns them into arrows and labels:

    var swoopy = d3.swoopyDrag()
        .x(function(d){ return xScale(d.xVal) })
        .y(function(d){ return yScale(d.yVal) })
        .annotations(annotations)
        
    var swoopySel = svg.append('g').call(swoopy)

Just like `d3.svg.line`, `x` and `y` take functions that 

TKTK image of static arrows

Setting `draggable` to true adds control points to the path strings and enables label dragging.

    swoopy.draggable(true)

TKTK gif of draging

While dragging, the `path` and `textOffset` properties update. After everything has been positioned nicely, you save the mutated `annotations` array by running `> copy(annotations)` in the [devtools console](https://developer.chrome.com/devtools/docs/console) and pasting over the old `annotations` array in your text editor. 

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

SVG has native support for [arrowheads](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker), but they can be a little fiddly to get working. First, add a `marker` element to the page the describes the shape of the arrow:

    c.svg.append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '-10 -10 20 20')
        .attr('markerWidth', 20)
        .attr('markerHeight', 20)
        .attr('orient', 'auto')
      .append('path')
        .attr('d', 'M-6.75,-6.75 L 0,0 L -6.75,6.75')

Next, select paths in each annotation and set their `marker-end` attribute:

    swoopySel.selectAll('path')
        .attr('marker-end', 'url(#arrow)')

### Text wrap

Multiline text can be added with d3-jetpack. Select all of the `text` elements, clear the existing text, then use `d3.wordwrap` and `tspans` to wrap the text:

    swoopySel.selectAll('text')
        .each(function(d){
          d3.select(this)
              .text('')                        //clear text
              .tspans(d3.wordwrap(d.text, 20)) //20 char wrap
        })  

### API Reference

#### d3.swoopyDrag

Constructs a new swoopy arrow generator

#### swoopyDrag.x

Function called on each annotation to determine the `x` position. Think d3.svg.line().x

#### swoopyDrag.y

Function called on each annotation to determine the `y` position. Think d3.svg.line().y

#### swoopyDraw.draggable

Boolean. Pass true while adjusting annotations to enable draging and add control points to paths.

#### swoopyDrag.annotations

Array of objects representing  

var swoopy = d3.swoopyDrag()
    .draggable(true)
    .x(ƒ('x', c.x))
    .y(ƒ('y', c.y))
    .annotations(annotations)
    .on('drag', function(){
      annotationText.text(JSON.stringify(annotations, null, 2))
    })


### Examples

http://roadtolarissa.com/nba-win-loss/

http://roadtolarissa.com/nba-minutes/

### Other Tools

https://github.com/bizweekgraphics/swoopyarrows

http://twitter.github.io/labella.js/

Export with svgcrowbar and add labels/paths with illustator. This is tricky to make responsive - transform scale or `viewbox` can keep the labels in the correct position, but shrink the font size. 

AItoHTML does a great job of handling multiple annotation sizes but is tricky to make interactive.

### Todo
- [x] switch d3.svg.line style data
- [x] remove jetpack
- [ ] click to edit text
- [ ] incorperate tspans
- [ ] arrowhead repo??
- [ ] make gh-pages demo
- [ ] handle more kinds of path strings
