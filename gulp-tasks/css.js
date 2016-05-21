var sass = require('gulp-sass');
var insert = require('gulp-insert');

module.exports = function(gulp){
    return function(){
        return gulp.src('fonts/**.scss')
            .pipe(insert.prepend('$fontset-selector: ".fontset";'))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('fonts'));
    };
};