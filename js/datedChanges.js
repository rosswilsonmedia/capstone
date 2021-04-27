//Init
var d=new Date;
var dayOf=new Date("2021-04-27T00:00:00-04:00");
var showTime=new Date("2021-04-27T20:00:00-04:00");
var endOfShow=new Date("2021-04-27T20:42:00-04:00");
var pageName=window.location.href.substr(window.location.href.lastIndexOf("/")+1);

//Watch Nav Tab Changes
var watchTabs=document.querySelectorAll('[role="navigation"] a[href="https://rosswilsonmedia.github.io/capstone/watch"]');
if(d>=dayOf&&d<showTime){
    for(i=0; i<watchTabs.length; i++){
        watchTabs[i].innerHTML='Watch Live!';
    }
}else if(d>=showTime){
    for(i=0; i<watchTabs.length; i++){
        watchTabs[i].innerHTML='Watch Now!';
    }
}

//Home Page Changes
var watchHomeButton=document.querySelector('.button[href="https://rosswilsonmedia.github.io/capstone/watch"]');
if(watchHomeButton){
    if(d>=dayOf&&d<showTime){
        watchHomeButton.innerHTML='Watch The Live Stream! <i class="fas fa-arrow-right"></i>';
    }else if(d>=showTime){
        watchHomeButton.innerHTML='Watch The Event Now! <i class="fas fa-arrow-right"></i>';
    }
}

//About Page Changes
var projectLinks=document.querySelectorAll('.projectLink');
if(projectLinks&&d<showTime){
    for(i=0; i<projectLinks.length; i++){
        projectLinks[i].style.display='none';
    }
}

//Projects Page Changes
var noProjectMessage=document.querySelector('.noProjects');
if(noProjectMessage&&d<showTime){
    var projectSections=document.querySelectorAll('.projects');
    for(i=0; i<projectSections.length; i++){
        projectSections[i].style.display="none";
    }
    noProjectMessage.style.display="block";
}

//Watch Page Changes
var watchPagePlayer=document.querySelector('#playerWrapper');
if(watchPagePlayer&&d>=dayOf){
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: '1uUaXnirbB8',
            playerVars: {rel: 0, showinfo: 0, ecver: 2},
            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        //event.target.playVideo();
    }
    document.getElementsByClassName('noJS').style.display = "none";

    /* --YT Player States--
    -1 – unstarted
    0 – ended
    1 – playing
    2 – paused
    3 – buffering
    5 – video cued
    --End of YT Player States--*/
    var timer;
    var timeout;
    var currentTime = 0;
    function onPlayerStateChange(event) {
        console.log(player.getPlayerState());
        if (player.getPlayerState() === 1) {
            clearTimeout(timeout);
            document.getElementById('watch').style.backgroundColor = "black";
            document.getElementsByTagName('header')[0].style.backgroundColor = "var(--flatBlack)";
            document.getElementsByTagName('header')[0].style.boxShadow = "0px 1px 6px var(--lightBlue)";
            document.getElementById('player').style.borderRadius = "0";
        } else if (player.getPlayerState() === 2 || player.getPlayerState() === 0) {
            timeout = setTimeout(function() {
                document.getElementById('watch').style.backgroundColor = "transparent";
                document.getElementsByTagName('header')[0].style.backgroundColor = "var(--lightBlue)";
                document.getElementsByTagName('header')[0].style.boxShadow = "black 0px 0px 5px";
                document.getElementById('player').style.borderRadius = "1em";
                
            }, 1500);
        }
    }
    function stopVideo() {
        player.stopVideo();
    }
}