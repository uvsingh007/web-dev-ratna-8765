let baseUrl = `https://mockserver-aq5n.onrender.com`;
let passbookUrl = `${baseUrl}/passbook`;

let passbookArray = document.querySelector(".passbook");

function appendToDOM(customers) {
    passbookArray.innerHTML = "";
    customers.forEach(element => {

        let customer1 = singleCard(element);
        passbookArray.append(customer1)
    });
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
    name.innerText = item.transactions[0].from

    let status = document.createElement("p");
    status.innerText = item.transactions[0].type;

    customerStatus.append(name, status)


    let ammountBox = document.createElement("div");
    ammountBox.classList.add("amount", "common");

    let amount = document.createElement("h5")
    amount.className = "dollar";
    if (status.innerText === 'credit') {
        amount.innerText = `+$${item.transactions[0].amount} `
        amount.style.color = 'green'
    } else {
        amount.innerText = `-$${item.transactions[0].amount} `
        amount.style.color = 'red'
    }

    let date = document.createElement("p");
    date.innerText = item.transactions[0].date;
    ammountBox.append(amount, date)

    customerDetail.append(customerStatus, ammountBox)
    singleCard.append(imageBox, customerDetail)

    return singleCard
}

async function fetchData() {
    try {
        let res = await fetch(`${baseUrl}/passbook`);
        let data = await res.json();
        appendToDOM(data)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
fetchData()