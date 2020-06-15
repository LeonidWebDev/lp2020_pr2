const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const sync = require('browser-sync').create();


function html() {
    return src('dist/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('app/'));
}

function css() {
    return src('dist/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(dest('app/css/'));
}

function clearHtml() {
    return del(['app/index.html'])
}

function clearCss() {
    return del(['app/css/**/*.css'])
}

function serve() {
    sync.init({
        server: './app'
    })

    watch('dist/index.html', series(clearHtml, html)).on('change', sync.reload)
    watch('dist/scss/style.scss', series(clearCss, css)).on('change', sync.reload)

}

exports.html = html;
exports.css = css;
exports.clearCss = clearCss;
exports.clearHtml = clearHtml;

exports.build = series(clearHtml, clearCss, html, css);
exports.serve = series(serve);