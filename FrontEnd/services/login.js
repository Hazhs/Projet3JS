
import {idServerCheckRequest} from "./function.js";
const login = document.getElementById("connexion");
const errorMessage = document.querySelector(".errorMessage");

login.addEventListener('submit', async function (event) {
    event.preventDefault();
    errorMessage.innerText = " ";
    let loginEmail = document.getElementById("email").value;
    let loginPassword = document.getElementById("password").value;
    const loginIdReturn = await idServerCheckRequest(loginEmail, loginPassword);
    if (Object.hasOwn(loginIdReturn, "token")) {
        const tokenUser = loginIdReturn.token;
        window.sessionStorage.setItem("token", tokenUser);
        window.location.href = "index.html"
    } else {
        errorMessage.innerText = "Email ou mot de passe incorrect"
    }
});
