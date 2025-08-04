function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}var t=globalThis,r={},n={},o=t.parcelRequire6684;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},t.parcelRequire6684=o),(0,o.register)("e1C8v",function(t,r){async function n(e,t={}){try{let r=await fetch("/api"+e,t);if(!r.ok){let e=await r.json();throw Error(e.message||"An unknown error occurred")}if(204===r.status)return null;return r.json()}catch(e){throw console.error("API request error:",e),e}}e(t.exports,"logout",()=>o),e(t.exports,"getPosts",()=>s),e(t.exports,"createPost",()=>a),e(t.exports,"getCategories",()=>i);let o=()=>n("/auth/logout",{method:"POST"}),s=(e=null)=>n(e?`/posts?category=${e}`:"/posts"),a=e=>n("/posts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=()=>n("/categories")});var s=o("e1C8v");document.addEventListener("DOMContentLoaded",()=>{!function(){let e=document.getElementById("user-nav-links");if(!e)return;let t=function(){let e=sessionStorage.getItem("user");return e?JSON.parse(e):null}();t?(e.innerHTML=`
      <div class="user-menu">
        <span class="username">${t.username}</span>
        <button id="logout-btn" class="btn">Logout</button>
      </div>
    `,document.getElementById("logout-btn").addEventListener("click",async()=>{await s.logout(),sessionStorage.removeItem("user"),window.location.href="/"})):e.innerHTML=`
      <a href="/login.html" class="btn">Login</a>
      <a href="/register.html" class="btn btn-primary">Register</a>
    `}()});
//# sourceMappingURL=client.03993e0e.js.map
