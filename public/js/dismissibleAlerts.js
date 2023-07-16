//JQuery version:-

// window.setTimeout(function() {
//     $(".alert").fadeTo(500, 0).slideUp(500, function(){
//         $(this).remove(); 
//     });
// }, 1000);

//Normal version:--

setTimeout(function() {
    let alertElement = document.getElementsByClassName("alert-dismissible")[0];
    let fadeOutTime = 500;
    alertElement.style.transition = "opacity " + fadeOutTime + "ms ease";
        alertElement.style.opacity = 0;
        alertElement.addEventListener("transitionend", function() {
            this.remove();
        });
}, 6000);
