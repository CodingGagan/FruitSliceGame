$(function(){
    
    var playerName = window.prompt("Enter Your Name");
    var game = false;
    var score = 0; var life, i;
    var fruit = ['apple', 'grape', 'orange', 'pineapple'];
    var jump, interval;
    //Game On or Off.
    $("#gameover").show();
    $("#gameover").html("<p>Welcome "+ playerName+"</p><p>Fruit Slice Game</p>");
    $("#button").click(function(){
        if(game == true){
            location.reload();
            
        }else{
            game = true;
            $("#small-left-div").show();
           
            //Show and Add Live
            life = 3;
            addLife();

            //Hide GameOver Div
            $("#gameover").hide();
            //Change Button to Reset button
            $("#button").html("Reset Button");

            //random fruit show
            addFruit();

        }
    });

    //Mouse Over slice
    $(".image").mouseover(function(){
        score++;
        //update score
        $("#scoreValue").html(score);

        $("#fruitSliceSound")[0].play();
        clearInterval(interval);
        $(".image").hide("explode", 500);
        //call to new fruit
        setTimeout(addFruit, 500);
    });


//Function Start Here

//Add Life's
function addLife(){
    $("#small-left-div").empty();
    for(i = 0; i < life; i++){
        $("#small-left-div").append("<img src='Images/life.png' />");
    }

}

function addFruit(){
    //Initialing generate a fruit position and it's sliding
    randomFruit();

    //give random position to fruit
    $(".image").css({'top': -100, 'left': 23 + Math.floor(550 * Math.random())});

    //Movind Speed for Fruits by Step
    jump = 2 + Math.floor(5 * Math.random());

    //Sliding Fruit Down by Step
    interval = setInterval(function(){
    
    $("#fruitID").css('top',$("#fruitID").position().top + jump)
    //Checking Screen Limit Condition
    if ($("#fruitID").position().top > $("#screen").height()) {
        //Have a Life 
            if (life > 1) {
                //show again a fruit
                    randomFruit();
                //give random position to fruit
                    $(".image").css({'top': -100, 'left': 23 + Math.floor(550 * Math.random())});
                //Movind Speed for Fruits by Step
                if(score < 10){
                    jump = 2 + Math.floor(5 * Math.random());
                }else if(score > 11 && score < 60){
                    jump = 6 + Math.floor(8 * Math.random());
                }
                //End Speeding

                //Decreasing Life
                    life--;
                    addLife();
            }else{
                game = false;
                clearInterval(interval);
                $("#small-left-div").hide();
                $("#button").html("Start Game");
                gameOver();
            }
    }
    //Check position and Game Over


    }, 10);
}

function randomFruit(){
    $("#fruitID").show();
    if(score < 30){
        $("#fruitID").attr('src', 'Images/'+ fruit[Math.floor(4 * (Math.random()))]+'.png');
    }
    else if(score > 30 && score < 60){
        $("#fruitID").attr('src', 'Images/'+ fruit[Math.floor(4 * (Math.random()))]+'.png');
    }
}

function gameOver(){
    $("#gameover").show();
    $("#gameover").html("<p>Game Over !</p><p>Your Score is "+score +"</p>")
    $("#button").html("Start Game")
}
});