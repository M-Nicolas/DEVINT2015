/**
 * Created by draragar on 4/7/14.
 */
var SelectPlayer = function(){
    "use strict";

    /* singleton */
    if (SelectPlayer.prototype.instance) {
        return SelectPlayer.prototype.instance;
    }
    SelectPlayer.prototype.instance = this;

};
