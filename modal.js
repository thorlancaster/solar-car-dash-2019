var modalStack = Array();
// Show a modal window. If already showing, show as soon as the last one is closed
function showModal(titleStr, contentStr, buttonTxt, callback){
  if(isModalShowing()){
    var obj = Object();
    obj.titleStr = titleStr;
    obj.contentStr = contentStr;
    obj.buttonTxt = buttonTxt;
    obj.callback = callback;
    modalStack.push(obj);
    var num = DGE("modal").getElementsByClassName("groupboxnum")[0];
    num.classList.remove("hidden");
    num.innerText = modalStack.length + 1;
    return;
  }
  var cover = DCE("div"); cover.id = "modalcover"; cover.className = "preshowing";
  setTimeout(function(){
      cover.classList.add("showing");
      cover.classList.remove("preshowing");
  }, 50);
  document.body.appendChild(cover);
  document.body.style.overflow = "hidden";
  var modal = DCE("div"); modal.id = 'modal';
  modal.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
      removeModal();
      setTimeout(function(){
        if(typeof callback === "function")
          callback(0);
      }, 200);
    }
  });
  cover.appendChild(modal);
  var title = DCE("div"); title.className = "groupboxtitle";
  title.style.textAlign = "center"; title.innerHTML = titleStr;
  var num = DCE("div"); num.className = "groupboxnum hidden";
  if(modalStack.length > 0){
    num.className = "groupboxnum"; num.innerText = modalStack.length + 1;
  }
  title.appendChild(num);
  var content = DCE("div"); content.className = "modalbody";
  content.innerHTML = contentStr;
  var buttons = DCE("div"); buttons.className = "modalbuttonbar";
  if(!buttonTxt)
    buttonTxt = ["OK"];
  for(var x = 0; x < buttonTxt.length; x++){
    var button = DCE("button");
    button.className = "modalbtn";
    button.innerHTML = buttonTxt[x];
    button.bid = x;
    button.addEventListener("click", function(){
      removeModal();
      setTimeout(function(bid){
        if(typeof callback === "function")
          callback(bid);
      }, 200, this.bid);
    });
    buttons.appendChild(button);
  }
  modal.appendChild(title);
  modal.appendChild(content);
  modal.appendChild(buttons);
}
function isModalShowing(){
  var el = DGE("modalcover");
  if(el == null) return false;
  return el.classList.contains("showing") || el.classList.contains("preshowing");
}
function clearAllModals(){
  modalStack = Array();
  removeModal();
}
function removeModal(){
  var el = DGE("modalcover");
  if(el == null)
    return false;
  el.classList.remove("showing");
  document.body.style.overflow = null;
  setTimeout(function(){
    if(!el.parentElement) return;
    document.oldModal = el;
    el.parentElement.removeChild(el);
    if(modalStack.length > 0){
      var o = modalStack.shift();
      showModal(o.titleStr, o.contentStr, o.buttonTxt, o.callback);
    }
  }, 150);
  return true;
}
