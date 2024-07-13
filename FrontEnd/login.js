const login = document.getElementById("connexion");
const errorMessage = document.querySelector(".errorMessage");


login.addEventListener('submit', async function (event) {

    event.preventDefault();
    errorMessage.innerText = " "
    let loginEmail = document.getElementById("email").value;
    let loginPassword = document.getElementById("password").value;
    let loginId = {
        email: loginEmail,
        password: loginPassword
    };
    loginId = JSON.stringify(loginId);
    console.log(loginId);
    const loginResponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {
        "Content-Type": "application/json",
        },
        body: loginId,
    });
    const loginIdReturn = await loginResponse.json();
    console.log(loginIdReturn);
    if (Object.hasOwn(loginIdReturn, "token")) {
        const tokenUser = loginIdReturn.token;
        window.location.href = "index.html"
    }
    else {
    errorMessage.innerText = "Email ou mot de passe incorrect"
    }
});


// changer en fonction une partie de AddEventListener submit
// stocker le token (localStorage ?)
// il va falloir qu'on garde le token malgré la redirection vers l'index.html