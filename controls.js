var mytrack = document.getElementById('mytrack');

var vinyl = document.getElementById('vinyl');

var playButton = document.getElementById('jukebox-play');
var pauseButton = document.getElementById('jukebox-pause');

playButton.addEventListener('click', jbPlay, false);
pauseButton.addEventListener('click', jbPause, false);


var globalDuration;

$("#vinyl").css("animation-play-state", "paused");
function jbPlay () {
  mytrack.play();
    $("#vinyl").removeClass();
    $("#vinyl").css("animation-play-state", "running");
    var counter = Math.round(globalDuration*1000);
    var deg = Math.round(globalDuration/2)*360;
    console.log(counter);
    console.log(deg);
    function findKeyframesRule(rule)
      {
          var ss = document.styleSheets[0];
          var keyframes  = ss.cssRules[0]
          keyframes.deleteRule("100%");
          keyframes.appendRule("100% { -webkit-transform: rotate("+ deg +"deg); }");
      }
    findKeyframesRule(); 
    var css = '-webkit-animation-name: spinRight; -webkit-animation-duration:'+ counter +'ms ';
    vinyl.setAttribute(
      'style', css
    );
}

function jbPause () {
  mytrack.pause();
  $("#vinyl").css("animation-play-state", "paused");
}


mytrack.addEventListener('canplaythrough', function() {
    globalDuration = mytrack.duration;
}, false);
