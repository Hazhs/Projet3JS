let works = await fetch("http://localhost:5678/api/works").then(works => works.json());
let categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filter");
const modalGallery = document.querySelector(".modal-gallery")

//Fonction qui crée les éléments visuels des galeries 
export function galleryVisual (workElementVisual) {

    const workFigure = document.createElement("figure");
    const workImg = document.createElement("img");
    workFigure.dataset.id = workElementVisual.id;
    workImg.src = workElementVisual.imageUrl;
    workImg.alt = workElementVisual.title;
    workFigure.appendChild(workImg);
    return workFigure
}

export function portfolioElementCreation (portfolioWorkElement) {

    const portfolioElement = galleryVisual(portfolioWorkElement);
    portfolioElement.dataset.id = portfolioWorkElement.id;
    const workTitle = document.createElement("figcaption");
    workTitle.innerText = portfolioWorkElement.title;
    portfolioElement.appendChild(workTitle);

    return portfolioElement
}

export function showPortfolio (workArrayCreation) {

    gallery.innerHTML = " ";
    let portfolioArray = [];
    for (let i = 0 ; i < workArrayCreation.length ; i++) {

        const portfolioElementToAdd = portfolioElementCreation(workArrayCreation[i])
        gallery.appendChild(portfolioElementToAdd);
        portfolioArray.push(portfolioElementToAdd);

    }
    return portfolioArray
};

function modalGalleryElementCreation (workToCreate) {

    const workToAdd = galleryVisual(workToCreate);
    workToAdd.dataset.id = workToCreate.id;
    const modalGalleryIcon = document.createElement("i");
    modalGalleryIcon.classList.add("fa-solid","fa-trash-can");
    modalGalleryIcon.dataset.id = workToCreate.id;
    workToAdd.appendChild(modalGalleryIcon);

    return workToAdd
}

export function modalGalleryCreation (modalArray) {

    modalGallery.innerHTML = " ";
    let modalGalleryArray = [];
    for (let i = 0 ; i < modalArray.length ; i++) {

        const modalGalleryElement = modalGalleryElementCreation(modalArray[i]);
        modalGallery.appendChild(modalGalleryElement);
        modalGalleryArray.push(modalGalleryElement);

    }
    return modalGalleryArray
}

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

async function workDelete (workIdSupp, token) {

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

export async function newWork (formImg, formTitle, formCategoryId, token) {

    const formData = new FormData();
    formData.append("image", formImg);
    formData.append("title", formTitle);
    formData.append("category", formCategoryId);

    const workAddRequest = await fetch("http://localhost:5678/api/works", {
        method: "POST", 
        headers: {
        'Authorization': `Bearer ${token}`,
        },
        body: formData
    });
    return workAddRequest
}

export function addWorkToGalleries (NewWork) {

    const modalGalleryNewElement = modalGalleryElementCreation(NewWork);
    modalGallery.appendChild(modalGalleryNewElement);
    const portfolioGalleryElement = portfolioElementCreation(NewWork);
    gallery.appendChild(portfolioGalleryElement);
    return modalGalleryNewElement

}

export function deleteElement (deletedElement, token) {

    const elementId = deletedElement.getAttribute("data-id");
    workDelete(elementId, token);
    const workRemove = document.querySelectorAll(`[data-id="${elementId}"]`);
    const workRemoveArray = Array.from(workRemove);
    displaySwitch(workRemoveArray);

}