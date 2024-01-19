document.addEventListener("DOMContentLoaded", function() {
    animateDivs();
    window.addEventListener("scroll", handleScroll);


    function animateDivs() {
        // window.scrollTo(0, 0);
        document.querySelector('.image').classList.add('active');
        document.querySelector('.image2').classList.add('active');
        document.querySelector('.word').classList.add('active');
        setTimeout(function() {
            document.querySelector('.merchant').classList.add('active');
        }, 700);
    }
});

function handleScroll() {
    let scrollPosition = window.scrollY;
    let threshold = 200;
    if (scrollPosition > threshold) {
        animateElements();
        window.removeEventListener("scroll", handleScroll);
    }
}

function animateElements() {

    document.querySelector('.image2').classList.add('slide-from-right');
    document.querySelector('.one_more_tag').classList.add('slide-from-bottom');
}