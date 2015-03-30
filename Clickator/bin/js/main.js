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

setInterval(onTimerTick, 1500); // 1000 milliseconds (loop game)

var nbMoutons=0;
var nbTotMoutons=0;
var nbDeSecondes=0;
function onTimerTick(){
	nbDeSecondes++;
	var xTEMP=Math.floor((Math.random() * 750) + 1);
	var yTEMP=Math.floor((Math.random() * 350) + 1);
	if (nbMoutons<5) {
		nbTotMoutons++;
		nbMoutons++;
		jQuery('#gameArea').drawImage({
			layer:true,
			groups: ['myBoxes'],
			name:'mout'+nbTotMoutons,
			source: 'Image/mouton.png',
			scale: 0.35,
			x:xTEMP  , y: yTEMP,
			click: function(layer){
				var tmp = getPixelColor();
				if (!(tmp[0]==0 && tmp[1]==0 && tmp[2]==0 && tmp[3]==0)) {
					nbDeSecondes=0;//on set le nombre de seconde a 0
					jQuery("#gameArea").removeLayer(layer).drawLayers();
					nbMoutons--;
					scoring.add(500);
				}
			}
		});
		
		var tmpLay = jQuery("#gameArea").getLayer('mout'+nbTotMoutons);
		var tmpWidthMout = tmpLay.width;
		var tmpHeightMout = tmpLay.height;
		tmpLay.width=0;//350
		tmpLay.height=0;//350
		jQuery('#gameArea').animateLayer('mout'+nbTotMoutons, {
			height: '+='+tmpHeightMout,
			width: '+='+tmpWidthMout
		});
	}
	if (nbDeSecondes==2) {
	    var lstMoutons = jQuery("#gameArea").getLayerGroup('myBoxes');
	    /*
	    lstMoutons.forEach(function(entry){
		jQuery("#gameArea").removeLayer(entry).drawLayers();
	    });
	    */
	    var tmpLay2 = jQuery("#gameArea").getLayer(lstMoutons[0]);
	    //alert(tmpLay2.name);
	    tmpLay2.width=350;
	    tmpLay2.height=350;
	    jQuery('#gameArea').animateLayer(tmpLay2.name, {
		    width: '-=350',
		    height: '-=350'
	    });
	    setTimeout(function(){jQuery("#gameArea").removeLayer(lstMoutons[0]).drawLayers();},1000);
	    nbDeSecondes=0;
	    nbMoutons--;
	}
}