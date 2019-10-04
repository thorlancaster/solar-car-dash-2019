// Number of pixels to set aside for border(s).
var UIC_BORDER_ALLOWANCE = 2.01;
/**
* Class for standard UI gauge, with a title bar and a value below it
* 1:1 default aspect ratio, can be changed
*/
class UIGauge{
  constructor(el){
    el.classList.add("uicompholder");
    var mainEl = DCE("div");
    mainEl.className = "uicomponent";
    el.appendChild(mainEl);
    var title = DCE("div");
    title.className = "uicomptitle";
    title.innerText = "UIGauge"
    mainEl.appendChild(title);
    var body = DCE("div");
    body.className = "uicompbody";
    var bodyContent = DCE("div");
    bodyContent.className = "uicompbodycontent";
    bodyContent.innerText = "-";
    body.appendChild(bodyContent);
    mainEl.appendChild(body);
    this.root = el;
    this.el = mainEl;
    this.title = title;
    this.bodyContent = bodyContent;
    this.aspectRatio = 1;
    this.setFontSize(4);
    this.resize();
  }
  setAspectRatio(asp){
    this.aspectRatio = asp;
    this.resize();
  }
  setValue(str){
    this.bodyContent.innerText = str;
  }
  setTitle(str){
    this.title.innerText = str;
  }
  setFontSize(em){
    this.bodyContent.style.fontSize = em+"em";
  }
  resize(){
    var root = this.root;
    var el = this.el;
    var ar = this.aspectRatio;
    var size = Math.min(root.offsetWidth, root.offsetHeight*ar)-UIC_BORDER_ALLOWANCE;
    el.style.width = size + "px";
    el.style.height = size / ar + "px";
  }
  update(){

  }
}

/**
* Class for mini UI gauge, with a title to the left and a value to the right.
* Takes up much less vertical space, less visibility
* 5:1 aspect ratio
*/
class UIMiniGauge{
  static setDefaultMinTitleWidth(pct){
    this.defaultMinTitleWidth = pct;
  }
  constructor(el){
    el.classList.add("uicompholder");
    var mainEl = DCE("div");
    mainEl.className = "uicomponent uicomphoriz";
    el.appendChild(mainEl);
    var title = DCE("div");
    title.className = "uicomptitle";
    var titleBody = DCE("div");
    titleBody.className = "uicomptitlebody";
    titleBody.innerText = "UIMiniGauge";
    title.appendChild(titleBody);
    mainEl.appendChild(title);
    var body = DCE("div");
    body.className = "uicompbody";
    var bodyContent = DCE("div");
    bodyContent.className = "uicompbodycontent";
    bodyContent.innerText = "-";
    body.appendChild(bodyContent);
    mainEl.appendChild(body);
    this.root = el;
    this.el = mainEl;
    this.titleCont = title;
    this.title = titleBody;
    this.body = body;
    this.bodyContent = bodyContent;
    if(UIMiniGauge.defaultMinTitleWidth){
      this.setMinTitleWidth(UIMiniGauge.defaultMinTitleWidth);
    }
    this.setFontSize(2);
    this.resize();
  }
  setMinTitleWidth(pct){
    this.titleCont.style.minWidth = pct + "%";
  }
  setValue(str){
    this.bodyContent.innerText = str;
  }
  setTitle(str){
    this.title.innerText = str;
  }
  setFontSize(em){
    this.bodyContent.style.fontSize = em+"em";
  }
  resize(){
    var root = this.root;
    var el = this.el;
    var size = Math.min(root.offsetWidth, root.offsetHeight*5)-UIC_BORDER_ALLOWANCE;
    el.style.width = size + "px";
    el.style.height = size/5 + "px";
  }
  update(){

  }
}

class PercentGauge extends UIMiniGauge{
  constructor(el){
    super(el);
    this.setTitle("");
    this.setValue("");
    this.setFontSize(1.2);
    this.title.parentElement.parentElement.removeChild(this.title.parentElement);
    this.bodyContent.style.background = "unset";
    this.setValue("Battery: 72%", 72);
  }
  setValue(text, percent){
    this.bodyContent.innerText = text;
    this.body.style.background =
      "linear-gradient(90deg, #06A "+(percent-0.01)+"%, #223 "+(percent+0.01)+"%)";
  }
}

/**
* Class for UI graph, with a title bar on top and a canvas graph at the bottom
* 2:1 default aspect ratio, can be changed
*/
class UIGraph{
  constructor(el){
    el.classList.add("uicompholder");
    var mainEl = DCE("div");
    mainEl.className = "uicomponent";
    el.appendChild(mainEl);
    var title = DCE("div");
    title.className = "uicomptitle";
    title.innerText = "UIGraph"
    mainEl.appendChild(title);
    var body = DCE("div");
    body.className = "uicompbody";
    var bodyContent = DCE("canvas");
    bodyContent.className = "uicompbodycontent";
    body.appendChild(bodyContent);
    mainEl.appendChild(body);
    this.root = el;
    this.el = mainEl;
    this.title = title;
    this.bodyContent = bodyContent;
    this.ctx = bodyContent.getContext("2d");
    this.xAxisText = "Unknown Timescale";
    this.data = [0, 0];
    this.resize();
  }
  setValue(data){
    this.data = data;
    this.update();
  }
  setTitle(str){
    this.title.innerText = str;
  }
  resize(){
    var root = this.root;
    var el = this.el;
    var bc = this.bodyContent;
    el.style.width = root.offsetWidth-UIC_BORDER_ALLOWANCE + "px";
    el.style.height = root.offsetHeight-UIC_BORDER_ALLOWANCE + "px";
    bc.width = bc.scrollWidth;
    bc.height = bc.scrollHeight;
    this.redrawCanvas();
  }
  setXAxisText(txt){
    this.xAxisText = txt;
  }
  update(){
    this.redrawCanvas();
  }
  redrawCanvas(){
    var ctx = this.ctx;
    // var data = [500, 500, 500, 500, 500, 500, 600, 200, 800, 400, 500, 500, 500, 500, 500, 500];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    CanvasGraphics.drawGraph(ctx, this.data, this.xAxisText);
  }
}
