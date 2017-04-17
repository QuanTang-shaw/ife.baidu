(function (){
		var WIDTH;
		var HEIGHT;
		var btn=document.getElementById('btn');
		var chess=(function () {
			function ct_ChessBoard (chessBox,parameter) {
				var oFragment=document.createDocumentFragment();
				var pieceBox;
				for(var j = 0; j < parameter.y; j++){
				 	for(var k = 0; k < parameter.x; k++){
				 		pieceBox=document.createElement('div');
				 		pieceBox.className='pieceBox';
				 		if(k==parameter.x-1){
				 			pieceBox.className+=' right-border';
				 		}
				 		if (k==0&&j!=0) {
				 			pieceBox.style.clear='both';
				 		}
				 		if (j==parameter.y-1) {
				 			pieceBox.className+=' bottom-border';
				 		}
				 		oFragment.appendChild(pieceBox);
				 	}
				 } 
				 chessBox.appendChild(oFragment);
				 WIDTH=pieceBox.offsetWidth;
				 HEIGHT=pieceBox.offsetHeight;
				 chessBox.style.width=WIDTH*parameter.x+parameter.x-1+'px';
				 chessBox.style.height=HEIGHT*parameter.y+parameter.x-1+'px';
				 return ct_piece (chessBox,parameter);
			};

			function ct_piece (chessBox,parameter) {
				var lp=Math.floor(Math.random()*parameter.x+0);
				var tp=Math.floor(Math.random()*parameter.y+0);
				var piece=document.createElement('div');
				piece.className='piece';
				piece.style.left=lp*(WIDTH+1)+2+'px';
				piece.style.top=tp*(HEIGHT+1)+2+'px';
				chessBox.appendChild(piece);
				return{
					piece:piece,
					x:lp,
					y:tp,
					turn:0,
					rotate:0
				}
			};
			return(function () {
				var pos=ct_ChessBoard(document.getElementById('box'),{x:10,y:10});
				function move (to) {
					var dir=to||pos.turn;
					if(dir===0){
						pos.y>0&&pos.y--;
					}
					if(dir==1){
						pos.x<9&&pos.x++;
					}
					if(dir==2){
						pos.x>0&&pos.x--;
					}
					if(dir==3){
						pos.y<9&&pos.y++;
					}
					pos.piece.style.left=pos.x*(WIDTH+1)+2+'px';
					pos.piece.style.top=pos.y*(HEIGHT+1)+2+'px';
				}
				function turn (type) {
					if (type==1) {
						pos.rotate+=90;
					}
					else if (type==2) {
						pos.rotate-=90;
					}
					else if (type==3) {
						pos.rotate+=180;
					}
					pos.piece.style.transform='rotate('+pos.rotate+'deg)';
				}
				return{
					move:move,
					turn:turn
				}	
			}());
		}());
		var handler={
			'GO':function () {
				chess.move();
			},
			'TUN LEF':function () {
				chess.turn(2);
			},
			'TUN RIG':function () {
				chess.turn(1);
			},
			'TUN BAC':function () {
				chess.turn(3);
			}
		};

		btn.addEventListener( 'click', function () {
			var text=document.getElementById('text').value.trim().toUpperCase();
			handler[text]&&handler[text]();
		})
	}());