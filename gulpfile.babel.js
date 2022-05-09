"use strict";

import gulp from "gulp";

const buildFolder = `./dist`;
const srcFolder = `./src`;

const requireDir = require("require-dir"),
  paths = {
    views: {
      src: [`${srcFolder}/views/**/*.html`, `${srcFolder}/views/pages/*.html`],
      dist: `${buildFolder}/`,
      watch: [`${srcFolder}/blocks/**/*.html`, `${srcFolder}/views/**/*.html`],
    },
    styles: {
      src: `${srcFolder}/styles/main.{scss,sass}`,
      dist: `${buildFolder}/styles/`,
      watch: [
        `${srcFolder}/blocks/**/*.{scss,sass}`,
        `${srcFolder}/styles/**/*.{scss,sass}`,
      ],
    },
    scripts: {
      src: `${srcFolder}/js/index.js`,
      dist: `${buildFolder}/js/`,
      watch: [`${srcFolder}/blocks/**/*.js`, `${srcFolder}/js/**/*.js`],
    },
    images: {
      src: [
        `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,tiff}`,
        `!${srcFolder}/img/favicon/*.{jpg,jpeg,png,gif,tiff}`,
      ],
      dist: `${buildFolder}/img/`,
      watch: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,tiff}`,
    },
    svg: {
      src: `${srcFolder}/img/**/*.svg`,
      dist: `${buildFolder}/img/`,
      watch: `${srcFolder}/img/**/*.svg`,
    },
    sprites: {
      src: `${srcFolder}/img/sprites/*.svg`,
      dist: `${buildFolder}/img/sprites/`,
      watch: `${srcFolder}/img/sprites/*.svg`,
    },
    fonts: {
      src: `${srcFolder}/fonts/**/*.*`,
      dist: `${buildFolder}/fonts/`,
      watch: `${srcFolder}/fonts/**/*.*`,
    },
    favicons: {
      src: `${srcFolder}/img/favicon/*.{jpg,jpeg,png,gif}`,
      dist: `${buildFolder}/img/favicons/`,
    },
    gzip: {
      src: `${srcFolder}/.htaccess`,
      dist: `${buildFolder}/`,
    },
    buildFolder: buildFolder,
    srcFolder: srcFolder,
  };

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series(
  "clean",
  gulp.series("otfToTtf", "ttfToWoff", "fontsStyle", "copyFonts"),
  gulp.parallel([
    "views",
    "styles",
    "scripts",
    "images",
    "webp",
    "sprites",
    "favicons",
  ]),
  gulp.parallel("serve")
);

export const prod = gulp.series(
  "clean",
  gulp.series("otfToTtf", "ttfToWoff", "fontsStyle", "copyFonts"),
  gulp.parallel([
    "views",
    "styles",
    "scripts",
    "images",
    "webp",
    "sprites",
    "favicons",
    "gzip",
  ])
);

export default development;
