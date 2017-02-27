
//square
var c =document.getElementById('index');
var ctx1= c.getContext("2d");

var grd = ctx1.createLinearGradient(0, 0, 500, 0);
grd.addColorStop(0, "black");
grd.addColorStop(0.5, "red");
grd.addColorStop(1, "white");
ctx1.fillStyle=grd;
ctx1.fillRect(0, 0, 500, 500);

$(c).click(function(e){
	var canvasOffset = $(c).offset();
	var canvasX = Math.floor(e.pageX - canvasOffset.left);
	var canvasY = Math.floor(e.pageY - canvasOffset.top);
	var getData = ctx1.getImageData(canvasX, canvasY, 1, 1);
	var px1 = getData.data;

	var hsl =rgbToHsl(px1[0], px1[1], px1[2]);

	$('.r').val(px1[0]);
	$('.g').val(px1[1]);
	$('.b').val(px1[2]);
	$('.h').val(hsl[0]);
	$('.s').val(hsl[1]);
	$('.l').val(hsl[2]);

})
//tail

var b = document.getElementById('index2');
var ctx2= b.getContext("2d");

var grd = ctx2.createLinearGradient(0, 0, 300, 0);
grd.addColorStop(0, "red");
grd.addColorStop(0.2, "orange");
grd.addColorStop(0.3, "Yellow");
grd.addColorStop(0.4, "green");
grd.addColorStop(0.6, "blue");
grd.addColorStop(0.8, "purple");
grd.addColorStop(0.9, "Fuchsia ");
grd.addColorStop(1, "red");

ctx2.fillStyle=grd;
ctx2.fillRect(0, 0, 300, 25);

$(b).click(function(e){
	var bOffset = $(b).offset();
	var bX = Math.floor(e.pageX - bOffset.left);
	var bY = Math.floor(e.pageY - bOffset.top);
	var getB = ctx2.getImageData(bY, bX, 1, 1);
	var px2 = getB.data;
	var bRGB = "RGB("+px2[0]+","+px2[1]+","+px2[2]+")"
	var bColor= bRGB.colorHex();
	var bHsl=rgbToHsl(px2[0], px2[1], px2[2]);
	console.log(px2)
	var grd=ctx1.createLinearGradient(0, 0, 500, 0);
	grd.addColorStop(0, "black");
	grd.addColorStop(0.5, bColor);
	grd.addColorStop(1, "white");
	ctx1.fillStyle=grd;
	ctx1.fillRect(0, 0, 500, 500);

	$('.r').val(px2[0]);
	$('.g').val(px2[1]);
	$('.b').val(px2[2]);
	$('.h').val(bHsl[0]);
	$('.s').val(bHsl[1]);
	$('.l').val(bHsl[2]);
})


//input

$("input:lt(3)").change(function() {
	var arrColor=[];
	
	$(":input:lt(3)").each(function() {
		if($(this).val()> 255 || $(this).val() <0) {
			alert('请输入0-255之间的数字！！');
			$(this).val('0');
		}
		arrColor.push($(this).val())
	});

	
	var color = "RGB("+arrColor[0]+','+arrColor[1]+','+arrColor[2]+")";
	var grd=ctx1.createLinearGradient(0, 0, 500, 0);
	grd.addColorStop(0, "black");
	
	var colorRgb =color.colorHex();
	grd.addColorStop(0.5, colorRgb);
	grd.addColorStop(1, "white");
	ctx1.fillStyle=grd;
	ctx1.fillRect(0, 0, 500, 500);
	var hsl =rgbToHsl(arrColor[0], arrColor[1], arrColor[2]);
	$('.h').val(hsl[0]);
	$('.s').val(hsl[1]);
	$('.l').val(hsl[2]);

})

$("input:gt(2)").change(function() {
	var arrColor=[];
	
	$("input:gt(2)").each(function() {
		if($(this).val()> 1  || $(this).val() <0) {
			alert('请输入0-1之间的数字！！');
			$(this).val('0');
		}
		arrColor.push($(this).val())
	});

	arrColor[2] =String(Number(arrColor[2].match(/^\d+(?:\.\d{0,2})?/)));
	var rgb = hslToRgb(arrColor[0],arrColor[1],arrColor[2]);

	var color = "RGB("+rgb[0]+","+rgb[1]+","+rgb[2]+")";

	var color16 =color.colorHex();
	console.log('rgb:'+rgb)
	console.log('color:'+color)
	console.log('color16:'+color16) 

	var grd=ctx1.createLinearGradient(0, 0, 500, 0);
	grd.addColorStop(0, "black");
	grd.addColorStop(0.5, color16);
	grd.addColorStop(1, "white");
	ctx1.fillStyle=grd;
	ctx1.fillRect(0, 0, 500, 500);
	var hsl =rgbToHsl(arrColor[0], arrColor[1], arrColor[2]);
	$('.r').val(rgb[0]);
	$('.g').val(rgb[1]);
	$('.b').val(rgb[2]);

	


})



function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}