var yPage;
var xPage;
var yLastPage;
var xLastPage;
var leftBtn = document.getElementById("leftBtn");
var rightBtn = document.getElementById("rightBtn");
var htmlElement = document.querySelector("html");
//nav1.addEventListener("click", function(){alert("helloWorld")});
var sectionsYPos = new Array();
var sectionsXPos = new Array();
var scrollTimeout;
var scrollAmnt = 30;
var scrollTic = 10;

//Event Listeners
//scrolls window on button press
leftBtn.addEventListener("click", 
    function(){
        smoothScroll(window.scrollX, sectionsXPos[xPage-1], scrollAmnt, scrollTic);
    }
);
leftBtn.addEventListener("mouseover", function(){leftBtn.innerHTML = "&#xab;";});
leftBtn.addEventListener("mouseout", function(){leftBtn.innerHTML = "&#x2039;";});


rightBtn.addEventListener("click", 
    function(){
        smoothScroll(window.scrollX, sectionsXPos[xPage+1], scrollAmnt, scrollTic);
    }
);
rightBtn.addEventListener("mouseover", function(){rightBtn.innerHTML = "&#xbb;";});
rightBtn.addEventListener("mouseout", function(){rightBtn.innerHTML = "&#x203A;";});


window.onbeforeunload = function () {
    window.scrollTo(0,0);
};

window.onload = function(){
    var sectionElements = document.getElementsByClassName("section");

    for(var i = 0; i < sectionElements.length; i++){
        // sectionsYPos.push(sectionElements[i].offsetTop-parseInt(window.getComputedStyle(sectionElements[i]).getPropertyValue('margin-top'), 10));
        sectionsXPos.push(sectionElements[i].offsetLeft);
    }

    console.log(sectionsXPos);

    // yPage = 0;
    // yLastPage = sectionsYPos.length - 1;
    xPage = 0;
    xLastPage = sectionsXPos.length - 1;

    updateBtnVis();
    document.getElementById("nav0").addEventListener("click", function(){
        smoothScroll(window.scrollX, sectionsXPos[0], scrollAmnt, scrollTic);
    });
    document.getElementById("nav1").addEventListener("click", function(){
        smoothScroll(window.scrollX, sectionsXPos[1], scrollAmnt, scrollTic);
    });
    document.getElementById("nav2").addEventListener("click", function(){
        smoothScroll(window.scrollX, sectionsXPos[2], scrollAmnt, scrollTic);
    });

};

window.onresize = function(){
    var sectionElements = document.getElementsByClassName("section");
    for(var i = 0; i < sectionElements.length; i++){
        //sectionsYPos[i] = sectionElements[i].offsetTop-parseInt(window.getComputedStyle(sectionElements[i]).getPropertyValue('margin-top'), 10);
        sectionsXPos[i] = sectionElements[i].offsetLeft;
    }

    smoothScroll(window.scrollX, sectionsXPos[xPage], 30, 10);
}

window.onscroll = function(){
    window.clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(function(){
        updatePageNum();
        updateBtnVis();
        tabSelected();

    }, 100);
}

function updatePageNum(){
    var xPos = window.scrollX;
    for(var i = sectionsXPos.length; i >= 0; i--){
        if(xPos <= sectionsXPos[i]){
            xPage = i; 
        }
    }
    console.log(xPage);
    return true;
}

function tabSelected(){
    var navElements = document.getElementsByClassName("navLink");
    for(var i = 0; i < navElements.length; i++){
        //sectionsYPos[i] = sectionElements[i].offsetTop-parseInt(window.getComputedStyle(sectionElements[i]).getPropertyValue('margin-top'), 10);
        navElements[i].classList.remove("navSelected");
    }

    navElements[xPage].classList.add("navSelected");
}

function updateBtnVis(){
    if(xPage == 0){
        leftBtn.setAttribute("hidden", true);
    }
    else{
        leftBtn.removeAttribute("hidden");
    }

    if(xPage == xLastPage){
        rightBtn.setAttribute("hidden", true);
    }
    else{
        rightBtn.removeAttribute("hidden");
    }    
}

//Functions used for smooth scrolling
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
    
    window.scrollTo(curPos, 0);

    if(curPos != endPos) setTimeout(function(){smoothScroll(curPos, endPos, posChange, speed)}, speed);
}

