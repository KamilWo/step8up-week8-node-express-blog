import * as api from "./api.mjs";

const postContentArea = document.getElementById("post-content-area");
const pageTitle = document.querySelector("title");

/**
 * Renders the full post details onto the page.
 * @param {object} post - The post object from the API.
 */
function renderPost(post) {
  pageTitle.textContent = `${post.title} - Express Blog`;

  const postDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const categoriesHtml =
    post.categories
      ?.map((cat) => `<span class="category-tag">${cat.name}</span>`)
      .join("") || "No categories assigned.";

  // Use .replace to turn newline characters into <br> tags for proper formatting
  const formattedContent = post.content.replace(/\n/g, "<br />");

  postContentArea.innerHTML = `
    <div class="post-header">
      <h1>${post.title}</h1>
      <div class="post-meta">
        <span>By ${post.User?.username || "Unknown"} on ${postDate}</span>
      </div>
    </div>
    <div class="post-body">
      <p>${formattedContent}</p>
    </div>
    <div class="post-footer">
      <h3>Categories</h3>
      <div class="post-categories">${categoriesHtml}</div>
    </div>
  `;
}

// On page load, get the post ID from the URL and fetch the data.
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    postContentArea.innerHTML = "<h1>Post not found.</h1>";
    return;
  }

  try {
    const post = await api.getPostById(postId);
    renderPost(post);
  } catch (error) {
    console.error("Failed to load post:", error);
    postContentArea.innerHTML = `<h1>Error: ${error.message}</h1>`;
  }
});
