
var oPrompt=document.getElementsByClassName('prompt');
var oInput=document.querySelectorAll('input');

addHandler(oInput[1],'click',function () {validate(oInput[0],oPrompt[0])});
addHandler(oInput[3],'click',function () {validate(oInput[2],oPrompt[1])});
addHandler(oInput[5],'click',function () {validate(oInput[4],oPrompt[2])});


var validate=function (txt,pmp) {
	var val=txt.value.trim();
	if (countCode(val)==0) {
		pmp.innerText="姓名不能为空！";
		pmp.style.color='red';
		txt.style.borderColor='red';
	}
	else if(countCode(val)>=4&&countCode(val)<=16)
	{
		pmp.innerText="验证通过";
		pmp.style.color='green';
		txt.style.borderColor='green';
	}
	else{
		pmp.innerText="请输入长度4~16位的字符";
		pmp.style.color='red';
		txt.style.borderColor='red';
	}
}

var countCode=function (str) {
	var lenCode=0,
		sumLen=0;
	for (var i = 0; i < str.length; i++) {
		lenCode=str.charCodeAt(i);
		if(lenCode>=0&&lenCode<=128){
			sumLen+=1;
		}
		else{
			sumLen+=2;
		}
	}
	return sumLen;
}

