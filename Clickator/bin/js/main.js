jQuery.noConflict();
var Main = function () {
    'use strict';
    alert("ici");
    //ICI TEST CANVAS
    jQuery('#gameArea').drawArc({
	//draggable: true, //Pour dire si l'élément est drag and droppable
	layer:true,
	name:'myBox',
	x: 160, y: 100,
	fillStyle: 'rgb(204, 51, 51)',
	radius: 50,
	width: 0, height: 0,
	click: function(layer){jQuery(this).css({"display":"none"});}
    });
    //jQuery(tmp).css({"display":"none"});
    //alert(tmp);
    jQuery("body").click(function(){
	
	/*Une animation de test*/
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
    });
    /*TODO faire le main du jeu*/
};
var main = new Main();
main.launchGame();
