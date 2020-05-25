  // list for remembering sequence of buttons
  var seq = [];
  var level = 1;

  var clicks = 0;
  var seqlen = seq.length;

  $(document).on("keypress", function() {
    $(document).off();
    play();

  });

  // listen for clicks on buttons and check if they correspond to the sequence
  $(".btn").on("click", function() {

    if ($(this).attr("id") != seq[clicks]) {
      gameover();
    } else {
      pressed($(this).attr("id"));
      clicks++;
      if (clicks == seqlen) {
        newlevel();
      }
    }

  });

  //when user loses reset sequence and level then re add the start event listener
  function gameover() {
    seq = [];
    clicks = 0;
    level = 1;
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").toggleClass("game-over");
    }, 200);
    $("h1").text("Game Over! Press any key to play again.");
    $(document).on("keypress", function() {
      $(document).off();
      play();

    });
  }

  //increments level counter recalls play function
  function newlevel() {
    level++;
    clicks = 0;
    setTimeout(function() {
      play();
    }, 1000);

  }
  // listens for clicks while number of clicks is < sequence length. checks correct button clicked
  function play() {
    $("h1").text("Level " + level);
      newcolor(seq);
    seqlen = seq.length;
  }

  // flashes the button pressed
  function pressed(color) {
    $("#" + color).addClass("pressed");
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    setTimeout(function() {
      $("#" + color).removeClass("pressed");
    }, 100);
  }

  // generates new color and adds it to sequence
  function newcolor(seq) {
    // generate random number between 1 and 4 and append to list
    var num = Math.floor(Math.random() * 4 + 1);
    var color = "";

    // 1=green 2=red 3=yellow 4=blue
    switch (num) {
      case 1:
        color = "green";
        break;
      case 2:
        color = "red";
        break;
      case 3:
        color = "yellow";
        break;
      case 4:
        color = "blue";
        break;

      default:
        console.log(color);

    }
    seq.push(color);

    // flash and play sound of the last and therefore next colour in the sequence array
    setTimeout(function(){
    var lastcolor = seq[level - 1];
    switch (lastcolor) {
      case "green":
        pressed("green");
        break;
      case "red":
        pressed("red");
        break;
      case "yellow":
        pressed("yellow");
        break;
      case "blue":
        pressed("blue");
        break;
      default:
        console.log(lastcolor);

    }
  },1000);
  }
