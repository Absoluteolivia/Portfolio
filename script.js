const words = [
    "Aspiring Data Scientist",
    "Frontend Developer",
    "Python Learner",
    "SQL Enthusiast",
    "Data Analytics Explorer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.querySelector(".typing");

function typeEffect(){

    const current = words[wordIndex];

    if(isDeleting){
        typing.textContent = current.substring(0,charIndex--);
    }else{
        typing.textContent = current.substring(0,charIndex++);
    }

    let speed = isDeleting ? 60 : 120;

    if(!isDeleting && charIndex===current.length+1){
        isDeleting=true;
        speed=1500;
    }

    if(isDeleting && charIndex===0){
        isDeleting=false;
        wordIndex=(wordIndex+1)%words.length;
    }

    setTimeout(typeEffect,speed);
}

typeEffect();
// Active Navbar Link

const sections = document.querySelectorAll("section");
const navLinksScroll = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");
        }

    });

    navLinksScroll.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});
const topBtn = document.getElementById("topBtn");

window.onscroll = function () {

    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

};

topBtn.onclick = function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};
const navLinks = document.getElementById("navLinks");

const menuBtn = document.querySelector(".menu-btn");

const closeBtn = document.querySelector(".close-btn");

function showMenu(){

    navLinks.classList.add("active");

    menuBtn.style.display="none";

    closeBtn.style.display="block";

}

function closeMenu(){

    navLinks.classList.remove("active");

    menuBtn.style.display="block";

    closeBtn.style.display="none";

}
document.querySelectorAll(".nav-links a").forEach(link=>{
    link.addEventListener("click",()=>{
        closeMenu();
    });
});