const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
let loginpasswordInput = document.getElementById("loginpassword");
let loginemailInput = document.getElementById("logindata");
let baseUrl = `https://mockserver-aq5n.onrender.com`;
let userUrl = `${baseUrl}/users`;
let siginBtn = document.getElementById("loginbtnSign");
let userData;

//Signup
let signupFirstNameInput = document.getElementById("firstname-signup");
let signupLastNameInput = document.getElementById("lastname-signup");
let signupEmailInput = document.getElementById("email-signup");
let signupPhoneInput = document.getElementById("phone-signup");
let signupPasswordInput = document.getElementById("password-signup");
let signupConfirmPasswordInput = document.getElementById("confirm-password");
let signupBtn = document.getElementById("signup-btn");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

async function fetchUsers() {
  try {
    let res = await fetch(`${userUrl}`);
    let data = await res.json();
    console.log(data);
    userData = data;
  } catch (error) {
    console.log(error);
  }
}
fetchUsers();

function checkUsers(data) {
  let obj = {
    email: loginemailInput.value,
    password: loginpasswordInput.value,
  };
  for (let i = 0; i < data.length; i++) {
    if (
      (data[i].email == obj.email || data[i].phone == obj.email) &&
      data[i].password == obj.password
    ) {
      putUsersIntoLocal(data[i]);
      return true;
    }
  }
  return false;
}

function putUsersIntoLocal(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

siginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hi");
  if (checkUsers(userData)) {
    alert("Login Successful");
    window.location.href = "/web-dev-ratna-8765/rantu/index.html";
  } else {
    alert("Invalid Credentials");
  }
});

//SignUp

// async function addUser(){
//     try{
//         let obj = {
//             id: userData.length + 1,
//             firstName:signupFirstNameInput.value,
//             lastName:signupLastNameInput.value,
//             email:signupEmailInput.value,
//             phone:signupPhoneInput.value,
//             password:signupConfirmPasswordInput.value,
//             bankDetails:{
//                 passbookId:userData.length + 1,
//                 bankName:"",
//                 image:"",
//                 cardNumber:"",
//                 accountNumber:"",
//                 ifscCode:"",
//                 branch:""
//             }

//         }
//         let passbookData = {
//             id: userData.length + 1,
//             amount: 1000,
//             transactions: []
//         }
//         let passResponse = await fetch(`${baseUrl}/
//         passbook`,{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify(passbookData)
//         })
//         let passData = await passResponse.json();
//         console.log(passData);
//         let res = await fetch(`${userUrl}`,{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify(obj)
//         })
//         let data = await res.json();
//         console.log(data);
//     }
//     catch(error){
//         console.log(error);
//     }
// }

function checkExistingUsers(data) {
  let obj = {
    email: signupEmailInput.value,
    phone: signupPhoneInput.value,
  };
  for (let i = 0; i < data.length; i++) {
    if (data[i].email == obj.email || data[i].phone == obj.phone) {
      return true;
    }
  }
  return false;
}

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hi");
  if (
    !signupFirstNameInput.value ||
    !signupLastNameInput.value ||
    !signupEmailInput.value ||
    !signupPhoneInput.value ||
    !signupPasswordInput.value ||
    !signupConfirmPasswordInput.value
  ) {
    alert("All fields are required. Please fill in all the fields.");
    return; // Prevent further execution
  }
  if (signupPasswordInput.value !== signupConfirmPasswordInput.value) {
    alert("Passwords do not match. Please try again.");
    return;
  }
  if (checkExistingUsers(userData)) {
    alert(
      "Account Already Exists with this Email or Phone Number. Please SignIn!"
    );
  } else {
    let obj = {
      id: userData.length + 1,
      firstName: signupFirstNameInput.value,
      lastName: signupLastNameInput.value,
      email: signupEmailInput.value,
      phone: signupPhoneInput.value,
      password: signupConfirmPasswordInput.value,
      bankDetails: {
        passbookId: userData.length + 1,
        bankName: "",
        image: "",
        cardNumber: "",
        accountNumber: "",
        ifscCode: "",
        branch: "",
      },
    };
    putUsersIntoLocal(obj);
    window.location.href = "/web-dev-ratna-8765/yuvraj/index.html";
  }
});
