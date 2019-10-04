
/**
*  This file contains:
*   A function init() to initialize everything
*   A function resize() to be called when the page is resized
*   Functions to poll the local server for data
*/
var GUI, solarCarData;
function init(){
  GUI = new SolarCarGUI();
  solarCarData = new SolarCarData();
  GUI.setTab("overview");
  if(document.mainTmr)
    clearInterval(document.mainTmr);
  document.mainTmr = setInterval(tick, 250);
  resize();
}

function resize(){
  var mainEl = DGE("main");
  var sz = Math.min(mainEl.scrollWidth, mainEl.scrollHeight*1.7);
  document.body.style.fontSize = sz/40+"px";
  GUI.resize();
}

function tick(){
  tick.tick |= 0;
  var d = new Date();
  solarCarData.time.setFromDate(d);
  if(tick.tick >= 3){
    solarCarData.updateHistory();
    tick.tick = 0;
  }
  update();
  tick.tick++;
}

function update(){
  GUI.update(solarCarData);
}
