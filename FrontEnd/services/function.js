const worksResponse = await fetch("http://localhost:5678/api/works");
const works = await worksResponse.json();

const categoryResponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoryResponse.json();

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filter");

//Création d'élément gallery
export function workCreation (workArrayCreation) {

    gallery.innerHTML = " ";
    for (let i = 0 ; i < workArrayCreation.length ; i++) {

        //On crée et on assigne les valeurs aux éléments d'un travail
        const workElement = document.createElement("figure");
        const workImg = document.createElement("img");
        workImg.src = workArrayCreation[i].imageUrl;
        workImg.alt = workArrayCreation[i].title;
        const workTitle = document.createElement("figcaption");
        workTitle.innerText = workArrayCreation[i].title;

        //Puis on les place dans le DOM
        workElement.appendChild(workImg);
        workElement.appendChild(workTitle);
        gallery.appendChild(workElement);
    }
};

//Création de filtre
export function filterCreation (categoriesId) {
    
    const filterItem = document.createElement("article")
    filterItem.innerText = categories[categoriesId].name;
    filters.appendChild(filterItem)

}

//Fonction qui crée un array filtrant les travaux par categoryID
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

