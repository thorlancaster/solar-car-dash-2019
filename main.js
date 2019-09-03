
/**
*  This file contains:
*   A function init() to initialize everything
*   A function resize() to be called when the page is resized
*   Functions to poll the local server for data
*/
var GUI;
function init(){
  GUI = new SolarCarGUI();
  GUI.setTab("overview");
  if(document.mainTmr)
    clearInterval(document.mainTmr);
  document.mainTmr = setInterval(tick, 1000);
  resize();
}

function resize(){
  var sz = Math.min(window.innerWidth, window.innerHeight*1.7);
  document.body.style.fontSize = sz/40+"px";
  GUI.resize();
}

function tick(){
  var d = new Date();
  var clk = padTime(d.getHours())+":"+padTime(d.getMinutes())+":"+padTime(d.getSeconds());
  GUI.gui.overview.clockDisp.setValue(clk);
}
function padTime(num){
  if(num > 9) return num; return "0"+num;
}
