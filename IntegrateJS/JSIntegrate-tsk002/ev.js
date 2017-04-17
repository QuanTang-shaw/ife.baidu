var addHandler=function (ele,event,fn) {
	if (ele.addEventListener) {
		ele.addEventListener(event,fn,false);
	}
	else if (ele.attachEvent) {
		ele.attachEvent("on"+event,fn);
	}
	else{
		ele["on"+event]=fn;
	}
}
