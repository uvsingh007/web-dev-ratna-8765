let baseURL = `https://mockserver-aq5n.onrender.com`;
let contactUrl = `${baseURL}/contacts`;
let mainSection = document.getElementById("mainsection");
let search = document.getElementById("search");
let sortAtoZ = document.getElementById("sort");
let sortZtoA = document.getElementById("sort2");
let backbtn = document.getElementById("backbtn");

async function fetchdata(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();

    appenddata(data);
  } catch (error) {
    console.log(error);
  }
}
fetchdata(`${contactUrl}`);

function appenddata(data) {
  let contactlist = document.createElement("div");
  contactlist.id = "contact_list";

  data.forEach((element) => {
    contactlist.append(createcard(element));
  });
  mainSection.innerHTML = "";
  mainSection.append(contactlist);
}

function createcard(data) {
  let link = document.createElement("a");
  link.href = `/web-dev-ratna-8765/rantu/payPage/pay.html`;

  link.addEventListener("click", () => {
    localStorage.setItem("contact", JSON.stringify(data));
  })
  let card = document.createElement("div");
  card.className = "contactcard";

  let icon = document.createElement("i");
  icon.className = "fa-regular fa-user";

  let details = document.createElement("div");
  let p1 = document.createElement("p");
  p1.textContent = data.name;

  let p2 = document.createElement("p");
  p2.textContent = data.number;

  details.append(p1, p2);
  card.append(icon, details);
  link.append(card);
  return link;
}

sortAtoZ.addEventListener("click", () => {
  fetchdata(`${contactUrl}?_sort=name&_order=asc`);
});

sortZtoA.addEventListener("click", () => {
  fetchdata(`${contactUrl}?_sort=name&_order=desc`);
})
let timer;

search.addEventListener("input", () => {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        const searchTerm = search.value.trim();
        console.log(Number(searchTerm));

        if (!isNaN(Number(searchTerm))) {
            console.log("numinput");
            fetchdata(`${contactUrl}?number_like=${searchTerm}`);
        } else {
            fetchdata(`${contactUrl}?name_like=${searchTerm}`);
        }
    }, 1200);
});

backbtn.addEventListener("click", () => {
    window.history.back();
})

 