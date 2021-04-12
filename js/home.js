//Initial Sets
document.getElementsByTagName('body')[0].className="JSBody";
document.getElementById('slideControls').style.display="grid";
window.scrollTo(0,0);

//Global Variables For All Handlers
var pageIndex = 0;
var adArray = document.getElementsByClassName('ad');
var controlArray = document.getElementsByClassName('control');

//Global Page Change
function pageChange(pageChange) {
    switch (pageChange) {
        case 'down':
            if(pageIndex>=2) {
                pageIndex=2;
            } else {
                pageIndex++;
            }
            break;
        case 'up':
            if(pageIndex<=0) {
                pageIndex=0;
            } else {
                pageIndex--;
            }
            break;
        case 0:
            pageIndex=0;
            break;
        case 1:
            pageIndex=1;
            break;
        case 2:
            pageIndex=2;
            break;
        default:
            pageIndex=pageIndex;
            break;
    }
    (adArray[pageIndex]).scrollIntoView();
    for(i=0; i<controlArray.length; i++) {
        if (i===pageIndex) {
            controlArray[i].style.backgroundColor = "var(--pink)";
        } else {
            controlArray[i].style.backgroundColor = "var(--lightBlue)";
        }
    }
}

//Scroll to Page on Resize
window.addEventListener("resize", function(){
    pageChange('none');
}, false);

//Scroll Handler
var move = true;
function scrollHandler(e) {
    e.preventDefault();
    if (move===true) {
        move=false;
        if (e.deltaY>0) {
            pageChange('down');
        } else if (e.deltaY<0) {
            pageChange('up');
        }
        setTimeout(function() {
            move=true;
        }, 500);
    }
}

window.addEventListener("wheel", scrollHandler, {passive:false});

//Touch Handler
var touchstartX=0;
var touchstartY=0;
var touchendX=0;
var touchendY=0;
var minSwipeLength=150;
var swipeLength=0;
var touchArea=document.getElementsByTagName('body')[0];

touchArea.addEventListener('touchstart', function(e) {
    touchstartY=e.touches[0].screenY;
}, false);

touchArea.addEventListener('touchend', function(e) {
    touchendY=e.changedTouches[e.changedTouches.length - 1].screenY;
    swipeLength=Math.abs(touchendY-touchstartY);
    if(swipeLength>minSwipeLength) {
        swipeHandler();
    }
}, false);

function swipeHandler() {
    if (touchendY < touchstartY) {
        pageChange('down');
    } else if (touchendY > touchstartY) {
        pageChange('up');
    }
}

//Arrow Handler
var arrows=document.querySelectorAll('.arrow');
var className;
function arrowHandler() {
    className=this.className;
    if (className==="arrow down") {
        pageChange('down');
    } else if (className==="arrow up") {
        pageChange('up');
    }
}
for (j=0; j<arrows.length; j++) {
    arrows[j].style.cursor="pointer";
    arrows[j].addEventListener('click',arrowHandler,false);
}

//Side Control Handler
var sideCtrls=document.getElementsByClassName('control');
var ctrlClass;
function sideCtrlHandler() {
    ctrlClass=this.className;
    switch(ctrlClass) {
        case 'control 0':
            pageChange(0);
            break;
        case 'control 1':
            pageChange(1);
            break;
        case 'control 2':
            pageChange(2);
            break;
        default:
            pageChange('none');
            break;
    }
}
for (h=0; h<sideCtrls.length; h++) {
    sideCtrls[h].addEventListener("click",sideCtrlHandler,false);
}