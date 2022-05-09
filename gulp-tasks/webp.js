"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import imageminWebp from "imagemin-webp";
import webp from "gulp-webp";
import newer from "gulp-newer";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import yargs from "yargs";
import notify from "gulp-notify";
import plumber from "gulp-plumber";

const argv = yargs.argv,
  production = !!argv.production;

gulp.task("webp", () => {
  return (
    gulp
      .src(paths.images.src)
      .pipe(
        plumber({
          errorHandler: notify.onError({
            title: "Ошибка в WEBP",
            message: "<%= error.message %>",
          }),
        })
      )
      .pipe(newer(paths.images.dist))
      .pipe(
        webp(
          imageminWebp({
            lossless: true,
            quality: 100,
            alphaQuality: 100,
          })
        )
      )
      .pipe(gulp.dest(paths.images.dist))
      // .pipe(debug({
      //     "title": "Images"
      // }))
      .on("end", browsersync.reload)
  );
});
