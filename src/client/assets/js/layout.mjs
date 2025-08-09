import * as api from "./api.mjs";

/**
 * Checks session storage for logged-in user data.
 * @returns {object|null} The user object or null.
 */
function getLoggedInUser() {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

/**
 * Updates the header's navigation with either user info or login/register buttons.
 */
function updateHeaderNav() {
  // This targets a new, specific element in the header for dynamic content
  const userNav = document.getElementById("user-nav-links");
  if (!userNav) return;

  const user = getLoggedInUser();

  if (user) {
    // If a user is logged in, show their name and a logout button
    userNav.innerHTML = `
      <div class="user-menu">
        <span class="username">${user.username}</span>
        <button id="logout-btn" class="btn btn-primary">Logout</button>
      </div>
    `;
    // Add the event listener for the newly created logout button
    document
      .getElementById("logout-btn")
      .addEventListener("click", async () => {
        await api.logout();
        sessionStorage.removeItem("user");
        window.location.href = "/"; // Redirect to home after logout
      });
  } else {
    // If no user is logged in, show the login and register buttons
    userNav.innerHTML = `
      <a href="./login.html" class="btn btn-primary">Login</a>
      <a href="./register.html" class="btn btn-primary">Register</a>
    `;
  }
}

// When the page content is loaded, run the function to update the header.
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderNav();
});
