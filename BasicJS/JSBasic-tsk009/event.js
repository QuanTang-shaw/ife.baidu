

var addHandler=function (ele,event,fn) {
	if (ele.addEventListener) {
		ele.addEventListener(event, fn, false);
	}
	else if (ele.attachEvent) {
		ele.attachEvent("on"+event,fn);
	}
	else{
		ele["on"+event]=fn;
	}
}

var bindEt=function () {
	
	scopeOrder(wrap);
	for (var i = 0; i < orderList.length; i++) {
		addHandler(orderList[i],'click',function (ev) {
			reset();
			ev.stopPropagation();
			ev.target.style.backgroundColor='blue';
			oSelected=ev.target;
		})
	}
}

addHandler(btn_delete,'click',function (ev) {
	if(oSelected!=null){
		var parent=oSelected.parentNode;
		parent.removeChild(oSelected);
		oSelected=null;
	}
	else{
		alert("请选择要删除的节点");
	}
})

addHandler(btn_add,'click',function (ev) {
	if (oSelected==null) {
		alert("请先选择节点元素");
	}
	else if (add_text.value=='') {
		alert("请先输入要插入的内容");
	}
	else{
		var addDiv=document.createElement('div');
		addDiv.innerHTML=add_text.value;
		addDiv.className="child-add";
		oSelected.appendChild(addDiv);
	}
})

bindEt();