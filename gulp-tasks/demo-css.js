var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');

module.exports = function(gulp){
    return function(){
        return gulp.src([
                'node_modules/highlight.js/styles/default.css',
                'demo/index.scss'
            ])
            .pipe(sourcemaps.init())
            .pipe(concat('index.min.css'))
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions', '> 1%'] }) ]))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('demo/dist'));
    };
};