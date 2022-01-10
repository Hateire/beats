const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH } = require('./gulp.config');


task('clean', () => {
    console.log(env);
    return src('${DIST_PATH}/**/*', { read: false }).pipe(rm());
});

task('copy:html', () => {
    return src('${SRC_PATH}/*.html')
        .pipe(dest('DIST_PATH'))
        .pipe(reload({ stream: true }));
});

const styles = [
    "node_modules/normalize.css/normalize.css",
    "src/scss/main.scss"
];


task('styles', () => {
    return src(styles)
        .pipe(gulpif(env == 'dev', sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        // .pipe(px2rem())
        .pipe(gulpif(env == 'dev',
            autoprefixer({
                cascade: false
            }))
        )
            .pipe(gulpif(env == 'prod', gcmq()))
            .pipe(gulpif(env == 'prod', cleanCSS()))
            .pipe(gulpif(env == 'dev', sourcemaps.write()))
            .pipe(dest('dist/css'))
});

task('copy:img', () => {
    return src('src/img/**/*')
        .pipe(dest('dist/img'));
});

task('copy:vid', () => {
    return src('src/video/**/*')
        .pipe(dest('dist/video'));
});

task("scripts", () => {
    return src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat('main.js', { newLine: ";" }))
        .pipe(babel({
            presets: ['@babel/env']
        })
        )
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest("dist/js"));
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
    });
});
task('watch', () => {
    watch("./src/scss/**/*.scss", series("styles"));
    watch("./src/*.html", series("copy:html"));
    watch("./src/js/*.js", series("scripts"));
})

task("default", series("clean", parallel("copy:html", "copy:img", 'copy:vid', "styles", "scripts"), parallel("watch","server")));

task("build", series("clean", parallel("copy:html", "copy:img", 'copy:vid', "styles", "scripts")));