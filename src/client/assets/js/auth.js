import * as api from './api.js';

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const errorMessage = document.getElementById("form-error");

function saveUserAndRedirect(data) {
  sessionStorage.setItem("user", JSON.stringify(data.user));
  window.location.href = "/";
}

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = await api.login(email, password);
      saveUserAndRedirect(data);
    } catch (error) {
      displayError(error.message);
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = await api.register(username, email, password);
      saveUserAndRedirect(data);
    } catch (error) {
      displayError(error.message);
    }
  });
}
