		var oInput=document.querySelectorAll('input'),
			btn_scopeOrder=oInput[0],
			btn_depthOrder=oInput[1],
			btn_scopeSearch=oInput[3],
			btn_depthSearch=oInput[4],
			add_text=oInput[5],
			btn_add=oInput[6],
			btn_delete=oInput[7],
			orderList=[],
			wrap=document.getElementById('wrap'),
			timer=null,
			index=0,
			oSelected=null;

		btn_scopeOrder.onclick=function () {
			reset();
			scopeOrder(wrap);
			render();
		}
		
		btn_depthOrder.onclick=function () {
			reset();
			depthOrder(wrap);
			render();
		}

		btn_scopeSearch.onclick=function(){
		var	find=oInput[2].value.trim();
			reset();
			scopeOrder(wrap);
			render(find,true);
		}

		btn_depthSearch.onclick=function(){
		var	find=oInput[2].value.trim();
			reset();
			depthOrder(wrap);
			render(find,true);
		}

		var scopeOrder=function (ele) {
			if(!(ele==null)){
				orderList.push(ele);
				scopeOrder(ele.nextElementSibling);
				ele=orderList[index++];
				scopeOrder(ele.firstElementChild);	
			}
		}

		var depthOrder=function (ele) {
			if(!(ele==null)){
				orderList.push(ele);
				for (var i = 0; i < ele.children.length; i++) {
					depthOrder(ele.children[i]);
				}
			}
		}

		var render=function (find,searched) {
			console.log(orderList);

			var i=0;
			orderList[i].style.backgroundColor='DarkMagenta';
			timer=setInterval(function () {
				if(i<orderList.length-1){
					i++;
					var	text=orderList[i].innerText.replace(/(^\s*|\s*$)/,"").toLowerCase();

					if (text==find) {
						orderList[i].style.backgroundColor='red';
						clearInterval(timer);
					}
					else{
						orderList[i-1].style.backgroundColor='#EA2EA5';
						orderList[i].style.backgroundColor='DarkMagenta';
					}							
					
				}
				else{
				clearInterval(timer);
				orderList[i].style.backgroundColor='#EA2EA5';
				if (searched) {
					alert("没有找到，请确定您的输入是否有误！");
					}
				}				
			}, 500);
		}

		var reset=function () {
			orderList=[];
			clearInterval(timer);
			index=0;
		var oDiv=wrap.getElementsByTagName('div');
			for (var i = 0; i < oDiv.length; i++) {
				oDiv[i].style.backgroundColor='#EA2EA5';
			}
			wrap.style.backgroundColor='#EA2EA5';
		}