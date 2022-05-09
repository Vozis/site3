"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";
import versionNumber from "gulp-version-number";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import notify from "gulp-notify";
import plumber from "gulp-plumber";

const argv = yargs.argv,
  production = !!argv.production;

gulp.task("views", () => {
  return gulp
    .src(paths.views.src)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Ошибка в HTML",
          message: "<%= error.message %>",
        }),
      })
    )
    .pipe(
      include({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulpif(production, webpHtmlNosvg()))
    .pipe(gulpif(production, replace("../../../img/", "img/")))
    .pipe(gulpif(production, replace("../img/", "img/")))
    .pipe(gulpif(production, replace(".js", ".min.js")))
    .pipe(
      gulpif(
        production,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp-tasks/version.json",
          },
        })
      )
    )
    .pipe(gulp.dest(paths.views.dist))
    .pipe(browsersync.stream());
});
