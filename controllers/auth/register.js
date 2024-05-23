import { createUser } from "../app.js";

document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById("register-btn");
    const email = document.getElementById("email");
    const confirmPassword = document.getElementById("confirm-password");
    const password = document.getElementById("password");

    registerBtn.addEventListener("click", async () => {
        if(!(confirmPassword.value === password.value)) {
            alert("Las contraseñas deben de coincidir");
            return;
        }
        await createUser(email.value, password.value).then(() => {
            window.location.href = "login.html";
        }).catch((e)=> {
            alert(e);
        });
    });
});