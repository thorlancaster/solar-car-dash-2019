/*
  This file contains the main class and subclasses for the SolarCarGUI
*/



class SolarCarGUI {
    constructor() {
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
        this.initSettings();
    }
    initPaneOverview() {
        var thisGui = this.gui.overview;
        // speedometer
        var speed = new UIGauge(DGE("ov-speedometer"));
        speed.setTitle("Speed - MPH");
        speed.setFontSize(7);
        thisGui.speed = speed;

        // power out
        var powerOut = new UIGauge(DGE("ov-powerout"));
        powerOut.setTitle("Motor Watts");
        powerOut.setFontSize(4);
        thisGui.powerOut = powerOut;

        // power in
        var powerIn = new UIGauge(DGE("ov-powerin"));
        powerIn.setTitle("Solar Watts");
        powerIn.setFontSize(4);
        thisGui.powerIn = powerIn;

        // Battery temperature
        UIMiniGauge.setDefaultMinTitleWidth(55);
        var battTemp = new UIMiniGauge(DGE("ov-batttemp"));
        battTemp.setTitle("Batt Temp");
        thisGui.battTemp = battTemp;
        // Solar temperature
        var solarTemp = new UIMiniGauge(DGE("ov-solartemp"));
        solarTemp.setTitle("Solar Temp");
        thisGui.solarTemp = solarTemp;
        // Motor1 temperature
        var motor1Temp = new UIMiniGauge(DGE("ov-motor1temp"));
        motor1Temp.setTitle("Motor1 Temp");
        thisGui.motor1Temp = motor1Temp;
        // ESC1 temperature
        var esc1Temp = new UIMiniGauge(DGE("ov-esc1temp"));
        esc1Temp.setTitle("ESC1 Temp");
        thisGui.esc1Temp = esc1Temp;
        // Motor2 temperature
        var motor2Temp = new UIMiniGauge(DGE("ov-motor2temp"));
        motor2Temp.setTitle("Motor2 Temp");
        thisGui.motor2Temp = motor2Temp;
        // ESC2 temperature
        var esc2Temp = new UIMiniGauge(DGE("ov-esc2temp"));
        esc2Temp.setTitle("ESC2 Temp");
        thisGui.esc2Temp = esc2Temp;

        // Battery percentage
        var battPct = new PercentGauge(DGE("ov-battpct"));
        battPct.setTitle("Battery")
        thisGui.battPct = battPct;

        // Clock
        var clockDisp = new UIGauge(DGE("ov-clockdisp"));
        clockDisp.setTitle("");
        clockDisp.setAspectRatio(3);
        clockDisp.setFontSize(2.8);
        clockDisp.setValue("--:--:--");
        thisGui.clockDisp = clockDisp;
    }
    initPanePowerUsage() {
        var thisGui = this.gui.powerUsage;
        // Speedometer
        var speed = new UIGauge(DGE("pu-speedometer"));
        speed.setTitle("Speed - MPH");
        speed.setFontSize(5);
        thisGui.speed = speed;

        var range = new UIGauge(DGE("pu-range"));
        range.setTitle("Est. Miles Left");
        range.setFontSize(4);
        thisGui.range = range;

        // Graphs
        var efficiency = new UIGraph(DGE("pu-efficiency"));
        efficiency.setTitle("Wh / mile");
        efficiency.setXAxisText("Past 5 minutes");
        thisGui.efficiency = efficiency;

        var powerOut = new UIGraph(DGE("pu-powerchart"));
        powerOut.setTitle("Motor Watts");
        powerOut.setXAxisText("Past 5 minutes");
        thisGui.powerOut = powerOut;

        var powerIn = new UIGraph(DGE("pu-solarchart"));
        powerIn.setTitle("Solar Watts");
        powerIn.setXAxisText("Past 5 minutes");
        thisGui.powerIn = powerIn;
    }

    initSettings() {
        var thisGui = this.gui.overview;

        var notification = new UIGauge(DGE("set-notification"));
        notification.setTitle("");
        notification.setValue("Notifications")
        notification.setFontSize(3);
        thisGui.notification = notification;

        var timezone = new UIGauge(DGE("set-time"));
        timezone.setTitle("")
        timezone.setValue("Time Zone");
        timezone.setFontSize(3);
        thisGui.timezone = timezone;

        var canBusInfo = new UIGauge(DGE("set-canbusinfo"));
        canBusInfo.setTitle("")
        canBusInfo.setValue("Can-Bus List");
        canBusInfo.setFontSize(3);
        thisGui.canBusInfo = canBusInfo;


    }

    // Update the UI of the selected tab with a SolarCarData object (see SolarCarData.js)
    // If no data object is provided, the last one provided will be used.
    update(d) {
        if (d == undefined)
            d = this.lastData;
        else
            this.lastData = d;
        if (d == undefined) return;
        switch (this.selectedTabName) {
            case "overview":
                var o = this.gui.overview;
                o.powerOut.setValue(d.motor1Power + d.motor2Power);
                o.powerIn.setValue(d.solarPower);
                o.speed.setValue(d.speed);
                o.battTemp.setValue(d.battTemp);
                o.solarTemp.setValue(d.solarTemp);
                o.esc1Temp.setValue(d.esc1Temp);
                o.esc2Temp.setValue(d.esc2Temp);
                o.motor1Temp.setValue(d.motor1Temp);
                o.motor2Temp.setValue(d.motor2Temp);
                o.clockDisp.setValue(d.time.getClockStr());
                break;
            case "powerusage":
                var o = this.gui.powerUsage;
                o.speed.setValue(d.speed);
                o.range.setValue("?");
                o.efficiency.setValue(d.efficiencyHistory.samples);
                o.powerOut.setValue(d.powerOutHistory.samples);
                o.powerIn.setValue(d.powerInHistory.samples);
                break;
            case "settings":
                var o = this.gui.settings;
                break;
        }
    }


    resize() {
        this.gui.overview.resize();
        this.gui.powerUsage.resize();
        this.gui.settings.resize();
    }
    setTab(tab) {
        var tabEl = this.controlBar.getElementsByClassName("tc-" + tab)[0];
        var paneEl = this.contentPanes.getElementsByClassName("mc-" + tab)[0];
        removeClassByClass(this.controlBar, "tabctl", "selecttab");
        removeClassByClass(this.contentPanes, "maincontentpane", "mcselected");
        tabEl.classList.add("selecttab");
        paneEl.classList.add("mcselected");
        this.selectedTabName = tab;
        this.update();
    }
}

class GUICollection {
    constructor() {}
    resize() {
        for (var sub in this) {
            let obj = this[sub];
            if (obj.resize)
                obj.resize();
        }
    }
}