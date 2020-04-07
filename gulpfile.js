const { src, dest, series, task } = require('gulp')
const miniCss = require('gulp-minify-css')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const htmlClean = require('gulp-htmlclean')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

function minifyCss() {
  return src('./public/**/*.css').pipe(miniCss()).pipe(dest('./public'))
}

function minifyJs() {
  return src(['./public/**/*.js', '!./public/js/**/*min.js'])
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(dest('./public'))
}

function minifyHtml() {
  return src('./public/**/*.html')
    .pipe(htmlClean())
    .pipe(
      htmlmin({
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      })
    )
    .pipe(dest('./public'))
}

function minifyImages() {
  return src('./public/images/*.*')
    .pipe(
      imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: false,
        multipass: false,
      })
    )
    .pipe(dest('./public/images'))
}

function minifyImg() {
  return src('./public/img/*.*')
    .pipe(
      imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: false,
        multipass: false,
      })
    )
    .pipe(dest('./public/img'))
}

task('default', series(minifyCss, minifyHtml, minifyImages, minifyImg, minifyJs))
