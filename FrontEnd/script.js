const worksResponse = await fetch("http://localhost:5678/api/works");
const works = await worksResponse.json();


//On souhaite générer chaque élément de works dynamiquement 

//On récupère la div ou viendra s'insérer chacun des travaux
const gallery = document.querySelector(".gallery");

//On boucle la création d'un travail 
for (let i = 0 ; i < works.length ; i++) {

    //On crée et on assigne les valeurs aux éléments d'un travail
    const workElement = document.createElement("figure");
    const workImg = document.createElement("img");
    workImg.src = works[i].imageUrl;
    workImg.alt = works[i].title;
    const workTitle = document.createElement("figcaption");
    workTitle.innerText = works[i].title;

    //Puis on les place dans le DOM
    workElement.appendChild(workImg);
    workElement.appendChild(workTitle);
    gallery.appendChild(workElement);

}

const categoryResponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoryResponse.json();

const filter = document.querySelector(".filter");

for (let i = 0 ;  i < categories.length ; i++) {

    const filterItem = document.createElement("article")
    filterItem.innerText = categories[i].name;
    filter.appendChild(filterItem)

}

