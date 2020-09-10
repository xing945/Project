const { src, dest, watch, series } = require('gulp')

const htmlClean = require('gulp-htmlclean');
const gulpLess = require('gulp-less');
const cssClean = require('gulp-clean-css')
const gulpUglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');
const imageMin = require('gulp-imagemin');
const connect = require('gulp-connect');

const folder = {
	src: 'src/',
	dist: 'dist/',
}

function html() {
    return src(folder.src + 'html/*')
        .pipe(htmlClean())
        .pipe(dest(folder.dist + 'html/'))
        .pipe(connect.reload());
}

function css() {
    return src(folder.src + 'css/*')
    .pipe(gulpLess())
    .pipe(cssClean())
    .pipe(dest(folder.dist + 'css/'))
    .pipe(connect.reload());
}

function js() {
    return src(folder.src + 'js/*')
    // .pipe(stripDebug())
    // .pipe(gulpUglify())
    .pipe(dest(folder.dist + 'js/'))
    .pipe(connect.reload());
}

function images() {
    return src(folder.src + 'images/*')
    .pipe(imageMin())
    .pipe(dest(folder.dist + 'images/'))
}

function server(cb){
    connect.server({
        port:'1234',
        livereload:true, // 自动刷新
    })
    cb();
}

watch(folder.src + 'html/*',function(cb){
    html();
    cb();
})

watch(folder.src + 'css/*',function(cb){
    css();
    cb();
})

watch(folder.src + 'js/*',function(cb){
    js();
    cb();
})

exports.default = series(html,css,js,images,server);