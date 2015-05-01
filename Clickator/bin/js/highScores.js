function compare(x, y) {
    return y[0] - x[0];
}

var temporaryUserName = readCookie("PlayerNames");
var temporaryUserScore = readCookie("PlayerScores");

$(".table").append("<tr><td>Noms</td><td>Score</td></tr>");

if (temporaryUserName!=null && temporaryUserScore!=null) {
    temporaryUserName = temporaryUserName.split("//");
    temporaryUserScore = temporaryUserScore.split("//");
    
    temporaryUserScore.splice(temporaryUserScore.length-1,1);
    temporaryUserName.splice(temporaryUserName.length-1,1);

    var TabTot = new Array();
    for(var i=0;i<temporaryUserName.length;i++){
        TabTot[i] = [temporaryUserScore[i],temporaryUserName[i]]
    }
    TabTot.sort(compare);
    
    for(var j=0;j<TabTot.length;j++){
        $(".table").append("<tr><td>"+TabTot[j][1]+"</td><td>"+TabTot[j][0]+"</td></tr>");
    }
}