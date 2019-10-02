/**
* CanvasGraphics.js
* This class handles drawing data visualizations onto HTML canvas elements.
* This class has no "state" - all methods are essentially static
* When adding new methods, keep in mind that they must work on any canvas size.
*/
class CanvasGraphicsImpl{
  constructor(){

  }
  drawGraph(ctx, data){
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var maxData = 0;
    for(var x = 0; x < data.length; x++)
      if(data[x] > maxData) maxData = data[x];

    var axesSpace = width*0.1; // Space around axes for text
    var axesMargin = axesSpace*0.5; // Half of axesSpace, to center text in margins around axes
    var usableWidth = width - axesSpace;
    var usableHeight = height - axesSpace;
    ctx.strokeStyle = ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = width/400;
    ctx.font = (width/15)+"px Arial"
    ctx.beginPath();
    ctx.moveTo(width, height - axesSpace);
    ctx.lineTo(width*0.2, height - axesSpace);
    ctx.lineTo(width*0.2, 0);
    ctx.stroke();
    ctx.fillText("Past 5 minutes", width/2, height-axesMargin);
    for(var x = 0; x <= 5; x++){
      ctx.fillText(""+(x*10), axesMargin*2, usableHeight * (6-x)/(6));
    }
  }
}

var CanvasGraphics = new CanvasGraphicsImpl;
