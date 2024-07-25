let works = await fetch("http://localhost:5678/api/works").then(works => works.json());
let categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filter");
const modalGallery = document.querySelector(".modal-gallery")

//Fonction qui crée les éléments visuels des galeries 
function galleryVisual (workArrayVisual) {

    const workFigure = document.createElement("figure");
    const workImg = document.createElement("img");
    workFigure.dataset.id = workArrayVisual.id;
    workImg.src = workArrayVisual.imageUrl;
    workImg.alt = workArrayVisual.title;
    workFigure.appendChild(workImg);
    return workFigure
}

//Création d'élément gallery
export function showPortfolio (workArrayCreation) {

    let portfolioArray = [];
    gallery.innerHTML = " ";
    for (let i = 0 ; i < workArrayCreation.length ; i++) {

        const workElement = galleryVisual(workArrayCreation[i]);
        //workElement.name = works[i].id;
        const workTitle = document.createElement("figcaption");
        workTitle.innerText = workArrayCreation[i].title;
        workElement.appendChild(workTitle);
        gallery.appendChild(workElement);
        portfolioArray.push(workElement);

    }
    return portfolioArray
};

//fonction qui crée la gallery du modal 
export function modalGalleryCreation (modalArray) {

    modalGallery.innerHTML = " ";
    let modalGalleryArray = [];
    for (let i = 0 ; i < modalArray.length ; i++) {

        const modalGalleryElement = galleryVisual(modalArray[i]);
        modalGalleryElement.dataset.id = works[i].id;
        const modalGalleryIcon = document.createElement("i");
        modalGalleryIcon.classList.add("fa-solid","fa-trash-can");
        modalGalleryIcon.dataset.id = works[i].id;
        modalGalleryElement.appendChild(modalGalleryIcon);
        modalGallery.appendChild(modalGalleryElement);
        modalGalleryArray.push(modalGalleryElement);

    }
    return modalGalleryArray
}

//Création de filtre
export function filterCreation (categoriesId) {
    
    const filterItem = document.createElement("article")
    filterItem.innerText = categories[categoriesId].name;
    filters.appendChild(filterItem)

}

//Fonction qui crée un array filtré par categoryID

export function workArrayFiltered (categorieIdFilter) {

    const workArray = Array.from(works);
    if (categorieIdFilter > 0) {
        for (let i = workArray.length-1 ; i >= 0 ; i--) {
            if (workArray[i].categoryId != categorieIdFilter) {
                workArray.splice(i, 1);
            }
        }
    }
    return workArray;  
}

//fonction qui vérifie et enlève la classe à tous les boutons puis met la classe au bouton cliqué

export function filteredClassBtn (ArrayToFilter, selectedFilter) {

    for (let index = 0; index < ArrayToFilter.length ; index++) {
        if (ArrayToFilter[index].classList.contains("selected-filter")) {
            ArrayToFilter[index].classList.remove("selected-filter")
        }        
    }
    selectedFilter.classList.add("selected-filter")
}

//fonction qui récupère les entrées du formulaire, et l'envoit au serveur pour vérification

export async function idServerCheck (loginEmailParameter, loginPasswordParameter) {

    let loginId = {
        email: loginEmailParameter,
        password: loginPasswordParameter
    };
    loginId = JSON.stringify(loginId);
    console.log(loginId);
    //On envoit au backend pour vérification
    const loginServerResponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {
        "Content-Type": "application/json",
        },
        body: loginId,
    });
    const loginResponse = await loginServerResponse.json();
    console.log(loginResponse);
    return loginResponse

}

//Gère l'ouverture et la fermeture de la fenêtre modale
export function modalDisplay () {

    const modal = document.querySelector(".modal");
    const modalBackground = document.querySelector(".modal-background")
    const xmarkModal = document.querySelector(".fa-xmark");
    const modifyBtn = document.querySelector(".modify-btn");
    const modalDisplayArray = [xmarkModal, modifyBtn, modalBackground];

    for (let i = 0 ; i < modalDisplayArray.length ; i++) {
        modalDisplayArray[i].addEventListener('click', function () {
            modal.classList.toggle("display-modal")

    })}
}

export function displaySwitch (ArrayToSwitch) {

    for (let i = 0 ; i < ArrayToSwitch.length ; i++) {
        ArrayToSwitch[i].classList.toggle("hide")
    }
}


export async function addWork (formImg, formTitle, formCategoryId, token) {

    workAddRequest = await fetch("http://localhost:5678/api/works", {
        method: "POST", 
        headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        },
        body: {
            "image" : formImg,
            "title" : formTitle,
            "category" : formCategoryId
        }
    })
    // image (string)
    // title (string)
    // categoryId (number)
}






//Fonction qui supprime un travail et refresh la gallery modal

export async function workDelete (workIdSupp, token) {

    if (token === null) {
        console.log("Id non confirmé")
    } else {
        await fetch(`http://localhost:5678/api/works/${workIdSupp}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
}