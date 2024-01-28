//base server url deployed on render
let baseUrl = `https://mockserver-aq5n.onrender.com`;
// url for fetching banks
let bankUrl = `${baseUrl}/banks`;
// url for fetching users
let userUrl = `${baseUrl}/users`;
// url for fetching passbooks
let passbookUrl = `${baseUrl}/passbook`;
let cardNumberInput = document.querySelector('.card-number-input');
let cardHolderInput = document.querySelector('.card-holder-input');
let monthInput = document.querySelector('.month-input');
let yearInput = document.querySelector('.year-input');
let cvvInput = document.querySelector('.cvv-input');
let userData = JSON.parse(localStorage.getItem("user"));
let cardType = document.querySelector('.card-type');
let backBtn = document.getElementById('backbtn');
cardNumberInput.oninput = (event) => {
    let inputValue = event.target.value;
    let numericValue = inputValue.replace(/\D/g, '');
    event.target.value = numericValue;
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

cardHolderInput.oninput = (event) => {
    let inputValue = event.target.value;
    let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
    event.target.value = alphabeticValue;
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

monthInput.oninput = () => {
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

yearInput.oninput = () => {
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

cvvInput.onmouseenter = (event) => {
    
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

cvvInput.onmouseleave = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

cvvInput.oninput = () => {
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
    e.preventDefault();
    window.scrollTo(0, 0);
    if (checkInput()) {
        addCard();
        toastIntoAction("Card has been added", 'success');
        setTimeout(() => {
            window.location.href = "../yuvraj/cardPage/cardPage.html";
        },1000)
    }
   

})

function checkInput() {
    if (cardNumberInput.value == "" || cardHolderInput.value == "" || monthInput.value == "" || yearInput.value == "" || cvvInput.value == "") {
        toastIntoAction("Please fill all the details", 'alert');
        return;
    } else if(cardNumberInput.value.length < 16){
        toastIntoAction("Card number must be 16 digits", 'alert');
        return;
    }
    else if(cvvInput.value.length < 3){
        toastIntoAction("Cvv must be 3 digits", 'alert');
        return;
    }

    return true;
}

async function addCard(){
   try{
    let cardObj = {
        cardNumber:cardNumberInput.value,
        cardHolderName:cardHolderInput.value,
        expiryDate:`${monthInput.value}${yearInput.value}`,
        cvv:cvvInput.value,
        cardType: cardType.value,
    }
    userData.bankDetails.cards.push(cardObj);
    let obj = {
        id:userData.id,
        firstName:userData.firstName,
        lastName:userData.lastName,
        password:userData.password,
        email:userData.email,
        phone:userData.phone,
        userImage:userData.userImage,
        bankDetails:{
            passbookId:userData.id,
            bankName:userData.bankDetails.bankName,
            accountNumber:userData.bankDetails.accountNumber,
            cards:userData.bankDetails.cards,
            ifscCode:userData.bankDetails.ifscCode,
            branch:userData.bankDetails.branch
        }
    }
    let res = await fetch(`${userUrl}/${userData.id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    putUserIntoLocal(obj);
   }
   catch(error){
       console.log(error);
   }
}
function putUserIntoLocal(obj){
    localStorage.setItem("user",JSON.stringify(obj));
}

