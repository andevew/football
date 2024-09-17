$(document).ready(function () {
    let clicked = false;
    $(".menu-btn").on('click', function(){
        if(clicked){
            $(".menu").css("display", "none");
        }
        else{
            $(".menu").css("display", "flex");
        }
        clicked = !clicked;
    })
});