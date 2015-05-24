var moutTue = [];
function CheckHitBox(LeLoup){
	var HMOUTON = 150;
	var LMOUTON = 150;
	
	jQuery.each(jQuery("#gameArea").getLayerGroup("Loups"),function(key,LeMout){
		if (LeLoup.x>(LeMout.x - LMOUTON/2) && LeLoup.x<(LeMout.x+LMOUTON/2) && LeLoup.y>(LeMout.y-HMOUTON/2) && LeLoup.y<(LeMout.y+HMOUTON/2)){
			jQuery('#gameArea').removeLayer(LeMout.name);
			jQuery('#gameArea').removeLayer(LeLoup.name);
			nbMoutons--;
			nbLoup--;
			return;//break like
		}
	});
}

function ModeDifficile(){
	//alert("ici Normal")
	//alert(playTime);
	if (++nbDeSecondesTot>playTime || (nbLoup==0 && generate==1)) {
	    //FIN DE LA PARTIE
	    //alert("ici");
		jQuery("#jeuEnCours").html("Fin de la Partie");
		scoring.update();
		
		if (jQuery("#score").text()<0) {
			setTimeout(function(){speak.play("Votre score est de moins"+jQuery("#score").text()+" points", "fr")},1000);
		}
		else{
			setTimeout(function(){speak.play("Votre score est de "+jQuery("#score").text()+" points", "fr")},1000);
		}
		
		var noms = readCookie("PlayerNames");
		var scores = readCookie("PlayerScores");
		if (noms == null) {
			noms = username + "//";
			scores = jQuery("#score").text() +  "//";
			difficulty = readCookie("Difficulte") + "//";
		} else {
			noms = noms + username +"//";
			scores = scores + jQuery("#score").text() +  "//";
			difficulty = difficulty+ readCookie("Difficulte") + "//";
		}
		createCookie("PlayerNames", noms, 400);
		createCookie("PlayerScores", scores, 400);
		createCookie("Difficulty", difficulty, 400);
		
	    clearInterval(countDownTimer);
	    
	    jQuery("#HSPop").text(jQuery("#score").text());
	    jQuery("#pos-alert").show();
	    var tmpCalcHeight = (heightScreen/2)-(jQuery(".dialogContent").height()/2);
	    jQuery(".dialogContent").css("margin",tmpCalcHeight+"px auto auto");
	    clearInterval(loopGame);
	    setTimeout(function(){jQuery('#gameArea').clearCanvas();},800);
	}
	nbDeSecondesLoup++;
	nbDeSecondes++;
	if (generate==0) {
		generate=1;
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
	}
	if (nbMoutons<2) {
		nbTotMoutons++;
		nbMoutons++;
		xTemp=0;
		yTemp=0;
		var xDroite;
		var yRand;
		if (Math.floor((Math.random() * 2) + 0)==0) {
			xDroite=0
		}
		else{
			xDroite = jQuery("#gameArea").width();
		}
		if (Math.floor((Math.random() * 2) + 0)==0) {
			yRand=jQuery("#gameArea").height();
		}
		else{
			yRand=0;
		}
		
		jQuery('#gameArea').drawImage({
			layer:true,
			groups: ['Moutons'],
			name:'mout'+nbTotMoutons,
			source: 'Image/loup.png',
			scale: 0.35,
			x:xDroite  , y: yRand,
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
	
	var lesLoups = jQuery('#gameArea').getLayerGroup('Moutons');
	
	jQuery.each(lesLoups,function(ind,LeLoup){
		var xTEMP=Math.floor((Math.random() * 100) + 50);
		var yTEMP=Math.floor((Math.random() * 100) + 50);
		
			
		if(LeLoup.x>(jQuery(window).width()/2)){
			xTEMP=-xTEMP;
		}
		if (LeLoup.y>(jQuery(window).height()/2)) {
			yTEMP=-yTEMP;
		}
		
		jQuery('#gameArea').animateLayer(LeLoup.name, {
			x: '+='+xTEMP,
			y: '+='+yTEMP
		});
		
		CheckHitBox(LeLoup);
	});
}