jQuery.noConflict();

var soundGame;
function lire_son(src) {
	if(soundGame!=null){
		soundGame.pause();
		soundGame.currentTime = 0;
	}
	console.log("lire son");
	soundGame = new Audio(src);
	soundGame.play();
}

function gameSound(i){
	switch (i) {
		case 0:
			lire_son("sounds/game/gun.wav");
			break;
		case 1:
			//alert("ici");
			setTimeout(function(){lire_son("sounds/game/male-sheep.mp3");},450);
			break;
		case 2:
			setTimeout(function(){lire_son("sounds/game/wolfdeath.wav");},450);
			break;
		default:
			lire_son("sounds/game/gun.wav");
			break;
	}
}

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

var canvasWidth = Math.round(widthScreen*0.80);

jQuery(".container").css("width",widthScreen);
jQuery("#gameArea").attr("width",canvasWidth);
jQuery("#gameArea").attr("height",heightScreen);
jQuery("#scoreArea").css("height",heightScreen);
jQuery("#scoreArea").css("width",Math.round(widthScreen*0.20));

jQuery(document).mousemove(function(e){
    canvasOffset = jQuery("#gameArea").offset();
    canvasX = Math.floor(e.pageX - canvasOffset.left);
    canvasY = Math.floor(e.pageY - canvasOffset.top);
});

function getPixelColor(){
    imageData = new Image();
    imageData.crossOrigin = 'anonymous';
    imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
    pixel = imageData.data;
    //pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
    return pixel;
}

var loopGame = setInterval(onTimerTick, 1500); // en milliseconds (loop game)

var nbMoutons=0;
var nbTotMoutons=0;
var nbDeSecondes=0;
var nbDeSecondesTot=0;
var nbLoup=0;
var nbTotLoups=0;
var nbDeSecondesLoup=0;

function onTimerTick(){
	if (++nbDeSecondesTot>40) {
	    //alert('fin du jeu');
		jQuery("#pos-alert").show();
	    clearInterval(loopGame);
		setTimeout(function(){jQuery('#gameArea').removeLayers()},500);
	}
	nbDeSecondesLoup++;
	nbDeSecondes++;
	var xTEMP=Math.floor((Math.random() * 750) + 1)+50;
	var yTEMP=Math.floor((Math.random() * 350) + 1)+50;
	if (nbLoup<1) {
	    var xTEMPLoup=Math.floor((Math.random() * 750) + 1)+50;
	    var yTEMPLoup=Math.floor((Math.random() * 350) + 1)+50;
	    nbLoup++;
	    nbTotLoups++;
	    jQuery('#gameArea').drawImage({
		    layer:true,
		    groups: ['Loups'],
		    name:'loup'+nbTotLoups,
		    source: 'Image/mouton.png',
		    scale: 0.35,
		    x:xTEMPLoup  , y: yTEMPLoup,
		    click: function(layer){
			    var tmp = getPixelColor();
			    if (!(tmp[0]==0 && tmp[1]==0 && tmp[2]==0 && tmp[3]==0)) {
					gameSound(1);
				    nbDeSecondesLoup=0;//on set le nombre de seconde a 0
				    jQuery("#gameArea").removeLayer(layer).drawLayers();
				    nbLoup--;
				    scoring.substract(500);
			    }
		    }
	    });
	    
	    var tmpl = jQuery("#gameArea").getLayer('loup'+nbTotLoups);
	    var tmpWidthMout = tmpl.width;
	    var tmpHeightMout = tmpl.height;
	    tmpl.width=0;//350
	    tmpl.height=0;//350
	    
	    setTimeout(function(){
		jQuery('#gameArea').animateLayer('loup'+nbTotLoups, {
			height: '+='+tmpHeightMout,
			width: '+='+tmpWidthMout
		});
	    },10);
	}
	if (nbMoutons<5) {
		nbTotMoutons++;
		nbMoutons++;
		jQuery('#gameArea').drawImage({
			layer:true,
			groups: ['Moutons'],
			name:'mout'+nbTotMoutons,
			source: 'Image/loup.png',
			scale: 0.35,
			x:xTEMP  , y: yTEMP,
			click: function(layer){
				var tmp = getPixelColor();
				if (!(tmp[0]==0 && tmp[1]==0 && tmp[2]==0 && tmp[3]==0)) {
					gameSound(2);
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
	
	
	if (nbDeSecondesLoup%3==0) {
		var lstLoups = jQuery("#gameArea").getLayerGroup('Loups');
		var tmpLoup = jQuery("#gameArea").getLayer(lstLoups[0]);
		tmpLoup.width=350;
	    tmpLoup.height=350;
	    jQuery('#gameArea').animateLayer(tmpLoup.name, {
		    width: '-=350',
		    height: '-=350'
	    });
	    setTimeout(function(){jQuery("#gameArea").removeLayer(lstLoups[0]).drawLayers()},700);
		nbLoup--;
	}
	
	if (nbDeSecondes==2) {
	    var lstMoutons = jQuery("#gameArea").getLayerGroup('Moutons');
	    var tmpLay2 = jQuery("#gameArea").getLayer(lstMoutons[0]);
	    
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

jQuery("#gameArea").click(function(){
	gameSound(0);
});
