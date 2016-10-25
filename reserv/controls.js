var mytrack = document.getElementById('mytrack');

var globalDuration;

var minutes = parseInt (mytrack.duration/60);
var seconds = parseInt (mytrack.duration%60);

var vinyl = document.getElementById('vinyl');
var butt = document.getElementById('jukebox-play');
butt.addEventListener('click', jbPlay, false);

function jbPlay () {
  //var counter = Math.round(globalDuration/2);
  //console.log(counter); 
  //var css = '-webkit-animation-iteration-count:' + counter + ' ';
  //vinyl.setAttribute(
  //  'style', css
  //);
  mytrack.play();
  $("#vinyl").addClass('spinning-ease-in').delay(4000)
    .queue(function(next){
        $("#vinyl").removeClass().addClass('spinning');
        var counter = Math.round(globalDuration/2);
        var timeLeft = (counter*2000);
        console.log(counter); 
        var css = '-webkit-animation-iteration-count:' + counter + ' ';
        vinyl.setAttribute(
          'style', css
        );
        next();
        console.log(timeLeft);
        
        
    })
  //vinyl.removeAttribute('style');
  //var deg = 4720;
  //var css = '-webkit-transform: rotate(' + deg + 'deg);';
  //vinyl.setAttribute(
    //'style', css
    //);
}

function jbPause () {
  mytrack.pause();
}


mytrack.addEventListener('canplaythrough', function() {
    globalDuration = mytrack.duration;
}, false);
