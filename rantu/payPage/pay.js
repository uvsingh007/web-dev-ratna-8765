let baseUrl = `https://mockserver-aq5n.onrender.com`;
let passbookUrl = `${baseUrl}/passbook`;
let userUrl = `${baseUrl}/users`;
let userName = document.querySelector("#name");
let passbookArray = document.querySelector(".details_r");
let totalBalance = document.querySelector("#amnt");
let passbookData;
let userData = JSON.parse(localStorage.getItem("user"));
let paybtn = document.getElementById("payButton");
let amount = document.querySelector(".amnt_req");
let message = document.querySelector(".message-req")
let contactDetails = JSON.parse(localStorage.getItem("contact"));

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

function userCardDynamic(item){
    userName.innerText = `${item.name? item.name: `${contactDetails.firstName} ${contactDetails.lastName}`}`;
}
userCardDynamic(contactDetails);

paybtn.addEventListener("click",async function(e){
    e.preventDefault();
    if(!checkInputs()){
        alert("All fields are required!")
        return;
    }
    if(!checkBalance()){
        alert("Not enough amount in account!")
        return;
    }
    passbookUpdate(userData.id);
    if(contactDetails.hasOwnProperty("id")){
        updatePassBookReciever(contactDetails.id);
    }
    setTimeout(()=>{
        window.location.href=`../../paymentpage/paymntdone.html`
    },2000)
})

function checkBalance(){
    console.log(passbookData.amount,amount.value);
    if(Number(passbookData.amount)>=Number(amount.value)){
        return true;
    }
    else{
        return false;
    }
}

function checkInputs(){
    if(amount.value && message.value){
        return true;
    }
    else{
        return false;
    }
}

async function passbookUpdate(id){
    try{
        let currentTime = new Date();
        let currentOffset =currentTime.getTimezoneOffset();
        let ISTOffset = 330;
        let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
        let hoursIST = ISTTime.getHours()
        let minutesIST = ISTTime.getMinutes()
        let properDate =Intl.DateTimeFormat('en-GB').format(ISTTime);
        let properTime = `${hoursIST}:${minutesIST}`
        // let transaction=
        passbookData.transactions.push({
            "amount": amount.value,
            "title": "Transferred",
            "type": "debit",
            "date": properDate,
            "time": properTime,
            "recipient": `${contactDetails.name? contactDetails.name: `${contactDetails.firstName} ${contactDetails.lastName}`}`,
            "from": `${userData.firstName} ${userData.lastName}`,
        });

        let obj={
            amount:passbookData.amount-amount.value,
            transactions:passbookData.transactions
        }
        let res = await fetch(`${passbookUrl}/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(obj)
        })
        let data= await res.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

async function updatePassBookReciever(id){
    try{
        let currentTime = new Date();
        let currentOffset =currentTime.getTimezoneOffset();
        let ISTOffset = 330;
        let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
        let hoursIST = ISTTime.getHours()
        let minutesIST = ISTTime.getMinutes()
        let properDate =Intl.DateTimeFormat('en-GB').format(ISTTime);
        let properTime = `${hoursIST}:${minutesIST}`
        let resPassbook = await fetch(`${passbookUrl}/${id}`)
        let passbookData= await resPassbook.json();
        console.log(passbookData);
        passbookData.transactions.push({
            "amount": amount.value,
            "title": "Recieved",
            "type": "credit",
            "date": properDate,
            "time": properTime,
            "recipient": `${contactDetails.name? contactDetails.name: `${contactDetails.firstName} ${contactDetails.lastName}`}`,
            "from": `${userData.firstName} ${userData.lastName}`,
        });
        let obj ={
            id: passbookData.id,
            amount: Number(passbookData.amount)+Number(amount.value),
            transactions: passbookData.transactions
        }
        let res = await fetch(`${passbookUrl}/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(obj)
        })
        let data= await res.json();
        console.log(data);

    }
    catch(error){
        console.log(error);
    }
}
