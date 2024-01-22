let baseUrl = `https://mockserver-aq5n.onrender.com`;
let passbookUrl = `${baseUrl}/passbook`;
let userUrl = `${baseUrl}/users`;
let userName = document.querySelector("#name");
let passbookArray = document.querySelector(".details_r");
let totalBalance = document.querySelector("#amnt");
let passbookData;
let userData = JSON.parse(localStorage.getItem("user"));

async function fetchData(id) {
    try {
        let res = await fetch(`${passbookUrl}/${id}`);
        let data = await res.json();
        passbookData = data;
        // appendToDOM(passbookData.transactions);
        totalBalanceDynamic(passbookData);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
fetchData(userData.id);

function totalBalanceDynamic(item){
    totalBalance.innerText = `$${item.amount}.00`;
}
let contactDetails = JSON.parse(localStorage.getItem("contact"));
function userCardDynamic(item){
    userName.innerText = `${item.name}`;
}
userCardDynamic(contactDetails);