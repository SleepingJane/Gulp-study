// common modules
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const gulpIf = require("gulp-if");

// clear
const del = require("del");

// templates
const pug = require("gulp-pug");

// styles
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const minifyCss = require("gulp-clean-css");

// scripts
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");
const isProduction = process.env.NODE_ENV === "production";

const PATHS = {
    app: "./app",
    dist: "./dist"
}

gulp.task('clear', () => {
    return del(PATHS.dist);
});

gulp.task('templates', () => {
    return gulp
        .src(`${PATHS.app}/pages/**/*.pug`, 
        { since: gulp.lastRun("templates") }) 
        .pipe(plumber())
        .pipe(pug({ pretty: true })) 
        .pipe(gulp.dest(PATHS.dist)) 
});

gulp.task('styles', () => {
    return gulp
        .src(`${PATHS.app}/common/styles/**/*.scss`, {
            since: gulp.lastRun("styles")
        })
        .pipe(plumber())
        .pipe(gulpIf(!isProduction, sourcemaps.init()))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulpIf(isProduction, minifyCss()))
        .pipe(gulpIf(!isProduction, sourcemaps.write()))
        .pipe(gulp.dest(`${PATHS.dist}/assets/styles`));
});

gulp.task('scripts', () => {
    return gulp
        .src(`${PATHS.app}/common/scripts/*.js`, { 
            since: gulp.lastRun("scripts") 
        })
        .pipe(plumber())
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(`${PATHS.dist}/assets/scripts`));
});

//gulp.task('images', () => console.log('images'));
//gulp.task('copy', () => console.log('copy'));
//gulp.task('server', () => console.log('server'));
//gulp.task('watch', () => console.log('watch'));