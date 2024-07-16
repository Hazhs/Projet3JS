import {idServerCheck} from "./services/function.js";
const login = document.getElementById("connexion");
const errorMessage = document.querySelector(".errorMessage");


login.addEventListener('submit', async function (event) {

    event.preventDefault();
    errorMessage.innerText = " ";
    //On récupère les entrées et on envoit au backend pour vérification
    let loginEmail = document.getElementById("email").value;
    let loginPassword = document.getElementById("password").value;
    const loginIdReturn = await idServerCheck(loginEmail, loginPassword);

    //On vérifie la présence de l'attribut token dans la réponse et on renvoit vers index.html si c'est le cas
    if (Object.hasOwn(loginIdReturn, "token")) {
        const tokenUser = loginIdReturn.token;
        window.localStorage.setItem("token", tokenUser)
        console.log(tokenUser)
        window.location.href = "index.html"
    }
    else {
        errorMessage.innerText = "Email ou mot de passe incorrect"
    }
});

// stocker le token (localStorage ?)
// il va falloir qu'on garde le token malgré la redirection vers l'index.html