import gulp from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import babel from 'gulp-babel-minify';
import browserSync from 'browser-sync';
import autoPrefixer from 'gulp-autoprefixer';

const scssCompiler = gulpSass(sass);

const SRC_FOLDER = './src';
const DIST_FOLDER = './dist';
const JS_PATH_SRC = SRC_FOLDER+'/js/**/*.js';
const SCSS_PATH_SRC = SRC_FOLDER+'/scss/**/*.scss';


async function jsCompilation(){
    gulp.src([SRC_FOLDER+'/js/data.js', SRC_FOLDER+'/js/app.js'])
    .pipe(concat('result.js'))
    .pipe(babel())
    .pipe(gulp.dest(DIST_FOLDER))
    .pipe(browserSync.stream())
}

async function sassCompilation(){
    gulp.src(SCSS_PATH_SRC)
    .pipe(scssCompiler({outputStyle: 'compressed'}))
    .pipe(autoPrefixer({
        overrideBrowserslist: ['last 10 version'], 
        grid: true
    }))
    .pipe(gulp.dest(DIST_FOLDER))
    .pipe(browserSync.stream())
}

async function watching(){
    gulp.watch(SCSS_PATH_SRC, sassCompilation)
    gulp.watch(JS_PATH_SRC, jsCompilation)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

async function browsersync(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

gulp.task('default', gulp.parallel(jsCompilation, sassCompilation, browsersync, watching));