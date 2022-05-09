"use strict";

const menuBurger = document.querySelector(".icon-menu");
const menuEls = document.querySelectorAll(".menu__list-link");
let menuEl = document.querySelector(".menu__content");
let headerMenuEl = document.querySelector(".header__menu");

menuBurger.addEventListener("click", () => {
  menuBurger.classList.toggle("_active");
  menuEl.classList.toggle("_active");
  menuEl.classList.toggle("_active");
  headerMenuEl.classList.toggle("_active");
});
