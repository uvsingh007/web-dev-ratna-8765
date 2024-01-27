document.querySelector('.card-number-input').oninput = (event) => {
    let inputValue = event.target.value;
    let numericValue = inputValue.replace(/\D/g, '');
    event.target.value = numericValue;
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = (event) => {
    let inputValue = event.target.value;
    let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
    event.target.value = alphabeticValue;
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () => {
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () => {
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = (event) => {
    
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () => {
    let inputValue = event.target.value;
    let numericValue = inputValue.replace(/\D/g, '');
    event.target.value = numericValue;
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}

let toast = document.querySelector(".toast");
let toastText = document.querySelector(".toast-text");
let toastClose = document.querySelector(".toast-close");

function toastIntoAction(params, type) {
    toastText.innerText = params;
    toast.className = "";
    toast.classList.add(`${type}`, "toast");
    toastClose.addEventListener("click", () => {
        toast.classList.add("hiddentoast");
    })
    setTimeout(() => {
        toast.classList.add("hiddentoast");
    }, 4000)
}

let submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
    e.preventDefault()
    toastIntoAction("Card has been added", 'success');


})