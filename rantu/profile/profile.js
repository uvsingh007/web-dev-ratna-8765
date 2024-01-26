let baseUrl = `https://mockserver-aq5n.onrender.com`;
let passbookUrl = `${baseUrl}/passbook`;
let userUrl = `${baseUrl}/users`;

let passbookArray = document.querySelector(".details_r");

let userImage = document.querySelector("#userImg");
let userName = document.querySelector("#profName");
let userEmail = document.querySelector("#email");
let userMobNumber = document.querySelector("#mobileNum");

let totalBalance = document.querySelector(".total-balance-amount");
let passbookData;
let userData = JSON.parse(localStorage.getItem("user"));

let cardCount = document.querySelector("#cardCount");

let bankLogo = document.querySelector("#bankLogo");
let bankName = document.querySelector("#bankName");
let accountNumber = document.querySelector("#accountNumber");
let branchName = document.querySelector("#branchName");
let ifsc = document.querySelector("#ifsc");

async function fetchData(id) {
    try {
        let res = await fetch(`${passbookUrl}/${id}`);
        let data = await res.json();
        passbookData = data;
        // appendToDOM(passbookData.transactions);
        // totalBalanceDynamic(passbookData);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
fetchData(userData.id);

function userCardDynamic(item){
    userName.innerText = `${item.firstName} ${item.lastName}`;
    userEmail.innerText = `${item.email}`;
    userImage.src = `../${item.userImage}`;
    userMobNumber.innerText = `${item.phone}`;
}
userCardDynamic(userData);



function bankDetails(item) {
    bankLogo.src = `../${item.bankDetails.image}`;
    bankName.innerText = `${item.bankDetails.bankName}`;
    accountNumber.innerText = `${item.bankDetails.accountNumber}`;
    branchName.innerText = `${item.bankDetails.branch}`;
    ifsc.innerText = `${item.bankDetails.ifscCode}`;
    cardCount.innerText = `${item.bankDetails.cards.length} cards`;
}
bankDetails(userData);

console.log(userData)