var yPage;
var yLastPage;
var upBtn = document.getElementById("upBtn");
var downBtn = document.getElementById("downBtn");
var htmlElement = document.querySelector("html");
//nav1.addEventListener("click", function(){alert("helloWorld")});
var sectionsYPos = new Array();
var scrollTimeout;
var scrollAmnt = 30;
var scrollTic = 10;

window.onbeforeunload = function () {
    window.scrollTo(0,0);
};

window.onload = function(){
    var sectionElements = document.getElementsByClassName("section");

    for(var i = 0; i < sectionElements.length; i++){
        sectionsYPos.push(sectionElements[i].offsetTop-parseInt(window.getComputedStyle(sectionElements[i]).getPropertyValue('margin-top'), 10));
    }

    yPage = 0;
    yLastPage = sectionsYPos.length - 1;

    updateBtnVis();
    document.getElementById("nav0").addEventListener("click", function(){smoothScroll(window.scrollY, sectionsYPos[0], scrollAmnt, scrollTic)});
    document.getElementById("nav1").addEventListener("click", function(){smoothScroll(window.scrollY, sectionsYPos[1], scrollAmnt, scrollTic)});
    document.getElementById("nav2").addEventListener("click", function(){smoothScroll(window.scrollY, sectionsYPos[2], scrollAmnt, scrollTic)});

};

window.onresize = function(){
    var sectionElements = document.getElementsByClassName("section");
    for(var i = 0; i < sectionElements.length; i++){
        sectionsYPos[i] = sectionElements[i].offsetTop-parseInt(window.getComputedStyle(sectionElements[i]).getPropertyValue('margin-top'), 10);
    }

    smoothScroll(window.scrollY, sectionsYPos[yPage], scrollAmnt, 10);
}

window.onscroll = function(){
    window.clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(function(){
        updatePageNum();
        updateBtnVis();
    }, 100);
}


//Event Listeners

//scrolls window on button press
//the smooth is being added and removed because srollTo doesn't
//work when using chrome smooth scrolling
upBtn.addEventListener("click", 
    function(){
        smoothScroll(window.scrollY, sectionsYPos[yPage-1], scrollAmnt, scrollTic);
    }
);

downBtn.addEventListener("click", 
    function(){
        smoothScroll(window.scrollY, sectionsYPos[yPage+1], scrollAmnt, scrollTic);
    }
);

function updatePageNum(){
    var yPos = window.scrollY;
    for(var i = sectionsYPos.length; i >= 0; i--){
        if(yPos <= sectionsYPos[i]){
            yPage = i; 
        }
    }
    console.log(yPage);
    return true;
}

function updateBtnVis(){
    if(yPage == 0){
        upBtn.setAttribute("hidden", true);
    }
    else{
        upBtn.removeAttribute("hidden");
    }

    if(yPage == yLastPage){
        downBtn.setAttribute("hidden", true);
    }
    else{
        downBtn.removeAttribute("hidden");
    }    
}

//Functions used for smooth scrolling
function curYPos() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function smoothScroll(curPos, endPos, posChange, speed){
    var diff = posChange;
    
    if((endPos-curPos)%diff != 0) diff+=Math.abs((endPos-curPos)%diff);

    if(curPos != endPos)
    {
        if(curPos < endPos){
            curPos += diff;
        }
        else{
            curPos -= diff;
        }
    }
    
    window.scrollTo(0, curPos);

    if(curPos != endPos) setTimeout(function(){smoothScroll(curPos, endPos, posChange, speed)}, speed);
}

