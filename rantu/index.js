let baseUrl = `https://mockserver-aq5n.onrender.com`;

let passbookArray = document.querySelector(".details_r");
let passbookData;
function appendToDOM(customers) {
    passbookArray.innerHTML = "";
    let h3 = document.createElement("h3");
    h3.id = "transaction";
    h3.innerText = "Transactions";
    passbookArray.append(h3);
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
    name.innerText = item.from

    let status = document.createElement("p");
    status.innerText = item.type;

    customerStatus.append(name, status)


    let ammountBox = document.createElement("div");
    ammountBox.classList.add("amount", "common");

    let amount = document.createElement("h5")
    amount.className = "dollar";
    if (status.innerText === 'credit') {
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

async function fetchData() {
    try {
        let res = await fetch(`${baseUrl}/passbook/2`);
        let data = await res.json();
        passbookData = data;
        appendToDOM(passbookData.transactions);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
fetchData()