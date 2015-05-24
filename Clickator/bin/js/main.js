jQuery.noConflict();

function containsInArr(arr,elem){
   for (var i in arr){
       if (arr[i] == elem) return true;
   }
   return false;
}



var difficulty = readCookie("Difficulty");
var DifficulteEnCours = readCookie("Difficulte");
//alert(difficulty);
var listName = readCookie("PlayerNames");
var idDog = readCookie("Dog");
selectionnerChien(idDog);
if (listName!=null) {
    listName = listName.split("/");
    var nomdejainscrit = [];
    jQuery.each(listName,function(ind,val){
	if (val!='' && !(containsInArr(nomdejainscrit,val))) {
	    nomdejainscrit.push(val);
	    jQuery("#selectNamePlayer").append("<option>"+val+"</option>");
	}
    });
}

var username='';
jQuery("#pos-alertUser").show();
jQuery(".btnOKPlayerName").click(function(){
    if (jQuery('.PlayerName').val()!='') {
	username=jQuery('.PlayerName').val();
    }
    if(jQuery("#selectNamePlayer").find(":selected").text()!=''){
	username=jQuery("#selectNamePlayer").find(":selected").text();
    }
    //alert(username);
    if (username!='') {
	jQuery("#pos-alertUser").hide();    
    }
    else{
	alert("Veuillez rentrer votre nom s'il vous plait ou choisissez le dans la liste");
    }
    lire_son("sounds/menu/explications_jeu.ogg");
});

function selectionnerChien(id) {
    if (id == 1) {
	    jQuery(".cadreChien1").css( "border", '3px solid red' );
	    jQuery(".cadreChien2").css( "border", "none" );
	    jQuery(".cadreChien3").css( "border", "none" );
	    jQuery(".cadreChien4").css( "border", "none" );
	    jQuery("#gameArea").css("cursor", "url(Image/curseur.png) 64 64, default");
    }
	    else if (id == 2) {
	    jQuery(".cadreChien1").css( "border", "none" );
	    jQuery(".cadreChien2").css( "border", "3px solid red" );
	    jQuery(".cadreChien3").css( "border", "none" );
	    jQuery(".cadreChien4").css( "border", "none" );
	    jQuery("#gameArea").css("cursor", "url(Image/dogmin.png) 64 64, default");
    }
	    else if (id == 3) {
	    jQuery(".cadreChien1").css( "border", "none" );
	    jQuery(".cadreChien2").css( "border", "none" );
	    jQuery(".cadreChien3").css( "border", "3px solid red" );
	    jQuery(".cadreChien4").css( "border", "none" );
	    jQuery("#gameArea").css("cursor", "url(Image/dog2min.png) 64 64, default");
    }
	    else if (id == 4) {
	    jQuery(".cadreChien1").css( "border", "none" );
	    jQuery(".cadreChien2").css( "border", "none" );
	    jQuery(".cadreChien3").css( "border", "none" );
	    jQuery(".cadreChien4").css( "border", "3px solid red" );
	    jQuery("#gameArea").css("cursor", "url(Image/dog3min.png) 64 64, default");
    }
    else {
	    id = 0;
    }
    createCookie("Dog", id, 400);
}

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
var enCours = 0;
jQuery("body").keydown(function(e){
    if (e.keyCode==32) {
	soundGame.pause();
		if (enCours==0 && jQuery("#pos-alertUser").css("display")=="none") {
			jQuery("#jeuEnCours").html("Jeu en cours ...");
			enCours=1;
			e.preventDefault();
			countDownTimer = setInterval(function() {
				var seconds = $gauge.val();
				if (seconds>0) {
				    seconds--;
				}
				$gauge.val(seconds);
			}, 1000);
			switch(DifficulteEnCours){
				case "facile":
					loopGame = setInterval(ModeFacile, 1000); // en milliseconds (loop game)
				break;
				case "normal":
					loopGame = setInterval(ModeNormal, 1000);
					break;
				case "difficile":
					loopGame = setInterval(ModeDifficile, 1000);
					break;
				default:
					loopGame = setInterval(ModeFacile, 1000);
					break;
			}
		}
    }
    if (e.keyCode==114) {
	e.preventDefault();
	var colorBack = jQuery("#gameArea").css("background-color");
	//alert(colorBack);
	if(colorBack=="rgb(104, 183, 91)"){
	    jQuery("#gameArea").css("background-color","#FFBE93");
	}
	else if (colorBack=="rgb(255, 190, 147)") {
	    jQuery("#gameArea").css("background-color","#ADB9FF");
	}
	else if (colorBack=="rgb(173, 185, 255)") {
	    jQuery("#gameArea").css("background-color","#FFFFFF");
	}
	else if (colorBack=="rgb(255, 255, 255)") {
	    jQuery("#gameArea").css("background-color","#000000");
	}
	else if (colorBack=="rgb(0, 0, 0)") {
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
var playTime = 60; // Temps de jeu en secondes
var scoreAdd=5;
var generate=0;
var nbLoup=0;

jQuery("#gameArea").click(function(){
	gameSound(0);
});