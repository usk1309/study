window.onload = function() {
	var hoge = '4,5,5.0,5.0,0';
	var fuga = hoge.split(',');
	console.log(fuga);
	var aaa = new init("viewArea", fuga);
	var bbb = new init("viewArea2", ["4.7","5.0","5.0","4.3","5.0"]);
	var ccc = new init("viewArea3", [5.0,3.0,4.3,3.7,3.3]);
}


function init(id, param) {
	//変数の定義
	var centerX = 0,
	centerY = 0,
	ctx = null,
	theCanvas = null,
	points = [],
	degs = [270,342,54,126,198], //図形の中心位置からの各点の角度
	dis = param,
	length = degs.length;
	theCanvaslength = null;

	//MVCデザインパターンの宣言
	function View(){};
	function Model(){};

	//視覚の処理を行うオブジェクトのグループ
	View = {
		init : function() {}
	}

	View.init.prototype.draw = function() {
		// チャート描画
		ctx.strokeStyle = "#ffa500";
		ctx.lineWidth = 3;

		ctx.beginPath();
		ctx.moveTo(points[0].x + centerX, points[0].y + centerY);
		for (var i = 0; i < length; i++) {
			ctx.lineTo(points[i].x + centerX, points[i].y + centerY);
		}
		ctx.lineTo(points[0].x + centerX, points[0].y + centerY);
		ctx.stroke();

		// 透過
		ctx.fillStyle = '#ffdead';
		ctx.globalAlpha = 0.6;
		ctx.fill();
	}

	// スケール描画
	View.init.prototype.draw_scale = function() {
		// // 円
		// ctx.strokeStyle = '#808080';
		// ctx.lineWidth = 0.5; 
		// for (var n = 1; n <= length; n++) {
		// 	ctx.beginPath();
		// 	ctx.arc(centerX, centerY, n * 20, 0, Math.PI*2, false);
		// 	ctx.stroke();
		// }

		// 角
		ctx.strokeStyle = '#c0c0c0';
		for (var k = 0; k <= length; k++) {
			ctx.beginPath();
			ctx.moveTo(Math.cos(degs[0] * Math.PI / 180) * k * 20 + centerX, Math.sin(degs[0] * Math.PI / 180) * k * 20 + centerY );
			for (var l = 1; l < length; l++) {
				ctx.lineTo(Math.cos(degs[l] * Math.PI / 180) * k * 20  + centerX, Math.sin(degs[l] * Math.PI / 180) * k * 20  + centerY );
			}
			ctx.lineTo(Math.cos(degs[0] * Math.PI / 180) * k * 20  + centerX, Math.sin(degs[0] * Math.PI / 180) * k * 20  + centerY );
			ctx.stroke();
		}

		// パラメータ
		ctx.beginPath();
		for (var m = 0; m < length; m++) {
			ctx.moveTo(centerX, centerY);
			ctx.lineTo(Math.cos(degs[m] * Math.PI / 180) * 100 + centerX, Math.sin(degs[m] * Math.PI / 180) * 100 + centerY);
		}
		ctx.stroke();
	}

	//ロジックの処理を行うオブジェクトのグループ
	Model = {
		init: function() {}
	}

	Model.init.prototype.ready = function() {
		theCanvas = document.getElementById(id);

		//Canvasの中心座標を取得
		var offsetX = (theCanvas.currentStyle || document.defaultView.getComputedStyle(theCanvas,'')).width;
		offsetX = Number(offsetX.replace('px',''));
		centerX =  offsetX / 2;

		var offsetY = (theCanvas.currentStyle || document.defaultView.getComputedStyle(theCanvas,'')).height;
		offsetY = Number(offsetY.replace('px',''));
		centerY =  offsetY / 2;

		//Canvasタグで2次元描画
		ctx = theCanvas.getContext("2d");

		//各頂点のx座標, y座標を計算、配列に格納
		for (var i = 0; i < length; i++) {
			points[i] = {x:Math.cos(degs[i] * Math.PI / 180) * dis[i] * 20, y:Math.sin(degs[i] * Math.PI / 180) * dis[i] * 20};
		}

	}

	var model = new Model.init();
	model.ready();

	var view = new View.init();
	view.draw_scale();
	view.draw();
}