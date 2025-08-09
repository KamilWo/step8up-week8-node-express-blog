import * as api from "./api.mjs";

const postForm = document.getElementById("post-form");
const categoriesContainer = document.getElementById("categories-container");
const errorMessage = document.getElementById("form-error");

/**
 * Fetches categories and populates them as checkboxes in the form.
 */
async function loadCategories() {
  try {
    const categories = await api.getCategories();
    categoriesContainer.innerHTML = ""; // Clear loader/previous content
    categories.forEach((category) => {
      const checkboxWrapper = document.createElement("div");
      checkboxWrapper.className = "checkbox-item";
      checkboxWrapper.innerHTML = `
        <input type="checkbox" id="category-${category.id}" name="categoryIds" value="${category.id}">
        <label for="category-${category.id}">${category.name}</label>
      `;
      categoriesContainer.appendChild(checkboxWrapper);
    });
  } catch (error) {
    categoriesContainer.innerHTML = "Could not load categories.";
    console.error("Failed to load categories", error);
  }
}

/**
 * Handles the form submission for creating a new post.
 */
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMessage.style.display = "none";

  const formData = new FormData(postForm);
  const title = formData.get("title");
  const content = formData.get("content");
  const categoryIds = formData.getAll("categoryIds"); // Gets all checked category IDs

  try {
    const newPost = await api.createPost({ title, content, categoryIds });
    // Redirect to the new post's page or the homepage
    window.location.href = `/`; // Or use `/post.html?id=${newPost.id}`
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  }
});

// Initial setup when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});
