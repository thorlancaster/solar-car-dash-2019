/*
  This file contains the main class and subclasses for the SolarCarGUI
*/



class SolarCarGUI {
  constructor(){
    // Bar that contains the tabs for different views
    this.controlBar = DGE("topbar");
    // Different views to show
    this.contentPanes = DGE("mcpanes");
    this.gui = Object();
    this.gui.overview = new GUICollection();
    this.gui.powerUsage = new GUICollection();
    this.gui.settings = new GUICollection();
    this.initPaneOverview();
    this.initPanePowerUsage();
  }
  initPaneOverview(){
    var thisGui = this.gui.overview;
    // speedometer
    var speed = new UIGauge(DGE("ov-speedometer"));
    speed.setTitle("Speed - MPH");
    speed.setFontSize(7);
    speed.setValue(45);
    thisGui.speed = speed;

    // power out
    var powerOut = new UIGauge(DGE("ov-powerout"));
    powerOut.setTitle("Watts Out");
    powerOut.setFontSize(5);
    powerOut.setValue(1350);
    thisGui.powerOut = powerOut;

    // power in
    var powerIn = new UIGauge(DGE("ov-powerin"));
    powerIn.setTitle("Watts In");
    powerIn.setFontSize(5);
    powerIn.setValue(955);
    thisGui.powerIn = powerIn;

    // Battery temperature
    UIMiniGauge.setDefaultMinTitleWidth(55);
    var battTemp = new UIMiniGauge(DGE("ov-batttemp"));
    battTemp.setTitle("Batt Temp");
    battTemp.setValue(33);
    thisGui.battTemp = battTemp;
    // Solar temperature
    var solarTemp = new UIMiniGauge(DGE("ov-solartemp"));
    solarTemp.setTitle("Solar Temp");
    solarTemp.setValue(37);
    thisGui.solarTemp = solarTemp;
    // Motor1 temperature
    var motor1Temp = new UIMiniGauge(DGE("ov-motor1temp"));
    motor1Temp.setTitle("Motor1 Temp");
    motor1Temp.setValue(45);
    thisGui.motor1Temp = motor1Temp;
    // ESC1 temperature
    var esc1Temp = new UIMiniGauge(DGE("ov-esc1temp"));
    esc1Temp.setTitle("ESC1 Temp");
    esc1Temp.setValue(42);
    thisGui.esc1Temp = esc1Temp;
    // Motor2 temperature
    var motor2Temp = new UIMiniGauge(DGE("ov-motor2temp"));
    motor2Temp.setTitle("Motor2 Temp");
    motor2Temp.setValue(45);
    thisGui.motor2Temp = motor2Temp;
    // ESC2 temperature
    var esc2Temp = new UIMiniGauge(DGE("ov-esc2temp"));
    esc2Temp.setTitle("ESC2 Temp");
    esc2Temp.setValue(42);
    thisGui.esc2Temp = esc2Temp;
    // Clock
    var clockDisp = new UIGauge(DGE("ov-clockdisp"));
    clockDisp.setTitle("");
    clockDisp.setAspectRatio(3);
    clockDisp.setFontSize(2.8);
    clockDisp.setValue("--:--:--");
    thisGui.clockDisp = clockDisp;
  }
  initPanePowerUsage(){
    var thisGui = this.gui.powerUsage;
    // speedometer
    var speed = new UIGauge(DGE("pu-speedometer"));
    speed.setTitle("Speed - MPH");
    speed.setFontSize(5);
    speed.setValue(45);
    thisGui.speed = speed;

    var efficiency = new UIGauge(DGE("pu-example"));
    efficiency.setTitle("Wh / mile");
    efficiency.setFontSize(5);
    efficiency.setValue(90);
    thisGui.efficiency = efficiency;

    // Power Usage chart
    // var power = new UIChart(DGE("pu-powerchart"));
    // power.setTitle("Power Usage");
    // power.setData(1000, 3000, 5000, 4000, 2000, 3000);
  }
  resize(){
    // TODO resize elements by what tab is selected if performance is issue
    this.gui.overview.resize();
    this.gui.powerUsage.resize();
    this.gui.settings.resize();
  }
  setTab(tab){
    var tabEl = this.controlBar.getElementsByClassName("tc-"+tab)[0];
    var paneEl = this.contentPanes.getElementsByClassName("mc-"+tab)[0];
    removeClassByClass(this.controlBar, "tabctl", "selecttab");
    removeClassByClass(this.contentPanes, "maincontentpane", "mcselected");
    tabEl.classList.add("selecttab");
    paneEl.classList.add("mcselected");
  }
}

class GUICollection{
  constructor(){}
  resize(){
    for(var sub in this){
      let obj = this[sub];
      if(obj.resize)
        obj.resize();
    }
  }
}
