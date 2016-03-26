# swoopyDrag

> The annotation layer is the most important thing we do

*- Amanda Cox -*

### [Demo/Documentation](http://1wheel.github.io/swoopy-drag/)

### API Reference

#### d3.swoopyDrag()

Creates a new `swoopyDrag`. 

#### swoopyDrag.x([function])

Function called on each annotation object to determine its `x` position.

#### swoopyDrag.y([function])

Function called on each annotation object to determine its `y` position. 

#### swoopyDraw.draggable([boolean])

Boolean. Pass true while adjusting annotations to enable dragging and add control points to paths.

#### swoopyDrag.annotations([array])

Array of objects representing annotations. The `path` in each annotations will have its `d` attribute set to the `path` property. The `text` element will contain the `text` property and be translated by `textOffset`.

#### swoopyDrag.on('drag', [function])

Called as the labels or paths are dragged.

#### swoopyDrag.bootstrap()

Creates a new `swoopyBootstrap`.

Usage: 

    var swoopyBootstrap = swoopyDrag.bootstrap()
      .scale({x: myXScale, y: myYScale})
      .sel(swoopySel)
      .labelAccessor(function(d, i) { return "Hello, world!" })
    someD3Selection.call(swoopyBootstrap)

#### swoopyBootstrap.scale([object])

Set the scales for the bootstrap function to use.

Usage: `swoopyBootstrap.scale({x: myXScale, y: myYScale})`

#### swoopyBootstrap.sel([object])

Point bootstrap to the D3 selection you are using for annotations.

Usage: `swoopyBootstrap.sel(swoopySel)`

#### swoopyBootstrap.labelAccessor([function])

Pass in a function to set the label text.

Usage: `swoopyBootstrap.labelAccessor(function(d, i) { return "Hello, world!" })`