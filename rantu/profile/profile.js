let baseUrl = `https://mockserver-aq5n.onrender.com`;
let passbookUrl = `${baseUrl}/passbook`;
let userUrl = `${baseUrl}/users`;

let passbookArray = document.querySelector(".details_r");
let userName = document.querySelector("#profName");
let userEmail = document.querySelector("#email");
let totalBalance = document.querySelector(".total-balance-amount");
let passbookData;
let userData = JSON.parse(localStorage.getItem("user"));

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

}
userCardDynamic(userData);