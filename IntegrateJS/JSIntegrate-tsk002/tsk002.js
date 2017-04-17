
var oInput=document.getElementById('form-ul').getElementsByTagName('input'),
	oInf=document.getElementsByTagName('b'),
	result,
	oSubmit=document.getElementById('submit');
var infText=[{mpt:'必填，长度为4~16位字符',right:'名称格式正确',wrong:'名称格式错误',isPassed:'false'},
			{mpt:'必填，长度为4~16位字符',right:'密码可用',wrong:'密码格式错误',isPassed:'false'},
			{mpt:'必填，长度为4~16位字符',right:'密码输入一致',wrong:'密码输入不一致',isPassed:'false'},
			{mpt:'必填，长度为4~16位字符',right:'手机格式正确',wrong:'手机格式错误',isPassed:'false'},
			{mpt:'必填，长度为4~16位字符',right:'邮箱格式正确',wrong:'邮箱格式错误',isPassed:'false'}];

var validate=function (id){
var	val=oInput[id-1].value.trim();
	switch(parseInt(id)) {
		case 1:
			result=/^[a-zA-Z0-9_]{4,16}$/.test(val.replace(/[\u0391-\uFFE5]/g,"nn"));
			break;
		case 2:
			result=/^[0-9]{4,16}$/.test(val);
			break;
		case 3:
			result=oInput[1].value.trim()==val;
			break;
		case 4:
			result=/^[0-9]{11}$/.test(val);
			break;
		case 5:
			result=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(val);
			break;
	}
	if (result) {
		infText[id-1].isPassed=true;
	}
	else {infText[id-1].isPassed=false;}
};

var focusAction=function (ev) {
	var oTarget=ev.target;
	var getId=oTarget.getAttribute('id').match(/\d+/).toString();
	oInf[getId-1].innerText=infText[getId-1].mpt;
};

var blurAction=function (ev) {
	var oTarget=ev.target;
	var getId=oTarget.getAttribute('id').match(/\d+/).toString();
	validate(getId);
	console.log(result);
	if (result) {
		oInf[getId-1].innerText=infText[getId-1].right;
		oTarget.style.borderColor='green';
		oInf[getId-1].style.color='green';
	}
	else{
		oInf[getId-1].innerText=infText[getId-1].wrong;
		oInf[getId-1].style.color='red';
		oTarget.style.borderColor='red';
	}
};

[].forEach.call(oInput, function (ele) {
	addHandler(ele,'focus',function (ev) {focusAction(ev);});
	addHandler(ele,'blur',function (ev) {blurAction(ev);});
});
addHandler(oSubmit,'click',function (){
	
	[1,2,3,4,5,].forEach(function (i) {
		validate(i);
	})
    result=infText.every(function (str) {
    return str.isPassed;
    } );
    if (result) {
    	alert("提交成功");
    }
    else{
    	alert("提交失败");
    }

});