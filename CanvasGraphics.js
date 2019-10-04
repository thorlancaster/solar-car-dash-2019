/**
* CanvasGraphics.js
* This class handles drawing data visualizations onto HTML canvas elements.
* This class has no "state" - all methods are essentially static
* When adding new methods, keep in mind that they must work on any canvas size.
*/
class CanvasGraphicsImpl{
  constructor(){

  }
  drawGraph(ctx, data, horizLabel, pinZero){
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var maxData = -Infinity, minData = Infinity;
    for(var x = 0; x < data.length; x++){
      if(data[x] > maxData) maxData = data[x];
      if(data[x] < minData) minData = data[x];
    }

    // Calculate spacing
    var axesSpace = width*0.08; // Space around axes for text
    var axesMargin = axesSpace*0.5; // Half of axesSpace, to center text in margins around axes
    var usableWidth = width - axesSpace;
    var usableHeight = height - axesSpace;
    // Calculate y-axis min, max, and range
    var yMarkLength = 5; // Number of labels on y-axis
    var yRange = this.scale(minData, maxData, 2);
    if(pinZero) yRange.yMin = 0;
    // Set drawing style
    ctx.strokeStyle = ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var baseWidth = width/400;
    ctx.lineWidth = baseWidth * 2;
    ctx.font = (width/15)+"px Arial";
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(width, height - axesSpace);
    ctx.lineTo(axesSpace*2, height - axesSpace);
    ctx.lineTo(axesSpace*2, height);
    ctx.moveTo(axesSpace*2, height - axesSpace);
    ctx.lineTo(axesSpace*2, 0);
    ctx.stroke();
    // Draw Axes' text
    ctx.lineWidth = baseWidth / 4;
    ctx.fillText(horizLabel, width/2+axesSpace, height-axesMargin); // Horizontal
    for(var x = 1; x <= yMarkLength; x++){
      var fracDone = (x-1)/(yMarkLength-1);
      var thisLabel = this.lblNum((yRange.yMax - yRange.yMin) * fracDone + yRange.yMin);
      var yPos = usableHeight * (yMarkLength-x + 1)/(yMarkLength);
      ctx.fillText(thisLabel, axesMargin*2, yPos); // Vertical
      ctx.beginPath(); ctx.moveTo(axesSpace*2, yPos); ctx.lineTo(width, yPos); ctx.stroke();
    }
    // Draw the actual graph
    ctx.strokeStyle = "#FD0";
    ctx.lineWidth = baseWidth * 2;
    ctx.beginPath();
    for(var x = 0; x < data.length; x++){
      var fracDone = x / (data.length-1);
      var fracY = (data[x]-yRange.yMin) / (yRange.yMax-yRange.yMin);
      var xPos = axesSpace*2 + fracDone * (width-axesSpace*2);
      var yPos = (height-axesSpace*2)*(1-fracY) + axesSpace*0.9;
      ctx.lineTo(xPos, yPos);
    }
    ctx.stroke();
  }
  lblNum(val){
    // Hopefully no weird rounding issues come up...
    if(val >= 1000000000){
      return val / 100000000 + "G";
    }
    if(val >= 1000000){
      return val / 1000000 + "M";
    }
    if(val >= 1000){
      return val / 1000 + "K";
    }
    return val;
  }
  scale(min, max, lcd){
    if(min == max && max == 0) max = 1;
    // lcd is least common denominator - min and max must be divisible by lcd
    if(lcd == undefined) lcd = 1;
    var numDigits = this.digits(max);
    var pow10 = Math.pow(10, numDigits-1);
    var yMin = Math.floor(min / pow10 / lcd) * pow10 * lcd;
    var yMax = Math.ceil(max / pow10 / lcd) * pow10 * lcd;
    return {yMin, yMax};
  }
  digits(num){
    if(num <= 0) return NaN;
    var log10 = Math.log(10);
    var numDigits = Math.floor(Math.log(num + 0.000000001) / log10 + 1);
    return numDigits;
  }
}

var CanvasGraphics = new CanvasGraphicsImpl;
