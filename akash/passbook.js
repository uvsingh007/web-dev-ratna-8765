let baseUrl = `https://mockserver-aq5n.onrender.com`;
let passbookUrl = `${baseUrl}/passbook`;
let userData = JSON.parse(localStorage.getItem("user"));
let passbookArray = document.querySelector(".passbook");
let all = document.getElementById("all");
let paid = document.getElementById("paid");
let received = document.getElementById("Received");

let passbookData;


const sortingElements = document.querySelectorAll('.sorting h5');
sortingElements.forEach(element => {
    element.addEventListener('click', () => {
        sortingElements.forEach(otherElement => {
            otherElement.classList.remove('selected');
        });
        element.classList.add('selected');
    });
});



all.addEventListener("click", () => {
    appendToDOM(passbookData.transactions)

})

paid.addEventListener("click", () => {
    appendToDOM(passbookData.transactions.filter((curr) => {
        if (curr.type === 'debit') {
            return curr;
        }


    }))
})

received.addEventListener("click", () => {
    appendToDOM(passbookData.transactions.filter((curr) => {
        if (curr.type === 'credit') {
            return curr;
        }
    }))
})

function appendToDOM(customers) {
    passbookArray.innerHTML = "";
    for (let i = customers.length - 1; i >= 0; i--) {
        let customer1 = singleCard(customers[i]);
        passbookArray.append(customer1)
    }
}



function singleCard(item) {
    let singleCard = document.createElement("div");
    singleCard.className = "singlecustomer";

    let imageBox = document.createElement("div")
    imageBox.className = "image_r";

    let image = document.createElement("img")
    image.src = "https://as2.ftcdn.net/v2/jpg/00/75/13/25/1000_F_75132523_xkLZqbPQkUvVzWSftTf3nAGBjBFkcKuP.jpg"
    image.alt = "customer";
    imageBox.append(image)

    let customerDetail = document.createElement("div");
    customerDetail.className = "customerDetails"

    let customerStatus = document.createElement("div");
    customerStatus.classList.add("name_status", "common");

    let name = document.createElement("h5");
    name.className = "h5";
    name.innerText = item.from ? item.from : userData.firstName;

    let status = document.createElement("p");
    if (item.type === "debit") {
        status.innerText = `${item.title} to ${item.recipient}`;
    } else {
        status.innerText = `${item.title}`;
    }
    customerStatus.append(name, status)


    let ammountBox = document.createElement("div");
    ammountBox.classList.add("amount", "common");

    let amount = document.createElement("h5")
    amount.className = "dollar";
    if (item.type === 'credit') {
        amount.innerText = `+$${item.amount} `
        amount.style.color = 'green'
    } else {
        amount.innerText = `-$${item.amount} `
        amount.style.color = 'red'
    }

    let date = document.createElement("p");
    date.innerText = item.date;
    ammountBox.append(amount, date)

    customerDetail.append(customerStatus, ammountBox)
    singleCard.append(imageBox, customerDetail)

    return singleCard
}

async function fetchData(id) {
    try {
        let res = await fetch(`${passbookUrl}/${id}`);
        let data = await res.json();
        passbookData = data;
        appendToDOM(passbookData.transactions)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
fetchData(userData.id)