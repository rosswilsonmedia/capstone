var mobileNavPage = document.getElementById("mobileNavPage");
var hideMobileNavTimer;

function closeMobileNav() {
    mobileNavPage.style.opacity="0%";
    document.getElementById("topBun").style.transform="rotate(0deg)";
    document.getElementById("patty").style.opacity="100%";
    document.getElementById("bottomBun").style.transform="rotate(0deg)";
    document.body.style.overflow="visible";
    hideMobileNavTimer=setTimeout(function(){
        mobileNavPage.style.visibility="hidden";
    }, 500);
}
function openMobileNav() {
    clearTimeout(hideMobileNavTimer);
    mobileNavPage.style.visibility="visible";
    mobileNavPage.style.opacity="100%";
    document.getElementById("topBun").style.transform="rotate(45deg)";
    document.getElementById("patty").style.opacity="0";
    document.getElementById("bottomBun").style.transform="rotate(-45deg)";
    document.body.style.overflow="hidden";
}
function toggleMobileNav() {
    if(mobileNavPage.style.opacity=='0%' || mobileNavPage.style.opacity=='0') {
        openMobileNav();
    } else {
        closeMobileNav();
    }
}
closeMobileNav();