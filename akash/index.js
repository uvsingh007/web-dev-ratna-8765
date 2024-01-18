document.addEventListener("DOMContentLoaded", function() {
    animateDivs();


    function animateDivs() {
        window.scrollTo(0, 0);
        document.querySelector('.word').classList.add('active');
        setTimeout(function() {
            document.querySelector('.merchant').classList.add('active');
        }, 800);
    }
});