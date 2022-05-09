"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import debug from "gulp-debug";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import fs, { appendFile, readdir } from "fs";
import fonter from "gulp-fonter-unx";
import ttf2woff2 from "gulp-ttf2woff2";
import yargs from "yargs";

const argv = yargs.argv,
  production = !!argv.production;

gulp.task("otfToTtf", () => {
  return gulp
    .src(`${paths.srcFolder}/fonts/*.otf`)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Ошибка в FONTS",
          message: "<%= error.message %>",
        }),
      })
    )
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )

    .pipe(gulp.dest(paths.fonts.src))
    .pipe(
      debug({
        title: "Fonts",
      })
    );
});

gulp.task("ttfToWoff", () => {
  return gulp
    .src(`${paths.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Ошибка в FONTS",
          message: "<%= error.message %>",
        }),
      })
    )
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )

    .pipe(gulp.dest(paths.fonts.dist))
    .pipe(gulp.src(`${paths.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(gulp.src(`${paths.srcFolder}/fonts/*.{woff,woff2}`))
    .pipe(gulp.dest(paths.fonts.dist))
    .pipe(
      debug({
        title: "Fonts",
      })
    );
});

gulp.task("fontsStyle", () => {
  // файл стилей подключения шрифтов
  let fontsFile = `${paths.srcFolder}/styles/base/_fonts.scss`;
  fs.readdir(paths.fonts.dist, function (err, fontsFiles) {
    if (fontsFiles) {
      // проверка существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // если файла нет - создаем его
        fs.writeFile(fontsFile, ``, cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          // записываем подключение шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === "extrabold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb
            );
          }
        }
      } else {
        // если файл есть
        console.log(
          "Файл fonts.scss уже существует. Для обновления файла его нужно удалить."
        );
      }
    }
  });

  return gulp.src(`${paths.srcFolder}`);
  function cb() {}
});

gulp.task("copyFonts", () => {
  return gulp
    .src(`${paths.srcFolder}/fonts/webfonts/*.*`, {})
    .pipe(gulp.dest(`${paths.buildFolder}/fonts/webfonts/`))
    .pipe(
      debug({
        title: "Fonts",
      })
    );
});
/*
gulp.task("fonts", () => {
  return gulp
    .src(paths.fonts.src)
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Ошибка в FONTS",
            message: "<%= error.message %>",
          })(err);
        },
      })
    )
    .pipe(gulp.dest(paths.fonts.dist))
    .pipe(
      debug({
        title: "Fonts",
      })
    );
});
*/
