
    let toast = document.querySelector(".toast");
    let toastText = document.querySelector(".toast-text");
    let toastClose = document.querySelector(".toast-close");



    function toastIntoAction(params, type) {
        toastText.innerText = params;
        toast.className = "";
        toast.classList.add(`${type}`, "toast");
        toastClose.addEventListener("click", () => {
            toast.classList.add("hiddentoast");
        })
        setTimeout(() => {
            toast.classList.add("hiddentoast");
        }, 4000)
    }



    let btn = document.getElementById("send");
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Thank You For Contacting Us. We Will Reach Out To You");
        let fullName = document.getElementById("input_one_fullname");
        let email = document.getElementById("input_one_email");
        let message = document.getElementById("input_one_message");
        fullName.value = "";
        email.value = "";
        message.value = "";

    });
