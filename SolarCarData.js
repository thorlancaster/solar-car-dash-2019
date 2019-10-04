class SolarCarData{
  constructor(){
    this.speed = 45;
    this.motor1Power = 2200;
    this.motor1Temp = 55;
    this.motor2Power = 2400;
    this.motor2Temp = 58;
    this.esc1Temp = 34;
    this.esc2Temp = 37;
    this.battTemp = 32;
    this.solarTemp = 55;
    this.solarPower = 1355;
    this.batteryPct = 72;
    this.time = new TimeData();
    this.efficiencyHistory = new HistoryData(1000, 300);
    this.powerOutHistory = new HistoryData(1000, 300);
    this.powerInHistory = new HistoryData(1000, 300);
  }
  getPowerOut(){
    return this.motor1Power + this.motor2Power;
  }
  getWattHoursPerMile(){
    return this.getPowerOut() / this.speed;
  }
  updateHistory(){
    this.efficiencyHistory.addDataPoint(this.getWattHoursPerMile());
    this.powerOutHistory.addDataPoint(this.getPowerOut());
    this.powerInHistory.addDataPoint(this.solarPower);
  }
}

class TimeData{
  constructor(){
    this.hour = 1;
    this.minute = 2;
    this.second = 3;
  }
  setFromDate(d){
    this.hour = d.getHours();
    this.minute = d.getMinutes();
    this.second = d.getSeconds();
  }
  getClockStr(){
    return this.padTime(this.hour)+":"+this.padTime(this.minute)+":"+this.padTime(this.second);
  }
  padTime(num){
    if(num > 9) return num; return "0"+num;
  }
}

class HistoryData{
  // Interval - milliseconds between each sample
  // Length - number of samples to hold
  constructor(interval, length){
    this.interval = interval;
    this.samples = new Array(length);
  }
  addDataPoint(val){
    var s = this.samples;
    for(var x = 0; x < s.length -1; x++){
      s[x] = s[x+1];
    }
    s[s.length-1] = val;
  }
}
