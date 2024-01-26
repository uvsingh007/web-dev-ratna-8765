let baseUrl = `https://mockserver-aq5n.onrender.com`;
// url for fetching banks
let bankUrl = `${baseUrl}/banks`;
let userUrl = `${baseUrl}/users`;
// url for fetching passbooks
let passbookUrl = `${baseUrl}/passbook`;
//container where the card will be appended

let backArrow = document.getElementById("back");
let submit = document.getElementById("submit");
let myForm = document.getElementById("form");
let accountNumberInput = document.getElementById("accountNumber");
let confirmAccountNumberInput = document.getElementById("confirmAccountNumber");
let submitbtn = document.getElementById("submit-form-button");
let ifscInput = document.getElementById("ifsc");
let branchInput = document.getElementById("branch");
let nameInput = document.getElementById("name");




backArrow.addEventListener("click", () => {
    window.history.back();
});

let toast = document.querySelector(".toast");
let toastText = document.querySelector(".toast-text");
let toastClose = document.querySelector(".toast-close");

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



   

   function checkInputData(){
    let obj={
        accountNumber:accountNumberInput.value,
        confirmAccountNumber:confirmAccountNumberInput.value,
    }
    if(!accountNumberInput.value||!confirmAccountNumberInput.value||!ifscInput.value||!branchInput.value||!nameInput.value){
        toastIntoAction("All fields are required. Please fill in all the fields!", "alert");
        return;
    }
    if(obj.accountNumber.length<12 || obj.confirmAccountNumber.length<12){
        toastIntoAction("Account number must be 12 digits!", "alert")
        return;
    }
    if(obj.accountNumber!==obj.confirmAccountNumber){
        toastIntoAction("Acount number doesn't match!", "alert");
        return;
    }
    
    return true;
}

async function fetchAccount(){
    try{
        let res = await fetch(`${userUrl}?bankDetails.accountNumber=${accountNumberInput.value}`);
        let data= await res.json();
        userData=data;
        if(userData.length==0){
            return userData;
        }
        else{
            putUserIntoLocal(...userData);
            console.log(data);
            return userData;
        }
      
    }
    catch(error){
        console.log(error);
    }
}


function putUserIntoLocal(data){
    console.log("hey");
    localStorage.setItem("contact",JSON.stringify(data));
}


submitbtn.addEventListener("click", async function(e){
    e.preventDefault();

    if(checkInputData()){
        try{
            let res = await fetchAccount();
            console.log(res);
            if(res.length==0){
                console.log("user not found");
                let obj = {
                    name: nameInput.value,  
                }
                putUserIntoLocal(obj);
                setTimeout(()=>{
                    window.location.href=`../rantu/payPage/pay.html`
                },1000)
            } 
            else{
             
                setTimeout(()=>{
                    window.location.href=`../rantu/payPage/pay.html`
                },2000)
            }
        }
        catch(error){
            console.log(error);
        }
    }
})