import { signIn } from "../app.js";

document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.getElementById("signIn-btn");
  const email = document.getElementById("user-email");
  const password = document.getElementById("user-password");

  signInBtn.addEventListener("click", async () => {
    await signIn(email.value, password.value)
      .then(() => {
        window.location.href = "../"
      })
      .catch((e) => {
        alert(e);
      });
  });
});
