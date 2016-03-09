# swoopy-drag

### [Demo/Documentation](http://1wheel.github.io/swoopy-drag/)

### API

### Responsive

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

Next, we select 

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
