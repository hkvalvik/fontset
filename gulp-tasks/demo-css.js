var sass = require('gulp-sass');
var concat = require('gulp-concat');

module.exports = function(gulp){
    return function(){
        return gulp.src([
                'node_modules/highlight.js/styles/default.css',
                'demo/index.scss'
            ])
            .pipe(concat('index.min.css'))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('demo/dist'));
    };
};