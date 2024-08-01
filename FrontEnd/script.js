import { filterCreation, workArrayFiltered, filteredClassBtn, modalGalleryCreation, modalDisplay, showPortfolio, displaySwitch, newWork, addWorkToGalleries, deleteElement } from "./services/function.js";

let works = await fetch("http://localhost:5678/api/works").then(works => works.json());
showPortfolio(works);
modalGalleryCreation(works);

const logoutBtn = document.querySelector(".logout-btn");
let token = window.sessionStorage.getItem("token");
logoutBtn.addEventListener("click", function() {
    window.sessionStorage.removeItem("token")
});

const loginBtn = document.querySelector(".login-btn");
const modifyBtn = document.querySelector(".modify-btn");
const filters = document.querySelector(".filter");
if (token !== null) {
    const logedArray = [loginBtn, logoutBtn, modifyBtn, filters];
    displaySwitch(logedArray);
    modalDisplay()
};

let categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());
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

const modalGalleryInterface = document.querySelector(".modal-gallery-interface");
const modalAddWork = document.querySelector(".modal-add-work");
const galleryModalBtn = document.querySelector(".modal-gallery-btn");
const modalArrowLeft = document.querySelector(".fa-arrow-left");
const gallerySwitchArray = [modalGalleryInterface, modalAddWork];
galleryModalBtn.addEventListener("click", function() {
    displaySwitch(gallerySwitchArray)
});
modalArrowLeft.addEventListener("click", function() {
    displaySwitch(gallerySwitchArray)
});

const trashCanElement = document.querySelectorAll(".fa-trash-can");
let trashCanArray = Array.from(trashCanElement);
trashCanArray.forEach(element => {
    element.addEventListener("click", () => deleteElement(element, token))
});

const imgArea = document.querySelector(".img-area");
const imgAreaImgIcon = imgArea.querySelector(".fa-image");
const imgAreaBtn = imgArea.querySelector(".img-select");
const imgAreah5 = imgArea.querySelector(".valid-format");
const imgAreaArray = [imgAreaImgIcon, imgAreaBtn, imgAreah5]
let imgPreview = document.getElementById("img-preview");
let addImgInput = document.getElementById("img-to-add");
imgPreview.addEventListener("click", function () {
    imgPreview.classList.toggle("img-display");
    imgPreview.alt="";   
    imgPreview.src="";
    addImgInput.value = "";
    displaySwitch(imgAreaArray)
})

const formAddImgBtn = document.querySelector(".img-select");
formAddImgBtn.addEventListener("click", function(event) {
    event.preventDefault();
    addImgInput.click();
});
addImgInput.addEventListener("change", function () {
    let imgNewWork = addImgInput.files[0];   
    if (imgNewWork) {
        console.log("check type")
        const imgType = imgNewWork.type;
        const validType = ['image/jpg', 'image/png', 'image/jpeg']
        if (!validType.includes(imgType)) {
            alert("veuillez ajouter un format de fichier valide")
            this.value = " ";
        } else {
            console.log("format d'image valide")
            const readerForPreview = new FileReader();
            readerForPreview.onload = function(e) {               
                imgPreview.src = e.target.result;
                imgPreview.classList.toggle("img-display");
                imgPreview.alt = imgNewWork.name;
                displaySwitch(imgAreaArray)               
            }
            readerForPreview.readAsDataURL(imgNewWork);
        }}        
    })

const addWorkBtn = document.getElementById("add-work-btn");
let addTitle = document.getElementById("add-title");
let selectedCategories = document.getElementById("add-categories");
addWorkBtn.addEventListener("click", async function (event) {

    event.preventDefault();
    let imgInput = addImgInput.files[0];
    const selectedCategory = Number(selectedCategories.value);
    console.log(selectedCategory, addTitle.value, imgInput);
    try {
        let workRequest = await newWork(imgInput, addTitle.value, selectedCategory, token);
        if (!workRequest.ok) {
            alert("Veuillez Renseigner tous les champs")
        } else {
            let workAnswer = await workRequest.json();
            console.log(workAnswer);
            const newWorkElement = addWorkToGalleries(workAnswer);
            const newWorkTrashCan = newWorkElement.querySelector(".fa-trash-can");
            newWorkTrashCan.addEventListener("click", () => deleteElement(newWorkTrashCan, token));
            console.log("nouvel élément ajouté : ", newWorkElement);
            addImgInput.value = "";
            imgPreview.src = "";
            imgPreview.alt = "";
            addTitle.value = "";
            selectedCategories.selectedIndex = 0;
            imgPreview.classList.toggle("img-display");
            addWorkBtn.style.backgroundColor = "gray";
            displaySwitch(imgAreaArray)
        }
    } catch (error) {
        console.error("Erreur avec la requête fetch", error)
    }
})

const AddModalArrayChange = [addImgInput, addTitle, selectedCategories];
for (let i = 0 ; i < AddModalArrayChange.length ; i++) {
    AddModalArrayChange[i].addEventListener("change", function () {
        if (addImgInput.value !== "" && addTitle.value !== "" && selectedCategories.value !== "0") {
            addWorkBtn.style.backgroundColor = "#1D6154"
        }
        else {
            addWorkBtn.style.backgroundColor = "gray"
        }
    })
}