var yPage;
var xPage;
var yLastPage;
var xLastPage;
var leftBtn = document.getElementById("leftBtn");
var rightBtn = document.getElementById("rightBtn");
var htmlElement = document.querySelector("html");
var sectionsYPos = new Array();
var sectionsXPos = new Array();
var scrollTimeout;
var scrollAmnt = 30;
var scrollTic = 10;



window.onbeforeunload = function () {
    window.scrollTo(0,0);
};

window.onload = function(){
    var sectionElements = document.getElementsByClassName("section");

    for(var i = 0; i < sectionElements.length; i++){
        // sectionsYPos.push(sectionElements[i].offsetTop-parseInt(window.getComputedStyle(sectionElements[i]).getPropertyValue('margin-top'), 10));
        //the minus 30 value is for the margin of section
        sectionsXPos.push(sectionElements[i].offsetLeft - 30);
    }

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
        sectionsXPos[i] = sectionElements[i].offsetLeft - 30;
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

function buttonToPrimary(elem){
    var color = window.getComputedStyle(elem, null).getPropertyValue("background-color");
    var components = color.replace(/[^\d,]/g, '').split(',');
    var r = components[0];
    var g = components[1];
    var b = components[2];
    
    var rgbHover = "rgb(" + (Number(r)-40) + "," + (Number(g)-40) + "," + (Number(b)-40) + ")";
    var rgbShadow = "rgb(" + (Number(r)-60) + "," + (Number(g)-60) + "," + (Number(b)-60) + ")";

    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--primary-color-hover', rgbHover);
    document.documentElement.style.setProperty('--primary-color-shadow', rgbShadow);
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

//color palettes
document.getElementById("red").addEventListener("click", function(){
    buttonToPrimary(document.getElementById("red"));
    }
);
document.getElementById("orange").addEventListener("click", function(){
    buttonToPrimary(document.getElementById("orange"));
    }
);
document.getElementById("brown").addEventListener("click", function(){
    buttonToPrimary(document.getElementById("brown"));
    }
);
document.getElementById("blue").addEventListener("click", function(){
    buttonToPrimary(document.getElementById("blue"));
    }
);
document.getElementById("green").addEventListener("click", function(){
    buttonToPrimary(document.getElementById("green"));
    }
);
document.getElementById("black").addEventListener("click", function(){
    buttonToPrimary(document.getElementById("black"));
    }
);
document.getElementById("purple").addEventListener("click", function(){
    buttonToPrimary(document.getElementById("purple"));
    }
);
document.getElementById("teal").addEventListener("click", function(){
    buttonToPrimary(document.getElementById("teal"));
    }
);

//giff events
document.getElementById("pong").addEventListener("mouseover", function(){
        document.getElementById("pong").src = "assets/img/pong.gif";
    }
);
document.getElementById("pong").addEventListener("mouseout", function(){
        document.getElementById("pong").src = "assets/img/pong.jpg";
    }
);