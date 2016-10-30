var mytrack = document.getElementById('mytrack');
var vinyl = document.getElementById('vinyl');

var playButton = document.getElementById('jukebox-play');
var pauseButton = document.getElementById('jukebox-pause');

playButton.addEventListener('click', jbPlay, false);
pauseButton.addEventListener('click', jbPause, false);

var globalDuration;

var jbTrackCount = 0;
var jbPlaylist = ["music/Boogie_Wonderland.m4a", "music/Neutron_Dance.m4a", "music/Dancing_in_the_Streets.m4a", "music/Bust_a_Move.m4a", "music/Do_You_Want_to_Dance_ Ballad.m4a", "music/Walking_on_Sunshine.m4a", ]

$("#vinyl").css("animation-play-state", "paused");

var vinylCss;

function nextTrack() {
  mytrack.pause();
    vinyl.removeAttribute(
    'style', vinylCss
    );
    $("#vinyl").css("animation-play-state", "paused");
  mytrack.load();
  jbTrackCount++;
  if(jbTrackCount>=jbPlaylist.length) {
    jbTrackCount=0;
  }
  console.log(jbTrackCount);
  mytrack.src=jbPlaylist[jbTrackCount];
}

function prevTrack() {
  mytrack.pause();
    vinyl.removeAttribute(
    'style', vinylCss
    );
    $("#vinyl").css("animation-play-state", "paused");
  mytrack.load();
  jbTrackCount--;
  if(jbTrackCount<=0) {
    jbTrackCount=5;
  }
  console.log(jbTrackCount);
  mytrack.src=jbPlaylist[jbTrackCount];
}

var commmonBulbImg = '';

function trackOnDemand(thisTrack) {
  mytrack.pause();
  vinyl.removeAttribute(
  'style', vinylCss
  );
  $("#vinyl").css("animation-play-state", "paused");
  mytrack.load();
  jbTrackCount = thisTrack;
  mytrack.src=jbPlaylist[thisTrack];
}


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
        var keyframes  = ss.cssRules[0];
        keyframes.deleteRule("100%");
        keyframes.appendRule("100% { transform: rotate("+ deg +"deg);  }");
    }
  findKeyframesRule(); 
  vinylCss = 'animation-name: spinRight; animation-duration:'+ counter +'ms ';
  vinyl.setAttribute(
    'style', vinylCss
  );
  mytrack.addEventListener('ended', function(){
    jbNext();
  });
  mytrack.addEventListener('play',function(){
    var currentBulb = "img#lb" + jbTrackCount;
    commmonBulbImg = $(currentBulb).attr("src", "img/button-light-up.png")
  });
  mytrack.addEventListener('pause', function(){
    var currentBulb = "img#lb" + jbTrackCount;
    $(currentBulb).attr("src", "img/button.png");
  });
}

mytrack.addEventListener('ended', function(){
  $("#vinyl").delay(1050).queue(function(next){
    mytrack.pause();
    $("#vinyl").css("animation-play-state", "paused");
    jbNext();
    next();
  });
}); 

function jbPause () {
  mytrack.pause();
  $("#vinyl").css("animation-play-state", "paused");
}

var switchingTrack = false;

function jbNext() {
  if (switchingTrack == false) {
    switchingTrack = true;
    mytrack.pause();
    $("#vinyl").css("animation-play-state", "paused");
    $("#vinyl-wrapper").css("animation-play-state", "paused").delay(100).queue(function(next){
      new Audio('music/jb_change_record.mp3').play(); 
      $("#vinyl-wrapper").animate({
      'marginTop': '+=200px'
      },1700).delay(1000).queue(function(next){
          nextTrack();
          $("#vinyl-wrapper").animate({
            'marginTop': '-=200px'
            },{duration:1700,
            complete: function() {
            jbPlay();
            switchingTrack = false;
             }
            });
      })
      next();
      next();
    });
  }  
}
function jbPrev() {
  if (switchingTrack == false) {
    switchingTrack = true;
    mytrack.pause();
    $("#vinyl").css("animation-play-state", "paused");
    $("#vinyl-wrapper").css("animation-play-state", "paused").delay(100).queue(function(next){
      new Audio('music/jb_change_record.mp3').play(); 
      $("#vinyl-wrapper").animate({
      'marginTop': '+=200px'
      },1700).delay(1000).queue(function(next){
          prevTrack();
          $("#vinyl-wrapper").animate({
            'marginTop': '-=200px'
            },{duration:1700,
            complete: function() {
            jbPlay();
            switchingTrack = false;
             }
            });
      })
      next();
      next();
    });
  }  
}
function jbStop() {
  if (switchingTrack == false) {
    switchingTrack = true;
    mytrack.pause();
    $("#vinyl").css("animation-play-state", "paused");
    $("#vinyl-wrapper").css("animation-play-state", "paused").delay(100).queue(function(next){
      new Audio('music/jb_change_record.mp3').play(); 
      $("#vinyl-wrapper").animate({
      'marginTop': '+=200px'
      },1700).delay(1000).queue(function(next){
          mytrack.pause();
          vinyl.removeAttribute(
          'style', vinylCss
          );
          $("#vinyl").css("animation-play-state", "paused");
          mytrack.load();
          jbTrackCount = 0;
          mytrack.src=jbPlaylist[0];
          $("#vinyl-wrapper").animate({
            'marginTop': '-=200px'
            },{duration:1700,
            complete: function() {
            switchingTrack = false;
             }
            });
      })
      next();
      next();
    });
  }  
}

$('button.jb').click(function(){
  new Audio('music/button.wav').play();
});

function jbManualSwitch(x) {
  if (switchingTrack == false) {
    switchingTrack = true;
    mytrack.pause();
    $("#vinyl").css("animation-play-state", "paused");
    $("#vinyl-wrapper").css("animation-play-state", "paused").delay(100).queue(function(next){
      new Audio('music/jb_change_record.mp3').play(); 
      $("#vinyl-wrapper").animate({
      'marginTop': '+=200px'
      },1700).delay(1000).queue(function(next){
          trackOnDemand(x);
          $("#vinyl-wrapper").animate({
            'marginTop': '-=200px'
            },{duration:1700,
            complete: function() {
            jbPlay();
            switchingTrack = false;
             }
            });
      })
      next();
      next();
    });
  }  
}

mytrack.addEventListener('canplaythrough', function() {
    globalDuration = mytrack.duration;
}, false);
