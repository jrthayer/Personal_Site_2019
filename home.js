window.onbeforeunload = function () {
        window.scrollTo(0,0);
};


var yPage = 0;
var yLastPage = 2;
var upBtn = document.getElementById("upBtn");
var downBtn = document.getElementById("downBtn");
var htmlElement = document.querySelector("html");

//Event Listeners

//scrolls window on button press
//the smooth is being added and removed because srollTo doesn't
//work when using chrome smooth scrolling
upBtn.addEventListener("click", 
    function(){
        htmlElement.classList.add("smooth"); 
        window.scrollBy(0, -window.innerHeight); 
        htmlElement.classList.remove("smooth");
    }
);

downBtn.addEventListener("click", 
    function(){
        htmlElement.classList.add("smooth"); 
        window.scrollBy(0, window.innerHeight); 
        htmlElement.classList.remove("smooth");
    }
);

//Hides the up and down buttons if on first or last screen
upBtn.addEventListener("click", 
    function(){
        yPage--;  
        if(yPage < 2){downBtn.removeAttribute("hidden");} 
        if(yPage == 0){upBtn.setAttribute("hidden", true);}
    }
);


downBtn.addEventListener("click", 
    function(){
        yPage++; 
        if(yPage > 0){upBtn.removeAttribute("hidden");} 
        if(yPage == yLastPage){downBtn.setAttribute("hidden", true);
    }
});
