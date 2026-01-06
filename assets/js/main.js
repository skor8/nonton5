document.addEventListener("DOMContentLoaded",()=>{

/* YEAR */
const year=document.getElementById("year");
if(year) year.textContent=new Date().getFullYear();

/* HAMBURGER */
const burger=document.getElementById("hamburger");
const nav=document.getElementById("navMenu");
if(burger && nav){
  burger.onclick=()=>nav.classList.toggle("active");
}

/* THEME SWITCH */
const toggle=document.getElementById("themeToggle");
toggle.onclick=()=>{
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme==="neon"?"dark":"neon";
};

/* ===== 3D TILT (POINTER SAFE) ===== */
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`rotateY(${x*8}deg) rotateX(${-y*8}deg)`;
  });
  card.addEventListener("pointerleave",()=>{
    card.style.transform="none";
  });
});

/* ===== NEON EDGE ON SCROLL ===== */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("neon-active");
    }
  });
},{threshold:.4});

document.querySelectorAll(".neon-on-scroll").forEach(el=>observer.observe(el));

});

/* ===== AUTO SCROLL LOGO LIGA (MOBILE ONLY) ===== */
const leagueCarousel = document.getElementById("leagueCarousel");
if(leagueCarousel && window.innerWidth <= 768){
  const track = leagueCarousel.querySelector(".league-track");
  let scrollPos = 0;

  setInterval(()=>{
    scrollPos += 120;
    if(scrollPos >= track.scrollWidth - track.clientWidth){
      scrollPos = 0;
    }
    track.scrollTo({ left: scrollPos, behavior: "smooth" });
  }, 3500);
}
/* ===== HEADER SCROLL STATE ===== */
const header = document.querySelector(".header");

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 10) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }

  lastScroll = currentScroll;
}, { passive: true });
/* ===== COLLAPSE PILAR MENU ===== */
const pillarToggle = document.querySelector(".nav-collapse-toggle");
const pillarMenu = document.getElementById("navPillar");

if (pillarToggle && pillarMenu) {
  pillarToggle.addEventListener("click", () => {
    const expanded =
      pillarToggle.getAttribute("aria-expanded") === "true";

    pillarToggle.setAttribute("aria-expanded", !expanded);
    pillarMenu.classList.toggle("open");
  });
}
