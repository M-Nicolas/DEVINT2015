function ModeFacile(){
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