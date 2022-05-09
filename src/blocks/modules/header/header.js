"use strict";

const menuBurger = document.querySelector(".icon-menu");
const menuEls = document.querySelectorAll(".menu__list-link");
let menuEl = document.querySelector(".menu__content");

menuBurger.addEventListener("click", () => {
  menuBurger.classList.toggle("_active");
  menuEl.classList.toggle("_active");
});
