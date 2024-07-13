import { filterCreation,workArrayFiltered,workCreation,classFiltered } from "./services/function.js";

const worksResponse = await fetch("http://localhost:5678/api/works");
const works = await worksResponse.json();

const categoryResponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoryResponse.json();

const filters = document.querySelector(".filter");


//On boucle la création des travaux
workCreation(works);

//Puis la création des filtres 
for (let i = 0 ;  i < categories.length ; i++) {
    filterCreation(i)
}

const btnTous = filters.getElementsByTagName("article")[0];
btnTous.classList.add("selected-filter");
const btnObject = filters.getElementsByTagName("article")[1];
const btnAppart = filters.getElementsByTagName("article")[2];
const btnHotel = filters.getElementsByTagName("article")[3];

const filterArray = [btnTous, btnObject, btnAppart, btnHotel] 

// On boucle les événements click sur les filtres afficheront les éléments filtrés
// et qui changera également l'apparence du filtre selectionné
for (let i = 0 ; i < filterArray.length ; i++) {

        filterArray[i].addEventListener('click', function () {
        workCreation(workArrayFiltered(i));
        classFiltered(filterArray,filterArray[i])
    })
}
