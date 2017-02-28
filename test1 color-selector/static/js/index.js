/*

刚刚补完这个。
学习了一点canvas和rgb、hsl的知识。
js这块感觉太长了。有点想封装一下，等刷完题目再写。

用的是canvas套路写的，获取rgb或者hsl来更新canvas。

另外用到的是张鑫旭老师的转换函数。
by zhangxinxu from http://www.zhangxinxu.com
 */


//square
var c =document.getElementById('index');
var ctx1= c.getContext("2d");
//绘制原canvas。
var grdc = ctx1.createLinearGradient(0, 0, 500, 0);
grdc.addColorStop(0, "black");
grdc.addColorStop(0.5, "red");
grdc.addColorStop(1, "white");
ctx1.fillStyle=grdc;
ctx1.fillRect(0, 0, 500, 500);

//点击
$(c).click(function(e){
	//获取点击在canvas里的那个像素。
	var cOffset = $(c).offset();
	var cX = Math.floor(e.pageX - cOffset.left);
	var cY = Math.floor(e.pageY - cOffset.top);
	var getData = ctx1.getImageData(cX, cY, 1, 1);
	//获得像素的rgba。
	var  cPx = getData.data;
	var hsl =rgbToHsl(cPx[0], cPx[1], cPx[2]);
	//去除小数保留两位。
	for(var i=0; i<hsl.length; i++) {
		hsl[i]=hsl[i].toFixed(2);
	};
	//赋值给input。
	$('.r').val(cPx[0]);
	$('.g').val(cPx[1]);
	$('.b').val(cPx[2]);
	$('.h').val(hsl[0]);
	$('.s').val(hsl[1]);
	$('.l').val(hsl[2]);

})
//tail

var b = document.getElementById('index2');
var ctx2= b.getContext("2d");
//绘制原canvas。
var grdb = ctx2.createLinearGradient(0, 0, 300, 0);
grdb.addColorStop(0, "red");
grdb.addColorStop(0.2, "orange");
grdb.addColorStop(0.3, "Yellow");
grdb.addColorStop(0.4, "green");
grdb.addColorStop(0.6, "blue");
grdb.addColorStop(0.8, "purple");
grdb.addColorStop(0.9, "Fuchsia ");
grdb.addColorStop(1, "red");

ctx2.fillStyle=grdb;
ctx2.fillRect(0, 0, 300, 25);

//点击
$(b).click(function(e){
	//获取点击在canvas里的那个像素。
	var bOffset = $(b).offset();
	var bX = Math.floor(e.pageX - bOffset.left);
	var bY = Math.floor(e.pageY - bOffset.top);
	var getBData = ctx2.getImageData(bY, bX, 1, 1);
	//获取rgba。
	var px2 = getBData.data;
	//colorHex() 是转换16进制的函数  需要值以"RGB(r, g, b)" 这样的形式。
	var bRGB = "RGB("+px2[0]+","+px2[1]+","+px2[2]+")"
	var bColor= bRGB.colorHex();
	//转换hsl值。
	var bHsl=rgbToHsl(px2[0], px2[1], px2[2]);
	//重新绘图。
	var grd=ctx1.createLinearGradient(0, 0, 500, 0);
	grd.addColorStop(0, "black");
	grd.addColorStop(0.5, bColor);
	grd.addColorStop(1, "white");
	ctx1.fillStyle=grd;
	ctx1.fillRect(0, 0, 500, 500);
	//去除小数保留两位。
	for(var i=0; i<bHsl.length; i++) {
		bHsl[i]=bHsl[i].toFixed(2);
	}
	//赋值。
	$('.r').val(px2[0]);
	$('.g').val(px2[1]);
	$('.b').val(px2[2]);
	$('.h').val(bHsl[0]);
	$('.s').val(bHsl[1]);
	$('.l').val(bHsl[2]);
})


//input
//改动rgb的input来改变选择器。
$("input:lt(3)").change(function() {
	var arrColor=[];
	//循环所有前三个rgb的input 把值推到arrColor中。
	$(":input:lt(3)").each(function() {
		if($(this).val()> 255 || $(this).val() <0) {
			alert('请输入0-255之间的数字！！');
			$(this).val('0');
		}
		arrColor.push($(this).val())
	});

	//colorHex() 是转换16进制的函数  需要值以"RGB(r, g, b)" 这样的形式。
	var rgb = "RGB("+arrColor[0]+','+arrColor[1]+','+arrColor[2]+")";
	var colorRgb =rgb.colorHex();
	//重新绘图。
	var grd=ctx1.createLinearGradient(0, 0, 500, 0);
	grd.addColorStop(0, "black");		
	grd.addColorStop(0.5, colorRgb);
	grd.addColorStop(1, "white");

	ctx1.fillStyle=grd;
	ctx1.fillRect(0, 0, 500, 500);
	//转换hsl值并赋值。
	var hsl =rgbToHsl(arrColor[0], arrColor[1], arrColor[2]);
	$('.h').val(hsl[0]);
	$('.s').val(hsl[1]);
	$('.l').val(hsl[2]);

})
//改动hsl的input来改变选择器。
$("input:gt(2)").change(function() {
	var arrColor = [];
	//循环所有前三个rgb的input 把值推到arrColor中。
	$("input:gt(2)").each(function() {
		if ($(this).val() >1 || $(this).val()< 0 ) {
			alert('请输入0-1之间的数字！！');
			$(this).val('0');
		};

		arrColor.push($(this).val())
	})
	//去除小数保留两位。
	for(var i=0; i<arrColor.length; i++) {
		arrColor[i]=parseFloat(arrColor[i]);
	}
	//hsl转为rgb hslToRgb(h, s, l)。
	var color =hslToRgb(arrColor[0], arrColor[1], arrColor[2]);
	var rgb = "RGB("+color[0]+","+color[1]+","+color[2]+")";
	//转为16进制。
	var color16 = rgb.colorHex();
	//重新绘图。
	var grd =ctx1.createLinearGradient(0, 0, 500, 0);
	grd.addColorStop(0, 'black');
	grd.addColorStop(0.5, color16);
	grd.addColorStop(1, 'white');
	ctx1.fillStyle=grd;
	ctx1.fillRect(0, 0, 500, 500);
	//赋值
	$('.r').val(color[0]);
	$('.g').val(color[1]);
	$('.b').val(color[2]);
})



