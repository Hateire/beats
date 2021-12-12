const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector(".fullscreen-menu");
const closeBtn = menu.querySelector(".fullscreen-menu__close");

hamburger.addEventListener("click", e => {
  e.preventDefault();
  menu.classList.add("active");
});

closeBtn.addEventListener("click", e => {
  e.preventDefault();
  menu.classList.remove("active");
})