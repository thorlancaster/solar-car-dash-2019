class SolarCarData {
    constructor() {
        this.speed = 0;
        this.motor1Power = 0;
        this.motor1Temp = 0;
        this.motor2Power = 0;
        this.motor2Temp = 0;
        this.esc1Temp = 0;
        this.esc2Temp = 0;
        this.battTemp = 0;
        this.solarPower = 0;
        this.batteryPct = 100;
        this.time = new TimeData();
        this.efficiencyHistory = new HistoryData(1000, 300);
        this.powerOutHistory = new HistoryData(1000, 300);
        this.powerInHistory = new HistoryData(1000, 300);
    }

    // Update this data with data from the Python server
    // Accepts a parsed JSON object
    processFetchData(d){
      var t = this;
      t.batteryPct = d.battery;
      t.speed = d.speed;

      t.motor1Power = d.power.motor1;
      t.motor2Power = d.power.motor2;
      t.solarPower = d.power.solar;

      t.battTemp = d.temperature.battery;
      t.esc1Temp = d.temperature.esc1;
      t.esc2Temp = d.temperature.esc2;
      t.motor1Temp = d.temperature.motor1;
      t.motor2Temp = d.temperature.motor2;
    }


    // update(j) {
    //     if (j.speed) this.speed = parseInt(j.speed);
    //     if (j.batteryPct) this.batteryPct = parseInt(j.batteryPct);
    //
    //     if (j.motor) {
    //         this.motor1Power = parseInt(j.power.motor1);
    //         this.motor2Power = parseInt(j.power.motor2);
    //         this.solarPower = parseInt(j.power.solar);
    //     }
    //
    //     if (j.temp) {
    //         this.motor1Temp = parseInt(j.temp.motor1);
    //         this.motor2Temp = parseInt(j.temp.motor2);
    //         this.esc1Temp = parseInt(j.temp.esc1);
    //         this.esc2Temp = parseInt(j.temp.esc2);
    //         this.solarTemp = parseInt(j.temp.solar);
    //         this.batteryTemp = parseInt(j.temp.battery);
    //     }
    // }

    getPowerOut() {
        return this.motor1Power + this.motor2Power;
    }
    getWattHoursPerMile() {
        return this.getPowerOut() / this.speed;
    }
    updateHistory() {
        this.efficiencyHistory.addDataPoint(this.getWattHoursPerMile());
        this.powerOutHistory.addDataPoint(this.getPowerOut());
        this.powerInHistory.addDataPoint(this.solarPower);
    }
}

class TimeData {
    constructor() {
        this.hour = 1;
        this.minute = 2;
        this.second = 3;
    }
    setFromDate(d) {
        this.hour = d.getHours();
        this.minute = d.getMinutes();
        this.second = d.getSeconds();
    }
    getClockStr() {
        return this.padTime(this.hour) + ":" + this.padTime(this.minute) + ":" + this.padTime(this.second);
    }
    padTime(num) {
        if (num > 9) return num;
        return "0" + num;
    }
}

class HistoryData {
    // Interval - milliseconds between each sample
    // Length - number of samples to hold
    constructor(interval, length) {
        this.interval = interval;
        this.samples = new Array(length);
    }
    addDataPoint(val) {
        var s = this.samples;
        for (var x = 0; x < s.length - 1; x++) {
            s[x] = s[x + 1];
        }
        s[s.length - 1] = val;
    }
}
