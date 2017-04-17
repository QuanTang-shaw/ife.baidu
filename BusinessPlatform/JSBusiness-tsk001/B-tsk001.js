	

	

	(function () {
		(function () {
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
			};
			var oInput=document.querySelectorAll('input'),
				colorValue_R=oInput[0],
				btn_add_R=oInput[1],
				btn_sub_R=oInput[2],
				colorValue_G=oInput[3],
				btn_add_G=oInput[4],
				btn_sub_G=oInput[5],
				colorValue_B=oInput[6],
				btn_add_B=oInput[7],
				btn_sub_B=oInput[8],
				colorValue_H=oInput[9],
				btn_add_H=oInput[10],
				btn_sub_H=oInput[11],
				colorValue_S=oInput[12],
				btn_add_S=oInput[13],
				btn_sub_S=oInput[14],
				colorValue_L=oInput[15],
				btn_add_L=oInput[16],
				btn_sub_L=oInput[17],
				txt_colorValue=oInput[18],
				btn_setColor=oInput[19],
				btn_getColor=oInput[20];
			var canvas1=document.querySelector('.can1'),
				canvas2=document.querySelector('.can2'),
				point=document.querySelector('.point'),
				getColor=document.querySelector('#color-value');
			addHandler(window,'load',AutoInit);
			addHandler(canvas1,'click',function (ev) {
				var e=ev||event;
				setInputValue(e);
				point.style.left=e.x+'px';
				point.style.top=e.y+'px';
			});
			addHandler(canvas2,'click',function (ev) {
				var e=ev||event;
				var context2=canvas2.getContext("2d");
				var sliceColor=context2.getImageData(e.x-canvas2.offsetLeft,e.y-canvas2.offsetTop,1,1);
				var colors=sliceColor.data;
				var str='rgb('+colors[0]+','+colors[1]+','+colors[2]+')';
				fillCanvas1(str);
				setInputValue();
			});
			addHandler(btn_setColor,'click',function () {
				fillCanvas1(txt_colorValue.value);
			});
			addHandler(btn_getColor,'click',fnGetColor);
			addHandler(colorValue_R,'change',function () {
				ValueSet_R();
			});
			addHandler(colorValue_G,'change',function () {
				ValueSet_G();
			});
			addHandler(colorValue_B,'change',function () {
				ValueSet_B();
			});
			addHandler(colorValue_H,'change',function () {
				ValueSet_H();
			});
			addHandler(colorValue_S,'change',function () {
				ValueSet_S();
			});
			addHandler(colorValue_L,'change',function () {
				ValueSet_L();
			});				
		}());	

		var canvas1=document.querySelector('.can1'),
			canvas2=document.querySelector('.can2'),
			point=document.querySelector('.point'),
			getColor=document.querySelector('#color-value');
		var oInput=document.querySelectorAll('input'),
				colorValue_R=oInput[0],
				btn_add_R=oInput[1],
				btn_sub_R=oInput[2],
				colorValue_G=oInput[3],
				btn_add_G=oInput[4],
				btn_sub_G=oInput[5],
				colorValue_B=oInput[6],
				btn_add_B=oInput[7],
				btn_sub_B=oInput[8],
				colorValue_H=oInput[9],
				btn_add_H=oInput[10],
				btn_sub_H=oInput[11],
				colorValue_S=oInput[12],
				btn_add_S=oInput[13],
				btn_sub_S=oInput[14],
				colorValue_L=oInput[15],
				btn_add_L=oInput[16],
				btn_sub_L=oInput[17],
				txt_colorValue=oInput[18],
				btn_setColor=oInput[19],
				btn_getColor=oInput[20];		
		function AutoInit() {
			fillCanvas1("rgb(0,255,255)");
			fillCanvas2();
			point.style.left=canvas1.offsetWidth/2+canvas1.offsetLeft+'px';
			point.style.top=canvas1.offsetHeight/2+canvas1.offsetTop+'px';
			setInputValue();
		}
		function fillCanvas1(colour) {
			var context1=canvas1.getContext("2d");
			var gradient1=context1.createLinearGradient(0,0,400,400);
			gradient1.addColorStop(0,'white');
			gradient1.addColorStop(0.5,colour);
			gradient1.addColorStop(0.5,colour);
			gradient1.addColorStop(1,'black');
			context1.fillStyle=gradient1;
			var img=context1.fillRect(0,0,400,450);
		}
		function fillCanvas2() {
			var context2=canvas2.getContext("2d");
			var gradient2=context2.createLinearGradient(0,0,0,400);
			gradient2.addColorStop(0,"red");
			gradient2.addColorStop(0.2,"Yellow");
			gradient2.addColorStop(0.2,"Yellow");
			gradient2.addColorStop(0.4,"LawnGreen");
			gradient2.addColorStop(0.4,"LawnGreen");
			gradient2.addColorStop(0.6,"Aqua");
			gradient2.addColorStop(0.6,"Aqua");
			gradient2.addColorStop(0.8,"MediumBlue");
			gradient2.addColorStop(0.8,"MediumBlue");
			gradient2.addColorStop(1,"VioletRed");
			context2.fillStyle=gradient2;
			context2.fillRect(0,0,20,450);
		}
		function toHSL (obj) {
			var arr=Array.from(obj);
			arr.pop();
			console.log(arr);
			var colors=arr.map(function(elem,index) {
				return elem/255;
			});
			var colors_R=colors[0],
				colors_G=colors[1],
				colors_B=colors[2],
				colors_Min,
				colors_Max,
				del_Max,
				del_R,
				del_G,
				del_B,
				H=0,S=0,L=0;
			colors.sort(function (a,b) {
				return a-b;
			});
			colors_Min=colors[0];
			colors_Max=colors[colors.length-1];
			del_Max=colors_Max-colors_Min;
			L=(colors_Max+colors_Min)/2;
			//求H、S
			if (del_Max==0) {
				H=0;
				S=0;
			}
			else {
				if ( L < 0.5 ) S = del_Max / ( colors_Max + colors_Min );
				else           S = del_Max / ( 2 - colors_Max - colors_Min );

				del_R = ( ( ( colors_Max - colors_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
				del_G = ( ( ( colors_Max - colors_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
				del_B = ( ( ( colors_Max - colors_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

				if      ( colors_R == colors_Max ) H = del_B - del_G;
				else if ( colors_G == colors_Max ) H = ( 1 / 3 ) + del_R - del_B;
				else if ( colors_B == colors_Max ) H = ( 2 / 3 ) + del_G - del_R;
				if ( H < 0 )  H += 1;
				if ( H > 1 )  H -= 1;
			}
			H=H.toFixed(2);
			S=S.toFixed(2);
			L=L.toFixed(2);
			return{H:H,S:S,L:L};
		}

		function setInputValue(e) {
			var context1=canvas1.getContext("2d");
			if(e!=null){
				sliceColor=context1.getImageData(e.x-canvas1.offsetLeft,e.y-canvas1.offsetTop,1,1);
			}
			else{
				sliceColor=context1.getImageData(point.offsetLeft-canvas1.offsetLeft,point.offsetTop-canvas1.offsetTop,1,1);
			}
			colorValue_R.value=sliceColor.data[0];
			colorValue_G.value=sliceColor.data[1];
			colorValue_B.value=sliceColor.data[2];
			var color_HSL=toHSL(sliceColor.data);
			colorValue_H.value=color_HSL.H;
			colorValue_S.value=color_HSL.S;
			colorValue_L.value=color_HSL.L;
		}
		
		function fnGetColor() {
			var context1=canvas1.getContext("2d"),
				x=point.offsetLeft-canvas1.offsetLeft,
				y=point.offsetTop-canvas1.offsetTop;
				sliceColor=context1.getImageData(x,y,1,1),
				R_0x=sliceColor.data[0].toString(16).toUpperCase(),
				G_0x=sliceColor.data[1].toString(16).toUpperCase(),
				B_0x=sliceColor.data[2].toString(16).toUpperCase();
			R_0x.length<2&&(R_0x="0"+R_0x);
			G_0x.length<2&&(G_0x="0"+G_0x);
			B_0x.length<2&&(B_0x="0"+B_0x);
			getColor.innerHTML="颜色值为：RGB("+sliceColor.data[0]+","+
			sliceColor.data[1]+","+sliceColor.data[2]+
			")、HSL("+colorValue_H.value+","+colorValue_H.value+","+
			colorValue_H.value+")、#"+R_0x+G_0x+B_0x;

			console.log(123);
		}

		function ValueSet_R() {
			if(/[\D]/.test(colorValue_R.value)||colorValue_R.value>255||colorValue_R.value<0)
				alert("请输入0-255之间的数字！");
			 else {
			 	var str='rgb('+colorValue_R.value+','+colorValue_G.value+','+colorValue_B.value+')';
				fillCanvas1(str);
			}
		}

		function ValueSet_G() {
			if(/[\D]/.test(colorValue_G.value)||colorValue_G.value>255||colorValue_G.value<0)
				alert("请输入0-255之间的数字！");
			 else {
			 	var str='rgb('+colorValue_R.value+','+colorValue_G.value+','+colorValue_B.value+')';
				fillCanvas1(str);
			}
		}

		function ValueSet_B() {
			if(/[\D]/.test(colorValue_B.value)||colorValue_B.value>255||colorValue_B.value<0)
				alert("请输入0-255之间的数字！");
			 else {
			 	var str='rgb('+colorValue_R.value+','+colorValue_G.value+','+colorValue_B.value+')';
				fillCanvas1(str);
			}
		}


		function ValueSet_H() {
			 	var str='hsl('+colorValue_H.value+','+colorValue_S.value*100+'%'+','+colorValue_L.value*100+'%'+')';
				fillCanvas1(str);
		}

		function ValueSet_S() {
			 	var str='hsl('+colorValue_H.value+','+colorValue_S.value*100+'%'+','+colorValue_L.value*100+'%'+')';
				fillCanvas1(str);
		}

		function ValueSet_L() {
			 	var str='hsl('+colorValue_H.value+','+colorValue_S.value*100+'%'+','+colorValue_L.value*100+'%'+')';
				fillCanvas1(str);
		}
	/*	btn_add_R.onmousedown=function () {
			var timer1=setTimeout(add, 2000);
			function add () {
			var timer2=setInterval(function () {
			console.log(btn_add_R.onmouseup);

				btn_add_R.onmouseup=clearInterval(timer2);
				colorValue_R.value++;
				}, 500);
			}
			btn_add_R.onmouseup==true&&clearInterval(timer1);
			colorValue_R.value++;

		}
	*/
	}());

