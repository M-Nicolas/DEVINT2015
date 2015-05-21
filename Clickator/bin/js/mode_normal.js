function ModeNormal(){
	//alert("ici Normal")
	//alert(playTime);
	if (++nbDeSecondesTot>playTime || (nbLoup==0 && generate==1)) {
	    //FIN DE LA PARTIE
	    //alert("ici");
		jQuery("#jeuEnCours").html("Fin de la Partie");
		scoring.update();
		
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
		
		//alert(noms+" "+scores+" "+difficulty);
		
		
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
	if (nbMoutons<1) {
		nbTotMoutons++;
		nbMoutons++;
		/*var ok=0;
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
		}*/
		xTemp=0;
		yTemp=0;
		jQuery('#gameArea').drawImage({
			layer:true,
			groups: ['Moutons'],
			name:'mout'+nbTotMoutons,
			source: 'Image/loup.png',
			scale: 0.35,
			x:0  , y: 0,
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
	
	var HMOUTON = 150;
	var LMOUTON = 150;
	var XMOUTON = jQuery('#gameArea').getLayer("loup1").x;
	var YMOUTON = jQuery('#gameArea').getLayer("loup1").y;
		
	var xTEMP=Math.floor((Math.random() * 100) + 1);
	var yTEMP=Math.floor((Math.random() * 100) + 1);
	//alert("XTEMP : "+xTEMP);
	//alert(jQuery('#gameArea').getLayer('mout1').y);
	
	//alert("H : "+HMOUTON+"  L: "+LMOUTON);
	var LeLoup = jQuery('#gameArea').getLayer('mout1');
	if (LeLoup.x>(XMOUTON - LMOUTON/2) && LeLoup.x<(XMOUTON+LMOUTON/2) && LeLoup.y>(YMOUTON-HMOUTON/2) && LeLoup.y<(YMOUTON+HMOUTON/2)) {
		alert("MANGE");
	}
	if(jQuery('#gameArea').getLayer('mout1').x>(jQuery(window).width()/2)){
		xTEMP=-xTEMP;
	}
	if (jQuery('#gameArea').getLayer('mout1').y>(jQuery(window).height()/2)) {
		yTEMP=-yTEMP;
	}
	//alert("XTEMP : "+xTEMP);
	jQuery('#gameArea').animateLayer('mout1', {
		x: '+='+xTEMP,
		y: '+='+yTEMP
	});
	/*
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
	}*/
}