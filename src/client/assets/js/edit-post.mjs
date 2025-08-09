import * as api from "./api.mjs";

const postForm = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const categoriesContainer = document.getElementById("categories-container");
const errorMessage = document.getElementById("form-error");

const postId = new URLSearchParams(window.location.search).get("id");

/**
 * Fetches post and category data, then populates the form.
 */
async function populateForm() {
  if (!postId) {
    window.location.href = "/"; // Redirect if no ID is present
    return;
  }

  try {
    // Fetch post data and all available categories concurrently
    const [post, allCategories] = await Promise.all([
      api.getPostById(postId),
      api.getCategories(),
    ]);

    // Pre-fill the title and content fields
    titleInput.value = post.title;
    contentInput.value = post.content;

    // Get a set of the post's current category IDs for easy lookup
    const postCategoryIds = new Set(post.categories.map((cat) => cat.id));

    // Create checkboxes for all categories and check the ones associated with the post
    allCategories.forEach((category) => {
      const isChecked = postCategoryIds.has(category.id);
      const checkboxWrapper = document.createElement("div");
      checkboxWrapper.className = "checkbox-item";
      checkboxWrapper.innerHTML = `
        <input type="checkbox" id="category-${category.id}" name="categoryIds" value="${category.id}" ${isChecked ? "checked" : ""}>
        <label for="category-${category.id}">${category.name}</label>
      `;
      categoriesContainer.appendChild(checkboxWrapper);
    });
  } catch (error) {
    errorMessage.textContent = `Failed to load post data: ${error.message}`;
    errorMessage.style.display = "block";
  }
}

/**
 * Handles the form submission to update the post.
 */
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMessage.style.display = "none";

  const formData = new FormData(postForm);
  const updatedData = {
    title: formData.get("title"),
    content: formData.get("content"),
    categoryIds: formData.getAll("categoryIds"),
  };

  try {
    await api.updatePost(postId, updatedData);
    // Redirect to the newly updated post's page
    window.location.href = `/post.html?id=${postId}`;
  } catch (error) {
    errorMessage.textContent = `Failed to update post: ${error.message}`;
    errorMessage.style.display = "block";
  }
});

// Initial setup when the page loads
document.addEventListener("DOMContentLoaded", populateForm);
