import { filterCreation,workArrayFiltered,workCreation,classFiltered,modalGalleryCreation } from "./services/function.js";

const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

const filters = document.querySelector(".filter");
const changeBtn = document.querySelector(".change-btn");
const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");

//On crée la galerie de base des projets
workCreation(works);

//De même pour la galerie du modal
modalGalleryCreation(works);

let token = window.localStorage.getItem("token");
console.log("token : ", token); //null 

 //Puis la création des filtres 
for (let i = 0 ;  i < categories.length ; i++) {
    filterCreation(i)
}

logoutBtn.addEventListener("click", function() {
    window.localStorage.removeItem("token")
})

if (token !== null) {
    loginBtn.classList.toggle("hide");
    logoutBtn.classList.toggle("hide");
    filters.classList.toggle("hide");
    changeBtn.classList.toggle("hide");
}

const btnTous = filters.getElementsByTagName("article")[0];
btnTous.classList.add("selected-filter");
const btnObject = filters.getElementsByTagName("article")[1];
const btnAppart = filters.getElementsByTagName("article")[2];
const btnHotel = filters.getElementsByTagName("article")[3];

const filterArray = [btnTous, btnObject, btnAppart, btnHotel] 

// On boucle les événements click sur les filtres
// et qui changera également l'apparence du filtre selectionné
for (let i = 0 ; i < filterArray.length ; i++) {

        filterArray[i].addEventListener('click', function () {
        workCreation(workArrayFiltered(i));
        classFiltered(filterArray,filterArray[i])
    })
}


//Gère l'ouverture et la fermeture de la fenêtre modale
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background")
const xmarkModal = document.querySelector(".fa-xmark");
const modifyBtn = document.querySelector(".change-btn");
const modalDisplay = [xmarkModal, modifyBtn, modalBackground]

for (let i = 0 ; i < modalDisplay.length ; i++) {
    modalDisplay[i].addEventListener('click', function () {
        modal.classList.toggle("display-modal")
})}

