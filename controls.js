var mytrack = document.getElementById('mytrack');


/*var playButton = document.getElementById('jukebox-play');
muteButton.addEventListener('click', muteOrUnmute, false);*/

function jbPlay () {
  mytrack.play()
  $("#vinyl").css("animation", "spin-right 2s linear infinite")
}

function jbPause () {
  mytrack.pause() ;
  $("#vinyl").css({"animation-play-state":"paused"});
}




