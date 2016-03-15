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