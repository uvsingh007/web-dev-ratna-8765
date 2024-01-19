let baseUrl = `https://mockserver-aq5n.onrender.com`;
let bankUrl = `${baseUrl}/banks`;
let wrapper = document.querySelector(".wrapper");

let bankData;
async function fetchBank(){
    try{
        let res = await fetch(bankUrl);
        let data= await res.json();
        bankData=data;
        appendData(bankData)
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

fetchBank();

function createCard(item){
  let bankCard =  document.createElement("div");
  bankCard.className="bank-card";
  bankCard.dataset.id=item.id;

  bankCard.addEventListener("click",()=>{
    let tick = document.createElement("div")
    tick.className="tick"
    tick.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
    <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
    </svg>`
    if(!bankCard.classList.contains("selected")){
        bankCard.classList.add("selected")
        bankCard.append(tick);
    }
    else{
        bankCard.classList.remove("selected")
        tick.remove()
    }
  })

  let img = document.createElement("img");
  img.src=item.image;
  img.alt=item.title
  
  img.className="bank-logo"

  bankCard.append(img);
  return bankCard;
}

function appendData(data){
    // wrapper.innerHTML=""
    data.forEach((item)=>{
        wrapper.append(createCard(item));
    })
}