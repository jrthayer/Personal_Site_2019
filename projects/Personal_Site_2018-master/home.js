var i = 0;
var speed = 40;
var message = " How would you like to add css to this page?";

var txt = document.querySelector("#message");
var bLeft = document.querySelector("#b1");
var bRight  = document.querySelector("#b2");

function typeWriter() {
    if (i < message.length) {
    txt.innerHTML += message.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function useWriter(mes){
    i = 0;
    message = mes;
    txt.innerHTML = "";
    typeWriter();
}

function gameJS(){
    $("#game img").on( "mouseover", function(){$("#game img").attr("src","pong.gif")});
    $("#game img").on( "mouseout", function(){$("#game img").attr("src","pong.jpg")});
}


useWriter(message);
setTimeout(function(){$("#prompt").css({top: 0, right: 0});}, 3000);


$("#b1").on("click", function(){
    useWriter('Start by creating two columns: $("div:eq(3)").attr("id", "right"); $("div").first().attr("id", "left");');
    $("#b2").hide();
    $("#b3").hide();
    $("#b1").html("next");
    setTimeout(function(){$("div:eq(3)").attr("id", "right");}, 4000);
    setTimeout(function(){$("div").first().attr("id", "left");}, 6000);

    $("#b1").off("click");
    $("#b1").on("click", function(){
        useWriter('Now get a handle on those images: $("div:eq(5)").attr("id", "game"); $("div:eq(7)").attr("id", "school");');
        setTimeout(function(){$("div:eq(5)").attr("id", "game");}, 4000);
        setTimeout(function(){$("div:eq(7)").attr("id", "school");}, 6000);

        $("#b1").off("click");
        $("#b1").on("click", function(){
            useWriter('Fix up that side bar: $("div:eq(1)").attr("id", "personal");');
            setTimeout(function(){$("div:eq(1)").attr("id", "personal");},4000);

            $("#b1").off("click");
            $("#b1").on("click", function(){
                useWriter('Distinguish the categories from their content: $("h2").addClass("category");');
                setTimeout(function(){$("h2").addClass("category");}, 4000);

                $("#b1").off("click");
                $("#b1").on("click", function(){
                    useWriter('And add in some margins: $("h3").addClass("instance"); $("ul").addClass("details-list"); $("p").addClass("details"); $("h3+h4").addClass("date");');
                    setTimeout(function(){$("h3").addClass("instance");},4000);
                    setTimeout(function(){$("ul").addClass("details-list");},6000);
                    setTimeout(function(){$("p").addClass("details");},6000);
                    setTimeout(function(){$("h3+h4").addClass("date");},6000);
                    gameJS();
                    $("#b1").html("exit");

                    $("#b1").off("click");
                    $("#b1").on("click", function(){
                        $("#prompt").remove();
                    });
                });
            });
        });
    });
});

$("#b2").on("click", function(){
    $("div:eq(3)").attr("id", "right");
    $("div").first().attr("id", "left");
    $("div:eq(5)").attr("id", "game");
    $("div:eq(7)").attr("id", "school");
    $("div:eq(1)").attr("id", "personal");
    $("h2").addClass("category");
    $("h3").addClass("instance");
    $("ul").addClass("details-list");
    $("p").addClass("details");
    $("h3+h4").addClass("date");
    gameJS();
    $("#prompt").remove();
});


