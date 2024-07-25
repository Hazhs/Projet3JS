import { filterCreation,workArrayFiltered,filteredClassBtn,modalGalleryCreation, modalDisplay, showPortfolio, displaySwitch, workDelete } from "./services/function.js";

let works = await fetch("http://localhost:5678/api/works").then(works => works.json());
let categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");
const modifyBtn = document.querySelector(".modify-btn");
const filters = document.querySelector(".filter");
const modalGalleryInterface = document.querySelector(".modal-gallery-interface");
const modalAddWork = document.querySelector(".modal-add-work");
const galleryAddBtn = document.querySelector(".modal-gallery-btn");
const modalArrowLeft = document.querySelector(".fa-arrow-left");

let portfolioGallery = showPortfolio(works);
let modalGallery = modalGalleryCreation(works);

let token = window.sessionStorage.getItem("token");
logoutBtn.addEventListener("click", function() {
    window.sessionStorage.removeItem("token")
});

if (token !== null) {
    const logedArray = [loginBtn, logoutBtn, modifyBtn, filters];
    displaySwitch(logedArray);
    modalDisplay()
};

for (let i = 0 ;  i < categories.length ; i++) {
    filterCreation(i)
};

let filterArray = []; 
for (let i = 0 ; i < categories.length + 1 ; i++) {
    let filter = filters.getElementsByTagName("article")[i];
    filterArray.push(filter)
};
filterArray[0].classList.add("selected-filter");

for (let i = 0 ; i < filterArray.length ; i++) {
    filterArray[i].addEventListener('click', function () {
    showPortfolio(workArrayFiltered(i));
    filteredClassBtn(filterArray,filterArray[i])
})};

const gallerySwitchArray = [modalGalleryInterface, modalAddWork];

galleryAddBtn.addEventListener("click", function() {
    displaySwitch(gallerySwitchArray)
})

modalArrowLeft.addEventListener("click", function() {
    displaySwitch(gallerySwitchArray)
})

let trashCanArray = document.querySelectorAll(".fa-trash-can");

trashCanArray.forEach(element => {

    element.addEventListener("click",  function () {

        const elementId = element.getAttribute("data-id");
        workDelete(elementId, token);
        const workRemove = document.querySelectorAll(`[data-id="${elementId}"]`);
        const workRemoveArray = Array.from(workRemove);
        displaySwitch(workRemoveArray);
        
    })
})

const formAddImgBtn = document.querySelector(".img-select");
const addFileBtn = document.getElementById("img-to-add");

formAddImgBtn.addEventListener("click", function(event) {
    event.preventDefault();
    addFileBtn.click();

})