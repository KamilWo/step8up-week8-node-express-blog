var e=globalThis,t={},r={},n=e.parcelRequire6684;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},e.parcelRequire6684=n),n.register;var o=n("e1C8v");const a=document.getElementById("post-content-area"),s=document.querySelector("title");document.addEventListener("DOMContentLoaded",async()=>{let e=new URLSearchParams(window.location.search).get("id");if(!e){a.innerHTML="<h1>Post not found.</h1>";return}try{var t=await o.getPostById(e);s.textContent=`${t.title} - Express Blog`;let r=new Date(t.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),n=t.categories?.map(e=>`<span class="category-tag">${e.name}</span>`).join("")||"No categories assigned.",i=t.content.replace(/\n/g,"<br />");a.innerHTML=`
    <div class="post-header">
      <h1>${t.title}</h1>
      <div class="post-meta">
        <span>By ${t.User?.username||"Unknown"} on ${r}</span>
      </div>
    </div>
    <div class="post-body">
      <p>${i}</p>
    </div>
    <div class="post-footer">
      <h3>Categories</h3>
      <div class="post-categories">${n}</div>
    </div>
  `}catch(e){console.error("Failed to load post:",e),a.innerHTML=`<h1>Error: ${e.message}</h1>`}});
//# sourceMappingURL=post.d1bdd28a.js.map
