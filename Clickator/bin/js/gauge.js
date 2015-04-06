jQuery.noConflict();

$gauge = jQuery('#gauge');

jQuery('input.round').wrap('<div class="round" />').each(function() {
    var $input = jQuery(this);
    var $div = $input.parent();
    var min = $input.data('min');
    var max = $input.data('max');
    
    $input.val(0);    

    $circle = jQuery('<canvas width="200px" height="200px" />');
    $color = jQuery('<canvas width="200px" height="200px" />');
    $div.append($circle);
    $div.append($color);
    var ctx = $circle[0].getContext('2d');

    ctx.beginPath();
    ctx.arc(100,100,85,0,2*Math.PI);
    ctx.lineWidth = 20;
    ctx.shadowOffsetX = 2;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(0,0,0,0.1)";
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
});

jQuery('input.round').change(function() {
    var $input = jQuery(this);
    var $div = $input.parent();
    var min = $input.data('min');
    var max = $input.data('max');
    var ratio = ($input.val() - min) / (max - min);
    
    $color = $div.children('canvas:last');

    var ctx = $color[0].getContext('2d');
    ctx.clearRect(0,0,200,200);
    ctx.beginPath();
    ctx.arc(100,100,85,-1/2 * Math.PI, ratio * 2 * Math.PI - 1/2 * Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
});

(function($){
    var originalVal = $.fn.val;
    $.fn.val = function(){
        var result =originalVal.apply(this,arguments);
        if(arguments.length>0)
            $(this).change();
        return result;
    };
})(jQuery);
