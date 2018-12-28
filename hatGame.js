var cat = null;
//CHANGE THIS TO NULL 
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
   


$("#beginBtn").prop('disabled', true);
// XXXXXXXXXXXXXXXXXXXXXX SETUP XXXXXXXXXXXXXXXXXXXXXXXXX

// submit category and num of teams
$("#finishBtn").on("click", function(){
    console.log("submitted");

    numTeams = parseInt(document.querySelector('input[name="options"]:checked').value,10);
    if(numTeams === null){
        alert("Please choose a number of teams");
        $("#finishWarning").text("Please choose number of teams...")
    } else {
        gameOn = true;
        $("#beginBtn").prop('disabled', false);
    };

    for (var i=1; i <= numTeams; i++){
        teams.push(i);
    }

    $("#tableAdd").text("");

    for (var x = 1; x <= numTeams; x++) {
        $("#tableAdd").append("<tr><td>" + x + "</td><td id='team" + x + "Score'></td></tr>")
    };
    for (var y=0; y < numTeams; y++) {
        scores[y] = 0;
        correctAnswers[y] = [];
    }
});

$("#finishBtn").click(function() {
    $('html,body').animate({
        scrollTop: $(".mainGame").offset().top},
        'slow');
});


// setup table depending on numTeams




// add an item 
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

function whosTurn() {
    teamTurn++;
    if (teamTurn === Number(numTeams) + 1){
        teamTurn = 1;
    }
    console.log("HELLO");
    $("#whosTurn").text("Team " + teamTurn + "'s turn!");
};



// setup scores



// setup correct answers






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

    //choose random item from array
    
    $("#correctBtn").on("click", function(){

        if (gameOn === true) {
            correctAnswers[teamTurn - 1].push(displayItem);
            console.log(correctAnswers);
            index = items.indexOf(displayItem);
            items.splice(index, 1);
            // console.log(items);
            displayItem = items[Math.floor(Math.random()*items.length)];
            $("#displayItem").text(displayItem);
            $("#message").text("There are " + items.length + " items left");
            scores[teamTurn - 1]++;
            // console.log(scores);
            $("#team" + teamTurn + "Score").text(scores[teamTurn - 1]);
            // console.log( $("#team" + teamTurn + "Score").text());
        };

        if (items.length === 0) {
            console.log("gameover");
            gameOn = false;
            $("#displayItem").text("Game Over!");
        }
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
                }
            }
            
            console.log();
        }
       
        
    })

    $("#nextTurn").on("click", function(){
        whosTurn();
        $("#displayItem").text("");
        gameOn = false;
        skipped = [];
        $("#skipBtn").prop('disabled', false);
        $("#message").text("");
    })

    // Check if game is over

   
});

    





