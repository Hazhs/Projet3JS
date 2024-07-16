const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filter");
const modalGallery = document.querySelector(".modal-gallery")

//Fonction qui crée les éléments visuels des galeries 
function galleryVisual (workArrayVisual) {

    const workFigure = document.createElement("figure");
    const workImg = document.createElement("img");
    workImg.src = workArrayVisual.imageUrl;
    workImg.alt = workArrayVisual.title;
    workFigure.appendChild(workImg);
    return workFigure
}

//Création d'élément gallery
export function workCreation (workArrayCreation) {

    gallery.innerHTML = " ";
    for (let i = 0 ; i < workArrayCreation.length ; i++) {

        //On crée et ajoute un titre à un travail
        const workElement = galleryVisual(workArrayCreation[i]) 
        const workTitle = document.createElement("figcaption");
        workTitle.innerText = workArrayCreation[i].title;

        //Puis on les place dans le DOM
        workElement.appendChild(workTitle);
        gallery.appendChild(workElement);
    }
};

//fonction qui crée la gallery du modal 
export function modalGalleryCreation (modalArray) {

    for (let i = 0 ; i < modalArray.length ; i++) {
        const modalGalleryElement = galleryVisual(modalArray[i]);
        const modalGalleryIcon = document.createElement("i");
        modalGalleryIcon.classList.add("fa-solid","fa-trash-can");
        modalGalleryElement.appendChild(modalGalleryIcon);
        modalGallery.appendChild(modalGalleryElement);

    }
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

export function classFiltered (ArrayFilter, selectedFilter) {

    for (let index = 0; index < ArrayFilter.length ; index++) {
        if (ArrayFilter[index].classList.contains("selected-filter")) {
            ArrayFilter[index].classList.remove("selected-filter")
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