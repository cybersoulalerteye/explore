const header=document.getElementById("header");
const progress=document.getElementById("progress");
const menuToggle=document.getElementById("menuToggle");
const mobileMenu=document.getElementById("mobileMenu");

function onScroll(){
  const y=window.scrollY;
  header.classList.toggle("scrolled",y>30);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max?Math.min(100,y/max*100):0)+"%";
}
window.addEventListener("scroll",onScroll,{passive:true}); onScroll();

menuToggle.addEventListener("click",()=>{
  const open=mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",open);
});
mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  mobileMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const modal=document.getElementById("incidentModal");
const openModal=()=>{modal.classList.add("open");modal.setAttribute("aria-hidden","false")};
const closeModal=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true")};
document.getElementById("demoIncident").addEventListener("click",openModal);
document.getElementById("modalClose").addEventListener("click",closeModal);
document.getElementById("modalOk").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"})}
  });
});

document.getElementById("demoForm").addEventListener("submit",e=>{
  document.getElementById("formNote").textContent="Submitting your private demonstration request…";
});
;
