jQuery.noConflict();

jQuery("#pos-alertUser").show();
jQuery(".btnOKPlayerName").click(function(){
	var username=jQuery('.PlayerName').val();
	jQuery("#pos-alertUser").hide();
});

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
		    var randDogSoun = Math.floor((Math.random() * 4)+1);
			switch(randDogSoun){
			    case 1:lire_son("sounds/game/dog.wav");break;
			    case 2:lire_son("sounds/game/Dog2.wav");break;
			    case 3:lire_son("sounds/game/Dog3.wav");break;
			    case 4:lire_son("sounds/game/Dog4.wav");break;
			    default:lire_son("sounds/game/dog.wav");break;
			}
			break;
		case 1:
		    var randSheepSoun = Math.floor((Math.random() * 4)+1);
		    setTimeout(function(){
			switch(randSheepSoun){
			    case 1:lire_son("sounds/game/male-sheep.mp3");break;
			    case 2:lire_son("sounds/game/sheep2.wav");break;
			    case 3:lire_son("sounds/game/sheep3.wav");break;
			    case 4:lire_son("sounds/game/sheep4.wav");break;
			    default:lire_son("sounds/game/male-sheep.mp3");break;
			}
		    },450);
		    break;
		case 2:
			var randWolfSoun = Math.floor((Math.random() * 5)+1);
			setTimeout(function(){
			    switch(randWolfSoun){
				case 1:lire_son("sounds/game/wolfdeath.wav");break;
				case 2:lire_son("sounds/game/wolfdeath2.wav");break;
				case 3:lire_son("sounds/game/wolfdeath3.wav");break;
				case 4:lire_son("sounds/game/wolfdeath4.wav");break;
				case 5:lire_son("sounds/game/wolfdeath5.wav");break;
				default:lire_son("sounds/game/wolfdeath.wav");break;
			    }
			},450);
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
var countDownTimer;
var loopGame;
jQuery("body").keydown(function(e){
    if (e.keyCode==13) {
	e.preventDefault();
	countDownTimer = setInterval(function() {
	    var seconds = $gauge.val();
	    seconds--;
	    $gauge.val(seconds);
	}, 1000);
	loopGame = setInterval(onTimerTick, 1000); // en milliseconds (loop game)
    }
    if (e.keyCode==114) {
	e.preventDefault();
	var colorBack = jQuery("#gameArea").css("background-color");
	if(colorBack=="rgb(104, 183, 91)"){
	    jQuery("#gameArea").css("background-color","#FFBE93");
	}
	else if (colorBack=="rgb(255, 190, 147)") {
	    jQuery("#gameArea").css("background-color","#ADB9FF");
	}
	else if (colorBack=="rgb(173, 185, 255)") {
	    jQuery("#gameArea").css("background-color","#68B75B");
	}
    }
    
});
var nbMoutons=0;
var nbTotMoutons=0;
var nbDeSecondes=0;
var nbDeSecondesTot=0;
var nbLoup=0;
var nbTotLoups=0;
var nbDeSecondesLoup=0;
var playTime = 30; // Temps de jeu en secondes
var scoreAdd=5;
var generate=0;
var nbLoup=0;
function onTimerTick(){
	//alert(playTime);
	if (++nbDeSecondesTot>playTime || (nbLoup==0 && generate==1)) {
	    //FIN DE LA PARTIE
	    //alert("ici");	
	    clearInterval(countDownTimer);
	    scoring.update();
	    jQuery("#HSPop").text(jQuery("#score").text());
	    jQuery("#pos-alert").show();
	    var tmpCalcHeight = (heightScreen/2)-(jQuery(".dialogContent").height()/2);
	    jQuery(".dialogContent").css("margin",tmpCalcHeight+"px auto auto");
	    clearInterval(loopGame);
	    setTimeout(function(){jQuery('#gameArea').clearCanvas();},800);
		
		var noms = readCookie("PlayerNames");
		var scores = readCookie("PlayerScores");
		if (noms == null) {
			noms = username + "//";
			scores = jQuery("#score").text() +  "//";
		} else {
			noms = noms + username +"//";
			scores = scores + jQuery("#score").text() +  "//";
		}
		createCookie("PlayerNames", noms, 400);
		createCookie("PlayerScores", scores, 400);
	}
	nbDeSecondesLoup++;
	nbDeSecondes++;
	var xTEMP=Math.floor((Math.random() * (canvasWidth-100)) + 1)+50;
	var yTEMP=Math.floor((Math.random() * (heightScreen-100)) + 1)+50;
	if (generate==0) {
		generate=1;
	    //var xTEMPLoup=Math.floor((Math.random() * (canvasWidth-100)) + 1)+50;
	    //var yTEMPLoup=Math.floor((Math.random() * (heightScreen-100)) + 1)+50;
		for(var deb=0;deb<5;deb++){
			nbLoup++;
			nbTotLoups++;
			jQuery('#gameArea').drawImage({
				layer:true,
				groups: ['Loups'],
				name:'loup'+nbTotLoups,
				source: 'Image/mouton.png',
				scale: 0.35,
				x:((widthScreen/2)-250)+(deb*60)  , y: ((heightScreen/2)-40)+(deb*10),
				click: function(layer){
					var tmp = getPixelColor();
					if (!(tmp[0]==0 && tmp[1]==0 && tmp[2]==0 && tmp[3]==0)) {
						gameSound(1);
						nbDeSecondesLoup=0;//on set le nombre de seconde a 0
						jQuery("#gameArea").removeLayer(layer).drawLayers();
						nbLoup--;
						scoring.substract(scoreAdd);
					}
				}
			});
		}
	    /*
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
	    },10);*/
	}
	if (nbMoutons<5) {
		nbTotMoutons++;
		nbMoutons++;
		var ok=0;
		while(ok==0){
			if (xTEMP>((widthScreen/2)-250) && xTEMP<((widthScreen/2)-250)+(4*60)+150) {
				if (yTEMP > ((heightScreen/2)-40)-50 && yTEMP < (heightScreen/2)+50) {
					xTEMP=Math.floor((Math.random() * (canvasWidth-100)) + 1)+50;
					yTEMP=Math.floor((Math.random() * (heightScreen-100)) + 1)+50;
				}
				else{
					ok=1;
				}
			}
			else{
				ok=1;
			}
		}
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
					scoring.add(scoreAdd);
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
	
	/*
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
	}*/
	
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