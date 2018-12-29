var cat = null;
var numTeams = null;
var teamTurn = 1;
var items = ["Italy", "Germany", "Costa Rica", "Philippines", "Australia", "Cuba", "Kenya"];
var gameOn = false;
var teams = [];
var displayItem = "READY???"
var index = null;
var correctArray = [];
var scores = [];
var correctAnswers = {}
var skipped = [];

$(document).ready(function () {
   
// XXXXXXXXXXXXXXXXXXXXXX SETUP XXXXXXXXXXXXXXXXXXXXXXXXX
    $("#addBtn").on("click", function(){
        var item = $("#items").val();
        if(item === ""){
            console.log("empty");
        }
        else{
            items.push(item);
            console.log(items);
        };
        $("#numItems").text(items.length);
        $("#items").val("");
    });

    $("#finishBtn").on("click", function(){
        if ($('input[name="options"]:checked').val() === undefined) {
            $("#finishWarning").text("Please choose number of teams...")
        } else {
            gameOn = true;
            $("#beginBtn").prop('disabled', false);
            numTeams = parseInt(document.querySelector('input[name="options"]:checked').value,10);
        };

        $("#tableAdd").text("");
        for (var i=1; i <= numTeams; i++){
            teams.push(i);
            $("#tableAdd").append("<tr><td>" + i + "</td><td id='team" + i + "Score'></td></tr>")
            scores[i-1] = 0;
            correctAnswers[i-1] = [];
        }
    });

    function whosTurn() {
        teamTurn++;
        if (teamTurn === Number(numTeams) + 1){
            teamTurn = 1;
        }
        console.log("HELLO");
        $("#whosTurn").text("Team " + teamTurn + "'s turn!");
    };

// XXXXXXXXXXXXXXXXXXXXXX GAMEPLAY XXXXXXXXXXXXXXXXXXXXXX
    $("#beginBtn").on("click", function(){
        gameOn = true;
        displayItem = items[Math.floor(Math.random()*items.length)];
        $("#displayItem").text(displayItem);
        setTimeout(function(){
            // gameOn = fal se;
            // alert("Times up");
        }, 3000 )
    })
    
    $("#correctBtn").on("click", function(){
        if (gameOn === true) {
            correctAnswers[teamTurn - 1].push(displayItem);
            console.log(correctAnswers);
            index = items.indexOf(displayItem);
            items.splice(index, 1);
            displayItem = items[Math.floor(Math.random()*items.length)];
            $("#displayItem").text(displayItem);
            $("#message").text("There are " + items.length + " items left");
            scores[teamTurn - 1]++;
            $("#team" + teamTurn + "Score").text(scores[teamTurn - 1]);
        };
        if (items.length === 0) {
            console.log("gameover");
            gameOn = false;
            $("#displayItem").text("Game Over!");
        };
    });

    $("#skipBtn").on("click", function(){
        if (gameOn === true){
            if (items.length == 1) {
                $("#message").text("LAST ONE!");
            };
            skipped.push(displayItem);
            if(skipped.length === items.length){
                $("#message").text("Can't skip, last one left!");
                $("#skipBtn").prop('disabled', true);
            }
            else{
                while(skipped.indexOf(displayItem) >= 0){
                    displayItem = items[Math.floor(Math.random()*items.length)];
                    $("#displayItem").text(displayItem);
                };
            };
        }; 
    });

    $("#nextTurn").on("click", function(){
        whosTurn();
        $("#displayItem").text("");
        gameOn = false;
        skipped = [];
        $("#skipBtn").prop('disabled', false);
        $("#message").text("");
    })   
});