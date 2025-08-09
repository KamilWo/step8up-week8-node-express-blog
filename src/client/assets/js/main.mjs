import * as api from './api.mjs';

const postList = document.getElementById("post-list");
const categoryTagsContainer = document.getElementById("category-tags");
const newPostBtn = document.getElementById("new-post-btn");

function getLoggedInUser() {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function renderPosts(posts) {
  const user = getLoggedInUser();
  postList.innerHTML = ""; // Clear existing posts
  if (!posts || posts.length === 0) {
    postList.innerHTML = "<li>No posts found.</li>";
    return;
  }

  posts.forEach((post) => {
    const postDate = new Date(post.createdAt).toLocaleDateString();
    // The backend needs to include categories on the post object
    const categoriesHtml =
      post.categories
        ?.map((cat) => `<span class="category-tag">${cat.name}</span>`)
        .join("") || "";

    const postCard = document.createElement("li");
    postCard.className = "post-card";
    postCard.innerHTML = `
      <div class="post-card-header">
        <h2><a href="./post.html?id=${post.id}">${post.title}</a></h2>
      </div>
      <div class="post-card-meta">
        <span>By ${post.user?.username || 'Unknown'} on ${postDate}</span>
      </div>
      <div class="post-card-content">
        <p>${post.content.substring(0, 200)}...</p>
      </div>
      <div class="post-card-footer">
        <div class="post-categories">${categoriesHtml}</div>
        <div class="post-actions">
          ${user && user.id === post.userId ? `<a href="./edit-post.html?id=${post.id}" class="btn btn-primary">Edit</a>` : ""}
        </div>
      </div>
    `;
    postList.appendChild(postCard);
  });
}

async function loadPosts(categoryId = null) {
  try {
    const posts = await api.getPosts(categoryId);
    renderPosts(posts);
  } catch (error) {
    postList.innerHTML =
      `<li>Error loading posts. Please try again later.</li>`;
  }
}

async function loadCategories() {
  try {
    const categories = await api.getCategories();
    categoryTagsContainer.innerHTML = "";
    categories.forEach((cat) => {
      const tag = document.createElement("span");
      tag.className = "category-tag";
      tag.textContent = cat.name;
      tag.dataset.categoryId = cat.id;
      tag.addEventListener("click", () => {
        // Handle active state for styling
        document
          .querySelectorAll(".category-filter .category-tag")
          .forEach((t) => t.classList.remove("active"));
        tag.classList.add("active");
        loadPosts(cat.id);
      });
      categoryTagsContainer.appendChild(tag);
    });
  } catch (error) {
    console.error("Failed to load categories", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (getLoggedInUser()) {
    newPostBtn.style.display = "inline-block";
  }
  loadPosts();
  loadCategories();
});
