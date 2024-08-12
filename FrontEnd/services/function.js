
let categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());
let works = await fetch("http://localhost:5678/api/works").then(works => works.json());

export function galleryVisualCreation (workElementVisual) {
    const workFigure = document.createElement("figure");
    const workImg = document.createElement("img");
    workFigure.dataset.id = workElementVisual.id;
    workImg.src = workElementVisual.imageUrl;
    workImg.alt = workElementVisual.title;
    workFigure.appendChild(workImg);
    return workFigure
};

export function portfolioElementCreation (portfolioWorkElement) {
    const portfolioElement = galleryVisualCreation(portfolioWorkElement);
    const workTitle = document.createElement("figcaption");
    workTitle.innerText = portfolioWorkElement.title;
    portfolioElement.appendChild(workTitle);
    return portfolioElement
};

const gallery = document.querySelector(".gallery");
export function showPortfolio (workArrayCreation) {
    gallery.innerHTML = " ";
    let portfolioArray = [];
    for (let i = 0 ; i < workArrayCreation.length ; i++) {
        const portfolioElementToAdd = portfolioElementCreation(workArrayCreation[i]);
        gallery.appendChild(portfolioElementToAdd);
        portfolioArray.push(portfolioElementToAdd)
    }
    return portfolioArray
};

function modalGalleryElementCreation (workToCreate) {
    const workToAdd = galleryVisualCreation(workToCreate);
    const modalGalleryIcon = document.createElement("i");
    modalGalleryIcon.classList.add("fa-solid","fa-trash-can");
    modalGalleryIcon.dataset.id = workToCreate.id;
    workToAdd.appendChild(modalGalleryIcon);
    return workToAdd
};

const modalGallery = document.querySelector(".modal-gallery");
export function modalGalleryCreation (modalArray) {
    for (let i = 0 ; i < modalArray.length ; i++) {
        const modalGalleryElement = modalGalleryElementCreation(modalArray[i]);
        modalGallery.appendChild(modalGalleryElement);
    }
};

const filters = document.querySelector(".filter");
export function filterCreation (categoryId) {
    const filterItem = document.createElement("article")
    filterItem.innerText = categories[categoryId].name;
    filters.appendChild(filterItem)
};

export function filteredWorkArray (categoryIdFilter) {
    const workArray = Array.from(works);
    if (categoryIdFilter > 0) {
        for (let i = workArray.length-1 ; i >= 0 ; i--) {
            if (workArray[i].categoryId != categoryIdFilter) {
                workArray.splice(i, 1)
            }}}
    return workArray;  
};

export function filteredBtnClassChange (ArrayToFilter, selectedFilter) {
    for (let i = 0; i < ArrayToFilter.length ; i++) {
        if (ArrayToFilter[i].classList.contains("selected-filter")) {
            ArrayToFilter[i].classList.remove("selected-filter")
        }}
    selectedFilter.classList.add("selected-filter")
};

export async function idServerCheckRequest (loginEmailParameter, loginPasswordParameter) {
    let loginId = {
        email: loginEmailParameter,
        password: loginPasswordParameter
    };
    loginId = JSON.stringify(loginId);
    const loginServerResponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: loginId,
    });
    const loginResponse = await loginServerResponse.json();
    return loginResponse
};

export function resetImgInputPreview (preview, previewInput) {
    preview.src="";
    preview.alt="";
    previewInput.value=""
}

export function resetInputs (preview, previewInput, titleValue, categoryInput, addWorkBtn) {
    resetImgInputPreview (preview, previewInput);
    if (preview.classList.contains("img-display")) {
        preview.classList.remove("img-display");
    }
    titleValue.value = "";
    categoryInput.selectedIndex = 0;
    addWorkBtn.style.backgroundColor = "gray";
}

export function displaySwitch (ArrayToSwitch) {
    for (let i = 0 ; i < ArrayToSwitch.length ; i++) {
        ArrayToSwitch[i].classList.toggle("hide")
    }
};

export function modalDisplay (preview, previewInput, titleValue, categoryInput, addWorkBtn) {
    const modal = document.querySelector(".modal");
    const modalBackground = document.querySelector(".modal-background");
    const xmarkModal = document.querySelector(".fa-xmark");
    const modifyBtn = document.querySelector(".modify-btn");
    const modalDisplayArray = [xmarkModal, modifyBtn, modalBackground];
    const modalGalleryInterface = document.querySelector(".modal-gallery-interface");
    const modalAddWork = document.querySelector(".modal-add-work");
    const gallerySwitchArray = [modalGalleryInterface, modalAddWork];
    for (let i = 0 ; i < modalDisplayArray.length ; i++) {
        modalDisplayArray[i].addEventListener('click', function () {
            modal.classList.toggle("display-modal");
            resetInputs(preview, previewInput, titleValue, categoryInput, addWorkBtn)
            if (modalGalleryInterface.classList.contains("hide")){
                displaySwitch(gallerySwitchArray)
            }
    })}
};



async function workDelete (workIdSupp, token) {
    if (token === null) {
        console.log("Id non confirmé")
    } else {
        await fetch(`http://localhost:5678/api/works/${workIdSupp}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }})
    }
};

export function deleteGalleriesElements (deletedElement, token) {
    const elementId = deletedElement.getAttribute("data-id");
    workDelete(elementId, token);
    const workRemove = document.querySelectorAll(`[data-id="${elementId}"]`);
    const workRemoveArray = Array.from(workRemove);
    displaySwitch(workRemoveArray);
};

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
};

export function addWorkToGalleries (NewWork) {
    const modalGalleryNewElement = modalGalleryElementCreation(NewWork);
    modalGallery.appendChild(modalGalleryNewElement);
    const portfolioGalleryElement = portfolioElementCreation(NewWork);
    gallery.appendChild(portfolioGalleryElement);
    return modalGalleryNewElement
};