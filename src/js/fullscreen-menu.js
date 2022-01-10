const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", e => {
    e.preventDefault();

    // if (hamburger.classList.contains("hamburger--active")) {
    //     menu.classList.remove("menu--active");
    //     hamburger.classList.remove("hamburger--active");
    // } else {
    //     menu.classList.add("menu--active");
    //     hamburger.classList.add("hamburger--active");
    // }

    menu.classList.toggle("menu--active");
    hamburger.classList.toggle("hamburger--active");
});
