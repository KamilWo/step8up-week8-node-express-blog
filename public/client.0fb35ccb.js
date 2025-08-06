var e=globalThis,t={},a={},n=e.parcelRequire6684;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){a[e]=t},e.parcelRequire6684=n),n.register;var r=n("e1C8v");const s=document.getElementById("post-list"),o=document.getElementById("category-tags"),i=document.getElementById("new-post-btn");function c(){let e=sessionStorage.getItem("user");return e?JSON.parse(e):null}async function l(e=null){try{let t=await r.getPosts(e);!function(e){let t=c();if(s.innerHTML="",!e||0===e.length){s.innerHTML="<li>No posts found.</li>";return}e.forEach(e=>{let a=new Date(e.createdAt).toLocaleDateString(),n=e.categories?.map(e=>`<span class="category-tag">${e.name}</span>`).join("")||"",r=document.createElement("li");r.className="post-card",r.innerHTML=`
      <div class="post-card-header">
        <h2><a href="./post.html?id=${e.id}">${e.title}</a></h2>
      </div>
      <div class="post-card-meta">
        <span>By ${e.user?.username||"Unknown"} on ${a}</span>
      </div>
      <div class="post-card-content">
        <p>${e.content.substring(0,200)}...</p>
      </div>
      <div class="post-card-footer">
        <div class="post-categories">${n}</div>
        <div class="post-actions">
          ${t&&t.id===e.userId?`<a href="./edit-post.html?id=${e.id}" class="btn btn-primary">Edit</a>`:""}
        </div>
      </div>
    `,s.appendChild(r)})}(t)}catch(e){s.innerHTML="<li>Error loading posts. Please try again later.</li>"}}async function d(){try{let e=await r.getCategories();o.innerHTML="",e.forEach(e=>{let t=document.createElement("span");t.className="category-tag",t.textContent=e.name,t.dataset.categoryId=e.id,t.addEventListener("click",()=>{document.querySelectorAll(".category-filter .category-tag").forEach(e=>e.classList.remove("active")),t.classList.add("active"),l(e.id)}),o.appendChild(t)})}catch(e){console.error("Failed to load categories",e)}}document.addEventListener("DOMContentLoaded",()=>{c()&&(i.style.display="inline-block"),l(),d()});
//# sourceMappingURL=client.0fb35ccb.js.map
