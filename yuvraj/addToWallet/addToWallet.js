let baseUrl = `https://mockserver-aq5n.onrender.com`;
let passbookUrl = `${baseUrl}/passbook`;
let userUrl = `${baseUrl}/users`;
let passbookArray = document.querySelector(".details_r");
let passbookData;
let userData = JSON.parse(localStorage.getItem("user"));
let paybtn = document.getElementById("payButton");
let amount = document.querySelector(".amnt_req");
let message = document.querySelector(".message-req")
let toast = document.querySelector(".toast");
let toastText = document.querySelector(".toast-text");
let toastClose = document.querySelector(".toast-close");
let cardData = JSON.parse(localStorage.getItem("card"))

async function fetchData(id) {
    try {
        let res = await fetch(`${passbookUrl}/${id}`);
        let data = await res.json();
        passbookData = data;
        // appendToDOM(passbookData.transactions);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
fetchData(userData.id);


paybtn.addEventListener("click",async function(e){
    e.preventDefault();
    if(!checkInputs()){
        toastIntoAction("All fields are required!","alert")
        return;
    }
   
    passbookUpdate(userData.id);
    
    setTimeout(()=>{
        localStorage.removeItem("wallet");
        localStorage.removeItem("card");
        window.location.href=`../../paymentpage/walletadded.html`
    },2000)
})
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
            "title": "Added to Wallet",
            "type": "credit",
            "date": properDate,
            "time": properTime,
            "recipient":`${userData.firstName} ${userData.lastName}`,
            "from": "Card",
        });

        let obj={
            amount:Number(passbookData.amount)+Number(amount.value),
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


function toastIntoAction(params, type){
    toastText.innerText = params;
   //  toast.classList.remove("hidden");
   toast.className = "";
    toast.classList.add(`${type}`, "toast");
    toastClose.addEventListener("click", ()=>{
        toast.classList.add("hiddentoast");
    })
     setTimeout(()=>{
         toast.classList.add("hiddentoast");
     },4000)
   }
   let backbtn = document.getElementById("backbtn");
   backbtn.addEventListener("click", () => {
    window.history.back();
    localStorage.removeItem("wallet");
})