var q=Object.defineProperty;var B=(e,t,s)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var x=(e,t,s)=>B(e,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const C=()=>{const e=new Set;return{subscribe:l=>e.add(l),notify:()=>e.forEach(l=>l())}},G=(e,t)=>{const{subscribe:s,notify:l}=C();let o={...e};const r=i=>{o={...o,...i},l()},a=()=>({...o}),u=Object.fromEntries(Object.entries(t).map(([i,$])=>[i,(...T)=>r($(a(),...T))]));return{getState:a,setState:r,subscribe:s,actions:u}},H=(e,t=window.localStorage)=>({get:()=>JSON.parse(t.getItem(e)),set:r=>t.setItem(e,JSON.stringify(r)),reset:()=>t.removeItem(e)}),V=e=>{const{subscribe:t,notify:s}=C(),l=()=>window.location.pathname,o=()=>e[l()],r=a=>{window.history.pushState(null,null,a),s()};return window.addEventListener("popstate",()=>s()),{get path(){return l()},push:r,subscribe:t,getTarget:o}};function n(e,t,...s){function l(o){return o.filter(r=>r!=null&&r!==!1).reduce((r,a)=>(Array.isArray(a)?r.push(...l(a)):r.push(a),r),[])}return{type:e,props:t,children:l(s)}}const m=new Map;let N=null;const S=new Map;function O(e,t,s){console.log("1"),m.has(t)||m.set(t,new Map),m.get(t).set(e,s)}function k(e,t){if(!m.has(t))return;const s=m.get(t);s.has(e)&&s.delete(e)}function W(e){console.log("2"),N=e,S.forEach((t,s)=>{N.removeEventListener(s,t)}),S.clear(),m.forEach((t,s)=>{const l=o=>{for(const[r,a]of t.entries())if(r===o.target||r.contains(o.target)){a(o);break}};N.addEventListener(s,l),S.set(s,l)})}function p(e){if(e==null||typeof e=="boolean")return document.createTextNode("");if(typeof e=="string"||typeof e=="number")return document.createTextNode(e.toString());if(Array.isArray(e)){const s={nodeType:Node.DOCUMENT_FRAGMENT_NODE,childNodes:[]};return e.map(l=>{s.childNodes.push(document.createElement(l.type))}),s}console.log("createElement vNode:",e);const t=document.createElement(e.type);for(const[s,l]of Object.entries(e.props||{}))if(console.log("key:",s),s==="className")t.setAttribute("class",l);else if(s.startsWith("on")&&typeof l=="function"){const o=s.slice(2).toLowerCase();O(t,o,l)}else t.setAttribute(s,l);for(const s of e.children||[])t.appendChild(p(s));return t}function L(e){return console.log("normalizeVNode:",e),e==null||e==null||typeof e=="boolean"?(console.log("여기는 다 빈값으로 가는거야"),""):typeof e=="string"||typeof e=="number"?e.toString():typeof e.type=="function"?(console.log("여기는 함수형 컴포넌트로 가는거야"),console.log("vNode.props:",e.props),L(e.type({...e.props,children:e.children}))):{type:e.type,props:e.props,children:Array.isArray(e.children)?e.children.map(L).filter(t=>t!==""):e.children}}function z(e,t,s){const l=t||{},o=s||{};Object.keys(l).forEach(r=>{const a=l[r],u=o[r];if(a!==u)if(r.startsWith("on")){const i=r.slice(2).toLowerCase();u&&k(e,i),a&&O(e,i,a)}else r==="className"?e.className=a:e.setAttribute(r,a)}),Object.keys(o).forEach(r=>{if(o[r],!l[r]&&r.startsWith("on")){const a=r.slice(2).toLowerCase();k(e,a)}})}function I(e,t,s,l=0){const o=e.childNodes[l];if(!t){o&&e.removeChild(o);return}if(!s){e.appendChild(p(t));return}if(t.type!==s.type){e.replaceChild(p(t),e.childNodes[l]);return}if(typeof t=="string"||typeof s=="string"){t!==s&&e.replaceChild(document.createTextNode(t),e.childNodes[l]);return}t.type===s.type&&z(e.childNodes[l],t.props,s.props);const r=Math.max(t.children.length,s.children.length);for(let a=0;a<r;a++)I(e.children[l],t.children[a],s.children[a],a)}let A=null;function J(e,t){const s=L(e);t.children.length?I(t,s,A):t.appendChild(p(s)),W(t),A=s}const R=1e3,U=R*60,D=U*60,K=D*24,Y=e=>{const t=Date.now()-e;return t<U?"방금 전":t<D?`${Math.floor(t/U)}분 전`:t<K?`${Math.floor(t/D)}시간 전`:new Date(e).toLocaleString()},g=H("user"),Q=1e3,f=Q*60,X=f*60,c=G({currentUser:g.get(),loggedIn:!!g.get(),posts:[{id:1,author:"홍길동",time:Date.now()-5*f,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",likeUsers:[]},{id:2,author:"김철수",time:Date.now()-15*f,content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",likeUsers:[]},{id:3,author:"이영희",time:Date.now()-30*f,content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",likeUsers:[]},{id:4,author:"박민수",time:Date.now()-30*f,content:"주말에 등산 가실 분 계신가요? 함께 가요!",likeUsers:[]},{id:5,author:"정수연",time:Date.now()-2*X,content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",likeUsers:[]}],error:null},{logout(e){return g.reset(),{...e,currentUser:null,loggedIn:!1}},addPosts(e,t){const s={...t,id:e.posts.length+1,time:Date.now(),likeUsers:[]};return{...e,posts:[...e.posts,s]}},getPosts(e){return console.log("state.posts:",e.posts),e.posts},changeFavorite(e,t){console.log("id in changeFavorite:",t),console.log("state@@@:",e);const s=e.posts.find(r=>r.id===t),l=s.likeUsers.includes(e.currentUser.username);console.log("isLiked:",l);let o=[...e.posts];return l?s.likeUsers=s.likeUsers.filter(r=>r!==e.currentUser.username):s.likeUsers.push(e.currentUser.username),o=o.map(r=>r.id===t?s:r),console.log("target:",s),console.log("newPosts:",o),{...e,posts:o}}}),Z=({author:e,time:t,content:s,likeUsers:l,activationLike:o,id:r})=>{const{loggedIn:a}=c.getState(),{changeFavorite:u}=c.actions,i=()=>{a?u(r):a||alert("로그인 후 이용해주세요")};return n("div",{className:"bg-white rounded-lg shadow p-4 mb-4"},n("div",{className:"flex items-center mb-2"},n("div",null,n("div",{className:"font-bold"},e),n("div",{className:"text-gray-500 text-sm"},Y(t)))),n("p",null,s),n("div",{className:"mt-2 flex justify-between text-gray-500"},n("span",{onClick:()=>i(),className:`like-button cursor-pointer${l.length>0?" text-blue-500":""}`},"좋아요 ",l.length),n("span",null,"댓글"),n("span",null,"공유")))},_=()=>{const{addPosts:e}=c.actions,{getState:t}=c,{getPosts:s}=c.actions;return n("div",{className:"mb-4 bg-white rounded-lg shadow p-4"},n("textarea",{id:"post-content",placeholder:"무슨 생각을 하고 계신가요?",className:"w-full p-2 border rounded"}),n("button",{onClick:()=>{const o=document.getElementById("post-content").value;if(console.log("getState:",t()),o.trim()===""){alert("게시물 내용을 입력해주세요.");return}e({author:t().currentUser.username,content:o,time:Date.now(),likeUsers:[]})},type:"button",id:"post-submit",className:"mt-2 bg-blue-600 text-white px-4 py-2 rounded"},"게시"))},M=()=>n("header",{className:"bg-blue-600 text-white p-4 sticky top-0"},n("h1",{className:"text-2xl font-bold"},"항해플러스1")),j=()=>n("footer",{className:"bg-gray-200 p-4 text-center"},n("p",null,"© $",new Date().getFullYear()," 항해플러스. All rights reserved.")),d={value:null,get(){return this.value},set(e){this.value=e}},v=e=>window.location.pathname===e?"text-blue-600 font-bold":"text-gray-600";function P({onClick:e,children:t,...s}){return n("a",{onClick:o=>{o.preventDefault(),e==null||e(),d.get().push(o.target.href.replace(window.location.origin,""))},...s},t)}const F=()=>{const{loggedIn:e}=c.getState(),{logout:t}=c.actions;return n("nav",{className:"bg-white shadow-md p-2 sticky top-14"},n("ul",{className:"flex justify-around"},n("li",null,n(P,{href:"/",className:v("/")},"홈")),!e&&n("li",null,n(P,{href:"/login",className:v("/login")},"로그인")),e&&n("li",null,n(P,{href:"/profile",className:v("/profile")},"프로필")),e&&n("li",null,n("a",{href:"#",id:"logout",className:"text-gray-600",onClick:s=>{s.preventDefault(),t()}},"로그아웃"))))},ee=()=>{const{posts:e}=c.getState(),{loggedIn:t}=c.getState();return n("div",{className:"bg-gray-100 min-h-screen flex justify-center"},n("div",{className:"max-w-md w-full"},n(M,null),n(F,null),n("main",{className:"p-4"},t&&n(_,null),n("div",{id:"posts-container",className:"space-y-4"},[...e].sort((s,l)=>l.time-s.time).map((s,l)=>n(Z,{index:l,...s,activationLike:!1})))),n(j,null)))};function te(e){const t={username:e,email:"",bio:""};c.setState({currentUser:t,loggedIn:!0}),g.set(t)}const se=()=>n("div",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},n("div",{className:"bg-white p-8 rounded-lg shadow-md w-full max-w-md"},n("h1",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"항해플러스"),n("form",{id:"login-form",onSubmit:t=>{t.preventDefault();const s=document.getElementById("username").value;te(s)}},n("input",{type:"text",id:"username",placeholder:"사용자 이름",className:"w-full p-2 mb-4 border rounded",required:!0}),n("input",{type:"password",placeholder:"비밀번호",className:"w-full p-2 mb-6 border rounded",required:!0}),n("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded"},"로그인")),n("div",{className:"mt-4 text-center"},n("a",{href:"#",className:"text-blue-600 text-sm"},"비밀번호를 잊으셨나요?")),n("hr",{className:"my-6"}),n("div",{className:"text-center"},n("button",{className:"bg-green-500 text-white px-4 py-2 rounded"},"새 계정 만들기")))),ne=()=>n("main",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},n("div",{className:"bg-white p-8 rounded-lg shadow-md w-full text-center",style:"max-width: 480px"},n("h1",{className:"text-2xl font-bold text-blue-600 mb-4"},"항해플러스"),n("p",{className:"text-4xl font-bold text-gray-800 mb-4"},"404"),n("p",{className:"text-xl text-gray-600 mb-8"},"페이지를 찾을 수 없습니다"),n("p",{className:"text-gray-600 mb-8"},"요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."),n("a",{href:"/","data-link":"",className:"bg-blue-600 text-white px-4 py-2 rounded font-bold"},"홈으로 돌아가기")));function re(e){const t={...c.getState().currentUser,...e};c.setState({currentUser:t}),g.set(t),alert("프로필이 업데이트되었습니다.")}const oe=()=>{const{loggedIn:e,currentUser:t}=c.getState(),{username:s="",email:l="",bio:o=""}=t??{};return n("div",{className:"bg-gray-100 min-h-screen flex justify-center"},n("div",{className:"max-w-md w-full"},n(M,null),n(F,{loggedIn:e}),n("main",{className:"p-4"},n("div",{className:"bg-white p-8 rounded-lg shadow-md"},n("h2",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"내 프로필"),n("form",{id:"profile-form",onSubmit:a=>{a.preventDefault();const u=new FormData(a.target),i=Object.fromEntries(u);re(i)}},n("div",{className:"mb-4"},n("label",{for:"username",className:"block text-gray-700 text-sm font-bold mb-2"},"사용자 이름"),n("input",{type:"text",id:"username",name:"username",className:"w-full p-2 border rounded",value:s,required:!0})),n("div",{className:"mb-4"},n("label",{for:"email",className:"block text-gray-700 text-sm font-bold mb-2"},"이메일"),n("input",{type:"email",id:"email",name:"email",className:"w-full p-2 border rounded",value:l,required:!0})),n("div",{className:"mb-6"},n("label",{for:"bio",className:"block text-gray-700 text-sm font-bold mb-2"},"자기소개"),n("textarea",{id:"bio",name:"bio",rows:"4",className:"w-full p-2 border rounded"},o)),n("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded font-bold"},"프로필 업데이트")))),n(j,null)))},y=class y extends Error{constructor(){super(y.MESSAGE)}};x(y,"MESSAGE","ForbiddenError");let h=y;const w=class w extends Error{constructor(){super(w.MESSAGE)}};x(w,"MESSAGE","UnauthorizedError");let b=w;function E(){const e=d.get().getTarget()??ne,t=document.querySelector("#root");console.log("router.get():",d.get()),console.log("page:",e);try{console.log("여기옴?"),J(n(e,null),t)}catch(s){if(s instanceof h){d.get().push("/");return}if(s instanceof b){d.get().push("/login");return}console.error(s)}}d.set(V({"/":ee,"/login":()=>{const{loggedIn:e}=c.getState();if(console.log(e),e)throw new h;return n(se,null)},"/profile":()=>{const{loggedIn:e}=c.getState();if(!e)throw new b;return n(oe,null)}}));function le(){d.get().subscribe(E),c.subscribe(E),E()}le();
