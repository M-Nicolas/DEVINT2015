jQuery.noConflict();

var canvas = document.getElementById('gameArea');
var ctx = canvas.getContext('2d');

var canvasOffset;
var canvasX;
var canvasY;
var imageData;
var pixel;
var pixelColor;
var widthScreen = jQuery(document).width();
var heightScreen = jQuery(document).height();
var scoring = new Score(3);

//alert(widthScreen*0.80);
var tmp = Math.round(widthScreen*0.75);

jQuery(".container").css("width",widthScreen);
jQuery("#gameArea").attr("width",tmp);
jQuery("#gameArea").attr("height",heightScreen*0.90);
jQuery("#ScoreArea").css("height",heightScreen*0.90);
jQuery("#ScoreArea").attr("width",widthScreen*0.15);
jQuery("body").css("padding-top","15px");
    /*Une animation de test
    jQuery('#gameArea').animateLayer('myBox', {
	x: 150, y: 150,
	width: 100, height: 50
      }, 1000, function(layer) {
	// Callback function
	jQuery(this).animateLayer(layer, {
	  fillStyle: 'rgb(204, 51, 51)',
	  x: 250, y: 100,
	  rotate: 360
	}, 'slow', 'swing');
      });
      */

jQuery(document).mousemove(function(e){
    canvasOffset = jQuery("#gameArea").offset();
    canvasX = Math.floor(e.pageX - canvasOffset.left);
    canvasY = Math.floor(e.pageY - canvasOffset.top);
});

function getPixelColor(){
    imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
    pixel = imageData.data;
    //pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
    return pixel;
}


setInterval(onTimerTick, 1000); // 1000 milliseconds (loop game)

var numMouton = 0;

function onTimerTick() {
    numMouton++;
    //for(var i=0;i<10;i++){
	var xTEMP=Math.floor((Math.random() * 750) + 1);
	var yTEMP=Math.floor((Math.random() * 350) + 1);
	jQuery('#gameArea').drawImage({
	    layer:true,
	    name:'mout'+numMouton,
	    source: 'Image/mouton.png',
	    scale: 0.35,
	    x:xTEMP  , y: yTEMP,
	    click: function(layer){
		var tmp = getPixelColor();
		if (!(tmp[0]==0 && tmp[1]==0 && tmp[2]==0 && tmp[3]==0)) {
		    jQuery("#gameArea").removeLayer(layer).drawLayers();
		    //alert("ici");
		    scoring.add(500);
		}
	    }
	});
	
	//jQuery('#gameArea').animateLayer('mout'+numMouton,)
	var tmpLay = jQuery("#gameArea").getLayer('mout'+numMouton);
	var tmpWidthMout = tmpLay.width;
	var tmpHeightMout = tmpLay.height;
	tmpLay.width=0;//350
	tmpLay.height=0;//350
	//alert(tmpLay);
	//tmpLay.animate({left: '250px'});
	jQuery('#gameArea').animateLayer('mout'+numMouton, {
	    height: '+='+tmpHeightMout,
	    width: '+='+tmpWidthMout
	  });
    //}
}