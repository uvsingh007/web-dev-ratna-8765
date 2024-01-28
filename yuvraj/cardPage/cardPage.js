let container = document.querySelector(".container")
let userData = JSON.parse(localStorage.getItem("user"));

function appendHeading(){
    let heading = document.createElement("h1");
    heading.innerText="No Cards Available"
    container.append(heading);
    appendAddMore()
}
appendHeading()

function createCard(item){
    let cardContainer =  document.createElement("div");
    cardContainer.className="card-container";

    let front = document.createElement("div");
    front.className="front";

    let imageContainer = document.createElement("div");
    imageContainer.className="image";
    
    //images of bank
    let imgChip = document.createElement("img");
    imgChip.src="../../assets/chip.png";
    imgChip.alt="chip";

    let imgVisa = document.createElement("img");
    imgVisa.src="../../assets/visa.png";
    imgVisa.alt="visa";

    let cardNumber = document.createElement("div");
    cardNumber.className="card-number-box";
    cardNumber.innerText=`${item.cardNumber}`

    let flexbox = document.createElement("div");
    flexbox.className="flexbox"

    let box = document.createElement("div");
    box.className="box"

    let span = document.createElement("span");
    span.innerText="Card Holder"

    let cardHolder = document.createElement("div");
    cardHolder.innerText=`${userData.firstName} ${userData.lastName}`

    let boxBottom = document.createElement("div");
    boxBottom.className="box";

    let spanBottom = document.createElement("span");
    spanBottom.innerText="Expires"

    let expiration = document.createElement("div");
    expiration.className="expiration"

    let spanMonth = document.createElement("span");
    spanMonth.className="exp-month";
    spanMonth.innerText=`${item.expiryDate.substring(0,2)}/`;

    let spanYear = document.createElement("span");
    spanYear.className="exp-year";
    spanYear.innerText=`${item.expiryDate.substring(2,6)}`
    //append imag in bankcard wrapper
    cardContainer.append(front);
    front.append(imageContainer,cardNumber,flexbox);
    imageContainer.append(imgChip,imgVisa);
    flexbox.append(box,boxBottom);
    box.append(span,cardHolder)
    boxBottom.append(spanBottom,expiration)
    expiration.append(spanMonth,spanYear)
    return cardContainer;
}

function appendAddMore(){
    let btnDiv = document.createElement("div");
    btnDiv.className="btn";

    let btn =document.createElement("button");
    btn.className="btn";
    btn.innerText="Add more cards";
    btn.addEventListener("click",()=>{
        window.location.href="../../akash/card.html"
    })
    btnDiv.append(btn);
    container.append(btnDiv);
}
// function to append created card into our DOM
function appendData(data){
    container.innerHTML=""
    data.forEach((item)=>{
        container.append(createCard(item));
    })
    appendAddMore()
}

if(userData.cards.length>0){
    appendData(userData.cards)
}