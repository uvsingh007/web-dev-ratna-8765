let list = document.querySelector(".navigation li");

function activeLink(){
    list.forEach((item) => item.classList.remove("hovered"));
    this.classList.add("hovered");
}
list.forEach((item) => item.addEventListener("click", activeLink));