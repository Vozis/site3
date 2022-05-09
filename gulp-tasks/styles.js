"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import dartsass from "sass";
import gulpsass from "gulp-sass";
import mincss from "gulp-clean-css";
import groupmedia from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
import notify from "gulp-notify";
import webpCss from "gulp-webpcss";
import urlAdjuster from "gulp-css-url-adjuster";

const sass = gulpsass(dartsass);
const argv = yargs.argv,
  production = !!argv.production;

gulp.task("styles", () => {
  return gulp
    .src(paths.styles.src)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          titile: "Ошибка в SCSS",
          message: "<%= error.message %>",
        }),
      })
    )
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(
      gulpif(
        production,
        urlAdjuster({
          replace: ["../../../img/", "../img/"],
        })
      )
    )
    .pipe(
      gulpif(
        production,
        urlAdjuster({
          replace: ["../../fonts/webfonts/", "../fonts/webfonts/"],
        })
      )
    )
    .pipe(gulpif(production, groupmedia()))
    .pipe(
      gulpif(
        production,
        webpCss({
          webpCss: ".webp",
          noWebpCss: ".no-webp",
        })
      )
    )
    .pipe(
      gulpif(
        production,
        autoprefixer({
          grid: true,
          overrideaBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(
      gulpif(
        production,
        mincss({
          compatibility: "ie8",
          level: {
            1: {
              specialComments: 0,
              removeEmpty: true,
              removeWhitespace: true,
            },
            2: {
              mergeMedia: true,
              removeEmpty: true,
              removeDuplicateFontRules: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true,
              removeUnusedAtRules: false,
            },
          },
        })
      )
    )
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(plumber.stop())
    .pipe(gulpif(!production, sourcemaps.write("./maps/")))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(
      debug({
        title: "CSS files",
      })
    )
    .pipe(browsersync.stream());
});
