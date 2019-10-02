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
    var size = Math.min(root.offsetWidth, root.offsetHeight*ar);
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
    var size = Math.min(root.offsetWidth, root.offsetHeight*5);
    el.style.width = size + "px";
    el.style.height = size/5 + "px";
  }
  update(){

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
    this.aspectRatio = 1.8;
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
  resize(){
    var root = this.root;
    var el = this.el;
    var ar = this.aspectRatio;
    var size = Math.min(root.offsetWidth, root.offsetHeight*ar);
    el.style.width = size + "px";
    el.style.height = size / ar + "px";
    this.redrawCanvas();
  }
  update(){
    this.redrawCanvas();
  }
  redrawCanvas(){
    var ctx = this.ctx;
    var data = [5, 2, 6, 2, 5];
    CanvasGraphics.drawGraph(ctx, data);
  }
}
